import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Award, Building2, Linkedin, Mail, Users, X } from "lucide-react";
import { getOptimizedCloudinaryUrl } from "src/helper/imageOptimization";
import {
  getPublicMembers,
  type MemberRole,
  type PublicMemberItem,
} from "src/services/publicMembers.service";
import {
  getPublicAwards,
  type PublicAwardItem,
} from "src/services/publicAwards.service";

export function MembersRecognitionPage() {
  const [membersByRole, setMembersByRole] = useState<
    Partial<Record<MemberRole, PublicMemberItem[]>>
  >({});
  const [awards, setAwards] = useState<PublicAwardItem[]>([]);
  const [selectedAward, setSelectedAward] = useState<PublicAwardItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadContent = async () => {
      try {
        setLoading(true);
        setError("");
        const [membersResponse, awardsResponse] = await Promise.all([
          getPublicMembers(),
          getPublicAwards(),
        ]);
        setMembersByRole(membersResponse);
        setAwards(awardsResponse);
      } catch {
        setError("Failed to load members and recognition details.");
      } finally {
        setLoading(false);
      }
    };

    void loadContent();
  }, []);

  const allMembers = useMemo(
    () =>
      (Object.values(membersByRole).flat() as PublicMemberItem[]).sort(
        (a, b) => a.order - b.order
      ),
    [membersByRole]
  );

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
                <Users className="h-4 w-4" />
                Members & Recognition
              </div>
              <h1 className="text-3xl sm:text-5xl text-primary mb-4">
                Members & Recognition
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                Meet the people behind CIED IUST and the recognition received for
                our institutional impact.
              </p>
            </motion.div>
          </div>
        </section>

        {loading && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-muted-foreground">
            Loading members and awards...
          </div>
        )}

        {!loading && error && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-destructive">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <section className="py-12 sm:py-16">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2 mb-8">
                  <Users className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl sm:text-3xl text-primary">Members</h2>
                </div>

                {allMembers.length === 0 ? (
                  <p className="text-muted-foreground">
                    Member details will be updated soon.
                  </p>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {allMembers.map((member) => (
                      <article
                        key={member.id}
                        className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
                      >
                        <div className="h-56 bg-muted/40 p-3">
                          <img
                            src={member.imageUrl || "/ciedLogo.jpeg"}
                            alt={member.name}
                            className="h-full w-full rounded-lg bg-white object-contain object-top"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-5 space-y-2">
                          <h4 className="text-lg text-primary">{member.name}</h4>
                          <p className="text-sm text-foreground">
                            {member.designation}
                          </p>
                          {member.description && (
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Building2 className="h-4 w-4" />
                              <span>{member.description}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-3 pt-2">
                            {member.email && (
                              <a
                                href={`mailto:${member.email}`}
                                className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80"
                              >
                                <Mail className="h-4 w-4" />
                                Email
                              </a>
                            )}
                            {member.linkedinUrl && (
                              <a
                                href={member.linkedinUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1 text-sm text-primary hover:text-primary/80"
                              >
                                <Linkedin className="h-4 w-4" />
                                LinkedIn
                              </a>
                            )}
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                )}
              </div>
            </section>

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
          </>
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
