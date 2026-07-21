import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { handleOptions, json } from "../_shared/cors.ts";
import { serviceClient } from "../_shared/supa.ts";

const BUCKET = "maintenance-evidence";
const ADMIN_KEY = Deno.env.get("UBERFIX_ADMIN_KEY");

function isAuthorized(req: Request) {
  if (!ADMIN_KEY) return true; // MVP: if no admin key set, allow (documented)
  return req.headers.get("x-admin-key") === ADMIN_KEY;
}

serve(async (req) => {
  const opt = handleOptions(req);
  if (opt) return opt;

  try {
    if (!isAuthorized(req)) return json({ error: "غير مصرح" }, 401);
    const supa = serviceClient();
    const url = new URL(req.url);
    const report_id = url.searchParams.get("report_id");

    if (report_id) {
      const { data: r } = await supa
        .from("maintenance_voice_reports")
        .select("*, branches(name, official_email)")
        .eq("id", report_id)
        .maybeSingle();
      if (!r) return json({ error: "not_found" }, 404);
      const { data: media } = await supa
        .from("maintenance_report_media")
        .select("id, kind, storage_path, mime")
        .eq("report_id", report_id);
      const signed: Array<{ id: string; kind: string; url: string; mime: string | null }> = [];
      for (const m of media ?? []) {
        const { data: s } = await supa.storage.from(BUCKET).createSignedUrl(m.storage_path, 300);
        if (s?.signedUrl) signed.push({ id: m.id, kind: m.kind, url: s.signedUrl, mime: m.mime });
      }
      const { data: events } = await supa
        .from("maintenance_audit_events")
        .select("*")
        .eq("report_id", report_id)
        .order("created_at", { ascending: false });
      const { data: approvals } = await supa
        .from("branch_approval_requests")
        .select("id, expires_at, used_at, email_delivery_status, email_sent_at, email_error, created_at, branch_approval_decisions(*)")
        .eq("report_id", report_id)
        .order("created_at", { ascending: false });
      return json({ report: r, media: signed, events, approvals });
    }

    const { data, error } = await supa
      .from("maintenance_voice_reports")
      .select("id, request_number, technician_name, status, created_at, technician_confirmed_at, branch_id, branches(name)")
      .order("created_at", { ascending: false })
      .limit(200);
    if (error) return json({ error: error.message }, 500);
    return json({ reports: data ?? [] });
  } catch (e) {
    console.error("list fatal", e);
    return json({ error: e instanceof Error ? e.message : "خطأ" }, 500);
  }
});
