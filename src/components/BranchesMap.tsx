import { useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';

// بيانات الفروع
const branches = [
  {
    id: 1,
    name: 'فرع المعادي',
    address: 'شارع النصر، المعادي، القاهرة',
    phone: '01090909006',
    coordinates: [31.2758, 29.9602] as [number, number],
  },
  {
    id: 2,
    name: 'فرع مدينة نصر',
    address: 'شارع عباس العقاد، مدينة نصر، القاهرة',
    phone: '01210101088',
    coordinates: [31.3375, 30.0594] as [number, number],
  },
  {
    id: 3,
    name: 'فرع الإسكندرية',
    address: 'طريق الكورنيش، الإسكندرية',
    phone: '01090909007',
    coordinates: [29.9187, 31.2001] as [number, number],
  },
  {
    id: 4,
    name: 'فرع الجيزة',
    address: 'شارع الهرم، الجيزة',
    phone: '01210101089',
    coordinates: [31.2088, 29.9872] as [number, number],
  },
];

const BranchesMap = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<mapboxgl.Map | null>(null);
  const [mapboxToken, setMapboxToken] = useState('');
  const [isTokenSet, setIsTokenSet] = useState(false);

  useEffect(() => {
    if (!mapContainer.current || !isTokenSet || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [31.2357, 30.0444], // Cairo center
      zoom: 9,
    });

    // إضافة عناصر التحكم
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // إضافة علامات الفروع
    branches.forEach((branch) => {
      // إنشاء عنصر HTML مخصص للعلامة
      const el = document.createElement('div');
      el.className = 'custom-marker';
      el.style.cssText = `
        width: 40px;
        height: 40px;
        background-color: #f5bf23;
        border: 3px solid #1e293b;
        border-radius: 50%;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
      `;
      el.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1e293b" stroke-width="2">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
      </svg>`;

      el.addEventListener('mouseenter', () => {
        el.style.transform = 'scale(1.1)';
      });
      el.addEventListener('mouseleave', () => {
        el.style.transform = 'scale(1)';
      });

      // إنشاء Popup
      const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
        <div style="padding: 8px; direction: rtl;">
          <h3 style="font-weight: bold; margin-bottom: 8px; color: #1e293b;">${branch.name}</h3>
          <p style="margin-bottom: 4px; color: #64748b;">${branch.address}</p>
          <p style="color: #f5bf23; font-weight: 600;">${branch.phone}</p>
        </div>
      `);

      // إضافة Marker للخريطة
      new mapboxgl.Marker(el)
        .setLngLat(branch.coordinates)
        .setPopup(popup)
        .addTo(map.current!);
    });

    return () => {
      map.current?.remove();
    };
  }, [isTokenSet, mapboxToken]);

  const handleTokenSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mapboxToken.trim()) {
      setIsTokenSet(true);
    }
  };

  if (!isTokenSet) {
    return (
      <div className="flex items-center justify-center min-h-[500px] p-4">
        <Card className="p-8 max-w-md w-full">
          <h3 className="text-2xl font-bold mb-4 text-center" dir="rtl">
            أدخل Mapbox Token
          </h3>
          <p className="text-muted-foreground mb-6 text-center" dir="rtl">
            للحصول على Token، قم بزيارة{' '}
            <a
              href="https://account.mapbox.com/access-tokens/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary hover:underline"
            >
              mapbox.com
            </a>
          </p>
          <form onSubmit={handleTokenSubmit} className="space-y-4">
            <Input
              type="text"
              placeholder="أدخل Mapbox Access Token"
              value={mapboxToken}
              onChange={(e) => setMapboxToken(e.target.value)}
              required
              dir="ltr"
            />
            <button
              type="submit"
              className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90 py-2 px-4 rounded-lg font-medium transition-colors"
            >
              تفعيل الخريطة
            </button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="w-full h-[600px] rounded-xl overflow-hidden shadow-elevated">
      <div ref={mapContainer} className="w-full h-full" />
    </div>
  );
};

export default BranchesMap;
