import { Wrench } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-card border-t border-border py-12" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-primary flex items-center justify-center">
                <Wrench className="w-5 h-5 text-primary-foreground" />
              </div>
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
              <li><a href="https://uberfix.shop" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">التطبيق</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-foreground mb-4">الخدمات</h3>
            <ul className="space-y-2 text-muted-foreground">
              <li><a href="#" className="hover:text-secondary transition-colors">صيانة المنازل</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">صيانة المباني</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">صيانة المنشآت</a></li>
              <li><a href="#" className="hover:text-secondary transition-colors">التشطيبات</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border pt-8 text-center">
          <p className="text-muted-foreground mb-2">Al-Azab Construction Company… D-U-N-S No.: 849203826</p>
          <p className="text-muted-foreground">
            All rights reserved © 2025 | 
            <a href="https://uberfix.shop" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline mx-2">
              uberfix.shop
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
