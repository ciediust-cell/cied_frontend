import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Play } from "lucide-react";
import type { GalleryItem } from "./GalleryContent";

interface GalleryLightboxProps {
  item: GalleryItem;
  allItems: GalleryItem[];
  onClose: () => void;
  onNavigate: (item: GalleryItem) => void;
}

export function GalleryLightbox({
  item,
  allItems,
  onClose,
  onNavigate,
}: GalleryLightboxProps) {
  const currentIndex = allItems.findIndex((i) => i.id === item.id);
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < allItems.length - 1;

  const handlePrevious = () => {
    if (hasPrevious) onNavigate(allItems[currentIndex - 1]);
  };

  const handleNext = () => {
    if (hasNext) onNavigate(allItems[currentIndex + 1]);
  };

  /* Keyboard navigation */
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrevious) handlePrevious();
      if (e.key === "ArrowRight" && hasNext) handleNext();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentIndex, hasPrevious, hasNext]);

  /* Prevent body scroll */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25 }}
        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center px-3 sm:px-4"
      >
        {/* Backdrop */}
        <div className="absolute inset-0" onClick={onClose} />

        {/* Close */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onClose}
          className="absolute top-4 right-4 w-11 h-11 sm:w-12 sm:h-12 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center z-10"
          aria-label="Close lightbox"
        >
          <X className="h-6 w-6 text-white" />
        </motion.button>

        {/* Previous */}
        {hasPrevious && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handlePrevious}
            className="hidden sm:flex absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full items-center justify-center z-10"
            aria-label="Previous image"
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </motion.button>
        )}

        {/* Next */}
        {hasNext && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleNext}
            className="hidden sm:flex absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 hover:bg-white/20 rounded-full items-center justify-center z-10"
            aria-label="Next image"
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </motion.button>
        )}

        {/* Content */}
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          className="relative max-w-7xl w-full flex flex-col items-center z-10"
        >
          {/* Media */}
          <div className="relative w-full flex items-center justify-center mb-4 sm:mb-6">
            {item.type === "video" ? (
              <div className="relative">
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="max-h-[65vh] sm:max-h-[70vh] max-w-full object-contain rounded-lg"
                />
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  className="absolute inset-0 flex items-center justify-center"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="h-8 w-8 sm:h-10 sm:w-10 text-primary ml-1" />
                  </div>
                </motion.div>
              </div>
            ) : (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="max-h-[65vh] sm:max-h-[70vh] max-w-full object-contain rounded-lg"
              />
            )}
          </div>

          {/* Caption */}
          <div className="text-center max-w-2xl px-2">
            <span className="inline-block px-4 py-1.5 bg-primary/80 text-white text-xs sm:text-sm rounded-full mb-3">
              {item.category}
            </span>
            <h2 className="text-xl sm:text-2xl lg:text-3xl text-white mb-2">
              {item.title}
            </h2>
            {item.description && (
              <p className="text-sm sm:text-lg text-white/80">
                {item.description}
              </p>
            )}
            <p className="text-xs sm:text-sm text-white/60 mt-4">
              {currentIndex + 1} / {allItems.length}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
