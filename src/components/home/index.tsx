import React from "react";
import { SoftWareImage, headerImage } from "@/untils/images";
import CustomButton from "../shared/CustomButton";
import Sliders from "./components/Slider";
import Image from "next/image";
import Review from "./components/Review";
import Circle from "@/untils/icons/Circle";
import ProjectWork from "./components/ProjectWork";
import CaseStuday from "./components/CaseStuday";
import Techology from "./components/Techonology";
import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-6 ">
      {/* Header Section */}
      <div
        className={`h-full flex flex-col lg:flex-row items-center justify-center gap-10 px-6 lg:px-20 py-10 mt-[80px]   `}
      >
        <div className={`text-center lg:text-left animate-slide-in`}>
          <h1 className="text-[30px] lg:text-[40px] ">
            Crafting Exceptional{" "}
            <span className="font-bold text-pink-500">Digital Experiences</span>
          </h1>
          <h1 className="text-[30px] lg:text-[40px] font-bold">
            Delivering Excellence
            <span className="text-pink-500"> Worldwide.</span>
          </h1>
          <p className="w-full lg:w-[70%] mt-6 text-black-700">
            We Bring Your Vision to Life with World-Class Web Development and
            mobile app development Expertise.
          </p>
          <CustomButton
            name="Let's Get Started"
            className="mt-6 w-full lg:w-[200px]"
          />
        </div>

        <div className="w-full lg:w-auto ">
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
      <div className="w-full  py-[50px] p-8 xl:pl-[100px] bg-pink-100" id="who">
        <div
          className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 w-full place-items-center `}
        >
          <div className=" w-full  items-start  text-start ">
            <div className="w-[100px] border-2 mb-2 border-pink-500 mx-auto lg:mx-0"></div>
            <h1 className="text-[20px] lg:text-[35px]">About Pixels Piece</h1>
            <h1 className="text-[25px] lg:text-[40px] font-bold">
              to develop software
            </h1>
            <p className="mt-6 text-black-800 text-[15px] md:text-[18px]">
              <span className="text-pink-500 font-semibold text-[18px]">
                Pixels Piece
              </span>{" "}
              is an Indian-based custom software development company
              specializing in mobile and web app development. With over 20+
              projects offered to companies across the globe, we have the
              expertise needed to develop, test, and deploy tailored software
              solutions.
            </p>
            <p className="mt-6 text-black-800 text-[15px] md:text-[18px]">
              We have talented teams of React, React Native, Angular, Node, and
              Flutter developers and designers who are highly passionate about
              designing solutions for various industries.About Pixels Piece has
              developed innovative digital products for eCommerce, finance,
              manufacturing, wellness, travel, and more.
            </p>
            <p className="mt-6 text-black-800 text-[15px] md:text-[18px]">
              Count on us for custom, responsive software solutions built with
              cutting-edge technologies designed to add value.
            </p>
          </div>
          <div className="w-fit mt-2 md:mt-0">
            <Image
              src={SoftWareImage}
              alt="not found"
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="mt-3">
          <Circle />
        </div>
      </div>

      <Review />
      <CaseStuday />
      <Techology />

      {/* Footer Section */}
      <div className="w-full  lg:w-[70%] bg-black-200 h-auto lg:h-[200px] mb-[40px] shadow-lg rounded-lg flex flex-col lg:flex-row items-center justify-between px-6 lg:px-[50px] py-6 lg:py-0 mt-10 ">
        <h3 className="text-[20px] lg:text-[28px] font-semibold text-common-black text-center lg:text-left">
          Hire the best developers and designers around!
        </h3>
        <CustomButton
          name="Hire Top Developers"
          className="mt-4 lg:mt-0 w-full lg:w-auto"
          onClick={() =>
            router.push("https://calendly.com/darshitshyani1/30min")
          }
        />
      </div>
    </div>
  );
};

export default HomePage;
