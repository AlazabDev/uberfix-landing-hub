import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const links = [
    { path: "/", label: "الرئيسية" },
    { path: "/services", label: "الخدمات" },
    { path: "/projects", label: "المشروعات" },
    { path: "/branches", label: "الفروع" },
    { path: "/about", label: "عن الشركة" },
    { path: "/contact", label: "اتصل بنا" },
  ];

  return (
    <nav className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-lg" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3">
            <div className="text-2xl font-bold text-white">
              <span className="text-secondary">Uber</span>Fix
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-secondary ${
                  location.pathname === link.path
                    ? "text-secondary"
                    : "text-white/90"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Button
              size="sm"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              ابدأ الآن
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2 text-sm font-medium transition-colors hover:text-secondary ${
                  location.pathname === link.path
                    ? "text-secondary"
                    : "text-white/90"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Button
              size="sm"
              className="w-full mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/90"
            >
              ابدأ الآن
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
