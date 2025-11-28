import { Star, Quote } from "lucide-react";

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
  return (
    <section className="py-20 bg-primary text-primary-foreground" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
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
            <div
              key={index}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-2xl p-8 border border-primary-foreground/20 hover:border-secondary/50 transition-all duration-300"
            >
              {/* Quote Icon */}
              <Quote className="w-10 h-10 text-secondary mb-4" />
              
              {/* Content */}
              <p className="text-primary-foreground/90 mb-6 leading-relaxed">
                "{testimonial.content}"
              </p>
              
              {/* Rating */}
              <div className="flex gap-1 mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-secondary text-secondary" />
                ))}
              </div>
              
              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-secondary/20 overflow-hidden">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-full h-full object-cover"
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
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
