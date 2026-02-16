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
import TrueFocus from '../shared/TrueFocus';
import RotatingText from "../shared/RotatingText";

const HomePage = () => {
  const router = useRouter();
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-start overflow-x-hidden bg-gradient-to-br from-white via-indigo-50/30 to-white">
      {/* Background Blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-400/10 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-indigo-400/10 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2 pointer-events-none z-0" />

      {/* Header Section */}
      <div className="relative z-10 w-full flex flex-col lg:flex-row items-center justify-between max-w-[1440px] px-6 lg:px-20 py-10 pt-[120px] gap-12 lg:gap-20">
        <div className="flex-1 text-center lg:text-left animate-slide-in">
          <h1 className="text-[32px] sm:text-[40px] lg:text-[52px] leading-tight font-extrabold text-gray-900 tracking-tight">
            Crafting Exceptional <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Digital Experiences
            </span>
          </h1>

          <div className="w-full flex flex-wrap justify-center lg:justify-start items-center gap-3 mt-4 text-[24px] sm:text-[32px] lg:text-[40px] font-bold text-gray-800">
            <span className="shrink-0">Delivering Excellence</span>
            <div className="inline-block relative">
              {/* Wrapped TrueFocus in a container to prevent layout shifts if needed */}
              <TrueFocus
                sentence="Worldwide."
                manualMode={false}
                blurAmount={5}
                borderColor="#1E90FF"
                animationDuration={1}
                pauseBetweenAnimations={1}
              />
            </div>
          </div>

          <p className="w-full lg:w-[80%] mt-6 text-lg text-gray-600 leading-relaxed font-medium">
            We Bring Your Vision to Life with World-Class Web & Mobile App Development Expertise.
          </p>

          <div className="flex justify-center lg:justify-start mt-8">
            <CustomButton
              name="Let's Get Started"
              className="!w-full sm:!w-[200px] !shadow-xl !shadow-blue-500/20"
              onClick={() => router.push("/services/digital-product-design")}
            />
          </div>
        </div>

        <div className="flex-1 w-full flex justify-center lg:justify-end">
          <div className="relative w-full max-w-[600px] h-auto rounded-3xl overflow-hidden shadow-2xl shadow-blue-900/10 transform hover:scale-[1.01] transition-transform duration-500">
            <Image
              src={headerImage}
              alt="Digital Experience"
              width={800}
              height={600}
              priority
              className="w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      <div className="w-full max-w-[1440px] px-6 lg:px-20 mt-10">
        <ProjectWork />
      </div>

      <div className="w-full mt-10">
        <Sliders />
      </div>

      {/* Leading Companies Section */}
      <div className="w-full py-20 px-6 lg:px-20 xl:px-[100px] bg-gradient-to-r from-white via-blue-50/50 to-white relative" id="who">
        <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center w-full max-w-[1440px] mx-auto">
          <div className="w-full flex flex-col items-center xl:items-start text-center xl:text-left">
            <div className="w-[80px] h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 mb-6" />

            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">About Pixels Piece</h2>
            <div className="text-3xl lg:text-4xl font-extrabold text-gray-900 mb-8 flex flex-wrap items-center justify-center xl:justify-start gap-x-3 gap-y-2">
              <span>We exist to</span>
              <RotatingText
                texts={[
                  "develop software",
                  "build applications",
                  "design interfaces",
                  "create solutions",
                  "write clean code",
                  "optimize performance",
                  "innovate technology",
                ]}
                mainClassName="px-3 bg-blue-600 text-white overflow-hidden py-1 justify-center rounded-lg shadow-lg shadow-blue-500/30"
                staggerFrom={"last"}
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                className="font-medium"
                exit={{ y: "-120%" }}
                staggerDuration={0.025}
                splitLevelClassName="overflow-hidden pb-1"
                transition={{ type: "spring", damping: 30, stiffness: 400 }}
                rotationInterval={2000}
              />
            </div>

            <div className="space-y-6 text-lg text-gray-600 leading-relaxed max-w-2xl">
              <p>
                <span className="text-blue-600 font-bold">Pixels Piece</span> is a global custom software development company.
                With over <span className="font-semibold text-gray-900">20+ projects</span> delivered worldwide, we possess the expertise to design, build, and deploy tailored digital solutions.
              </p>
              <p>
                We have talented teams of <span className="font-semibold text-gray-900">React, React Native, Angular, Node, and Flutter</span> developers and designers passionate about crafting innovative products for eCommerce, Finance, Wellness, and more.
              </p>
              <p>
                Count on us for custom, responsive software built with cutting-edge technologies.
              </p>
            </div>
          </div>

          <div className="w-full max-w-[600px] mx-auto xl:mx-0 relative">
            <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/20 to-pink-500/20 rounded-3xl blur-2xl -z-10" />
            <Image
              src={SoftWareImage}
              alt="Software Development"
              className="w-full h-auto rounded-3xl shadow-2xl transform rotate-1 hover:rotate-0 transition-all duration-500 bg-white"
            />
          </div>
        </div>

        <div className="mt-16 w-full max-w-[1440px] mx-auto">
          <Circle />
        </div>
      </div>

      <Review />
      <CaseStuday />
      <Techology />

      {/* Footer CTA */}
      <div className="w-full max-w-[1200px] px-6 mb-20 mt-10">
        <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-3xl p-8 lg:p-16 flex flex-col lg:flex-row items-center justify-between shadow-2xl shadow-gray-900/20 relative overflow-hidden">
          {/* Decorative circles */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />

          <h3 className="text-2xl lg:text-4xl font-bold text-white text-center lg:text-left mb-6 lg:mb-0 max-w-xl z-10">
            Ready to build something amazing? <br />
            <span className="text-blue-400">Hire the best developers today.</span>
          </h3>
          <CustomButton
            name="Hire Top Developers"
            className="!w-full sm:!w-auto !px-10 !py-3 !text-lg !bg-white !text-gray-900 hover:!bg-gray-100 !shadow-none z-10"
            onClick={() =>
              router.push("https://calendly.com/darshitshyani1/30min")
            }
          />
        </div>
      </div>

    </div>
  );
};

export default HomePage;
