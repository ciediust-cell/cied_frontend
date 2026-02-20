import { Play } from "lucide-react";
import { motion } from "framer-motion";
import type { GalleryItem } from "./GalleryContent";
import {
  buildResponsiveCloudinarySrcSet,
  getOptimizedCloudinaryUrl,
} from "src/helper/imageOptimization";

interface GalleryGridProps {
  items: GalleryItem[];
  onImageClick: (item: GalleryItem) => void;
}

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" as const },
  },
};

export function GalleryGrid({ items, onImageClick }: GalleryGridProps) {
  if (items.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-xl text-muted-foreground">
          No items found in this category
        </p>
      </div>
    );
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 sm:gap-6"
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          variants={itemVariants}
          whileHover={{ y: -4 }}
          whileTap={{ scale: 0.98 }}
          className="group relative cursor-pointer overflow-hidden rounded-xl border-2 border-border hover:border-primary/30 transition-all hover:shadow-lg aspect-[4/3]"
          onClick={() => onImageClick(item)}
        >
          {/* Image */}
          <motion.img
            src={getOptimizedCloudinaryUrl(item.imageUrl, {
              width: 640,
              height: 480,
              crop: "fill",
              gravity: "auto",
              quality: "auto:eco",
            })}
            srcSet={buildResponsiveCloudinarySrcSet(
              item.imageUrl,
              [240, 320, 480, 640, 800],
              {
                crop: "fill",
                gravity: "auto",
                aspectRatio: 4 / 3,
                quality: "auto:eco",
              }
            )}
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            alt={item.title}
            loading={index < 4 ? "eager" : "lazy"}
            fetchPriority={index < 4 ? "high" : "auto"}
            decoding="async"
            className="w-full h-full object-cover"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.35 }}
          />

          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
          >
            <div className="absolute bottom-0 left-0 right-0 p-4">
              <h3 className="text-white mb-1 text-sm sm:text-base">
                {item.title}
              </h3>
              {item.description && (
                <p className="text-white/80 text-xs sm:text-sm">
                  {item.description}
                </p>
              )}
              <span className="inline-block mt-2 px-3 py-1 bg-primary/80 text-white text-xs rounded-full">
                {item.category}
              </span>
            </div>
          </motion.div>

          {/* Video Play Icon */}
          {item.type === "video" && (
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 260 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-white/90 rounded-full flex items-center justify-center">
                <Play className="h-7 w-7 sm:h-8 sm:w-8 text-primary ml-1" />
              </div>
            </motion.div>
          )}
        </motion.div>
      ))}
    </motion.div>
  );
}

