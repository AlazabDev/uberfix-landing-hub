import { CheckCircle, Calendar, Wrench, Star } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const steps = [
  {
    icon: CheckCircle,
    title: "اختر الخدمة",
    description: "تصفح خدماتنا المتنوعة واختر ما يناسب احتياجاتك"
  },
  {
    icon: Calendar,
    title: "حدد الموعد",
    description: "اختر الوقت المناسب لك وسنكون في موقعك"
  },
  {
    icon: Wrench,
    title: "نفذ الصيانة",
    description: "فني محترف يقوم بالعمل بأعلى جودة"
  },
  {
    icon: Star,
    title: "قيّم الخدمة",
    description: "شاركنا رأيك لنستمر في التحسين"
  }
];

const HowItWorks = () => {
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
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            كيف نعمل
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            خطوات بسيطة للحصول على الخدمة
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            نحن نجعل عملية طلب الصيانة سهلة وسريعة في أربع خطوات فقط
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <StepCard key={index} step={step} index={index} totalSteps={steps.length} />
          ))}
        </div>
      </div>
    </section>
  );
};

const StepCard = ({ step, index, totalSteps }: { step: typeof steps[0]; index: number; totalSteps: number }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <div 
      ref={ref}
      className="relative group"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`
      }}
    >
      <div className="bg-card rounded-2xl p-8 text-center shadow-lg border border-border/50 hover:border-secondary/50 interactive-card cursor-pointer">
        {/* Step Number */}
        <div 
          className="absolute -top-4 right-4 w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold text-sm glow-effect"
          style={{
            transform: isVisible ? 'scale(1)' : 'scale(0)',
            transition: `all 0.4s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15 + 0.2}s`
          }}
        >
          {index + 1}
        </div>
        
        {/* Icon */}
        <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
          <step.icon className="w-8 h-8 text-primary icon-bounce" />
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-bold text-foreground mb-3 group-hover:text-secondary transition-colors duration-300">
          {step.title}
        </h3>
        <p className="text-muted-foreground text-sm">
          {step.description}
        </p>
      </div>
      
      {/* Connector Line */}
      {index < totalSteps - 1 && (
        <div 
          className="hidden lg:block absolute top-1/2 -left-4 w-8 h-0.5 bg-secondary/50"
          style={{
            transform: isVisible ? 'scaleX(1)' : 'scaleX(0)',
            transformOrigin: 'right',
            transition: `all 0.4s ease ${index * 0.15 + 0.4}s`
          }}
        />
      )}
    </div>
  );
};

export default HowItWorks;
