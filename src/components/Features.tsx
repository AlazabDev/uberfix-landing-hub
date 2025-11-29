import { Card } from "@/components/ui/card";
import { Users, ClipboardCheck, Zap, Shield, Clock, TrendingUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const features = [
  {
    icon: Users,
    title: "ربط فوري مع الفنيين",
    description: "نظام ذكي يربط طلبك بأقرب فني متخصص في مجالك خلال دقائق",
  },
  {
    icon: ClipboardCheck,
    title: "إدارة شاملة للطلبات",
    description: "تتبع جميع طلبات الصيانة من البداية للنهاية بكل سهولة وشفافية",
  },
  {
    icon: Zap,
    title: "استجابة سريعة",
    description: "وقت استجابة قياسي لضمان حل المشاكل في أسرع وقت ممكن",
  },
  {
    icon: Shield,
    title: "ضمان الجودة",
    description: "فنيون معتمدون وموثوقون مع ضمان على جميع أعمال الصيانة",
  },
  {
    icon: Clock,
    title: "متاح على مدار الساعة",
    description: "خدمة 24/7 لضمان توفر الدعم في أي وقت تحتاجه",
  },
  {
    icon: TrendingUp,
    title: "تقارير تفصيلية",
    description: "احصائيات وتقارير شاملة لمتابعة الأداء وتحسين الخدمة",
  },
];

const Features = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-20 bg-muted/30" dir="rtl">
      <div className="container mx-auto px-4">
        <div 
          ref={headerRef}
          className="text-center mb-16"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            لماذا <span className="text-primary">UberFix</span>؟
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            نقدم لك منصة متكاملة بمميزات احترافية لإدارة جميع احتياجات الصيانة
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const FeatureCard = ({ feature, index }: { feature: typeof features[0]; index: number }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <Card 
      ref={ref}
      className="p-6 bg-card border-border cursor-pointer interactive-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
      }}
    >
      <div className="flex flex-col items-center text-center group">
        <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 glow-effect">
          <feature.icon className="w-8 h-8 text-primary-foreground" />
        </div>
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">
          {feature.description}
        </p>
      </div>
    </Card>
  );
};

export default Features;
