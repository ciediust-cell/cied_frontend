import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { CountUp } from "src/helper/CountUp";
import { TypewriterHeading } from "src/helper/TypewriterHeading";
import { Link } from "react-router-dom";

export function HeroSection() {
  return (
    <section className="relative min-h-[100svh] flex items-center justify-center pt-16 sm:pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514063364532-5abd25e38290')] bg-cover bg-center opacity-5" />
      </div>

      {/* Decorative shapes */}
      <div className="absolute top-32 right-6 w-56 h-56 sm:w-72 sm:h-72 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-16 left-6 w-72 h-72 sm:w-96 sm:h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 pt-3 sm:pt-2 bg-secondary/10 rounded-full mb-5 sm:mb-6">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm text-foreground">
              Empowering Innovation Since 2020
            </span>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-4xl lg:text-5xl mb-4 text-primary leading-tight">
            <TypewriterHeading
              text="Transforming Ideas Into Impact"
              highlight="Impact"
            />
          </h1>

          {/* Description */}
          <p className="text-base sm:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
            CIED IUST is a premier incubation center fostering innovation,
            entrepreneurship, and sustainable growth in Kashmir's startup
            ecosystem
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
            <Button
              asChild
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-10 sm:px-12 py-6 sm:py-7 text-lg sm:text-xl group w-full sm:w-auto min-w-[230px]"
            >
              <Link to="/programs">
                Explore Programs
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 mt-14 sm:mt-20 pt-8 sm:pt-10 border-t border-border">
            <div className="text-center">
              <div className="text-3xl sm:text-5xl font-extrabold text-primary mb-1">
                <CountUp value={50} suffix="+" />
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Startups Incubated
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl sm:text-5xl font-extrabold text-secondary mb-1">
                ₹<CountUp value={25} suffix="Cr+" />
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Funding Raised
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl sm:text-5xl font-extrabold text-accent mb-1">
                <CountUp value={100} suffix="+" />
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Mentors
              </div>
            </div>

            <div className="text-center">
              <div className="text-3xl sm:text-5xl font-extrabold text-primary mb-1">
                <CountUp value={200} suffix="+" />
              </div>
              <div className="text-xs sm:text-sm text-muted-foreground">
                Jobs Created
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
