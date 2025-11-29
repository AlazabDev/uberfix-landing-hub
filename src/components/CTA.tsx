import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const CTA = () => {
  const { ref: mainRef, isVisible: mainVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: contactRef, isVisible: contactVisible } = useScrollAnimation({ threshold: 0.3 });

  return (
    <section className="py-20 bg-primary text-primary-foreground relative overflow-hidden" dir="rtl">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div 
          ref={mainRef}
          className="max-w-4xl mx-auto text-center"
          style={{
            opacity: mainVisible ? 1 : 0,
            transform: mainVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            جاهز لتجربة إدارة صيانة احترافية؟
          </h2>
          <p className="text-xl mb-10 opacity-90">
            انضم إلى آلاف العملاء الذين يثقون في UberFix لإدارة جميع احتياجات الصيانة
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-background text-primary hover:bg-background/90 shadow-elevated px-8 hover:scale-105 transition-all duration-300"
              onClick={() => window.open('https://uberfix.shop', '_blank')}
            >
              ابدأ مجاناً
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-2 border-secondary bg-secondary text-secondary-foreground hover:bg-secondary/90 px-8 hover:scale-105 transition-all duration-300 glow-effect"
              onClick={() => window.open('https://uberfix.shop/demo', '_blank')}
            >
              احجز عرض توضيحي
            </Button>
          </div>

          <div ref={contactRef} className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            {[
              { icon: Phone, title: "اتصل بنا", value: "+20 XXX XXX XXXX" },
              { icon: Mail, title: "راسلنا", value: "info@uberfix.com" },
              { icon: MapPin, title: "موقعنا", value: "القاهرة، مصر" }
            ].map((contact, index) => (
              <div 
                key={index}
                className="flex flex-col items-center gap-3 group cursor-pointer"
                style={{
                  opacity: contactVisible ? 1 : 0,
                  transform: contactVisible ? 'translateY(0)' : 'translateY(30px)',
                  transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1}s`
                }}
              >
                <div className="w-14 h-14 rounded-full bg-primary-foreground/10 flex items-center justify-center group-hover:scale-110 group-hover:bg-secondary/20 transition-all duration-300">
                  <contact.icon className="w-6 h-6 group-hover:text-secondary transition-colors duration-300" />
                </div>
                <div>
                  <div className="font-semibold mb-1">{contact.title}</div>
                  <div className="text-sm opacity-90">{contact.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
