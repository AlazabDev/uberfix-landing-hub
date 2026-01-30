import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Image, Video, Grid3X3, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface GalleryFiltersProps {
  categories: string[];
  activeCategory: string;
  activeType: 'all' | 'image' | 'video';
  onCategoryChange: (category: string) => void;
  onTypeChange: (type: 'all' | 'image' | 'video') => void;
  counts: {
    all: number;
    images: number;
    videos: number;
  };
}

const GalleryFilters = ({
  categories,
  activeCategory,
  activeType,
  onCategoryChange,
  onTypeChange,
  counts
}: GalleryFiltersProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const typeFilters = [
    { id: 'all', icon: LayoutGrid, label: isRTL ? 'الكل' : 'All', count: counts.all },
    { id: 'image', icon: Image, label: isRTL ? 'صور' : 'Images', count: counts.images },
    { id: 'video', icon: Video, label: isRTL ? 'فيديو' : 'Videos', count: counts.videos },
  ] as const;
  
  return (
    <div className="space-y-6" dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Type Filters */}
      <div className="flex flex-wrap items-center justify-center gap-3">
        {typeFilters.map((filter) => (
          <motion.button
            key={filter.id}
            onClick={() => onTypeChange(filter.id)}
            className={cn(
              "flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all duration-300",
              activeType === filter.id
                ? "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/25"
                : "bg-muted/50 text-muted-foreground hover:bg-muted hover:text-foreground"
            )}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <filter.icon className="w-4 h-4" />
            <span>{filter.label}</span>
            <span className={cn(
              "text-xs px-2 py-0.5 rounded-full",
              activeType === filter.id
                ? "bg-secondary-foreground/20 text-secondary-foreground"
                : "bg-muted-foreground/20"
            )}>
              {filter.count}
            </span>
          </motion.button>
        ))}
      </div>
      
      {/* Category Filters */}
      <div className="flex flex-wrap items-center justify-center gap-2">
        <motion.button
          onClick={() => onCategoryChange('all')}
          className={cn(
            "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border",
            activeCategory === 'all'
              ? "bg-foreground text-background border-foreground"
              : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
          )}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {isRTL ? 'جميع الفئات' : 'All Categories'}
        </motion.button>
        
        {categories.map((category) => (
          <motion.button
            key={category}
            onClick={() => onCategoryChange(category)}
            className={cn(
              "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 border",
              activeCategory === category
                ? "bg-foreground text-background border-foreground"
                : "bg-transparent text-muted-foreground border-border hover:border-foreground hover:text-foreground"
            )}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default GalleryFilters;
