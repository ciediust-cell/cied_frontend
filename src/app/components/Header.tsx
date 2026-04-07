import { useEffect, useRef, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import ciedLogo from "/ciedLogo.jpeg";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const primaryLinks = [
  { name: "About", to: "/aboutUs" },
  { name: "Programs", to: "/programs" },
  { name: "News", to: "/news" },
  { name: "Contact", to: "/contactUs" },
];

const moreLinks = [
  { name: "Members", to: "/members" },
  { name: "Recognition", to: "/recognition" },
  { name: "Events", to: "/events" },
  { name: "Gallery", to: "/gallery" },
  { name: "Portfolio", to: "/portfolio" },
];

export function Header() {
  const { pathname } = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopMoreOpen, setDesktopMoreOpen] = useState(false);
  const [mobileMoreOpen, setMobileMoreOpen] = useState(false);
  const desktopMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setDesktopMoreOpen(false);
    setMobileMoreOpen(false);
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!desktopMoreOpen) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!desktopMoreRef.current?.contains(event.target as Node)) {
        setDesktopMoreOpen(false);
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDesktopMoreOpen(false);
      }
    };

    window.addEventListener("mousedown", handlePointerDown);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("mousedown", handlePointerDown);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [desktopMoreOpen]);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20 sm:h-24">
            <Link to="/" className="flex items-center shrink-0">
              <img
                src={ciedLogo}
                alt="CIED IUST Foundation"
                className="h-14 sm:h-16 lg:h-[4.5rem] w-auto"
              />
            </Link>

            <nav className="hidden md:flex items-center gap-6 lg:gap-8">
              {primaryLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className="text-sm lg:text-base text-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}

              <div className="relative" ref={desktopMoreRef}>
                <button
                  type="button"
                  onClick={() => setDesktopMoreOpen((current) => !current)}
                  className="inline-flex items-center gap-2 text-sm lg:text-base text-foreground hover:text-primary transition-colors"
                  aria-haspopup="menu"
                  aria-expanded={desktopMoreOpen}
                >
                  More
                  <ChevronDown
                    className={`h-4 w-4 transition-transform ${
                      desktopMoreOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {desktopMoreOpen && (
                  <div
                    role="menu"
                    className="absolute right-0 top-full mt-3 min-w-[12rem] rounded-xl border border-border bg-white shadow-xl p-2"
                  >
                    {moreLinks.map((link) => (
                      <Link
                        key={link.to}
                        to={link.to}
                        role="menuitem"
                        className="block rounded-lg px-3 py-2 text-sm text-foreground hover:bg-muted hover:text-primary transition-colors"
                      >
                        {link.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </nav>

            <button
              onClick={() => setMobileOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-muted transition"
              aria-label="Open menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            <motion.div
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" as const }}
              className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border"
            >
              <div className="flex items-center justify-between px-4 sm:px-6 h-20">
                <img
                  src={ciedLogo}
                  alt="CIED IUST Foundation"
                  className="h-14 w-auto"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-muted transition"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="px-6 py-6 flex flex-col gap-3">
                {primaryLinks.map((link) => (
                  <Link
                    key={link.to}
                    to={link.to}
                    className="text-lg text-primary hover:text-secondary transition-colors py-1"
                  >
                    {link.name}
                  </Link>
                ))}

                <div className="pt-2 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setMobileMoreOpen((current) => !current)}
                    className="w-full flex items-center justify-between text-lg text-primary hover:text-secondary transition-colors py-1"
                    aria-expanded={mobileMoreOpen}
                  >
                    More
                    <ChevronDown
                      className={`h-5 w-5 transition-transform ${
                        mobileMoreOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {mobileMoreOpen && (
                    <div className="mt-3 pl-1 flex flex-col gap-3">
                      {moreLinks.map((link) => (
                        <Link
                          key={link.to}
                          to={link.to}
                          className="text-base text-muted-foreground hover:text-primary transition-colors"
                        >
                          {link.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
