const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12" dir="rtl">
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
              منصة متكاملة لإدارة طلبات الصيانة من شركة العزب المعمارية. 
              نربط العملاء بالفنيين المحترفين لتوفير أفضل خدمات الصيانة في مصر.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-4">روابط سريعة</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/" className="hover:text-primary transition-colors">الرئيسية</a></li>
              <li><a href="/services" className="hover:text-primary transition-colors">الخدمات</a></li>
              <li><a href="/about" className="hover:text-primary transition-colors">من نحن</a></li>
              <li><a href="/contact" className="hover:text-primary transition-colors">اتصل بنا</a></li>
              <li><a href="/help" className="hover:text-primary transition-colors">مركز المساعدة</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-4">خدماتنا</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/luxury-finishing" className="hover:text-secondary transition-colors">Luxury Finishing</a></li>
              <li><a href="/brand-identity" className="hover:text-secondary transition-colors">Brand Identity</a></li>
              <li><a href="/labn-el-asfor" className="hover:text-secondary transition-colors">لبن العصفور</a></li>
              <li><a href="/quality-standards" className="hover:text-secondary transition-colors">معايير الجودة</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-4">قانوني</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="/terms" className="hover:text-primary transition-colors">شروط الاستخدام</a></li>
              <li><a href="/privacy" className="hover:text-primary transition-colors">سياسة الخصوصية</a></li>
              <li><a href="/faq" className="hover:text-primary transition-colors">الأسئلة الشائعة</a></li>
              <li><a href="/technicians" className="hover:text-primary transition-colors">انضم كفني</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-muted-foreground text-sm">Al-Azab Construction Company… D-U-N-S No.: 849203826</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <a href="/terms" className="hover:text-primary transition-colors">الشروط</a>
            <span>|</span>
            <a href="/privacy" className="hover:text-primary transition-colors">الخصوصية</a>
            <span>|</span>
            <a href="https://uberfix.shop" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              uberfix.shop
            </a>
          </div>
          <p className="text-muted-foreground text-sm">© 2025 جميع الحقوق محفوظة</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
