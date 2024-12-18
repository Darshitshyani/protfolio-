import { CaseImageOne, CaseImageThree, CaseImageTwo } from "@/untils/images";
import Image from "next/image";
import React from "react";

const CaseStuday = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center mt-[50px] bg-black-100 pb-[50px]">
      <div className="w-[60px] border-2  mt-[50px] mb-[20px] text-pink-600"></div>
      <div className="text-center">
        <h1 className="text-[30px] font-base">Our recent</h1>
        <h1 className="text-[30px] font-bold">Case Studies</h1>
      </div>
      <div className="mt-8 w-full px-[200px] flex flex-col gap-3">
        <div className="grid grid-cols-2   border rounded-xl bg-grey-light border-black-300  ">
          <Image src={CaseImageOne} alt="not found" />
          <div className="flex flex-col p-10 justify-center">
            <h3 className="text-[25px] font-semibold">
              Website Design for SCFC Canada
            </h3>
            <p className="mt-[20px] text-[15px] font-[400] text-black-800">
              Born out of a vision and driven by a single-minded objective that
              prioritizes service above all else, Swift Clearance and Forwarding
              Corp. is surging forward to deliver unparalleled services in the
              shipping and logistics industry. The company's meteoric rise is
              rooted in a solid foundation, underpinned by the management's
              extensive experience and expertise. With over 20 years of rich and
              varied experience in the shipping and freight forwarding industry,
              the management team brings a wealth of knowledge and a commitment
              to excellence that propels the company to new heights. Swift
              Clearance and Forwarding Corp. is dedicated to setting new
              standards in the industry, ensuring that every client receives the
              highest level of service and satisfaction.
            </p>
          </div>
        </div>
        <div className="flex border rounded-xl bg-green-light border-black-300">
          <Image src={CaseImageTwo} alt="not found" />
          <div className="flex flex-col p-10 justify-center">
            <h3 className="text-[25px] font-semibold">
              Website Design for SCFC Canada
            </h3>
            <p className="mt-[20px] text-[15px] font-[400] text-black-800">
              Born out of a vision and driven by a single-minded objective that
              prioritizes service above all else, Swift Clearance and Forwarding
              Corp. is surging forward to deliver unparalleled services in the
              shipping and logistics industry. The company's meteoric rise is
              rooted in a solid foundation, underpinned by the management's
              extensive experience and expertise. With over 20 years of rich and
              varied experience in the shipping and freight forwarding industry,
              the management team brings a wealth of knowledge and a commitment
              to excellence that propels the company to new heights. Swift
              Clearance and Forwarding Corp. is dedicated to setting new
              standards in the industry, ensuring that every client receives the
              highest level of service and satisfaction.
            </p>
          </div>
        </div>
        <div className="flex border rounded-xl bg-salmon_Pink-light border-black-300">
          <Image src={CaseImageThree} alt="not found" />
          <div className="flex flex-col p-10 justify-center">
            <h3 className="text-[25px] font-semibold">
              Website Design for SCFC Canada
            </h3>
            <p className="mt-[20px] text-[15px] font-[400] text-black-800">
              Born out of a vision and driven by a single-minded objective that
              prioritizes service above all else, Swift Clearance and Forwarding
              Corp. is surging forward to deliver unparalleled services in the
              shipping and logistics industry. The company's meteoric rise is
              rooted in a solid foundation, underpinned by the management's
              extensive experience and expertise. With over 20 years of rich and
              varied experience in the shipping and freight forwarding industry,
              the management team brings a wealth of knowledge and a commitment
              to excellence that propels the company to new heights. Swift
              Clearance and Forwarding Corp. is dedicated to setting new
              standards in the industry, ensuring that every client receives the
              highest level of service and satisfaction.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStuday;
