// ScrollToTop.js
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = ({ children }) => {
  const { pathname } = useLocation();

  useEffect(() => {
    const noScrollRoutes = [
      "/your-route-1",
      // Add other routes that should not scroll to the top
    ];

    if (!noScrollRoutes.includes(pathname)) {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return children;
};

export default ScrollToTop;
