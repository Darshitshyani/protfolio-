import React from "react";
import { ShopifyLogo, SoftWareImage, headerImage } from "@/untils/images";
import CustomButton from "../shared/CustomButton";
import Sliders from "./components/Slider";
import Image from "next/image";
import Review from "./components/Review";
import Circle from "@/untils/icons/Circle";
import ProjectWork from "./components/ProjectWork";
import CaseStuday from "./components/CaseStuday";
import ShopifyPartner from "./components/ShopifyPartner";
import Techology from "./components/Techonology";
import { useRouter } from "next/router";
import RotatingText  from "../shared/RotatingText";
import {
  AnimatedGradientText,
  FadeIn,
  HoverLift,
  ScaleIn,
  SlideIn,
  SplitReveal,
  UnderlineDraw,
} from "@/components/shared/motion";
import {
  AuroraBackground,
  GlowOrb,
  GridPattern,
  SoftBand,
} from "@/components/shared/backgrounds";
import { PageWordTrack } from "@/components/shared/scroll/WordTrack";
import { Parallax } from "@/components/shared/scroll";

const HomePage = () => {
  const router = useRouter();
  // NO page-level padding on the root: every band and both auroras below are
  // full-bleed, and neither `band-soft` nor the aurora fade map feathers
  // HORIZONTALLY — so any inset leaves a hard vertical edge with a strip of raw
  // page beside it. Gutters live on each section's own content wrapper.
  return (
    // `relative overflow-hidden` is required by the word track: its words are
    // deliberately wider than the viewport, and without clipping here they would
    // give the whole page horizontal scroll.
    <div className="relative isolate w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* Giant word track running the full page height. Each word drifts at its
          own rate, so they slide past each other as you scroll top to bottom
          rather than moving as one sheet. Sits at z-0 behind every section. */}
      <PageWordTrack
        words={[
          { text: "DESIGN", tone: "blue" },
          { text: "BUILD", tone: "green" },
          { text: "SHOPIFY", tone: "green" },
          { text: "SHIP", tone: "blue" },
          { text: "SCALE", tone: "blue" },
        ]}
      />

      {/* Header Section */}
      <div className="relative w-full overflow-hidden">
        <AuroraBackground variant="mixed" intensity={0.45} fade="bottom" />
        <GridPattern className="text-black-300" opacity={0.18} fade="edges" />
        <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-center gap-10 px-6 lg:px-20 py-10 mt-[80px]">
        <Parallax lag={0.1}>
        <SlideIn from="left" className={`text-center lg:text-left`}>
          <ScaleIn className="mb-4 flex justify-center lg:justify-start" delay={0.1}>
            <span className="inline-flex items-center gap-2 rounded-full border border-shopify-200 bg-shopify-100 px-3 py-1.5 text-[13px] font-medium text-shopify-700">
              <Image
                src={ShopifyLogo}
                alt=""
                aria-hidden="true"
                className="h-[16px] w-[16px]"
              />
              Shopify Partner
            </span>
          </ScaleIn>
          <h1 className="font-display text-[34px] font-bold leading-[1.12] tracking-tight text-common-black sm:text-[44px] lg:text-[56px]">
            <SplitReveal text="Crafting Exceptional" className="block" />
            <AnimatedGradientText className="block font-bold">
              Digital Experiences
            </AnimatedGradientText>
          </h1>
          <p className="mt-4 font-display text-[22px] font-semibold text-black-800 sm:text-[26px] lg:text-[30px]">
            <SplitReveal text="Delivering" delay={0.35} />{" "}
            <UnderlineDraw delay={0.9} lineClassName="bg-primary-main">
              <SplitReveal text="Excellence" delay={0.45} className="text-primary-main" />
            </UnderlineDraw>{" "}
            <SplitReveal text="Worldwide." delay={0.6} />
          </p>
          <p className="w-full lg:w-[70%] mt-6 text-black-700">
            We Bring Your Vision to Life with World-Class Web Development,
            mobile app development and Shopify app development Expertise.
          </p>
         <HoverLift className="mt-6 w-full lg:w-[200px]">
           <CustomButton
              name="Let's Get Started"
              className="w-full"
              onClick={() => router.push("/services/digital-product-design")}
            />
         </HoverLift>
        </SlideIn>
        </Parallax>

        <Parallax speed={0.9} className="w-full lg:w-auto">
        <SlideIn from="right" className="relative w-full lg:w-auto" delay={0.1}>
          <GlowOrb color="blue" size={520} className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" />
          <Image
            src={headerImage}
            alt="Illustration of a digital product being designed and built"
            height={600}
            className="w-full h-auto"
          />
        </SlideIn>
        </Parallax>
        </div>
      </div>

      <ProjectWork />
      <Sliders />
      <ShopifyPartner />

      {/* Leading Companies Section */}
      <div className="relative w-full py-[50px] p-8 xl:pl-[100px]" id="who">
        {/* Tint on its own feathered layer — `band-soft` on this element would
            mask the descendants too, fading the eyebrow rule, the heading and
            the closing Circle out along with the band. */}
        <SoftBand className="bg-pink-100/50" />
        <div className="relative z-10">
        <div
          className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 w-full place-items-center `}
        >
          <SlideIn from="left" className=" w-full  items-start  text-start ">
            <div
              aria-hidden="true"
              className="w-[100px] border-2 mb-2 border-pink-500 mx-auto lg:mx-0"
            ></div>
            <h1 className="text-[20px] lg:text-[35px]">About Pixels Piece</h1>
            <h1 className="text-[25px] lg:text-[40px] gap-3 font-bold flex items-center  lg:justify-start ">
              to  <RotatingText
                  texts={[
  "develop software",
  "develop software!",
  "build applications",
  "design user interfaces",
  "create digital solutions",
  "write clean code",
  "develop web apps",
  "build mobile apps",
  "optimize performance",
  "debug and test software",
  "deploy applications",
  "maintain software systems",
  "innovate with technology",
  "engineer digital products",
  "build Shopify apps",
  "customize storefronts"
]}
  mainClassName="px-2 sm:px-2 md:px-3 bg-pink-200 text-primary-main overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
  staggerFrom={"last"}
  initial={{ y: "100%" }}
  animate={{ y: 0 }}
  exit={{ y: "-120%" }}
  staggerDuration={0.025}
  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
  transition={{ type: "spring", damping: 30, stiffness: 400 }}
  rotationInterval={2000}
/> 
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
          </SlideIn>
          <SlideIn from="right" className="w-fit mt-2 md:mt-0" delay={0.1}>
            <Image
              src={SoftWareImage}
              alt="Illustration of the Pixels Piece team building custom software"
              className="w-full h-auto"
            />
          </SlideIn>
        </div>
        <div className="mt-3">
          <Circle />
        </div>
        </div>
      </div>

      <Review />
      <CaseStuday />
      <Techology />
      
      {/* Footer Section */}
      <FadeIn className="w-[calc(100%_-_48px)]  lg:w-[70%] bg-black-200 h-auto lg:h-[200px] mb-[40px] shadow-lg rounded-lg flex flex-col lg:flex-row items-center justify-between px-6 lg:px-[50px] py-6 lg:py-0 mt-10 ">
        <h3 className="text-[20px] lg:text-[28px] font-semibold text-common-black text-center lg:text-left">
          Hire the best developers and designers around!
        </h3>
        <HoverLift className="mt-4 lg:mt-0 w-full lg:w-auto">
          <CustomButton
            name="Hire Top Developers"
            className="w-full"
            onClick={() =>
              window.open(
                "https://calendly.com/darshitshyani1/30min",
                "_blank",
                "noopener,noreferrer"
              )
            }
          />
        </HoverLift>
      </FadeIn>
  
    </div>
  );
};

export default HomePage;
