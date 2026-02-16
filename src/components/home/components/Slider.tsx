import { CustomImagePreview } from "@/components/shared/CustomImagePreview";
import { MobileApp, TestingImage, WebImage } from "@/untils/images";
import React from "react";
import Slider from "react-slick";
import Box from "@mui/material/Box";

const services = [
  {
    image: MobileApp,
    title: "Web Design & Development",
    description: [
      "We offer comprehensive services in application management and modernization, designed to drive the growth and success of your business.",
      "We enhance performance, scalability, and security, empowering your business to stay competitive in a rapidly evolving digital landscape. With our tailored solutions.",
    ],
  },
  {
    image: WebImage,
    title: "Mobile App Development",
    description: [
      "We specialize in application management and modernization services to drive the growth and innovation of your business. Our solutions focus on upgrading legacy systems with the technologies.",
      "By streamlining processes and enhancing application efficiency, we empower your business to thrive in today’s competitive digital environment.",
    ],
  },
  {
    image: TestingImage,
    title: "Software Testing Service",
    description: [
      "We offer expert application management and modernization services to support the growth and evolution of your business. By upgrading outdated systems with cutting-edge technologies",
      "we enhance performance, scalability. Our tailored solutions ensure seamless operations, enabling your business to adapt to changing market demands and achieve sustained success.",
    ],
  },
  {
    image: MobileApp,
    title: "IT Consulting Services",
    description: [
      "We are a premier IT consulting firm dedicated to delivering top-notch solutions that enhance your company's scalability, efficiency, and performance.",
      "We strive to streamline operations, optimize processes, and drive sustainable growth, ensuring your company stays ahead in a competitive market.",
    ],
  },
];

const Sliders = () => {
  var settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1280,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full h-full py-[60px] px-4 md:px-[50px] lg:px-[100px]">
      {/* Heading Section */}
      <div className="flex justify-center mb-10">
        <div className="text-center">
          <h1 className="text-[30px] md:text-[40px] font-bold text-gray-900">
            Services We Offer
          </h1>
          <div className="w-20 h-1 bg-blue-500 mx-auto mt-4 rounded-full"></div>
        </div>
      </div>

      {/* Slider Section */}
      <div className="w-full px-2 md:px-5 pb-[50px]">
        <Slider {...settings} className="flex h-full -mx-4">
          {services.map((service, index) => (
            <div key={index} className="px-4 h-full">
              <div className="bg-white min-h-[400px] h-full p-8 rounded-2xl border border-gray-100 shadow-xl shadow-blue-900/5 hover:shadow-blue-900/10 transition-all duration-300 flex flex-col gap-4 group hover:-translate-y-1">
                <div className="w-14 h-14 rounded-xl bg-blue-50 flex items-center justify-center mb-2 group-hover:bg-blue-100 transition-colors">
                  <div className="w-[30px] h-[30px] relative">
                    <CustomImagePreview image={service.image} />
                  </div>
                </div>
                <h3 className="font-bold text-[20px] text-gray-900 group-hover:text-blue-600 transition-colors">
                  {service.title}
                </h3>
                <div className="space-y-4 flex-1">
                  {service.description.map((desc, i) => (
                    <p key={i} className="text-[15px] leading-relaxed text-gray-600">
                      {desc}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default Sliders;
