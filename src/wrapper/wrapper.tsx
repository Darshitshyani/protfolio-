import Footer from "@/components/shared/footer/Footer";
import Topbar from "@/components/shared/topbar";
import React from "react";
const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Topbar />
      {children}
      <Footer />
    </div>
  );
};

export default Wrapper;
