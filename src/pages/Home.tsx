import { Header } from "../app/components/Header";
import { HeroSection } from "../app/components/HeroSection";
import { KeyHighlights } from "../app/components/KeyHighlights";
import { AboutSection } from "../app/components/AboutSection";
import { ProgramsSection } from "../app/components/ProgramsSection";
import { RecentUpdates } from "../app/components/RecentUpdates";
import { NewsEvents } from "../app/components/NewsEvents";
import { GallerySection } from "../app/components/GallerySection";
import { PartnersSection } from "../app/components/PartnersSection";
import { CTASection } from "../app/components/CTASection";
import { Footer } from "../app/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <KeyHighlights />
        <AboutSection />
        <NewsEvents />
        <RecentUpdates />
        <ProgramsSection />
        <GallerySection />
        <PartnersSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
