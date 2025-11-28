import { CheckCircle, Calendar, Wrench, Star } from "lucide-react";

const steps = [
  {
    icon: CheckCircle,
    title: "اختر الخدمة",
    description: "تصفح خدماتنا المتنوعة واختر ما يناسب احتياجاتك"
  },
  {
    icon: Calendar,
    title: "حدد الموعد",
    description: "اختر الوقت المناسب لك وسنكون في موقعك"
  },
  {
    icon: Wrench,
    title: "نفذ الصيانة",
    description: "فني محترف يقوم بالعمل بأعلى جودة"
  },
  {
    icon: Star,
    title: "قيّم الخدمة",
    description: "شاركنا رأيك لنستمر في التحسين"
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-muted/30" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            كيف نعمل
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mt-2">
            خطوات بسيطة للحصول على الخدمة
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            نحن نجعل عملية طلب الصيانة سهلة وسريعة في أربع خطوات فقط
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative group">
              <div className="bg-card rounded-2xl p-8 text-center shadow-lg hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-secondary/50">
                {/* Step Number */}
                <div className="absolute -top-4 right-4 w-8 h-8 bg-secondary text-secondary-foreground rounded-full flex items-center justify-center font-bold text-sm">
                  {index + 1}
                </div>
                
                {/* Icon */}
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-8 h-8 text-primary" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground text-sm">
                  {step.description}
                </p>
              </div>
              
              {/* Connector Line (hidden on mobile and last item) */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -left-4 w-8 h-0.5 bg-border" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
