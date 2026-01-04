import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import type { NewsItem } from "../../../pages/NewsEventsPage";

interface FeaturedCardProps {
  item: NewsItem;
  onClick: () => void;
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

export function FeaturedCard({ item, onClick }: FeaturedCardProps) {
  return (
    <section className="py-8 sm:py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-3 sm:mb-4">
          <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-xs sm:text-sm rounded-full">
            Featured
          </span>
        </div>

        <Card
          className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
          onClick={onClick}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
            {/* IMAGE */}
            <div className="relative h-56 sm:h-64 lg:h-auto overflow-hidden">
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                <span
                  className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm ${getCategoryColor(
                    item.category
                  )}`}
                >
                  {item.category}
                </span>
              </div>
            </div>

            {/* CONTENT */}
            <CardContent className="p-5 sm:p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground mb-3 sm:mb-4">
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

              <h2 className="text-2xl sm:text-3xl lg:text-4xl mb-3 sm:mb-4 text-primary group-hover:text-secondary transition-colors">
                {item.title}
              </h2>

              <p className="text-base sm:text-lg text-muted-foreground mb-5 sm:mb-6 leading-relaxed">
                {item.summary}
              </p>

              <Button
                className="bg-primary hover:bg-primary/90 group/btn w-full sm:w-fit"
                onClick={onClick}
              >
                Read More
                <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
              </Button>
            </CardContent>
          </div>
        </Card>
      </div>
    </section>
  );
}
