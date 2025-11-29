import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

export default function FounderLight() {
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      className="relative py-24 bg-primary text-center overflow-hidden"
      dir="rtl"
    >
      {/* Decorative Elements */}
      <div className="absolute top-20 left-20 w-40 h-40 bg-secondary/10 rounded-full blur-3xl float-animation" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-secondary/10 rounded-full blur-3xl float-animation" style={{ animationDelay: '1.5s' }} />
      
      <div className="container relative z-10 mx-auto px-6">
        
        {/* صورة المؤسس */}
        <div
          ref={imageRef}
          style={{
            opacity: imageVisible ? 1 : 0,
            transform: imageVisible ? 'scale(1)' : 'scale(0.8)',
            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          <img
            src="https://al-azab.co/assets/img/512x512.png"
            alt="المؤسس محمد العزب"
            className="w-40 h-40 object-cover rounded-full mx-auto shadow-xl border-4 border-secondary hover:scale-110 transition-transform duration-500 cursor-pointer glow-effect"
          />
        </div>

        {/* Content */}
        <div
          ref={contentRef}
          style={{
            opacity: contentVisible ? 1 : 0,
            transform: contentVisible ? 'translateY(0)' : 'translateY(40px)',
            transition: 'all 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
          }}
        >
          {/* العنوان */}
          <h2 className="text-4xl font-bold text-primary-foreground mt-6">
            من فني إلى مؤسس ورئيس تنفيذي لشركة العزب
          </h2>

          {/* النص الملهم */}
          <p className="max-w-3xl mx-auto text-lg text-primary-foreground/80 leading-relaxed mt-4">
            بدأت القصة من الميدان… من الصيانة… من التعب الحقيقي.  
            رحلة طويلة من التعلم والانضباط وبناء الثقة،  
            حتى تأسست شركة العزب لتصبح واحدة من اسرع المنظومات نموًا في السوق المصري،  
            وتقدم حلولًا متكاملة للهندسة والتشغيل والصيانة.
          </p>

          {/* زر الانتقال */}
          <Button
            className="mt-8 bg-secondary text-secondary-foreground hover:bg-secondary/90 font-semibold rounded-full px-10 py-6 text-lg shadow-lg hover:scale-105 transition-all duration-300 glow-effect"
            onClick={() => (window.location.href = "/founder")}
          >
            اكتشف قصة المؤسس
          </Button>
        </div>
      </div>
    </section>
  );
}
