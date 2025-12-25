import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Calendar, ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const newsItems = [
  {
    date: "Dec 15, 2025",
    images: [
      "https://images.unsplash.com/photo-1514063364532-5abd25e38290?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1556761175-4b46a572b786?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    category: "Event",
    title: "Annual Startup Summit 2025",
    summary:
      "Join us for our flagship event bringing together entrepreneurs, investors, and industry leaders for a day of innovation and networking.",
  },
  {
    date: "Dec 10, 2025",
    images: [
      "https://images.unsplash.com/photo-1624555130858-7ea5b8192c49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1590650213165-c1a8f43cbbab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    category: "News",
    title: "CIED Startup Raises ₹5 Crore in Series A",
    summary:
      "One of our incubated startups successfully closes Series A funding round, marking a major milestone for Kashmir's startup ecosystem.",
  },
  {
    date: "Dec 5, 2025",
    images: [
      "https://images.unsplash.com/photo-1590649681928-4b179f773bd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1519389950473-47ba0277781c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    category: "Workshop",
    title: "Masterclass on Digital Marketing",
    summary:
      "Expert-led workshop on growth hacking and digital marketing strategies for early-stage startups. Limited seats available.",
  },
  {
    date: "Nov 28, 2025",
    images: [
      "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    category: "News",
    title: "New Co-working Space Inaugurated",
    summary:
      "Expanded facilities now feature state-of-the-art co-working spaces with high-speed internet and modern amenities for our incubatees.",
  },
  {
    date: "Nov 15, 2025",
    images: [
      "https://images.unsplash.com/photo-1551836022-d5d88e9218df?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    category: "Event",
    title: "Investor Pitch Day",
    summary: "Startups pitched innovative ideas to investors and mentors.",
  },
  {
    date: "Nov 5, 2025",
    images: [
      "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080",
    ],
    category: "Workshop",
    title: "UI/UX Design Bootcamp",
    summary:
      "Hands-on bootcamp focused on UI/UX fundamentals and best practices.",
  },
];

const ITEMS_PER_PAGE = 4;

function ImageSlideshow({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  const prev = () => setIndex((i) => (i === 0 ? images.length - 1 : i - 1));

  const next = () => setIndex((i) => (i === images.length - 1 ? 0 : i + 1));

  return (
    <div className="relative h-48 overflow-hidden">
      <img
        src={images[index]}
        alt=""
        className="w-full h-full object-cover transition-opacity duration-300"
      />

      {images.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full hover:bg-black/60"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            onClick={next}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white p-1 rounded-full hover:bg-black/60"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </>
      )}
    </div>
  );
}

export function NewsEvents() {
  const [page, setPage] = useState(0);

  const totalPages = Math.ceil(newsItems.length / ITEMS_PER_PAGE);

  const nextPage = () => setPage((p) => (p === totalPages - 1 ? 0 : p + 1));

  const prevPage = () => setPage((p) => (p === 0 ? totalPages - 1 : p - 1));

  const visibleItems = newsItems.slice(
    page * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE + ITEMS_PER_PAGE
  );

  return (
    <section
      id="news"
      className="py-24 bg-gradient-to-b from-white to-muted/30"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: -60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-sm text-primary">What's Happening</span>
          </div>

          <h2 className="text-4xl sm:text-5xl mb-6 text-primary">
            News & Events
          </h2>

          <p className="text-lg text-muted-foreground">
            Stay updated with the latest happenings, events, and success stories
            from CIED IUST
          </p>
        </motion.div>

        {/* CAROUSEL CONTROLS */}
        <div className="relative mb-12">
          <button
            onClick={prevPage}
            className="absolute -left-6 top-1/2 -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 z-10"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            onClick={nextPage}
            className="absolute -right-6 top-1/2 -translate-y-1/2 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary/90 z-10"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* CARDS */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visibleItems.map((item, index) => (
              <Card
                key={index}
                className="group border-none shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 overflow-hidden"
              >
                <div className="relative">
                  <ImageSlideshow images={item.images} />
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

                  <Button
                    variant="ghost"
                    className="text-primary hover:text-primary p-0"
                  >
                    Read More
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link to="/newsEvents">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white"
            >
              View All News & Events
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
