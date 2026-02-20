import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getPublicGalleries } from "src/services/publicGallery.service";
import {
  buildResponsiveCloudinarySrcSet,
  getOptimizedCloudinaryUrl,
} from "src/helper/imageOptimization";

interface GalleryPreviewItem {
  id: string;
  src: string;
  title: string;
}

const slideInFromLeft = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut" as const,
    },
  },
};

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<GalleryPreviewItem | null>(
    null
  );
  const [galleryImages, setGalleryImages] = useState<GalleryPreviewItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    let isCancelled = false;

    const loadGalleryPreview = async () => {
      try {
        setLoading(true);
        setError("");

        const galleries = await getPublicGalleries();
        const mapped = galleries
          .filter((gallery) => Boolean(gallery.coverImage?.imageUrl))
          .map((gallery) => ({
            id: gallery.id,
            src: gallery.coverImage?.imageUrl || "",
            title: gallery.title,
          }))
          .slice(0, 6);

        if (!isCancelled) {
          setGalleryImages(mapped);
        }
      } catch {
        if (!isCancelled) {
          setError("Failed to load gallery preview.");
          setGalleryImages([]);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    void loadGalleryPreview();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-6">
            <span className="text-sm text-secondary">Gallery</span>
          </div>
          <motion.h2
            className="text-4xl sm:text-5xl mb-6 text-primary"
            variants={slideInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Moments of Innovation
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground"
            variants={slideInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            A glimpse into the vibrant ecosystem of CIED IUST
          </motion.p>
        </div>

        {loading && (
          <div className="py-12">
            <p className="text-center text-muted-foreground">
              Loading gallery...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="py-12">
            <p className="text-center text-destructive">{error}</p>
          </div>
        )}

        {!loading && !error && galleryImages.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {galleryImages.map((image, index) => (
              <div
                key={image.id}
                className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
                onClick={() => setSelectedImage(image)}
              >
                <img
                  src={getOptimizedCloudinaryUrl(image.src, {
                    width: 480,
                    height: 480,
                    crop: "fill",
                    gravity: "auto",
                    quality: "auto:eco",
                  })}
                  srcSet={buildResponsiveCloudinarySrcSet(
                    image.src,
                    [180, 240, 360, 480],
                    {
                      crop: "fill",
                      gravity: "auto",
                      aspectRatio: 1,
                      quality: "auto:eco",
                    }
                  )}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  alt={image.title}
                  loading={index < 2 ? "eager" : "lazy"}
                  fetchPriority={index < 2 ? "high" : "auto"}
                  decoding="async"
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <p className="text-white p-4">{image.title}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && !error && galleryImages.length === 0 && (
          <div className="py-12">
            <p className="text-center text-muted-foreground">
              No gallery images available.
            </p>
          </div>
        )}

        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-white"
          >
            <Link to="/gallery">View Full Gallery</Link>
          </Button>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-secondary transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={getOptimizedCloudinaryUrl(selectedImage.src, {
              width: 1600,
              crop: "limit",
            })}
            alt={selectedImage.title}
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}

