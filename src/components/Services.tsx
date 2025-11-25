import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Home, Building2, Factory, Paintbrush } from "lucide-react";

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
  return (
    <section className="py-20 bg-background" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            خدماتنا <span className="text-secondary">المتنوعة</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            نغطي جميع احتياجاتك من الصيانة والتشغيل بأعلى معايير الجودة
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <Card 
              key={index}
              className="p-8 hover:shadow-elevated transition-all duration-300 bg-card border-border group animate-scale-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col h-full">
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 rounded-xl bg-gradient-secondary flex items-center justify-center group-hover:scale-110 transition-transform">
                    <service.icon className="w-7 h-7 text-secondary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-foreground mb-2">
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
                      className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                
                <Button 
                  variant="outline" 
                  className="mt-auto w-full border-2 group-hover:bg-secondary group-hover:text-secondary-foreground group-hover:border-secondary transition-all"
                >
                  اطلب الخدمة
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
