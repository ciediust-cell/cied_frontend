import { Outlet } from "react-router-dom";
import { Header } from "src/app/components/Header";
import { Footer } from "src/app/components/Footer";
import { SeoManager } from "src/helper/SeoManager";

const Layout: React.FC = () => {
  return (
    <>
      <SeoManager />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
