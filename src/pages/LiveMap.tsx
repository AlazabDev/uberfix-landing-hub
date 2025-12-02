import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface BranchLocation {
  name: string;
  latitude: number;
  longitude: number;
  url?: string;
}

interface Technician {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  status: string;
  availableIn?: string;
  latitude: number;
  longitude: number;
  icon: string;
}

const technicianIcons = [
  "/icons/tec-09.png",
  "/icons/tec-10.png",
  "/icons/tec-11.png",
  "/icons/tec-12.png",
  "/icons/tec-13.png",
  "/icons/tec-14.png",
  "/icons/tec-15.png",
  "/icons/tec-16.png",
  "/icons/tec-17.png",
  "/icons/tec-18.png",
  "/icons/tec-19.png",
  "/icons/tec-20.png",
  "/icons/tec-21.png",
  "/icons/tec-22.png",
  "/icons/tec-23.png",
  "/icons/tec-24.png",
];

const technicianNames = [
  { name: "أحمد حسين", specialty: "فني سباك" },
  { name: "محمود سعد", specialty: "اسطى نجار" },
  { name: "عمر خالد", specialty: "فني كهرباء" },
  { name: "يوسف أحمد", specialty: "فني تكييف" },
  { name: "كريم محمد", specialty: "فني دهانات" },
  { name: "طارق علي", specialty: "فني سيراميك" },
  { name: "سامي إبراهيم", specialty: "فني ألوميتال" },
  { name: "حسن عبدالله", specialty: "فني صيانة" },
];

const statuses = [
  { status: "متاح الآن", color: "#22c55e" },
  { status: "متاح بعد 40 دقيقه", color: "#f59e0b" },
  { status: "مشغول اليوم", color: "#ef4444" },
];

const LiveMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const mapboxToken = import.meta.env.VITE_MAPBOX_TOKEN;
  const [branches, setBranches] = useState<BranchLocation[]>([]);
  const [technicians, setTechnicians] = useState<Technician[]>([]);
  const [selectedBranch, setSelectedBranch] = useState<BranchLocation | null>(null);

  // Load branches
  useEffect(() => {
    fetch("/data/branch_locations.json")
      .then((res) => res.json())
      .then((data: BranchLocation[]) => {
        setBranches(data);
        
        // Generate random technicians near branches
        const techs: Technician[] = [];
        const usedPositions = new Set<string>();
        
        for (let i = 0; i < 25; i++) {
          const randomBranch = data[Math.floor(Math.random() * data.length)];
          const offsetLat = (Math.random() - 0.5) * 0.08;
          const offsetLng = (Math.random() - 0.5) * 0.08;
          const posKey = `${randomBranch.latitude + offsetLat}-${randomBranch.longitude + offsetLng}`;
          
          if (!usedPositions.has(posKey)) {
            usedPositions.add(posKey);
            const techInfo = technicianNames[Math.floor(Math.random() * technicianNames.length)];
            const statusInfo = statuses[Math.floor(Math.random() * statuses.length)];
            
            techs.push({
              id: i,
              name: techInfo.name,
              specialty: techInfo.specialty,
              rating: 5,
              status: statusInfo.status,
              latitude: randomBranch.latitude + offsetLat,
              longitude: randomBranch.longitude + offsetLng,
              icon: technicianIcons[Math.floor(Math.random() * technicianIcons.length)],
            });
          }
        }
        setTechnicians(techs);
      });
  }, []);

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || branches.length === 0 || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [31.2357, 30.0444], // Cairo center
      zoom: 11,
    });

    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add branch markers
    branches.forEach((branch, index) => {
      const el = document.createElement("div");
      el.className = "branch-marker";
      el.innerHTML = `
        <div class="branch-pin">
          <img src="/icons/icon-6070.png" alt="Branch" />
        </div>
      `;

      const popup = new mapboxgl.Popup({
        offset: 25,
        closeButton: false,
        className: "branch-popup",
      }).setHTML(`
        <div class="popup-content" dir="rtl">
          <div class="popup-row">
            <span class="popup-icon">🆔</span>
            <span class="popup-label">Az-Shop-${String(index + 1).padStart(4, "0")}</span>
          </div>
          <div class="popup-row">
            <span class="popup-icon">🏪</span>
            <span class="popup-label">${branch.name}</span>
          </div>
          <div class="popup-row">
            <span class="popup-icon">📍</span>
            <span class="popup-label">Maadi ${50 + index}</span>
          </div>
          <div class="popup-row status-active">
            <span class="popup-icon">✅</span>
            <span class="popup-label">Active</span>
          </div>
        </div>
      `);

      new mapboxgl.Marker(el)
        .setLngLat([branch.longitude, branch.latitude])
        .setPopup(popup)
        .addTo(map.current!);
    });

    // Add technician markers
    technicians.forEach((tech) => {
      const el = document.createElement("div");
      el.className = "tech-marker";
      el.innerHTML = `
        <img src="${tech.icon}" alt="${tech.specialty}" class="tech-icon-img" />
      `;

      const statusColor = tech.status === "متاح الآن" ? "#22c55e" : tech.status === "مشغول اليوم" ? "#ef4444" : "#f59e0b";

      const popup = new mapboxgl.Popup({
        offset: 30,
        closeButton: false,
        className: "tech-popup",
      }).setHTML(`
        <div class="tech-popup-content" dir="rtl">
          <div class="tech-icon-large">
            <img src="${tech.icon}" alt="${tech.specialty}" />
          </div>
          <div class="tech-info">
            <h3 class="tech-name">${tech.name}</h3>
            <p class="tech-specialty">${tech.specialty}</p>
            <div class="tech-rating">★★★★★</div>
            <p class="tech-status" style="color: ${statusColor}">${tech.status}</p>
            <button class="tech-btn">طلب الخدمة 👆</button>
          </div>
        </div>
      `);

      new mapboxgl.Marker(el)
        .setLngLat([tech.longitude, tech.latitude])
        .setPopup(popup)
        .addTo(map.current!);
    });

    // Inject styles
    const style = document.createElement("style");
    style.textContent = `
      .branch-marker {
        cursor: pointer;
      }
      .branch-pin {
        display: flex;
        flex-direction: column;
        align-items: center;
        animation: bounce 2s infinite;
      }
      .branch-pin img {
        width: 50px;
        height: 50px;
        filter: drop-shadow(0 4px 6px rgba(0,0,0,0.3));
      }
      
      .tech-marker {
        cursor: pointer;
      }
      .tech-icon-img {
        width: 45px;
        height: 45px;
        filter: drop-shadow(0 3px 6px rgba(0,0,0,0.3));
        transition: transform 0.3s ease;
      }
      .tech-icon-img:hover {
        transform: scale(1.2);
      }
      
      .mapboxgl-popup-content {
        padding: 0 !important;
        border-radius: 12px !important;
        overflow: hidden;
        box-shadow: 0 10px 40px rgba(0,0,0,0.3) !important;
      }
      
      .branch-popup .mapboxgl-popup-content {
        background: #1e3a5f !important;
      }
      
      .popup-content {
        padding: 16px;
        min-width: 160px;
      }
      .popup-row {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-bottom: 8px;
        color: white;
        font-size: 14px;
      }
      .popup-row:last-child {
        margin-bottom: 0;
      }
      .popup-icon {
        font-size: 16px;
      }
      .popup-label {
        font-weight: 500;
      }
      .status-active .popup-label {
        color: #22c55e;
      }
      
      .tech-popup .mapboxgl-popup-content {
        background: #1e3a5f !important;
      }
      .tech-popup-content {
        padding: 16px;
        display: flex;
        gap: 12px;
        align-items: center;
        min-width: 200px;
      }
      .tech-icon-large {
        width: 60px;
        height: 60px;
        background: linear-gradient(135deg, #3b82f6, #1d4ed8);
        border-radius: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
      }
      .tech-icon-large img {
        width: 40px;
        height: 40px;
        filter: brightness(0) invert(1);
      }
      .tech-info {
        color: white;
        text-align: right;
      }
      .tech-name {
        font-size: 16px;
        font-weight: bold;
        margin: 0 0 4px 0;
      }
      .tech-specialty {
        font-size: 12px;
        color: #94a3b8;
        margin: 0 0 4px 0;
      }
      .tech-rating {
        color: #f59e0b;
        font-size: 14px;
        margin-bottom: 4px;
      }
      .tech-status {
        font-size: 12px;
        margin: 0 0 8px 0;
        font-weight: 600;
      }
      .tech-btn {
        background: #f59e0b;
        color: #1e3a5f;
        border: none;
        padding: 8px 16px;
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;
        font-size: 12px;
        transition: all 0.3s ease;
      }
      .tech-btn:hover {
        background: #fbbf24;
        transform: scale(1.05);
      }
      
      @keyframes bounce {
        0%, 100% { transform: translateY(0); }
        50% { transform: translateY(-5px); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      map.current?.remove();
      style.remove();
    };
  }, [branches, technicians, mapboxToken]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Header */}
      <section className="bg-gradient-to-r from-[#1e3a5f] to-[#2d4a6f] py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <img 
                src="/icons/uberfix-icon.gif" 
                alt="UberFix" 
                className="w-12 h-12 rounded-xl"
              />
              <span className="text-2xl font-bold text-white">
                <span className="text-secondary">Uber</span>Fix.shop
              </span>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-white">
              Quick Maintenance Methods
            </h1>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="relative" style={{ height: "calc(100vh - 200px)", minHeight: "600px" }}>
        <div ref={mapContainer} className="absolute inset-0" />
        
        {/* Legend */}
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg z-10" dir="rtl">
          <h3 className="font-bold text-foreground mb-3 text-sm">دليل الخريطة</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <img src="/icons/icon-6070.png" alt="Branch" className="w-6 h-6" />
              <span className="text-muted-foreground">فرع نشط</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xs">👷</span>
              </div>
              <span className="text-muted-foreground">فني متاح</span>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-xl px-6 py-3 shadow-lg z-10" dir="rtl">
          <div className="flex items-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-secondary font-bold">{branches.length}</span>
              <span className="text-muted-foreground">فرع نشط</span>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex items-center gap-2">
              <span className="text-primary font-bold">{technicians.length}</span>
              <span className="text-muted-foreground">فني متاح</span>
            </div>
            <div className="w-px h-6 bg-border" />
            <div className="flex items-center gap-2">
              <span className="text-green-500 font-bold">24/7</span>
              <span className="text-muted-foreground">دعم</span>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LiveMap;
