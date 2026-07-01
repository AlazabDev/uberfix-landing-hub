import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

// In-memory sliding-window rate limiter (per edge instance).
// Not perfect but blocks obvious abuse from a single client without infra.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20; // 20 requests / minute / IP
const MAX_MESSAGES = 30;
const MAX_TOTAL_CHARS = 12_000;
const MAX_MESSAGE_CHARS = 4_000;

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
  // Opportunistic cleanup
  if (buckets.size > 5000) {
    for (const [k, v] of buckets) {
      if (!v.length || now - v[v.length - 1] > RATE_LIMIT_WINDOW_MS) buckets.delete(k);
    }
  }
  return true;
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
      req.headers.get("cf-connecting-ip") ||
      "unknown";

    if (!rateLimit(ip)) {
      return new Response(
        JSON.stringify({ error: "Too many requests. Please slow down and try again in a minute." }),
        { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json", "Retry-After": "60" } }
      );
    }

    const body = await req.json().catch(() => null);
    if (!body || !Array.isArray(body.messages)) {
      return new Response(
        JSON.stringify({ error: "Invalid request body." }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    const messages = body.messages;

    // Validate & cap payload size
    if (messages.length === 0 || messages.length > MAX_MESSAGES) {
      return new Response(
        JSON.stringify({ error: `Messages must be between 1 and ${MAX_MESSAGES} items.` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    let total = 0;
    for (const m of messages) {
      if (!m || typeof m !== "object" || typeof m.role !== "string" || typeof m.content !== "string") {
        return new Response(
          JSON.stringify({ error: "Each message must have role and content strings." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (!["user", "assistant", "system"].includes(m.role)) {
        return new Response(
          JSON.stringify({ error: "Invalid message role." }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (m.content.length > MAX_MESSAGE_CHARS) {
        return new Response(
          JSON.stringify({ error: `Each message must be under ${MAX_MESSAGE_CHARS} characters.` }),
          { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      total += m.content.length;
    }
    if (total > MAX_TOTAL_CHARS) {
      return new Response(
        JSON.stringify({ error: `Total payload exceeds ${MAX_TOTAL_CHARS} characters.` }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    const systemPrompt = `You are UberFix AI Assistant — a professional, friendly customer service bot for UberFix (uberfix.shop), a leading maintenance and home services company in Egypt.

Your responsibilities:
- Help customers book maintenance services (plumbing, electrical, AC, painting, carpentry, cleaning, etc.)
- Provide pricing estimates and service details
- Answer FAQs about UberFix services, coverage areas, and working hours
- Help track existing service requests
- Escalate complex issues to human support when needed

Key info:
- UberFix operates across Egypt with certified technicians
- Services include: plumbing, electrical, AC repair, painting, carpentry, cleaning, furniture assembly, TV mounting, and more
- Contact: WhatsApp +20 102 829 1995
- Website: uberfix.shop

Guidelines:
- Be concise and helpful
- Respond in the same language the user writes in (Arabic or English)
- Use a warm, professional tone
- If unsure, suggest contacting WhatsApp support
- Format responses with markdown when helpful
- When users want to submit a maintenance request, tell them to click the "طلب صيانة جديد" / "New maintenance request" quick action button below the chat, or visit the maintenance request page on the website`;

    const response = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: systemPrompt },
            ...messages,
          ],
          stream: true,
        }),
      }
    );

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      return new Response(
        JSON.stringify({ error: "AI service temporarily unavailable" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("chat error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
