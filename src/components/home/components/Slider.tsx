import { CustomImagePreview } from "@/components/shared/CustomImagePreview";
import { MobileApp, TestingImage, WebImage } from "@/untils/images";
import React from "react";
import Slider from "react-slick";

const Sliders = () => {
  var settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1324,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full h-full bg-black-100 py-[40px] px-4 md:px-[50px] lg:px-[100px] ">
      {/* Heading Section */}
      <div className="flex justify-center">
        <h1 className="text-[25px] md:text-[30px] lg:text-[35px] font-semibold text-black-A400 mb-[20px]">
          Services we offer
        </h1>
      </div>

      {/* Slider Section */}
      <div className="w-full px-2 md:px-5 overflow-hidden pb-[50px] ">
        <Slider {...settings} className="flex  h-full">
          {/* Card 1 */}
          <div className="w-fit min-h-[350px] bg-common-white my-5 py-4 px-4 border items-stretch border-black-200 rounded-lg flex flex-col gap-2 mx-3   ">
            <div className="border rounded-full w-fit p-1 border-black-400">
              <div className="w-[50px] h-[50px] relative">
                <CustomImagePreview image={MobileApp} />
              </div>
            </div>
            <h3 className="font-semibold text-[16px] md:text-[18px]">
              Web Design & Development
            </h3>
            <p className="text-[15px] sm:text-[14px] md:text-[16px]  text-black-600">
              We offer comprehensive services in application management and
              modernization, designed to drive the growth and success of your
              business.{" "}
            </p>
            <p className="text-[15px] sm:text-[14px] md:text-[16px]  text-black-600">
              {" "}
              We enhance performance, scalability, and security, empowering your
              business to stay competitive in a rapidly evolving digital
              landscape. With our tailored solutions.
            </p>
          </div>

          {/* Card 2 */}
          <div className=" min-h-[350px]  w-fit bg-common-white my-5 py-4 px-4 border items-stretch border-black-200 rounded-lg flex flex-col gap-2 mx-3  ">
            <div className="border rounded-full w-fit p-1 border-black-400">
              <div className="w-[50px] h-[50px] relative">
                <CustomImagePreview image={WebImage} />
              </div>
            </div>
            <h3 className="font-semibold text-[16px] md:text-[18px]">
              Mobile App Development
            </h3>
            <p className="text-[14px] md:text-[16px]  text-black-600">
              We specialize in application management and modernization services
              to drive the growth and innovation of your business. Our solutions
              focus on upgrading legacy systems with the technologies.
            </p>
            <p className="text-[14px] md:text-[16px] text-black-600">
              {" "}
              By streamlining processes and enhancing application efficiency, we
              empower your business to thrive in today’s competitive digital
              environment.
            </p>
          </div>

          {/* Card 3 */}
          <div className=" min-h-[350px]  w-fit bg-common-white my-5 py-4 px-4 border items-stretch border-black-200 rounded-lg flex flex-col gap-2 mx-3  ">
            <div className="border rounded-full w-fit p-1 border-black-400">
              <div className="w-[50px] h-[50px] relative">
                <CustomImagePreview image={TestingImage} />
              </div>
            </div>
            <h3 className="font-semibold text-[16px] md:text-[18px]">
              Software Testing Service
            </h3>
            <p className="text-[14px] md:text-[16px] text-black-600">
              We offer expert application management and modernization services
              to support the growth and evolution of your business. By upgrading
              outdated systems with cutting-edge technologies
            </p>
            <p className="text-[14px] md:text-[16px] text-black-600">
              we enhance performance, scalability. Our tailored solutions ensure
              seamless operations, enabling your business to adapt to changing
              market demands and achieve sustained success.
            </p>
          </div>

          {/* Card 4 */}
          <div className=" min-h-[350px]  w-fit bg-common-white my-5 py-4 px-4 border items-stretch border-black-200 rounded-lg flex flex-col gap-2 mx-3 ">
            <div className="border rounded-full w-fit p-1 border-black-400">
              <div className="w-[50px] h-[50px] relative">
                <CustomImagePreview image={MobileApp} />
              </div>
            </div>
            <h3 className="font-semibold text-[18px] md:text-[18px]">
              IT Consulting Services
            </h3>
            <p className="text-[15px] sm:text-[14px] md:text-[16px]  text-black-600">
              We are a premier IT consulting firm dedicated to delivering
              top-notch solutions that enhance your company's scalability,
              efficiency, and performance.
            </p>
            <p className="text-[15px] sm:text-[14px] md:text-[16px]  text-black-600">
              {" "}
              We strive to streamline operations, optimize processes, and drive
              sustainable growth, ensuring your company stays ahead in a
              competitive market.
            </p>
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Sliders;
