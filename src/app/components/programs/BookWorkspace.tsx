import { useState } from "react";
import { Button } from "../ui/button";
import { Briefcase, Check, ArrowRight } from "lucide-react";
import { QuickEnquiryModal } from "../enquiry/QuickEnquiryModal";

export function BookWorkspace() {
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  return (
    <>
      <section className="py-16 sm:py-20 bg-gradient-to-b from-primary/5 to-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            {/* Section Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-accent/10 rounded-xl mb-4">
                <Briefcase className="h-8 w-8 text-accent" />
              </div>
              <h2 className="text-3xl sm:text-4xl text-primary mb-4">
                Book Your Working Space
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Access world-class facilities designed to accelerate your startup
                journey
              </p>
            </div>

            {/* Two-Column Layout */}
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              {/* Left: Content */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl mb-4 text-primary">
                    Available Facilities
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-accent/20 text-accent rounded-full flex items-center justify-center mt-0.5">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-foreground">
                          Dedicated Workstations
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Fully equipped desks with high-speed internet and power
                          backup
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-accent/20 text-accent rounded-full flex items-center justify-center mt-0.5">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-foreground">Meeting Rooms</div>
                        <p className="text-sm text-muted-foreground">
                          Conference rooms with AV equipment for presentations
                          and discussions
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-accent/20 text-accent rounded-full flex items-center justify-center mt-0.5">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-foreground">Incubation Cabins</div>
                        <p className="text-sm text-muted-foreground">
                          Private cabins for growing teams with secure access
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-accent/20 text-accent rounded-full flex items-center justify-center mt-0.5">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-foreground">
                          Collaboration Areas
                        </div>
                        <p className="text-sm text-muted-foreground">
                          Open spaces for networking, brainstorming, and informal
                          meetings
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-accent/20 text-accent rounded-full flex items-center justify-center mt-0.5">
                        <Check className="h-4 w-4" />
                      </div>
                      <div>
                        <div className="text-foreground">Prototyping Lab</div>
                        <p className="text-sm text-muted-foreground">
                          Access to tools and equipment for product development
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4">
                  <h4 className="mb-3 text-primary">Eligibility</h4>
                  <p className="text-muted-foreground leading-relaxed mb-6">
                    Available for incubated startups, IUST students working on
                    entrepreneurial projects, and pre-incubation candidates.
                    Flexible booking options including hourly, daily, and
                    monthly plans.
                  </p>

                  <Button
                    size="lg"
                    className="bg-accent hover:bg-accent/90 text-white group"
                    onClick={() => setEnquiryOpen(true)}
                  >
                    Book Now
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>

              {/* Right: Image */}
              <div className="order-first lg:order-last">
                <div className="relative rounded-2xl overflow-hidden shadow-xl border-4 border-white">
                  <img
                    src="https://images.unsplash.com/photo-1560821630-1a7c45c3286e?w=800"
                    alt="CIED Working Space"
                    className="w-full h-[400px] lg:h-[500px] object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <QuickEnquiryModal
        open={enquiryOpen}
        onOpenChange={setEnquiryOpen}
        title="Book Your Working Space"
        description="Send your workspace requirement and we will reach out shortly."
        subject="workspace"
        messagePlaceholder="Tell us what type of space you need and your preferred timeline."
        submitLabel="Submit Booking Enquiry"
      />
    </>
  );
}
