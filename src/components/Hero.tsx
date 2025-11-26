import { Button } from "@/components/ui/button";
import { ArrowRight, Wrench } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-hero" dir="rtl">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-6 animate-scale-in">
            <Wrench className="w-4 h-4" />
            <span className="text-sm font-medium">نظام إدارة الصيانة الأول في مصر</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            <span className="bg-gradient-primary bg-clip-text text-transparent">UberFix</span>
            <br />
            إدارة الصيانة بذكاء
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed max-w-3xl mx-auto">
            منصة متكاملة لربط العملاء بالفنيين وإدارة جميع عمليات الصيانة من البداية للنهاية. 
            حلول احترافية من شركة العزب المعمارية
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              size="lg" 
              className="bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-elevated group"
              onClick={() => window.open('https://uberfix.shop', '_blank')}
            >
              ابدأ الآن
              <ArrowLeft className="mr-2 h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 hover:bg-muted"
              onClick={() => window.open('https://uberfix.shop/about', '_blank')}
            >
              تعرف على المزيد
            </Button>
          </div>
          
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="text-3xl font-bold text-primary mb-2">+5000</div>
              <div className="text-sm text-muted-foreground">طلب صيانة</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "0.3s" }}>
              <div className="text-3xl font-bold text-secondary mb-2">+500</div>
              <div className="text-sm text-muted-foreground">فني محترف</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: "0.4s" }}>
              <div className="text-3xl font-bold text-accent mb-2">98%</div>
              <div className="text-sm text-muted-foreground">رضا العملاء</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// RTL Icon fix
const ArrowLeft = ({ className }: { className?: string }) => (
  <ArrowRight className={className} style={{ transform: 'scaleX(-1)' }} />
);

export default Hero;
