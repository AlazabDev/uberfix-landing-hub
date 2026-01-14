import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LanguageSwitcher from "./LanguageSwitcher";

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { t } = useTranslation();

  const mainLinks = [
    { path: "/", label: t("nav.home") },
    { path: "/services", label: t("nav.services") },
    { path: "/projects", label: t("nav.projects") },
    { path: "/branches", label: t("nav.branches") },
    { path: "/about", label: t("nav.about") },
    { path: "/contact", label: t("nav.contact") },
  ];

  const moreLinks = [
    { path: "/founder", label: t("nav.founder") },
    { path: "/pricing", label: t("nav.pricing") },
    { path: "/enterprise", label: t("nav.enterprise") },
    { path: "/live-map", label: t("nav.liveMap") },
    { path: "/faq", label: t("nav.faq") },
    { path: "/technicians", label: t("nav.technicians") },
    { path: "/partners", label: t("nav.partners") },
    { path: "/help", label: t("nav.help") },
    { path: "/quality-standards", label: t("nav.quality") },
    { path: "/luxury-finishing", label: t("nav.luxury") },
    { path: "/brand-identity", label: t("nav.brand") },
    { path: "/labn-el-asfor", label: t("nav.labn") },
  ];

  const allLinks = [...mainLinks, ...moreLinks];

  return (
    <nav className="bg-primary text-primary-foreground sticky top-0 z-50 shadow-lg">
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
                  {t("nav.more")}
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

            <LanguageSwitcher />

            <Button
              size="sm"
              className="bg-secondary text-secondary-foreground hover:bg-secondary/90"
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
