import { Star, Quote } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const testimonials = [
  {
    name: "أحمد محمد",
    role: "صاحب شركة",
    content: "خدمة ممتازة وفنيين محترفين. تم إصلاح جميع مشاكل الصيانة في مكتبنا بسرعة وجودة عالية.",
    rating: 5,
    image: "/upload/maintenance01.jpg"
  },
  {
    name: "سارة أحمد",
    role: "ربة منزل",
    content: "أفضل خدمة صيانة تعاملت معها. الفنيين ملتزمون بالمواعيد والأسعار معقولة جداً.",
    rating: 5,
    image: "/upload/maintenance02.jpg"
  },
  {
    name: "محمود علي",
    role: "مدير مطعم",
    content: "نعتمد على UberFix في صيانة جميع معداتنا. خدمة سريعة ودعم فني متميز على مدار الساعة.",
    rating: 5,
    image: "/upload/maintenance03.jpg"
  }
];

const Testimonials = () => {
  const { ref: headerRef, isVisible: headerVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section className="py-20 bg-primary text-primary-foreground" dir="rtl">
      <div className="container mx-auto px-4">
        <div 
          ref={headerRef}
          className="text-center mb-16"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? 'translateY(0)' : 'translateY(30px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <span className="text-secondary font-semibold text-sm uppercase tracking-wider">
            آراء العملاء
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">
            ماذا يقول عملاؤنا عنا
          </h2>
          <p className="text-primary-foreground/80 mt-4 max-w-2xl mx-auto">
            نفخر بثقة آلاف العملاء الذين يعتمدون علينا في خدمات الصيانة
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

const TestimonialCard = ({ testimonial, index }: { testimonial: typeof testimonials[0]; index: number }) => {
  const { ref, isVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <div
      ref={ref}
      className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/20 hover:border-secondary/50 transition-all duration-500 cursor-pointer group hover:bg-primary-foreground/15 hover:-translate-y-2 hover:shadow-2xl"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(40px) scale(0.95)',
        transition: `all 0.6s cubic-bezier(0.4, 0, 0.2, 1) ${index * 0.15}s`
      }}
    >
      {/* Quote Icon */}
      <Quote className="w-10 h-10 text-secondary mb-4 group-hover:scale-110 transition-transform duration-300" />
      
      {/* Content */}
      <p className="text-primary-foreground/90 mb-6 leading-relaxed">
        "{testimonial.content}"
      </p>
      
      {/* Rating */}
      <div className="flex gap-1 mb-6">
        {[...Array(testimonial.rating)].map((_, i) => (
          <Star 
            key={i} 
            className="w-5 h-5 fill-secondary text-secondary transition-all duration-300"
            style={{
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'scale(1)' : 'scale(0)',
              transition: `all 0.3s ease ${i * 0.1 + 0.3}s`
            }}
          />
        ))}
      </div>
      
      {/* Author */}
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-secondary/20 overflow-hidden group-hover:ring-2 group-hover:ring-secondary transition-all duration-300">
          <img
            src={testimonial.image}
            alt={testimonial.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div>
          <h4 className="font-bold text-primary-foreground">
            {testimonial.name}
          </h4>
          <p className="text-primary-foreground/70 text-sm">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
