import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

// أيقونات الفنيين
const technicianIcons = [
  '/icons/tec-19.png',
  '/icons/tec-20.png',
  '/icons/tec-21.png',
  '/icons/tec-22.png',
  '/icons/tec-23.png',
  '/icons/tec-24.png',
];

interface BranchLocation {
  name: string;
  latitude: number;
  longitude: number;
  url?: string;
}

const BranchesMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const mapboxToken = 'pk.eyJ1IjoiYWRtaW51YmVyZml4IiwiYSI6ImNtaWZsOGx2cTBldDYzaXM5YXV4bWFyc3QifQ.j_p5UoorYTcmJoGt_eEZ3w';
  const [branches, setBranches] = useState<BranchLocation[]>([]);

  // تحميل بيانات الفروع
  useEffect(() => {
    fetch('/data/branch_locations.json')
      .then(res => res.json())
      .then(data => setBranches(data))
      .catch(err => console.error('Error loading branches:', err));
  }, []);

  useEffect(() => {
    if (!mapContainer.current || !mapboxToken || branches.length === 0) return;

    mapboxgl.accessToken = mapboxToken;

    // حساب المركز بناءً على جميع الفروع
    const centerLat = branches.reduce((sum, b) => sum + b.latitude, 0) / branches.length;
    const centerLng = branches.reduce((sum, b) => sum + b.longitude, 0) / branches.length;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [centerLng, centerLat],
      zoom: 11,
    });

    // إضافة عناصر التحكم
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // إضافة علامات الفروع
    branches.forEach((branch, index) => {
      // اختيار أيقونة فني عشوائية
      const randomTechIcon = technicianIcons[Math.floor(Math.random() * technicianIcons.length)];
      
      // إنشاء عنصر HTML مخصص للعلامة المزدوجة
      const el = document.createElement('div');
      el.className = 'custom-marker-container';
      el.style.cssText = `
        position: relative;
        width: 50px;
        height: 70px;
        cursor: pointer;
      `;

      // الأيقونة الرئيسية (5060)
      const mainIcon = document.createElement('img');
      mainIcon.src = '/icons/icon-5060.png';
      mainIcon.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 50px;
        height: 70px;
        animation: pulse-icon 2s ease-in-out infinite;
        animation-delay: ${index * 0.1}s;
        filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
        transition: transform 0.3s ease;
      `;

      // الأيقونة الثانوية (فني عشوائي)
      const techIcon = document.createElement('img');
      techIcon.src = randomTechIcon;
      techIcon.style.cssText = `
        position: absolute;
        top: 5px;
        left: 5px;
        width: 40px;
        height: 60px;
        animation: pulse-icon-secondary 2.5s ease-in-out infinite;
        animation-delay: ${index * 0.15}s;
        filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.2));
        transition: transform 0.3s ease;
      `;

      el.appendChild(mainIcon);
      el.appendChild(techIcon);

      // تأثيرات الهوفر
      el.addEventListener('mouseenter', () => {
        mainIcon.style.transform = 'scale(1.15) translateY(-5px)';
        techIcon.style.transform = 'scale(1.15) translateY(-5px)';
      });
      el.addEventListener('mouseleave', () => {
        mainIcon.style.transform = 'scale(1) translateY(0)';
        techIcon.style.transform = 'scale(1) translateY(0)';
      });

      // إنشاء Popup
      const popupContent = `
        <div style="padding: 12px; direction: rtl; min-width: 200px;">
          <h3 style="font-weight: bold; margin-bottom: 8px; color: #1e293b; font-size: 16px;">${branch.name}</h3>
          <div style="margin-top: 8px;">
            <p style="color: #64748b; font-size: 13px; margin-bottom: 4px;">
              <strong>الإحداثيات:</strong><br/>
              ${branch.latitude.toFixed(6)}, ${branch.longitude.toFixed(6)}
            </p>
            ${branch.url ? `
              <a href="${branch.url}" target="_blank" rel="noopener noreferrer" 
                 style="display: inline-block; margin-top: 8px; color: #f5bf23; font-weight: 600; text-decoration: none; font-size: 13px;">
                📍 فتح في خرائط Google
              </a>
            ` : ''}
          </div>
        </div>
      `;

      const popup = new mapboxgl.Popup({ 
        offset: 35,
        closeButton: true,
        closeOnClick: false,
        maxWidth: '300px'
      }).setHTML(popupContent);

      // إضافة Marker للخريطة
      new mapboxgl.Marker(el)
        .setLngLat([branch.longitude, branch.latitude])
        .setPopup(popup)
        .addTo(map.current!);
    });

    // إضافة CSS للأنيميشن
    const style = document.createElement('style');
    style.textContent = `
      @keyframes pulse-icon {
        0%, 100% {
          opacity: 1;
          transform: scale(1);
        }
        50% {
          opacity: 0.85;
          transform: scale(1.08);
        }
      }
      
      @keyframes pulse-icon-secondary {
        0%, 100% {
          opacity: 1;
          transform: scale(1) rotate(0deg);
        }
        50% {
          opacity: 0.9;
          transform: scale(1.05) rotate(2deg);
        }
      }

      .mapboxgl-popup-content {
        border-radius: 12px;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
      }

      .mapboxgl-popup-close-button {
        font-size: 20px;
        padding: 4px 8px;
        color: #64748b;
      }

      .mapboxgl-popup-close-button:hover {
        background-color: rgba(245, 191, 35, 0.1);
        color: #f5bf23;
      }
    `;
    document.head.appendChild(style);

    return () => {
      map.current?.remove();
      document.head.removeChild(style);
    };
  }, [mapboxToken, branches]);

  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-elevated">
      <div ref={mapContainer} className="w-full h-full" />
      {branches.length > 0 && (
        <div className="text-center mt-4 text-muted-foreground" dir="rtl">
          <p className="text-sm">
            📍 يتم عرض <strong className="text-secondary">{branches.length}</strong> موقع
          </p>
        </div>
      )}
    </div>
  );
};

export default BranchesMap;
