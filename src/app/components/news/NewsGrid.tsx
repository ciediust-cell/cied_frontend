import { Card, CardContent } from "../ui/card";
import { Button } from "../ui/button";
import { Calendar, MapPin, ArrowRight } from "lucide-react";
import type { NewsItem } from "../../../pages/NewsEventsPage";

interface NewsGridProps {
  items: NewsItem[];
  onItemClick: (item: NewsItem) => void;
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

export function NewsGrid({ items, onItemClick }: NewsGridProps) {
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <p className="text-lg text-muted-foreground">
            No news or events found matching your criteria.
          </p>
        </div>
      </div>
    );
  }

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((item) => (
            <Card
              key={item.id}
              className="group border border-border rounded-xl overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col h-full"
              onClick={() => onItemClick(item)}
            >
              <div className="relative h-56 overflow-hidden">
                <img
                  src={item.images[0]}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span
                    className={`px-3 py-1 rounded-lg text-xs ${getCategoryColor(
                      item.category
                    )}`}
                  >
                    {item.category}
                  </span>
                </div>
              </div>

              <CardContent className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3.5 w-3.5" />
                    <span>{item.date}</span>
                  </div>
                  {item.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3.5 w-3.5" />
                      <span className="truncate">{item.location}</span>
                    </div>
                  )}
                </div>

                <h3 className="text-xl mb-3 text-primary line-clamp-2 group-hover:text-secondary transition-colors">
                  {item.title}
                </h3>

                <p className="text-sm text-muted-foreground mb-4 line-clamp-3 leading-relaxed flex-grow">
                  {item.summary}
                </p>

                <Button
                  variant="ghost"
                  className="text-primary hover:text-primary group/btn p-0 justify-start"
                >
                  Read More
                  <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
