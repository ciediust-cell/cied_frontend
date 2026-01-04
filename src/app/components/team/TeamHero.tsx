import { Users } from "lucide-react";

export function TeamHero() {
  return (
    <section className="relative bg-gradient-to-b from-primary/5 via-white to-white py-20 sm:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl mb-6">
            <Users className="h-10 w-10 text-primary" />
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl mb-6 text-primary">
            Team & Leadership
          </h1>

          {/* Subheading */}
          <p className="text-xl sm:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            Meet the leadership and team driving innovation at CIED IUST
          </p>
        </div>
      </div>
    </section>
  );
}
