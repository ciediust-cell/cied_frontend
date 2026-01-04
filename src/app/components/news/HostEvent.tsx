import { Button } from "../ui/button";
import { Calendar, Check, ArrowRight } from "lucide-react";

export function HostEvent() {
  return (
    <section className="py-16 sm:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/10 rounded-xl mb-4">
              <Calendar className="h-8 w-8 text-secondary" />
            </div>
            <h2 className="text-3xl sm:text-4xl text-primary mb-4">
              Host an Event at CIED
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our state-of-the-art facilities are perfect for workshops,
              conferences, and community events
            </p>
          </div>

          {/* Two-Column Layout (Alternating) */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Left: Image */}
            <div>
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800"
                  alt="CIED Event Space"
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-secondary/20 to-transparent"></div>
              </div>
            </div>

            {/* Right: Content */}
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl mb-4 text-primary">
                  Event Types We Support
                </h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-secondary/20 text-secondary rounded-full flex items-center justify-center mt-0.5">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-foreground">
                        Workshops & Training Sessions
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Skill development programs and hands-on learning
                        experiences
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-secondary/20 text-secondary rounded-full flex items-center justify-center mt-0.5">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-foreground">
                        Seminars & Conferences
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Academic and industry conferences with professional
                        setup
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-secondary/20 text-secondary rounded-full flex items-center justify-center mt-0.5">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-foreground">
                        Demo Days & Pitch Events
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Showcase your startup to investors and stakeholders
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-secondary/20 text-secondary rounded-full flex items-center justify-center mt-0.5">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-foreground">
                        Hackathons & Competitions
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Innovation challenges with technical infrastructure
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 bg-secondary/20 text-secondary rounded-full flex items-center justify-center mt-0.5">
                      <Check className="h-4 w-4" />
                    </div>
                    <div>
                      <div className="text-foreground">Networking Sessions</div>
                      <p className="text-sm text-muted-foreground">
                        Community meetups and founder networking events
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <h4 className="mb-3 text-primary">Venue Capacity & Support</h4>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Our multipurpose hall can accommodate up to 200 attendees with
                  flexible seating arrangements. We provide complete AV support,
                  high-speed internet, refreshment facilities, and dedicated
                  event coordination assistance.
                </p>

                <Button
                  size="lg"
                  className="bg-secondary hover:bg-secondary/90 text-white group"
                >
                  Host an Event
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
