import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, Link as LinkIcon, MapPin, Mic2, Image as ImageIcon } from "lucide-react";
import { getOptimizedCloudinaryUrl } from "src/helper/imageOptimization";
import type { PublicWorkshopItem } from "src/services/publicWorkshop.service";

interface WorkshopCardProps {
  workshop: PublicWorkshopItem;
  compact?: boolean;
}

const formatWorkshopDate = (value: string) =>
  new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

export function WorkshopCard({ workshop, compact = false }: WorkshopCardProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const images = useMemo(() => workshop.images || [], [workshop.images]);
  const currentImage = images[activeIndex] || images[0] || null;

  useEffect(() => {
    if (images.length === 0) {
      setActiveIndex(0);
      return;
    }

    if (activeIndex >= images.length) {
      setActiveIndex(0);
    }
  }, [activeIndex, images.length]);

  return (
    <article className="border border-border rounded-2xl bg-white overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      <div className="relative bg-muted">
        {currentImage ? (
          <img
            src={getOptimizedCloudinaryUrl(currentImage.imageUrl, {
              width: 1100,
              height: 700,
              crop: "fill",
              gravity: "auto",
            })}
            alt={workshop.title}
            className="w-full aspect-[16/9] object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full aspect-[16/9] flex items-center justify-center bg-primary/8 text-primary">
            <ImageIcon className="h-10 w-10" />
          </div>
        )}

        <div className="absolute left-4 top-4">
          <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 text-primary text-xs font-medium shadow-sm">
            <CalendarDays className="h-3.5 w-3.5" />
            {formatWorkshopDate(workshop.workshopDate)}
          </span>
        </div>

        {images.length > 1 && (
          <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-3 py-3 bg-gradient-to-t from-black/55 to-transparent">
            <button
              type="button"
              onClick={() =>
                setActiveIndex((current) => (current - 1 + images.length) % images.length)
              }
              className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/95 text-foreground hover:bg-white transition-colors"
              aria-label="Previous workshop image"
            >
              <ArrowLeft className="h-4 w-4" />
            </button>
            <div className="flex items-center gap-1.5">
              {images.map((image, index) => (
                <button
                  key={image.id}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  className={`h-2.5 rounded-full transition-all ${
                    index === activeIndex ? "w-6 bg-white" : "w-2.5 bg-white/60"
                  }`}
                  aria-label={`Show image ${index + 1}`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setActiveIndex((current) => (current + 1) % images.length)}
              className="inline-flex items-center justify-center h-9 w-9 rounded-full bg-white/95 text-foreground hover:bg-white transition-colors"
              aria-label="Next workshop image"
            >
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        )}
      </div>

      <div className={`p-5 sm:p-6 ${compact ? "space-y-4" : "space-y-5"}`}>
        <div className="space-y-2">
          <h3 className={`${compact ? "text-lg" : "text-xl"} text-primary`}>
            {workshop.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-4 w-4" />
              {workshop.venue}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Mic2 className="h-4 w-4" />
              {workshop.speakerName}
            </span>
          </div>
          {workshop.speakerDesignation && (
            <p className="text-sm text-muted-foreground">{workshop.speakerDesignation}</p>
          )}
        </div>

        <p className={`text-sm text-muted-foreground ${compact ? "line-clamp-3" : ""}`}>
          {workshop.description}
        </p>

        {images.length > 1 && (
          <div className="flex gap-2 overflow-x-auto pb-1">
            {images.map((image, index) => (
              <button
                key={image.id}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg border transition-all ${
                  index === activeIndex ? "border-primary ring-1 ring-primary/20" : "border-border"
                }`}
                title={image.caption || `Image ${index + 1}`}
              >
                <img
                  src={getOptimizedCloudinaryUrl(image.imageUrl, {
                    width: 220,
                    height: 160,
                    crop: "fill",
                    gravity: "auto",
                  })}
                  alt={image.caption || `${workshop.title} image ${index + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </button>
            ))}
          </div>
        )}

        <div className="flex flex-wrap gap-3 pt-1">
          {workshop.registrationUrl && (
            <a
              href={workshop.registrationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors text-sm"
            >
              <LinkIcon className="h-4 w-4" />
              Register
            </a>
          )}
          {workshop.referenceUrl && (
            <a
              href={workshop.referenceUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-foreground hover:bg-muted transition-colors text-sm"
            >
              <LinkIcon className="h-4 w-4" />
              Reference
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
