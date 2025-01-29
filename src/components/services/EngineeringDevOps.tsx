import Circle from "@/untils/icons/Circle";
import { DEV1, DEV2 } from "@/untils/images";
import Image from "next/image";
import React from "react";
const whyEngineeringDevOpsMatters = [
    {
      title: "Diverse Domain Expertise",
      description: "Our technical capabilities span multiple industries, allowing us to cater to varied client needs. From cloud infrastructure and CI/CD pipelines to monitoring and automation, we bring a holistic approach to Engineering DevOps, fostering adaptability and innovative solutions."
    },
    {
      title: "Commitment to Learning and Innovation",
      description: "In the rapidly evolving tech landscape, our team is dedicated to continuous learning and experimentation. By adopting cutting-edge tools and practices such as containerization, orchestration, and IaC (Infrastructure as Code), we deliver scalable and future-proof solutions aligned with industry best practices."
    },
    {
      title: "User-Focused Technology Stack",
      description: "We prioritize the adoption of tools and technologies that meet user needs and improve developer efficiency. By implementing user-friendly DevOps practices, we ensure seamless workflows, robust infrastructure, and high-quality deployments that enhance user satisfaction and product reliability."
    }
  ];
const engineeringDevOpsPrinciples = [
  {
    title: "Scalability and Performance Optimization",
    description:
      "Engineering and DevOps prioritize designing scalable systems that grow seamlessly while maintaining performance. Optimization ensures systems handle increased loads without compromising user experience.",
  },
  {
    title: "Security Integration",
    description:
      "By embedding robust security measures like encryption, authentication, and authorization, we protect sensitive data and safeguard systems from vulnerabilities and cyber threats.",
  },
  {
    title: "Commitment to Learning and Innovation",
    description:
      "Our teams embrace continuous learning and experimentation to stay ahead in the evolving tech landscape. Leveraging cutting-edge tools and practices, we deliver forward-thinking solutions aligned with modern standards.",
  },
  {
    title: "Automation and Efficiency",
    description:
      "Automation through CI/CD pipelines streamlines software delivery, reducing manual effort while improving accuracy and accelerating development lifecycles.",
  },
  {
    title: "Modularity and Component Reusability",
    description:
      "A modular approach promotes the development of reusable components, simplifying maintenance and enabling efficient updates across applications.",
  },
  {
    title: "Technology Stack Selection",
    description:
      "Careful selection of programming languages, frameworks, and tools ensures performance, scalability, and compatibility with project-specific requirements.",
  },
  {
    title: "Collaborative Communication and Documentation",
    description:
      "Clear documentation and open communication among teams foster collaboration and ensure smooth implementation of engineering and DevOps strategies.",
  },
];
const EngineeringDevOps = () => {
  return (
    <div className="mt-[80px]">
      <div className="h-[150px]  bg-pink-400  animate-slide-in w-full flex justify-center items-center ">
        <h1 className="text-[20px] md:text-[30px] font-semibold text-primary-light ">
          Engineering & DevOps
        </h1>
      </div>
      <div className="p-8 xl:pl-[100px] animate-slide-out">
        <div className="w-[50px] md:w-[80px] border-2 my-6 text-pink-500 mx-auto "></div>
        <h1 className="text-[20px] md:text-[25px] text-center ">
          Pixels Piece
        </h1>
        <h1 className="text-[25px] md:text-[35px] font-semibold text-center ">
          Streamlining Development and Operations for Scalable Secure and
          Efficient Solutions.
        </h1>
      </div>
      <div className="px-8 xl:pl-[100px]  py-8 gap-2 bg-black-100 animate-slide-in">
        <h1 className="text-[25px] md:text-[30px] lg:text-[35px] font-bold">
          <span className="text-pink-500 ">Engineering & DevOps </span> Stages
        </h1>
        <p className="text-black-600 w-full md:w-full lg:w-1/2 xl:w-1/2">
          Engineering & DevOps focuses on integrating development and operations
          practices to build scalable, maintainable systems, ensuring seamless
          collaboration, automation, and optimal performance
        </p>
        <div className=" grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 gap-5 mt-5 ">
          <Image src={DEV1} alt="not found" className="w-full  rounded-xl" />

          <div className=" flex gap-2 flex-col ">
            {engineeringDevOpsPrinciples.map((item, index) => (
              <div className="w-full border-2 border-black-500 rounded-xl  bg-common-white p-2 flex flex-col shadow-lg ">
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
              Why whyEngineering & DevOps Matters for Your Company?
            </h1>
            {whyEngineeringDevOpsMatters.map((item, index) => (
              <>
                <p className="mt-6 font-medium text-[20px] ">{item.title}</p>
                <p className=" text-black-800 text-[16px] md:text-[18px]">
                  {item.description}
                </p>
              </>
            ))}
          </div>
          <div className="w-fit  my-3">
            <Image src={DEV2} alt="not found" className="w-full h-auto" />
          </div>
        </div>
        <div className="mt-3">
          <Circle />
        </div>
      </div>
    </div>
  );
};

export default EngineeringDevOps;
