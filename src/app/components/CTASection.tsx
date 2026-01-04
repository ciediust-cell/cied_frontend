import { Button } from "./ui/button";
import { ArrowRight, Send } from "lucide-react";

export function CTASection() {
  return (
    <section
      id="contact"
      className="py-24 bg-gradient-to-br from-primary via-primary to-primary/90 text-white relative overflow-hidden"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-secondary/20 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-block px-4 py-2 bg-white/10 rounded-full mb-6">
            <span className="text-sm">Join Our Ecosystem</span>
          </div>

          <h2 className="text-4xl sm:text-5xl lg:text-6xl mb-6 text-shadow-amber-600">
            Ready to Transform Your Idea?
          </h2>

          <p className="text-xl mb-10 opacity-90 max-w-2xl mx-auto leading-relaxed">
            Whether you're a budding entrepreneur or an established startup
            looking to scale, CIED IUST is here to support your journey. Let's
            build the future together.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              className="bg-secondary hover:bg-secondary/90 text-white px-8 py-6 text-lg group"
            >
              Get in Touch
              <Send className="ml-2 h-5 w-5 group-hover:rotate-12 transition-transform" />
            </Button>
          </div>

          {/* Contact Info Cards */}
          <div className="grid sm:grid-cols-3 gap-6 mt-16">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-2">📧</div>
              <div className="text-sm opacity-70 mb-1">Email Us</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-2">📞</div>
              <div className="text-sm opacity-70 mb-1">Call Us</div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <div className="text-3xl mb-2">📍</div>
              <div className="text-sm opacity-70 mb-1">Visit Us</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
