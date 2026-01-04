import { motion } from "framer-motion";
import type { GalleryCategory } from "./GalleryContent";

interface GalleryFilterProps {
  selectedCategory: GalleryCategory;
  onCategoryChange: (category: GalleryCategory) => void;
}

const categories: GalleryCategory[] = [
  "All",
  "Events & Workshops",
  "Startup Activities",
  "Programs",
  "Awards & Accolades",
  "Infrastructure",
];

export function GalleryFilter({
  selectedCategory,
  onCategoryChange,
}: GalleryFilterProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="mb-10 sm:mb-12"
    >
      {/* Filter Pills */}
      <div className="flex gap-3 overflow-x-auto pb-3 scrollbar-hide snap-x snap-mandatory">
        {categories.map((category) => {
          const isActive = selectedCategory === category;

          return (
            <motion.button
              key={category}
              onClick={() => onCategoryChange(category)}
              whileTap={{ scale: 0.96 }}
              whileHover={{ y: -1 }}
              transition={{ type: "spring", stiffness: 300 }}
              className={`
                relative px-4 sm:px-5 py-2.5 rounded-full text-sm whitespace-nowrap
                transition-colors snap-start
                ${
                  isActive
                    ? "bg-primary text-white shadow-md"
                    : "bg-white border-2 border-border text-muted-foreground hover:border-primary/30 hover:text-primary"
                }
              `}
            >
              {category}

              {/* Active indicator */}
              {isActive && (
                <motion.span
                  layoutId="activeFilter"
                  className="absolute inset-0 rounded-full"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </motion.div>
  );
}
