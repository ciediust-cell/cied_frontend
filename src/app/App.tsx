import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ScrollToTop } from "src/helper/scrollToTop";
import Layout from "src/layout/Layout";
import Home from "src/pages/Home";

const AboutPage = lazy(() =>
  import("src/pages/AboutPage").then((module) => ({ default: module.AboutPage }))
);
const ComingSoonPage = lazy(() =>
  import("src/pages/ComingSoonPage").then((module) => ({
    default: module.ComingSoonPage,
  }))
);
const ContactPage = lazy(() =>
  import("src/pages/ContactPage").then((module) => ({
    default: module.ContactPage,
  }))
);
const EventsPage = lazy(() =>
  import("src/pages/EventsPage").then((module) => ({ default: module.EventsPage }))
);
const GalleryPage = lazy(() =>
  import("src/pages/GalleryPage").then((module) => ({ default: module.GalleryPage }))
);
const MembersPage = lazy(() =>
  import("src/pages/MembersPage").then((module) => ({ default: module.MembersPage }))
);
const NewsPage = lazy(() =>
  import("src/pages/NewsPage").then((module) => ({ default: module.NewsPage }))
);
const ProgramsPage = lazy(() =>
  import("src/pages/ProgramsPage").then((module) => ({ default: module.ProgramsPage }))
);
const RecognitionPage = lazy(() =>
  import("src/pages/RecognitionPage").then((module) => ({
    default: module.RecognitionPage,
  }))
);
const StartupPortfolioPage = lazy(() =>
  import("src/pages/StartupPortfolioPage").then((module) => ({
    default: module.StartupPortfolioPage,
  }))
);

function RouteFallback() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center px-4 py-16 text-muted-foreground">
      Loading...
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Suspense fallback={<RouteFallback />}>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/news" element={<NewsPage />} />
            <Route path="/events" element={<EventsPage />} />
            <Route path="/aboutUs" element={<AboutPage />} />
            <Route path="/programs" element={<ProgramsPage />} />
            <Route path="/portfolio" element={<StartupPortfolioPage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/recognition" element={<RecognitionPage />} />
            <Route path="/contactUs" element={<ContactPage />} />
            <Route path="/gallery" element={<GalleryPage />} />
            <Route path="/coming-soon" element={<ComingSoonPage />} />
          </Route>
        </Routes>
      </Suspense>
    </>
  );
}
