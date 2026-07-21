import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { handleOptions, json } from "../_shared/cors.ts";
import { serviceClient } from "../_shared/supa.ts";
import { computeContentHash, randomTokenHex, sha256Hex } from "../_shared/hash.ts";

const APP_BASE_URL = Deno.env.get("APP_BASE_URL") ?? "https://uberfix-eg.lovable.app";
const TOKEN_TTL_HOURS = 72;

serve(async (req) => {
  const opt = handleOptions(req);
  if (opt) return opt;
  if (req.method !== "POST") return json({ error: "Method not allowed" }, 405);

  try {
    const body = await req.json();
    const report_id = String(body.report_id ?? "");
    const technician_phone = String(body.technician_phone ?? "");
    const structured_data = body.structured_data ?? null;
    const manual_summary = body.manual_summary ? String(body.manual_summary).slice(0, 4000) : null;

    if (!report_id || !technician_phone) return json({ error: "بيانات ناقصة" }, 400);

    const supa = serviceClient();
    const { data: report, error } = await supa
      .from("maintenance_voice_reports")
      .select("id, technician_phone, transcript_raw, status")
      .eq("id", report_id)
      .maybeSingle();

    if (error || !report) return json({ error: "التقرير غير موجود" }, 404);
    if (report.technician_phone !== technician_phone) {
      return json({ error: "غير مصرح" }, 403);
    }
    if (["approved", "approved_with_notes", "rejected"].includes(report.status)) {
      return json({ error: "التقرير محسوم بالفعل" }, 409);
    }

    const content_hash = await computeContentHash({
      transcript_raw: report.transcript_raw,
      structured_data,
      manual_summary,
    });

    await supa
      .from("maintenance_voice_reports")
      .update({
        structured_data,
        manual_summary,
        content_hash,
        technician_confirmed_at: new Date().toISOString(),
        status: "awaiting_branch_approval",
      })
      .eq("id", report_id);

    // Create approval token
    const rawToken = randomTokenHex(32);
    const token_hash = await sha256Hex(rawToken);
    const expires_at = new Date(Date.now() + TOKEN_TTL_HOURS * 3600 * 1000).toISOString();

    const { data: appReq, error: appErr } = await supa
      .from("branch_approval_requests")
      .insert({
        report_id,
        token_hash,
        expires_at,
        email_delivery_status: "pending",
      })
      .select("id")
      .single();
    if (appErr || !appReq) return json({ error: "فشل إنشاء طلب الاعتماد" }, 500);

    await supa.from("maintenance_audit_events").insert({
      report_id,
      event_type: "technician_confirmed",
      actor: `technician:${technician_phone}`,
      payload: { content_hash, approval_request_id: appReq.id },
    });

    // Fire email (best-effort)
    let email_status = "pending";
    try {
      const resp = await fetch(`${Deno.env.get("SUPABASE_URL")}/functions/v1/send-branch-approval-request`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")}`,
        },
        body: JSON.stringify({ approval_request_id: appReq.id, raw_token: rawToken }),
      });
      const j = await resp.json().catch(() => ({}));
      email_status = j.status ?? "pending";
    } catch (e) {
      console.error("email dispatch failed", e);
    }

    const approval_url = `${APP_BASE_URL}/branch-approval/${rawToken}`;
    return json({
      ok: true,
      approval_request_id: appReq.id,
      approval_url,
      email_status,
      expires_at,
    });
  } catch (e) {
    console.error("confirm fatal", e);
    return json({ error: e instanceof Error ? e.message : "خطأ" }, 500);
  }
});
