import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const mainLinks = [
    { path: "/", label: "الرئيسية" },
    { path: "/services", label: "الخدمات" },
    { path: "/projects", label: "المشروعات" },
    { path: "/branches", label: "الفروع" },
    { path: "/about", label: "عن الشركة" },
    { path: "/contact", label: "اتصل بنا" },
  ];

  const moreLinks = [
    { path: "/pricing", label: "أسعار الخامات" },
    { path: "/enterprise", label: "حلول الشركات" },
    { path: "/live-map", label: "خريطة الفنيين" },
    { path: "/faq", label: "الأسئلة الشائعة" },
    { path: "/technicians", label: "انضم كفني" },
    { path: "/partners", label: "الشركاء والعملاء" },
    { path: "/help", label: "مركز المساعدة" },
    { path: "/quality-standards", label: "معايير الجودة" },
    { path: "/luxury-finishing", label: "Luxury Finishing" },
    { path: "/brand-identity", label: "Brand Identity" },
    { path: "/labn-el-asfor", label: "لبن العصفور" },
  ];

  const allLinks = [...mainLinks, ...moreLinks];

  return (
    <nav className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-lg" dir="rtl">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/icons/uberfix-icon.gif" 
              alt="UberFix" 
              className="w-10 h-10 rounded-lg"
            />
            <div className="text-2xl font-bold text-white">
              <span className="text-secondary">Uber</span>Fix
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {mainLinks.map((link) => (
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
            
            {/* Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 text-sm font-medium text-white/90 hover:text-secondary transition-colors">
                  المزيد
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="bg-card border-border min-w-[180px] z-[100]"
              >
                {moreLinks.map((link) => (
                  <DropdownMenuItem key={link.path} asChild>
                    <Link
                      to={link.path}
                      className={`w-full cursor-pointer ${
                        location.pathname === link.path
                          ? "text-secondary"
                          : "text-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              size="sm"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
              asChild
            >
              <a href="https://uberfix.shop" target="_blank" rel="noopener noreferrer">
                ابدأ الآن
              </a>
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
            {allLinks.map((link) => (
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
              asChild
            >
              <a href="https://uberfix.shop" target="_blank" rel="noopener noreferrer">
                ابدأ الآن
              </a>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
