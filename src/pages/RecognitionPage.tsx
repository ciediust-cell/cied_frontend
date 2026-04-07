import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Award, Trophy, X } from "lucide-react";
import { getOptimizedCloudinaryUrl } from "src/helper/imageOptimization";
import {
  getPublicAwards,
  type PublicAwardItem,
} from "src/services/publicAwards.service";

export function RecognitionPage() {
  const [awards, setAwards] = useState<PublicAwardItem[]>([]);
  const [selectedAward, setSelectedAward] = useState<PublicAwardItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadAwards = async () => {
      try {
        setLoading(true);
        setError("");
        const awardsResponse = await getPublicAwards();
        setAwards(awardsResponse);
      } catch {
        setError("Failed to load recognition details.");
      } finally {
        setLoading(false);
      }
    };

    void loadAwards();
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
                <Trophy className="h-4 w-4" />
                Recognition
              </div>
              <h1 className="text-3xl sm:text-5xl text-primary mb-4">
                Recognition
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                Explore the awards, milestones, and recognitions received by
                CIED IUST for its work in innovation and entrepreneurship.
              </p>
            </motion.div>
          </div>
        </section>

        {loading && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-muted-foreground">
            Loading recognition details...
          </div>
        )}

        {!loading && error && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-destructive">
            {error}
          </div>
        )}

        {!loading && !error && (
          <section className="py-12 sm:py-16 bg-gradient-to-b from-white to-primary/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center gap-2 mb-8">
                <Award className="h-5 w-5 text-primary" />
                <h2 className="text-2xl sm:text-3xl text-primary">
                  Recognition
                </h2>
              </div>

              {awards.length === 0 ? (
                <p className="text-muted-foreground">
                  Recognition details will be updated soon.
                </p>
              ) : (
                <div className="grid md:grid-cols-2 gap-6">
                  {awards.map((award) => (
                    <article
                      key={award.id}
                      className={`bg-white border rounded-xl p-6 shadow-sm transition-shadow ${
                        award.featuredImage
                          ? "hover:shadow-md cursor-pointer"
                          : "hover:shadow-sm"
                      }`}
                      onClick={() => {
                        if (award.featuredImage) {
                          setSelectedAward(award);
                        }
                      }}
                      role={award.featuredImage ? "button" : undefined}
                      tabIndex={award.featuredImage ? 0 : -1}
                      onKeyDown={(event) => {
                        if (!award.featuredImage) return;
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setSelectedAward(award);
                        }
                      }}
                    >
                      {award.featuredImage && (
                        <img
                          src={getOptimizedCloudinaryUrl(award.featuredImage, {
                            width: 900,
                            crop: "limit",
                          })}
                          alt={award.title}
                          className="w-full h-44 object-cover rounded-lg mb-4"
                          loading="lazy"
                        />
                      )}
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <h3 className="text-lg text-primary">{award.title}</h3>
                        <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm">
                          {award.year}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Awarded by: {award.awardedBy}
                      </p>
                      <p className="text-sm text-foreground leading-relaxed">
                        {award.description}
                      </p>
                      {award.featuredImage && (
                        <p className="text-xs text-muted-foreground mt-3">
                          Click to view full image
                        </p>
                      )}
                    </article>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {selectedAward?.featuredImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
            onClick={() => setSelectedAward(null)}
          >
            <button
              className="absolute top-4 right-4 text-white hover:text-primary/50 transition-colors"
              onClick={() => setSelectedAward(null)}
              aria-label="Close award image"
            >
              <X className="h-8 w-8" />
            </button>
            <img
              src={getOptimizedCloudinaryUrl(selectedAward.featuredImage, {
                width: 1600,
                crop: "limit",
              })}
              alt={selectedAward.title}
              className="max-w-full max-h-full object-contain"
              onClick={(event) => event.stopPropagation()}
            />
          </div>
        )}
      </main>
    </div>
  );
}
