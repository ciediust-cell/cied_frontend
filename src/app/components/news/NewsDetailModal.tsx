import { useState } from "react";
import { X, Calendar, MapPin, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "../ui/button";
import type { NewsItem } from "../../../pages/NewsEventsPage";

interface NewsDetailModalProps {
  item: NewsItem;
  onClose: () => void;
}

const getCategoryColor = (category: string) => {
  switch (category) {
    case "Event":
      return "bg-secondary text-white";
    case "News":
      return "bg-accent text-white";
    case "Announcement":
      return "bg-primary text-white";
    default:
      return "bg-muted text-foreground";
  }
};

export function NewsDetailModal({ item, onClose }: NewsDetailModalProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? item.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === item.images.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <div className="sticky top-0 bg-white z-10 border-b border-border">
          <div className="flex items-center justify-between p-4">
            <span
              className={`px-3 py-1 rounded-lg text-sm ${getCategoryColor(item.category)}`}
            >
              {item.category}
            </span>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
            >
              <X className="h-6 w-6 text-foreground" />
            </button>
          </div>
        </div>

        {/* Image Gallery */}
        <div className="relative">
          <div className="relative h-96 bg-muted overflow-hidden">
            <img
              src={item.images[currentImageIndex]}
              alt={item.title}
              className="w-full h-full object-cover"
            />

            {item.images.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="h-6 w-6 text-foreground" />
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="h-6 w-6 text-foreground" />
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-4 right-4 px-3 py-1 bg-black/70 text-white rounded-full text-sm">
                  {currentImageIndex + 1} / {item.images.length}
                </div>
              </>
            )}
          </div>

          {/* Thumbnail Navigation */}
          {item.images.length > 1 && (
            <div className="flex gap-2 p-4 overflow-x-auto">
              {item.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImageIndex
                      ? "border-primary"
                      : "border-transparent hover:border-muted"
                  }`}
                >
                  <img
                    src={image}
                    alt={`${item.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-8">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              <span>{item.date}</span>
            </div>
            {item.location && (
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{item.location}</span>
              </div>
            )}
          </div>

          <h2 className="text-3xl sm:text-4xl mb-6 text-primary">
            {item.title}
          </h2>

          <div className="prose prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {item.description}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-border">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              Share
            </Button>
            <Button
              variant="outline"
              className="border-border text-foreground hover:bg-muted"
            >
              View All {item.category}s
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
