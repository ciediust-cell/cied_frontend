import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ImageIcon,
  X,
} from "lucide-react";
import { Card, CardContent } from "src/app/components/ui/card";
import {
  getPublicFacilities,
  type PublicFacilityItem,
} from "src/services/publicFacility.service";

const placeholderFacilities: PublicFacilityItem[] = [
  {
    id: "placeholder-aicte-idea-lab",
    name: "AICTE Idea Lab",
    slug: "aicte-idea-lab",
    description:
      "A hands-on innovation space for design thinking, rapid prototyping, experimentation, and student-led product development.",
    purpose:
      "Supports ideation, prototype building, skill development, and interdisciplinary innovation projects.",
    resources: [
      "Digital fabrication tools",
      "Electronics and IoT prototyping kits",
      "Design and product development workstations",
    ],
    usageDetails:
      "Used for innovation programs, student projects, workshops, and mentoring-led prototyping activities.",
    isActive: true,
    order: 0,
    images: [],
  },
  {
    id: "placeholder-fab-lab",
    name: "Fab Lab",
    slug: "fab-lab",
    description:
      "A fabrication-focused facility for creating physical prototypes, models, and working proof-of-concept builds.",
    purpose:
      "Enables founders and students to move from concepts to tangible prototypes through practical tools and guidance.",
    resources: [
      "3D printing and model-making support",
      "Fabrication workspace",
      "Prototype assembly resources",
    ],
    usageDetails:
      "Available for startup prototyping, project development, and technical training sessions.",
    isActive: true,
    order: 1,
    images: [],
  },
  {
    id: "placeholder-ultratech-lab",
    name: "Ultratech Lab",
    slug: "ultratech-lab",
    description:
      "A technical lab environment supporting applied learning, material experimentation, and industry-linked innovation activities.",
    purpose:
      "Connects students and innovators with practical infrastructure for technical exploration and problem solving.",
    resources: [
      "Technical testing resources",
      "Applied learning equipment",
      "Industry-oriented lab support",
    ],
    usageDetails:
      "Supports training, demonstrations, and innovation projects connected with technical domains.",
    isActive: true,
    order: 2,
    images: [],
  },
  {
    id: "placeholder-c4i4",
    name: "C4i4",
    slug: "c4i4",
    description:
      "An innovation and incubation-oriented facility for collaborative development, mentoring, and technology-enabled entrepreneurship.",
    purpose:
      "Provides a focused environment for building, refining, and supporting innovation-led ventures.",
    resources: [
      "Collaboration space",
      "Mentoring and review setup",
      "Innovation program support",
    ],
    usageDetails:
      "Used for incubation activities, founder interactions, program sessions, and project reviews.",
    isActive: true,
    order: 3,
    images: [],
  },
];

const getFacilityImages = (facility: PublicFacilityItem) =>
  facility.images.length > 0
    ? facility.images.map((image) => ({
        imageUrl: image.imageUrl,
        caption: image.caption,
      }))
    : [{ imageUrl: "/ciedLogo.jpeg", caption: facility.name }];

export function FacilitiesPage() {
  const [facilities, setFacilities] = useState<PublicFacilityItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedFacility, setSelectedFacility] =
    useState<PublicFacilityItem | null>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const loadFacilities = async () => {
      try {
        setLoading(true);
        setError("");
        const response = await getPublicFacilities();
        setFacilities(response.length > 0 ? response : placeholderFacilities);
      } catch {
        setFacilities(placeholderFacilities);
        setError("Facility content is temporarily unavailable.");
      } finally {
        setLoading(false);
      }
    };

    void loadFacilities();
  }, []);

  const sortedFacilities = useMemo(
    () => [...facilities].sort((a, b) => a.order - b.order),
    [facilities],
  );

  const selectedImages = selectedFacility
    ? getFacilityImages(selectedFacility)
    : [];
  const activeImage = selectedImages[activeImageIndex] ?? selectedImages[0];
  const hasMultipleImages = selectedImages.length > 1;

  const openFacility = (facility: PublicFacilityItem) => {
    setSelectedFacility(facility);
    setActiveImageIndex(0);
  };

  const closeFacility = () => {
    setSelectedFacility(null);
    setActiveImageIndex(0);
  };

  const showPreviousImage = () => {
    setActiveImageIndex((current) =>
      current === 0 ? selectedImages.length - 1 : current - 1,
    );
  };

  const showNextImage = () => {
    setActiveImageIndex((current) =>
      current === selectedImages.length - 1 ? 0 : current + 1,
    );
  };

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
                <Building2 className="h-4 w-4" />
                Facilities
              </div>
              <h1 className="text-3xl sm:text-5xl text-primary mb-4">
                Facilities & Infrastructure
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground">
                Explore CIED labs, technical facilities, and innovation
                infrastructure supporting prototyping, training, and venture
                development.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-12 sm:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {loading && (
              <div className="text-center text-muted-foreground py-10">
                Loading facilities...
              </div>
            )}

            {!loading && error && (
              <div className="text-center text-muted-foreground py-4">
                {error}
              </div>
            )}

            {!loading && sortedFacilities.length > 0 && (
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                {sortedFacilities.map((facility, index) => {
                  const images = getFacilityImages(facility);
                  const primaryImage = images[0];
                  const previewResources = facility.resources.slice(0, 3);

                  return (
                    <motion.div
                      key={facility.id}
                      initial={{ opacity: 0, y: 24 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.2 }}
                      transition={{
                        duration: 0.45,
                        delay: Math.min(index * 0.05, 0.2),
                      }}
                      whileHover={{ y: -6 }}
                    >
                      <Card className="h-full overflow-hidden border-2 hover:border-primary/30 hover:shadow-lg transition-all">
                        <div className="relative h-44 bg-muted">
                          <img
                            src={primaryImage.imageUrl}
                            alt={facility.name}
                            className="h-full w-full object-cover"
                            loading="lazy"
                          />
                          <span className="absolute left-3 top-3 rounded-full bg-white/95 px-3 py-1 text-xs text-primary shadow-sm">
                            {images.length} image{images.length === 1 ? "" : "s"}
                          </span>
                        </div>
                        <CardContent className="p-5 flex h-[calc(100%-11rem)] flex-col">
                          <div className="mb-4">
                            <h2 className="text-xl text-primary mb-2">
                              {facility.name}
                            </h2>
                            <p className="text-sm text-muted-foreground line-clamp-3">
                              {facility.description}
                            </p>
                          </div>

                          {previewResources.length > 0 && (
                            <div className="mb-5 space-y-2 border-t pt-4">
                              {previewResources.map((resource) => (
                                <div
                                  key={resource}
                                  className="flex items-start gap-2 text-sm text-muted-foreground"
                                >
                                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                                  <span className="line-clamp-1">{resource}</span>
                                </div>
                              ))}
                            </div>
                          )}

                          <button
                            type="button"
                            onClick={() => openFacility(facility)}
                            className="mt-auto flex items-center gap-2 text-primary hover:text-primary/80 text-sm font-medium"
                          >
                            View Details
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
      </main>

      <AnimatePresence>
        {selectedFacility && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center"
            onClick={closeFacility}
          >
            <motion.div
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 60, opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={(event) => event.stopPropagation()}
              className="bg-white w-full sm:max-w-4xl rounded-t-2xl sm:rounded-2xl max-h-[92vh] overflow-y-auto"
            >
              <div className="sticky top-0 z-10 bg-white border-b p-5 flex justify-between items-start">
                <div>
                  <h3 className="text-xl sm:text-2xl text-primary mb-1">
                    {selectedFacility.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {selectedFacility.description}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeFacility}
                  className="w-9 h-9 rounded-lg hover:bg-muted flex items-center justify-center shrink-0"
                  aria-label="Close facility details"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="p-5 sm:p-6 space-y-6">
                {activeImage && (
                  <div>
                    <div className="relative overflow-hidden rounded-xl bg-muted">
                      <img
                        src={activeImage.imageUrl}
                        alt={activeImage.caption || selectedFacility.name}
                        className="h-64 sm:h-96 w-full object-cover"
                      />

                      {hasMultipleImages && (
                        <>
                          <button
                            type="button"
                            onClick={showPreviousImage}
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-primary shadow hover:bg-white flex items-center justify-center"
                            aria-label="Previous facility image"
                          >
                            <ChevronLeft className="h-5 w-5" />
                          </button>
                          <button
                            type="button"
                            onClick={showNextImage}
                            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 text-primary shadow hover:bg-white flex items-center justify-center"
                            aria-label="Next facility image"
                          >
                            <ChevronRight className="h-5 w-5" />
                          </button>
                          <div className="absolute bottom-3 right-3 rounded-full bg-black/60 px-3 py-1 text-xs text-white">
                            {activeImageIndex + 1} / {selectedImages.length}
                          </div>
                        </>
                      )}
                    </div>

                    {activeImage.caption && (
                      <p className="mt-2 text-sm text-muted-foreground">
                        {activeImage.caption}
                      </p>
                    )}

                    {hasMultipleImages && (
                      <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
                        {selectedImages.map((image, index) => (
                          <button
                            key={`${image.imageUrl}-${index}`}
                            type="button"
                            onClick={() => setActiveImageIndex(index)}
                            className={`h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 ${
                              index === activeImageIndex
                                ? "border-primary"
                                : "border-transparent"
                            }`}
                            aria-label={`Show facility image ${index + 1}`}
                          >
                            <img
                              src={image.imageUrl}
                              alt={image.caption || selectedFacility.name}
                              className="h-full w-full object-cover"
                            />
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {selectedFacility.purpose && (
                  <div>
                    <h4 className="text-primary mb-2">Purpose</h4>
                    <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
                      {selectedFacility.purpose}
                    </p>
                  </div>
                )}

                <div>
                  <h4 className="text-primary mb-3">
                    Available Equipment / Resources
                  </h4>
                  {selectedFacility.resources.length === 0 ? (
                    <p className="text-sm text-muted-foreground">
                      Resources will be updated soon.
                    </p>
                  ) : (
                    <ul className="grid gap-3 sm:grid-cols-2">
                      {selectedFacility.resources.map((resource) => (
                        <li
                          key={resource}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-secondary" />
                          <span>{resource}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                {selectedFacility.usageDetails && (
                  <div className="rounded-xl bg-muted/60 p-5">
                    <h4 className="text-primary mb-2">
                      Program / Usage Details
                    </h4>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {selectedFacility.usageDetails}
                    </p>
                  </div>
                )}

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <ImageIcon className="h-4 w-4 text-secondary" />
                  <span>
                    {selectedImages.length} facility image
                    {selectedImages.length === 1 ? "" : "s"} available
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
