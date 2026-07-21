import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";
import { getVoiceReport, listVoiceReports, resendApproval } from "@/lib/voice-report-api";
import { Copy, RefreshCw, Loader2, Send } from "lucide-react";

const STATUS_LABEL: Record<string, string> = {
  voice_report_received: "تم استلام الصوت",
  transcription_pending: "قيد المعالجة",
  transcription_ready: "يحتاج مراجعة الفني",
  technician_confirmed: "أكده الفني",
  awaiting_branch_approval: "بانتظار اعتماد الفرع",
  approved: "معتمد",
  approved_with_notes: "معتمد بملاحظات",
  rejected: "مرفوض",
  expired: "انتهت صلاحية الرابط",
  superseded: "أُلغي بإصدار جديد",
};

const STATUS_COLOR: Record<string, string> = {
  approved: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  approved_with_notes: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  rejected: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  awaiting_branch_approval: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  expired: "bg-gray-200 text-gray-700",
};

export default function VoiceReportsTab() {
  const [rows, setRows] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState<string | null>(null);
  const [detail, setDetail] = useState<any>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [adminKey, setAdminKey] = useState(() => localStorage.getItem("uberfix_admin_key") ?? "");

  const load = async () => {
    setLoading(true);
    try {
      const data = await listVoiceReports(adminKey || undefined);
      setRows(data);
    } catch (e) {
      toast({ title: "فشل التحميل", description: e instanceof Error ? e.message : "", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); /* eslint-disable-next-line */ }, []);

  useEffect(() => {
    if (!selected) return;
    setDetailLoading(true);
    getVoiceReport(selected, adminKey || undefined)
      .then(setDetail)
      .catch((e) => toast({ title: "فشل", description: e.message, variant: "destructive" }))
      .finally(() => setDetailLoading(false));
  }, [selected, adminKey]);

  const saveKey = () => {
    localStorage.setItem("uberfix_admin_key", adminKey);
    toast({ title: "تم حفظ المفتاح محليًا" });
    load();
  };

  const copyApprovalUrl = (report: any) => {
    // We don't have raw token; only resend can produce new one.
    const req = report.approvals?.[0];
    if (!req) return toast({ title: "لا يوجد رابط نشط. استخدم إعادة الإرسال." });
    toast({ title: "الرابط الأصلي غير قابل للعرض لأمان النظام. استخدم إعادة الإرسال." });
  };

  const doResend = async (reportId: string) => {
    try {
      const r = await resendApproval(reportId, adminKey || undefined);
      await navigator.clipboard.writeText(r.approval_url);
      toast({ title: "تم توليد رابط جديد ونسخه", description: `حالة البريد: ${r.email_status}` });
      load();
      if (selected === reportId) setSelected(reportId);
    } catch (e) {
      toast({ title: "فشل", description: e instanceof Error ? e.message : "", variant: "destructive" });
    }
  };

  return (
    <div className="space-y-4">
      <div className="rounded-xl border p-3 bg-muted/50 flex flex-col sm:flex-row gap-2 items-start sm:items-center">
        <Input
          placeholder="UBERFIX_ADMIN_KEY (اختياري)"
          value={adminKey}
          onChange={(e) => setAdminKey(e.target.value)}
          className="max-w-xs"
          type="password"
        />
        <Button size="sm" variant="outline" onClick={saveKey}>حفظ وتحديث</Button>
        <Button size="sm" variant="ghost" onClick={load} className="gap-1">
          <RefreshCw className="h-4 w-4" /> تحديث
        </Button>
        <span className="text-xs text-muted-foreground">
          إن ضبطت UBERFIX_ADMIN_KEY في secrets فأدخله للوصول للتقارير.
        </span>
      </div>

      {loading ? (
        <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin" /></div>
      ) : rows.length === 0 ? (
        <div className="text-center py-10 text-muted-foreground">لا توجد تقارير بعد.</div>
      ) : (
        <div className="rounded-xl border overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/50">
              <tr>
                <th className="p-2 text-right">رقم الطلب</th>
                <th className="p-2 text-right">الفني</th>
                <th className="p-2 text-right">الفرع</th>
                <th className="p-2 text-right">الحالة</th>
                <th className="p-2 text-right">التاريخ</th>
                <th className="p-2"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} className="border-t hover:bg-accent/50">
                  <td className="p-2 font-mono" dir="ltr">{r.request_number}</td>
                  <td className="p-2">{r.technician_name}</td>
                  <td className="p-2">{r.branches?.name ?? "-"}</td>
                  <td className="p-2">
                    <span className={`px-2 py-0.5 rounded-full text-xs ${STATUS_COLOR[r.status] ?? "bg-muted"}`}>
                      {STATUS_LABEL[r.status] ?? r.status}
                    </span>
                  </td>
                  <td className="p-2 text-xs text-muted-foreground">{new Date(r.created_at).toLocaleString("ar-EG")}</td>
                  <td className="p-2 space-x-1 space-x-reverse">
                    <Button size="sm" variant="outline" onClick={() => setSelected(r.id)}>تفاصيل</Button>
                    {r.status === "awaiting_branch_approval" || r.status === "expired" ? (
                      <Button size="sm" variant="ghost" onClick={() => doResend(r.id)} className="gap-1">
                        <Send className="h-3 w-3" /> رابط جديد
                      </Button>
                    ) : null}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setSelected(null)}>
          <div className="bg-background rounded-xl p-4 max-w-2xl w-full max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            {detailLoading || !detail ? (
              <div className="flex justify-center py-10"><Loader2 className="h-6 w-6 animate-spin" /></div>
            ) : (
              <ReportDetail data={detail} onResend={() => doResend(detail.report.id)} />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

function ReportDetail({ data, onResend }: { data: any; onResend: () => void }) {
  const r = data.report;
  const audio = data.media.find((m: any) => m.kind === "audio");
  const before = data.media.filter((m: any) => m.kind === "before");
  const after = data.media.filter((m: any) => m.kind === "after");
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-lg font-bold">تفاصيل التقرير</h3>
          <p className="text-sm text-muted-foreground" dir="ltr">{r.request_number}</p>
        </div>
        <span className={`px-2 py-0.5 rounded-full text-xs ${STATUS_COLOR[r.status] ?? "bg-muted"}`}>
          {STATUS_LABEL[r.status] ?? r.status}
        </span>
      </div>

      {audio && (
        <div>
          <p className="text-sm font-semibold mb-1">التسجيل</p>
          <audio src={audio.url} controls className="w-full" />
        </div>
      )}

      {r.transcript_raw && (
        <div>
          <p className="text-sm font-semibold mb-1">النص المنسوخ</p>
          <p className="text-sm bg-muted p-3 rounded whitespace-pre-wrap">{r.transcript_raw}</p>
        </div>
      )}

      {r.structured_data && (
        <div>
          <p className="text-sm font-semibold mb-1">البيانات المنظمة</p>
          <pre className="text-xs bg-muted p-3 rounded overflow-auto max-h-64">{JSON.stringify(r.structured_data, null, 2)}</pre>
        </div>
      )}

      {r.manual_summary && (
        <div>
          <p className="text-sm font-semibold mb-1">ملخص يدوي</p>
          <p className="text-sm bg-muted p-3 rounded whitespace-pre-wrap">{r.manual_summary}</p>
        </div>
      )}

      {(before.length > 0 || after.length > 0) && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-sm font-semibold mb-1">قبل</p>
            <div className="grid grid-cols-2 gap-1">
              {before.map((m: any) => <img key={m.id} src={m.url} className="w-full h-24 object-cover rounded" />)}
            </div>
          </div>
          <div>
            <p className="text-sm font-semibold mb-1">بعد</p>
            <div className="grid grid-cols-2 gap-1">
              {after.map((m: any) => <img key={m.id} src={m.url} className="w-full h-24 object-cover rounded" />)}
            </div>
          </div>
        </div>
      )}

      {data.approvals?.length > 0 && (
        <div>
          <p className="text-sm font-semibold mb-1">طلبات الاعتماد</p>
          <div className="space-y-2">
            {data.approvals.map((a: any) => (
              <div key={a.id} className="border rounded p-2 text-xs">
                <div>الحالة: <strong>{a.email_delivery_status}</strong> — انتهاء: {new Date(a.expires_at).toLocaleString("ar-EG")}</div>
                {a.used_at && <div>استُخدم: {new Date(a.used_at).toLocaleString("ar-EG")}</div>}
                {a.branch_approval_decisions?.map((d: any) => (
                  <div key={d.id} className="mt-1 pt-1 border-t">
                    <div>القرار: <strong>{STATUS_LABEL[d.decision] ?? d.decision}</strong></div>
                    <div>المعتمد: {d.approver_name} — {d.approver_email}</div>
                    <div>مطابقة البريد: {d.email_match}</div>
                    {d.notes && <div>ملاحظات: {d.notes}</div>}
                  </div>
                ))}
              </div>
            ))}
          </div>
          {["awaiting_branch_approval", "expired"].includes(r.status) && (
            <Button size="sm" variant="outline" className="mt-2 gap-1" onClick={onResend}>
              <Send className="h-3 w-3" /> توليد رابط جديد وإعادة إرسال
            </Button>
          )}
        </div>
      )}

      <div>
        <p className="text-sm font-semibold mb-1">سجل الأحداث</p>
        <div className="space-y-1 text-xs">
          {data.events?.map((e: any) => (
            <div key={e.id} className="flex justify-between border-b py-1">
              <span>{e.event_type}</span>
              <span className="text-muted-foreground">{new Date(e.created_at).toLocaleString("ar-EG")}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
