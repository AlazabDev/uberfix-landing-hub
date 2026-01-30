import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Camera, Sparkles } from 'lucide-react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import GalleryGrid from '@/components/gallery/GalleryGrid';
import GalleryFilters from '@/components/gallery/GalleryFilters';
import GalleryLightbox from '@/components/gallery/GalleryLightbox';

// Import all images
import img01 from '@/assets/img/maintenance01.jpg';
import img02 from '@/assets/img/maintenance02.jpg';
import img03 from '@/assets/img/maintenance03.jpg';
import img04 from '@/assets/img/maintenance04.jpg';
import img05 from '@/assets/img/maintenance05.jpg';
import img06 from '@/assets/img/maintenance06.jpg';
import img07 from '@/assets/img/maintenance07.jpg';
import img08 from '@/assets/img/maintenance08.jpg';
import img09 from '@/assets/img/maintenance09.jpg';
import img10 from '@/assets/img/maintenance10.jpg';
import img11 from '@/assets/img/maintenance11.jpg';
import img12 from '@/assets/img/maintenance12.jpg';
import img13 from '@/assets/img/maintenance13.jpg';
import img14 from '@/assets/img/maintenance14.jpg';
import img15 from '@/assets/img/maintenance15.jpg';
import img16 from '@/assets/img/maintenance16.jpg';
import img17 from '@/assets/img/maintenance17.jpg';
import img18 from '@/assets/img/maintenance18.jpg';
import img19 from '@/assets/img/maintenance19.jpg';
import img20 from '@/assets/img/maintenance20.jpg';
import img21 from '@/assets/img/maintenance21.jpg';
import img22 from '@/assets/img/maintenance22.jpg';
import img23 from '@/assets/img/maintenance23.jpg';
import img24 from '@/assets/img/maintenance24.jpg';
import img25 from '@/assets/img/maintenance25.jpg';
import img26 from '@/assets/img/maintenance26.jpg';
import img27 from '@/assets/img/maintenance27.jpg';
import img28 from '@/assets/img/maintenance28.jpg';
import img29 from '@/assets/img/maintenance29.jpg';
import img30 from '@/assets/img/maintenance30.jpg';
import img31 from '@/assets/img/maintenance31.jpg';
import img32 from '@/assets/img/maintenance32.jpg';
import img33 from '@/assets/img/maintenance33.jpg';
import img34 from '@/assets/img/maintenance34.jpg';
import img35 from '@/assets/img/maintenance35.jpg';
import img36 from '@/assets/img/maintenance36.jpg';
import img37 from '@/assets/img/maintenance37.jpg';
import img38 from '@/assets/img/maintenance38.jpg';
import img39 from '@/assets/img/maintenance39.jpg';
import img40 from '@/assets/img/maintenance40.jpg';

// Import videos
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
  category?: string;
}

const Portfolio = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeType, setActiveType] = useState<'all' | 'image' | 'video'>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const categories = isRTL 
    ? ['صيانة كهربائية', 'سباكة', 'تكييف', 'نجارة', 'دهانات', 'تشطيبات']
    : ['Electrical', 'Plumbing', 'AC', 'Carpentry', 'Painting', 'Finishing'];
  
  const galleryItems: GalleryItem[] = useMemo(() => {
    const images = [
      img01, img02, img03, img04, img05, img06, img07, img08, img09, img10,
      img11, img12, img13, img14, img15, img16, img17, img18, img19, img20,
      img21, img22, img23, img24, img25, img26, img27, img28, img29, img30,
      img31, img32, img33, img34, img35, img36, img37, img38, img39, img40
    ];
    
    const videos = [
      videoMain, video1, video2, video3, video4, video6, video7, video9, video10, video11, video12
    ];
    
    const imageItems: GalleryItem[] = images.map((src, index) => ({
      type: 'image',
      src,
      title: isRTL ? `مشروع صيانة ${index + 1}` : `Maintenance Project ${index + 1}`,
      category: categories[index % categories.length]
    }));
    
    const videoItems: GalleryItem[] = videos.map((src, index) => ({
      type: 'video',
      src,
      title: isRTL ? `فيديو صيانة ${index + 1}` : `Maintenance Video ${index + 1}`,
      category: categories[index % categories.length]
    }));
    
    return [...imageItems, ...videoItems];
  }, [isRTL, categories]);
  
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
