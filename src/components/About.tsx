import { Card } from "@/components/ui/card";
import { Building, Target, Award, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

const About = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <section className="py-20 bg-gradient-hero" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              {t("about.title")} <span className="text-primary">{t("about.titleHighlight")}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("about.subtitle")}
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 bg-card border-border hover:shadow-elevated transition-all animate-slide-up">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center">
                  <Building className="w-6 h-6 text-primary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{t("about.aboutUsTitle")}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("about.aboutUsDesc")}
                  </p>
                </div>
              </div>
            </Card>

            <Card className="p-8 bg-card border-border hover:shadow-elevated transition-all animate-slide-up" style={{ animationDelay: "0.1s" }}>
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-secondary flex items-center justify-center">
                  <Target className="w-6 h-6 text-secondary-foreground" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">{t("about.visionTitle")}</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("about.visionDesc")}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <Card className="p-6 bg-gradient-primary text-primary-foreground hover:shadow-elevated transition-all text-center animate-scale-in" style={{ animationDelay: "0.2s" }}>
              <Award className="w-10 h-10 mx-auto mb-4" />
              <h4 className="text-lg font-bold mb-2">{t("about.certifiedTitle")}</h4>
              <p className="text-sm opacity-90">{t("about.certifiedDesc")}</p>
            </Card>

            <Card className="p-6 bg-gradient-secondary text-secondary-foreground hover:shadow-elevated transition-all text-center animate-scale-in" style={{ animationDelay: "0.3s" }}>
              <Sparkles className="w-10 h-10 mx-auto mb-4" />
              <h4 className="text-lg font-bold mb-2">{t("about.integratedTitle")}</h4>
              <p className="text-sm opacity-90">{t("about.integratedDesc")}</p>
            </Card>

            <Card className="p-6 bg-gradient-accent text-accent-foreground hover:shadow-elevated transition-all text-center animate-scale-in" style={{ animationDelay: "0.4s" }}>
              <Target className="w-10 h-10 mx-auto mb-4" />
              <h4 className="text-lg font-bold mb-2">{t("about.professionalTitle")}</h4>
              <p className="text-sm opacity-90">{t("about.professionalDesc")}</p>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
