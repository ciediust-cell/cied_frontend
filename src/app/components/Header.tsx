import { useState } from "react";
import { Menu, X } from "lucide-react";
import ciedLogo from "/ciedLogo.jpeg";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { name: "About", to: "/aboutUs" },
    { name: "Members", to: "/members" },
    { name: "Programs", to: "/programs" },
    { name: "News", to: "/news" },
    { name: "Events", to: "/events" },
    { name: "Gallery", to: "/gallery" },
    { name: "Portfolio", to: "/portfolio" },
    { name: "Contact", to: "/contactUs" },
  ];

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src={ciedLogo}
                alt="CIED IUST Foundation"
                className="h-11 sm:h-14 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.to}
                  className="text-foreground hover:text-primary transition-colors"
                >
                  {link.name}
                </Link>
              ))}
            </nav>

            {/* Mobile Toggle */}
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

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer */}
            <motion.div
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" as const }}
              className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-border"
            >
              <div className="flex items-center justify-between px-4 sm:px-6 h-16">
                <img
                  src={ciedLogo}
                  alt="CIED IUST Foundation"
                  className="h-11"
                />
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 rounded-lg hover:bg-muted transition"
                  aria-label="Close menu"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>

              <div className="px-6 py-6 flex flex-col gap-5">
                {navLinks.map((link, index) => (
                  <Link
                    key={index}
                    to={link.to}
                    onClick={() => setMobileOpen(false)}
                    className="text-lg text-primary hover:text-secondary transition-colors"
                  >
                    {link.name}
                  </Link>
                ))}

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

