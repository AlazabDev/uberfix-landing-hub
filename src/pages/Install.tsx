import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Download, Smartphone, CheckCircle, Share, Plus, MoreVertical } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
}

const Install = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    // Check if already installed
    if (window.matchMedia("(display-mode: standalone)").matches) {
      setIsInstalled(true);
    }

    // Detect device
    const userAgent = navigator.userAgent.toLowerCase();
    setIsIOS(/iphone|ipad|ipod/.test(userAgent));
    setIsAndroid(/android/.test(userAgent));

    // Listen for install prompt
    const handleBeforeInstallPrompt = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    window.addEventListener("beforeinstallprompt", handleBeforeInstallPrompt);

    // Listen for app installed
    window.addEventListener("appinstalled", () => {
      setIsInstalled(true);
      setDeferredPrompt(null);
    });

    return () => {
      window.removeEventListener("beforeinstallprompt", handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === "accepted") {
      setIsInstalled(true);
    }
    setDeferredPrompt(null);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-20 safe-area-top">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <div className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-secondary flex items-center justify-center">
            <Smartphone className="w-10 h-10 text-secondary-foreground" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            تثبيت تطبيق UberFix
          </h1>
          <p className="text-lg text-muted-foreground">
            احصل على تجربة أفضل مع تطبيقنا المثبت على هاتفك
          </p>
        </div>

        {isInstalled ? (
          <Card className="max-w-md mx-auto border-green-500/50 bg-green-50/50 dark:bg-green-950/20">
            <CardContent className="pt-6 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <h2 className="text-xl font-bold text-foreground mb-2">
                التطبيق مثبت بالفعل! 🎉
              </h2>
              <p className="text-muted-foreground">
                يمكنك الآن الوصول إلى UberFix من الشاشة الرئيسية لهاتفك
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-6 max-w-lg mx-auto">
            {/* Android / Chrome Install */}
            {(deferredPrompt || isAndroid) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-secondary" />
                    تثبيت مباشر
                  </CardTitle>
                  <CardDescription>
                    أسرع طريقة لتثبيت التطبيق
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    onClick={handleInstall}
                    className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                    size="lg"
                    disabled={!deferredPrompt}
                  >
                    <Download className="w-5 h-5 ml-2" />
                    تثبيت التطبيق الآن
                  </Button>
                  {!deferredPrompt && isAndroid && (
                    <p className="text-sm text-muted-foreground mt-3 text-center">
                      افتح الصفحة في متصفح Chrome للتثبيت المباشر
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* iOS Instructions */}
            {isIOS && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share className="w-5 h-5 text-secondary" />
                    تثبيت على iPhone / iPad
                  </CardTitle>
                  <CardDescription>
                    اتبع هذه الخطوات البسيطة
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-secondary">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">اضغط على زر المشاركة</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Share className="w-4 h-4" /> في أسفل المتصفح
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-secondary">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">اختر "إضافة للشاشة الرئيسية"</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Plus className="w-4 h-4" /> Add to Home Screen
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-secondary">3</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">اضغط "إضافة"</p>
                      <p className="text-sm text-muted-foreground">
                        سيظهر التطبيق على شاشتك الرئيسية
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Android Manual Instructions */}
            {isAndroid && !deferredPrompt && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MoreVertical className="w-5 h-5 text-secondary" />
                    تثبيت يدوي على Android
                  </CardTitle>
                  <CardDescription>
                    إذا لم يظهر زر التثبيت
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-secondary">1</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">اضغط على قائمة المتصفح</p>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MoreVertical className="w-4 h-4" /> النقاط الثلاث في الأعلى
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                      <span className="text-sm font-bold text-secondary">2</span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">اختر "تثبيت التطبيق" أو "إضافة للشاشة الرئيسية"</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Desktop Instructions */}
            {!isIOS && !isAndroid && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Download className="w-5 h-5 text-secondary" />
                    تثبيت على الكمبيوتر
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {deferredPrompt ? (
                    <Button 
                      onClick={handleInstall}
                      className="w-full bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                      size="lg"
                    >
                      <Download className="w-5 h-5 ml-2" />
                      تثبيت التطبيق
                    </Button>
                  ) : (
                    <p className="text-muted-foreground text-center">
                      ابحث عن أيقونة التثبيت في شريط العنوان أو استخدم قائمة المتصفح
                    </p>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Benefits */}
            <Card className="bg-muted/30">
              <CardHeader>
                <CardTitle className="text-lg">مميزات التطبيق المثبت</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    وصول سريع من الشاشة الرئيسية
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    يعمل بدون اتصال بالإنترنت
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    تحميل أسرع
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    تجربة تطبيق كاملة بدون متصفح
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Install;
