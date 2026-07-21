import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { corsHeaders, handleOptions, json } from "../_shared/cors.ts";
import { serviceClient } from "../_shared/supa.ts";

const BUCKET = "maintenance-evidence";
const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

async function transcribeArabic(audio: Blob): Promise<string | null> {
  if (!LOVABLE_API_KEY) return null;
  try {
    const fd = new FormData();
    fd.append("model", "openai/gpt-4o-transcribe");
    fd.append("language", "ar");
    const ext = audio.type.includes("wav") ? "wav" : audio.type.includes("mp3") ? "mp3" : audio.type.includes("mp4") ? "mp4" : "webm";
    fd.append("file", audio, `recording.${ext}`);
    const r = await fetch("https://ai.gateway.lovable.dev/v1/audio/transcriptions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}` },
      body: fd,
    });
    if (!r.ok) {
      console.error("transcribe failed", r.status, await r.text().catch(() => ""));
      return null;
    }
    const j = await r.json();
    return typeof j.text === "string" ? j.text : null;
  } catch (e) {
    console.error("transcribe error", e);
    return null;
  }
}

async function extractStructured(transcript: string): Promise<Record<string, unknown> | null> {
  if (!LOVABLE_API_KEY) return null;
  try {
    const sys =
      "أنت مساعد يحوّل تقارير الفنيين الشفهية باللغة العربية إلى JSON منظم. أعد فقط JSON صالح دون أي شرح إضافي.";
    const schema = {
      type: "object",
      additionalProperties: false,
      properties: {
        summary: { type: "string" },
        work_done: { type: "string" },
        service_items: { type: "array", items: { type: "string" } },
        materials: { type: "array", items: { type: "string" } },
        quantities: { type: "array", items: { type: "string" } },
        issues_remaining: { type: "string" },
        technician_notes: { type: "string" },
      },
      required: ["summary", "work_done", "service_items", "materials", "quantities", "issues_remaining", "technician_notes"],
    };
    const r = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "openai/gpt-5.5",
        messages: [
          { role: "system", content: sys },
          { role: "user", content: `التقرير الشفهي:\n${transcript}\n\nحوّله لـ JSON بالحقول المطلوبة.` },
        ],
        response_format: {
          type: "json_schema",
          json_schema: { name: "TechnicianReport", schema, strict: true },
        },
      }),
    });
    if (!r.ok) {
      console.error("extract failed", r.status, await r.text().catch(() => ""));
      return null;
    }
    const j = await r.json();
    const content = j.choices?.[0]?.message?.content;
    if (!content) return null;
    return JSON.parse(content);
  } catch (e) {
    console.error("extract error", e);
    return null;
  }
}

serve(async (req) => {
  const opt = handleOptions(req);
  if (opt) return opt;
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const form = await req.formData();
    const request_number = String(form.get("request_number") ?? "").trim();
    const technician_name = String(form.get("technician_name") ?? "").trim();
    const technician_phone = String(form.get("technician_phone") ?? "").trim();
    const branch_id = (form.get("branch_id") ? String(form.get("branch_id")) : null) || null;
    const location_lat = form.get("location_lat") ? Number(form.get("location_lat")) : null;
    const location_lng = form.get("location_lng") ? Number(form.get("location_lng")) : null;
    const audio = form.get("audio") as File | null;

    if (!request_number || !technician_name || !technician_phone) {
      return json({ error: "الحقول المطلوبة ناقصة" }, 400);
    }
    if (request_number.length > 100 || technician_name.length > 200 || technician_phone.length > 30) {
      return json({ error: "قيم طويلة جدًا" }, 400);
    }

    const supa = serviceClient();

    const { data: reportRow, error: insErr } = await supa
      .from("maintenance_voice_reports")
      .insert({
        request_number,
        technician_name,
        technician_phone,
        branch_id,
        location_lat,
        location_lng,
        status: "voice_report_received",
      })
      .select("id")
      .single();
    if (insErr || !reportRow) {
      console.error("insert report failed", insErr);
      return json({ error: "فشل إنشاء التقرير" }, 500);
    }
    const report_id = reportRow.id as string;

    await supa.from("maintenance_audit_events").insert({
      report_id,
      event_type: "report_created",
      actor: `technician:${technician_phone}`,
      payload: { request_number },
    });

    // Upload audio
    let audio_path: string | null = null;
    let audio_duration_sec: number | null = null;
    if (audio && audio.size > 0) {
      audio_path = `${report_id}/audio/${crypto.randomUUID()}-${audio.name || "recording"}`;
      const { error: upErr } = await supa.storage.from(BUCKET).upload(audio_path, audio, {
        contentType: audio.type || "audio/webm",
        upsert: false,
      });
      if (upErr) {
        console.error("audio upload failed", upErr);
      } else {
        await supa.from("maintenance_report_media").insert({
          report_id,
          kind: "audio",
          storage_path: audio_path,
          mime: audio.type,
          size_bytes: audio.size,
        });
        const dur = form.get("audio_duration_sec");
        if (dur) audio_duration_sec = Number(dur);
      }
    }

    // Upload before/after images
    for (const kind of ["before", "after"] as const) {
      const files = form.getAll(`${kind}[]`);
      for (const f of files) {
        if (!(f instanceof File) || f.size === 0) continue;
        if (f.size > 15 * 1024 * 1024) continue;
        const path = `${report_id}/${kind}/${crypto.randomUUID()}-${f.name}`;
        const { error: upErr } = await supa.storage.from(BUCKET).upload(path, f, {
          contentType: f.type,
          upsert: false,
        });
        if (upErr) {
          console.error(`${kind} upload failed`, upErr);
          continue;
        }
        await supa.from("maintenance_report_media").insert({
          report_id,
          kind,
          storage_path: path,
          mime: f.type,
          size_bytes: f.size,
        });
      }
    }

    // Transcribe
    let transcript_raw: string | null = null;
    let structured_data: Record<string, unknown> | null = null;
    let newStatus: string = "transcription_pending";

    if (audio_path && audio && audio.size > 0) {
      transcript_raw = await transcribeArabic(audio);
      if (transcript_raw) {
        newStatus = "transcription_ready";
        structured_data = await extractStructured(transcript_raw);
      }
    }

    await supa
      .from("maintenance_voice_reports")
      .update({
        audio_path,
        audio_duration_sec,
        transcript_raw,
        structured_data,
        status: newStatus,
      })
      .eq("id", report_id);

    await supa.from("maintenance_audit_events").insert({
      report_id,
      event_type: "transcription_completed",
      actor: "system",
      payload: {
        transcribed: !!transcript_raw,
        structured: !!structured_data,
      },
    });

    return json({
      report_id,
      status: newStatus,
      transcript_raw,
      structured_data,
      message: transcript_raw
        ? "تم استلام التسجيل ومعالجته"
        : "تم استلام التسجيل. لم تكتمل المعالجة تلقائيًا — يمكنك كتابة ملخص يدوي.",
    });
  } catch (e) {
    console.error("submit fatal", e);
    return json({ error: e instanceof Error ? e.message : "خطأ غير معروف" }, 500);
  }
});
