const BASE = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1`;
const ANON = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

const headers = () => ({
  apikey: ANON,
  Authorization: `Bearer ${ANON}`,
});

export interface StructuredData {
  summary: string;
  work_done: string;
  service_items: string[];
  materials: string[];
  quantities: string[];
  issues_remaining: string;
  technician_notes: string;
}

export interface SubmitResult {
  report_id: string;
  status: string;
  transcript_raw: string | null;
  structured_data: StructuredData | null;
  message: string;
  error?: string;
}

export async function fetchBranches(): Promise<Array<{ id: string; name: string }>> {
  const r = await fetch(`${BASE}/branches-public`, { headers: headers() });
  const j = await r.json();
  return j.branches ?? [];
}

export async function submitReport(fd: FormData): Promise<SubmitResult> {
  const r = await fetch(`${BASE}/technician-report-submit`, {
    method: "POST",
    headers: headers(),
    body: fd,
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error ?? "فشل الإرسال");
  return j;
}

export async function confirmReport(payload: {
  report_id: string;
  technician_phone: string;
  structured_data: StructuredData | null;
  manual_summary: string | null;
}): Promise<{ approval_url: string; email_status: string; expires_at: string }> {
  const r = await fetch(`${BASE}/technician-report-confirm`, {
    method: "POST",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error ?? "فشل التأكيد");
  return j;
}

export async function viewApproval(token: string) {
  const r = await fetch(`${BASE}/branch-approval-view?token=${encodeURIComponent(token)}`, {
    headers: headers(),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error ?? "خطأ");
  return j;
}

export async function decideApproval(payload: {
  token: string;
  decision: "approved" | "approved_with_notes" | "rejected";
  approver_name: string;
  approver_email: string;
  notes?: string;
}) {
  const r = await fetch(`${BASE}/branch-approval-decide`, {
    method: "POST",
    headers: { ...headers(), "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error ?? "فشل الحفظ");
  return j;
}

export async function listVoiceReports(adminKey?: string) {
  const h: Record<string, string> = { ...headers() };
  if (adminKey) h["x-admin-key"] = adminKey;
  const r = await fetch(`${BASE}/list-voice-reports`, { headers: h });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error ?? "خطأ");
  return j.reports as Array<{
    id: string;
    request_number: string;
    technician_name: string;
    status: string;
    created_at: string;
    technician_confirmed_at: string | null;
    branch_id: string | null;
    branches: { name: string } | null;
  }>;
}

export async function getVoiceReport(reportId: string, adminKey?: string) {
  const h: Record<string, string> = { ...headers() };
  if (adminKey) h["x-admin-key"] = adminKey;
  const r = await fetch(`${BASE}/list-voice-reports?report_id=${reportId}`, { headers: h });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error ?? "خطأ");
  return j;
}

export async function resendApproval(reportId: string, adminKey?: string) {
  const h: Record<string, string> = { ...headers(), "Content-Type": "application/json" };
  if (adminKey) h["x-admin-key"] = adminKey;
  const r = await fetch(`${BASE}/resend-branch-approval`, {
    method: "POST",
    headers: h,
    body: JSON.stringify({ report_id: reportId }),
  });
  const j = await r.json();
  if (!r.ok) throw new Error(j.error ?? "فشل");
  return j;
}
