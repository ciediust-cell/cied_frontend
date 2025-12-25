import { Button } from "./ui/button";
import { ArrowRight } from "lucide-react";
import { CountUp } from "src/hooks/CountUp";
import { TypewriterHeading } from "src/hooks/TypewriterHeading";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514063364532-5abd25e38290')] bg-cover bg-center opacity-5" />
      </div>

      {/* Decorative shapes */}
      <div className="absolute top-40 right-10 w-72 h-72 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full mb-6">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-sm text-foreground">
              Empowering Innovation Since 2020
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl mb-4 text-primary">
            <TypewriterHeading
              text="Transforming Ideas Into Impact"
              highlight="Impact"
            />
          </h1>

          <p className="text-xl sm:text-2xl text-muted-foreground mb-10 max-w-3xl mx-auto leading-relaxed">
            CIED IUST is a premier incubation center fostering innovation,
            entrepreneurship, and sustainable growth in Kashmir's startup
            ecosystem
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-6 text-lg group"
            >
              Explore Programs
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-primary text-primary hover:bg-primary hover:text-white px-8 py-6 text-lg"
            >
              Learn More
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t border-border">
            <div>
              <div className="text-4xl text-primary mb-2">
                <CountUp value={50} suffix="+" />
              </div>
              <div className="text-sm text-muted-foreground">
                Startups Incubated
              </div>
            </div>

            <div>
              <div className="text-4xl text-secondary mb-2">
                ₹<CountUp value={25} suffix="Cr+" />
              </div>
              <div className="text-sm text-muted-foreground">
                Funding Raised
              </div>
            </div>

            <div>
              <div className="text-4xl text-accent mb-2">
                <CountUp value={100} suffix="+" />
              </div>
              <div className="text-sm text-muted-foreground">Mentors</div>
            </div>

            <div>
              <div className="text-4xl text-primary mb-2">
                <CountUp value={200} suffix="+" />
              </div>
              <div className="text-sm text-muted-foreground">Jobs Created</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
