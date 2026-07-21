import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { handleOptions, json } from "../_shared/cors.ts";
import { serviceClient } from "../_shared/supa.ts";
import { sha256Hex } from "../_shared/hash.ts";

const BUCKET = "maintenance-evidence";
const SIGN_TTL = 300; // 5 minutes

// naive in-memory rate limit per IP
const hits = new Map<string, { c: number; ts: number }>();
function rateLimit(ip: string, max = 30, windowMs = 60_000) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.ts > windowMs) {
    hits.set(ip, { c: 1, ts: now });
    return true;
  }
  rec.c++;
  return rec.c <= max;
}

serve(async (req) => {
  const opt = handleOptions(req);
  if (opt) return opt;

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token") ?? "";
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    if (!rateLimit(ip)) return json({ error: "rate_limited" }, 429);
    if (!token || token.length < 32) return json({ error: "توكن غير صالح" }, 400);

    const token_hash = await sha256Hex(token);
    const supa = serviceClient();

    const { data: appReq } = await supa
      .from("branch_approval_requests")
      .select("id, report_id, expires_at, used_at, email_delivery_status")
      .eq("token_hash", token_hash)
      .maybeSingle();

    if (!appReq) return json({ error: "الرابط غير صالح" }, 404);
    if (appReq.used_at) return json({ error: "تم استخدام الرابط مسبقًا", state: "used" }, 410);
    if (new Date(appReq.expires_at).getTime() < Date.now()) {
      return json({ error: "انتهت صلاحية الرابط", state: "expired" }, 410);
    }

    const { data: report } = await supa
      .from("maintenance_voice_reports")
      .select("id, request_number, branch_id, status, transcript_raw, structured_data, manual_summary, technician_confirmed_at, content_hash, technician_name")
      .eq("id", appReq.report_id)
      .maybeSingle();
    if (!report) return json({ error: "التقرير غير موجود" }, 404);

    let branch: { id: string; name: string } | null = null;
    if (report.branch_id) {
      const { data: b } = await supa.from("branches").select("id, name").eq("id", report.branch_id).maybeSingle();
      if (b) branch = b as { id: string; name: string };
    }

    const { data: media } = await supa
      .from("maintenance_report_media")
      .select("id, kind, storage_path, mime")
      .eq("report_id", report.id);

    const signed: Array<{ id: string; kind: string; url: string; mime: string | null }> = [];
    for (const m of media ?? []) {
      const { data: s } = await supa.storage.from(BUCKET).createSignedUrl(m.storage_path, SIGN_TTL);
      if (s?.signedUrl) signed.push({ id: m.id, kind: m.kind, url: s.signedUrl, mime: m.mime });
    }

    return json({
      approval_request_id: appReq.id,
      expires_at: appReq.expires_at,
      report: {
        id: report.id,
        request_number: report.request_number,
        technician_name: report.technician_name,
        branch,
        status: report.status,
        transcript_raw: report.transcript_raw,
        structured_data: report.structured_data,
        manual_summary: report.manual_summary,
        technician_confirmed_at: report.technician_confirmed_at,
        content_hash: report.content_hash,
      },
      media: signed,
    });
  } catch (e) {
    console.error("view fatal", e);
    return json({ error: e instanceof Error ? e.message : "خطأ" }, 500);
  }
});
