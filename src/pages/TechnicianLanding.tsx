import { Button } from "@/components/ui/button";
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  Wallet, 
  TrendingUp, 
  Award, 
  Calendar,
  Shield,
  GraduationCap,
  Users,
  Building2,
  Star,
  CheckCircle,
  Play,
  ArrowLeft
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const REGISTRATION_URL = "https://uberfix.shop/technicians/registration";

const TechnicianLanding = () => {
  const handleRegister = () => {
    window.open(REGISTRATION_URL, '_blank');
  };

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navigation />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary/90 to-primary/80" />
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="max-w-4xl mx-auto animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-6">
              <Star className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium">انضم لأكثر من 500+ فني محترف</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary-foreground mb-6 leading-tight">
              انضم الآن إلى شبكة
              <span className="text-secondary block mt-2">الفنيين المحترفين</span>
              في UberFix
            </h1>
            
            <p className="text-xl md:text-2xl text-primary-foreground/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              ساعد آلاف العملاء، واحصل على دخل ثابت، ومكافآت مالية، وفرص تطوير مهني مستمرة
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={handleRegister}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground text-lg px-10 py-6 font-bold shadow-lg shadow-secondary/30 group"
              >
                سجّل الآن كفني محترف
                <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform rotate-180" />
              </Button>
              <Button 
                size="lg" 
                variant="hero"
                onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                className="text-lg px-10 py-6"
              >
                اكتشف المزايا
              </Button>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-6 mt-16 max-w-2xl mx-auto">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary">+5000</div>
                <div className="text-primary-foreground/60 text-sm mt-1">طلب شهري</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary">70%</div>
                <div className="text-primary-foreground/60 text-sm mt-1">عمولة للفني</div>
              </div>
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-secondary">24/7</div>
                <div className="text-primary-foreground/60 text-sm mt-1">دعم متواصل</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Proposition Section */}
      <section id="features" className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              مميزات حصرية للفنيين
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              نوفر لك كل ما تحتاجه للنجاح في مسيرتك المهنية
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Calendar,
                title: "طلبات مستمرة يوميًا",
                description: "استقبل طلبات جديدة كل يوم من عملاء في منطقتك"
              },
              {
                icon: Wallet,
                title: "نظام عمولات عادل",
                description: "احصل على 70% من قيمة كل طلب تقوم بتنفيذه"
              },
              {
                icon: TrendingUp,
                title: "محفظة مالية لحظية",
                description: "اسحب أرباحك في أي وقت مباشرة لحسابك البنكي"
              },
              {
                icon: Award,
                title: "مكافآت شهرية",
                description: "احصل على Badges احترافية ومكافآت تحفيزية"
              }
            ].map((feature, index) => (
              <div 
                key={index}
                className="bg-card border border-border rounded-2xl p-6 hover:border-secondary/50 transition-all duration-300 group animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="w-14 h-14 bg-secondary/20 rounded-xl flex items-center justify-center mb-4 group-hover:bg-secondary/30 transition-colors">
                  <feature.icon className="w-7 h-7 text-secondary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              onClick={handleRegister}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-8"
            >
              إنشاء حساب فني
            </Button>
          </div>
        </div>
      </section>

      {/* Why UberFix Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
                لماذا UberFix هي
                <span className="text-secondary"> الأفضل</span> للفنيين؟
              </h2>
              
              <div className="space-y-4">
                {[
                  { icon: Shield, text: "استقرار مالي ودخل متنامي مع ضمان حقوقك" },
                  { icon: GraduationCap, text: "برامج تدريب وتطوير مهني مستمرة مجانًا" },
                  { icon: Users, text: "دعم فني على مدار الساعة من فريق متخصص" },
                  { icon: Building2, text: "شراكات مع كبرى الشركات والمؤسسات في مصر" },
                  { icon: TrendingUp, text: "فرص توسع وترقي داخل المنصة" }
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-4 bg-muted rounded-xl p-4">
                    <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <item.icon className="w-5 h-5 text-secondary" />
                    </div>
                    <p className="text-muted-foreground text-lg">{item.text}</p>
                  </div>
                ))}
              </div>

              <Button 
                size="lg" 
                onClick={handleRegister}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-8 mt-8"
              >
                ابدأ رحلتك الآن
              </Button>
            </div>

            {/* Video/Image Placeholder */}
            <div className="relative animate-scale-in">
              <div className="aspect-video bg-card rounded-2xl border border-border overflow-hidden relative group cursor-pointer">
                <img 
                  src="/upload/Demo-UberFix.jpg" 
                  alt="UberFix App Demo"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                  <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center shadow-lg shadow-secondary/30 group-hover:scale-110 transition-transform">
                    <Play className="w-8 h-8 text-secondary-foreground mr-[-4px]" fill="currentColor" />
                  </div>
                </div>
              </div>
              <p className="text-center text-muted-foreground mt-4">شاهد كيف يعمل تطبيق UberFix للفنيين</p>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              موثوق من كبرى الشركات
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center max-w-4xl mx-auto mb-12">
            {["العزب Construction", "أبو عوف", "كارفور", "مترو"].map((company, index) => (
              <div 
                key={index}
                className="bg-muted rounded-xl p-6 text-center border border-border"
              >
                <Building2 className="w-8 h-8 text-secondary mx-auto mb-2" />
                <span className="text-muted-foreground font-medium">{company}</span>
              </div>
            ))}
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              {
                name: "أحمد محمد",
                role: "فني كهرباء",
                text: "بفضل UberFix، قدرت أضاعف دخلي الشهري وأحصل على عملاء محترمين"
              },
              {
                name: "محمود السيد",
                role: "فني سباكة",
                text: "النظام سهل جدًا والدعم ممتاز، بنصح كل زملائي يسجلوا"
              },
              {
                name: "كريم علي",
                role: "فني تكييف",
                text: "المكافآت الشهرية والبونص بيحفزني أقدم أفضل خدمة دايمًا"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-muted rounded-xl p-6 border border-border">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-secondary" fill="currentColor" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">"{testimonial.text}"</p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                    <Users className="w-5 h-5 text-secondary" />
                  </div>
                  <div>
                    <div className="text-foreground font-medium">{testimonial.name}</div>
                    <div className="text-muted-foreground text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-muted">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              الأسئلة الشائعة
            </h2>
            <p className="text-muted-foreground">إجابات على أهم استفساراتك</p>
          </div>

          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {[
                {
                  question: "هل يوجد حد أدنى للخبرة؟",
                  answer: "نرحب بجميع الفنيين ذوي الخبرة من سنة فأكثر. كما نوفر برامج تدريبية للمبتدئين لتطوير مهاراتهم."
                },
                {
                  question: "كيف يتم احتساب العمولة؟",
                  answer: "تحصل على 70% من قيمة كل طلب تقوم بتنفيذه. العمولة واضحة ومحددة مسبقًا لكل نوع خدمة."
                },
                {
                  question: "كيف يتم استلام الأرباح؟",
                  answer: "يمكنك سحب أرباحك في أي وقت مباشرة لحسابك البنكي أو محفظتك الإلكترونية خلال 24-48 ساعة."
                },
                {
                  question: "هل يوجد تدريب؟",
                  answer: "نعم، نوفر برامج تدريب مجانية شاملة تشمل المهارات الفنية وخدمة العملاء والسلامة المهنية."
                },
                {
                  question: "ما هي أنواع الطلبات المتاحة؟",
                  answer: "تشمل الطلبات: الكهرباء، السباكة، التكييف، النجارة، الدهانات، التنظيف، والعديد من الخدمات الأخرى."
                }
              ].map((faq, index) => (
                <AccordionItem
                  key={index} 
                  value={`item-${index}`}
                  className="bg-card border border-border rounded-xl px-6 overflow-hidden"
                >
                  <AccordionTrigger className="text-foreground hover:text-secondary text-right py-5">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground pb-5">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          <div className="text-center mt-12">
            <Button 
              size="lg" 
              onClick={handleRegister}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-10"
            >
              سجّل كفني الآن
            </Button>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-card border-t border-border py-12">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">
              جاهز لبدء رحلتك المهنية؟
            </h2>
            <p className="text-muted-foreground mb-6">
              انضم الآن وكن جزءًا من أكبر شبكة فنيين في مصر
            </p>
            <Button 
              size="lg" 
              onClick={handleRegister}
              className="bg-secondary hover:bg-secondary/90 text-secondary-foreground font-bold px-10 py-6 text-lg"
            >
              إنشاء حساب فني مجانًا
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default TechnicianLanding;
