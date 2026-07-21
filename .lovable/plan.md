
# MVP: التشغيل الصوتي واعتماد الفرع

بناء مسار كامل من تسجيل الفني الصوتي إلى اعتماد الفرع عبر رابط بريد، دون المساس بالصفحة الرئيسية أو الهوية البصرية. سأضيف فقط رابطًا في `/dashboard` وفي قائمة الفنيين للوصول إلى المسار الجديد.

## القرارات والافتراضات الصريحة

- **المصادقة**: لا يوجد نظام تسجيل دخول للفنيين حاليًا في المشروع. سأعتمد على **رقم طلب الصيانة + رقم هاتف الفني** كتحقق أولي بدل مصادقة Supabase Auth الكاملة، لأن إضافة نظام Auth كامل للفنيين خارج نطاق هذا الـ MVP. صفحة `/technician-report` عامة لكن كل الكتابة تمر عبر Edge Function تتحقق من تطابق الهاتف مع طلب موجود عبر الـ gateway الخارجي. **إن رفضت هذا، أخبرني وسأضيف Auth كامل.**
- **جدول طلبات الصيانة الأصلي غير موجود محليًا** (المشروع يستدعي gateway خارجي على `zrrffsjbfkphridqyais.supabase.co`). لذلك سأربط التقارير بـ `request_number` كسلسلة نصية بدون FK، مع فهرس. لن أفترض جدول `maintenance_requests` محلي.
- **نسخ الصوت (STT)**: Lovable AI يدعم `openai/gpt-4o-transcribe` للعربية. سأنفّذها فعليًا (لا mock). في حال فشل الاستدعاء أو نفاذ الرصيد، أخزّن `transcription_pending` وأتيح للفني كتابة ملخص يدوي — بدون ادعاء نجاح.
- **استخراج JSON المنظم**: `openai/gpt-5.5` مع Structured Output بعد النسخ.
- **البريد**: Edge Function جاهزة تستخدم `RESEND_API_KEY` إن وُجد؛ وإلا `email_delivery_status='configuration_required'` مع زر نسخ الرابط.
- **الفروع**: لا يوجد جدول فروع محلي. سأضيف `branches` بسيط (id, name, official_email) يديره الأدمن يدويًا عبر SQL لهذا الـ MVP، ويُختار الفرع باسمه في نموذج الفني. البريد المعتمِد يُقارن بـ `official_email` إن وُجد.
- **التوكن**: 32 بايت عشوائي، يُرسل خام في رابط البريد، ويُخزّن `sha256` فقط. صلاحية 72 ساعة، استخدام واحد.
- **RLS**: كل الجداول RLS مفعّل، لا سياسات `TO authenticated` مفتوحة. كل الكتابة/القراءة الحساسة تمر عبر Edge Functions بمفتاح service role (server-side فقط). `anon` لا يقرأ الجداول مباشرة.

## قاعدة البيانات (migration واحدة)

- `branches(id, name, official_email, is_active)` — يديرها الأدمن.
- `maintenance_voice_reports`:
  - `id, request_number, technician_name, technician_phone, branch_id`
  - `status` enum: `voice_report_received | transcription_pending | transcription_ready | technician_confirmed | awaiting_branch_approval | approved | approved_with_notes | rejected | expired | superseded`
  - `audio_path, audio_duration_sec`
  - `transcript_raw` (نص الفني كما نُسخ)
  - `structured_data jsonb` (summary, work_done, service_items[], materials[], quantities[], issues_remaining, technician_notes)
  - `manual_summary` (بديل يدوي حين يفشل STT)
  - `technician_confirmed_at, content_hash` (sha256 للمحتوى وقت الاعتماد)
  - `created_at, updated_at`
- `maintenance_report_media(id, report_id, kind: audio|before|after|location, storage_path, mime, created_at)`
- `branch_approval_requests(id, report_id, token_hash, expires_at, used_at, email_delivery_status, email_sent_at, created_at)`
- `branch_approval_decisions(id, approval_request_id, decision: approved|approved_with_notes|rejected, approver_name, approver_email, email_match: matched|mismatched|unknown, notes, ip, user_agent, content_hash_at_decision, decided_at)`
- `maintenance_audit_events(id, report_id, event_type, actor, payload jsonb, created_at)` — تايم لاين شامل.

Storage bucket خاص `maintenance-evidence` (public=false). سياسات: قراءة/كتابة فقط عبر service role؛ العرض في الواجهة يمر بـ signed URLs من Edge Functions.

RLS: كل الجداول ENABLE RLS بدون سياسات SELECT/INSERT مفتوحة لـ anon/authenticated. الوصول كله عبر Edge Functions بـ service role. (يوجد grant للـ authenticated للمستقبل لكن بشرط ملكية عبر عمود مصادقة لاحقًا.)

## Edge Functions

1. **`technician-report-submit`** (POST, public لكن يتحقق من `request_number` عبر الـ gateway الخارجي):
   - يستقبل multipart: audio, images before/after, request_number, technician name/phone, branch_id, location.
   - يرفع الملفات لـ `maintenance-evidence` بمسارات مُشتقة من `report_id`.
   - ينشئ صف `voice_report_received`.
   - يستدعي `openai/gpt-4o-transcribe` عبر Lovable AI للنسخ العربي. عند النجاح → `transcription_ready` + `transcript_raw`. عند الفشل → `transcription_pending`.
   - إن نجح النسخ: يستدعي `openai/gpt-5.5` مع Structured Output لملء `structured_data`.
   - يعيد `report_id` للواجهة.
2. **`technician-report-confirm`** (POST): يستقبل `report_id` + phone + تعديلات الفني على `structured_data` أو `manual_summary`. يحسب `content_hash`، يحوّل الحالة إلى `awaiting_branch_approval`، يولّد token خام (32 bytes hex)، يخزّن hash + expiry، يستدعي `send-branch-approval-request`.
3. **`send-branch-approval-request`** (استدعاء داخلي أو من الـ dashboard): يرسل البريد عبر Resend إن وُجد `RESEND_API_KEY`؛ وإلا يضبط `email_delivery_status='configuration_required'`.
4. **`branch-approval-view`** (GET, public): يستقبل token، يتحقق من hash + expiry + `used_at IS NULL`، يعيد بيانات مصغّرة + signed URLs قصيرة (5 دقائق) للوسائط. rate-limit بسيط بالـ IP في الذاكرة.
5. **`branch-approval-decide`** (POST, public): token + decision + approver info + notes. يتحقق مرة أخرى، يسجّل `branch_approval_decisions`، يحسم `used_at`، يحدّث حالة التقرير، يقارن البريد بـ `branches.official_email`، يسجّل audit event، ويرفض أي تعديل جوهري لاحق (بمقارنة `content_hash_at_decision` مع `content_hash` الحالي — إن اختلف ⇒ `superseded`).
6. **`report-media-signed-url`** (GET, يستخدم من الـ dashboard فقط): يعيد signed URL لملف داخل التقرير. سيُحمى في هذا الـ MVP بمفتاح إداري بسيط قابل للتشديد لاحقًا (سأوثّق ذلك).

## الواجهة الأمامية

- **`/technician-report`** (mobile-first RTL):
  - خطوة 1: رقم الطلب + الهاتف + اختيار الفرع.
  - خطوة 2: تسجيل صوت (`MediaRecorder`, WAV via Web Audio كما توصي إرشادات Lovable STT) — بدء/إيقاف/إعادة/تشغيل/عداد.
  - خطوة 3: إضافة صور before/after + موقع اختياري (`navigator.geolocation`).
  - خطوة 4: إرسال → استدعاء `technician-report-submit`.
  - خطوة 5: شاشة مراجعة تعرض النص المنسوخ + `structured_data` قابلة للتحرير (أو حقل ملخص يدوي إن `transcription_pending`)، مع تنويه واضح "لم يُعتمد بعد".
  - خطوة 6: تأكيد → `technician-report-confirm` → شاشة نجاح.

- **`/branch-approval/:token`** (عامة، RTL):
  - تستدعي `branch-approval-view`، تعرض ملخص العمل، البنود، الصور (signed URLs)، مشغّل صوت.
  - نموذج: اسم المعتمد، البريد الرسمي، القرار (3 أزرار)، ملاحظات (إلزامية للاعتماد بملاحظات/الرفض).
  - نص القانوني الواضح: "اعتماد موثق إلكترونيًا داخل UberFix — لا يُعد توقيعًا إلكترونيًا معتمدًا قانونيًا إلا عند ربط مزود توقيع معتمد."

- **`/dashboard`**: تبويب جديد "الاعتمادات الصوتية" ببيانات حقيقية من Supabase (عبر Edge Function `list-voice-reports`). لكل صف: الحالة، رقم الطلب، الفرع، الوقت، أزرار: تفاصيل / نسخ رابط الاعتماد / إعادة إرسال البريد. صفحة التفاصيل تعرض التايم لاين، مشغل صوت (signed URL)، النص، الـ JSON، الوسائط. التذاكر القديمة (mockTickets) تبقى تحت تبويب منفصل معلّم "بيانات تجريبية".

## البنية النصية للملفات الرئيسية

```text
supabase/functions/
  technician-report-submit/index.ts
  technician-report-confirm/index.ts
  send-branch-approval-request/index.ts
  branch-approval-view/index.ts
  branch-approval-decide/index.ts
  report-media-signed-url/index.ts
  list-voice-reports/index.ts
  _shared/
    cors.ts
    hash.ts
    ai.ts
src/pages/
  TechnicianReport.tsx
  BranchApproval.tsx
src/components/technician/
  VoiceRecorder.tsx
  PhotoUploader.tsx
  ReviewPanel.tsx
src/components/dashboard/
  VoiceReportsTab.tsx
  VoiceReportDetail.tsx
src/lib/
  voice-report-api.ts
```

## Secrets المطلوبة (أخبر المستخدم)

- `RESEND_API_KEY` (اختياري — بدونه لن يُرسل البريد لكن التقرير يُحفظ).
- `UBERFIX_FROM_EMAIL` (اختياري، افتراضي `no-reply@uberfix.eg` يُطلب من المستخدم).
- `APP_BASE_URL` = `https://uberfix-eg.lovable.app`.
- `LOVABLE_API_KEY` (موجود بالفعل).
- `SUPABASE_SERVICE_ROLE_KEY` + `SUPABASE_URL` (موجودة).

## ما هو خارج النطاق صراحة

- لا تكامل مع نظام توقيع إلكتروني معتمد قانونيًا.
- لا مصادقة كاملة للفنيين (يعتمد على رقم الطلب + الهاتف).
- لا تعديل على `/`, الهيدر، الفوتر، الـ Chatbot، أو أي صفحة أخرى، سوى إضافة رابط "تقرير الفني" في الـ Dashboard وربما زر صغير في `/technicians`.
- لا نشر تلقائي.

## خطوات التحقق قبل التسليم

1. `bun run build` ينجح.
2. Migration يمرّ ولا تنكسر أنواع Supabase.
3. اختبار حي عبر Playwright: فتح `/technician-report`، ملء نموذج، فحص إرسال (سيتطلب بيانات حقيقية للـ gateway؛ سأوثّق ما لم يُختبر end-to-end بدلًا من ادعاء نجاحه).
4. تسليم: قائمة الملفات، الجداول، الـ Edge Functions، حالة كل Secret، وما نُفّذ فعليًا مقابل ما يحتاج تفعيلًا لاحقًا.

هل توافق على:
- (أ) استخدام رقم الطلب + الهاتف كتحقق للفني بدل Auth كامل؟
- (ب) إضافة جدول `branches` بسيط يديره الأدمن يدويًا؟
- (ج) الاعتماد على `request_number` كسلسلة دون FK لجدول طلبات صيانة محلي؟

إن وافقت على الثلاثة سأبدأ التنفيذ فورًا.
