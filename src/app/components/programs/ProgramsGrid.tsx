import { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "../ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X, Clock, Check, ExternalLink } from "lucide-react";
import {
  getPublicProgramBySlug,
  getPublicPrograms,
  type PublicProgramDetail,
  type PublicProgramListItem,
} from "src/services/publicPrograms.service";
import { getProgramIconConfig } from "src/helper/programIcons";

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45 },
  },
};

export function ProgramsGrid() {
  const [programs, setPrograms] = useState<PublicProgramListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedProgram, setSelectedProgram] =
    useState<PublicProgramListItem | null>(null);
  const [programDetail, setProgramDetail] = useState<PublicProgramDetail | null>(
    null
  );
  const [detailLoading, setDetailLoading] = useState(false);
  const [detailError, setDetailError] = useState("");
  const detailRequestIdRef = useRef(0);

  useEffect(() => {
    const loadPrograms = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getPublicPrograms();
        setPrograms(response);
      } catch {
        setError("Failed to load programs.");
      } finally {
        setLoading(false);
      }
    };

    void loadPrograms();
  }, []);

  const closeModal = () => {
    setSelectedProgram(null);
    setProgramDetail(null);
    setDetailLoading(false);
    setDetailError("");
  };

  const openProgram = async (program: PublicProgramListItem) => {
    setSelectedProgram(program);
    setProgramDetail(null);
    setDetailError("");
    setDetailLoading(true);

    const requestId = detailRequestIdRef.current + 1;
    detailRequestIdRef.current = requestId;

    try {
      const detail = await getPublicProgramBySlug(program.slug);
      if (detailRequestIdRef.current !== requestId) return;
      setProgramDetail(detail);
    } catch {
      if (detailRequestIdRef.current !== requestId) return;
      setDetailError("Failed to load program details.");
    } finally {
      if (detailRequestIdRef.current === requestId) {
        setDetailLoading(false);
      }
    }
  };

  const activeTitle = programDetail?.title ?? selectedProgram?.title ?? "";
  const activeSummary =
    programDetail?.shortDescription ?? selectedProgram?.shortDescription ?? "";
  const activeOverview = programDetail?.overview ?? "";
  const activeHighlights = programDetail?.highlights ?? [];
  const activeSteps = programDetail?.applicationSteps ?? [];
  const activeApplyEnabled =
    programDetail?.applyEnabled ?? selectedProgram?.applyEnabled ?? false;
  const activeApplyUrl = programDetail?.applyUrl ?? selectedProgram?.applyUrl;

  return (
    <>
      <section className="py-14 sm:py-20 bg-gradient-to-b from-white to-primary/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-3xl sm:text-4xl text-primary mb-4">
              Our Programs
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the program that best fits your startup's current stage and
              needs.
            </p>
          </div>

          {loading && (
            <div className="text-center text-muted-foreground py-8">
              Loading programs...
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
              className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            >
              {programs.map((program) => {
                const { Icon, color, bgColor } = getProgramIconConfig(
                  program.icon,
                  program.slug,
                  program.title
                );

                return (
                  <motion.div
                    key={program.slug}
                    variants={cardVariants}
                    whileHover={{ y: -6 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="border-2 hover:border-primary/30 hover:shadow-lg transition-all h-full">
                      <CardContent className="p-5 sm:p-6 flex flex-col h-full">
                        <motion.div
                          className={`w-14 h-14 ${bgColor} rounded-xl flex items-center justify-center mb-4`}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Icon className={`h-7 w-7 ${color}`} />
                        </motion.div>

                        <h3 className="text-lg sm:text-xl mb-3 text-primary">
                          {program.title}
                        </h3>

                        <p className="text-sm sm:text-base text-muted-foreground mb-4 flex-grow">
                          {program.shortDescription}
                        </p>

                        <div className="space-y-2 mb-5 pt-4 border-t">
                          <div className="flex items-center gap-2 text-sm">
                            <Clock className="h-4 w-4 text-secondary" />
                            <span>
                              <strong>Duration:</strong> {program.duration}
                            </span>
                          </div>
                          <div className="flex items-start gap-2 text-sm">
                            <Check className="h-4 w-4 text-accent mt-0.5" />
                            <span>
                              <strong>Eligibility:</strong> {program.eligibility}
                            </span>
                          </div>
                        </div>

                        <button
                          onClick={() => void openProgram(program)}
                          className="mt-auto flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium"
                        >
                          Learn More
                          <ArrowRight className="h-4 w-4" />
                        </button>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </div>
      </section>

      <AnimatePresence>
        {selectedProgram && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center"
            onClick={closeModal}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white w-full sm:max-w-3xl rounded-t-2xl sm:rounded-2xl max-h-[92vh] overflow-y-auto"
            >
              <div className="sticky top-0 bg-white border-b p-5 flex justify-between items-start">
                <div>
                  <h3 className="text-xl sm:text-2xl text-primary mb-1">
                    {activeTitle}
                  </h3>
                  <p className="text-sm text-muted-foreground">{activeSummary}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="w-9 h-9 rounded-lg hover:bg-muted flex items-center justify-center"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-5 sm:p-6 space-y-6">
                {detailLoading && (
                  <p className="text-sm text-muted-foreground">
                    Loading program details...
                  </p>
                )}

                {!detailLoading && detailError && (
                  <p className="text-sm text-destructive">{detailError}</p>
                )}

                {!detailLoading && !detailError && (
                  <>
                    <div>
                      <h4 className="text-primary mb-2">Program Overview</h4>
                      <p className="text-muted-foreground text-sm sm:text-base">
                        {activeOverview || activeSummary}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-primary mb-2">Key Highlights</h4>
                      {activeHighlights.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          Highlights will be updated soon.
                        </p>
                      ) : (
                        <ul className="space-y-2">
                          {activeHighlights.map((highlight) => (
                            <li key={highlight.id} className="flex gap-2 text-sm">
                              <Check className="h-4 w-4 text-accent mt-0.5" />
                              {highlight.text}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>

                    <div>
                      <h4 className="text-primary mb-2">Application Process</h4>
                      {activeSteps.length === 0 ? (
                        <p className="text-sm text-muted-foreground">
                          Application steps will be updated soon.
                        </p>
                      ) : (
                        <div className="space-y-2">
                          {activeSteps.map((step, index) => (
                            <div key={step.id} className="flex gap-3 text-sm">
                              <div className="w-6 h-6 bg-secondary text-white rounded-full flex items-center justify-center text-xs">
                                {step.stepNumber || index + 1}
                              </div>
                              {step.description}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {activeApplyEnabled && activeApplyUrl ? (
                      <a
                        href={activeApplyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90"
                      >
                        Apply for This Program
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <button
                        disabled
                        className="w-full sm:w-auto px-8 py-3 bg-muted text-muted-foreground rounded-lg cursor-not-allowed"
                      >
                        Applications Currently Closed
                      </button>
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
