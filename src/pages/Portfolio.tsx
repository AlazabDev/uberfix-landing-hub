import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Camera, Sparkles } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import GalleryFilters from '@/components/gallery/GalleryFilters';
import GalleryLightbox from '@/components/gallery/GalleryLightbox';

// Cloudinary public URL helper
const CLOUDINARY_BASE = 'https://res.cloudinary.com/dhspqc6yh/image/upload';
const cloudImg = (name: string) => `${CLOUDINARY_BASE}/img/${name}`;

// Import videos (kept local)
import video1 from '@/assets/vedio/تنزيل (1).mp4';
import video2 from '@/assets/vedio/تنزيل (2).mp4';
import video3 from '@/assets/vedio/تنزيل (3).mp4';
import video4 from '@/assets/vedio/تنزيل (4).mp4';
import video6 from '@/assets/vedio/تنزيل (6).mp4';
import video7 from '@/assets/vedio/تنزيل (7).mp4';
import video9 from '@/assets/vedio/تنزيل (9).mp4';
import video10 from '@/assets/vedio/تنزيل (10).mp4';
import video11 from '@/assets/vedio/تنزيل (11).mp4';
import video12 from '@/assets/vedio/تنزيل (12).mp4';
import videoMain from '@/assets/vedio/تنزيل.mp4';

interface GalleryItem {
  type: 'image' | 'video';
  src: string;
  title?: string;
  titleEn?: string;
  description?: string;
  descriptionEn?: string;
  category?: string;
  categoryEn?: string;
}

// Project data with detailed descriptions
const projectsData = [
  { src: cloudImg('maintenance01.jpg'), category: 'سباكة', categoryEn: 'Plumbing', title: 'إصلاح تسربات المياه', titleEn: 'Water Leak Repair', description: 'إصلاح شامل لتسربات المياه في الحمام الرئيسي مع تجديد المواسير', descriptionEn: 'Complete water leak repair in main bathroom with pipe renewal' },
  { src: cloudImg('maintenance02.jpg'), category: 'كهرباء', categoryEn: 'Electrical', title: 'تركيب لوحة كهربائية', titleEn: 'Electrical Panel Installation', description: 'تركيب لوحة كهربائية حديثة مع نظام حماية متكامل', descriptionEn: 'Modern electrical panel installation with integrated protection system' },
  { src: cloudImg('maintenance03.jpg'), category: 'تكييف', categoryEn: 'AC', title: 'صيانة تكييف مركزي', titleEn: 'Central AC Maintenance', description: 'صيانة دورية شاملة لنظام التكييف المركزي', descriptionEn: 'Comprehensive periodic maintenance for central AC system' },
  { src: cloudImg('maintenance04.jpg'), category: 'نجارة', categoryEn: 'Carpentry', title: 'تصنيع مطبخ خشبي', titleEn: 'Wooden Kitchen Manufacturing', description: 'تصنيع وتركيب مطبخ خشبي فاخر بتصميم عصري', descriptionEn: 'Manufacturing and installing a luxury wooden kitchen with modern design' },
  { src: cloudImg('maintenance05.jpg'), category: 'دهانات', categoryEn: 'Painting', title: 'دهان واجهة فيلا', titleEn: 'Villa Facade Painting', description: 'دهان واجهة فيلا بألوان عصرية مقاومة للعوامل الجوية', descriptionEn: 'Villa facade painting with modern weather-resistant colors' },
  { src: cloudImg('maintenance06.jpg'), category: 'تشطيبات', categoryEn: 'Finishing', title: 'تشطيب شقة سكنية', titleEn: 'Residential Apartment Finishing', description: 'تشطيب كامل لشقة سكنية 200 متر بأعلى جودة', descriptionEn: 'Complete finishing of 200m² residential apartment with highest quality' },
  { src: cloudImg('maintenance07.jpg'), category: 'سباكة', categoryEn: 'Plumbing', title: 'تركيب سخان مياه', titleEn: 'Water Heater Installation', description: 'تركيب سخان مياه غاز حديث مع ضمان سنة كاملة', descriptionEn: 'Modern gas water heater installation with one year warranty' },
  { src: cloudImg('maintenance08.jpg'), category: 'كهرباء', categoryEn: 'Electrical', title: 'تمديدات إضاءة LED', titleEn: 'LED Lighting Extensions', description: 'تمديد إضاءة LED موفرة للطاقة في جميع الغرف', descriptionEn: 'Energy-efficient LED lighting extension in all rooms' },
  { src: cloudImg('maintenance09.jpg'), category: 'تكييف', categoryEn: 'AC', title: 'تركيب سبليت جديد', titleEn: 'New Split AC Installation', description: 'تركيب مكيف سبليت 2.5 طن مع التمديدات الكاملة', descriptionEn: '2.5 ton split AC installation with complete extensions' },
  { src: cloudImg('maintenance10.jpg'), category: 'نجارة', categoryEn: 'Carpentry', title: 'تركيب أبواب داخلية', titleEn: 'Interior Doors Installation', description: 'تركيب أبواب داخلية خشبية مع إطارات ألمنيوم', descriptionEn: 'Interior wooden doors installation with aluminum frames' },
  { src: cloudImg('maintenance11.jpg'), category: 'دهانات', categoryEn: 'Painting', title: 'دهان غرف نوم', titleEn: 'Bedroom Painting', description: 'دهان 3 غرف نوم بألوان هادئة ومريحة للعين', descriptionEn: 'Painting 3 bedrooms with calm and eye-comfortable colors' },
  { src: cloudImg('maintenance12.jpg'), category: 'تشطيبات', categoryEn: 'Finishing', title: 'تركيب سيراميك', titleEn: 'Ceramic Installation', description: 'تركيب سيراميك إيطالي فاخر للصالة والممرات', descriptionEn: 'Luxury Italian ceramic installation for hall and corridors' },
  { src: cloudImg('maintenance13.jpg'), category: 'سباكة', categoryEn: 'Plumbing', title: 'تجديد حمام كامل', titleEn: 'Complete Bathroom Renovation', description: 'تجديد شامل للحمام مع تغيير جميع الأدوات الصحية', descriptionEn: 'Complete bathroom renovation with all sanitary ware replacement' },
  { src: cloudImg('maintenance14.jpg'), category: 'كهرباء', categoryEn: 'Electrical', title: 'تركيب نظام أمان', titleEn: 'Security System Installation', description: 'تركيب نظام إنذار وكاميرات مراقبة متكامل', descriptionEn: 'Integrated alarm system and surveillance cameras installation' },
  { src: cloudImg('maintenance15.jpg'), category: 'تكييف', categoryEn: 'AC', title: 'تنظيف مكيفات', titleEn: 'AC Cleaning', description: 'تنظيف عميق لـ 5 مكيفات مع تعقيم وتعبئة فريون', descriptionEn: 'Deep cleaning of 5 ACs with sterilization and freon refill' },
  { src: cloudImg('maintenance16.jpg'), category: 'نجارة', categoryEn: 'Carpentry', title: 'خزائن ملابس', titleEn: 'Wardrobe Cabinets', description: 'تصنيع خزائن ملابس مدمجة بتصميم مخصص', descriptionEn: 'Custom-designed built-in wardrobe cabinets manufacturing' },
  { src: cloudImg('maintenance17.jpg'), category: 'دهانات', categoryEn: 'Painting', title: 'ديكورات جبسية', titleEn: 'Gypsum Decorations', description: 'تنفيذ ديكورات جبسية مع دهان سقف معلق', descriptionEn: 'Gypsum decorations execution with suspended ceiling painting' },
  { src: cloudImg('maintenance18.jpg'), category: 'تشطيبات', categoryEn: 'Finishing', title: 'تركيب رخام', titleEn: 'Marble Installation', description: 'تركيب رخام طبيعي للمطبخ والحمامات', descriptionEn: 'Natural marble installation for kitchen and bathrooms' },
  { src: cloudImg('maintenance19.jpg'), category: 'سباكة', categoryEn: 'Plumbing', title: 'تركيب فلتر مياه', titleEn: 'Water Filter Installation', description: 'تركيب فلتر مياه 7 مراحل مع خزان معالجة', descriptionEn: '7-stage water filter installation with treatment tank' },
  { src: cloudImg('maintenance20.jpg'), category: 'كهرباء', categoryEn: 'Electrical', title: 'تركيب UPS', titleEn: 'UPS Installation', description: 'تركيب نظام UPS للحماية من انقطاع الكهرباء', descriptionEn: 'UPS system installation for power outage protection' },
  { src: cloudImg('maintenance21.jpg'), category: 'تكييف', categoryEn: 'AC', title: 'إصلاح تكييف', titleEn: 'AC Repair', description: 'إصلاح عطل في ضاغط التكييف مع ضمان 6 أشهر', descriptionEn: 'AC compressor repair with 6 months warranty' },
  { src: cloudImg('maintenance22.jpg'), category: 'نجارة', categoryEn: 'Carpentry', title: 'طاولة اجتماعات', titleEn: 'Meeting Table', description: 'تصنيع طاولة اجتماعات خشبية لـ 12 شخص', descriptionEn: 'Wooden meeting table manufacturing for 12 persons' },
  { src: cloudImg('maintenance23.jpg'), category: 'دهانات', categoryEn: 'Painting', title: 'دهان مكتب', titleEn: 'Office Painting', description: 'دهان مكتب تجاري بألوان مناسبة لبيئة العمل', descriptionEn: 'Commercial office painting with work environment suitable colors' },
  { src: cloudImg('maintenance24.jpg'), category: 'تشطيبات', categoryEn: 'Finishing', title: 'تركيب باركيه', titleEn: 'Parquet Installation', description: 'تركيب أرضيات باركيه ألماني عالي الجودة', descriptionEn: 'High-quality German parquet flooring installation' },
  { src: cloudImg('maintenance25.jpg'), category: 'سباكة', categoryEn: 'Plumbing', title: 'صيانة مضخة مياه', titleEn: 'Water Pump Maintenance', description: 'صيانة وإصلاح مضخة مياه الخزان العلوي', descriptionEn: 'Upper tank water pump maintenance and repair' },
  { src: cloudImg('maintenance26.jpg'), category: 'كهرباء', categoryEn: 'Electrical', title: 'تركيب ثريات', titleEn: 'Chandeliers Installation', description: 'تركيب ثريات كريستال فاخرة في الصالة الرئيسية', descriptionEn: 'Luxury crystal chandeliers installation in main hall' },
  { src: cloudImg('maintenance27.jpg'), category: 'تكييف', categoryEn: 'AC', title: 'نظام تهوية', titleEn: 'Ventilation System', description: 'تركيب نظام تهوية مركزي للمطبخ والحمامات', descriptionEn: 'Central ventilation system installation for kitchen and bathrooms' },
  { src: cloudImg('maintenance28.jpg'), category: 'نجارة', categoryEn: 'Carpentry', title: 'ديكور خشبي', titleEn: 'Wooden Decor', description: 'تنفيذ ديكور خشبي للجدران مع إضاءة مخفية', descriptionEn: 'Wooden wall decor execution with hidden lighting' },
  { src: cloudImg('maintenance29.jpg'), category: 'دهانات', categoryEn: 'Painting', title: 'دهان سلالم', titleEn: 'Staircase Painting', description: 'دهان سلالم عمارة 5 طوابق مع حماية ضد الرطوبة', descriptionEn: '5-floor building staircase painting with humidity protection' },
  { src: cloudImg('maintenance30.jpg'), category: 'تشطيبات', categoryEn: 'Finishing', title: 'تشطيب محل تجاري', titleEn: 'Commercial Shop Finishing', description: 'تشطيب محل تجاري 80 متر جاهز للاستلام', descriptionEn: '80m² commercial shop finishing ready for handover' },
  { src: cloudImg('maintenance31.jpg'), category: 'سباكة', categoryEn: 'Plumbing', title: 'تمديد شبكة صرف', titleEn: 'Drainage Network Extension', description: 'تمديد شبكة صرف صحي جديدة للمبنى', descriptionEn: 'New sanitary drainage network extension for building' },
  { src: cloudImg('maintenance32.jpg'), category: 'كهرباء', categoryEn: 'Electrical', title: 'صيانة مصعد', titleEn: 'Elevator Maintenance', description: 'صيانة كهربائية دورية لمصعد 8 أشخاص', descriptionEn: 'Periodic electrical maintenance for 8-person elevator' },
  { src: cloudImg('maintenance33.jpg'), category: 'تكييف', categoryEn: 'AC', title: 'تركيب مكيف صحراوي', titleEn: 'Desert Cooler Installation', description: 'تركيب مكيف صحراوي كبير للمخزن', descriptionEn: 'Large desert cooler installation for warehouse' },
  { src: cloudImg('maintenance34.jpg'), category: 'نجارة', categoryEn: 'Carpentry', title: 'أثاث مكتبي', titleEn: 'Office Furniture', description: 'تصنيع أثاث مكتبي متكامل لـ 10 موظفين', descriptionEn: 'Complete office furniture manufacturing for 10 employees' },
  { src: cloudImg('maintenance35.jpg'), category: 'دهانات', categoryEn: 'Painting', title: 'دهان واجهة مبنى', titleEn: 'Building Facade Painting', description: 'دهان واجهة مبنى سكني 7 طوابق', descriptionEn: '7-floor residential building facade painting' },
  { src: cloudImg('maintenance36.jpg'), category: 'تشطيبات', categoryEn: 'Finishing', title: 'تجديد مدخل عمارة', titleEn: 'Building Entrance Renovation', description: 'تجديد مدخل عمارة سكنية مع إضاءة حديثة', descriptionEn: 'Residential building entrance renovation with modern lighting' },
  { src: cloudImg('maintenance37.jpg'), category: 'سباكة', categoryEn: 'Plumbing', title: 'تركيب جاكوزي', titleEn: 'Jacuzzi Installation', description: 'تركيب جاكوزي فاخر مع نظام تدفئة المياه', descriptionEn: 'Luxury jacuzzi installation with water heating system' },
  { src: cloudImg('maintenance38.jpg'), category: 'كهرباء', categoryEn: 'Electrical', title: 'طاقة شمسية', titleEn: 'Solar Energy', description: 'تركيب نظام طاقة شمسية 5 كيلو وات', descriptionEn: '5 kilowatt solar energy system installation' },
  { src: cloudImg('maintenance39.jpg'), category: 'تكييف', categoryEn: 'AC', title: 'صيانة تشيلر', titleEn: 'Chiller Maintenance', description: 'صيانة شاملة لنظام تشيلر مركزي', descriptionEn: 'Comprehensive central chiller system maintenance' },
  { src: cloudImg('maintenance40.jpg'), category: 'نجارة', categoryEn: 'Carpentry', title: 'تركيب بيرغولا', titleEn: 'Pergola Installation', description: 'تركيب بيرغولا خشبية للحديقة مع إضاءة', descriptionEn: 'Wooden pergola installation for garden with lighting' },
  { src: cloudImg('maintenance41.jpg'), category: 'دهانات', categoryEn: 'Painting', title: 'دهان فني', titleEn: 'Artistic Painting', description: 'تنفيذ لوحة فنية جدارية بألوان زيتية', descriptionEn: 'Artistic wall mural execution with oil colors' },
  { src: cloudImg('maintenance42.jpg'), category: 'تشطيبات', categoryEn: 'Finishing', title: 'تشطيب فيلا', titleEn: 'Villa Finishing', description: 'تشطيب فيلا 500 متر سوبر لوكس', descriptionEn: '500m² super luxury villa finishing' },
  { src: cloudImg('maintenance43.jpg'), category: 'سباكة', categoryEn: 'Plumbing', title: 'حمام سباحة', titleEn: 'Swimming Pool', description: 'تمديدات سباكة لحمام سباحة منزلي', descriptionEn: 'Plumbing extensions for home swimming pool' },
  { src: cloudImg('maintenance44.jpg'), category: 'كهرباء', categoryEn: 'Electrical', title: 'أتمتة منزلية', titleEn: 'Home Automation', description: 'تركيب نظام سمارت هوم للتحكم بالإضاءة', descriptionEn: 'Smart home system installation for lighting control' },
  { src: cloudImg('maintenance45.jpg'), category: 'تكييف', categoryEn: 'AC', title: 'غرفة تبريد', titleEn: 'Cold Room', description: 'تركيب غرفة تبريد تجارية للمطعم', descriptionEn: 'Commercial cold room installation for restaurant' },
  { src: cloudImg('maintenance46.jpg'), category: 'نجارة', categoryEn: 'Carpentry', title: 'مكتبة جدارية', titleEn: 'Wall Library', description: 'تصنيع مكتبة جدارية خشبية بتصميم كلاسيكي', descriptionEn: 'Classic design wooden wall library manufacturing' },
];

// Video data with descriptions
const videosData = [
  { src: videoMain, category: 'تشطيبات', categoryEn: 'Finishing', title: 'جولة في مشروع التشطيب', titleEn: 'Finishing Project Tour', description: 'جولة كاملة في مشروع تشطيب فيلا فاخرة', descriptionEn: 'Complete tour of luxury villa finishing project' },
  { src: video1, category: 'كهرباء', categoryEn: 'Electrical', title: 'تركيب اللوحة الكهربائية', titleEn: 'Electrical Panel Installation', description: 'شرح تفصيلي لعملية تركيب اللوحة الكهربائية', descriptionEn: 'Detailed explanation of electrical panel installation process' },
  { src: video2, category: 'سباكة', categoryEn: 'Plumbing', title: 'إصلاح تسربات المياه', titleEn: 'Water Leak Repair', description: 'طريقة إصلاح تسربات المياه باحترافية', descriptionEn: 'Professional water leak repair method' },
  { src: video3, category: 'تكييف', categoryEn: 'AC', title: 'تنظيف المكيف', titleEn: 'AC Cleaning', description: 'خطوات تنظيف المكيف بشكل صحيح', descriptionEn: 'Correct AC cleaning steps' },
  { src: video4, category: 'نجارة', categoryEn: 'Carpentry', title: 'تصنيع أثاث', titleEn: 'Furniture Manufacturing', description: 'مراحل تصنيع الأثاث الخشبي', descriptionEn: 'Wooden furniture manufacturing stages' },
  { src: video6, category: 'دهانات', categoryEn: 'Painting', title: 'تقنيات الدهان', titleEn: 'Painting Techniques', description: 'أحدث تقنيات الدهان والديكور', descriptionEn: 'Latest painting and decoration techniques' },
  { src: video7, category: 'تشطيبات', categoryEn: 'Finishing', title: 'تركيب السيراميك', titleEn: 'Ceramic Installation', description: 'طريقة تركيب السيراميك بدقة عالية', descriptionEn: 'High-precision ceramic installation method' },
  { src: video9, category: 'كهرباء', categoryEn: 'Electrical', title: 'نظام الإضاءة', titleEn: 'Lighting System', description: 'تصميم وتركيب نظام إضاءة ذكي', descriptionEn: 'Smart lighting system design and installation' },
  { src: video10, category: 'سباكة', categoryEn: 'Plumbing', title: 'تركيب الأدوات الصحية', titleEn: 'Sanitary Ware Installation', description: 'تركيب أدوات صحية حديثة', descriptionEn: 'Modern sanitary ware installation' },
  { src: video11, category: 'تكييف', categoryEn: 'AC', title: 'صيانة دورية', titleEn: 'Periodic Maintenance', description: 'أهمية الصيانة الدورية للمكيفات', descriptionEn: 'Importance of periodic AC maintenance' },
  { src: video12, category: 'نجارة', categoryEn: 'Carpentry', title: 'تركيب المطابخ', titleEn: 'Kitchen Installation', description: 'مراحل تركيب المطبخ الخشبي', descriptionEn: 'Wooden kitchen installation stages' },
];

const Portfolio = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeType, setActiveType] = useState<'all' | 'image' | 'video'>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = isRTL 
    ? ['كهرباء', 'سباكة', 'تكييف', 'نجارة', 'دهانات', 'تشطيبات']
    : ['Electrical', 'Plumbing', 'AC', 'Carpentry', 'Painting', 'Finishing'];
  
  const galleryItems: GalleryItem[] = useMemo(() => {
    const imageItems: GalleryItem[] = projectsData.map((project) => ({
      type: 'image',
      src: project.src,
      title: isRTL ? project.title : project.titleEn,
      description: isRTL ? project.description : project.descriptionEn,
      category: isRTL ? project.category : project.categoryEn
    }));
    
    const videoItems: GalleryItem[] = videosData.map((video) => ({
      type: 'video',
      src: video.src,
      title: isRTL ? video.title : video.titleEn,
      description: isRTL ? video.description : video.descriptionEn,
      category: isRTL ? video.category : video.categoryEn
    }));
    
    return [...imageItems, ...videoItems];
  }, [isRTL]);
  
  const filteredItems = useMemo(() => {
    return galleryItems.filter(item => {
      const typeMatch = activeType === 'all' || item.type === activeType;
      const categoryMatch = activeCategory === 'all' || item.category === activeCategory;
      return typeMatch && categoryMatch;
    });
  }, [galleryItems, activeType, activeCategory]);
  
  const counts = useMemo(() => ({
    all: galleryItems.length,
    images: galleryItems.filter(i => i.type === 'image').length,
    videos: galleryItems.filter(i => i.type === 'video').length
  }), [galleryItems]);
  
  const handleItemClick = (index: number) => {
    setCurrentIndex(index);
    setLightboxOpen(true);
  };
  
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative py-24 bg-gradient-to-br from-background via-muted/30 to-background overflow-hidden" dir={isRTL ? 'rtl' : 'ltr'}>
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-secondary/10 text-secondary px-5 py-2 rounded-full mb-6"
            >
              <Camera className="w-5 h-5" />
              <span className="text-sm font-semibold">
                {isRTL ? 'معرض أعمالنا' : 'Our Portfolio'}
              </span>
              <Sparkles className="w-4 h-4" />
            </motion.div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {isRTL ? (
                <>
                  <span className="text-foreground">أعمالنا </span>
                  <span className="text-secondary">المتميزة</span>
                </>
              ) : (
                <>
                  <span className="text-foreground">Our Outstanding </span>
                  <span className="text-secondary">Work</span>
                </>
              )}
            </h1>
            
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              {isRTL 
                ? 'استعرض مجموعة من أفضل مشاريع الصيانة والتشطيبات التي قمنا بتنفيذها لعملائنا بأعلى معايير الجودة والاحترافية'
                : 'Browse through our best maintenance and finishing projects executed for our clients with the highest standards of quality and professionalism'
              }
            </p>
            
            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center justify-center gap-8 mt-10"
            >
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">{counts.all}+</div>
                <div className="text-sm text-muted-foreground">
                  {isRTL ? 'مشروع' : 'Projects'}
                </div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">{counts.images}</div>
                <div className="text-sm text-muted-foreground">
                  {isRTL ? 'صورة' : 'Images'}
                </div>
              </div>
              <div className="w-px h-12 bg-border" />
              <div className="text-center">
                <div className="text-3xl font-bold text-secondary">{counts.videos}</div>
                <div className="text-sm text-muted-foreground">
                  {isRTL ? 'فيديو' : 'Videos'}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Filters Section */}
      <section className="py-8 border-b border-border sticky top-16 z-30 bg-background/95 backdrop-blur-lg">
        <div className="container mx-auto px-4">
          <GalleryFilters
            categories={categories}
            activeCategory={activeCategory}
            activeType={activeType}
            onCategoryChange={setActiveCategory}
            onTypeChange={setActiveType}
            counts={counts}
          />
        </div>
      </section>
      
      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          {filteredItems.length > 0 ? (
            <GalleryGrid
              items={filteredItems}
              onItemClick={handleItemClick}
            />
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <Camera className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-muted-foreground mb-2">
                {isRTL ? 'لا توجد نتائج' : 'No Results Found'}
              </h3>
              <p className="text-muted-foreground">
                {isRTL ? 'جرب تغيير الفلاتر' : 'Try changing the filters'}
              </p>
            </motion.div>
          )}
        </div>
      </section>
      
      {/* Lightbox */}
      <GalleryLightbox
        items={filteredItems}
        currentIndex={currentIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setCurrentIndex}
      />
      
      <Footer />
    </div>
  );
};

export default Portfolio;
