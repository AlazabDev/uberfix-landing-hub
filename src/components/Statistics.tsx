import { Users, CheckCircle, MapPin, Award } from "lucide-react";

const stats = [
  {
    icon: CheckCircle,
    value: "+10,000",
    label: "طلب صيانة مكتمل",
    description: "تم تنفيذها بنجاح"
  },
  {
    icon: Users,
    value: "+500",
    label: "فني محترف",
    description: "معتمدين ومدربين"
  },
  {
    icon: MapPin,
    value: "+15",
    label: "فرع نشط",
    description: "في أنحاء مصر"
  },
  {
    icon: Award,
    value: "98%",
    label: "رضا العملاء",
    description: "تقييم إيجابي"
  }
];

const Statistics = () => {
  return (
    <section className="py-16 bg-muted" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className="text-center group animate-on-scroll"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="w-14 h-14 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <stat.icon className="w-7 h-7 text-secondary" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-foreground mb-1">
                {stat.value}
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
