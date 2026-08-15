import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Quote } from "lucide-react";
import { getOptimizedCloudinaryUrl } from "src/helper/imageOptimization";
import {
  getPublicSuccessStories,
  type PublicSuccessStoryItem,
} from "src/services/publicSuccessStories.service";
import { Card, CardContent } from "./ui/card";

export function PartnersSection() {
  const [stories, setStories] = useState<PublicSuccessStoryItem[]>([]);
  const [loadingStories, setLoadingStories] = useState(true);
  const [storiesError, setStoriesError] = useState("");

  useEffect(() => {
    let mounted = true;

    const loadStories = async () => {
      try {
        setLoadingStories(true);
        setStoriesError("");
        const response = await getPublicSuccessStories();
        if (mounted) {
          setStories(response);
        }
      } catch {
        if (mounted) {
          setStoriesError("Unable to load success stories right now.");
        }
      } finally {
        if (mounted) {
          setLoadingStories(false);
        }
      }
    };

    void loadStories();

    return () => {
      mounted = false;
    };
  }, []);

  const featuredStories = useMemo(() => stories.slice(0, 3), [stories]);

  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-4 py-2 bg-accent/10 rounded-full mb-6">
              <span className="text-sm text-accent">Success Stories</span>
            </div>
            <h2 className="text-4xl sm:text-5xl mb-6 text-primary">
              What Our Incubatees Say
            </h2>
          </div>

          {loadingStories && (
            <div className="grid md:grid-cols-3 gap-8">
              {[0, 1, 2].map((item) => (
                <Card key={item} className="border-none shadow-lg">
                  <CardContent className="p-8">
                    <div className="h-10 w-10 rounded-full bg-muted mb-4" />
                    <div className="space-y-3 mb-6">
                      <div className="h-4 rounded bg-muted" />
                      <div className="h-4 rounded bg-muted" />
                      <div className="h-4 w-2/3 rounded bg-muted" />
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-muted" />
                      <div className="flex-1 space-y-2">
                        <div className="h-4 w-32 rounded bg-muted" />
                        <div className="h-3 w-24 rounded bg-muted" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {!loadingStories && storiesError && (
            <div className="rounded-xl border border-border bg-white p-8 text-center text-muted-foreground shadow-sm">
              {storiesError}
            </div>
          )}

          {!loadingStories && !storiesError && featuredStories.length === 0 && (
            <div className="rounded-xl border border-border bg-white p-8 text-center text-muted-foreground shadow-sm">
              Success stories will appear here once they are published.
            </div>
          )}

          {!loadingStories && !storiesError && featuredStories.length > 0 && (
            <>
              <div className="grid md:grid-cols-3 gap-8">
                {featuredStories.map((story) => {
                  const quote = story.testimonial || story.successStory;

                  return (
                    <Card
                      key={story.id}
                      className="border-none shadow-lg hover:shadow-xl transition-shadow"
                    >
                      <CardContent className="p-8">
                        <Quote className="h-10 w-10 text-secondary mb-4" />
                        <p className="text-muted-foreground mb-6 leading-relaxed italic line-clamp-5">
                          "{quote}"
                        </p>
                        <div className="flex items-center gap-4">
                          {story.imageUrl ? (
                            <img
                              src={getOptimizedCloudinaryUrl(story.imageUrl, {
                                width: 96,
                                height: 96,
                                crop: "fill",
                                gravity: "auto",
                              })}
                              alt={story.participantName}
                              className="w-12 h-12 rounded-full object-cover"
                              loading="lazy"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-primary/10 text-primary flex items-center justify-center text-sm font-medium">
                              {story.participantName.charAt(0).toUpperCase()}
                            </div>
                          )}
                          <div>
                            <div className="text-primary">
                              {story.participantName}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {story.participantRole}
                            </div>
                            <div className="text-xs text-muted-foreground mt-1">
                              {story.program.title}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>

              <div className="mt-10 flex justify-center">
                <Link
                  to="/success-stories"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors"
                >
                  View All Success Stories
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </>
          )}
        </div>

      </div>
    </section>
  );
}
