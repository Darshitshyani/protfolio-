import { CaseImageOne, CaseImageThree, CaseImageTwo } from "@/untils/images";
import Image from "next/image";
import React from "react";

const CaseStuday = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center mt-[50px] bg-black-100 pb-[50px] p-4" id="casestudy">
      <div className="w-[60px] border-2  mt-[50px] mb-[20px] text-pink-600"></div>
      <div className="text-center">
        <h1 className="text-[30px] font-base">Our recent</h1>
        <h1 className="text-[30px] font-bold">Case Studies</h1>
      </div>
      <div className="mt-8 w-full lg:px-[200px] xl:px-[200px] grid grid-cols-1 gap-3">
        <div className="grid md:grid-cols-1 lg:grid:cols-2 xl:grid-cols-2 items-center  sm:grid-cols-1 border rounded-xl bg-grey-light border-black-300 grid-cols-1 ">
          <Image
            src={CaseImageOne}
            alt="not found"
            className="w-full max-h-[450px] p-2 rounded-2xl"
          />
          <div className="grid grid-cols-1 p-10 justify-center ">
            <h3 className=" font-semibold  w-full md:text-[25px] text-[20px]">
            Transforming E-Commerce with Scalable Solutions

            </h3>
            <p className="mt-[20px] text-[13px] md:text-[15px] font-[400] text-black-800 ">
            We collaborated with a leading e-commerce platform facing significant challenges with slow load times, outdated infrastructure, and declining user engagement. Our team conducted a thorough assessment of their existing architecture and identified bottlenecks affecting performance. By implementing a scalable and modernized framework using cutting-edge technologies, we achieved a 40% reduction in page load times and enhanced the platform's responsiveness across all devices. Additionally, we integrated advanced analytics tools to track user behavior, allowing the client to make data-driven decisions. As a result, user engagement increased by 30%, customer retention improved, and the client experienced a significant boost in revenue within just six months.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid:cols-2 xl:grid-cols-2 items-center  border rounded-xl bg-green-light border-black-300">
          <Image src={CaseImageTwo} alt="not found"  className="w-full max-h-[450px] p-2 rounded-2xl" />
          <div className="flex flex-col p-10 justify-center">
            <h3 className=" font-semibold md:text-[25px] text-[20px]">
            Modernizing Legacy Systems for a Healthcare Client
            </h3>
            <p className="mt-[20px] font-[400] text-black-800 text-[13px] md:text-[15px]">
            A prominent healthcare provider approached us to address critical challenges with their outdated legacy systems. These systems were not only inefficient but also posed risks to data security and compliance. Our solution involved developing a custom cloud-based platform tailored to their specific operational needs. The platform featured secure data encryption, HIPAA-compliant storage, and seamless integration with third-party applications. We also implemented real-time analytics dashboards to provide actionable insights for better decision-making. The modernization effort streamlined patient data management, reduced operational costs by 25%, and significantly enhanced the provider’s ability to deliver high-quality patient care.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid:cols-2 xl:grid-cols-2 items-center border rounded-xl bg-salmon_Pink-light border-black-300">
          <Image src={CaseImageThree} alt="not found" className="w-full  p-2 " />
          <div className="flex flex-col p-10 justify-center">
            <h3 className="md:text-[25px] text-[20px] font-semibold">
            Enhancing Mobile App Efficiency for a Logistics Company
            </h3>
            <p className="mt-[20px] text-[13px] md:text-[15px] font-[400] text-black-800 ">
            A logistics company struggling with a poorly performing mobile app reached out to us for help. Their existing app was plagued by frequent crashes, long loading times, and a confusing user interface, resulting in frustrated users and inefficiencies in their delivery processes. We began by conducting usability testing and analyzing user feedback to identify critical pain points. Based on these insights, we redesigned the app’s user interface to make it more intuitive and user-friendly. On the backend, we optimized database queries, improved API response times, and implemented a robust caching system. The revamped app was launched successfully, leading to a 45% increase in user retention and a 35% improvement in delivery process efficiency. Employees and customers alike praised the app for its reliability and ease of use, strengthening the company's reputation in the logistics industry.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaseStuday;
