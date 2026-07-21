import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import VoiceRecorder from "@/components/technician/VoiceRecorder";
import PhotoUploader from "@/components/technician/PhotoUploader";
import {
  confirmReport,
  fetchBranches,
  submitReport,
  type StructuredData,
} from "@/lib/voice-report-api";
import { Loader2, CheckCircle2, AlertCircle, Copy } from "lucide-react";

const step1Schema = z.object({
  request_number: z.string().trim().min(3, "رقم الطلب مطلوب").max(100),
  technician_name: z.string().trim().min(2, "اسم الفني مطلوب").max(200),
  technician_phone: z.string().trim().min(6, "الهاتف مطلوب").max(30),
  branch_id: z.string().optional(),
});

type Step = "form" | "review" | "done";

export default function TechnicianReport() {
  const nav = useNavigate();
  const [step, setStep] = useState<Step>("form");
  const [branches, setBranches] = useState<Array<{ id: string; name: string }>>([]);
  const [form, setForm] = useState({
    request_number: "",
    technician_name: "",
    technician_phone: "",
    branch_id: "",
  });
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioDuration, setAudioDuration] = useState(0);
  const [before, setBefore] = useState<File[]>([]);
  const [after, setAfter] = useState<File[]>([]);
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [reportId, setReportId] = useState<string | null>(null);
  const [transcript, setTranscript] = useState<string | null>(null);
  const [structured, setStructured] = useState<StructuredData | null>(null);
  const [manualSummary, setManualSummary] = useState("");
  const [approvalUrl, setApprovalUrl] = useState<string | null>(null);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);

  useEffect(() => {
    fetchBranches().then(setBranches).catch(() => setBranches([]));
  }, []);

  const geolocate = () => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      (p) => setCoords({ lat: p.coords.latitude, lng: p.coords.longitude }),
      () => toast({ title: "تعذر تحديد الموقع" }),
    );
  };

  const submit = async () => {
    const parsed = step1Schema.safeParse(form);
    if (!parsed.success) {
      toast({ title: "بيانات ناقصة", description: parsed.error.issues[0].message, variant: "destructive" });
      return;
    }
    if (!audioBlob) {
      toast({ title: "التسجيل الصوتي مطلوب", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const fd = new FormData();
      fd.append("request_number", form.request_number);
      fd.append("technician_name", form.technician_name);
      fd.append("technician_phone", form.technician_phone);
      if (form.branch_id) fd.append("branch_id", form.branch_id);
      if (coords) {
        fd.append("location_lat", String(coords.lat));
        fd.append("location_lng", String(coords.lng));
      }
      fd.append("audio", audioBlob, `recording.${audioBlob.type.includes("mp4") ? "mp4" : "webm"}`);
      fd.append("audio_duration_sec", String(audioDuration));
      before.forEach((f) => fd.append("before[]", f));
      after.forEach((f) => fd.append("after[]", f));

      const res = await submitReport(fd);
      setReportId(res.report_id);
      setTranscript(res.transcript_raw);
      setStructured(res.structured_data);
      setStep("review");
      toast({ title: res.message });
    } catch (e) {
      toast({ title: "فشل الإرسال", description: e instanceof Error ? e.message : "", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const confirm = async () => {
    if (!reportId) return;
    const hasContent = structured || manualSummary.trim().length > 5;
    if (!hasContent) {
      toast({ title: "أدخل ملخصًا يدويًا أو استخدم البيانات المستخرجة", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const res = await confirmReport({
        report_id: reportId,
        technician_phone: form.technician_phone,
        structured_data: structured,
        manual_summary: manualSummary.trim() || null,
      });
      setApprovalUrl(res.approval_url);
      setEmailStatus(res.email_status);
      setStep("done");
    } catch (e) {
      toast({ title: "فشل التأكيد", description: e instanceof Error ? e.message : "", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const updateStructured = (patch: Partial<StructuredData>) => {
    setStructured((s) => ({
      summary: "",
      work_done: "",
      service_items: [],
      materials: [],
      quantities: [],
      issues_remaining: "",
      technician_notes: "",
      ...(s ?? {}),
      ...patch,
    }));
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background py-6 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <header className="text-center space-y-1">
          <h1 className="text-2xl font-bold">تقرير الفني الصوتي</h1>
          <p className="text-sm text-muted-foreground">سجّل تفاصيل العمل المنجز صوتيًا، ثم يعتمد الفرع.</p>
        </header>

        {step === "form" && (
          <div className="space-y-5">
            <div className="rounded-xl border p-4 bg-card space-y-4">
              <div className="space-y-2">
                <Label>رقم طلب الصيانة *</Label>
                <Input
                  value={form.request_number}
                  onChange={(e) => setForm({ ...form, request_number: e.target.value })}
                  placeholder="مثال: MR-2026-000123"
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>اسم الفني *</Label>
                  <Input
                    value={form.technician_name}
                    onChange={(e) => setForm({ ...form, technician_name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label>هاتف الفني *</Label>
                  <Input
                    dir="ltr"
                    inputMode="tel"
                    value={form.technician_phone}
                    onChange={(e) => setForm({ ...form, technician_phone: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label>الفرع</Label>
                <select
                  className="w-full h-10 rounded-md border border-input bg-background px-3"
                  value={form.branch_id}
                  onChange={(e) => setForm({ ...form, branch_id: e.target.value })}
                >
                  <option value="">— اختر الفرع —</option>
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>{b.name}</option>
                  ))}
                </select>
                {branches.length === 0 && (
                  <p className="text-xs text-muted-foreground">لا توجد فروع مسجّلة بعد.</p>
                )}
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Button type="button" variant="outline" size="sm" onClick={geolocate}>
                  تحديد الموقع الحالي
                </Button>
                {coords && <span className="text-muted-foreground">{coords.lat.toFixed(4)}, {coords.lng.toFixed(4)}</span>}
              </div>
            </div>

            <VoiceRecorder onReady={(b, d) => { setAudioBlob(b); setAudioDuration(d); }} />

            <div className="rounded-xl border p-4 bg-card space-y-4">
              <PhotoUploader label="صور قبل العمل" files={before} onChange={setBefore} />
              <PhotoUploader label="صور بعد العمل" files={after} onChange={setAfter} />
            </div>

            <Button onClick={submit} disabled={submitting} className="w-full h-12 text-base">
              {submitting ? <Loader2 className="h-4 w-4 animate-spin ml-2" /> : null}
              إرسال ومعالجة التسجيل
            </Button>
          </div>
        )}

        {step === "review" && (
          <div className="space-y-4">
            <div className="rounded-xl border p-4 bg-yellow-50 dark:bg-yellow-950/30 border-yellow-300 flex gap-3 items-start">
              <AlertCircle className="h-5 w-5 text-yellow-600 shrink-0" />
              <div className="text-sm">
                <p className="font-semibold">راجع البيانات قبل الإرسال للاعتماد</p>
                <p className="text-muted-foreground">
                  {transcript
                    ? "النص المنسوخ والبيانات المستخرجة قابلة للتعديل. لن يُرسل للفرع قبل تأكيدك."
                    : "لم تكتمل معالجة الصوت تلقائيًا. اكتب ملخصًا يدويًا للمتابعة."}
                </p>
              </div>
            </div>

            {transcript && (
              <div className="rounded-xl border p-4 bg-card space-y-2">
                <Label>النص المنسوخ (كما نطقه الفني)</Label>
                <Textarea
                  value={transcript}
                  onChange={(e) => setTranscript(e.target.value)}
                  rows={4}
                  className="text-sm"
                />
                <p className="text-xs text-muted-foreground">النص الأصلي محفوظ. أي تعديل يعتبر تصحيحًا يدويًا للفني.</p>
              </div>
            )}

            {structured && (
              <div className="rounded-xl border p-4 bg-card space-y-3">
                <p className="font-semibold text-sm">البيانات المستخرجة (استنتاج الوكيل — راجعها)</p>
                {(["summary", "work_done", "issues_remaining", "technician_notes"] as const).map((k) => (
                  <div key={k} className="space-y-1">
                    <Label className="text-xs">
                      {k === "summary" ? "الملخص" : k === "work_done" ? "العمل المنجز" : k === "issues_remaining" ? "مشاكل باقية" : "ملاحظات الفني"}
                    </Label>
                    <Textarea
                      rows={2}
                      value={structured[k] as string}
                      onChange={(e) => updateStructured({ [k]: e.target.value } as Partial<StructuredData>)}
                    />
                  </div>
                ))}
                {(["service_items", "materials", "quantities"] as const).map((k) => (
                  <div key={k} className="space-y-1">
                    <Label className="text-xs">
                      {k === "service_items" ? "البنود" : k === "materials" ? "المواد" : "الكميات"}
                    </Label>
                    <Textarea
                      rows={2}
                      value={(structured[k] as string[]).join("\n")}
                      onChange={(e) => updateStructured({ [k]: e.target.value.split("\n").filter(Boolean) } as Partial<StructuredData>)}
                      placeholder="بند واحد لكل سطر"
                    />
                  </div>
                ))}
              </div>
            )}

            <div className="rounded-xl border p-4 bg-card space-y-2">
              <Label>ملخص يدوي (اختياري — إلزامي إذا فشلت المعالجة)</Label>
              <Textarea
                value={manualSummary}
                onChange={(e) => setManualSummary(e.target.value)}
                rows={4}
                placeholder="اكتب ملخصًا مباشرًا هنا إذا أردت"
              />
            </div>

            <Button onClick={confirm} disabled={submitting} className="w-full h-12">
              {submitting && <Loader2 className="h-4 w-4 animate-spin ml-2" />}
              تأكيد وإرسال للفرع للاعتماد
            </Button>
          </div>
        )}

        {step === "done" && approvalUrl && (
          <div className="space-y-4 text-center">
            <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto" />
            <h2 className="text-xl font-bold">تم إرسال التقرير للاعتماد</h2>
            <p className="text-sm text-muted-foreground">
              حالة البريد:{" "}
              <span className="font-semibold">
                {emailStatus === "sent" && "أُرسل البريد إلى الفرع"}
                {emailStatus === "configuration_required" && "إعدادات البريد ناقصة — انسخ الرابط وأرسله يدويًا"}
                {emailStatus === "failed" && "فشل الإرسال — يمكن إعادة المحاولة من لوحة التحكم"}
                {!emailStatus && "قيد المعالجة"}
              </span>
            </p>
            <div className="rounded-lg border p-3 bg-muted text-xs break-all font-mono select-all" dir="ltr">
              {approvalUrl}
            </div>
            <Button
              variant="outline"
              onClick={() => {
                navigator.clipboard.writeText(approvalUrl);
                toast({ title: "تم نسخ الرابط" });
              }}
              className="gap-2"
            >
              <Copy className="h-4 w-4" /> نسخ الرابط
            </Button>
            <div className="pt-4">
              <Button onClick={() => nav("/")}>عودة للرئيسية</Button>
            </div>
          </div>
        )}

        <div className="text-center pt-4">
          <Link to="/" className="text-xs text-muted-foreground hover:underline">
            الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
