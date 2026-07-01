import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { MousePointerClick } from "lucide-react";

interface Technician {
  id: string;
  name: string;
  profession: string;
  rating: number;
  status: "available" | "busy";
  statusText: string;
  lat: number;
  lng: number;
  icon: string;
}

interface Branch {
  id: string;
  name: string;
  lat: number;
  lng: number;
}

// Cairo-centered demo data (representative of the reference screenshot)
const TECHNICIANS: Technician[] = [
  { id: "t1", name: "أحمد حسين", profession: "فني سباك", rating: 5, status: "available", statusText: "متاح بعد 40 دقيقة", lat: 30.058, lng: 31.32, icon: "/icons/tec-19.png" },
  { id: "t2", name: "محمود سعد", profession: "أسطى نجار", rating: 5, status: "busy", statusText: "مشغول اليوم", lat: 30.024, lng: 31.235, icon: "/icons/tec-20.png" },
  { id: "t3", name: "خالد إبراهيم", profession: "فني كهرباء", rating: 5, status: "available", statusText: "متاح الآن", lat: 30.09, lng: 31.21, icon: "/icons/tec-21.png" },
  { id: "t4", name: "علي محمد", profession: "فني تكييف", rating: 4, status: "available", statusText: "متاح بعد 20 دقيقة", lat: 30.045, lng: 31.19, icon: "/icons/tec-22.png" },
  { id: "t5", name: "طارق فؤاد", profession: "أسطى دهانات", rating: 5, status: "busy", statusText: "مشغول - غداً متاح", lat: 30.075, lng: 31.28, icon: "/icons/tec-23.png" },
  { id: "t6", name: "عمرو ناصر", profession: "فني محارة", rating: 4, status: "available", statusText: "متاح بعد ساعة", lat: 30.005, lng: 31.27, icon: "/icons/tec-24.png" },
  { id: "t7", name: "حسن الجندي", profession: "فني سيراميك", rating: 5, status: "available", statusText: "متاح الآن", lat: 30.11, lng: 31.34, icon: "/icons/tec-15.png" },
  { id: "t8", name: "إسلام رمضان", profession: "فني ألوميتال", rating: 4, status: "busy", statusText: "مشغول اليوم", lat: 30.03, lng: 31.36, icon: "/icons/tec-16.png" },
];

const BRANCHES: Branch[] = [
  { id: "b1", name: "فرع المهندسين", lat: 30.062, lng: 31.213 },
  { id: "b2", name: "فرع مدينة نصر", lat: 30.061, lng: 31.345 },
  { id: "b3", name: "فرع المعادي", lat: 29.985, lng: 31.275 },
  { id: "b4", name: "فرع مصر الجديدة", lat: 30.098, lng: 31.325 },
  { id: "b5", name: "فرع الدقي", lat: 30.038, lng: 31.212 },
  { id: "b6", name: "فرع وسط البلد", lat: 30.045, lng: 31.243 },
];

const renderStars = (rating: number) =>
  Array.from({ length: 5 })
    .map((_, i) => (i < rating ? "★" : "☆"))
    .join("");

const QuickMaintenanceMap = () => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [selected, setSelected] = useState<Technician | null>(null);
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN as string | undefined;

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || !mapboxToken.startsWith("pk.")) return;

    mapboxgl.accessToken = mapboxToken;
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/light-v11",
      center: [31.27, 30.055],
      zoom: 11.2,
      attributionControl: false,
    });

    map.current.addControl(new mapboxgl.NavigationControl({ showCompass: false }), "top-right");
    map.current.scrollZoom.disable();

    // SVG teardrop pin factory (colored bg + icon inside)
    const buildPin = (color: string, iconSrc: string, size = 52) => {
      const el = document.createElement("div");
      el.style.cssText = `
        position:relative;width:${size}px;height:${size * 1.35}px;cursor:pointer;
        filter:drop-shadow(0 6px 10px rgba(0,0,0,.35));transition:transform .3s ease;
      `;
      el.innerHTML = `
        <svg viewBox="0 0 40 54" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg" style="position:absolute;inset:0;">
          <path d="M20 0C9 0 0 9 0 20c0 14 20 34 20 34s20-20 20-34C40 9 31 0 20 0z" fill="${color}" stroke="#ffffff" stroke-width="2"/>
          <circle cx="20" cy="20" r="14" fill="#ffffff"/>
        </svg>
        <img src="${iconSrc}" style="position:absolute;top:${size * 0.13}px;left:50%;transform:translateX(-50%);width:${size * 0.55}px;height:${size * 0.55}px;object-fit:contain;pointer-events:none;" />
      `;
      el.addEventListener("mouseenter", () => (el.style.transform = "scale(1.15) translateY(-6px)"));
      el.addEventListener("mouseleave", () => (el.style.transform = "scale(1) translateY(0)"));
      return el;
    };

    // Branch markers (blue pins)
    BRANCHES.forEach((b) => {
      const el = buildPin("#1e3a8a", "/icons/branch-icon.png", 44);
      el.title = b.name;
      new mapboxgl.Marker({ element: el, anchor: "bottom" }).setLngLat([b.lng, b.lat]).addTo(map.current!);
    });

    // Technician markers (yellow pins with tech icon)
    TECHNICIANS.forEach((tech, i) => {
      const el = buildPin("#f5b210", tech.icon, 52);
      const avatar = el.querySelector("img") as HTMLImageElement;
      if (avatar) {
        avatar.style.animation = `tech-pulse 2.4s ease-in-out infinite`;
        avatar.style.animationDelay = `${i * 0.15}s`;
      }
      el.addEventListener("click", (e) => {
        e.stopPropagation();
        setSelected(tech);
        map.current?.flyTo({ center: [tech.lng, tech.lat], zoom: 13, duration: 900 });
      });
      new mapboxgl.Marker({ element: el, anchor: "bottom" }).setLngLat([tech.lng, tech.lat]).addTo(map.current!);
    });

    // Close card on map click
    map.current.on("click", () => setSelected(null));

    // Inject keyframes once
    if (!document.getElementById("tech-pulse-keyframes")) {
      const style = document.createElement("style");
      style.id = "tech-pulse-keyframes";
      style.textContent = `
        @keyframes tech-pulse {
          0%,100% { transform: translateX(-50%) scale(1); opacity: 1; }
          50% { transform: translateX(-50%) scale(1.08); opacity: .85; }
        }
      `;
      document.head.appendChild(style);
    }

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, [mapboxToken]);

  const handleRequest = (tech: Technician) => {
    window.dispatchEvent(new CustomEvent("open-maintenance-form", { detail: { technician: tech.name, profession: tech.profession } }));
    // Fallback: scroll to CTA
    document.getElementById("cta")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-14 bg-muted overflow-hidden" dir={isRTL ? "rtl" : "ltr"}>
      <div className="container mx-auto px-4">
        {/* Header bar matching the reference */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <img src="/icons/uberfix-pin.png" alt="UberFix" className="w-10 h-10" />
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground">
              UberFix<span className="text-secondary">.shop</span>
            </h2>
          </div>
          <h3 className="text-xl md:text-3xl font-bold text-primary text-center md:text-end">
            طرق الصيانة السريعة
          </h3>
        </div>

        <div className="relative rounded-2xl overflow-hidden shadow-elevated border border-border" style={{ height: 600 }}>
          <div ref={mapContainer} dir="ltr" className="absolute inset-0" />

          {(!mapboxToken || !mapboxToken.startsWith("pk.")) && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm">
              <p className="text-muted-foreground">تعذّر تحميل الخريطة — تحقق من مفتاح Mapbox</p>
            </div>
          )}

          {/* Hint */}
          {!selected && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-card/95 backdrop-blur-sm px-4 py-2 rounded-full border border-border shadow-md flex items-center gap-2 text-sm text-foreground z-10">
              <MousePointerClick className="w-4 h-4 text-secondary" />
              اضغط على أي فني لعرض بياناته وطلب الخدمة
            </div>
          )}

          {/* Selected technician floating card */}
          {selected && (
            <div
              className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[280px] bg-card rounded-2xl border-2 border-border shadow-2xl p-4 z-20 animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="text-center">
                <h4 className="font-extrabold text-lg text-foreground leading-tight">{selected.name}</h4>
                <p className="text-sm text-muted-foreground mb-2">{selected.profession}</p>
                <div className="text-secondary text-xl mb-2 tracking-wider">{renderStars(selected.rating)}</div>
                <p
                  className={`text-sm font-semibold mb-3 ${
                    selected.status === "available" ? "text-primary" : "text-destructive"
                  }`}
                >
                  {selected.statusText}
                </p>
                <Button
                  onClick={() => handleRequest(selected)}
                  className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 font-bold rounded-full"
                >
                  طلب الخدمة
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Stats strip */}
        <div className="grid grid-cols-3 gap-3 md:gap-6 mt-6">
          <div className="text-center bg-card rounded-xl p-4 border border-border">
            <div className="text-2xl md:text-3xl font-extrabold text-secondary">{TECHNICIANS.length}+</div>
            <div className="text-xs md:text-sm text-muted-foreground">فني قريب منك</div>
          </div>
          <div className="text-center bg-card rounded-xl p-4 border border-border">
            <div className="text-2xl md:text-3xl font-extrabold text-primary">{BRANCHES.length}</div>
            <div className="text-xs md:text-sm text-muted-foreground">فرع نشط</div>
          </div>
          <div className="text-center bg-card rounded-xl p-4 border border-border">
            <div className="text-2xl md:text-3xl font-extrabold text-foreground">24/7</div>
            <div className="text-xs md:text-sm text-muted-foreground">خدمة متواصلة</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QuickMaintenanceMap;
