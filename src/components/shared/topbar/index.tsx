import React from "react";
import CustomButton from "../CustomButton";
import { MainLogo } from "@/untils/images";
import Image from "next/image";

const Topbar = () => {
  return (
    <div className="w-full h-[80px] shadow border border-black-200 flex justify-between items-center px-3 bg-inherit  fixed z-50">
      <div>
        <Image src={MainLogo} alt="not found" className="ml-[100px]" />
      </div>
      <div className="flex gap-8 font-semibold text-[18px] text-common-white">
        <p>Who we are</p>
        <p>Products</p>
        <p>GLobal Precence</p>
        <p>Contect Us</p>
      </div>
      <div>
        <CustomButton className="w-[160px] rounded-lg" name="Contact us" />
      </div>
    </div>
  );
};

export default Topbar;
