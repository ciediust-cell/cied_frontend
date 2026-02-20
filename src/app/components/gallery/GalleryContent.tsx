import { useEffect, useMemo, useState } from "react";
import { GalleryFilter } from "./GalleryFilter";
import { GalleryGrid } from "./GalleryGrid";
import { GalleryLightbox } from "./GalleryLightbox";
import { motion, AnimatePresence } from "framer-motion";
import {
  getPublicGalleries,
  type PublicGalleryCategory,
  type PublicGalleryImage,
  type PublicGalleryListItem,
} from "src/services/publicGallery.service";

type GalleryDisplayCategory =
  | "Events & Workshops"
  | "Startup Activities"
  | "Workspace"
  | "Facilities"
  | "Infrastructure";

export type GalleryCategory = "All" | GalleryDisplayCategory | "Other";

export interface GalleryItem {
  id: string;
  galleryId: string;
  imageUrl: string;
  title: string;
  category: GalleryCategory;
  description?: string;
  type: "image" | "video";
}

const INITIAL_ITEMS_TO_SHOW = 12;

const CATEGORY_LABELS: Record<PublicGalleryCategory, GalleryCategory> = {
  EVENTS: "Events & Workshops",
  ACTIVITIES: "Startup Activities",
  WORKSPACE: "Workspace",
  FACILITIES: "Facilities",
  INFRASTRUCTURE: "Infrastructure",
  OTHER: "Other",
};

const mapCategory = (category: PublicGalleryCategory): GalleryCategory =>
  CATEGORY_LABELS[category] ?? "Other";

const toGalleryItem = (
  gallery: PublicGalleryListItem,
  image: PublicGalleryImage
): GalleryItem => ({
  id: image.id,
  galleryId: gallery.id,
  imageUrl: image.imageUrl,
  title: image.caption?.trim() || gallery.title,
  category: mapCategory(gallery.category),
  description: gallery.subtitle?.trim() || undefined,
  type: "image",
});

export function GalleryContent() {
  const [selectedCategory, setSelectedCategory] =
    useState<GalleryCategory>("All");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [galleries, setGalleries] = useState<PublicGalleryListItem[]>([]);
  const [itemsToShow, setItemsToShow] = useState(INITIAL_ITEMS_TO_SHOW);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let isCancelled = false;

    const loadGallery = async () => {
      try {
        setLoading(true);
        setError("");

        const galleryList = await getPublicGalleries();

        if (!isCancelled) {
          setGalleries(galleryList);
          setLoading(false);
        }
      } catch {
        if (!isCancelled) {
          setError("Failed to load gallery. Please try again.");
          setGalleries([]);
          setLoading(false);
        }
      }
    };

    void loadGallery();

    return () => {
      isCancelled = true;
    };
  }, []);

  const galleryItems = useMemo<GalleryItem[]>(() => {
    return galleries.flatMap((gallery) => {
      const images =
        gallery.images.length > 0
          ? gallery.images
          : gallery.coverImage
            ? [gallery.coverImage]
            : [];

      return images.map((image) => toGalleryItem(gallery, image));
    });
  }, [galleries]);

  const categories = useMemo<GalleryCategory[]>(() => {
    const unique = Array.from(
      new Set(galleryItems.map((item) => item.category).filter(Boolean))
    ) as GalleryCategory[];

    return ["All", ...unique];
  }, [galleryItems]);

  useEffect(() => {
    if (selectedCategory !== "All" && !categories.includes(selectedCategory)) {
      setSelectedCategory("All");
    }
  }, [categories, selectedCategory]);

  // Filter images based on selected category
  const filteredItems = useMemo(() => {
    if (selectedCategory === "All") {
      return galleryItems;
    }
    return galleryItems.filter((item) => item.category === selectedCategory);
  }, [galleryItems, selectedCategory]);

  useEffect(() => {
    if (
      selectedImage &&
      !filteredItems.some((item) => item.id === selectedImage.id)
    ) {
      setSelectedImage(null);
    }
  }, [filteredItems, selectedImage]);

  // Slice items based on itemsToShow
  const displayedItems = filteredItems.slice(0, itemsToShow);

  const handleLoadMore = () => {
    setItemsToShow((prev) => prev + 6);
  };

  return (
    <>
      <section className="py-14 sm:py-18 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <p className="py-16 text-center text-muted-foreground">
              Loading gallery...
            </p>
          )}

          {!loading && error && (
            <p className="py-16 text-center text-destructive">{error}</p>
          )}

          {!loading && !error && (
            <>
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, ease: "easeOut" as const }}
              >
                <GalleryFilter
                  categories={categories}
                  selectedCategory={selectedCategory}
                  onCategoryChange={(category) => {
                    setSelectedCategory(category);
                    setItemsToShow(INITIAL_ITEMS_TO_SHOW);
                  }}
                />
              </motion.div>

              <motion.div
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="mt-10 sm:mt-12"
              >
                <GalleryGrid
                  items={displayedItems}
                  onImageClick={setSelectedImage}
                />
              </motion.div>

              <AnimatePresence>
                {displayedItems.length < filteredItems.length && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.35 }}
                    className="text-center mt-10 sm:mt-12"
                  >
                    <button
                      onClick={handleLoadMore}
                      className="px-7 sm:px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Load More
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <GalleryLightbox
            item={selectedImage}
            allItems={filteredItems}
            onClose={() => setSelectedImage(null)}
            onNavigate={setSelectedImage}
          />
        )}
      </AnimatePresence>
    </>
  );
}

