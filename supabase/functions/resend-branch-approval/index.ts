import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { handleOptions, json } from "../_shared/cors.ts";
import { serviceClient } from "../_shared/supa.ts";
import { randomTokenHex, sha256Hex } from "../_shared/hash.ts";

const ADMIN_KEY = Deno.env.get("UBERFIX_ADMIN_KEY");
const TOKEN_TTL_HOURS = 72;

serve(async (req) => {
  const opt = handleOptions(req);
  if (opt) return opt;
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);
  if (ADMIN_KEY && req.headers.get("x-admin-key") !== ADMIN_KEY) {
    return json({ error: "غير مصرح" }, 401);
  }

  try {
    const { report_id } = await req.json();
    if (!report_id) return json({ error: "بيانات ناقصة" }, 400);
    const supa = serviceClient();
    const { data: report } = await supa
      .from("maintenance_voice_reports")
      .select("id, status")
      .eq("id", report_id)
      .maybeSingle();
    if (!report) return json({ error: "not_found" }, 404);
    if (!["awaiting_branch_approval", "expired"].includes(report.status)) {
      return json({ error: `الحالة الحالية لا تسمح بإعادة الإرسال (${report.status})` }, 409);
    }

    // Invalidate any prior active tokens for this report
    await supa
      .from("branch_approval_requests")
      .update({ used_at: new Date().toISOString(), email_error: "superseded_by_resend" })
      .eq("report_id", report_id)
      .is("used_at", null);

    const rawToken = randomTokenHex(32);
    const token_hash = await sha256Hex(rawToken);
    const expires_at = new Date(Date.now() + TOKEN_TTL_HOURS * 3600 * 1000).toISOString();

    const { data: appReq, error } = await supa
      .from("branch_approval_requests")
      .insert({ report_id, token_hash, expires_at, email_delivery_status: "pending" })
      .select("id")
      .single();
    if (error || !appReq) return json({ error: "فشل الإنشاء" }, 500);

    await supa.from("maintenance_voice_reports").update({ status: "awaiting_branch_approval" }).eq("id", report_id);

    const r = await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/send-branch-approval-request`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
      },
      body: JSON.stringify({ approval_request_id: appReq.id, raw_token: rawToken }),
    });
    const j = await r.json().catch(() => ({}));
    return json({ ok: true, approval_url: `${Deno.env.get("APP_BASE_URL") ?? "https://uberfix-eg.lovable.app"}/branch-approval/${rawToken}`, email_status: j.status ?? "unknown" });
  } catch (e) {
    return json({ error: e instanceof Error ? e.message : "خطأ" }, 500);
  }
});
