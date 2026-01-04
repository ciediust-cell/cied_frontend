import { ContactForm } from "src/app/components/contact/ContactForm";
import { ContactHero } from "src/app/components/contact/ContactHero";
import { ContactInfo } from "src/app/components/contact/ContactInfo";
import { LocationMap } from "src/app/components/contact/LocationMap";

export function ContactPage() {
  return (
    <div className="min-h-screen bg-white">
      <main className="pt-20">
        <ContactHero />
        <ContactInfo />
        <ContactForm />
        <LocationMap />
      </main>
    </div>
  );
}
