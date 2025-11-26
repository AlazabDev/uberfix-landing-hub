import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

export default function FounderPage() {

  const timeline = [
    {
      year: "2018",
      title: "بداية قوية للمسار المهني",
      img: "https://al-azab.co/assets/img/hero-carousel/home-slide-1.jpg",
      points: [
        "العمل في مجال التصميم المعماري واكتساب خبرة عملية في إدارة المشاريع.",
        "تنفيذ أولى المشاريع الكبيرة وبناء سمعة مهنية محترفة.",
        "تطوير مهارات التواصل وإدارة الفريق لضمان تنفيذ سلس.",
        "تعلّم المهارات الأساسية في التخطيط والمحاسبة وإدارة التكلفة."
      ]
    },
    {
      year: "2019",
      title: "تطوير إدارة المشاريع وبداية الاستقلال",
      img: "https://al-azab.co/assets/img/projects/project-6.jpg",
      points: [
        "إدارة مشاريع معمارية كبيرة والتعامل المباشر مع العملاء والموردين.",
        "التفكير في تأسيس شركة لتقديم حلول متكاملة.",
        "تنفيذ مشاريع متنوعة: ديكور – تشطيبات – مشاريع تجارية.",
        "بناء شبكة قوية من العلاقات المهنية."
      ]
    },
    {
      year: "2020",
      title: "تأسيس شركة العزب وانطلاق قوي",
      img: "https://al-azab.co/assets/img/constructions-1.jpg",
      points: [
        "تأسيس شركة العزب المتخصصة في التصميم المعماري والداخلي.",
        "تنفيذ مشاريع باسم الشركة وزيادة عدد العملاء.",
        "تحقيق نجاحات في مشاريع السكني والتجاري والضيافة.",
        "تحديد رؤية الشركة ووضع أسس التشغيل."
      ]
    },
    {
      year: "2021",
      title: "التوسع وتحقيق نجاحات جديدة",
      img: "https://al-azab.co/assets/img/logo-english.jpg",
      points: [
        "التوسع في أعمال المقاولات والصيانة.",
        "تحقيق شراكات استراتيجية مع علامات تجارية كبرى.",
        "تعزيز الهوية التجارية لشركة العزب.",
        "رفع مستوى التشغيل والإدارة."
      ]
    },
    {
      year: "2022",
      title: "نقلة نوعية نحو التحول الرقمي",
      img: "https://al-azab.co/assets/img/founder.png",
      points: [
        "إدخال الأنظمة الرقمية داخل الشركة.",
        "تنفيذ ERPNext لإدارة الحسابات والمخزون.",
        "التوسع في الخدمات التجارية والمعدات الذكية.",
        "أول تعاون رسمي مع منصات كبرى مثل دفترة."
      ]
    },
    {
      year: "2023",
      title: "التحول الرقمي الكامل لأنظمة التشغيل",
      img: "https://al-azab.co/assets/img/constructions-1.jpg",
      points: [
        "بدء تطوير نظام متكامل لإدارة الصيانة.",
        "ربط الأنظمة عبر WhatsApp API ودفترة.",
        "إضافة حلول المخزون والفوترة الإلكترونية.",
        "تنفيذ أول مشروع متكامل للتحكم الرقمي."
      ]
    },
    {
      year: "2024",
      title: "بناء أنظمة ذكية وإدارة عمليات بكفاءة",
      img: "https://al-azab.co/assets/img/hero-carousel/home-slide-1.jpg",
      points: [
        "تكامل كامل بين WhatsApp API ودفترة.",
        "إطلاق نظام متابعة صيانة بمخزن بيانات موحّد.",
        "بدء تطوير تطبيق العزب للصيانة.",
        "التوسع عبر الأتمتة والتحليل."
      ]
    }
  ]

  return (
    <div className="min-h-screen bg-[#f4f4f4] py-16 px-4" dir="rtl">
      <div className="max-w-5xl mx-auto space-y-20">

        {/* ================= HEADER ================= */}
        <div className="text-center mb-6">
          <img
            src="https://al-azab.co/assets/img/founder.png"
            className="w-36 mx-auto mb-6 rounded-full shadow-lg border-4 border-[#f5bf23]"
          />
          <h1 className="text-4xl font-bold text-[#0d1b2a]">
            رحلة الفني المؤسس — Mohamed Azab
          </h1>
          <p className="text-lg text-gray-600 mt-3">
            من فني ميداني… إلى مؤسس ورئيس تنفيذي يقود منظومة هندسية رقمية متكاملة.
          </p>
        </div>

        {/* ================= INSPIRING STORY ================= */}
        <Card className="bg-white border border-gray-200 shadow-xl rounded-2xl">
          <CardContent className="p-10 space-y-6 text-gray-700 leading-relaxed text-lg">

            <h2 className="text-3xl font-bold text-[#0d1b2a] mb-4">
              القصة الملهمة… من الفني إلى الرئيس التنفيذي
            </h2>

            <p>
              بعد سنوات من العمل في مجال الإنشاءات التجارية، التحق <strong>محمد العزب</strong> بقطاع إدارة المرافق
              الوطنية، وكانت نقطة التحول عندما تلقى طلب صيانة عاجل من واحدة من أكبر شركات التجزئة في مصر:
              <strong>شركة أبو عوف</strong>. كانت تلك الشرارة الأولى التي فتحت الباب أمام بناء علاقة طويلة المدى،
              ووضعت حجر الأساس لرحلته نحو تأسيس شركة قوية في مجال إدارة الصيانة والإنشاءات التشغيلية. :contentReference[oaicite:1]{index=1}
            </p>

            <p>
              لسنوات، كان محمد يجيب على مكالمات العملاء في كل وقت، يعمل ميدانياً نهاراً، ويُنهي الأوراق والمستندات ليلاً.
              ومع مرور الوقت، بدأت سمعة العمل الجاد تنتشر، وبدأ ينشئ فريقاً من الفنيين ثم كوّن أول فريق إداري داخل الشركة.
            </p>

            <p>
              اكتسبت الشركة ثقة سلاسل تجارية كبرى، وبدأت إدارة عمليات صيانة لمئات المواقع في القاهرة والجيزة،
              مع الاعتماد على فرق مدربة وشبكة كبيرة من الموردين والشركاء.
            </p>

            <p>
              ومع توسع الشركة، ركّز محمد على إدخال التكنولوجيا بشكل أعمق في التشغيل، عبر بناء منصة رقمية متقدمة
              تتيح متابعة الطلبات، وإدارة الصيانة، وتتبع كل العمليات لحظياً.
            </p>

            <p>
              حصلت الشركة على تقدير كبير من العملاء وشركاء الصناعة، وبدأت شهادات النجاح تتدفق من الشركات الكبرى
              التي تعاملت معها. لم يقتصر النجاح على العمل فقط، بل امتد إلى برامج المسؤولية الاجتماعية التي أسسها
              لدعم التعليم والبيئة وبناء جيل جديد أكثر وعياً.
            </p>

            <p className="border-r-4 pr-4 border-[#f5bf23] text-[#0d1b2a] font-bold text-xl">
              "نية العمل أهم من العمل نفسه. نحن ملتزمون بالنية الصافية.  
              فريقنا هو جوهر نجاحنا… ومن هنا ينعكس الإتقان على العملاء والشركاء."
            </p>

            <p>
              اليوم، يقود محمد العزب رؤية مستقبلية تجعل شركة العزب واحدة من أقوى الكيانات في مجال إدارة الصيانة
              والمشاريع المتعددة المواقع، معتمداً على مزيج من الخبرة الميدانية، التكنولوجيا المتقدمة، والنية الصادقة.
            </p>

          </CardContent>
        </Card>

        {/* ================= LINE SEPARATOR ================= */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#0d1b2a] mt-10 mb-2">الرحلة عبر السنوات</h2>
          <p className="text-gray-600 mb-10">خط زمني يوضح التطور الحقيقي خطوة بخطوة.</p>
        </div>

        {/* ================= TIMELINE ================= */}
        <div className="relative border-r-4 border-[#0d1b2a] pr-10">
          {timeline.map((item, index) => (
            <div key={index} className="mb-14 relative">

              <div className="w-5 h-5 bg-[#0d1b2a] rounded-full absolute -right-3 top-2 border-2 border-white"></div>

              <Card className="shadow-md bg-white border border-gray-200 rounded-2xl">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <img
                      src={item.img}
                      alt=""
                      className="w-32 h-32 rounded-xl object-cover border-2 border-[#f5bf23]"
                    />
                    
                    <div>
                      <h3 className="text-2xl font-bold text-[#0d1b2a]">
                        {item.year} — {item.title}
                      </h3>

                      <ul className="list-disc pr-6 text-gray-700 text-lg leading-relaxed mt-4 space-y-2">
                        {item.points.map((p, i) => (
                          <li key={i}>{p}</li>
                        ))}
                      </ul>

                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* ================= FOOTER ================= */}
        <div className="text-center text-gray-500 text-sm mt-16">
          © 2025 Al-Azab Construction Company — جميع الحقوق محفوظة.
        </div>

      </div>
    </div>
  )
}
