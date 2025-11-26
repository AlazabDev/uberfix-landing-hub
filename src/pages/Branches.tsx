import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BranchesMap from "@/components/BranchesMap";
import { Card } from "@/components/ui/card";
import { MapPin, Phone, Clock, Mail } from "lucide-react";

const branches = [
  {
    id: 1,
    name: 'فرع المعادي',
    address: 'شارع النصر، المعادي، القاهرة',
    phone: '01090909006',
    email: 'maadi@al-azab.co',
    hours: 'السبت - الخميس: 9:00 ص - 6:00 م',
    qr: '/placeholder.svg', // يمكن إضافة QR codes لاحقاً
  },
  {
    id: 2,
    name: 'فرع مدينة نصر',
    address: 'شارع عباس العقاد، مدينة نصر، القاهرة',
    phone: '01210101088',
    email: 'nasr@al-azab.co',
    hours: 'السبت - الخميس: 9:00 ص - 6:00 م',
    qr: '/placeholder.svg',
  },
  {
    id: 3,
    name: 'فرع الإسكندرية',
    address: 'طريق الكورنيش، الإسكندرية',
    phone: '01090909007',
    email: 'alex@al-azab.co',
    hours: 'السبت - الخميس: 9:00 ص - 6:00 م',
    qr: '/placeholder.svg',
  },
  {
    id: 4,
    name: 'فرع الجيزة',
    address: 'شارع الهرم، الجيزة',
    phone: '01210101089',
    email: 'giza@al-azab.co',
    hours: 'السبت - الخميس: 9:00 ص - 6:00 م',
    qr: '/placeholder.svg',
  },
];

const Branches = () => {
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-20 bg-gradient-hero" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-6">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">فروعنا</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              فروع <span className="text-secondary">UberFix</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              نحن في خدمتك في جميع أنحاء مصر
            </p>
          </div>

          {/* الخريطة التفاعلية */}
          <div className="mb-16 animate-slide-up">
            <BranchesMap />
          </div>

          {/* قائمة الفروع */}
          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {branches.map((branch, index) => (
              <Card
                key={branch.id}
                className="p-6 hover:shadow-elevated transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <h3 className="text-2xl font-bold mb-4 text-foreground">
                  {branch.name}
                </h3>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground">{branch.address}</p>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Phone className="w-5 h-5 text-secondary flex-shrink-0" />
                    <a
                      href={`tel:${branch.phone}`}
                      className="text-muted-foreground hover:text-secondary transition-colors"
                    >
                      {branch.phone}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-secondary flex-shrink-0" />
                    <a
                      href={`mailto:${branch.email}`}
                      className="text-muted-foreground hover:text-secondary transition-colors"
                    >
                      {branch.email}
                    </a>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground">{branch.hours}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <button className="text-secondary hover:text-secondary/80 font-medium transition-colors">
                    عرض على الخريطة
                  </button>
                  <div className="w-16 h-16 bg-muted rounded-lg flex items-center justify-center">
                    <span className="text-xs text-muted-foreground">QR Code</span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Branches;
