import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Building2, Users, Wrench, Info, ChevronRight, ChevronLeft, Sparkles, Palette, Package } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import LanguageSwitcher from "./LanguageSwitcher";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [mobileSubmenu, setMobileSubmenu] = useState<string | null>(null);
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  const mainLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/services", label: t("nav.services") },
    { path: "/about", label: t("nav.about") },
    { path: "/contact", label: t("nav.contact") },
  ];

  const menuCategories = {
    explore: {
      label: t("nav.explore", "استكشف"),
      icon: Building2,
      links: [
        { path: "/projects", label: t("nav.projects") },
        { path: "/portfolio", label: t("nav.portfolio", "معرض الأعمال") },
        { path: "/branches", label: t("nav.branches") },
        { path: "/live-map", label: t("nav.liveMap") },
      ]
    },
    services: {
      label: t("nav.ourServices", "خدماتنا"),
      icon: Wrench,
      links: [
        { path: "/luxury-finishing", label: t("nav.luxury") },
        { path: "/brand-identity", label: t("nav.brand") },
        { path: "/labn-elasfor", label: t("nav.labn") },
        { path: "/services", label: t("nav.uberfix", "UberFix") },
      ]
    },
    partners: {
      label: t("nav.joinUs", "انضم إلينا"),
      icon: Users,
      links: [
        { path: "/technicians", label: t("nav.technicians") },
        { path: "/partners", label: t("nav.partners") },
        { path: "/founder", label: t("nav.founder") },
      ]
    },
    info: {
      label: t("nav.info", "معلومات"),
      icon: Info,
      links: [
        { path: "/faq", label: t("nav.faq") },
        { path: "/help", label: t("nav.help") },
        { path: "/enterprise", label: t("nav.enterprise") },
        { path: "/quality-standards", label: t("nav.quality") },
        { path: "/pricing", label: t("nav.pricing") },
      ]
    }
  };

  const allLinks = [
    ...mainLinks,
    ...Object.values(menuCategories).flatMap(cat => cat.links)
  ];

  return (
    <nav className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-lg" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img 
              src="/icons/uberfix-icon.gif" 
              alt="UberFix" 
              className="w-10 h-10 rounded-lg bg-transparent"
              style={{ background: 'transparent' }}
            />
            <div className="text-2xl font-bold text-white">
              <span className="text-secondary">Uber</span>Fix
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-5 h-full">
            {mainLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors hover:text-secondary flex items-center h-full ${
                  location.pathname === link.path
                    ? "text-secondary"
                    : "text-white/90"
                }`}
              >
                {link.label}
              </Link>
            ))}
            
            {/* Enhanced Dropdown Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 text-sm font-medium text-white/90 hover:text-secondary transition-colors h-full">
                  {t("nav.more")}
                  <ChevronDown className="w-4 h-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align={isRTL ? "start" : "end"}
                side="bottom"
                className="bg-card border-border min-w-[220px] z-[100] p-2">
                {Object.entries(menuCategories).map(([key, category], index) => (
                  <div key={key}>
                    {index > 0 && <DropdownMenuSeparator className="my-1.5" />}
                    <DropdownMenuSub>
                      <DropdownMenuSubTrigger className="flex items-center gap-2 cursor-pointer rounded-md">
                        <category.icon className="w-4 h-4 text-secondary" />
                        <span>{category.label}</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuSubContent 
                        className={`bg-card border-border min-w-[180px] p-1.5 ${isRTL ? '[&[data-side=right]]:translate-x-0' : ''}`}
                        sideOffset={isRTL ? -4 : 4}
                      >
                        {category.links.map((link) => (
                          <DropdownMenuItem key={link.path} asChild>
                            <Link
                              to={link.path}
                              className={`w-full cursor-pointer rounded-md ${
                                location.pathname === link.path
                                  ? "text-secondary bg-secondary/10"
                                  : "text-foreground"
                              }`}
                            >
                              {link.label}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuSubContent>
                    </DropdownMenuSub>
                  </div>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <div className="flex items-center h-full">
              <LanguageSwitcher />
            </div>

            <Button
              size="sm"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90 flex items-center"
              asChild
            >
              <a href="https://uberfix.shop" target="_blank" rel="noopener noreferrer">
                {t("nav.startNow")}
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="text-white"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden pb-4 max-h-[70vh] overflow-y-auto">
            {mainLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block py-2.5 text-sm font-medium transition-colors hover:text-secondary ${
                  location.pathname === link.path
                    ? "text-secondary"
                    : "text-white/90"
                }`}
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            
            <div className="border-t border-white/10 my-3" />
            
            {Object.entries(menuCategories).map(([key, category]) => (
              <div key={key} className="mb-2">
                <button
                  onClick={() => setMobileSubmenu(mobileSubmenu === key ? null : key)}
                  className="flex items-center justify-between w-full py-2.5 text-sm font-medium text-white/90 hover:text-secondary transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <category.icon className="w-4 h-4 text-secondary" />
                    {category.label}
                  </span>
                  {isRTL ? (
                    <ChevronLeft className={`w-4 h-4 transition-transform ${mobileSubmenu === key ? '-rotate-90' : ''}`} />
                  ) : (
                    <ChevronRight className={`w-4 h-4 transition-transform ${mobileSubmenu === key ? 'rotate-90' : ''}`} />
                  )}
                </button>
                {mobileSubmenu === key && (
                  <div className="ps-6 border-s-2 border-secondary/30 ms-2">
                    {category.links.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className={`block py-2 text-sm transition-colors hover:text-secondary ${
                          location.pathname === link.path
                            ? "text-secondary"
                            : "text-white/70"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {link.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            
            <Button
              size="sm"
              className="w-full mt-4 bg-secondary text-secondary-foreground hover:bg-secondary/90"
              asChild
            >
              <a href="https://uberfix.shop" target="_blank" rel="noopener noreferrer">
                {t("nav.startNow")}
              </a>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
