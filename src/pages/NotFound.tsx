import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background" dir="rtl">
      <Navigation />
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <h1 className="mb-4 text-6xl font-bold text-primary">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">عذراً! الصفحة غير موجودة</p>
          <a href="/" className="text-secondary font-medium underline hover:text-secondary/90">
            العودة للرئيسية
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
