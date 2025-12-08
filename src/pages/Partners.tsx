import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Building2, Handshake, Award, Users } from "lucide-react";

const Partners = () => {
  const partners = [
    { name: "العزب للمقاولات", logo: "https://al-azab.co/w.png", type: "شريك استراتيجي" },
    { name: "شركة البناء الحديث", initials: "BP", type: "عميل رئيسي" },
    { name: "مجموعة الإنشاءات", initials: "CG", type: "شريك تقني" },
    { name: "شركة التطوير العقاري", initials: "RD", type: "عميل مميز" },
    { name: "مؤسسة الصيانة المتكاملة", initials: "IM", type: "شريك خدمات" },
    { name: "شركة المشاريع الكبرى", initials: "MP", type: "عميل رئيسي" },
    { name: "مجموعة الاستثمار العقاري", initials: "RI", type: "شريك استراتيجي" },
    { name: "شركة التشييد والبناء", initials: "CB", type: "عميل مميز" },
  ];

  const clients = [
    { name: "فندق الريتز كارلتون", initials: "RC", category: "فنادق" },
    { name: "مول العرب", initials: "AM", category: "مراكز تجارية" },
    { name: "مستشفى السلام", initials: "SH", category: "رعاية صحية" },
    { name: "جامعة الملك سعود", initials: "KS", category: "تعليم" },
    { name: "بنك الراجحي", initials: "RB", category: "بنوك" },
    { name: "شركة أرامكو", initials: "AR", category: "طاقة" },
    { name: "شركة سابك", initials: "SB", category: "صناعة" },
    { name: "شركة الاتصالات", initials: "ST", category: "اتصالات" },
    { name: "مطار الملك خالد", initials: "KK", category: "مطارات" },
    { name: "وزارة الإسكان", initials: "MH", category: "حكومي" },
    { name: "هيئة الترفيه", initials: "GE", category: "ترفيه" },
    { name: "شركة نيوم", initials: "NM", category: "مشاريع كبرى" },
  ];

  const stats = [
    { icon: Building2, value: "+150", label: "شركة شريكة" },
    { icon: Users, value: "+500", label: "عميل نشط" },
    { icon: Handshake, value: "+1000", label: "مشروع منجز" },
    { icon: Award, value: "98%", label: "نسبة رضا العملاء" },
  ];

  return (
    <div className="min-h-screen bg-background" dir="rtl">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary via-primary/95 to-primary/90 overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }} />
        </div>
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            شركاؤنا في النجاح
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            نفخر بشراكاتنا مع أكبر الشركات والمؤسسات في المنطقة، ونعمل معًا لتقديم أفضل خدمات الصيانة والإصلاح
          </p>
          <Button 
            size="lg" 
            className="bg-secondary text-secondary-foreground hover:bg-secondary/90 text-lg px-8"
            asChild
          >
            <a href="https://uberfix.shop" target="_blank" rel="noopener noreferrer">
              كن شريكًا معنا
            </a>
          </Button>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card border-b border-border">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-14 h-14 mx-auto mb-3 bg-secondary/20 rounded-xl flex items-center justify-center">
                  <stat.icon className="w-7 h-7 text-secondary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Strategic Partners */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">الشركاء الاستراتيجيون</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              نتعاون مع أفضل الشركات لتقديم خدمات متميزة تلبي احتياجات عملائنا
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {partners.map((partner, index) => (
              <div 
                key={index} 
                className="group bg-card border border-border rounded-2xl p-6 text-center hover:shadow-xl hover:border-secondary/50 transition-all duration-300"
              >
                <div className="w-20 h-20 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center overflow-hidden group-hover:scale-110 transition-transform duration-300">
                  {partner.logo ? (
                    <img src={partner.logo} alt={partner.name} className="w-16 h-16 object-contain" />
                  ) : (
                    <span className="text-2xl font-bold text-primary">{partner.initials}</span>
                  )}
                </div>
                <h3 className="font-semibold text-foreground mb-1">{partner.name}</h3>
                <span className="text-sm text-secondary">{partner.type}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Clients */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">عملاؤنا المميزون</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              نخدم مجموعة واسعة من العملاء في مختلف القطاعات
            </p>
          </div>
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {clients.map((client, index) => (
              <div 
                key={index} 
                className="group bg-card border border-border rounded-xl p-4 text-center hover:shadow-lg hover:border-primary/30 transition-all duration-300"
              >
                <div className="w-14 h-14 mx-auto mb-3 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center">
                  <span className="text-lg font-bold text-primary">{client.initials}</span>
                </div>
                <h3 className="font-medium text-foreground text-sm mb-1 line-clamp-1">{client.name}</h3>
                <span className="text-xs text-muted-foreground">{client.category}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            هل ترغب في أن تصبح شريكًا؟
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            انضم إلى شبكة شركائنا واستفد من خدماتنا المتميزة لتحسين أعمالك
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              asChild
            >
              <a href="https://uberfix.shop" target="_blank" rel="noopener noreferrer">
                تواصل معنا الآن
              </a>
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white/10 bg-transparent"
              asChild
            >
              <a href="/contact">
                اعرف المزيد
              </a>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Partners;
