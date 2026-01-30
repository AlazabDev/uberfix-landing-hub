import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Play, Image as ImageIcon, ZoomIn } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface GalleryItem {
  type: 'image' | 'video';
  src: string;
  thumbnail?: string;
  title?: string;
  description?: string;
  category?: string;
}

interface GalleryGridProps {
  items: GalleryItem[];
  onItemClick: (index: number) => void;
}

const GalleryGrid = ({ items, onItemClick }: GalleryGridProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  
  const handleImageLoad = useCallback((index: number) => {
    setLoadedImages(prev => new Set(prev).add(index));
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };
  
  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };
  
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4"
      dir={isRTL ? 'rtl' : 'ltr'}
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          variants={itemVariants}
          className="break-inside-avoid group relative overflow-hidden rounded-xl cursor-pointer bg-muted"
          onClick={() => onItemClick(index)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {/* Thumbnail/Image */}
          <div className="relative">
            {!loadedImages.has(index) && (
              <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center min-h-[200px]">
                <ImageIcon className="w-12 h-12 text-muted-foreground/30" />
              </div>
            )}
            
            {item.type === 'image' ? (
              <img
                src={item.src}
                alt={item.title || `Gallery item ${index + 1}`}
                className={`w-full h-auto object-cover transition-all duration-500 group-hover:scale-110 ${
                  loadedImages.has(index) ? 'opacity-100' : 'opacity-0'
                }`}
                loading="lazy"
                onLoad={() => handleImageLoad(index)}
              />
            ) : (
              <div className="relative">
                <video
                  src={item.src}
                  className={`w-full h-auto object-cover transition-all duration-500 group-hover:scale-110 ${
                    loadedImages.has(index) ? 'opacity-100' : 'opacity-0'
                  }`}
                  muted
                  preload="metadata"
                  onLoadedData={() => handleImageLoad(index)}
                />
              </div>
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
            
            {/* Video Play Icon */}
            {item.type === 'video' && (
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                  className="w-16 h-16 rounded-full bg-secondary/90 flex items-center justify-center shadow-xl"
                  whileHover={{ scale: 1.1 }}
                >
                  <Play className="w-8 h-8 text-secondary-foreground fill-current ml-1" />
                </motion.div>
              </div>
            )}
            
            {/* Zoom Icon for Images */}
            {item.type === 'image' && (
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <motion.div
                  className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center"
                  initial={{ scale: 0 }}
                  whileHover={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                >
                  <ZoomIn className="w-7 h-7 text-white" />
                </motion.div>
              </div>
            )}
            
            {/* Info */}
            <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
              {item.category && (
                <span className="inline-block px-3 py-1 bg-secondary/90 text-secondary-foreground text-xs font-medium rounded-full mb-2">
                  {item.category}
                </span>
              )}
              {item.title && (
                <h3 className="text-white font-semibold text-sm line-clamp-1">
                  {item.title}
                </h3>
              )}
              {item.description && (
                <p className="text-white/80 text-xs line-clamp-2 mt-1">
                  {item.description}
                </p>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default GalleryGrid;
