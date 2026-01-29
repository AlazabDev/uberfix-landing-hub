import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

export default function FounderLight() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const navigate = useNavigate();
  const { ref: imageRef, isVisible: imageVisible } = useScrollAnimation({ threshold: 0.2 });
  const { ref: contentRef, isVisible: contentVisible } = useScrollAnimation({ threshold: 0.2 });

  return (
    <section
      className="relative py-24 bg-primary text-center overflow-hidden"
      dir={isRTL ? 'rtl' : 'ltr'}
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
            alt={isRTL ? "المؤسس محمد العزب" : "Founder Mohamed Al-Azab"}
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
            {t("founder.title")}
          </h2>

          {/* النص الملهم */}
          <p className="max-w-3xl mx-auto text-lg text-primary-foreground/80 leading-relaxed mt-4">
            {t("founder.description")}
          </p>

          {/* زر الانتقال */}
          <Button
            className="mt-8 bg-secondary text-primary hover:bg-secondary/90 font-semibold rounded-full px-10 py-6 text-lg shadow-lg hover:scale-105 transition-all duration-300"
            onClick={() => navigate("/founder")}
          >
            {t("founder.cta")}
          </Button>
        </div>
      </div>
    </section>
  );
}
