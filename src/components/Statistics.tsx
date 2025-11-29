import { Users, CheckCircle, MapPin, Award } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useEffect, useState } from "react";

const stats = [
  {
    icon: CheckCircle,
    value: 10000,
    suffix: "+",
    label: "طلب صيانة مكتمل",
    description: "تم تنفيذها بنجاح"
  },
  {
    icon: Users,
    value: 500,
    suffix: "+",
    label: "فني محترف",
    description: "معتمدين ومدربين"
  },
  {
    icon: MapPin,
    value: 15,
    suffix: "+",
    label: "فرع نشط",
    description: "في أنحاء مصر"
  },
  {
    icon: Award,
    value: 98,
    suffix: "%",
    label: "رضا العملاء",
    description: "تقييم إيجابي"
  }
];

const CountUpNumber = ({ end, suffix, isVisible }: { end: number; suffix: string; isVisible: boolean }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000;
    const steps = 60;
    const increment = end / steps;
    let current = 0;
    
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [end, isVisible]);

  return (
    <span>
      {suffix === "+" ? `+${count.toLocaleString()}` : `${count}${suffix}`}
    </span>
  );
};

const Statistics = () => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section className="py-16 bg-muted" dir="rtl">
      <div className="container mx-auto px-4">
        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center group"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(30px) scale(0.9)',
                transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
              }}
            >
              <div className="w-14 h-14 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 group-hover:bg-secondary/30 transition-all duration-300 cursor-pointer glow-effect">
                <stat.icon className="w-7 h-7 text-secondary icon-bounce" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                <CountUpNumber end={stat.value} suffix={stat.suffix} isVisible={isVisible} />
              </div>
              <div className="text-foreground font-semibold mb-1">
                {stat.label}
              </div>
              <div className="text-muted-foreground text-sm">
                {stat.description}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Statistics;
