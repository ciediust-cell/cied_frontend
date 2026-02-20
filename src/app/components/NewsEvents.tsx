import { useEffect, useMemo, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { getPublicNews } from "src/services/publicNews.service";
import { getPublicEvents } from "src/services/publicEvent.service";

interface HomeUpdateItem {
  id: string;
  category: "News" | "Event";
  title: string;
  summary: string;
  date: string;
  timestamp: number;
  image: string;
}

const ITEMS_PER_PAGE = 4;
const NEWS_FETCH_LIMIT = 8;

const formatDate = (value: string | null) => {
  if (!value) return "Date TBA";
  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "Date TBA";
  return parsed.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const summarize = (text: string, maxLength = 140) => {
  const normalized = text.trim();
  if (normalized.length <= maxLength) return normalized;
  return `${normalized.slice(0, maxLength - 3)}...`;
};

export function NewsEvents() {
  const [page, setPage] = useState(0);
  const [items, setItems] = useState<HomeUpdateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadUpdates = async () => {
      try {
        setLoading(true);
        setError("");

        const [newsResponse, eventsResponse] = await Promise.all([
          getPublicNews(1, NEWS_FETCH_LIMIT),
          getPublicEvents(),
        ]);

        const newsItems: HomeUpdateItem[] = newsResponse.data.map((item) => {
          const date = formatDate(item.publishedAt);
          const timestamp = item.publishedAt
            ? new Date(item.publishedAt).getTime()
            : 0;
          return {
            id: `news-${item.id}`,
            category: "News",
            title: item.title,
            summary: summarize(item.excerpt),
            date,
            timestamp,
            image: item.featuredImage || "/ciedLogo.jpeg",
          };
        });

        const eventItems: HomeUpdateItem[] = eventsResponse.map((event) => {
          const date = formatDate(event.eventDate);
          const timestamp = event.eventDate
            ? new Date(event.eventDate).getTime()
            : 0;
          return {
            id: `event-${event.id}`,
            category: "Event",
            title: event.title,
            summary: summarize(event.description),
            date,
            timestamp,
            image: event.featuredImage || "/ciedLogo.jpeg",
          };
        });

        const combined = [...newsItems, ...eventItems].sort(
          (a, b) => b.timestamp - a.timestamp
        );

        setItems(combined);
        setPage(0);
      } catch {
        setError("Failed to load updates.");
      } finally {
        setLoading(false);
      }
    };

    void loadUpdates();
  }, []);

  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(items.length / ITEMS_PER_PAGE)),
    [items.length]
  );

  const visibleItems = items.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  const nextPage = () => setPage((p) => (p === totalPages - 1 ? 0 : p + 1));
  const prevPage = () => setPage((p) => (p === 0 ? totalPages - 1 : p - 1));

  return (
    <section id="news" className="py-24 bg-gradient-to-b from-white to-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" as const }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-sm text-primary">What's Happening</span>
          </div>

          <h2 className="text-4xl sm:text-5xl mb-6 text-primary">News & Events</h2>

          <p className="text-lg text-muted-foreground">
            Stay updated with the latest happenings and success stories from
            CIED IUST.
          </p>
        </motion.div>

        {loading && (
          <div className="text-center mb-12 text-muted-foreground">
            Loading updates...
          </div>
        )}

        {!loading && error && (
          <div className="text-center mb-12 text-destructive">{error}</div>
        )}

        {!loading && !error && visibleItems.length > 0 && (
          <div className="relative mb-12">
            {items.length > ITEMS_PER_PAGE && (
              <>
                <button
                  onClick={prevPage}
                  className="hidden md:block absolute -left-4 lg:-left-6 top-1/2 -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 z-10"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <button
                  onClick={nextPage}
                  className="hidden md:block absolute -right-4 lg:-right-6 top-1/2 -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 z-10"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </>
            )}

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {visibleItems.map((item) => (
                <Card
                  key={item.id}
                  className="group border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 bg-secondary text-white rounded-full text-xs">
                        {item.category}
                      </span>
                    </div>
                  </div>

                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                      <Calendar className="h-4 w-4" />
                      <span>{item.date}</span>
                    </div>

                    <h3 className="text-lg mb-2 text-primary line-clamp-2">
                      {item.title}
                    </h3>

                    <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                      {item.summary}
                    </p>

                    <Link to={item.category === "News" ? "/news" : "/events"}>
                      <Button
                        variant="ghost"
                        className="text-primary hover:text-primary p-0"
                      >
                        Read More
                        <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>

            {items.length > ITEMS_PER_PAGE && (
              <div className="mt-5 flex items-center justify-center gap-3 md:hidden">
                <button
                  onClick={prevPage}
                  className="bg-primary text-white p-2 rounded-full shadow hover:bg-primary/90"
                  aria-label="Previous updates"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button
                  onClick={nextPage}
                  className="bg-primary text-white p-2 rounded-full shadow hover:bg-primary/90"
                  aria-label="Next updates"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        )}

        {!loading && !error && visibleItems.length === 0 && (
          <div className="text-center mb-12 text-muted-foreground">
            No news or events published yet.
          </div>
        )}

        <div className="text-center flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/news">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white"
            >
              View All News
            </Button>
          </Link>
          <Link to="/events">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-secondary text-secondary hover:bg-secondary hover:text-white"
            >
              View All Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

