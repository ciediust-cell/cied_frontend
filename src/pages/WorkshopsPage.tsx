import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CalendarDays } from "lucide-react";
import { Link } from "react-router-dom";
import { WorkshopCard } from "src/app/components/workshops/WorkshopCard";
import {
  getPublicWorkshops,
  type PublicWorkshopItem,
} from "src/services/publicWorkshop.service";

export function WorkshopsPage() {
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
        setWorkshops(sorted);
      } catch {
        setError("Failed to load workshops.");
      } finally {
        setLoading(false);
      }
    };

    void loadWorkshops();
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <main className="pt-16 sm:pt-20">
        <section className="bg-gradient-to-b from-primary/5 to-white py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto text-center"
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm mb-4">
                <CalendarDays className="h-4 w-4" />
                Workshops
              </div>
              <h1 className="text-3xl sm:text-5xl text-primary mb-4">
                Workshops at CIED
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                Explore workshops, training sessions, and knowledge-sharing events
                hosted by CIED IUST.
              </p>
              <div className="mt-6">
                <Link
                  to="/events"
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  View Events
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {loading && (
              <div className="text-center text-muted-foreground py-10">
                Loading workshops...
              </div>
            )}

            {!loading && error && (
              <div className="text-center text-destructive py-10">{error}</div>
            )}

            {!loading && !error && workshops.length === 0 && (
              <div className="text-center text-muted-foreground py-10">
                Workshops will appear here once they are published.
              </div>
            )}

            {!loading && !error && workshops.length > 0 && (
              <div className="grid gap-6 lg:grid-cols-2">
                {workshops.map((workshop) => (
                  <WorkshopCard key={workshop.id} workshop={workshop} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
