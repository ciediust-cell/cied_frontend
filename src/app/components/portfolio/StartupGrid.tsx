import { useEffect, useMemo, useRef, useState } from "react";
import { Card, CardContent } from "../ui/card";
import {
  Search,
  ArrowRight,
  X,
  ExternalLink,
  Award,
  Users,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  getPublicPortfolio,
  getPublicPortfolioBySlug,
  type PortfolioSector,
  type PortfolioStage,
  type PublicPortfolioDetail,
  type PublicPortfolioListItem,
} from "src/services/publicPortfolio.service";

const stageDisplay: Record<PortfolioStage, string> = {
  IDEATION: "Ideation",
  EARLY_STAGE: "Early-stage",
  GROWTH: "Growth",
};

const sectorDisplay: Record<PortfolioSector, string> = {
  AI: "AI",
  TECHNOLOGY: "Technology",
  AGRICULTURE: "Agriculture",
  HEALTHTECH: "HealthTech",
  EDTECH: "EdTech",
  ECOMMERCE: "E-commerce",
  SOCIAL_IMPACT: "Social Impact",
};

const sectorOptions: Array<{ label: string; value: "All" | PortfolioSector }> = [
  { label: "All", value: "All" },
  { label: "AI", value: "AI" },
  { label: "Technology", value: "TECHNOLOGY" },
  { label: "Agriculture", value: "AGRICULTURE" },
  { label: "HealthTech", value: "HEALTHTECH" },
  { label: "EdTech", value: "EDTECH" },
  { label: "E-commerce", value: "ECOMMERCE" },
  { label: "Social Impact", value: "SOCIAL_IMPACT" },
];

const stageOptions: Array<{ label: string; value: "All" | PortfolioStage }> = [
  { label: "All", value: "All" },
  { label: "Ideation", value: "IDEATION" },
  { label: "Early-stage", value: "EARLY_STAGE" },
  { label: "Growth", value: "GROWTH" },
];

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
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

export function StartupGrid() {
  const [selectedStartupPreview, setSelectedStartupPreview] =
    useState<PublicPortfolioListItem | null>(null);
  const [selectedStartupDetail, setSelectedStartupDetail] =
    useState<PublicPortfolioDetail | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");
  const [selectedSector, setSelectedSector] = useState<"All" | PortfolioSector>(
    "All"
  );
  const [selectedStage, setSelectedStage] = useState<"All" | PortfolioStage>(
    "All"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery, setDebouncedSearchQuery] = useState("");
  const [startups, setStartups] = useState<PublicPortfolioListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const listRequestIdRef = useRef(0);
  const detailRequestIdRef = useRef(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearchQuery(searchQuery.trim());
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  useEffect(() => {
    const loadStartups = async () => {
      const requestId = listRequestIdRef.current + 1;
      listRequestIdRef.current = requestId;

      try {
        setLoading(true);
        setError("");
        const response = await getPublicPortfolio({
          sector: selectedSector === "All" ? undefined : selectedSector,
          stage: selectedStage === "All" ? undefined : selectedStage,
          search: debouncedSearchQuery || undefined,
        });
        if (listRequestIdRef.current !== requestId) return;
        setStartups(response);
      } catch {
        if (listRequestIdRef.current !== requestId) return;
        setError("Failed to load startups.");
      } finally {
        if (listRequestIdRef.current === requestId) {
          setLoading(false);
        }
      }
    };

    void loadStartups();
  }, [selectedSector, selectedStage, debouncedSearchQuery]);

  const filteredStartups = useMemo(() => startups, [startups]);

  const openStartup = async (startup: PublicPortfolioListItem) => {
    setSelectedStartupPreview(startup);
    setSelectedStartupDetail(null);
    setDetailLoading(true);
    setDetailError("");

    const requestId = detailRequestIdRef.current + 1;
    detailRequestIdRef.current = requestId;

    try {
      const detail = await getPublicPortfolioBySlug(startup.slug);
      if (detailRequestIdRef.current !== requestId) return;
      setSelectedStartupDetail(detail);
    } catch {
      if (detailRequestIdRef.current !== requestId) return;
      setDetailError("Failed to load startup profile.");
    } finally {
      if (detailRequestIdRef.current === requestId) {
        setDetailLoading(false);
      }
    }
  };

  const closeStartup = () => {
    setSelectedStartupPreview(null);
    setSelectedStartupDetail(null);
    setDetailLoading(false);
    setDetailError("");
  };

  const activeName = selectedStartupDetail?.name || selectedStartupPreview?.name;
  const activeTagline =
    selectedStartupDetail?.tagline || selectedStartupPreview?.tagline;
  const activeLogo =
    selectedStartupDetail?.logo || selectedStartupPreview?.logo || "/ciedLogo.jpeg";
  const activeDescription =
    selectedStartupDetail?.description ||
    selectedStartupPreview?.tagline ||
    "Detailed profile will be available soon.";
  const activeFounders = selectedStartupDetail?.founders || [];
  const activeAchievements = selectedStartupDetail?.achievements || [];
  const activeWebsite = selectedStartupDetail?.websiteUrl;

  return (
    <>
      <section className="py-14 sm:py-18 lg:py-20 bg-gradient-to-b from-primary/5 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search startups..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 focus:border-primary outline-none transition"
              />
            </div>
          </div>

          <div className="space-y-5 mb-10">
            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Filter by Sector
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {sectorOptions.map((sector) => (
                  <motion.button
                    key={sector.value}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedSector(sector.value)}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      selectedSector === sector.value
                        ? "bg-primary text-white"
                        : "border-2 hover:border-primary/30"
                    }`}
                  >
                    {sector.label}
                  </motion.button>
                ))}
              </div>
            </div>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-3">
                Filter by Stage
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {stageOptions.map((stage) => (
                  <motion.button
                    key={stage.value}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedStage(stage.value)}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      selectedStage === stage.value
                        ? "bg-accent text-white"
                        : "border-2 hover:border-accent/30"
                    }`}
                  >
                    {stage.label}
                  </motion.button>
                ))}
              </div>
            </div>
          </div>

          {loading && (
            <div className="text-center py-12 text-muted-foreground">
              Loading startups...
            </div>
          )}

          {!loading && error && (
            <div className="text-center py-12 text-destructive">{error}</div>
          )}

          {!loading && !error && (
            <>
              <p className="text-center text-muted-foreground mb-8">
                Showing{" "}
                <span className="text-primary">{filteredStartups.length}</span>{" "}
                startup{filteredStartups.length !== 1 && "s"}
              </p>

              <motion.div
                variants={gridVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
              >
                {filteredStartups.map((startup) => (
                  <motion.div
                    key={startup.slug}
                    variants={cardVariants}
                    whileHover={{ y: -6 }}
                  >
                    <Card className="border-2 hover:border-primary/30 hover:shadow-lg h-full">
                      <CardContent className="p-5 flex flex-col h-full">
                        <div className="h-40 rounded-xl overflow-hidden mb-4">
                          <motion.img
                            src={startup.logo || "/ciedLogo.jpeg"}
                            alt={startup.name}
                            className="w-full h-full object-cover"
                            whileHover={{ scale: 1.06 }}
                            transition={{ duration: 0.3 }}
                          />
                        </div>

                        <h3 className="text-lg sm:text-xl text-primary mb-2">
                          {startup.name}
                        </h3>
                        <p className="text-sm text-muted-foreground mb-4 flex-grow">
                          {startup.tagline}
                        </p>

                        <div className="flex flex-wrap gap-2 mb-4">
                          <span className="px-3 py-1 text-xs rounded-full bg-secondary/10 text-secondary">
                            {stageDisplay[startup.stage]}
                          </span>
                          {startup.sectors.slice(0, 2).map((sector) => (
                            <span
                              key={`${startup.slug}-${sector}`}
                              className="px-3 py-1 text-xs rounded-full bg-primary/10 text-primary"
                            >
                              {sectorDisplay[sector]}
                            </span>
                          ))}
                        </div>

                        <button
                          onClick={() => void openStartup(startup)}
                          className="flex items-center gap-2 text-primary mt-auto"
                        >
                          View Profile
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </>
          )}

          {!loading && !error && filteredStartups.length === 0 && (
            <div className="text-center py-12 text-muted-foreground">
              No startups found
            </div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedStartupPreview && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center"
            onClick={closeStartup}
          >
            <motion.div
              initial={{ y: 80, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 80, opacity: 0 }}
              transition={{ duration: 0.35 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full sm:max-w-4xl rounded-t-2xl sm:rounded-2xl max-h-[92vh] overflow-y-auto"
            >
              <div className="relative h-44 bg-primary/10">
                <img
                  src={activeLogo}
                  alt={activeName}
                  className="w-full h-full object-cover opacity-30"
                />
                <button
                  onClick={closeStartup}
                  className="absolute top-4 right-4 w-9 h-9 bg-white rounded-lg flex items-center justify-center"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-5 sm:p-8 space-y-6">
                <div>
                  <h2 className="text-2xl sm:text-3xl text-primary mb-1">
                    {activeName}
                  </h2>
                  <p className="text-muted-foreground">{activeTagline}</p>
                </div>

                {detailLoading && (
                  <p className="text-sm text-muted-foreground">
                    Loading startup profile...
                  </p>
                )}

                {!detailLoading && detailError && (
                  <p className="text-sm text-destructive">{detailError}</p>
                )}

                {!detailLoading && !detailError && (
                  <>
                    <p className="text-muted-foreground leading-relaxed">
                      {activeDescription}
                    </p>

                    <div>
                      <h4 className="text-primary mb-2 flex items-center gap-2">
                        <Users className="h-5 w-5" /> Founders
                      </h4>
                      {activeFounders.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          Founder details will be updated soon.
                        </p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {activeFounders.map((founder) => (
                            <span
                              key={founder.id}
                              className="px-4 py-2 bg-muted rounded-lg"
                            >
                              {founder.name}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>

                    <div>
                      <h4 className="text-primary mb-2 flex items-center gap-2">
                        <Award className="h-5 w-5" /> Achievements
                      </h4>
                      {activeAchievements.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          Achievements will be updated soon.
                        </p>
                      ) : (
                        <ul className="space-y-2">
                          {activeAchievements.map((achievement) => (
                            <li
                              key={achievement.id}
                              className="flex gap-2 text-sm"
                            >
                              <span className="text-accent">+</span>
                              {achievement.text}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    {activeWebsite && (
                      <a
                        href={activeWebsite}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg"
                      >
                        Visit Website
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    )}
                  </>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
