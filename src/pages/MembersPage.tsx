import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Building2, ChevronRight, Linkedin, Mail, Quote, Users } from "lucide-react";
import { getOptimizedCloudinaryUrl } from "src/helper/imageOptimization";
import { getPublicBoard, type PublicBoardMessage } from "src/services/publicBoard.service";
import {
  getPublicMembers,
  type MemberRole,
  type PublicMemberItem,
} from "src/services/publicMembers.service";

export function MembersPage() {
  const [membersByRole, setMembersByRole] = useState<
    Partial<Record<MemberRole, PublicMemberItem[]>>
  >({});
  const [boardMessage, setBoardMessage] = useState<PublicBoardMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadMembers = async () => {
      try {
        setLoading(true);
        setError("");
        const [membersResult, boardResult] = await Promise.allSettled([
          getPublicMembers(),
          getPublicBoard(),
        ]);

        if (membersResult.status === "fulfilled") {
          setMembersByRole(membersResult.value);
        } else {
          throw membersResult.reason;
        }

        if (boardResult.status === "fulfilled") {
          setBoardMessage(boardResult.value.message);
        } else {
          setBoardMessage(null);
        }
      } catch {
        setError("Failed to load members.");
      } finally {
        setLoading(false);
      }
    };

    void loadMembers();
  }, []);

  const allMembers = useMemo(
    () =>
      (Object.values(membersByRole).flat() as PublicMemberItem[]).sort(
        (a, b) => a.order - b.order
      ),
    [membersByRole]
  );

  const boardMembers = useMemo(
    () =>
      ((membersByRole.GOVERNANCE ?? []) as PublicMemberItem[]).sort(
        (a, b) => a.order - b.order
      ),
    [membersByRole]
  );

  const nonBoardMembers = useMemo(
    () =>
      allMembers.filter((member) => member.role !== "GOVERNANCE"),
    [allMembers]
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
                Members
              </div>
              <h1 className="text-3xl sm:text-5xl text-primary mb-4">
                Members
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                Meet the people behind CIED IUST and the team shaping our
                institutional impact.
              </p>
            </motion.div>
          </div>
        </section>

        {loading && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-muted-foreground">
            Loading members...
          </div>
        )}

        {!loading && error && (
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center text-destructive">
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className="py-12 sm:py-16 space-y-12">
            <section>
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2 mb-6">
                  <Quote className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl sm:text-3xl text-primary">
                    Message from Board of Directors
                  </h2>
                </div>

                {boardMessage ? (
                  <div className="border rounded-2xl bg-white p-6 sm:p-8 shadow-sm">
                    <div className="w-full space-y-4">
                      <p className="text-sm font-medium uppercase tracking-wide text-primary/80">
                        {boardMessage.title}
                      </p>
                      <p className="text-base sm:text-lg leading-8 text-foreground sm:text-justify">
                        {boardMessage.message}
                      </p>
                      {(boardMessage.authorName || boardMessage.authorDesignation) && (
                        <div className="pt-2 border-t">
                          <p className="text-foreground">
                            {boardMessage.authorName || "Board of Directors"}
                          </p>
                          {boardMessage.authorDesignation && (
                            <p className="text-sm text-muted-foreground">
                              {boardMessage.authorDesignation}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ) : (
                  <p className="text-muted-foreground">
                    Board message will be updated soon.
                  </p>
                )}
              </div>
            </section>

            <section>
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2 mb-8">
                  <Building2 className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl sm:text-3xl text-primary">
                    Board of Directors
                  </h2>
                </div>

                {boardMembers.length === 0 ? (
                  <p className="text-muted-foreground">
                    Board member profiles will be updated soon.
                  </p>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {boardMembers.map((member) => (
                      <article
                        key={member.id}
                        className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
                      >
                        <div className="bg-gradient-to-b from-white to-muted/20 px-3 pt-3">
                          <img
                            src={
                              member.imageUrl
                                ? getOptimizedCloudinaryUrl(member.imageUrl, {
                                    width: 720,
                                    height: 900,
                                    crop: "fill",
                                    gravity: "auto",
                                  })
                                : "/ciedLogo.jpeg"
                            }
                            alt={member.name}
                            className="w-full h-auto max-h-72 sm:max-h-80 object-contain object-top rounded-t-lg"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-5 space-y-2">
                          <h4 className="text-lg text-primary">{member.name}</h4>
                          <p className="text-sm text-foreground">
                            {member.designation}
                          </p>
                          {member.description && (
                            <p className="text-sm text-muted-foreground leading-6">
                              {member.description}
                            </p>
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

            <section>
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-2 mb-8">
                  <Users className="h-5 w-5 text-primary" />
                  <h2 className="text-2xl sm:text-3xl text-primary">Members</h2>
                </div>

                {nonBoardMembers.length === 0 ? (
                  <p className="text-muted-foreground">
                    Member details will be updated soon.
                  </p>
                ) : (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {nonBoardMembers.map((member) => (
                      <article
                        key={member.id}
                        className="border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow bg-white"
                      >
                        <div className="bg-gradient-to-b from-white to-muted/20 px-3 pt-3">
                          <img
                            src={
                              member.imageUrl
                                ? getOptimizedCloudinaryUrl(member.imageUrl, {
                                    width: 720,
                                    height: 900,
                                    crop: "fill",
                                    gravity: "auto",
                                  })
                                : "/ciedLogo.jpeg"
                            }
                            alt={member.name}
                            className="w-full h-auto max-h-72 sm:max-h-80 object-contain object-top rounded-t-lg"
                            loading="lazy"
                          />
                        </div>
                        <div className="p-5 space-y-2">
                          <h4 className="text-lg text-primary">{member.name}</h4>
                          <p className="text-sm text-foreground">
                            {member.designation}
                          </p>
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
          </div>
        )}
      </main>
    </div>
  );
}
