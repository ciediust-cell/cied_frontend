import { Button } from "./ui/button";
import { ArrowRight, Target, Eye } from "lucide-react";
import { useInViewOnce } from "../../helper/useInViewOnce";
import { TypewriterText } from "src/helper/TypeWriterText";
import { Link } from "react-router-dom";

export function AboutSection() {
  const [titleRef, titleVisible] = useInViewOnce<HTMLHeadingElement>();

  return (
    <section id="about" className="py-24 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
              <span className="text-sm text-primary">About CIED IUST</span>
            </div>

            <h2 ref={titleRef} className="text-2xl font-bold text-primary mb-6">
              {titleVisible && (
                <TypewriterText text="Building Kashmir's Innovation Ecosystem" />
              )}
            </h2>

            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              The Center for Innovation, Entrepreneurship and Development (CIED)
              at Islamic University of Science and Technology is a pioneering
              initiative aimed at fostering innovation and entrepreneurship in
              Jammu & Kashmir.
            </p>

            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              We provide comprehensive support to startups through mentorship,
              funding assistance, infrastructure, and networking opportunities,
              creating a vibrant ecosystem for innovators and entrepreneurs.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              <div className="flex gap-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center">
                  <Target className="h-6 w-6 text-secondary" />
                </div>
                <div>
                  <h4 className="mb-2 text-primary">Our Mission</h4>
                  <p className="text-sm text-muted-foreground">
                    Empower innovators to build sustainable, scalable ventures
                    that create lasting impact
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Eye className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <h4 className="mb-2 text-primary">Our Vision</h4>
                  <p className="text-sm text-muted-foreground">
                    Be the catalyst for Kashmir's transformation into a thriving
                    startup hub.
                  </p>
                </div>
              </div>
            </div>

            <Button asChild className="bg-primary hover:bg-primary/90 group">
              <Link to="/aboutUs">
                Read More About Us
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>

          <div className="relative">
            <div className="absolute -top-3 -left-3 sm:-top-6 sm:-left-6 w-full h-full border-4 border-secondary/20 rounded-2xl" />
            <img
              src="https://images.unsplash.com/photo-1680226425348-cedaf70ec06d"
              alt="IUST Campus"
              className="relative rounded-2xl shadow-2xl w-full h-72 sm:h-[420px] lg:h-[500px] object-cover"
            />
            <div className="absolute -bottom-4 -right-4 sm:-bottom-8 sm:-right-8 bg-primary text-white p-4 sm:p-8 rounded-2xl shadow-xl">
              <div className="text-2xl sm:text-4xl mb-1 sm:mb-2">5+</div>
              <div className="text-sm">Years of Excellence</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
