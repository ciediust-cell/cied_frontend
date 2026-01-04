import { useState } from "react";
import { GalleryFilter } from "./GalleryFilter";
import { GalleryGrid } from "./GalleryGrid";
import { GalleryLightbox } from "./GalleryLightbox";
import { motion, AnimatePresence } from "framer-motion";

export type GalleryCategory =
  | "All"
  | "Events & Workshops"
  | "Startup Activities"
  | "Programs"
  | "Awards & Accolades"
  | "Infrastructure";

export interface GalleryItem {
  id: number;
  imageUrl: string;
  title: string;
  category: GalleryCategory;
  description?: string;
  type: "image" | "video";
}

// Mock gallery data with Unsplash images
export const galleryItems: GalleryItem[] = [
  {
    id: 1,
    imageUrl:
      "https://images.unsplash.com/photo-1623121608226-ca93dec4d94e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwd29ya3Nob3B8ZW58MXx8fHwxNzY3NTUxMzMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Startup Workshop 2024",
    category: "Events & Workshops",
    description: "Hands-on workshop on building scalable startups",
    type: "image",
  },
  {
    id: 2,
    imageUrl:
      "https://images.unsplash.com/photo-1590649681928-4b179f773bd5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMG1lZXRpbmclMjBjb2xsYWJvcmF0aW9ufGVufDF8fHx8MTc2NzUxODk4Nnww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Team Collaboration Session",
    category: "Startup Activities",
    description: "Startups collaborating on innovative solutions",
    type: "image",
  },
  {
    id: 3,
    imageUrl:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbm5vdmF0aW9uJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3Njc1Mjk5NDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Innovation & Technology",
    category: "Programs",
    description: "Technology innovation program showcase",
    type: "image",
  },
  {
    id: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1718220216044-006f43e3a9b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBvZmZpY2UlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzY3NDg3NDgzfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Modern Workspace",
    category: "Infrastructure",
    description: "Our state-of-the-art coworking space",
    type: "image",
  },
  {
    id: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhd2FyZCUyMGNlcmVtb255fGVufDF8fHx8MTc2NzU1MTMzMXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Award Ceremony 2024",
    category: "Awards & Accolades",
    description: "Celebrating excellence in entrepreneurship",
    type: "image",
  },
  {
    id: 6,
    imageUrl:
      "https://images.unsplash.com/photo-1758876203342-fc14c0bba67c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwY29sbGFib3JhdGlvbiUyMHN0YXJ0dXB8ZW58MXx8fHwxNzY3NTUxMzMyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Team Brainstorming",
    category: "Startup Activities",
    description: "Collaborative ideation session",
    type: "image",
  },
  {
    id: 7,
    imageUrl:
      "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb25mZXJlbmNlJTIwcHJlc2VudGF0aW9ufGVufDF8fHx8MTc2NzU1MTMzNXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Annual Conference 2024",
    category: "Events & Workshops",
    description: "Industry leaders sharing insights",
    type: "image",
  },
  {
    id: 8,
    imageUrl:
      "https://images.unsplash.com/photo-1606836576983-8b458e75221d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3dvcmtpbmclMjBzcGFjZXxlbnwxfHx8fDE3Njc0MzU1NDF8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Coworking Lounge",
    category: "Infrastructure",
    description: "Collaborative workspace area",
    type: "image",
  },
  {
    id: 9,
    imageUrl:
      "https://images.unsplash.com/photo-1576495199011-eb94736d05d6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzfGVufDF8fHx8MTc2NzUzMDQzMHww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "IUST Campus",
    category: "Infrastructure",
    description: "Our beautiful university campus",
    type: "image",
  },
  {
    id: 10,
    imageUrl:
      "https://images.unsplash.com/photo-1675716921224-e087a0cca69a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxuZXR3b3JraW5nJTIwZXZlbnR8ZW58MXx8fHwxNzY3NDYyMTY5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Networking Event",
    category: "Events & Workshops",
    description: "Building connections in the startup ecosystem",
    type: "image",
  },
  {
    id: 11,
    imageUrl:
      "https://images.unsplash.com/photo-1638029202288-451a89e0d55f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYWNrYXRob24lMjBjb2Rpbmd8ZW58MXx8fHwxNzY3NTUxMzM3fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Hackathon 2024",
    category: "Events & Workshops",
    description: "48-hour innovation challenge",
    type: "image",
  },
  {
    id: 12,
    imageUrl:
      "https://images.unsplash.com/photo-1761933799610-c9a75f115794?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZW50b3JzaGlwJTIwZGlzY3Vzc2lvbnxlbnwxfHx8fDE3Njc1NTEzNDB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Mentorship Session",
    category: "Programs",
    description: "One-on-one mentoring with industry experts",
    type: "image",
  },
  {
    id: 13,
    imageUrl:
      "https://images.unsplash.com/photo-1623461487986-9400110de28e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxncmFkdWF0aW9uJTIwY2VyZW1vbnl8ZW58MXx8fHwxNzY3NDk5MTg5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Graduation Ceremony",
    category: "Awards & Accolades",
    description: "Incubation program completion celebration",
    type: "image",
  },
  {
    id: 14,
    imageUrl:
      "https://images.unsplash.com/photo-1519217651866-847339e674d4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcmVhdGl2ZSUyMHdvcmtzcGFjZXxlbnwxfHx8fDE3Njc0OTEyODB8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Creative Workspace",
    category: "Infrastructure",
    description: "Inspiring work environment for startups",
    type: "image",
  },
  {
    id: 15,
    imageUrl:
      "https://images.unsplash.com/photo-1526045004414-3e7ed02f9ca1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzZW1pbmFyJTIwYXVkaWVuY2V8ZW58MXx8fHwxNzY3NTUxMzQwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Leadership Seminar",
    category: "Events & Workshops",
    description: "Executive leadership training session",
    type: "image",
  },
  {
    id: 16,
    imageUrl:
      "https://images.unsplash.com/photo-1623121608226-ca93dec4d94e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwd29ya3Nob3B8ZW58MXx8fHwxNzY3NTUxMzMwfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Pitch Competition",
    category: "Startup Activities",
    description: "Startups presenting to investors",
    type: "image",
  },
  {
    id: 17,
    imageUrl:
      "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbm5vdmF0aW9uJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3Njc1Mjk5NDd8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "AI/ML Workshop",
    category: "Programs",
    description: "Deep learning and AI for startups",
    type: "image",
  },
  {
    id: 18,
    imageUrl:
      "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhd2FyZCUyMGNlcmVtb255fGVufDF8fHx8MTc2NzU1MTMzMXww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Best Startup Award",
    category: "Awards & Accolades",
    description: "Recognizing outstanding startups",
    type: "image",
  },
];

export function GalleryContent() {
  const [selectedCategory, setSelectedCategory] =
    useState<GalleryCategory>("All");
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [itemsToShow, setItemsToShow] = useState(12);

  // Filter images based on selected category
  const filteredItems =
    selectedCategory === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === selectedCategory);

  // Slice items based on itemsToShow
  const displayedItems = filteredItems.slice(0, itemsToShow);

  const handleLoadMore = () => {
    setItemsToShow((prev) => prev + 6);
  };

  return (
    <>
      <section className="py-14 sm:py-18 lg:py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <GalleryFilter
              selectedCategory={selectedCategory}
              onCategoryChange={(category) => {
                setSelectedCategory(category);
                setItemsToShow(12);
              }}
            />
          </motion.div>

          {/* Grid */}
          <motion.div
            layout
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mt-10 sm:mt-12"
          >
            <GalleryGrid
              items={displayedItems}
              onImageClick={setSelectedImage}
            />
          </motion.div>

          {/* Load More */}
          <AnimatePresence>
            {displayedItems.length < filteredItems.length && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.35 }}
                className="text-center mt-10 sm:mt-12"
              >
                <button
                  onClick={handleLoadMore}
                  className="px-7 sm:px-8 py-3 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Load More
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <GalleryLightbox
            item={selectedImage}
            allItems={filteredItems}
            onClose={() => setSelectedImage(null)}
            onNavigate={setSelectedImage}
          />
        )}
      </AnimatePresence>
    </>
  );
}
