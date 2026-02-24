import { Routes, Route, Navigate } from "react-router-dom";
import { ScrollToTop } from "src/helper/scrollToTop";
import Layout from "src/layout/Layout";
import { AboutPage } from "src/pages/AboutPage";
import { ComingSoonPage } from "src/pages/ComingSoonPage";
import { ContactPage } from "src/pages/ContactPage";
import { EventsPage } from "src/pages/EventsPage";
import { GalleryPage } from "src/pages/GalleryPage";
import Home from "src/pages/Home";
import { MembersRecognitionPage } from "src/pages/MembersRecognitionPage";
import { NewsPage } from "src/pages/NewsPage";
import { ProgramsPage } from "src/pages/ProgramsPage";
import { StartupPortfolioPage } from "src/pages/StartupPortfolioPage";
// import About from "./pages/About";
// import Programs from "./pages/Programs";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/news" element={<NewsPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/newsEvents" element={<Navigate to="/news" replace />} />
          <Route path="/aboutUs" element={<AboutPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/portfolio" element={<StartupPortfolioPage />} />
          <Route path="/members" element={<MembersRecognitionPage />} />
          <Route path="/team" element={<Navigate to="/members" replace />} />
          <Route path="/contactUs" element={<ContactPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/coming-soon" element={<ComingSoonPage />} />

          {/* Add more pages here */}
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/programs" element={<Programs />} /> */}
        </Route>
      </Routes>
    </>
  );
}
