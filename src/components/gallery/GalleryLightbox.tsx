import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Play, Pause, Download, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface GalleryLightboxProps {
  items: Array<{
    type: 'image' | 'video';
    src: string;
    title?: string;
    category?: string;
  }>;
  currentIndex: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const GalleryLightbox = ({ items, currentIndex, isOpen, onClose, onNavigate }: GalleryLightboxProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [zoom, setZoom] = useState(1);
  
  const currentItem = items[currentIndex];
  
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          if (currentIndex > 0) onNavigate(currentIndex - 1);
          break;
        case 'ArrowRight':
          if (currentIndex < items.length - 1) onNavigate(currentIndex + 1);
          break;
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);
  
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.5, 3));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.5, 1));
  
  if (!isOpen || !currentItem) return null;
  
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-lg"
        onClick={onClose}
      >
        {/* Close Button */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-4 right-4 z-50 text-white hover:bg-white/20 rounded-full"
          onClick={onClose}
        >
          <X className="w-6 h-6" />
        </Button>
        
        {/* Controls */}
        <div className="absolute top-4 left-4 z-50 flex items-center gap-2">
          {currentItem.type === 'image' && (
            <>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 rounded-full"
                onClick={(e) => { e.stopPropagation(); handleZoomIn(); }}
              >
                <ZoomIn className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/20 rounded-full"
                onClick={(e) => { e.stopPropagation(); handleZoomOut(); }}
              >
                <ZoomOut className="w-5 h-5" />
              </Button>
            </>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 rounded-full"
            onClick={(e) => { 
              e.stopPropagation(); 
              const link = document.createElement('a');
              link.href = currentItem.src;
              link.download = currentItem.title || 'download';
              link.click();
            }}
          >
            <Download className="w-5 h-5" />
          </Button>
        </div>
        
        {/* Navigation Arrows */}
        {currentIndex > 0 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 rounded-full w-12 h-12"
            onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex - 1); setZoom(1); }}
          >
            <ChevronLeft className="w-8 h-8" />
          </Button>
        )}
        
        {currentIndex < items.length - 1 && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 z-50 text-white hover:bg-white/20 rounded-full w-12 h-12"
            onClick={(e) => { e.stopPropagation(); onNavigate(currentIndex + 1); setZoom(1); }}
          >
            <ChevronRight className="w-8 h-8" />
          </Button>
        )}
        
        {/* Content */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="relative max-w-[90vw] max-h-[85vh] flex items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {currentItem.type === 'image' ? (
            <motion.img
              src={currentItem.src}
              alt={currentItem.title || ''}
              className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
              style={{ transform: `scale(${zoom})` }}
              transition={{ duration: 0.2 }}
              draggable={false}
            />
          ) : (
            <div className="relative">
              <video
                src={currentItem.src}
                controls
                autoPlay={isPlaying}
                className="max-w-full max-h-[85vh] rounded-lg shadow-2xl"
                onPlay={() => setIsPlaying(true)}
                onPause={() => setIsPlaying(false)}
              />
            </div>
          )}
        </motion.div>
        
        {/* Info Bar */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-4 bg-black/60 backdrop-blur-sm px-6 py-3 rounded-full">
          <span className="text-white/80 text-sm">
            {currentIndex + 1} / {items.length}
          </span>
          {currentItem.title && (
            <span className="text-white font-medium">{currentItem.title}</span>
          )}
          {currentItem.category && (
            <span className="text-secondary text-sm px-3 py-1 bg-secondary/20 rounded-full">
              {currentItem.category}
            </span>
          )}
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default GalleryLightbox;
