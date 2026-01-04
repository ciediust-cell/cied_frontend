import { Routes, Route } from "react-router-dom";
import { ScrollToTop } from "src/helper/scrollToTop";
import Layout from "src/layout/Layout";
import { AboutPage } from "src/pages/AboutPage";
import { ContactPage } from "src/pages/ContactPage";
import { GalleryPage } from "src/pages/GalleryPage";
import Home from "src/pages/Home";

import { NewsEventsPage } from "src/pages/NewsEventsPage";
import { ProgramsPage } from "src/pages/ProgramsPage";
import { StartupPortfolioPage } from "src/pages/StartupPortfolioPage";
import { TeamLeadershipPage } from "src/pages/TeamLeadership";
// import About from "./pages/About";
// import Programs from "./pages/Programs";

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/newsEvents" element={<NewsEventsPage />} />
          <Route path="/aboutUs" element={<AboutPage />} />
          <Route path="/programs" element={<ProgramsPage />} />
          <Route path="/portfolio" element={<StartupPortfolioPage />} />
          <Route path="/team" element={<TeamLeadershipPage />} />
          <Route path="/contactUs" element={<ContactPage />} />
          <Route path="/gallery" element={<GalleryPage />} />

          {/* Add more pages here */}
          {/* <Route path="/about" element={<About />} /> */}
          {/* <Route path="/programs" element={<Programs />} /> */}
        </Route>
      </Routes>
    </>
  );
}
