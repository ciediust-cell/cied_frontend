import {
  Instagram,
  Twitter,
  Linkedin,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
const logo =
  " [url=https://ibb.co/WvkTGK40][img]https://i.ibb.co/HTtJBgfC/cied-logo.jpg[/img][/url]";

export function Footer() {
  return (
    <footer className="bg-primary text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* About */}
          <div>
            <img
              src={logo}
              alt="CIED IUST"
              className="h-12 w-auto mb-4 brightness-0 invert"
            />
            <p className="text-white/70 text-sm leading-relaxed">
              Empowering innovation and entrepreneurship at Islamic University
              of Science and Technology, building Kashmir's startup ecosystem.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4">Quick Links</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#about"
                  className="text-white/70 hover:text-secondary transition-colors"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#programs"
                  className="text-white/70 hover:text-secondary transition-colors"
                >
                  Programs
                </a>
              </li>
              <li>
                <a
                  href="#updates"
                  className="text-white/70 hover:text-secondary transition-colors"
                >
                  Updates
                </a>
              </li>
              <li>
                <a
                  href="#news"
                  className="text-white/70 hover:text-secondary transition-colors"
                >
                  News & Events
                </a>
              </li>
              <li>
                <a
                  href="#gallery"
                  className="text-white/70 hover:text-secondary transition-colors"
                >
                  Gallery
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="mb-4">Resources</h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-secondary transition-colors"
                >
                  Apply Now
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-secondary transition-colors"
                >
                  Mentor Network
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-secondary transition-colors"
                >
                  Success Stories
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-secondary transition-colors"
                >
                  FAQs
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/70 hover:text-secondary transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4">Get in Touch</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                <span className="text-white/70">
                  Islamic University of Science & Technology, Awantipora,
                  Kashmir
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-secondary flex-shrink-0" />
                <span className="text-white/70">+91 1234 567 890</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-secondary flex-shrink-0" />
                <span className="text-white/70">contact@cied-iust.edu</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-white/70">
            © 2025 CIED IUST Foundation. All rights reserved.
          </p>

          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href="#"
              className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <Linkedin className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
