import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { CountUp } from "src/helper/CountUp";
import { TypewriterHeading } from "src/helper/TypewriterHeading";
import {
  getPublicHomepageStats,
  type PublicHomepageStat,
} from "src/services/publicHomepageStats.service";
import { Button } from "./ui/button";

const fallbackStats: PublicHomepageStat[] = [
  {
    id: "startups_incubated",
    key: "startups_incubated",
    label: "Startups Incubated",
    prefix: null,
    value: 75,
    decimals: 0,
    suffix: "+",
    order: 0,
    isActive: true,
  },
  {
    id: "funding_raised",
    key: "funding_raised",
    label: "Funding Raised",
    prefix: "Rs. ",
    value: 2.4,
    decimals: 2,
    suffix: " Cr",
    order: 1,
    isActive: true,
  },
  {
    id: "mentors",
    key: "mentors",
    label: "Mentors",
    prefix: null,
    value: 50,
    decimals: 0,
    suffix: "+",
    order: 2,
    isActive: true,
  },
  {
    id: "jobs_created",
    key: "jobs_created",
    label: "Jobs Created",
    prefix: null,
    value: 70,
    decimals: 0,
    suffix: "+",
    order: 3,
    isActive: true,
  },
];

const statColorClasses = ["text-primary", "text-secondary", "text-accent", "text-primary"];

export function HeroSection() {
  const [stats, setStats] = useState<PublicHomepageStat[]>(fallbackStats);

  useEffect(() => {
    let cancelled = false;

    const loadStats = async () => {
      try {
        const response = await getPublicHomepageStats();
        if (cancelled || response.length === 0) return;
        setStats(response);
      } catch {
        // Keep fallback homepage stats when the CMS endpoint is unavailable.
      }
    };

    void loadStats();

    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center pt-16 sm:pt-20 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1514063364532-5abd25e38290')] bg-cover bg-center opacity-5" />
      </div>

      <div className="absolute top-32 right-6 w-56 h-56 sm:w-72 sm:h-72 bg-secondary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-16 left-6 w-72 h-72 sm:w-96 sm:h-96 bg-accent/10 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 pt-3 sm:pt-2 bg-secondary/10 rounded-full mb-5 sm:mb-6">
            <span className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <span className="text-xs sm:text-sm text-foreground">
              Empowering Innovation Since 2020
            </span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-5xl mb-4 text-primary leading-tight">
            <TypewriterHeading
              text="Transforming Ideas Into Impact"
              highlight="Impact"
            />
          </h1>

          <p className="text-base sm:text-xl text-muted-foreground mb-8 sm:mb-10 max-w-3xl mx-auto leading-relaxed">
            CIED IUST is a premier incubation center fostering innovation,
            entrepreneurship, and sustainable growth in Kashmir&apos;s startup
            ecosystem
          </p>

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

          <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-6 mt-14 sm:mt-20 pt-8 sm:pt-10 border-t border-border">
            {stats.map((stat, index) => (
              <div className="text-center" key={stat.id || stat.key}>
                <div
                  className={`text-[1.65rem] sm:text-[2.5rem] lg:text-[3rem] font-extrabold ${statColorClasses[index % statColorClasses.length]} mb-1 whitespace-nowrap`}
                >
                  {stat.prefix}
                  <CountUp
                    value={stat.value}
                    decimals={stat.decimals}
                    suffix={stat.suffix || ""}
                  />
                </div>
                <div className="text-xs sm:text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
