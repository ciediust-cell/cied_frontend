import { useEffect, useState } from "react";
import { ExternalLink, FileText, Handshake } from "lucide-react";
import {
  getPublicCollaborators,
  type PublicCollaborator,
} from "src/services/publicCollaborators.service";
import { getDownloadUrl } from "src/helper/downloadUrl";

function CollaboratorLogo({ collaborator }: { collaborator: PublicCollaborator }) {
  if (collaborator.logoUrl) {
    return (
      <img
        src={collaborator.logoUrl}
        alt={`${collaborator.name} logo`}
        className="max-h-16 max-w-full object-contain"
        loading="lazy"
      />
    );
  }

  const initials = collaborator.name
    .replace(/\([^)]*\)/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 3)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return (
    <div className="flex h-16 w-16 items-center justify-center rounded-lg bg-primary/10 text-sm font-semibold text-primary">
      {initials || "CIED"}
    </div>
  );
}

export function CollaboratorsSection() {
  const [collaborators, setCollaborators] = useState<PublicCollaborator[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadCollaborators = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getPublicCollaborators();
        setCollaborators(response);
      } catch {
        setError("Failed to load collaborators.");
      } finally {
        setLoading(false);
      }
    };

    void loadCollaborators();
  }, []);

  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-5">
            <Handshake className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary">Official Collaborators</span>
          </div>
          <h2 className="text-3xl sm:text-4xl text-primary mb-4">
            Collaborators
          </h2>
          <p className="text-muted-foreground">
            Organizations formally associated with CIED through institutional
            collaboration records and MoUs.
          </p>
        </div>

        {loading && (
          <div className="text-center py-12 text-muted-foreground">
            Loading collaborators...
          </div>
        )}

        {!loading && error && (
          <div className="text-center py-12 text-destructive">{error}</div>
        )}

        {!loading && !error && collaborators.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            Collaborator records will be updated soon.
          </div>
        )}

        {!loading && !error && collaborators.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {collaborators.map((collaborator) => (
              <article
                key={collaborator.id}
                className="group flex h-full flex-col rounded-lg border border-border bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex min-h-[5.5rem] items-center justify-center rounded-md border border-border/70 bg-muted/20 p-4">
                  <CollaboratorLogo collaborator={collaborator} />
                </div>

                <div className="flex flex-1 flex-col pt-4">
                  <h3 className="text-base text-primary leading-snug">
                    {collaborator.name}
                  </h3>

                  <div className="mt-auto flex items-center gap-2 pt-5">
                    {collaborator.websiteUrl ? (
                      <a
                        href={collaborator.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex flex-1 items-center justify-center gap-2 rounded-md bg-primary px-3 py-2 text-sm text-white transition-opacity hover:opacity-90"
                      >
                        Website
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    ) : (
                      <span className="inline-flex flex-1 items-center justify-center rounded-md bg-muted px-3 py-2 text-sm text-muted-foreground">
                        Website pending
                      </span>
                    )}

                    {collaborator.mouUrl ? (
                      <a
                        href={getDownloadUrl(collaborator.mouUrl)}
                        download
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-primary transition-colors hover:bg-primary hover:text-white"
                        aria-label={`Download MoU for ${collaborator.name}`}
                        title="Download MoU"
                      >
                        <FileText className="h-4 w-4" />
                      </a>
                    ) : (
                      <span
                        className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-border text-muted-foreground/60"
                        title="MoU pending"
                      >
                        <FileText className="h-4 w-4" />
                      </span>
                    )}
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
