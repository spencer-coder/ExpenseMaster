import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {
  // The landing page carries its own minimal header; the app navbar would put
  // profile and logout controls on a page that is not the app.
  const isLanding = useLocation().pathname === "/";

  return (
    <div>
      {!isLanding && <Navbar />}
      {children}
    </div>
  );
}

export default MainLayout;
