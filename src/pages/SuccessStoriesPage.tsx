import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, BadgeCheck, Quote, Sparkles } from "lucide-react";
import { getOptimizedCloudinaryUrl } from "src/helper/imageOptimization";
import {
  getPublicSuccessStories,
  type PublicSuccessStoryItem,
} from "src/services/publicSuccessStories.service";

export function SuccessStoriesPage() {
  const [stories, setStories] = useState<PublicSuccessStoryItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadStories = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getPublicSuccessStories();
        setStories(response);
      } catch {
        setError("Failed to load success stories.");
      } finally {
        setLoading(false);
      }
    };

    void loadStories();
  }, []);

  const groupedStories = useMemo(() => {
    return stories.reduce<Record<string, PublicSuccessStoryItem[]>>((acc, story) => {
      const key = story.program.title;
      if (!acc[key]) acc[key] = [];
      acc[key].push(story);
      return acc;
    }, {});
  }, [stories]);

  const programNames = Object.keys(groupedStories);

  return (
    <main className="bg-white">
      <section className="border-b bg-gradient-to-b from-primary/5 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 text-sm text-primary mb-4">
              <Sparkles className="h-4 w-4" />
              Success Stories
            </div>
            <h1 className="text-3xl sm:text-4xl text-primary mb-4">
              Participant outcomes from CIED programs
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
              Stories from STEM, EDP, and other CIED initiatives, showing how
              participants progressed, built, and shipped.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/programs"
                className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
              >
                Explore Programs
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 sm:py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {loading && (
            <div className="text-center text-muted-foreground py-10">
              Loading success stories...
            </div>
          )}

          {!loading && error && (
            <div className="text-center text-destructive py-10">{error}</div>
          )}

          {!loading && !error && stories.length === 0 && (
            <div className="text-center text-muted-foreground py-10">
              Success stories will appear here once they are published.
            </div>
          )}

          {!loading && !error && stories.length > 0 && (
            <div className="space-y-10">
              {programNames.map((programName) => (
                <div key={programName} className="space-y-4">
                  <div className="flex items-center gap-3">
                    <BadgeCheck className="h-5 w-5 text-primary" />
                    <h2 className="text-2xl text-primary">{programName}</h2>
                  </div>

                  <div className="grid gap-5 lg:grid-cols-2">
                    {groupedStories[programName].map((story) => (
                      <article
                        key={story.id}
                        className="rounded-xl border border-border bg-white shadow-sm overflow-hidden"
                      >
                        <div className="grid gap-0 md:grid-cols-[220px_1fr]">
                          {story.imageUrl ? (
                            <img
                              src={getOptimizedCloudinaryUrl(story.imageUrl, {
                                width: 520,
                                height: 420,
                                crop: "fill",
                                gravity: "auto",
                              })}
                              alt={story.participantName}
                              className="h-56 md:h-full w-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="h-56 md:h-full w-full bg-primary/10 flex items-center justify-center text-primary text-sm px-4 text-center">
                              No image available
                            </div>
                          )}

                          <div className="p-5 sm:p-6 space-y-4">
                            <div>
                              <div className="flex flex-wrap items-center gap-2 mb-2">
                                <span className="inline-flex items-center gap-2 text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary">
                                  {story.program.title}
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {story.participantRole}
                                </span>
                              </div>
                              <h3 className="text-lg sm:text-xl text-foreground">
                                {story.storyTitle}
                              </h3>
                              <p className="text-sm font-medium text-primary mt-1">
                                {story.participantName}
                              </p>
                            </div>

                            <p className="text-sm text-muted-foreground">
                              {story.successStory}
                            </p>

                            <div className="space-y-3">
                              <div>
                                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                                  Achievement Highlights
                                </p>
                                <p className="text-sm text-foreground/90">
                                  {story.achievementHighlights}
                                </p>
                              </div>

                              <div>
                                <p className="text-xs uppercase tracking-wide text-muted-foreground mb-1">
                                  Startup Outcome
                                </p>
                                <p className="text-sm text-foreground/90">
                                  {story.startupOutcome}
                                </p>
                              </div>
                            </div>

                            {story.testimonial && (
                              <div className="rounded-lg bg-muted/40 p-4">
                                <Quote className="h-4 w-4 text-primary mb-2" />
                                <p className="text-sm italic text-muted-foreground">
                                  {story.testimonial}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
