import { Link } from "react-router-dom";

export function ComingSoonPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      <main className="pt-16 sm:pt-20">
        <section className="bg-gradient-to-b from-primary/5 to-white py-20 sm:py-28">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl sm:text-5xl mb-4 text-primary">
                Coming Soon
              </h1>
              <p className="text-base sm:text-lg text-muted-foreground mb-8">
                This section is under development and will be available shortly.
              </p>
              <Link
                to="/"
                className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-white hover:bg-primary/90 transition-colors"
              >
                Back to Home
              </Link>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
