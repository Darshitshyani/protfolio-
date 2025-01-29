import Circle from "@/untils/icons/Circle";
import { ProductDesign1, ProductDesign2, SoftWareImage } from "@/untils/images";
import Image from "next/image";
import React from "react";
const designProcess = [
  {
    phase: "Comprehensive User Research",
    description:
      "Thorough user research and analysis are essential for creating effective digital product designs. Our designers focus on gaining genuine insights into user preferences by conducting interviews, mapping customer journeys, and understanding their needs and goals.",
  },
  {
    phase: "Defining User Challenges",
    description:
      "The next phase involves clearly defining the problems based on the research findings. Our designers analyze these insights to understand user challenges better, which helps in framing the issues from a user-centric perspective. This stage includes brainstorming potential solutions to address these challenges.",
  },
  {
    phase: "Idea Generation and Prioritization",
    description:
      "During this phase, designers work on the most promising solutions. We collect, prioritize, and implement ideas to create the best possible product or service. This process involves generating, selecting, and executing ideas using various techniques to foster innovation and explore diverse options.",
  },
  {
    phase: "Rapid Prototyping",
    description:
      "Prototyping involves creating scaled-down versions of the product to test user experience, gather market feedback, and identify potential issues. This iterative process helps refine the product based on user feedback and assess the viability of ideas before the final launch.",
  },
  {
    phase: "Thorough Product Testing",
    description:
      "Testing is crucial for ensuring that the product functions as intended. It involves identifying and fixing bugs, minimizing development costs, and enhancing performance. Testing often leads to revisiting earlier stages to refine the problem statement and spark new ideas, ensuring the final product meets user expectations and quality standards.",
  },
];
const benefitsOfDesign = [
  {
    title: "Enhanced User Engagement",
    description:
      "A well-designed digital product keeps users engaged, encouraging them to spend more time interacting with your platform and achieving their goals with ease.",
  },
  {
    title: "Business Growth",
    description:
      "A seamless user experience can drive conversions, increase customer retention, and ultimately boost revenue. Good design isn’t just an investment in aesthetics; it’s a business strategy.",
  },
  {
    title: "Competitive Advantage",
    description:
      "In a world of countless apps and websites, exceptional design can set your product apart from the competition. A thoughtful design creates a lasting impression and fosters brand loyalty.",
  },
];
const Digitalproductdesign = () => {
  return (
    <div className="mt-[80px]  ">
      <div className="h-[150px]  bg-pink-400  animate-slide-in w-full flex justify-center items-center ">
        <h1 className="text-[20px] md:text-[30px] font-semibold text-primary-light ">
          Digital product design
        </h1>
      </div>
      <div className="p-8 xl:pl-[100px] animate-slide-out ">
        <div className="w-[50px] md:w-[80px] border-2 my-6 text-pink-500 mx-auto "></div>
        <h1 className="text-[20px] md:text-[25px] text-center ">
          Pixels Piece
        </h1>
        <h1 className="text-[25px] md:text-[35px] font-semibold text-center ">
          Elevating your brand with stunning digital designs and user
          experiences.
        </h1>
      </div>

      <div className="w-full  py-[50px] p-8 xl:pl-[100px] animate-slide-in ">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 w-full place-items-center">
          <div className=" w-full  items-start  text-start">
            <h1 className="text-[25px] text-center md:text-left lg:text-[35px] font-bold">
              Why Digital Product Design Matters
            </h1>
            {benefitsOfDesign.map((item, index) => (
              <>
                <p className="mt-6 font-medium text-[20px] ">{item.title}</p>
                <p className=" text-black-800 text-[16px] md:text-[18px]">
                  {item.description}
                </p>
              </>
            ))}
          </div>
          <div className="w-fit md:w-[50%] my-3">
            <Image
              src={ProductDesign1}
              alt="not found"
              className="w-full h-auto"
            />
          </div>
        </div>
        <div className="mt-3">
          <Circle />
        </div>
      </div>
      <div className="px-8 xl:pl-[100px]  py-8 gap-2 bg-black-100">
        <h1 className="text-[25px] md:text-[30px] lg:text-[35px] font-bold">
          <span className="text-pink-500 ">Digital Product Design</span> Stages
        </h1>
        <p className="text-black-600 w-full md:w-full lg:w-1/2 xl:w-1/2">
          Product design using a human-centered approach allows us to build
          tools that your customers will love to use. We follow a five-stage
          process to design and develop optimized software that drives
          engagement.
        </p>
        <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-5 mt-5 ">
          <Image
            src={ProductDesign2}
            alt="not found"
            className="w-full  rounded-xl"
          />

          <div className=" flex gap-2 flex-col ">
            {designProcess.map((item, index) => (
              <div className="w-full border-2 border-pink-500 rounded-xl  bg-common-white p-2 flex flex-col shadow-lg ">
                <h1 className="text-[20px] md:text-[20px] font-semibold flex gap-2 items-center">
                  <span className="text-primary-main font-bold">➤</span>{" "}
                  {item.phase}
                </h1>

                <p className="pl-8 text-black-700 font-medium text-[14px] md:text-[15px] lg:text-[16px]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Digitalproductdesign;
