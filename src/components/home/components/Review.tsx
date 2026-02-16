import Circle from "@/untils/icons/Circle";
import LeftDask from "@/untils/icons/LeftDask";
import RightDask from "@/untils/icons/RightDask";
import React from "react";
import Slider from "react-slick";

const Review = () => {
  var settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3500,
    autoplaySpeed: 2000,
  };

  return (
    <div className="w-full px-4 md:px-[50px] lg:px-[100px] py-[30px] md:py-[50px]">
      {/* Header Section */}
      <div>
        <div className="w-[50px] md:w-[80px] h-1 bg-gradient-to-r from-blue-500 to-indigo-500 my-6 mx-auto md:mx-0 rounded-full"></div>
        <h1 className="text-[20px] md:text-[25px] text-center md:text-left text-gray-500 font-medium">
          Meet the People
        </h1>
        <h1 className="text-[25px] md:text-[35px] font-bold text-center md:text-left text-gray-900">
          We are Working With
        </h1>
        <div className="flex justify-end opacity-50">
          <Circle />
        </div>
      </div>

      {/* Subtitle Section */}
      <div className="flex flex-col justify-center items-center mt-10 mb-8">
        <div className="w-[50px] md:w-[100px] h-1 bg-gradient-to-r from-blue-500 to-indigo-500 my-5 rounded-full"></div>
        <h1 className="text-[20px] md:text-[30px] text-gray-500">Why customers love</h1>
        <h1 className="text-[20px] md:text-[30px] font-bold text-gray-900">
          working with us
        </h1>
      </div>

      {/* Slider Section */}
      <div className="flex flex-col sm:flex-row justify-center items-center mt-7 h-auto sm:h-[120px] gap-4">
        {/* Left Icon */}
        <div className="hidden sm:block">
          <LeftDask />
        </div>

        {/* Slider */}
        <Slider {...settings} className="w-full sm:w-[500px] px-2">
          <div>
            <p className="text-center text-[14px] sm:text-[16px] mx-2 text-black-500">
              Without any doubt I recommend Alcaline Solutions as one of the
              best web design and digital marketing agencies. One of the best
              agencies I’ve came across so far. Wouldn’t be hesitated to
              introduce their work to someone else.
            </p>
          </div>
          <div>

            <p className="text-center text-[14px] sm:text-[16px] text-black-600">
              We pride ourselves on offering customized solutions that align perfectly with each customer’s unique requirements. Our team takes the time to understand your goals, challenges, and vision, ensuring that every project we undertake is not only efficient but also impactful.
            </p>
          </div>
          <div>
            <p className="text-center text-[14px] sm:text-[16px] text-black-600">With years of experience and a team of highly skilled professionals, we deliver exceptional quality and results. Our dedication to staying updated with the latest industry trends and technologies allows us to provide cutting-edge solutions. We value transparency, collaboration, and open communication.</p>
          </div>
        </Slider>

        {/* Right Icon */}
        <div className="hidden sm:flex h-full justify-end items-end">
          <RightDask />
        </div>
      </div>
    </div>
  );
};

export default Review;