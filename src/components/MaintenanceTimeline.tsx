import { ClipboardList, UserCheck, Wrench, CheckCircle } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const timelineSteps = [
  {
    icon: ClipboardList,
    number: "01",
    title: "إرسال طلب الصيانة",
    description: "قم بتسجيل طلب الصيانة عبر التطبيق أو الموقع مع تحديد نوع المشكلة والموقع والوقت المناسب",
    features: ["تحديد نوع الخدمة", "رفع صور المشكلة", "اختيار الموعد المناسب"]
  },
  {
    icon: UserCheck,
    number: "02",
    title: "تعيين الفني المناسب",
    description: "يتم مطابقة طلبك مع أفضل فني متخصص في منطقتك حسب نوع الخدمة والتقييمات",
    features: ["اختيار آلي ذكي", "مراجعة ملف الفني", "تأكيد الموعد"]
  },
  {
    icon: Wrench,
    number: "03",
    title: "تنفيذ أعمال الصيانة",
    description: "يصل الفني في الموعد المحدد مع جميع الأدوات والمعدات اللازمة لإتمام العمل",
    features: ["تتبع مباشر للفني", "تواصل فوري", "ضمان جودة العمل"]
  },
  {
    icon: CheckCircle,
    number: "04",
    title: "الدفع والتقييم",
    description: "بعد إتمام العمل، قم بالدفع بأمان وشارك تقييمك لمساعدة الآخرين",
    features: ["دفع آمن متعدد الطرق", "فاتورة إلكترونية", "تقييم الخدمة"]
  }
];

const MaintenanceTimeline = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-20 bg-muted/50" dir="rtl">
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
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            رحلة طلب الصيانة
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            من تقديم الطلب إلى إتمام العمل، تجربة سهلة وشفافة
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Line with Animation */}
          <div className="hidden md:block absolute right-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-secondary via-secondary to-secondary/30 transform translate-x-1/2 progress-line" />

          <div className="space-y-12 md:space-y-0">
            {timelineSteps.map((step, index) => (
              <TimelineStep key={index} step={step} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const TimelineStep = ({ step, index }: { step: typeof timelineSteps[0]; index: number }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const isEven = index % 2 === 0;

  return (
    <div 
      ref={ref}
      className={`relative ${isEven ? 'md:pr-[52%]' : 'md:pl-[52%] md:text-left'}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible 
          ? 'translateX(0)' 
          : `translateX(${isEven ? '50px' : '-50px'})`,
        transition: `all 0.7s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`
      }}
    >
      {/* Timeline Node */}
      <div 
        className={`hidden md:flex absolute right-1/2 top-8 transform translate-x-1/2 w-16 h-16 bg-secondary rounded-full items-center justify-center z-10 shadow-lg cursor-pointer glow-effect ${isVisible ? 'timeline-node' : ''}`}
        style={{
          transform: isVisible ? 'translateX(50%) scale(1)' : 'translateX(50%) scale(0)',
          transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15 + 0.2}s`
        }}
      >
        <span className="text-secondary-foreground font-bold text-lg">{step.number}</span>
      </div>

      {/* Card */}
      <div className={`bg-card border border-border rounded-2xl p-6 shadow-md interactive-card ${isEven ? 'md:mr-8' : 'md:ml-8'}`}>
        {/* Mobile Number Badge */}
        <div className="md:hidden flex items-center gap-3 mb-4">
          <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center glow-effect">
            <span className="text-secondary-foreground font-bold">{step.number}</span>
          </div>
          <step.icon className="w-6 h-6 text-secondary icon-bounce" />
        </div>

        <div className={`hidden md:block mb-4 ${isEven ? '' : 'text-right'}`}>
          <step.icon className="w-8 h-8 text-secondary inline-block icon-bounce" />
        </div>

        <h3 className={`text-xl font-bold text-foreground mb-3 ${isEven ? '' : 'md:text-right'}`}>
          {step.title}
        </h3>
        
        <p className={`text-muted-foreground mb-4 leading-relaxed ${isEven ? '' : 'md:text-right'}`}>
          {step.description}
        </p>

        <ul className={`space-y-2 ${isEven ? '' : 'md:text-right'}`}>
          {step.features.map((feature, fIndex) => (
            <li 
              key={fIndex} 
              className={`flex items-center gap-2 text-sm text-muted-foreground ${isEven ? '' : 'md:flex-row-reverse'}`}
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateX(0)' : 'translateX(20px)',
                transition: `all 0.4s ease ${fIndex * 0.1 + 0.3}s`
              }}
            >
              <div className="w-1.5 h-1.5 bg-secondary rounded-full" />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MaintenanceTimeline;
