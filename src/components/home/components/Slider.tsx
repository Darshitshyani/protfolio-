import { CustomImagePreview } from "@/components/shared/CustomImagePreview";
import { MobileApp, TestingImage, WebImage } from "@/untils/images";
import React from "react";
import Slider from "react-slick";

const Sliders = () => {
  var settings = {
    dots: true,
    infinite: true,
    
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
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
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="w-full h-full bg-black-100 py-[40px] px-4 md:px-[50px] lg:px-[100px]">
      {/* Heading Section */}
      <div className="flex justify-center">
        <h1 className="text-[25px] md:text-[30px] lg:text-[35px] font-semibold text-black-A400 mb-[20px]">
          Services we offer
        </h1>
      </div>

      {/* Slider Section */}
      <div className="w-full px-2 md:px-5 overflow-hidden pb-[50px]">
  <Slider {...settings}>
    {/* Card 1 */}
    <div className="h-[300px] w-fit bg-common-white my-5 py-4 px-4 border border-black-200 rounded-lg flex flex-col gap-2 mx-3">
      <div className="border rounded-full w-fit p-1 border-black-400">
        <div className="w-[50px] h-[50px] relative">
          <CustomImagePreview image={MobileApp} />
        </div>
      </div>
      <h3 className="font-semibold text-[16px] md:text-[18px]">
        Web Design & Development
      </h3>
      <p className="text-[12px] md:text-[14px] text-black-600">
        We provide the service of application management and modernization for
        the growth of your business.
      </p>
    </div>

    {/* Card 2 */}
    <div className="h-[300px] w-fit bg-common-white my-5 py-4 px-4 border border-black-200 rounded-lg flex flex-col gap-2 mx-3">
      <div className="border rounded-full w-fit p-1 border-black-400">
        <div className="w-[50px] h-[50px] relative">
          <CustomImagePreview image={WebImage} />
        </div>
      </div>
      <h3 className="font-semibold text-[16px] md:text-[18px]">
        Mobile App Development
      </h3>
      <p className="text-[12px] md:text-[14px] text-black-600">
        We provide the service of application management and modernization for
        the growth of your business.
      </p>
    </div>

    {/* Card 3 */}
    <div className="h-[300px] w-fit bg-common-white my-5 py-4 px-4 border border-black-200 rounded-lg flex flex-col gap-2 mx-3">
      <div className="border rounded-full w-fit p-1 border-black-400">
        <div className="w-[50px] h-[50px] relative">
          <CustomImagePreview image={TestingImage} />
        </div>
      </div>
      <h3 className="font-semibold text-[16px] md:text-[18px]">
        Software Testing Service
      </h3>
      <p className="text-[12px] md:text-[14px] text-black-600">
        We provide the service of application management and modernization for
        the growth of your business.
      </p>
    </div>

    {/* Card 4 */}
    <div className="h-[300px] w-fit bg-common-white my-5 py-4 px-4 border border-black-200 rounded-lg flex flex-col gap-2 mx-3">
      <div className="border rounded-full w-fit p-1 border-black-400">
        <div className="w-[50px] h-[50px] relative">
          <CustomImagePreview image={MobileApp} />
        </div>
      </div>
      <h3 className="font-semibold text-[16px] md:text-[18px]">
        IT Consulting Services
      </h3>
      <p className="text-[15px] md:text-[14px] text-black-600">
        We are a leading IT consulting firm that provides the best IT consulting
        services to improve the scalability and performance of your company.
      </p>
    </div>
  </Slider>
</div>
    </div>
  );
};

export default Sliders;
