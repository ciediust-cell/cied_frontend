import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  getPublicPortfolio,
  type PortfolioSector,
  type PublicPortfolioListItem,
} from "src/services/publicPortfolio.service";

const sectorDisplay: Record<PortfolioSector, string> = {
  AI: "AI",
  TECHNOLOGY: "Technology",
  AGRICULTURE: "Agriculture",
  HEALTHTECH: "HealthTech",
  EDTECH: "EdTech",
  ECOMMERCE: "E-commerce",
  SOCIAL_IMPACT: "Social Impact",
};

export function PortfolioOverview() {
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
        setError("Failed to load portfolio overview.");
      } finally {
        setLoading(false);
      }
    };

    void loadPortfolio();
  }, []);

  const { sectorsText, growthCount, earlyCount, ideationCount } = useMemo(() => {
    const sectorSet = new Set(
      portfolioItems.flatMap((item) => item.sectors.map((sector) => sectorDisplay[sector]))
    );

    const sectors = Array.from(sectorSet);
    const sectorsText =
      sectors.length === 0
        ? "multiple innovation domains"
        : sectors.length <= 4
        ? sectors.join(", ")
        : `${sectors.slice(0, 4).join(", ")} and more`;

    return {
      sectorsText,
      growthCount: portfolioItems.filter((item) => item.stage === "GROWTH").length,
      earlyCount: portfolioItems.filter((item) => item.stage === "EARLY_STAGE").length,
      ideationCount: portfolioItems.filter((item) => item.stage === "IDEATION").length,
    };
  }, [portfolioItems]);

  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {loading && (
          <div className="text-center text-muted-foreground">
            Loading portfolio overview...
          </div>
        )}

        {!loading && error && (
          <div className="text-center text-destructive">{error}</div>
        )}

        {!loading && !error && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center space-y-4 sm:space-y-5"
          >
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.45 }}
              className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed"
            >
              CIED IUST currently showcases {portfolioItems.length} active startups
              across {sectorsText}. These ventures are led by entrepreneurs solving
              real-world problems through innovation and scalable business models.
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.22, duration: 0.45 }}
              className="text-sm sm:text-base lg:text-lg text-muted-foreground leading-relaxed"
            >
              The portfolio reflects a balanced pipeline with {ideationCount} in
              ideation, {earlyCount} in early-stage growth, and {growthCount} growth-stage
              ventures building long-term impact in Jammu & Kashmir and beyond.
            </motion.p>
          </motion.div>
        )}
      </div>
    </section>
  );
}
