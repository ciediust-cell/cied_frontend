import { useEffect, useMemo, useState } from "react";
import { GalleryFilter } from "./GalleryFilter";
import { GalleryGrid } from "./GalleryGrid";
import { GalleryLightbox } from "./GalleryLightbox";
import { motion, AnimatePresence } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import {
  getPublicGalleries,
  getPublicGalleryPhotos,
  type PublicGalleryCategory,
  type PublicGalleryImage,
  type PublicGalleryListItem,
  type PublicGalleryPhoto,
} from "src/services/publicGallery.service";

type GalleryDisplayCategory =
  | "Events & Workshops"
  | "News Highlights"
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
const PHOTOS_PAGE_SIZE = 12;

const CATEGORY_LABELS: Record<PublicGalleryCategory, GalleryCategory> = {
  EVENTS: "Events & Workshops",
  NEWS: "News Highlights",
  ACTIVITIES: "Startup Activities",
  WORKSPACE: "Workspace",
  FACILITIES: "Facilities",
  INFRASTRUCTURE: "Infrastructure",
  OTHER: "Other",
};

// Fixed chip list (not derived from loaded data): the full gallery page now
// loads photos one page at a time, so a category that only appears on a
// later page must still show up as a filterable chip immediately.
const CATEGORY_CHIPS: GalleryCategory[] = [
  "All",
  ...Object.values(CATEGORY_LABELS),
];

const LABEL_TO_API_CATEGORY = Object.fromEntries(
  Object.entries(CATEGORY_LABELS).map(([apiValue, label]) => [label, apiValue])
) as Record<GalleryDisplayCategory | "Other", PublicGalleryCategory>;

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

const toPhotoItem = (photo: PublicGalleryPhoto): GalleryItem => ({
  id: photo.id,
  galleryId: photo.galleryId,
  imageUrl: photo.imageUrl,
  title: photo.caption?.trim() || photo.galleryTitle,
  category: mapCategory(photo.category),
  description: photo.gallerySubtitle?.trim() || undefined,
  type: "image",
});

export function GalleryContent() {
  const [searchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] =
    useState<GalleryCategory>("All");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const newsSlugFilter = searchParams.get("newsSlug")?.trim() || "";

  // Single-gallery view (linked from a news article): small, unpaginated,
  // unchanged from the original implementation.
  const [legacyGalleries, setLegacyGalleries] = useState<
    PublicGalleryListItem[]
  >([]);
  const [itemsToShow, setItemsToShow] = useState(INITIAL_ITEMS_TO_SHOW);

  // Full gallery browse view: server-paginated, server-filtered.
  const [photos, setPhotos] = useState<GalleryItem[]>([]);
  const [cursor, setCursor] = useState<string | null>(null);
  const [hasNextPage, setHasNextPage] = useState<boolean>(false);

  useEffect(() => {
    if (!newsSlugFilter) return;
    let isCancelled = false;

    const loadGallery = async () => {
      try {
        setLoading(true);
        setError("");

        const galleryList = await getPublicGalleries(newsSlugFilter);

        if (!isCancelled) {
          setLegacyGalleries(galleryList);
          setLoading(false);
        }
      } catch {
        if (!isCancelled) {
          setError("Failed to load gallery. Please try again.");
          setLegacyGalleries([]);
          setLoading(false);
        }
      }
    };

    void loadGallery();

    return () => {
      isCancelled = true;
    };
  }, [newsSlugFilter]);

  useEffect(() => {
    if (newsSlugFilter) return;
    let isCancelled = false;

    const loadFirstPage = async () => {
      try {
        setLoading(true);
        setError("");

        const category =
          selectedCategory === "All"
            ? undefined
            : LABEL_TO_API_CATEGORY[selectedCategory];
        const page = await getPublicGalleryPhotos({
          category,
          limit: PHOTOS_PAGE_SIZE,
        });

        if (!isCancelled) {
          setPhotos(page.items.map(toPhotoItem));
          setCursor(page.nextCursor);
          setHasNextPage(page.hasNextPage);
        }
      } catch {
        if (!isCancelled) {
          setError("Failed to load gallery. Please try again.");
          setPhotos([]);
          setCursor(null);
          setHasNextPage(false);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    void loadFirstPage();

    return () => {
      isCancelled = true;
    };
  }, [selectedCategory, newsSlugFilter]);

  const legacyGalleryItems = useMemo<GalleryItem[]>(() => {
    return legacyGalleries.flatMap((gallery) => {
      const images =
        gallery.images.length > 0
          ? gallery.images
          : gallery.coverImage
            ? [gallery.coverImage]
            : [];

      return images.map((image) => toGalleryItem(gallery, image));
    });
  }, [legacyGalleries]);

  const legacyFilteredItems = useMemo(() => {
    if (selectedCategory === "All") {
      return legacyGalleryItems;
    }
    return legacyGalleryItems.filter(
      (item) => item.category === selectedCategory
    );
  }, [legacyGalleryItems, selectedCategory]);

  const isNewsSlugMode = Boolean(newsSlugFilter);

  const displayedItems = isNewsSlugMode
    ? legacyFilteredItems.slice(0, itemsToShow)
    : photos;

  const filteredItemsForLightbox = isNewsSlugMode
    ? legacyFilteredItems
    : photos;

  const canLoadMore = isNewsSlugMode
    ? displayedItems.length < legacyFilteredItems.length
    : hasNextPage;

  useEffect(() => {
    if (
      selectedImage &&
      !filteredItemsForLightbox.some((item) => item.id === selectedImage.id)
    ) {
      setSelectedImage(null);
    }
  }, [filteredItemsForLightbox, selectedImage]);

  const handleLoadMore = async () => {
    if (isNewsSlugMode) {
      setItemsToShow((prev) => prev + 6);
      return;
    }

    if (!cursor || loadingMore) return;

    setLoadingMore(true);
    try {
      const category =
        selectedCategory === "All"
          ? undefined
          : LABEL_TO_API_CATEGORY[selectedCategory];
      const page = await getPublicGalleryPhotos({
        category,
        cursor,
        limit: PHOTOS_PAGE_SIZE,
      });

      setPhotos((prev) => [...prev, ...page.items.map(toPhotoItem)]);
      setCursor(page.nextCursor);
      setHasNextPage(page.hasNextPage);
    } catch {
      // Keep whatever is already loaded; the Load More button simply
      // stays available so the user can retry.
    } finally {
      setLoadingMore(false);
    }
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
                  categories={CATEGORY_CHIPS}
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
                {canLoadMore && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.35 }}
                    className="text-center mt-10 sm:mt-12"
                  >
                    <button
                      onClick={handleLoadMore}
                      disabled={loadingMore}
                      className="px-7 sm:px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-60"
                    >
                      {loadingMore ? "Loading..." : "Load More"}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </>
          )}
        </div>
      </section>

      {/* Lightbox — navigation is limited to currently loaded items; it does
          not trigger a background fetch of the next page. */}
      <AnimatePresence>
        {selectedImage && (
          <GalleryLightbox
            item={selectedImage}
            allItems={filteredItemsForLightbox}
            onClose={() => setSelectedImage(null)}
            onNavigate={setSelectedImage}
          />
        )}
      </AnimatePresence>
    </>
  );
}
