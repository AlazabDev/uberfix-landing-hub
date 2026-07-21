import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { handleOptions, json } from "../_shared/cors.ts";
import { serviceClient } from "../_shared/supa.ts";

const APP_BASE_URL = Deno.env.get("APP_BASE_URL") ?? "https://uberfix-eg.lovable.app";
const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const FROM_EMAIL = Deno.env.get("UBERFIX_FROM_EMAIL") ?? "UberFix <onboarding@resend.dev>";

serve(async (req) => {
  const opt = handleOptions(req);
  if (opt) return opt;
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const { approval_request_id, raw_token } = await req.json();
    if (!approval_request_id || !raw_token) return json({ error: "بيانات ناقصة" }, 400);

    const supa = serviceClient();
    const { data: reqRow } = await supa
      .from("branch_approval_requests")
      .select("id, report_id, expires_at, used_at")
      .eq("id", approval_request_id)
      .maybeSingle();
    if (!reqRow) return json({ error: "طلب اعتماد غير موجود" }, 404);

    const { data: report } = await supa
      .from("maintenance_voice_reports")
      .select("request_number, branch_id, structured_data, manual_summary")
      .eq("id", reqRow.report_id)
      .maybeSingle();

    let branchName = "-";
    let branchEmail: string | null = null;
    if (report?.branch_id) {
      const { data: b } = await supa
        .from("branches")
        .select("name, official_email")
        .eq("id", report.branch_id)
        .maybeSingle();
      if (b) {
        branchName = b.name;
        branchEmail = b.official_email;
      }
    }

    const approval_url = `${APP_BASE_URL}/branch-approval/${raw_token}`;

    if (!RESEND_API_KEY || !branchEmail) {
      await supa
        .from("branch_approval_requests")
        .update({
          email_delivery_status: "configuration_required",
          email_error: !RESEND_API_KEY ? "RESEND_API_KEY missing" : "branch email missing",
        })
        .eq("id", approval_request_id);
      await supa.from("maintenance_audit_events").insert({
        report_id: reqRow.report_id,
        event_type: "email_configuration_required",
        actor: "system",
        payload: { reason: !RESEND_API_KEY ? "no_resend_key" : "no_branch_email" },
      });
      return json({ status: "configuration_required", approval_url });
    }

    const summary =
      (report?.structured_data as { summary?: string } | null)?.summary ??
      report?.manual_summary ??
      "تفاصيل التقرير متاحة عند فتح الرابط.";
    const expiresLocal = new Date(reqRow.expires_at).toLocaleString("ar-EG");

    const html = `<!DOCTYPE html><html dir="rtl" lang="ar"><body style="font-family:Tahoma,Arial,sans-serif;background:#f5f7fa;padding:24px">
<div style="max-width:560px;margin:auto;background:#fff;border-radius:12px;padding:24px;border:1px solid #e5e7eb">
  <h2 style="color:#0b1e3b;margin-top:0">طلب اعتماد تقرير صيانة</h2>
  <p>مرحبًا فرع <strong>${branchName}</strong>،</p>
  <p>وردنا تقرير صيانة يحتاج اعتمادكم لرقم الطلب <strong>${report?.request_number ?? "-"}</strong>.</p>
  <p style="background:#f9fafb;padding:12px;border-right:3px solid #facc15;border-radius:6px">${summary}</p>
  <p style="margin:24px 0">
    <a href="${approval_url}" style="background:#facc15;color:#0b1e3b;padding:12px 20px;border-radius:8px;text-decoration:none;font-weight:bold">فتح صفحة الاعتماد</a>
  </p>
  <p style="color:#6b7280;font-size:13px">صلاحية الرابط تنتهي في: ${expiresLocal}. الرابط للاستخدام مرة واحدة.</p>
  <p style="color:#9ca3af;font-size:12px;margin-top:24px">اعتماد موثق إلكترونيًا داخل UberFix — لا يُعد توقيعًا إلكترونيًا معتمدًا قانونيًا إلا عند ربط مزود توقيع معتمد.</p>
</div></body></html>`;

    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to: [branchEmail],
        subject: `طلب اعتماد صيانة — ${report?.request_number ?? ""}`,
        html,
      }),
    });

    if (!r.ok) {
      const err = await r.text().catch(() => "");
      await supa
        .from("branch_approval_requests")
        .update({ email_delivery_status: "failed", email_error: err.slice(0, 500) })
        .eq("id", approval_request_id);
      await supa.from("maintenance_audit_events").insert({
        report_id: reqRow.report_id,
        event_type: "email_send_failed",
        actor: "system",
        payload: { status: r.status },
      });
      return json({ status: "failed", error: err }, 200);
    }

    await supa
      .from("branch_approval_requests")
      .update({ email_delivery_status: "sent", email_sent_at: new Date().toISOString() })
      .eq("id", approval_request_id);
    await supa.from("maintenance_audit_events").insert({
      report_id: reqRow.report_id,
      event_type: "email_sent",
      actor: "system",
      payload: { to: branchEmail },
    });

    return json({ status: "sent" });
  } catch (e) {
    console.error("send email fatal", e);
    return json({ error: e instanceof Error ? e.message : "خطأ" }, 500);
  }
});
