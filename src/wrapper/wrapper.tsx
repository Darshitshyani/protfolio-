import Footer from "@/components/shared/footer/Footer";
import GetTouch from "@/components/shared/GetTouch";
import Topbar from "@/components/shared/topbar";
import React from "react";
const Wrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen w-screen overflow-hidden relative top-0  ">
      <Topbar />
      {children}
      <GetTouch />
      <Footer />
    </div>
  );
};

export default Wrapper;
