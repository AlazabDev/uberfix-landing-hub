import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import { decideApproval, viewApproval } from "@/lib/voice-report-api";
import { Loader2, CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

type Decision = "approved" | "approved_with_notes" | "rejected";

export default function BranchApproval() {
  const { token = "" } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<any>(null);
  const [decision, setDecision] = useState<Decision | null>(null);
  const [approverName, setApproverName] = useState("");
  const [approverEmail, setApproverEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<{ decision: Decision; email_match: string } | null>(null);

  useEffect(() => {
    viewApproval(token)
      .then(setData)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [token]);

  const submit = async () => {
    if (!decision) return;
    if (!approverName.trim() || !approverEmail.trim()) {
      toast({ title: "الاسم والبريد مطلوبان", variant: "destructive" });
      return;
    }
    if (decision !== "approved" && notes.trim().length < 3) {
      toast({ title: "الملاحظات مطلوبة", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const r = await decideApproval({
        token,
        decision,
        approver_name: approverName.trim(),
        approver_email: approverEmail.trim(),
        notes: notes.trim() || undefined,
      });
      setResult({ decision: r.decision, email_match: r.email_match });
    } catch (e) {
      toast({ title: "فشل الإرسال", description: e instanceof Error ? e.message : "", variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div dir="rtl" className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md text-center space-y-3">
          <XCircle className="h-12 w-12 text-destructive mx-auto" />
          <h1 className="text-xl font-bold">تعذر فتح رابط الاعتماد</h1>
          <p className="text-muted-foreground">{error ?? "غير معروف"}</p>
        </div>
      </div>
    );
  }

  if (result) {
    return (
      <div dir="rtl" className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md text-center space-y-4">
          <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto" />
          <h1 className="text-xl font-bold">تم تسجيل قراركم</h1>
          <p className="text-muted-foreground">
            القرار:{" "}
            <strong>
              {result.decision === "approved" ? "اعتماد" : result.decision === "approved_with_notes" ? "اعتماد بملاحظات" : "رفض"}
            </strong>
          </p>
          {result.email_match === "mismatched" && (
            <p className="text-sm text-yellow-600 flex items-center gap-1 justify-center">
              <AlertTriangle className="h-4 w-4" /> البريد لا يطابق البريد الرسمي للفرع (سُجّل في السجل).
            </p>
          )}
          <p className="text-xs text-muted-foreground pt-4">
            اعتماد موثق إلكترونيًا داخل UberFix — لا يُعد توقيعًا إلكترونيًا معتمدًا قانونيًا إلا عند ربط مزود توقيع معتمد.
          </p>
        </div>
      </div>
    );
  }

  const r = data.report;
  const s = r.structured_data;
  const audio = data.media.find((m: any) => m.kind === "audio");
  const beforeImgs = data.media.filter((m: any) => m.kind === "before");
  const afterImgs = data.media.filter((m: any) => m.kind === "after");

  return (
    <div dir="rtl" className="min-h-screen bg-background py-6 px-4">
      <div className="max-w-2xl mx-auto space-y-5">
        <header className="text-center">
          <h1 className="text-2xl font-bold">اعتماد تقرير الصيانة</h1>
          <p className="text-sm text-muted-foreground">
            رقم الطلب: <strong dir="ltr">{r.request_number}</strong>
            {r.branch?.name && <> — فرع: <strong>{r.branch.name}</strong></>}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            وقت التقرير: {new Date(r.technician_confirmed_at).toLocaleString("ar-EG")}
          </p>
        </header>

        {s && (
          <section className="rounded-xl border bg-card p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-sm mb-1">الملخص</h3>
              <p className="text-sm">{s.summary}</p>
            </div>
            <div>
              <h3 className="font-semibold text-sm mb-1">العمل المنجز</h3>
              <p className="text-sm">{s.work_done}</p>
            </div>
            {s.service_items?.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm mb-1">البنود</h3>
                <ul className="text-sm list-disc pr-5">
                  {s.service_items.map((x: string, i: number) => <li key={i}>{x}</li>)}
                </ul>
              </div>
            )}
            {s.materials?.length > 0 && (
              <div>
                <h3 className="font-semibold text-sm mb-1">المواد</h3>
                <ul className="text-sm list-disc pr-5">
                  {s.materials.map((x: string, i: number) => <li key={i}>{x}</li>)}
                </ul>
              </div>
            )}
            {s.issues_remaining && (
              <div>
                <h3 className="font-semibold text-sm mb-1">مشاكل باقية</h3>
                <p className="text-sm">{s.issues_remaining}</p>
              </div>
            )}
          </section>
        )}

        {r.manual_summary && (
          <section className="rounded-xl border bg-card p-4">
            <h3 className="font-semibold text-sm mb-1">ملخص الفني اليدوي</h3>
            <p className="text-sm whitespace-pre-wrap">{r.manual_summary}</p>
          </section>
        )}

        {audio && (
          <section className="rounded-xl border bg-card p-4">
            <h3 className="font-semibold text-sm mb-2">التسجيل الصوتي الأصلي</h3>
            <audio src={audio.url} controls className="w-full" />
          </section>
        )}

        {(beforeImgs.length > 0 || afterImgs.length > 0) && (
          <section className="rounded-xl border bg-card p-4 space-y-3">
            {beforeImgs.length > 0 && (
              <>
                <h3 className="font-semibold text-sm">صور قبل</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {beforeImgs.map((m: any) => (
                    <img key={m.id} src={m.url} alt="قبل" className="rounded-md border object-cover w-full h-32" />
                  ))}
                </div>
              </>
            )}
            {afterImgs.length > 0 && (
              <>
                <h3 className="font-semibold text-sm">صور بعد</h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {afterImgs.map((m: any) => (
                    <img key={m.id} src={m.url} alt="بعد" className="rounded-md border object-cover w-full h-32" />
                  ))}
                </div>
              </>
            )}
          </section>
        )}

        <section className="rounded-xl border bg-card p-4 space-y-3">
          <h3 className="font-semibold">قرار الاعتماد</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {(["approved", "approved_with_notes", "rejected"] as Decision[]).map((d) => (
              <Button
                key={d}
                type="button"
                variant={decision === d ? "default" : "outline"}
                onClick={() => setDecision(d)}
              >
                {d === "approved" ? "اعتماد" : d === "approved_with_notes" ? "اعتماد بملاحظات" : "رفض"}
              </Button>
            ))}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1">
              <Label>اسم المعتمد *</Label>
              <Input value={approverName} onChange={(e) => setApproverName(e.target.value)} />
            </div>
            <div className="space-y-1">
              <Label>البريد الرسمي *</Label>
              <Input dir="ltr" type="email" value={approverEmail} onChange={(e) => setApproverEmail(e.target.value)} />
            </div>
          </div>
          <div className="space-y-1">
            <Label>ملاحظات {decision !== "approved" && "*"}</Label>
            <Textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
          <Button className="w-full" onClick={submit} disabled={submitting || !decision}>
            {submitting && <Loader2 className="h-4 w-4 animate-spin ml-2" />}
            تسجيل القرار
          </Button>
        </section>

        <p className="text-xs text-muted-foreground text-center pt-2">
          اعتماد موثق إلكترونيًا داخل UberFix — لا يُعد توقيعًا إلكترونيًا معتمدًا قانونيًا إلا عند ربط مزود توقيع معتمد.
        </p>
      </div>
    </div>
  );
}
