import { useState } from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { motion } from "framer-motion";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1599592187465-6dc742367282?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwcGl0Y2glMjBwcmVzZW50YXRpb258ZW58MXx8fHwxNzY2MDEzOTEyfDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Pitch Presentation",
  },
  {
    src: "https://images.unsplash.com/photo-1745847768380-2caeadbb3b71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMGhhbmRzaGFrZSUyMHBhcnRuZXJzaGlwfGVufDF8fHx8MTc2NTk5MzQ2Mnww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Partnership Signing",
  },
  {
    src: "https://images.unsplash.com/photo-1760493828288-d2dbb70d18c9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbm5vdmF0aW9uJTIwbGFiJTIwdGVjaG5vbG9neXxlbnwxfHx8fDE3NjU5ODY1MjN8MA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Innovation Lab",
  },
  {
    src: "https://images.unsplash.com/photo-1630487656049-6db93a53a7e9?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWFtJTIwYnJhaW5zdG9ybWluZyUyMHNlc3Npb258ZW58MXx8fHwxNzY2MDQ0OTA5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Brainstorming Session",
  },
  {
    src: "https://images.unsplash.com/photo-1624555130858-7ea5b8192c49?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzdGFydHVwJTIwdGVhbSUyMHdvcmtpbmd8ZW58MXx8fHwxNzY1OTQ3NTI5fDA&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Team Collaboration",
  },
  {
    src: "https://images.unsplash.com/photo-1706759755789-66d39fd252b1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwbmV0d29ya2luZyUyMGV2ZW50fGVufDF8fHx8MTc2NjA0NDc4M3ww&ixlib=rb-4.1.0&q=80&w=1080",
    title: "Networking Event",
  },
];

const slideInFromLeft = {
  hidden: {
    opacity: 0,
    x: -60,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
    },
  },
};

export function GallerySection() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <section id="gallery" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-block px-4 py-2 bg-secondary/10 rounded-full mb-6">
            <span className="text-sm text-secondary">Gallery</span>
          </div>
          <motion.h2
            className="text-4xl sm:text-5xl mb-6 text-primary"
            variants={slideInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Moments of Innovation
          </motion.h2>

          <motion.p
            className="text-lg text-muted-foreground"
            variants={slideInFromLeft}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
          >
            A glimpse into the vibrant ecosystem of CIED IUST
          </motion.p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="relative group cursor-pointer overflow-hidden rounded-lg aspect-square"
              onClick={() => setSelectedImage(image.src)}
            >
              <img
                src={image.src}
                alt={image.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <p className="text-white p-4">{image.title}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-primary text-primary hover:bg-primary hover:text-white"
          >
            View Full Gallery
          </Button>
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 text-white hover:text-secondary transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X className="h-8 w-8" />
          </button>
          <img
            src={selectedImage}
            alt="Gallery"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
