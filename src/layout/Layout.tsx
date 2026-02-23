import { Outlet } from "react-router-dom";
import { Header } from "src/app/components/Header";
import { Footer } from "src/app/components/Footer";
import { StructuredData } from "src/app/components/seo/StructuredData";
import { SeoManager } from "src/helper/SeoManager";
import {
  buildOrganizationJsonLd,
  buildWebsiteJsonLd,
} from "src/helper/structuredData";

const Layout: React.FC = () => {
  const organizationJsonLd = buildOrganizationJsonLd();
  const websiteJsonLd = buildWebsiteJsonLd();

  return (
    <>
      <SeoManager />
      <StructuredData id="organization-jsonld" data={organizationJsonLd} />
      <StructuredData id="website-jsonld" data={websiteJsonLd} />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
