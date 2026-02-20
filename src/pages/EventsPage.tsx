import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { EventCalendar } from "src/app/components/news/EventCalender";
import { FeaturedCard } from "src/app/components/news/FeaturedCard";
import { FilterBar } from "src/app/components/news/FilterBar";
import { HostEvent } from "src/app/components/news/HostEvent";
import { NewsDetailModal } from "src/app/components/news/NewsDetailModal";
import { NewsGrid } from "src/app/components/news/NewsGrid";
import { Button } from "src/app/components/ui/button";
import { fadeUp, staggerContainer } from "src/helper/animations";
import {
  getPublicEventBySlug,
  getPublicEvents,
  type PublicEventItem,
} from "src/services/publicEvent.service";
import type { NewsItem } from "src/types/news";

const EVENT_CATEGORIES = ["All", "Event"];
const INITIAL_VISIBLE = 9;

const formatEventDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "Date TBA";
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const buildSummary = (description: string) => {
  const normalized = description.trim();
  if (normalized.length <= 160) return normalized;
  return `${normalized.slice(0, 157)}...`;
};

const toEventItem = (event: PublicEventItem): NewsItem => ({
  id: event.id,
  slug: event.slug,
  category: "Event",
  title: event.title,
  summary: buildSummary(event.description),
  description: event.description,
  date: formatEventDate(event.eventDate),
  eventDate: event.eventDate,
  location: event.location ?? undefined,
  registrationUrl: event.registrationUrl ?? undefined,
  images: [event.featuredImage || "/ciedLogo.jpeg"],
});

export function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedEvent, setSelectedEvent] = useState<NewsItem | null>(null);
  const [displayCount, setDisplayCount] = useState<number>(INITIAL_VISIBLE);
  const [eventItems, setEventItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getPublicEvents();
        setEventItems(response.map(toEventItem));
      } catch {
        setError("Failed to load events. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    void loadEvents();
  }, []);

  useEffect(() => {
    setDisplayCount(INITIAL_VISIBLE);
  }, [selectedCategory, searchQuery]);

  const filteredEvents = useMemo(() => {
    return eventItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [eventItems, searchQuery, selectedCategory]);

  const featuredItem =
    selectedCategory === "All" && !searchQuery ? filteredEvents[0] : undefined;
  const gridItems = featuredItem
    ? filteredEvents.filter((item) => item.id !== featuredItem.id)
    : filteredEvents;
  const displayedEvents = gridItems.slice(0, displayCount);

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 6);
  };

  const handleOpenEvent = async (item: NewsItem) => {
    setSelectedEvent(item);

    if (!item.slug) return;

    try {
      const details = await getPublicEventBySlug(item.slug);
      setSelectedEvent((current) => {
        if (!current || current.id !== item.id) return current;
        return {
          ...current,
          summary: buildSummary(details.description),
          description: details.description || current.description,
          date: formatEventDate(details.eventDate),
          eventDate: details.eventDate,
          location: details.location ?? current.location,
          registrationUrl: details.registrationUrl ?? current.registrationUrl,
          images: details.featuredImage
            ? [details.featuredImage]
            : ["/ciedLogo.jpeg"],
        };
      });
    } catch {
      // Keep current card data if detail fetch fails.
    }
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <main className="pt-16 sm:pt-20">
        <section className="bg-gradient-to-b from-primary/5 to-white py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
              className="max-w-3xl mx-auto text-center"
            >
              <motion.h1
                variants={fadeUp}
                className="text-3xl sm:text-5xl mb-3 sm:mb-4 text-primary"
              >
                Events
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-base sm:text-lg text-muted-foreground"
              >
                Workshops, bootcamps, and community activities at CIED IUST
              </motion.p>
            </motion.div>
          </div>
        </section>

        {!loading && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="px-4 sm:px-0 overflow-x-auto"
          >
            <EventCalendar events={eventItems} onEventClick={handleOpenEvent} />
          </motion.div>
        )}

        <div className="px-4 sm:px-0">
          <FilterBar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categories={EVENT_CATEGORIES}
            searchPlaceholder="Search events..."
          />
        </div>

        {loading && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <p className="text-center text-muted-foreground">
              Loading events...
            </p>
          </div>
        )}

        {!loading && error && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <p className="text-center text-destructive">{error}</p>
          </div>
        )}

        {!loading && featuredItem && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="px-4 sm:px-0"
          >
            <FeaturedCard
              item={featuredItem}
              onClick={() => void handleOpenEvent(featuredItem)}
            />
          </motion.div>
        )}

        {!loading && (
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="px-4 sm:px-0"
          >
            <NewsGrid items={displayedEvents} onItemClick={handleOpenEvent} />
          </motion.div>
        )}

        {!loading && displayedEvents.length < gridItems.length && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-12 sm:pb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  onClick={handleLoadMore}
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-white"
                >
                  Load More
                </Button>
              </motion.div>
            </motion.div>
          </div>
        )}

        <HostEvent />
      </main>

      {selectedEvent && (
        <NewsDetailModal
          item={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  );
}
