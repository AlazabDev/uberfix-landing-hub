import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { handleOptions, json } from "../_shared/cors.ts";
import { serviceClient } from "../_shared/supa.ts";
import { sha256Hex } from "../_shared/hash.ts";

const hits = new Map<string, { c: number; ts: number }>();
function rateLimit(ip: string, max = 15, windowMs = 60_000) {
  const now = Date.now();
  const rec = hits.get(ip);
  if (!rec || now - rec.ts > windowMs) { hits.set(ip, { c: 1, ts: now }); return true; }
  rec.c++;
  return rec.c <= max;
}

serve(async (req) => {
  const opt = handleOptions(req);
  if (opt) return opt;
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const ip = req.headers.get("x-forwarded-for") ?? "unknown";
    if (!rateLimit(ip)) return json({ error: "rate_limited" }, 429);
    const ua = req.headers.get("user-agent")?.slice(0, 500) ?? "";

    const body = await req.json();
    const token = String(body.token ?? "");
    const decision = String(body.decision ?? "");
    const approver_name = String(body.approver_name ?? "").trim().slice(0, 200);
    const approver_email = String(body.approver_email ?? "").trim().toLowerCase().slice(0, 200);
    const notes = body.notes ? String(body.notes).slice(0, 2000) : null;

    if (!token || token.length < 32) return json({ error: "توكن غير صالح" }, 400);
    if (!["approved", "approved_with_notes", "rejected"].includes(decision))
      return json({ error: "قرار غير معروف" }, 400);
    if (!approver_name || !approver_email) return json({ error: "الاسم والبريد مطلوبان" }, 400);
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(approver_email)) return json({ error: "بريد غير صالح" }, 400);
    if (decision !== "approved" && !notes) return json({ error: "الملاحظات مطلوبة" }, 400);

    const supa = serviceClient();
    const token_hash = await sha256Hex(token);

    const { data: appReq } = await supa
      .from("branch_approval_requests")
      .select("id, report_id, expires_at, used_at")
      .eq("token_hash", token_hash)
      .maybeSingle();
    if (!appReq) return json({ error: "الرابط غير صالح" }, 404);
    if (appReq.used_at) return json({ error: "تم استخدام الرابط", state: "used" }, 410);
    if (new Date(appReq.expires_at).getTime() < Date.now()) {
      await supa.from("maintenance_voice_reports").update({ status: "expired" }).eq("id", appReq.report_id);
      return json({ error: "انتهت الصلاحية", state: "expired" }, 410);
    }

    const { data: report } = await supa
      .from("maintenance_voice_reports")
      .select("id, branch_id, content_hash, status")
      .eq("id", appReq.report_id)
      .maybeSingle();
    if (!report) return json({ error: "التقرير غير موجود" }, 404);
    if (!report.content_hash) return json({ error: "التقرير لم يُؤكد بعد" }, 409);

    // email match
    let email_match: "matched" | "mismatched" | "unknown" = "unknown";
    if (report.branch_id) {
      const { data: b } = await supa
        .from("branches")
        .select("official_email")
        .eq("id", report.branch_id)
        .maybeSingle();
      if (b?.official_email) {
        email_match = b.official_email.toLowerCase() === approver_email ? "matched" : "mismatched";
      }
    }

    // Insert decision + mark used, atomically-ish
    const { error: decErr } = await supa.from("branch_approval_decisions").insert({
      approval_request_id: appReq.id,
      decision,
      approver_name,
      approver_email,
      email_match,
      notes,
      ip: ip.slice(0, 100),
      user_agent: ua,
      content_hash_at_decision: report.content_hash,
    });
    if (decErr) {
      console.error("decision insert failed", decErr);
      return json({ error: "فشل تسجيل القرار" }, 500);
    }

    await supa
      .from("branch_approval_requests")
      .update({ used_at: new Date().toISOString() })
      .eq("id", appReq.id);

    const newStatus =
      decision === "approved" ? "approved" :
      decision === "approved_with_notes" ? "approved_with_notes" :
      "rejected";
    await supa.from("maintenance_voice_reports").update({ status: newStatus }).eq("id", report.id);

    await supa.from("maintenance_audit_events").insert({
      report_id: report.id,
      event_type: `branch_decision_${decision}`,
      actor: `branch:${approver_email}`,
      payload: { email_match, notes: notes ? "provided" : null },
    });

    return json({ ok: true, decision, email_match });
  } catch (e) {
    console.error("decide fatal", e);
    return json({ error: e instanceof Error ? e.message : "خطأ" }, 500);
  }
});
