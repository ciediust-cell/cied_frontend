import { useEffect, useMemo, useRef, useState } from "react";
import {
  X,
  Calendar,
  MapPin,
  ChevronLeft,
  ChevronRight,
  Images,
  ExternalLink,
  Share2,
  Link2,
  Smartphone,
  MessageCircle,
  Linkedin,
  Twitter,
} from "lucide-react";
import { Button } from "../ui/button";
import type { NewsItem } from "src/types/news";
import { useLocation, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const location = useLocation();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [shareStatus, setShareStatus] = useState("");
  const sharePanelRef = useRef<HTMLDivElement | null>(null);
  const shareSubject = item.category === "Event" ? "event" : "news item";

  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") {
      return item.category === "Event"
        ? `/events${item.slug ? `?event=${encodeURIComponent(item.slug)}` : ""}`
        : `/news${item.slug ? `?news=${encodeURIComponent(item.slug)}` : ""}`;
    }

    const origin = window.location.origin;
    if (!item.slug) {
      return `${origin}${location.pathname}${location.search}`;
    }

    if (item.category === "Event") {
      return `${origin}/events?event=${encodeURIComponent(item.slug)}`;
    }

    return `${origin}/news?news=${encodeURIComponent(item.slug)}`;
  }, [item.category, item.slug, location.pathname, location.search]);

  const currentImage = item.images[currentImageIndex] ?? item.images[0] ?? "/ciedLogo.jpeg";
  const shareText = `${item.title}${item.summary ? ` - ${item.summary}` : ""}`;
  const shareTargets = [
    {
      label: "Share on WhatsApp",
      icon: MessageCircle,
      href: `https://wa.me/?text=${encodeURIComponent(`${item.title} ${shareUrl}`)}`,
    },
    {
      label: "Share on X",
      icon: Twitter,
      href: `https://twitter.com/intent/tweet?text=${encodeURIComponent(item.title)}&url=${encodeURIComponent(shareUrl)}`,
    },
    {
      label: "Share on LinkedIn",
      icon: Linkedin,
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    },
  ];

  useEffect(() => {
    setCurrentImageIndex(0);
    setIsShareMenuOpen(false);
    setShareStatus("");
  }, [item.id]);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  useEffect(() => {
    if (!shareStatus) return;
    const timeout = window.setTimeout(() => setShareStatus(""), 3000);
    return () => window.clearTimeout(timeout);
  }, [shareStatus]);

  useEffect(() => {
    if (!isShareMenuOpen) return;
    sharePanelRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
    });
  }, [isShareMenuOpen]);

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

  const copyShareLink = async () => {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
        setShareStatus("Link copied to clipboard.");
        return;
      }

      const textarea = document.createElement("textarea");
      textarea.value = shareUrl;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "absolute";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      const copied = document.execCommand("copy");
      document.body.removeChild(textarea);

      if (copied) {
        setShareStatus("Link copied to clipboard.");
        return;
      }

      setShareStatus("Copy this link manually from the address shown in the share menu.");
    } catch (error) {
      setShareStatus("Unable to copy the link right now.");
    }
  };

  const handleNativeShare = async () => {
    try {
      if (!("share" in navigator) || typeof navigator.share !== "function") {
        setShareStatus("Device sharing is not supported on this browser.");
        return;
      }

      await navigator.share({
        title: item.title,
        text: shareText,
        url: shareUrl,
      });
      setShareStatus("Link shared successfully.");
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        return;
      }
      setShareStatus("Unable to open device sharing right now.");
    }
  };

  const openShareTarget = (href: string) => {
    window.open(href, "_blank", "noopener,noreferrer");
    setIsShareMenuOpen(false);
    setShareStatus("Share window opened in a new tab.");
  };

  const handleShareButtonClick = () => {
    if ("share" in navigator && typeof navigator.share === "function") {
      void handleNativeShare();
      return;
    }

    setIsShareMenuOpen(true);
    setShareStatus(`Choose a share option for this ${shareSubject} below.`);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-start sm:items-center justify-center p-2 sm:p-4 overflow-y-auto"
      onClick={onClose}
      role="presentation"
    >
      <div
        className="bg-white rounded-xl sm:rounded-2xl max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto my-4 sm:my-8"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby={`news-detail-title-${item.id}`}
      >
        {/* HEADER */}
        <div className="sticky top-0 bg-white z-10 border-b border-border">
          <div className="flex items-center justify-between p-3 sm:p-4">
            <span
              className={`px-3 py-1 rounded-lg text-xs sm:text-sm ${getCategoryColor(
                item.category
              )}`}
            >
              {item.category}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full hover:bg-muted flex items-center justify-center transition-colors"
              aria-label="Close details"
            >
              <X className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
            </button>
          </div>
        </div>

        {/* IMAGE GALLERY */}
        <div className="relative">
          <div className="relative h-56 sm:h-80 lg:h-96 bg-muted overflow-hidden">
            <img
              src={currentImage}
              alt={item.title}
              className="w-full h-full object-cover"
            />

            {item.images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={handlePrevImage}
                  className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors"
                  aria-label="Show previous image"
                >
                  <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
                </button>
                <button
                  type="button"
                  onClick={handleNextImage}
                  className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 w-9 h-9 sm:w-10 sm:h-10 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-colors"
                  aria-label="Show next image"
                >
                  <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" />
                </button>

                <div className="absolute bottom-3 right-3 px-3 py-1 bg-black/70 text-white rounded-full text-xs sm:text-sm">
                  {currentImageIndex + 1} / {item.images.length}
                </div>
              </>
            )}
          </div>

          {/* THUMBNAILS */}
          {item.images.length > 1 && (
            <div className="flex gap-2 p-3 sm:p-4 overflow-x-auto">
              {item.images.map((image, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setCurrentImageIndex(index)}
                  className={`flex-shrink-0 w-16 h-16 sm:w-20 sm:h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImageIndex
                      ? "border-primary"
                      : "border-transparent hover:border-muted"
                  }`}
                  aria-label={`Show image ${index + 1}`}
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

        {/* CONTENT */}
        <div className="p-4 sm:p-6 lg:p-8">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
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

          <h2
            id={`news-detail-title-${item.id}`}
            className="text-2xl sm:text-3xl lg:text-4xl mb-4 sm:mb-6 text-primary"
          >
            {item.title}
          </h2>

          <div className="prose prose-sm sm:prose-lg max-w-none">
            <p className="text-muted-foreground leading-relaxed whitespace-pre-line">
              {item.description}
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 pt-6 border-t border-border">
            {item.category !== "Event" && item.slug && (
              <Button
                onClick={() => {
                  navigate(`/gallery?newsSlug=${encodeURIComponent(item.slug || "")}`);
                }}
                className="w-full sm:w-auto bg-primary hover:bg-primary/90"
              >
                <Images className="h-4 w-4 mr-2" />
                View Gallery
              </Button>
            )}
            {item.registrationUrl && (
              <Button asChild className="w-full sm:w-auto bg-secondary hover:bg-secondary/90">
                <a
                  href={item.registrationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Event Link
                </a>
              </Button>
            )}
            <Button
              variant="outline"
              onClick={handleShareButtonClick}
              className="w-full sm:w-auto border-primary text-primary hover:bg-primary hover:text-white"
            >
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          {isShareMenuOpen && (
            <div
              ref={sharePanelRef}
              className="mt-4 rounded-xl border border-border bg-muted/30 p-3 sm:p-4"
            >
              <p className="text-sm text-foreground mb-3">
                Share this {shareSubject}
              </p>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {"share" in navigator && typeof navigator.share === "function" && (
                  <Button
                    variant="outline"
                    onClick={() => void handleNativeShare()}
                    className="justify-start"
                  >
                    <Smartphone className="h-4 w-4 mr-2" />
                    Device Share
                  </Button>
                )}
                <Button
                  variant="outline"
                  onClick={() => void copyShareLink()}
                  className="justify-start"
                >
                  <Link2 className="h-4 w-4 mr-2" />
                  Copy Link
                </Button>
                {shareTargets.map((target) => {
                  const Icon = target.icon;
                  return (
                    <Button
                      key={target.label}
                      variant="outline"
                      onClick={() => openShareTarget(target.href)}
                      className="justify-start"
                    >
                      <Icon className="h-4 w-4 mr-2" />
                      {target.label.replace("Share on ", "")}
                    </Button>
                  );
                })}
              </div>
            </div>
          )}

          {shareStatus && (
            <p className="mt-3 text-sm text-muted-foreground">{shareStatus}</p>
          )}
        </div>
      </div>
    </div>
  );
}
