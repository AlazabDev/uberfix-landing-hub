import { corsHeaders } from "npm:@supabase/supabase-js@2/cors";

// Public chatbot endpoint (no user authentication) backed by the
// Microsoft Foundry agent `az-agent-maint` via the OpenAI Responses protocol.

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20;
const MAX_MESSAGES = 30;
const MAX_MESSAGE_CHARS = 4_000;
const MAX_TOTAL_CHARS = 12_000;

const buckets = new Map<string, number[]>();

function rateLimit(ip: string): boolean {
  const now = Date.now();
  const arr = (buckets.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (arr.length >= RATE_LIMIT_MAX) {
    buckets.set(ip, arr);
    return false;
  }
  arr.push(now);
  buckets.set(ip, arr);
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      if (!v.length || now - v[v.length - 1] > RATE_LIMIT_WINDOW_MS) buckets.delete(k);
    }
  }
  return true;
}

function jsonError(message: string, status: number) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

interface IncomingMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

const AGENT_NAME = Deno.env.get("FOUNDRY_AGENT_NAME") ?? "az-agent-maint";
const AGENT_VERSION = Deno.env.get("FOUNDRY_AGENT_VERSION") ?? "21";
const RESPONSES_ENDPOINT =
  Deno.env.get("FOUNDRY_RESPONSES_ENDPOINT") ??
  "https://az-ai-resource.services.ai.azure.com/api/projects/az-ai-gateway/agents/az-agent-maint/endpoint/protocols/openai/responses";
const API_VERSION = Deno.env.get("FOUNDRY_API_VERSION") ?? "2026-04-10";

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });
  if (req.method !== "POST") return jsonError("Method not allowed", 405);

  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";
    if (!rateLimit(ip)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again in a minute." }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": "60" },
        },
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || !Array.isArray(body.messages) || body.messages.length === 0) {
      return jsonError("Invalid request body: messages[] required.", 400);
    }
    const messages = body.messages as IncomingMessage[];
    if (messages.length > MAX_MESSAGES) {
      return jsonError(`Messages must be between 1 and ${MAX_MESSAGES} items.`, 400);
    }
    let total = 0;
    for (const m of messages) {
      if (
        !m || typeof m !== "object" ||
        typeof m.role !== "string" || typeof m.content !== "string" ||
        !["user", "assistant", "system"].includes(m.role)
      ) {
        return jsonError("Each message needs a valid role and string content.", 400);
      }
      if (m.content.length > MAX_MESSAGE_CHARS) {
        return jsonError(`Each message must be under ${MAX_MESSAGE_CHARS} characters.`, 400);
      }
      total += m.content.length;
    }
    if (total > MAX_TOTAL_CHARS) {
      return jsonError(`Total payload exceeds ${MAX_TOTAL_CHARS} characters.`, 400);
    }

    const apiKey = Deno.env.get("AZURE_AI_API_KEY");
    if (!apiKey) return jsonError("AZURE_AI_API_KEY is not configured", 500);

    // Responses API input items: assistant turns use output_text parts.
    const input = messages.map((m) => ({
      type: "message" as const,
      role: m.role,
      content: [
        {
          type: m.role === "assistant" ? "output_text" : "input_text",
          text: m.content,
        },
      ],
    }));

    const url = `${RESPONSES_ENDPOINT}?api-version=${encodeURIComponent(API_VERSION)}`;
    const upstream = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify({
        input,
        stream: true,
        store: false,
        agent: { name: AGENT_NAME, version: AGENT_VERSION, type: "agent_reference" },
      }),
    });

    if (!upstream.ok || !upstream.body) {
      const detail = await upstream.text().catch(() => "");
      console.error("Foundry error:", upstream.status, detail);
      if (upstream.status === 429) {
        return jsonError("Rate limit exceeded upstream. Please try again shortly.", 429);
      }
      if (upstream.status === 401 || upstream.status === 403) {
        return jsonError("Foundry authentication failed. Check AZURE_AI_API_KEY.", 502);
      }
      return jsonError(`Foundry agent error (${upstream.status}): ${detail.slice(0, 500)}`, 502);
    }

    // Translate Responses SSE events into the chat-completions delta shape
    // the frontend already parses.
    const encoder = new TextEncoder();
    const decoder = new TextDecoder();
    const reader = upstream.body.getReader();

    const stream = new ReadableStream({
      async start(controller) {
        const emit = (content: string) => {
          controller.enqueue(
            encoder.encode(
              `data: ${JSON.stringify({ choices: [{ delta: { content } }] })}\n\n`,
            ),
          );
        };
        let buffer = "";
        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            let nl: number;
            while ((nl = buffer.indexOf("\n")) !== -1) {
              let line = buffer.slice(0, nl);
              buffer = buffer.slice(nl + 1);
              if (line.endsWith("\r")) line = line.slice(0, -1);
              if (!line.startsWith("data:")) continue;
              const raw = line.slice(5).trim();
              if (!raw || raw === "[DONE]") continue;
              try {
                const evt = JSON.parse(raw);
                if (evt.type === "response.output_text.delta" && typeof evt.delta === "string") {
                  emit(evt.delta);
                } else if (evt.type === "error" || evt.error) {
                  console.error("Foundry stream error:", raw.slice(0, 500));
                }
              } catch {
                // partial JSON — push back and wait for more bytes
                buffer = line + "\n" + buffer;
                break;
              }
            }
          }
        } catch (e) {
          console.error("stream relay error:", e);
        } finally {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
          controller.close();
        }
      },
      cancel(reason) {
        return reader.cancel(reason);
      },
    });

    return new Response(stream, {
      headers: {
        ...corsHeaders,
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
      },
    });
  } catch (e) {
    console.error("foundry-chat error:", e);
    return jsonError(e instanceof Error ? e.message : "Unknown error", 500);
  }
});
