import { Outlet } from "react-router-dom";
import { Header } from "src/app/components/Header";
import { Footer } from "src/app/components/Footer";

const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
