import { Card, CardContent } from "@/components/ui/card"
import { motion } from "framer-motion"
import { Award, Target, Users, Lightbulb, TrendingUp, Building2, Sparkles } from "lucide-react"
import Navigation from "@/components/Navigation"
import Footer from "@/components/Footer"

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
    },
    {
      year: "2025",
      title: "تطوير تطبيق اوبر فيكس",
      img: "https://al-azab.co/img/uberfix/uber2-w.jpg",
      points: [
        "تطوير طبيق لخدمات الصيانات باحترافية.",
        "إطلاق منصة متكاملة تجمع بين الخدمات والعملاء والفنيين.",
        "توسيع نطاق الخدمات لتشمل مناطق جديدة.",
        "مواصلة الابتكار في مجال إدارة المرافق الرقمية."
      ]
    }
  ]

  const stats = [
    { icon: Building2, value: "+300", label: "فرع نديره" },
    { icon: Users, value: "+50", label: "فني محترف" },
    { icon: Award, value: "+5", label: "سنوات خبرة" },
    { icon: TrendingUp, value: "99%", label: "رضا العملاء" }
  ]

  const highlights = [
    { icon: Target, title: "الرؤية", text: "قيادة منظومة رقمية متكاملة لإدارة المرافق" },
    { icon: Lightbulb, title: "الابتكار", text: "حلول تكنولوجية متقدمة للصيانة الوقائية" },
    { icon: Users, title: "الفريق", text: "كوادر مدربة وملتزمة بأعلى معايير الجودة" },
    { icon: Sparkles, title: "التميز", text: "جوائز واعتمادات دولية في خدمة العملاء" }
  ]

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 bg-[url('https://al-azab.co/assets/img/constructions-1.jpg')] bg-cover bg-center opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/50 via-primary/80 to-primary" />
        
        {/* Glowing orbs */}
        <div className="absolute top-20 right-20 w-72 h-72 bg-secondary/30 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-20 left-20 w-96 h-96 bg-secondary/20 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <div className="absolute -inset-4 bg-secondary/50 rounded-full blur-2xl animate-pulse" />
              <img
                src="https://al-azab.co/assets/img/founder.png"
                alt="Mohamed Azab"
                className="relative w-40 h-40 mx-auto rounded-full border-4 border-secondary shadow-2xl object-cover"
              />
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <div className="inline-flex items-center gap-2 bg-secondary/20 backdrop-blur-sm border border-secondary/30 rounded-full px-6 py-2 mb-6">
              <Award className="w-5 h-5 text-secondary" />
              <span className="text-secondary font-medium">المؤسس والرئيس التنفيذي</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6">
              <span className="text-secondary">Mohamed</span> Azab
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/80 max-w-3xl mx-auto leading-relaxed">
              من فني ميداني إلى مؤسس ورئيس تنفيذي يقود منظومة هندسية رقمية متكاملة
            </p>
          </motion.div>
          
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16 max-w-4xl mx-auto"
          >
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="group bg-primary-foreground/10 backdrop-blur-sm border border-primary-foreground/20 rounded-2xl p-6 hover:bg-primary-foreground/20 hover:border-secondary/50 transition-all duration-300 hover:-translate-y-1"
              >
                <stat.icon className="w-8 h-8 text-secondary mx-auto mb-3 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold text-secondary">{stat.value}</div>
                <div className="text-primary-foreground/70 text-sm mt-1">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group relative"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-secondary to-primary rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-300" />
                <Card className="relative bg-card border-0 rounded-2xl p-6 h-full hover:shadow-xl transition-all duration-300">
                  <CardContent className="p-0">
                    <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary/20 transition-colors">
                      <item.icon className="w-7 h-7 text-secondary" />
                    </div>
                    <h3 className="text-xl font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.text}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-12">
              <span className="inline-block bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
                القصة الملهمة
              </span>
              <h2 className="text-3xl md:text-4xl font-bold text-foreground">
                من الفني إلى الرئيس التنفيذي
              </h2>
            </div>

            <Card className="relative overflow-hidden border-0 shadow-2xl">
              <div className="absolute top-0 right-0 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-60 h-60 bg-primary/10 rounded-full blur-3xl" />
              
              <CardContent className="relative p-8 md:p-12 space-y-8 text-muted-foreground leading-relaxed text-lg">
                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  بعد نشأته في قطاع الإنشاءات التجارية، انضم محمد عزب إلى قطاع إدارة المرافق الوطنية.
                  تلقى طلبًا لخدمة إصلاح من شركة أبو عوف، إحدى كبرى شركات التجزئة، في عام ٢٠١٩.
                  بعد فترة وجيزة من إتمام هذا الإصلاح وبناء علاقة طويلة الأمد مع العملاء،
                  بدأ محمد عزب رحلته نحو بناء شركة وطنية لإدارة المرافق.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  واصل محمد عزب تلبية احتياجات الإصلاحات لتجار التجزئة وسلاسل المطاعم في جميع المحافظات،
                  مجيبًا على جميع مكالمات العملاء ومُنجزًا الأعمال الورقية حتى وقت متأخر من الليل.
                  بعد بضع سنوات، وظّف ثلاثة فنيين ميدانيين، ثم كرّس وقتًا لتوظيف وتدريب فريق مكتب.
                </motion.p>

                <motion.p
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                >
                  مع توسع الشركة، ركز محمد عزب على الابتكار والاستدامة،
                  لضمان بقاء شركة العزب في صدارة اتجاهات الصناعة.
                  وقد قدم حلولًا تكنولوجية متقدمة لتبسيط العمليات وتحسين كفاءة الخدمة.
                </motion.p>

                {/* Quote */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="relative my-12"
                >
                  <div className="absolute -inset-4 bg-gradient-to-r from-secondary/20 to-primary/20 rounded-2xl blur-xl" />
                  <blockquote className="relative bg-card border-r-4 border-secondary rounded-xl p-8">
                    <p className="text-xl md:text-2xl font-bold text-foreground italic">
                      "النية مهمة جداً. جميعنا ملتزمون بنقاء النية.
                      مهندسون وفنيون مهمون وملهمون،
                      وفريقنا الداخلي بالغ الأهمية،
                      ومن هنا يمكن لعملائنا وشركائنا الاستمتاع بنفس التفاني."
                    </p>
                    <footer className="mt-4 text-secondary font-medium">— محمد عزب</footer>
                  </blockquote>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 pt-8">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-secondary" />
                      التوسع الاستراتيجي
                    </h3>
                    <p>
                      أدرك محمد عزب أن ريادة السوق تتطلب الانتقال من نموذج "رد الفعل"
                      في معالجة أعطال الطارئة إلى نموذج "الاستباق والوقاية".
                      فقام بتطوير برامج "الصيانة الوقائية الذكية".
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                    className="space-y-4"
                  >
                    <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
                      <Lightbulb className="w-5 h-5 text-secondary" />
                      التحول الرقمي
                    </h3>
                    <p>
                      استثمر محمد عزب بقوة في البنية التحتية التكنولوجية،
                      محولاً الشركة من مزود خدمات تقليدي إلى منصة تكنولوجية شاملة
                      تقدم حلولاً متقدمة لإدارة المرافق.
                    </p>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="inline-block bg-secondary/10 text-secondary px-4 py-2 rounded-full text-sm font-medium mb-4">
              الرحلة عبر السنوات
            </span>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              خط زمني يوضح التطور الحقيقي
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              من البداية المتواضعة إلى بناء منظومة متكاملة لإدارة المرافق
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto relative">
            {/* Timeline line with glow */}
            <div className="absolute right-8 md:right-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary via-primary to-secondary">
              <div className="absolute inset-0 blur-sm bg-gradient-to-b from-secondary via-primary to-secondary" />
            </div>

            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-[55%]' : 'md:pl-[55%] md:pr-0'} pr-20`}
              >
                {/* Year badge */}
                <div className="absolute right-4 md:right-1/2 md:-translate-x-1/2 top-4 z-10">
                  <div className="relative">
                    <div className="absolute -inset-2 bg-secondary/50 rounded-full blur-lg animate-pulse" />
                    <div className="relative w-16 h-16 bg-gradient-to-br from-secondary to-primary rounded-full flex items-center justify-center border-4 border-background shadow-xl">
                      <span className="text-primary-foreground font-bold">{item.year}</span>
                    </div>
                  </div>
                </div>

                {/* Card */}
                <div className="group relative">
                  <div className="absolute -inset-1 bg-gradient-to-r from-secondary/50 to-primary/50 rounded-2xl opacity-0 group-hover:opacity-100 blur transition-all duration-500" />
                  
                  <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500">
                    <CardContent className="p-0">
                      <div className="flex flex-col md:flex-row">
                        <div className="relative w-full md:w-48 h-48 md:h-auto overflow-hidden">
                          <img
                            src={item.img}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                        </div>
                        
                        <div className="flex-1 p-6">
                          <h3 className="text-xl font-bold text-foreground mb-4 group-hover:text-secondary transition-colors">
                            {item.title}
                          </h3>
                          
                          <ul className="space-y-3">
                            {item.points.map((p, i) => (
                              <motion.li 
                                key={i}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.1 * i }}
                                className="flex items-start gap-3 text-muted-foreground"
                              >
                                <span className="w-2 h-2 bg-secondary rounded-full mt-2 flex-shrink-0" />
                                <span>{p}</span>
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-primary" />
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-secondary/30" />
        
        {/* Glowing elements */}
        <div className="absolute top-10 left-10 w-40 h-40 bg-secondary/30 rounded-full blur-[80px] animate-pulse" />
        <div className="absolute bottom-10 right-10 w-60 h-60 bg-secondary/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />
        
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-6">
              انضم إلى رحلة النجاح معنا
            </h2>
            <p className="text-xl text-primary-foreground/80 max-w-2xl mx-auto mb-8">
              نحن نبحث دائماً عن شركاء وعملاء يشاركوننا نفس الرؤية والطموح
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/contact" className="inline-block">
                <button className="px-8 py-4 bg-secondary text-primary font-bold rounded-xl hover:bg-secondary/90 transition-all hover:scale-105 shadow-lg shadow-secondary/30">
                  تواصل معنا
                </button>
              </a>
              <a href="/" className="inline-block">
                <button className="px-8 py-4 bg-primary-foreground/10 text-primary-foreground font-bold rounded-xl border border-primary-foreground/30 hover:bg-primary-foreground/20 transition-all">
                  العودة للرئيسية
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}