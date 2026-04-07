import {
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { Link } from "react-router-dom";
import ciedLogo from "/ciedLogo.jpeg";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const socialLinks = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/cied_iust/",
      icon: Instagram,
    },
    {
      label: "Twitter",
      href: "https://x.com/CIED_IUST",
      icon: Twitter,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/ciediust/",
      icon: Linkedin,
    },
  ];

  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-12">
          {/* Logo + About */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex">
              <img
                src={ciedLogo}
                alt="CIED IUST Foundation"
                className="h-11 sm:h-14 w-auto"
              />
            </Link>
            <p className="text-white/70 text-sm leading-relaxed max-w-sm">
              Empowering innovation and entrepreneurship at Islamic University
              of Science and Technology, building Kashmir&apos;s startup
              ecosystem.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/aboutUs"
                  className="text-white/70 hover:text-secondary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/programs"
                  className="text-white/70 hover:text-secondary transition-colors"
                >
                  Programs
                </Link>
              </li>
              <li>
                <Link
                  to="/members"
                  className="text-white/70 hover:text-secondary transition-colors"
                >
                  Members
                </Link>
              </li>
              <li>
                <Link
                  to="/recognition"
                  className="text-white/70 hover:text-secondary transition-colors"
                >
                  Recognition
                </Link>
              </li>
              <li>
                <Link
                  to="/news"
                  className="text-white/70 hover:text-secondary transition-colors"
                >
                  News
                </Link>
              </li>
              <li>
                <Link
                  to="/events"
                  className="text-white/70 hover:text-secondary transition-colors"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  to="/portfolio"
                  className="text-white/70 hover:text-secondary transition-colors"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  to="/contactUs"
                  className="text-white/70 hover:text-secondary transition-colors"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4 text-lg">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  to="/coming-soon"
                  className="text-white/70 hover:text-secondary transition-colors"
                >
                  Mentor Network
                </Link>
              </li>
              <li>
                <Link
                  to="/coming-soon"
                  className="text-white/70 hover:text-secondary transition-colors"
                >
                  Success Stories
                </Link>
              </li>
              <li>
                <Link
                  to="/coming-soon"
                  className="text-white/70 hover:text-secondary transition-colors"
                >
                  FAQs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-lg">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary mt-0.5 flex-shrink-0" />
                <span className="text-white/70">
                  Islamic University of Science & Technology, Awantipora,
                  Kashmir
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-secondary flex-shrink-0" />
                <a
                  href="tel:+911933247954"
                  className="text-white/70 hover:text-secondary transition-colors"
                >
                  Office Contact: +91 (01933) 247954
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-secondary flex-shrink-0" />
                <a
                  href="mailto:cied@iust.ac.in"
                  className="text-white/70 hover:text-secondary transition-colors"
                >
                  cied@iust.ac.in
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs sm:text-sm text-white/70 text-center sm:text-left">
            &copy; {currentYear} CIED IUST Foundation. All rights reserved.
          </p>

          {socialLinks.length > 0 && (
            <div className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-secondary transition-colors"
                    aria-label={`Visit CIED on ${link.label}`}
                  >
                    <Icon className="h-5 w-5" />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </footer>
  );
}
