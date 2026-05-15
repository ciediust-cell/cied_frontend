import { useEffect, useState } from "react";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { WorkshopCard } from "./workshops/WorkshopCard";
import {
  getPublicWorkshops,
  type PublicWorkshopItem,
} from "src/services/publicWorkshop.service";

export function WorkshopsSection() {
  const [workshops, setWorkshops] = useState<PublicWorkshopItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadWorkshops = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getPublicWorkshops();
        const sorted = [...response].sort(
          (a, b) => new Date(b.workshopDate).getTime() - new Date(a.workshopDate).getTime(),
        );
        setWorkshops(sorted.slice(0, 3));
      } catch {
        setError("Failed to load workshops.");
      } finally {
        setLoading(false);
      }
    };

    void loadWorkshops();
  }, []);

  return (
    <section id="workshops" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: -40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-3xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-5">
            <CalendarDays className="h-4 w-4" />
            Workshops
          </div>
          <h2 className="text-4xl sm:text-5xl text-primary mb-5">
            Workshops and training sessions
          </h2>
          <p className="text-lg text-muted-foreground">
            Browse recent workshops hosted by CIED with speakers, venue details,
            registration links, and supporting images.
          </p>
        </motion.div>

        {loading && (
          <div className="text-center mb-12 text-muted-foreground">
            Loading workshops...
          </div>
        )}

        {!loading && error && (
          <div className="text-center mb-12 text-destructive">{error}</div>
        )}

        {!loading && !error && workshops.length > 0 && (
          <div className="grid gap-6 lg:grid-cols-3">
            {workshops.map((workshop) => (
              <WorkshopCard key={workshop.id} workshop={workshop} compact />
            ))}
          </div>
        )}

        {!loading && !error && workshops.length === 0 && (
          <div className="text-center text-muted-foreground">
            Workshop details will appear here once published.
          </div>
        )}

        <div className="mt-10 flex items-center justify-center">
          <Link to="/workshops">
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white"
            >
              View All Workshops
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
