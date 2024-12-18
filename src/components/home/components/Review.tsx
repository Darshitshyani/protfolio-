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
        <div className="w-[50px] md:w-[80px] border-2 my-6 text-pink-500 mx-auto md:mx-0"></div>
        <h1 className="text-[20px] md:text-[25px] text-center md:text-left">
          Meet the People
        </h1>
        <h1 className="text-[25px] md:text-[35px] font-semibold text-center md:text-left">
          We are Working With
        </h1>
        <div className="flex justify-end">
          <Circle />
        </div>
      </div>

      {/* Subtitle Section */}
      <div className="flex flex-col justify-center items-center mt-5">
        <div className="border-2 w-[50px] md:w-[100px] my-5 border-pink-500"></div>
        <h1 className="text-[20px] md:text-[30px]">Why customers love</h1>
        <h1 className="text-[20px] md:text-[30px] font-semibold">
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
              Without any doubt I recommend Alcaline Solutions as one of the
              best web design and digital marketing agencies. One of the best
              agencies I’ve came across so far. Wouldn’t be hesitated to
              introduce their work to someone else.
            </p>
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