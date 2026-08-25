import AmbientBackground from "@/components/shared/backgrounds/AmbientBackground";
import Footer from "@/components/shared/footer/Footer";
import GetTouch from "@/components/shared/GetTouch";
import Topbar from "@/components/shared/topbar";
import React from "react";

/**
 * The page scrolls natively. GSAP ScrollSmoother was removed — its momentum
 * read as lag, and it cost ~50 kB on every route.
 *
 * Parallax and the giant word drift survive: they are computed from each
 * element's own scroll progress via motion's useScroll (see
 * @/components/shared/scroll), which is already bundled for entrance
 * animations. Nothing hijacks the wheel any more.
 */
const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative w-full">
      <AmbientBackground />
      <Topbar />
      <div className="relative z-10">
        {children}
        <GetTouch />
        <Footer />
      </div>
    </div>
  );
};

export default Wrapper;
