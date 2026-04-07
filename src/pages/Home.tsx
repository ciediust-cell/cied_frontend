import { lazy, Suspense } from "react";
import { AboutSection } from "../app/components/AboutSection";
import { HeroSection } from "../app/components/HeroSection";
import { KeyHighlights } from "../app/components/KeyHighlights";
import { NewsEvents } from "../app/components/NewsEvents";
import { useInViewOnce } from "../helper/useInViewOnce";

const ProgramsSection = lazy(() =>
  import("../app/components/ProgramsSection").then((module) => ({
    default: module.ProgramsSection,
  }))
);
const GallerySection = lazy(() =>
  import("../app/components/GallerySection").then((module) => ({
    default: module.GallerySection,
  }))
);
const PartnersSection = lazy(() =>
  import("../app/components/PartnersSection").then((module) => ({
    default: module.PartnersSection,
  }))
);
const CTASection = lazy(() =>
  import("../app/components/CTASection").then((module) => ({
    default: module.CTASection,
  }))
);

function DeferredHomeSection({
  minHeightClassName,
  children,
}: {
  minHeightClassName: string;
  children: React.ReactNode;
}) {
  const [ref, isVisible] = useInViewOnce<HTMLDivElement>({
    rootMargin: "300px 0px",
    threshold: 0.01,
  });

  return (
    <div ref={ref}>
      {isVisible ? (
        <Suspense
          fallback={
            <div
              className={`flex items-center justify-center px-4 text-muted-foreground ${minHeightClassName}`}
            >
              Loading section...
            </div>
          }
        >
          {children}
        </Suspense>
      ) : (
        <div className={minHeightClassName} />
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen">
      <main>
        <HeroSection />
        <KeyHighlights />
        <AboutSection />
        <NewsEvents />
        <DeferredHomeSection minHeightClassName="min-h-[38rem]">
          <ProgramsSection />
        </DeferredHomeSection>
        <DeferredHomeSection minHeightClassName="min-h-[42rem]">
          <GallerySection />
        </DeferredHomeSection>
        <DeferredHomeSection minHeightClassName="min-h-[32rem]">
          <PartnersSection />
        </DeferredHomeSection>
        <DeferredHomeSection minHeightClassName="min-h-[18rem]">
          <CTASection />
        </DeferredHomeSection>
      </main>
    </div>
  );
}
