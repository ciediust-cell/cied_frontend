import { ArrowUpRight, Quote } from "lucide-react";
import { RotatingTypewriterHeading } from "src/helper/RotatingTypewriterHeading";
import { Card, CardContent } from "./ui/card";

const testimonials = [
  {
    name: "Rahul Sharma",
    role: "Founder, TechVenture",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    quote:
      "CIED IUST provided us with the perfect ecosystem to grow. The mentorship and resources were invaluable in our journey from idea to a successful venture.",
  },
  {
    name: "Priya Malhotra",
    role: "CEO, GreenStart",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150",
    quote:
      "The incubation program at CIED helped us refine our business model and connect with investors. We couldn't have asked for a better launchpad.",
  },
  {
    name: "Arjun Mehta",
    role: "Co-founder, AgriTech Solutions",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    quote:
      "From workspace to legal support, CIED offers everything a startup needs. The community here is incredibly supportive and collaborative.",
  },
];

const partners = [
  {
    name: "IIT Delhi",
    href: "https://home.iitd.ac.in/",
    description: "Academic innovation partner",
  },
  {
    name: "NASSCOM",
    href: "https://nasscom.in/",
    description: "Technology ecosystem partner",
  },
  {
    name: "Startup India",
    href: "https://www.startupindia.gov.in/",
    description: "National startup initiative",
  },
  {
    name: "Google",
    href: "https://www.google.com/",
    description: "Technology partner",
  },
  {
    name: "Microsoft",
    href: "https://www.microsoft.com/en-us/",
    description: "Cloud and productivity partner",
  },
  {
    name: "AWS",
    href: "https://aws.amazon.com/",
    description: "Cloud infrastructure partner",
  },
] as const;

function PartnerLogo({ name }: { name: (typeof partners)[number]["name"] }) {
  switch (name) {
    case "Google":
      return (
        <div
          className="flex items-baseline text-[1.9rem] font-semibold tracking-tight"
          aria-hidden="true"
        >
          <span style={{ color: "#4285F4" }}>G</span>
          <span style={{ color: "#EA4335" }}>o</span>
          <span style={{ color: "#FBBC05" }}>o</span>
          <span style={{ color: "#4285F4" }}>g</span>
          <span style={{ color: "#34A853" }}>l</span>
          <span style={{ color: "#EA4335" }}>e</span>
        </div>
      );
    case "Microsoft":
      return (
        <div className="flex items-center gap-3" aria-hidden="true">
          <div className="grid grid-cols-2 gap-1">
            <span className="h-3.5 w-3.5 bg-[#F25022]" />
            <span className="h-3.5 w-3.5 bg-[#7FBA00]" />
            <span className="h-3.5 w-3.5 bg-[#00A4EF]" />
            <span className="h-3.5 w-3.5 bg-[#FFB900]" />
          </div>
          <span className="text-[1.45rem] font-semibold tracking-tight text-[#5E5E5E]">
            Microsoft
          </span>
        </div>
      );
    case "AWS":
      return (
        <div className="flex flex-col items-center" aria-hidden="true">
          <span className="text-[1.7rem] font-bold tracking-tight text-[#232F3E]">
            aws
          </span>
          <span className="mt-1 h-1.5 w-14 rounded-full bg-[#FF9900]" />
        </div>
      );
    case "Startup India":
      return (
        <div className="text-center leading-none" aria-hidden="true">
          <div className="text-[1.1rem] font-semibold tracking-[0.18em] text-[#1C75BC] uppercase">
            Startup
          </div>
          <div className="mt-1 text-[1.45rem] font-bold tracking-[0.22em] text-[#1FAA59] uppercase">
            India
          </div>
        </div>
      );
    case "NASSCOM":
      return (
        <div className="text-center" aria-hidden="true">
          <span className="text-[1.45rem] font-bold tracking-[0.22em] text-[#1E5AA8] uppercase">
            NASSCOM
          </span>
        </div>
      );
    case "IIT Delhi":
      return (
        <div className="text-center leading-tight" aria-hidden="true">
          <div className="text-[1.35rem] font-bold tracking-[0.28em] text-[#7A0019] uppercase">
            IIT
          </div>
          <div className="mt-1 text-sm font-semibold tracking-[0.28em] text-[#B8860B] uppercase">
            Delhi
          </div>
        </div>
      );
    default:
      return null;
  }
}

export function PartnersSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-20">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-block px-4 py-2 bg-accent/10 rounded-full mb-6">
              <span className="text-sm text-accent">Success Stories</span>
            </div>
            <h2 className="text-4xl sm:text-5xl mb-6 text-primary">
              What Our Incubatees Say
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card
                key={index}
                className="border-none shadow-lg hover:shadow-xl transition-shadow"
              >
                <CardContent className="p-8">
                  <Quote className="h-10 w-10 text-secondary mb-4" />
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-primary">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <div className="text-center mb-12">
            <div className="text-3xl mb-4 text-primary">
              <RotatingTypewriterHeading />
            </div>
            <p className="text-muted-foreground">
              Collaborating with leading organizations to build a stronger
              ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {partners.map((partner) => (
              <a
                key={partner.name}
                href={partner.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit ${partner.name} official website`}
                className="group block h-full rounded-2xl border border-border bg-white p-6 shadow-md transition-all hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex min-h-[9rem] flex-col justify-between gap-5">
                  <div className="flex min-h-[4.5rem] items-center justify-center">
                    <PartnerLogo name={partner.name} />
                  </div>

                  <div className="flex items-center justify-between gap-3 border-t border-border/70 pt-4">
                    <div>
                      <p className="text-sm font-medium text-primary">
                        {partner.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {partner.description}
                      </p>
                    </div>
                    <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/8 text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                      <ArrowUpRight className="h-4 w-4" />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
