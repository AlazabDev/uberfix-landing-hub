import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Building2, Factory, Paintbrush } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const services = [
  {
    icon: Home,
    title: "صيانة المنازل",
    description: "صيانة شاملة لجميع احتياجات منزلك من كهرباء وسباكة ونجارة وتكييف",
    items: ["كهرباء", "سباكة", "نجارة", "تكييف"],
  },
  {
    icon: Building2,
    title: "صيانة المباني",
    description: "خدمات متخصصة للمباني السكنية والإدارية مع فريق محترف",
    items: ["مصاعد", "أنظمة الأمان", "الديكورات", "الواجهات"],
  },
  {
    icon: Factory,
    title: "صيانة المنشآت",
    description: "حلول صيانة متكاملة للمنشآت الصناعية والتجارية الكبرى",
    items: ["معدات", "أنظمة متقدمة", "صيانة دورية", "طوارئ"],
  },
  {
    icon: Paintbrush,
    title: "التشطيبات والديكور",
    description: "تصميم وتنفيذ الديكورات الداخلية والخارجية بأعلى جودة",
    items: ["تصميم", "تنفيذ", "دهانات", "أرضيات"],
  },
];

const Services = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-20 bg-background" dir="rtl">
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
            خدماتنا <span className="text-secondary">المتنوعة</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            نغطي جميع احتياجاتك من الصيانة والتشغيل بأعلى معايير الجودة
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <ServiceCard key={index} service={service} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const ServiceCard = ({ service, index }: { service: typeof services[0]; index: number }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <Card 
      ref={ref}
      className="p-8 bg-card border-border group cursor-pointer interactive-card"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
      }}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl bg-gradient-secondary flex items-center justify-center group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 glow-effect">
            <service.icon className="w-7 h-7 text-secondary-foreground" />
          </div>
          <div className="flex-1">
            <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-secondary transition-colors duration-300">
              {service.title}
            </h3>
            <p className="text-muted-foreground">
              {service.description}
            </p>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {service.items.map((item, idx) => (
            <span 
              key={idx}
              className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground group-hover:bg-secondary/20 group-hover:text-foreground transition-all duration-300"
              style={{
                transitionDelay: `${idx * 50}ms`
              }}
            >
              {item}
            </span>
          ))}
        </div>
        
        <Button 
          variant="outline" 
          className="mt-auto w-full border-2 group-hover:bg-secondary group-hover:text-secondary-foreground group-hover:border-secondary transition-all duration-300"
        >
          اطلب الخدمة
        </Button>
      </div>
    </Card>
  );
};

export default Services;
