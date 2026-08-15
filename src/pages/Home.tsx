import { lazy, Suspense, useEffect, useState } from "react";
import { AboutSection } from "../app/components/AboutSection";
import { HeroSection } from "../app/components/HeroSection";
import { KeyHighlights } from "../app/components/KeyHighlights";
import { NewsEvents } from "../app/components/NewsEvents";
import { useInViewOnce } from "../helper/useInViewOnce";
import {
  DEFAULT_HOMEPAGE_STATS,
  getPublicHomepageStats,
  type PublicHomepageStat,
} from "../services/publicHomepageStats.service";

const ProgramsSection = lazy(() =>
  import("../app/components/ProgramsSection").then((module) => ({
    default: module.ProgramsSection,
  }))
);
const WorkshopsSection = lazy(() =>
  import("../app/components/WorkshopsSection").then((module) => ({
    default: module.WorkshopsSection,
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
const CollaboratorsSection = lazy(() =>
  import("../app/components/CollaboratorsSection").then((module) => ({
    default: module.CollaboratorsSection,
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
  const [stats, setStats] = useState<PublicHomepageStat[]>(DEFAULT_HOMEPAGE_STATS);

  useEffect(() => {
    let cancelled = false;

    const loadStats = async () => {
      try {
        const response = await getPublicHomepageStats();
        if (cancelled || response.length === 0) return;
        setStats(response);
      } catch {
        // Keep default homepage stats when the CMS endpoint is unavailable.
      }
    };

    void loadStats();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <div className="min-h-screen">
      <main>
        <HeroSection stats={stats} />
        <KeyHighlights stats={stats} />
        <AboutSection />
        <NewsEvents />
        <DeferredHomeSection minHeightClassName="min-h-[40rem]">
          <WorkshopsSection />
        </DeferredHomeSection>
        <DeferredHomeSection minHeightClassName="min-h-[38rem]">
          <ProgramsSection />
        </DeferredHomeSection>
        <DeferredHomeSection minHeightClassName="min-h-[42rem]">
          <GallerySection />
        </DeferredHomeSection>
        <DeferredHomeSection minHeightClassName="min-h-[32rem]">
          <PartnersSection />
        </DeferredHomeSection>
        <DeferredHomeSection minHeightClassName="min-h-[44rem]">
          <CollaboratorsSection />
        </DeferredHomeSection>
        <DeferredHomeSection minHeightClassName="min-h-[18rem]">
          <CTASection />
        </DeferredHomeSection>
      </main>
    </div>
  );
}
