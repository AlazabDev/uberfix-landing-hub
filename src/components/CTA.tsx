import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 bg-gradient-primary text-primary-foreground relative overflow-hidden" dir="rtl">
      <div className="absolute inset-0 bg-grid-pattern opacity-10" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            جاهز لتجربة إدارة صيانة احترافية؟
          </h2>
          <p className="text-xl mb-10 opacity-90">
            انضم إلى آلاف العملاء الذين يثقون في UberFix لإدارة جميع احتياجات الصيانة
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              variant="secondary"
              className="bg-background text-primary hover:bg-background/90 shadow-elevated"
              onClick={() => window.open('https://uberfix.shop', '_blank')}
            >
              ابدأ مجاناً
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() => window.open('https://uberfix.shop/demo', '_blank')}
            >
              احجز عرض توضيحي
            </Button>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="flex flex-col items-center gap-3 animate-slide-up">
              <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Phone className="w-6 h-6" />
              </div>
              <div>
                <div className="font-semibold mb-1">اتصل بنا</div>
                <div className="text-sm opacity-90">+20 XXX XXX XXXX</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <Mail className="w-6 h-6" />
              </div>
              <div>
                <div className="font-semibold mb-1">راسلنا</div>
                <div className="text-sm opacity-90">info@uberfix.com</div>
              </div>
            </div>

            <div className="flex flex-col items-center gap-3 animate-slide-up" style={{ animationDelay: "0.2s" }}>
              <div className="w-14 h-14 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                <MapPin className="w-6 h-6" />
              </div>
              <div>
                <div className="font-semibold mb-1">موقعنا</div>
                <div className="text-sm opacity-90">القاهرة، مصر</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
