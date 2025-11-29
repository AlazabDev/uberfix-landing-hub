import { Button } from "@/components/ui/button";
import { Wrench, DollarSign, Award, Users } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const benefits = [
  { icon: DollarSign, text: "دخل ثابت ومكافآت" },
  { icon: Award, text: "تدريب وتطوير مهني" },
  { icon: Users, text: "طلبات يومية مستمرة" },
];

const TechnicianCTA = () => {
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: cardRef, isVisible: cardVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-20 bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground relative overflow-hidden" dir="rtl">
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      {/* Decorative Elements with Animation */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-secondary/10 rounded-full blur-3xl float-animation" />
      <div className="absolute bottom-10 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '1s' }} />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div 
              ref={contentRef}
              style={{
                opacity: contentVisible ? 1 : 0,
                transform: contentVisible ? 'translateX(0)' : 'translateX(-50px)',
                transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
              }}
            >
              <div className="inline-flex items-center gap-2 bg-secondary/20 px-4 py-2 rounded-full mb-6 shimmer">
                <Wrench className="w-5 h-5 text-secondary" />
                <span className="text-sm font-medium text-secondary">فرصة للفنيين المحترفين</span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold mb-6 leading-tight">
                انضم إلى شبكة فنيي
                <span className="text-secondary"> UberFix</span>
              </h2>
              
              <p className="text-lg opacity-90 mb-8 leading-relaxed">
                كن جزءاً من أكبر شبكة فنيين محترفين في مصر. احصل على طلبات مستمرة، دخل مستقر، وفرص تطوير مهني حقيقية.
              </p>

              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <div 
                    key={index} 
                    className="flex items-center gap-3 group cursor-pointer"
                    style={{
                      opacity: contentVisible ? 1 : 0,
                      transform: contentVisible ? 'translateX(0)' : 'translateX(-30px)',
                      transition: `all 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.1 + 0.3}s`
                    }}
                  >
                    <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center group-hover:scale-110 group-hover:bg-secondary/30 transition-all duration-300">
                      <benefit.icon className="w-5 h-5 text-secondary" />
                    </div>
                    <span className="font-medium group-hover:text-secondary transition-colors duration-300">{benefit.text}</span>
                  </div>
                ))}
              </div>

              <Button 
                size="lg"
                className="bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-lg px-8 py-6 text-lg hover:scale-105 transition-all duration-300 glow-effect"
                onClick={() => window.location.href = '/technicians'}
              >
                سجّل الآن كفني محترف
              </Button>
            </div>

            {/* Stats Card */}
            <div 
              ref={cardRef}
              style={{
                opacity: cardVisible ? 1 : 0,
                transform: cardVisible ? 'translateX(0) scale(1)' : 'translateX(50px) scale(0.95)',
                transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
              }}
            >
              <div className="bg-primary-foreground/10 backdrop-blur-sm rounded-3xl p-8 border border-primary-foreground/20 hover:border-secondary/30 transition-all duration-500 interactive-card">
                <div className="grid grid-cols-2 gap-6">
                  {[
                    { value: "+500", label: "فني نشط" },
                    { value: "+15", label: "فرع في مصر" },
                    { value: "98%", label: "رضا العملاء" },
                    { value: "24/7", label: "دعم فني" }
                  ].map((stat, index) => (
                    <div 
                      key={index}
                      className="text-center p-4 hover:bg-primary-foreground/5 rounded-xl transition-all duration-300 cursor-pointer group"
                      style={{
                        opacity: cardVisible ? 1 : 0,
                        transform: cardVisible ? 'translateY(0)' : 'translateY(20px)',
                        transition: `all 0.5s ease ${index * 0.1 + 0.4}s`
                      }}
                    >
                      <div className="text-4xl font-bold text-secondary mb-2 group-hover:scale-110 transition-transform duration-300">{stat.value}</div>
                      <div className="text-sm opacity-80">{stat.label}</div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-6 pt-6 border-t border-primary-foreground/20 text-center">
                  <p className="text-sm opacity-80 mb-2">متوسط الدخل الشهري</p>
                  <div className="text-3xl font-bold text-secondary">+15,000 ج.م</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechnicianCTA;
