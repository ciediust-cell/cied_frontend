import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Mail } from "lucide-react";
import { FeaturedCard } from "src/app/components/news/FeaturedCard";
import { FilterBar } from "src/app/components/news/FilterBar";
import { NewsDetailModal } from "src/app/components/news/NewsDetailModal";
import { NewsGrid } from "src/app/components/news/NewsGrid";
import { Button } from "src/app/components/ui/button";
import { fadeUp, staggerContainer } from "src/helper/animations";
import {
  getPublicNews,
  getPublicNewsBySlug,
} from "src/services/publicNews.service";
import type { NewsItem } from "src/types/news";

const NEWS_CATEGORIES = ["All", "News"];
const PAGE_SIZE = 6;

const formatNewsDate = (newsDate: string | null, publishedAt?: string | null) => {
  const source = newsDate || publishedAt;
  if (!source) return "Date TBA";
  const date = new Date(source);
  if (Number.isNaN(date.getTime())) return "Date TBA";
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const toNewsItem = (item: {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  featuredImage: string;
  newsDate: string;
  publishedAt: string | null;
}): NewsItem => ({
  id: item.id,
  slug: item.slug,
  category: "News",
  title: item.title,
  summary: item.excerpt,
  description: item.excerpt,
  date: formatNewsDate(item.newsDate, item.publishedAt),
  images: [item.featuredImage],
});

export function NewsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [newsItems, setNewsItems] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(false);

  const loadPage = async (targetPage: number) => {
    const response = await getPublicNews(targetPage, PAGE_SIZE);
    const mapped = response.data.map(toNewsItem);

    setNewsItems((prev) =>
      targetPage === 1 ? mapped : [...prev, ...mapped.filter((n) => !prev.some((p) => p.id === n.id))]
    );
    setPage(response.pagination.page);
    setHasMore(response.pagination.page < response.pagination.totalPages);
  };

  useEffect(() => {
    const initializeNews = async () => {
      try {
        setLoading(true);
        setError("");
        await loadPage(1);
      } catch {
        setError("Failed to load news. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    void initializeNews();
  }, []);

  const filteredNews = useMemo(() => {
    return newsItems.filter((item) => {
      const matchesCategory =
        selectedCategory === "All" || item.category === selectedCategory;
      const matchesSearch =
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.summary.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [newsItems, searchQuery, selectedCategory]);

  const featuredItem =
    selectedCategory === "All" && !searchQuery ? filteredNews[0] : undefined;
  const gridItems = featuredItem
    ? filteredNews.filter((item) => item.id !== featuredItem.id)
    : filteredNews;

  const handleLoadMore = async () => {
    if (!hasMore || loadingMore) return;
    try {
      setLoadingMore(true);
      await loadPage(page + 1);
    } catch {
      setError("Failed to load more news.");
    } finally {
      setLoadingMore(false);
    }
  };

  const handleOpenNews = async (item: NewsItem) => {
    setSelectedNews(item);

    if (!item.slug) return;

    try {
      const details = await getPublicNewsBySlug(item.slug);
      setSelectedNews((current) => {
        if (!current || current.id !== item.id) return current;
        return {
          ...current,
          summary: details.excerpt || current.summary,
          description: details.content || details.excerpt || current.description,
          date: formatNewsDate(details.newsDate, details.publishedAt),
          images: details.featuredImage ? [details.featuredImage] : current.images,
        };
      });
    } catch {
      // Keep card data in modal when detail fetch fails.
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
                News
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-base sm:text-lg text-muted-foreground"
              >
                Latest updates, announcements, and stories from CIED IUST
              </motion.p>
            </motion.div>
          </div>
        </section>

        <div className="px-4 sm:px-0">
          <FilterBar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            categories={NEWS_CATEGORIES}
            searchPlaceholder="Search news..."
          />
        </div>

        {loading && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <p className="text-center text-muted-foreground">Loading news...</p>
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
              onClick={() => void handleOpenNews(featuredItem)}
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
            <NewsGrid items={gridItems} onItemClick={handleOpenNews} />
          </motion.div>
        )}

        {!loading && hasMore && (
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
                  onClick={() => void handleLoadMore()}
                  size="lg"
                  variant="outline"
                  disabled={loadingMore}
                  className="w-full sm:w-auto border-2 border-primary text-primary hover:bg-primary hover:text-white"
                >
                  {loadingMore ? "Loading..." : "Load More"}
                </Button>
              </motion.div>
            </motion.div>
          </div>
        )}

        <section className="py-12 sm:py-16 bg-gradient-to-br from-primary/5 to-accent/5">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-2xl mx-auto text-center"
            >
              <motion.h2
                variants={fadeUp}
                className="text-2xl sm:text-3xl mb-3 sm:mb-4 text-primary"
              >
                Stay Updated with CIED News
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-sm sm:text-base text-muted-foreground mb-6"
              >
                Subscribe to receive the latest announcements and milestones
                from our startup ecosystem.
              </motion.p>

              <motion.div
                variants={fadeUp}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
              >
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-primary hover:bg-primary/90"
                >
                  <Mail className="mr-2 h-5 w-5" />
                  Subscribe
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      {selectedNews && (
        <NewsDetailModal
          item={selectedNews}
          onClose={() => setSelectedNews(null)}
        />
      )}
    </div>
  );
}
