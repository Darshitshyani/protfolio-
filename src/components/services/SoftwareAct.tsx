import Circle from "@/untils/icons/Circle";
import { SA1, SA2 } from "@/untils/images";
import Image from "next/image";
import React from "react";
const expertiseHighlights = [
  {
    title: "Diverse Domain Expertise",
    description:
      "Our technical capabilities span across multiple industries, allowing us to cater to a wide range of client requirements. With knowledge extending beyond healthcare, education, and finance, we bring a comprehensive outlook to product design, fostering flexibility and innovative solutions.",
  },
  {
    title: "Commitment to Learning and Innovation",
    description:
      "To stay ahead in the ever-evolving tech landscape, our team embraces continuous learning and experimentation. By leveraging the latest tools and practices, we deliver forward-thinking solutions that align with emerging trends and industry standards.",
  },
  {
    title: "User-Focused Technology Stack",
    description:
      "We emphasize the adoption of technologies that resonate with user needs and preferences. By focusing on a user-friendly tech stack, we create intuitive and immersive experiences that drive user satisfaction and contribute to product success.",
  },
];
const softwareArchitecturePrinciples = [
  {
    title: "Scalability and Performance Optimization",
    description:
      "Designing scalable solutions ensures the system can grow seamlessly while maintaining responsiveness and efficiency. Performance optimization focuses on handling increased loads without compromising user experience.",
  },
  {
    title: "Security Integration",
    description:
      "Robust security measures, such as encryption, authentication, and authorization, are integrated into the architecture to protect sensitive data and safeguard against vulnerabilities and cyber threats.",
  },
  {
    title: "Modularity and Component Reusability",
    description:
      "A modular approach divides the system into independent, reusable components, enhancing maintainability, simplifying updates, and enabling efficient reuse across various application parts.",
  },
  {
    title: "Technology Stack Selection",
    description:
      "Selecting the right programming languages, frameworks, and tools ensures compatibility, performance, and scalability, aligning the technology stack with the project's unique requirements.",
  },
  {
    title: "Documentation and Communication",
    description:
      "Comprehensive documentation outlines the system's structure, components, and interactions, while clear communication among development teams ensures a shared understanding of the architecture and its objectives.",
  },
];
const SoftwareAct = () => {
  return (
    <div className="mt-[80px] ">
      <div className="h-[150px]  bg-pink-400  animate-slide-in w-full flex justify-center items-center ">
        <h1 className="text-[20px] md:text-[30px] font-semibold text-primary-light ">
          Software Architecture
        </h1>
      </div>
      <div className="p-8 xl:pl-[100px] animate-slide-out">
        <div className="w-[50px] md:w-[80px] border-2 my-6 text-pink-500 mx-auto "></div>
        <h1 className="text-[20px] md:text-[25px] text-center ">
          Pixels Piece
        </h1>
        <h1 className="text-[25px] md:text-[35px] font-semibold text-center ">
          Elevating your brand with stunning digital designs and user
          experiences.
        </h1>
      </div>
      <div className="px-8 xl:pl-[100px]  py-8 gap-2 animate-slide-in">
        <h1 className="text-[25px] md:text-[30px] lg:text-[35px] font-bold">
          <span className="text-pink-500 ">Software Architecture </span> Stages
        </h1>
        <p className="text-black-600 w-full md:w-full lg:w-1/2 xl:w-1/2">
          Software architecture involves designing and structuring the
          fundamental components of a software system, defining their
          relationships and interactions to ensure scalability, maintainability,
          and optimal performance
        </p>
        <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-5 mt-5 ">
          <Image src={SA2} alt="not found" className="w-full  rounded-xl" />

          <div className=" flex gap-2 flex-col ">
            {softwareArchitecturePrinciples.map((item, index) => (
              <div className="w-full border-2 border-pink-500 rounded-xl  bg-common-white p-2 flex flex-col shadow-lg ">
                <h1 className="text-[20px] md:text-[20px] font-semibold flex gap-2 items-center">
                  <span className="text-primary-main font-bold">➤</span>{" "}
                  {item.title}
                </h1>

                <p className="pl-8 text-black-700 font-medium text-[14px] md:text-[15px] lg:text-[16px]">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="w-full  py-[50px] p-8 xl:pl-[100px] ">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 w-full place-items-center">
          <div className=" w-full  items-start  text-start">
            <h1 className="text-[25px] text-center md:text-left lg:text-[35px] font-bold">
              Why Software Architecture Matters
            </h1>
            {expertiseHighlights.map((item, index) => (
              <>
                <p className="mt-6 font-medium text-[20px] ">{item.title}</p>
                <p className=" text-black-800 text-[16px] md:text-[18px]">
                  {item.description}
                </p>
              </>
            ))}
          </div>
          <div className="w-fit  my-3">
            <Image src={SA1} alt="not found" className="w-full h-auto" />
          </div>
        </div>
        <div className="mt-3">
          <Circle />
        </div>
      </div>
    </div>
  );
};

export default SoftwareAct;
