import { useState } from "react";
import { motion } from "framer-motion";
import { FilterBar } from "../app/components/news/FilterBar";
import { FeaturedCard } from "../app/components/news/FeaturedCard";
import { NewsGrid } from "../app/components/news/NewsGrid";
import { NewsDetailModal } from "../app/components/news/NewsDetailModal";
import { Button } from "../app/components/ui/button";
import { Mail } from "lucide-react";
import { EventCalendar } from "src/app/components/news/EventCalender";
import { fadeUp, staggerContainer } from "src/helper/animations";
import { HostEvent } from "src/app/components/news/HostEvent";

export interface NewsItem {
  id: string;
  category: "News" | "Event" | "Announcement";
  title: string;
  summary: string;
  description: string;
  date: string;
  location?: string;
  images: string[];
  featured?: boolean;
}

// Mock data - this would come from an admin panel/CMS in production
const newsData: NewsItem[] = [
  {
    id: "1",
    category: "Event",
    title: "Annual Startup Summit 2025",
    summary:
      "Join us for our flagship event bringing together entrepreneurs, investors, and industry leaders for a day of innovation and networking.",
    description:
      "The Annual Startup Summit 2025 is CIED IUST's premier event, designed to bring together the brightest minds in entrepreneurship, innovation, and technology. This year's summit will feature keynote speeches from industry leaders, panel discussions on emerging trends, startup pitch competitions, and extensive networking opportunities. Attendees will gain valuable insights into scaling startups, fundraising strategies, and navigating the competitive landscape of Kashmir's growing startup ecosystem.",
    date: "December 15, 2025",
    location: "IUST Main Auditorium, Awantipora",
    images: [
      "https://images.unsplash.com/photo-1514063364532-5abd25e38290?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbm5vdmF0aW9uJTIwdGVjaG5vbG9neSUyMHN0YXJ0dXB8ZW58MXx8fHwxNzY2MDQ0NzgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      "https://images.unsplash.com/photo-1599592187465-6dc742367282?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwcGl0Y2glMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzY2MDEzOTEyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
    featured: true,
  },
  {
    id: "2",
    category: "News",
    title: "CIED Startup Raises ₹5 Crore in Series A",
    summary:
      "One of our incubated startups successfully closes Series A funding round, marking a major milestone for Kashmir's startup ecosystem.",
    description:
      "We are thrilled to announce that TechVenture, one of our incubated startups, has successfully raised ₹5 Crore in Series A funding. This achievement marks a significant milestone not just for the company, but for the entire Kashmir startup ecosystem. The funding will be used to expand their operations, hire talented professionals, and scale their innovative technology solutions across India.",
    date: "December 10, 2025",
    images: [
      "https://images.unsplash.com/photo-1624555130858-7ea5b8192c49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwdGVhbSUyMHdvcmtpbmd8ZW58MXx8fHwxNzY1OTQ3NTI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "3",
    category: "Event",
    title: "Masterclass on Digital Marketing",
    summary:
      "Expert-led workshop on growth hacking and digital marketing strategies for early-stage startups. Limited seats available.",
    description:
      "Join our comprehensive masterclass on Digital Marketing and Growth Hacking, specifically designed for early-stage startup founders. This intensive workshop will cover SEO, social media marketing, content strategy, paid advertising, analytics, and conversion optimization. Led by industry experts with proven track records, participants will leave with actionable strategies to grow their startup's online presence.",
    date: "December 5, 2025",
    location: "CIED Innovation Lab",
    images: [
      "https://images.unsplash.com/photo-1590649681928-4b179f773bd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc2NTk1NTAyOHww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "4",
    category: "Announcement",
    title: "New Co-working Space Inaugurated",
    summary:
      "Expanded facilities now feature state-of-the-art co-working spaces with high-speed internet and modern amenities for our incubatees.",
    description:
      "CIED IUST is proud to announce the inauguration of our new state-of-the-art co-working space. This 5000 sq ft facility features ergonomic workstations, private meeting rooms, high-speed internet, printing facilities, and a relaxation zone. The space has been designed to foster collaboration and productivity, providing our incubatees with a professional environment to build their ventures.",
    date: "November 28, 2025",
    location: "CIED Building, IUST Campus",
    images: [
      "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzY1OTUzMjA4fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "5",
    category: "Event",
    title: "Investor Connect Session",
    summary:
      "Meet potential investors and learn about fundraising strategies in this exclusive session for CIED startups.",
    description:
      "An exclusive opportunity for CIED incubated startups to connect with angel investors and venture capitalists. This session will include presentations from startups, one-on-one meetings with investors, and panel discussions on fundraising best practices. Limited to 20 participating startups.",
    date: "November 20, 2025",
    location: "IUST Conference Hall",
    images: [
      "https://images.unsplash.com/photo-1745847768380-2caeadbb3b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZSUyMHBhcnRuZXJzaGlwfGVufDF8fHx8MTc2NTk5MzQ2Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "6",
    category: "News",
    title: "Partnership with IIT Delhi Announced",
    summary:
      "CIED IUST partners with IIT Delhi to provide mentorship and technical support to incubated startups.",
    description:
      "We are excited to announce our strategic partnership with IIT Delhi's Technology Business Incubator. This collaboration will provide our startups with access to world-class mentors, technical expertise, and research facilities. The partnership aims to strengthen the innovation ecosystem and create opportunities for knowledge exchange between institutions.",
    date: "November 15, 2025",
    images: [
      "https://images.unsplash.com/photo-1630487656049-6db93a53a7e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwYnJhaW5zdG9ybWluZyUyMHNlc3Npb258ZW58MXx8fHwxNzY2MDQ0OTA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "7",
    category: "Event",
    title: "Women Entrepreneurs Bootcamp",
    summary:
      "Three-day intensive bootcamp focused on empowering women entrepreneurs in Kashmir to build and scale their ventures.",
    description:
      "CIED IUST presents a special three-day bootcamp designed exclusively for women entrepreneurs. The program covers business model development, financial planning, marketing strategies, and leadership skills. Participants will receive mentorship from successful women business leaders and gain access to our incubation facilities.",
    date: "November 10, 2025",
    location: "CIED Training Center",
    images: [
      "https://images.unsplash.com/photo-1706759755789-66d39fd252b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwbmV0d29ya2luZyUyMGV2ZW50fGVufDF8fHx8MTc2NjA0NDc4M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "8",
    category: "Announcement",
    title: "Applications Open for Pre-Incubation Program",
    summary:
      "Now accepting applications for our 6-month pre-incubation program starting January 2025.",
    description:
      "CIED IUST is now accepting applications for the January 2025 cohort of our Pre-Incubation Program. This comprehensive 6-month program is designed for early-stage entrepreneurs with innovative ideas. Benefits include workspace, mentorship, legal support, and seed funding opportunities. Application deadline is December 31, 2025.",
    date: "November 5, 2025",
    images: [
      "https://images.unsplash.com/photo-1760493828288-d2dbb70d18c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbm5vdmF0aW9uJTIwbGFiJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjU5ODY1MjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "9",
    category: "News",
    title: "CIED Startups Showcase at National Event",
    summary:
      "Five CIED incubated startups selected to present at the National Startup Expo in Delhi.",
    description:
      "We are proud to announce that five of our incubated startups have been selected to showcase their innovations at the National Startup Expo in Delhi. This is a testament to the quality of startups being nurtured at CIED IUST and their potential to compete at a national level.",
    date: "October 30, 2025",
    images: [
      "https://images.unsplash.com/photo-1514063364532-5abd25e38290?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbm5vdmF0aW9uJTIwdGVjaG5vbG9neSUyMHN0YXJ0dXB8ZW58MXx8fHwxNzY2MDQ0NzgxfDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "10",
    category: "Event",
    title: "Legal & IP Workshop for Startups",
    summary:
      "Learn about intellectual property protection, company registration, and legal compliance for startups.",
    description:
      "This essential workshop covers all legal aspects that startups need to know - from company incorporation and founder agreements to intellectual property protection and regulatory compliance. Led by experienced legal professionals specializing in startup law.",
    date: "October 25, 2025",
    location: "CIED Seminar Room",
    images: [
      "https://images.unsplash.com/photo-1590649681928-4b179f773bd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc2NTk1NTAyOHww&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "11",
    category: "News",
    title: "CIED Wins Best Incubator Award",
    summary:
      "CIED IUST recognized as the Best Incubation Center in North India at the Innovation Awards 2025.",
    description:
      "We are honored to receive the Best Incubation Center award at the Innovation Awards 2025. This recognition is a result of our team's dedication and the success of our incubated startups. The award acknowledges our comprehensive support ecosystem, quality of mentorship, and impact on the regional startup landscape.",
    date: "October 20, 2025",
    images: [
      "https://images.unsplash.com/photo-1624555130858-7ea5b8192c49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwdGVhbSUyMHdvcmtpbmd8ZW58MXx8fHwxNzY1OTQ3NTI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
  {
    id: "12",
    category: "Event",
    title: "AI & Machine Learning Bootcamp",
    summary:
      "Intensive 5-day bootcamp on artificial intelligence and machine learning applications for startups.",
    description:
      "Dive deep into AI and machine learning with this hands-on bootcamp. Learn how to integrate AI into your startup's products, understand ML algorithms, and build intelligent applications. Suitable for technical founders and developers. Participants will work on real-world projects and receive certification upon completion.",
    date: "October 15, 2025",
    location: "IUST Computer Lab",
    images: [
      "https://images.unsplash.com/photo-1760493828288-d2dbb70d18c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbm5vdmF0aW9uJTIwbGFiJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjU5ODY1MjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    ],
  },
];

export function NewsEventsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);
  const [displayCount, setDisplayCount] = useState<number>(9);

  const calendarEvents = newsData.filter((item) => item.category === "Event");

  const filteredNews = newsData.filter((item) => {
    const matchesCategory =
      selectedCategory === "All" || item.category === selectedCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch && !item.featured;
  });

  const featuredItem = newsData.find((item) => item.featured);
  const displayedNews = filteredNews.slice(0, displayCount);

  const handleLoadMore = () => {
    setDisplayCount((prev) => prev + 6);
  };

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* added overflow-x-hidden for mobile */}
      <main className="pt-16 sm:pt-20">
        {/* reduced top padding on mobile */}

        {/* ---------------- PAGE TITLE ---------------- */}
        <section className="bg-gradient-to-b from-primary/5 to-white py-12 sm:py-16">
          {/* tighter vertical spacing on mobile */}
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
                News & Events
              </motion.h1>

              <motion.p
                variants={fadeUp}
                className="text-base sm:text-lg text-muted-foreground"
              >
                Latest updates, announcements, workshops, and activities from
                CIED IUST
              </motion.p>
            </motion.div>
          </div>
        </section>

        {/* ---------------- EVENT CALENDAR ---------------- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="px-4 sm:px-0 overflow-x-auto"
          // {/* horizontal scroll safety for mobile */}
        >
          <EventCalendar
            events={calendarEvents}
            onEventClick={(event) => setSelectedNews(event)}
          />
        </motion.div>

        {/* ---------------- FILTER BAR ---------------- */}
        <div className="px-4 sm:px-0">
          {/* ensures filter bar has side padding on mobile */}
          <FilterBar
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        </div>

        {/* ---------------- FEATURED CARD ---------------- */}
        {featuredItem && selectedCategory === "All" && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="px-4 sm:px-0"
            // {/* added padding so card doesn’t touch edges */}
          >
            <FeaturedCard
              item={featuredItem}
              onClick={() => setSelectedNews(featuredItem)}
            />
          </motion.div>
        )}

        {/* ---------------- NEWS GRID ---------------- */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="px-4 sm:px-0"
          // {/* padding for mobile grid */}
        >
          <NewsGrid items={displayedNews} onItemClick={setSelectedNews} />
        </motion.div>

        {/* ---------------- LOAD MORE ---------------- */}
        {displayedNews.length < filteredNews.length && (
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
                  // {/* full-width button on mobile */}
                >
                  Load More
                </Button>
              </motion.div>
            </motion.div>
          </div>
        )}

        <HostEvent />
        {/* ---------------- CTA SECTION ---------------- */}
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
                Stay Updated with the Latest from CIED
              </motion.h2>

              <motion.p
                variants={fadeUp}
                className="text-sm sm:text-base text-muted-foreground mb-6"
              >
                Subscribe to our newsletter to receive updates on events, news,
                and opportunities.
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
      {/* ---------------- DETAIL MODAL ---------------- */}
      {selectedNews && (
        <NewsDetailModal
          item={selectedNews}
          onClose={() => setSelectedNews(null)}
        />
      )}
    </div>
  );
}
