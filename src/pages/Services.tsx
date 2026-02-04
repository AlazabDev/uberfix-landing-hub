import { Card } from "@/components/ui/card";
import { Wrench, Zap, Droplet, Wind, Hammer, Paintbrush, Building2, Camera, Sparkles, Palette, Package } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Services = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // Main 4 services
  const mainServices = [
    {
      icon: Sparkles,
      title: isRTL ? "التشطيبات الراقية" : "Luxury Finishing",
      titleEn: "Luxury Finishing",
      description: isRTL 
        ? "تشطيبات فاخرة وديكورات داخلية وخارجية بأعلى معايير الجودة والأناقة"
        : "Premium finishes and interior/exterior decorations with the highest standards of quality and elegance",
      link: "/luxury-finishing",
      color: "from-amber-500 to-orange-600",
    },
    {
      icon: Palette,
      title: isRTL ? "هوية العلامة التجارية" : "Brand Identity",
      titleEn: "Brand Identity",
      description: isRTL 
        ? "تصميم وتطوير الهوية البصرية للشركات والمؤسسات"
        : "Designing and developing visual identity for companies and institutions",
      link: "/brand-identity",
      color: "from-purple-500 to-pink-600",
    },
    {
      icon: Package,
      title: isRTL ? "لبن العصفور" : "Laban Alasfour",
      titleEn: "Laban Alasfour",
      description: isRTL 
        ? "توريد مواد البناء والتشطيبات من أفضل المصادر بأسعار تنافسية"
        : "Supply of building materials and finishes from the best sources at competitive prices",
      link: "/labn-elasfor",
      color: "from-emerald-500 to-teal-600",
    },
    {
      icon: Wrench,
      title: isRTL ? "اوبر فيكس" : "UberFix",
      titleEn: "UberFix",
      description: isRTL 
        ? "إدارة ذكية للصيانة والتشغيل مع شبكة من الفنيين المحترفين"
        : "Smart maintenance and operation management with a network of professional technicians",
      link: "#uberfix-services",
      color: "from-secondary to-primary",
    },
  ];

  // UberFix sub-services
  const uberfixServices = [
    {
      icon: Zap,
      title: isRTL ? "الأعمال الكهربائية" : "Electrical Work",
      description: isRTL 
        ? "تركيب وصيانة الأنظمة الكهربائية، إصلاح الأعطال، وتوصيل الإضاءة"
        : "Installation and maintenance of electrical systems, fault repair, and lighting connection",
      image: "https://al-azab.co/img/Electrical_Help.jpg",
    },
    {
      icon: Droplet,
      title: isRTL ? "أعمال السباكة" : "Plumbing Work",
      description: isRTL 
        ? "صيانة وتركيب السباكة، إصلاح التسريبات، وتركيب الأدوات الصحية"
        : "Plumbing maintenance and installation, leak repair, and sanitary ware installation",
      image: "https://al-azab.co/img/maintenance01.jpg",
    },
    {
      icon: Wind,
      title: isRTL ? "صيانة التكييفات" : "AC Maintenance",
      description: isRTL 
        ? "تركيب وصيانة أجهزة التكييف والتبريد بجميع أنواعها"
        : "Installation and maintenance of all types of air conditioning and cooling systems",
      image: "https://al-azab.co/img/maintenance02.jpg",
    },
    {
      icon: Hammer,
      title: isRTL ? "أعمال النجارة" : "Carpentry Work",
      description: isRTL 
        ? "تركيب وصيانة الأبواب، الشبابيك، والأثاث الخشبي"
        : "Installation and maintenance of doors, windows, and wooden furniture",
      image: "https://al-azab.co/img/Furniture_Assembly.jpeg",
    },
    {
      icon: Paintbrush,
      title: isRTL ? "الدهانات والديكور" : "Painting & Decoration",
      description: isRTL 
        ? "أعمال الدهانات الداخلية والخارجية وتنفيذ الديكورات"
        : "Interior and exterior painting work and decoration implementation",
      image: "https://al-azab.co/img/maintenance03.jpg",
    },
    {
      icon: Building2,
      title: isRTL ? "صيانة المباني" : "Building Maintenance",
      description: isRTL 
        ? "صيانة شاملة للمباني السكنية والتجارية والإدارية"
        : "Comprehensive maintenance for residential, commercial and administrative buildings",
      image: "https://al-azab.co/img/maintenance04.jpg",
    },
    {
      icon: Camera,
      title: isRTL ? "أنظمة الأمان والمراقبة" : "Security & Surveillance",
      description: isRTL 
        ? "تركيب وصيانة كاميرات المراقبة وأنظمة الإنذار"
        : "Installation and maintenance of surveillance cameras and alarm systems",
      image: "https://al-azab.co/img/maintenance05.jpg",
    },
  ];

  return (
    <div className="min-h-screen" dir={isRTL ? 'rtl' : 'ltr'}>
      <Navigation />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-hero">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-6">
              <Wrench className="w-4 h-4" />
              <span className="text-sm font-medium">{isRTL ? "خدماتنا المتنوعة" : "Our Diverse Services"}</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              {isRTL ? "خدمات " : "Our "}<span className="text-secondary">{isRTL ? "شركة العزب" : "Al-Azab Services"}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {isRTL 
                ? "نقدم مجموعة متكاملة من الخدمات المتميزة في مجالات التشطيبات والهوية التجارية والتوريدات والصيانة"
                : "We offer a comprehensive range of distinguished services in finishing, brand identity, supplies, and maintenance"}
            </p>
          </div>

          {/* Main 4 Services */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {mainServices.map((service, index) => (
              <Link
                key={index}
                to={service.link}
                className="group"
              >
                <Card
                  className="h-full p-6 hover:shadow-elevated transition-all duration-300 hover:-translate-y-2 border-2 border-transparent hover:border-secondary/50 animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${service.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <service.icon className="w-7 h-7 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-secondary transition-colors">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {service.description}
                  </p>
                </Card>
              </Link>
            ))}
          </div>

          {/* UberFix Services Section */}
          <div id="uberfix-services" className="scroll-mt-24">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
                {isRTL ? "خدمات " : ""}<span className="text-secondary">UberFix</span>{isRTL ? "" : " Services"}
              </h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                {isRTL 
                  ? "خدمات الصيانة والتشغيل المتخصصة من خلال شبكة فنيين محترفين"
                  : "Specialized maintenance and operation services through a network of professional technicians"}
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {uberfixServices.map((service, index) => (
                <Card
                  key={index}
                  className="overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1 group animate-scale-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent" />
                    <div className="absolute bottom-4 right-4 w-12 h-12 rounded-xl bg-secondary flex items-center justify-center">
                      <service.icon className="w-6 h-6 text-secondary-foreground" />
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-foreground mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {service.description}
                    </p>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <Button size="lg" className="bg-secondary text-secondary-foreground hover:bg-secondary/90" asChild>
              <a href="https://uberfix.shop" target="_blank" rel="noopener noreferrer">
                {isRTL ? "اطلب خدمة الآن" : "Request Service Now"}
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
