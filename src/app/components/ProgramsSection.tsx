import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { getProgramIconConfig } from "src/helper/programIcons";
import {
  getPublicPrograms,
  type PublicProgramListItem,
} from "src/services/publicPrograms.service";

export function ProgramsSection() {
  const [programs, setPrograms] = useState<PublicProgramListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getPublicPrograms();
        setPrograms(response.slice(0, 4));
      } catch {
        setError("Failed to load programs.");
      } finally {
        setLoading(false);
      }
    };

    void loadPrograms();
  }, []);

  return (
    <section
      id="programs"
      className="py-24 bg-gradient-to-b from-muted/30 to-white"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-6">
            <span className="text-sm text-secondary">Our Programs</span>
          </div>

          <motion.h2
            className="text-4xl sm:text-5xl mb-6 text-primary"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{
              duration: 0.6,
            }}
          >
            Choose Your Path to Success
          </motion.h2>

          <p className="text-lg text-muted-foreground">
            Comprehensive programs tailored to support entrepreneurs at every
            stage of their journey.
          </p>
        </div>

        {loading && (
          <div className="text-center text-muted-foreground mb-12">
            Loading programs...
          </div>
        )}

        {!loading && error && (
          <div className="text-center text-destructive mb-12">{error}</div>
        )}

        {!loading && !error && (
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            {programs.map((program) => {
              const { Icon, color, bgColor } = getProgramIconConfig(
                program.icon,
                program.slug,
                program.title
              );

              return (
                <Card
                  key={program.slug}
                  className="group border-none shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
                >
                  <CardContent className="p-8">
                    <div className="flex items-start justify-between mb-4">
                      <div
                        className={`w-16 h-16 rounded-xl ${bgColor} flex items-center justify-center group-hover:scale-110 transition-transform`}
                      >
                        <Icon className={`h-8 w-8 ${color}`} />
                      </div>
                      <span className="px-3 py-1 bg-muted rounded-full text-sm text-muted-foreground">
                        {program.duration}
                      </span>
                    </div>

                    <h3 className="text-2xl mb-3 text-primary">{program.title}</h3>
                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {program.shortDescription}
                    </p>

                    <Link
                      to="/programs"
                      className="inline-flex items-center text-primary hover:text-primary/80 group/btn"
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        <div className="text-center">
          <Link to="/portfolio">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              View Our Portfolio
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
