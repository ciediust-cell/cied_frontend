import { RotatingTypewriterHeading } from "src/hooks/RotatingTypewriterHeading";
import { Card, CardContent } from "./ui/card";
import { Quote } from "lucide-react";

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
  { name: "IIT Delhi", logo: "IIT" },
  { name: "NASSCOM", logo: "NASSCOM" },
  { name: "StartupIndia", logo: "StartupIndia" },
  { name: "Google", logo: "Google" },
  { name: "Microsoft", logo: "Microsoft" },
  { name: "AWS", logo: "AWS" },
];

export function PartnersSection() {
  return (
    <section className="py-24 bg-gradient-to-b from-muted/30 to-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Testimonials */}
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

        {/* Partners */}
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

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
            {partners.map((partner, index) => (
              <div
                key={index}
                className="flex items-center justify-center h-24 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border border-border"
              >
                <span className="text-2xl text-muted-foreground/50">
                  {partner.logo}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
