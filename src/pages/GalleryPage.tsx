import { GalleryContent } from "src/app/components/gallery/GalleryContent";
import { GalleryHero } from "src/app/components/gallery/GalleryHero";

export function GalleryPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        <GalleryHero />
        <GalleryContent />
      </main>
    </div>
  );
}
