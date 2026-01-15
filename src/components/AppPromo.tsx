import { Smartphone, Download, UserPlus, Wrench, CheckCircle, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useTranslation } from "react-i18next";

const AppPromo = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/20" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-4">
            <Smartphone className="w-4 h-4" />
            <span className="text-sm font-medium">{t("appPromo.badge")}</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            {t("appPromo.title")} <span className="text-primary">{t("appPromo.titleHighlight")}</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {t("appPromo.subtitle")}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* For Technicians */}
          <Card className="p-8 hover:shadow-elevated transition-all animate-scale-in border-2 hover:border-primary/50 bg-gradient-to-br from-card to-primary/5">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-primary/10 rounded-2xl">
                <Wrench className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{t("appPromo.technicianTitle")}</h3>
                <p className="text-muted-foreground">{t("appPromo.technicianSubtitle")}</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">{t("appPromo.tech1Title")}</p>
                  <p className="text-sm text-muted-foreground">{t("appPromo.tech1Desc")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">{t("appPromo.tech2Title")}</p>
                  <p className="text-sm text-muted-foreground">{t("appPromo.tech2Desc")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">{t("appPromo.tech3Title")}</p>
                  <p className="text-sm text-muted-foreground">{t("appPromo.tech3Desc")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">{t("appPromo.tech4Title")}</p>
                  <p className="text-sm text-muted-foreground">{t("appPromo.tech4Desc")}</p>
                </div>
              </div>
            </div>

            <Button size="lg" className="w-full bg-gradient-primary hover:opacity-90 text-primary-foreground shadow-elevated group">
              <UserPlus className={`${isRTL ? 'ml-2' : 'mr-2'} h-5 w-5`} />
              {t("appPromo.techCTA")}
            </Button>
          </Card>

          {/* For Customers */}
          <Card className="p-8 hover:shadow-elevated transition-all animate-scale-in border-2 hover:border-secondary/50 bg-gradient-to-br from-card to-secondary/5" style={{ animationDelay: "0.1s" }}>
            <div className="flex items-center gap-4 mb-6">
              <div className="p-4 bg-secondary/10 rounded-2xl">
                <Smartphone className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">{t("appPromo.customerTitle")}</h3>
                <p className="text-muted-foreground">{t("appPromo.customerSubtitle")}</p>
              </div>
            </div>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">{t("appPromo.cust1Title")}</p>
                  <p className="text-sm text-muted-foreground">{t("appPromo.cust1Desc")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">{t("appPromo.cust2Title")}</p>
                  <p className="text-sm text-muted-foreground">{t("appPromo.cust2Desc")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-secondary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">{t("appPromo.cust3Title")}</p>
                  <p className="text-sm text-muted-foreground">{t("appPromo.cust3Desc")}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Globe className="w-5 h-5 text-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold text-foreground">{t("appPromo.cust4Title")}</p>
                  <p className="text-sm text-muted-foreground">{t("appPromo.cust4Desc")}</p>
                </div>
              </div>
            </div>

            <Button size="lg" variant="outline" className="w-full border-2 hover:bg-secondary/10 group">
              <Download className={`${isRTL ? 'ml-2' : 'mr-2'} h-5 w-5`} />
              {t("appPromo.custCTA")}
            </Button>
          </Card>
        </div>

        <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50">
          <div className="text-center mb-6">
            <h3 className="text-xl font-bold text-foreground mb-2">{t("appPromo.availableSoon")}</h3>
            <p className="text-muted-foreground">{t("appPromo.downloadText")}</p>
          </div>
          <div className="flex justify-center items-center gap-8 flex-wrap">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-2 mx-auto hover:scale-110 transition-transform">
                <Smartphone className="w-8 h-8 text-primary" />
              </div>
              <p className="text-sm font-medium text-foreground">Android</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-2 mx-auto hover:scale-110 transition-transform">
                <Smartphone className="w-8 h-8 text-secondary" />
              </div>
              <p className="text-sm font-medium text-foreground">iOS</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-2 mx-auto hover:scale-110 transition-transform">
                <Globe className="w-8 h-8 text-accent" />
              </div>
              <p className="text-sm font-medium text-foreground">Web App</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppPromo;
