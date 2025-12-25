import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ScrollToTop } from "src/hooks/scrollToTop";
import Home from "src/pages/Home";
import { NewsEventsPage } from "src/pages/NewsEventsPage";
// import About from "./pages/About";
// import Programs from "./pages/Programs";

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/newsEvents" element={<NewsEventsPage />} />
        {/* Add more pages here */}
        {/* <Route path="/about" element={<About />} /> */}
        {/* <Route path="/programs" element={<Programs />} /> */}
      </Routes>
    </BrowserRouter>
  );
}
