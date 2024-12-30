import React from "react";
import { CustomImagePreview } from "../shared/CustomImagePreview";
import { SoftWareImage, headerImage } from "@/untils/images";
import CustomButton from "../shared/CustomButton";
import Sliders from "./components/Slider";
import Image from "next/image";
import Review from "./components/Review";
import Circle from "@/untils/icons/Circle";
import ProjectWork from "./components/ProjectWork";
import CaseStuday from "./components/CaseStuday";
import Techology from "./components/Techonology";

const HomePage = () => {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {/* Header Section */}
      <div className="h-full flex flex-col lg:flex-row items-center justify-center gap-10 px-6 lg:px-20 py-10">
        <div className="text-center lg:text-left">
          <h1 className="text-[30px] lg:text-[40px]">
            Crafting Exceptional{" "}
            <span className="font-bold text-pink-500">Digital Experiences</span>
          </h1>
          <h1 className="text-[30px] lg:text-[40px] font-bold">
            Delivering Excellence
            <span className="text-pink-500"> Worldwide.</span>
          </h1>
          <p className="w-full lg:w-[70%] mt-6 text-black-700">
            I Bring Your Vision to Life with World-Class Frontend Development
            Expertise.
          </p>
          <CustomButton
            name="Let's Get Started"
            className="mt-6 w-full lg:w-[200px]"
          />
        </div>

        <div className="w-full lg:w-auto">
          <Image
            src={headerImage}
            alt="not found"
            height={600}
            className="w-full h-auto"
          />
        </div>
      </div>

      <ProjectWork />
      <Sliders />

      {/* Leading Companies Section */}
      <div className="w-full px-6 lg:px-[100px] py-[50px] lg:py-[100px] bg-pink-100">
        <div className="flex flex-col lg:flex-row justify-center gap-10">
          <div className="flex flex-col w-full lg:w-[50%] items-start text-center lg:text-left">
            <div className="w-[100px] border-2 mb-2 border-pink-500 mx-auto lg:mx-0"></div>
            <h1 className="text-[25px] lg:text-[35px]">
              Leading companies trust us
            </h1>
            <h1 className="text-[30px] lg:text-[40px] font-bold">
              to develop software
            </h1>
            <p className="mt-6 text-black-800">
              We{" "}
              <span className="text-pink-500 font-semibold">
                add development capacity
              </span>{" "}
              to tech teams. Our value isn’t limited to building teams but is
              equally distributed across the project lifecycle. We are a custom
              software development company that guarantees the successful
              delivery of your project.
            </p>
          </div>
          <div className="w-full lg:w-[50%]">
            <Image
              src={SoftWareImage}
              alt="not found"
              className="w-full h-auto"
            />
          </div>
        </div>
        <div>
          <Circle />
        </div>
      </div>

      <Review />
      <CaseStuday />
      <Techology />

      {/* Footer Section */}
      <div className="w-full  lg:w-[70%] bg-black-200 h-auto lg:h-[200px] mb-[40px] shadow-lg rounded-lg flex flex-col lg:flex-row items-center justify-between px-6 lg:px-[50px] py-6 lg:py-0 mt-10">
        <h3 className="text-[20px] lg:text-[28px] font-semibold text-common-black text-center lg:text-left">
          Hire the best developers and designers around!
        </h3>
        <CustomButton
          name="Hire Top Developers"
          className="mt-4 lg:mt-0 w-full lg:w-auto"
        />
      </div>
    </div>
  );
};

export default HomePage;
