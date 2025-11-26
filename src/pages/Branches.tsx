import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BranchesMap from "@/components/BranchesMap";
import { Card } from "@/components/ui/card";
import { MapPin, Building2, TrendingUp, Users } from "lucide-react";

interface BranchLocation {
  name: string;
  latitude: number;
  longitude: number;
  url?: string;
}

const Branches = () => {
  const [branches, setBranches] = useState<BranchLocation[]>([]);
  const [cityStats, setCityStats] = useState<{ [key: string]: number }>({});

  useEffect(() => {
    fetch('/data/branch_locations.json')
      .then(res => res.json())
      .then((data: BranchLocation[]) => {
        setBranches(data);
        
        // حساب إحصائيات المدن (عدد تقريبي حسب الإحداثيات)
        const stats: { [key: string]: number } = {};
        data.forEach(branch => {
          // تصنيف تقريبي حسب الإحداثيات
          if (branch.latitude > 30.0 && branch.longitude > 31.2 && branch.longitude < 31.5) {
            stats['القاهرة الكبرى'] = (stats['القاهرة الكبرى'] || 0) + 1;
          } else if (branch.latitude > 30.5) {
            stats['المحافظات الشمالية'] = (stats['المحافظات الشمالية'] || 0) + 1;
          } else if (branch.latitude < 30.0) {
            stats['الجيزة والمحافظات الجنوبية'] = (stats['الجيزة والمحافظات الجنوبية'] || 0) + 1;
          }
        });
        setCityStats(stats);
      })
      .catch(err => console.error('Error loading branches:', err));
  }, []);
  return (
    <div className="min-h-screen">
      <Navigation />

      <section className="py-20 bg-gradient-hero" dir="rtl">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <div className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-4 py-2 rounded-full mb-6">
              <Building2 className="w-4 h-4" />
              <span className="text-sm font-medium">شبكة عملائنا</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              مواقع <span className="text-secondary">عملائنا</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              نفخر بإدارة صيانة وتشغيل أكثر من <span className="text-secondary font-bold">{branches.length}</span> موقع للعلامات التجارية الكبرى
            </p>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto mt-4">
              متخصصون في إدارة صيانات العلامات التجارية وسلاسل الإمداد على مستوى الجمهورية
            </p>
          </div>

          {/* إحصائيات سريعة */}
          {Object.keys(cityStats).length > 0 && (
            <div className="grid md:grid-cols-3 gap-6 mb-16 max-w-4xl mx-auto">
              <Card className="p-6 text-center bg-gradient-to-br from-secondary/10 to-secondary/5 border-secondary/20">
                <MapPin className="w-8 h-8 text-secondary mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-foreground mb-2">{branches.length}</h3>
                <p className="text-muted-foreground">موقع نشط</p>
              </Card>
              <Card className="p-6 text-center bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <Users className="w-8 h-8 text-primary mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-foreground mb-2">
                  {Object.keys(cityStats).length}+
                </h3>
                <p className="text-muted-foreground">منطقة جغرافية</p>
              </Card>
              <Card className="p-6 text-center bg-gradient-to-br from-accent/10 to-accent/5 border-accent/20">
                <TrendingUp className="w-8 h-8 text-accent mx-auto mb-3" />
                <h3 className="text-3xl font-bold text-foreground mb-2">24/7</h3>
                <p className="text-muted-foreground">دعم متواصل</p>
              </Card>
            </div>
          )}

          {/* الخريطة التفاعلية */}
          <div className="mb-16 animate-slide-up">
            <BranchesMap />
          </div>

          {/* التوزيع الجغرافي */}
          {Object.keys(cityStats).length > 0 && (
            <div className="mb-16">
              <h2 className="text-3xl font-bold text-center mb-8 text-foreground">
                التوزيع الجغرافي للمواقع
              </h2>
              <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {Object.entries(cityStats).map(([city, count], index) => (
                  <Card
                    key={city}
                    className="p-6 hover:shadow-elevated transition-all duration-300 animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center">
                        <MapPin className="w-6 h-6 text-secondary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-bold text-foreground mb-1">{city}</h3>
                        <p className="text-2xl font-bold text-secondary">{count}</p>
                        <p className="text-sm text-muted-foreground">موقع</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          )}

          {/* معلومات إضافية */}
          <div className="mt-16 max-w-4xl mx-auto">
            <Card className="p-8 bg-gradient-to-br from-secondary/5 to-transparent border-secondary/20">
              <div className="text-center">
                <Building2 className="w-12 h-12 text-secondary mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-foreground mb-4">
                  شركاء النجاح
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed mb-4">
                  نفخر بثقة كبرى العلامات التجارية في مصر مثل أبو عوف، كارفور، مترو ماركت، وغيرها من الشركات الرائدة
                </p>
                <p className="text-muted-foreground">
                  نحن متخصصون في تقديم حلول الصيانة والتشغيل الذكية التي تضمن استمرارية العمل وتحسين الأداء
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Branches;
