import { useEffect, useMemo, useState } from "react";
import { Briefcase, Target, Award, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import {
  getPublicPortfolio,
  type PublicPortfolioListItem,
} from "src/services/publicPortfolio.service";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
};

export function ImpactHighlights() {
  const [portfolioItems, setPortfolioItems] = useState<PublicPortfolioListItem[]>(
    []
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadPortfolio = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getPublicPortfolio();
        setPortfolioItems(response);
      } catch {
        setError("Failed to load portfolio impact data.");
      } finally {
        setLoading(false);
      }
    };

    void loadPortfolio();
  }, []);

  const stats = useMemo(() => {
    const sectorsCount = new Set(
      portfolioItems.flatMap((item) => item.sectors)
    ).size;
    const growthCount = portfolioItems.filter(
      (item) => item.stage === "GROWTH"
    ).length;
    const earlyCount = portfolioItems.filter(
      (item) => item.stage === "EARLY_STAGE"
    ).length;

    return [
      {
        icon: Briefcase,
        value: `${portfolioItems.length}`,
        label: "Startups in Portfolio",
        description: "Active startups featured in CIED portfolio",
      },
      {
        icon: Target,
        value: `${sectorsCount}`,
        label: "Sectors Covered",
        description: "Diverse innovation domains represented",
      },
      {
        icon: Award,
        value: `${growthCount}`,
        label: "Growth-stage Startups",
        description: "Ventures progressing toward scale",
      },
      {
        icon: TrendingUp,
        value: `${earlyCount}`,
        label: "Early-stage Startups",
        description: "Emerging ventures in active incubation",
      },
    ];
  }, [portfolioItems]);

  return (
    <section className="py-14 sm:py-18 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10 sm:mb-12"
        >
          <h2 className="text-2xl sm:text-3xl lg:text-4xl text-primary mb-3">
            Our Impact
          </h2>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto">
            Building a thriving startup ecosystem in Jammu & Kashmir
          </p>
        </motion.div>

        {loading && (
          <div className="text-center text-muted-foreground py-8">
            Loading impact metrics...
          </div>
        )}

        {!loading && error && (
          <div className="text-center text-destructive py-8">{error}</div>
        )}

        {!loading && !error && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 lg:gap-8"
          >
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={index}
                  variants={cardVariants}
                  whileHover={{ y: -6 }}
                  transition={{ type: "spring", stiffness: 260 }}
                  className="text-center p-5 sm:p-6 rounded-xl border-2 border-border hover:border-primary/30 bg-white"
                >
                  <motion.div
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="w-12 h-12 sm:w-14 sm:h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4"
                  >
                    <Icon className="h-6 w-6 sm:h-7 sm:w-7 text-primary" />
                  </motion.div>

                  <div className="text-2xl sm:text-3xl font-semibold text-primary mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base text-foreground mb-1">
                    {stat.label}
                  </div>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {stat.description}
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
