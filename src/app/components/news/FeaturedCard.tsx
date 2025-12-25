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
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-4">
          <span className="inline-block px-3 py-1 bg-secondary/10 text-secondary text-sm rounded-full">
            Featured
          </span>
        </div>

        <Card
          className="overflow-hidden border-none shadow-xl hover:shadow-2xl transition-all duration-300 cursor-pointer group"
          onClick={onClick}
        >
          <div className="grid lg:grid-cols-2 gap-0">
            <div className="relative h-80 lg:h-auto overflow-hidden">
              <img
                src={item.images[0]}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute top-4 left-4">
                <span
                  className={`px-4 py-2 rounded-lg text-sm ${getCategoryColor(
                    item.category
                  )}`}
                >
                  {item.category}
                </span>
              </div>
            </div>

            <CardContent className="p-8 lg:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
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

              <h2 className="text-3xl lg:text-4xl mb-4 text-primary group-hover:text-secondary transition-colors">
                {item.title}
              </h2>

              <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                {item.summary}
              </p>

              <Button
                className="bg-primary hover:bg-primary/90 group/btn w-fit"
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
