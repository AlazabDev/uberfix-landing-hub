import { Card } from "@/components/ui/card";
import { Users, ClipboardCheck, Zap, Shield, Clock, TrendingUp } from "lucide-react";

const features = [
  {
    icon: Users,
    title: "ربط فوري مع الفنيين",
    description: "نظام ذكي يربط طلبك بأقرب فني متخصص في مجالك خلال دقائق",
    color: "text-primary",
  },
  {
    icon: ClipboardCheck,
    title: "إدارة شاملة للطلبات",
    description: "تتبع جميع طلبات الصيانة من البداية للنهاية بكل سهولة وشفافية",
    color: "text-secondary",
  },
  {
    icon: Zap,
    title: "استجابة سريعة",
    description: "وقت استجابة قياسي لضمان حل المشاكل في أسرع وقت ممكن",
    color: "text-accent",
  },
  {
    icon: Shield,
    title: "ضمان الجودة",
    description: "فنيون معتمدون وموثوقون مع ضمان على جميع أعمال الصيانة",
    color: "text-primary",
  },
  {
    icon: Clock,
    title: "متاح على مدار الساعة",
    description: "خدمة 24/7 لضمان توفر الدعم في أي وقت تحتاجه",
    color: "text-secondary",
  },
  {
    icon: TrendingUp,
    title: "تقارير تفصيلية",
    description: "احصائيات وتقارير شاملة لمتابعة الأداء وتحسين الخدمة",
    color: "text-accent",
  },
];

const Features = () => {
  return (
    <section className="py-20 bg-muted/30" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            لماذا <span className="text-primary">UberFix</span>؟
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            نقدم لك منصة متكاملة بمميزات احترافية لإدارة جميع احتياجات الصيانة
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="p-6 hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 bg-card border-border animate-slide-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 ${feature.color}`}>
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
