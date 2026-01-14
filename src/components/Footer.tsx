import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-card border-t border-border py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-5 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/icons/uberfix-icon.gif" 
                alt="UberFix" 
                className="w-12 h-12 rounded-xl"
              />
              <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                UberFix
              </span>
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-md">
              {t("footer.description")}
            </p>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-4">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/" className="hover:text-primary transition-colors">{t("nav.home")}</a></li>
              <li><a href="/services" className="hover:text-primary transition-colors">{t("nav.services")}</a></li>
              <li><a href="/about" className="hover:text-primary transition-colors">{t("nav.about")}</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors">{t("nav.contact")}</a></li>
              <li><a href="/help" className="hover:text-primary transition-colors">{t("nav.help")}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-4">{t("footer.ourServices")}</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/luxury-finishing" className="hover:text-secondary transition-colors">{t("nav.luxury")}</a></li>
              <li><a href="/brand-identity" className="hover:text-secondary transition-colors">{t("nav.brand")}</a></li>
              <li><a href="/labn-el-asfor" className="hover:text-secondary transition-colors">{t("nav.labn")}</a></li>
              <li><a href="/quality-standards" className="hover:text-secondary transition-colors">{t("nav.quality")}</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-4">{t("footer.legal")}</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/terms" className="hover:text-primary transition-colors">{t("footer.terms")}</a></li>
              <li><a href="/privacy" className="hover:text-primary transition-colors">{t("footer.privacy")}</a></li>
              <li><a href="/faq" className="hover:text-primary transition-colors">{t("nav.faq")}</a></li>
              <li><a href="/technicians" className="hover:text-primary transition-colors">{t("nav.technicians")}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">Al-Azab Construction Company… D-U-N-S No.: 849203826</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="/terms" className="hover:text-primary transition-colors">{t("footer.termsShort")}</a>
            <span>|</span>
            <a href="/privacy" className="hover:text-primary transition-colors">{t("footer.privacyShort")}</a>
            <span>|</span>
            <a href="https://uberfix.shop" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              uberfix.shop
            </a>
          </div>
          <p className="text-muted-foreground text-sm">{t("footer.copyright")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
