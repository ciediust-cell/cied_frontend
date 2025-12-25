import { Menu } from "lucide-react";
import { Button } from "./ui/button";
import ciedLogo from "/ciedLogo.jpeg";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link to={"/"}>
            <div className="flex items-center">
              <img
                src={ciedLogo}
                alt="CIED IUST Foundation"
                className="h-14 w-auto"
              />
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#about"
              className="text-foreground hover:text-primary transition-colors"
            >
              About
            </a>
            <a
              href="#programs"
              className="text-foreground hover:text-primary transition-colors"
            >
              Programs
            </a>
            <a
              href="#updates"
              className="text-foreground hover:text-primary transition-colors"
            >
              Updates
            </a>
            <a
              href="#news"
              className="text-foreground hover:text-primary transition-colors"
            >
              News
            </a>
            <a
              href="#gallery"
              className="text-foreground hover:text-primary transition-colors"
            >
              Gallery
            </a>
            <a
              href="#contact"
              className="text-foreground hover:text-primary transition-colors"
            >
              Contact
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="outline"
              className="border-primary text-primary hover:bg-primary hover:text-white"
            >
              Login
            </Button>
            <Button className="bg-secondary hover:bg-secondary/90">
              Apply Now
            </Button>
          </div>

          <Button variant="ghost" size="icon" className="md:hidden">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </header>
  );
}
