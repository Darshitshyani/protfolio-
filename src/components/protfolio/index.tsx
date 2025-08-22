import React from "react";
import Slider from "react-slick";
import a1 from "@/untils/images/admin/a1.jpeg";
import a2 from "@/untils/images/admin/a2.jpeg";
import a3 from "@/untils/images/admin/a3.jpeg";
import a4 from "@/untils/images/admin/a4.jpeg";
import a5 from "@/untils/images/admin/a5.jpeg";
import h1 from "@/untils/images/hotel/h1.jpeg";
import h2 from "@/untils/images/hotel/h2.jpeg";
import h3 from "@/untils/images/hotel/h3.jpeg";
import p1 from "@/untils/images/pet shop/p1.jpeg";
import p2 from "@/untils/images/pet shop/p2.jpeg";
import p3 from "@/untils/images/pet shop/p3.jpeg";
import Image from "next/image";

const Protfolio = () => {
  const projects = [
    {
      title: "VIZU Admin Panel",
      images: [a1, a2, a3, a4, a5],
    },
    {
      title: "E-commerce Animals Food Store",
      images: [p1, p2, p3],
    },
    {
      title: "Hotel Booking Site",
      images: [h1, h2, h3],
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // Screen width less than 1024px
        settings: {
          slidesToShow: 2, // Show 2 slides
          slidesToScroll: 1, // Scroll 1 slide at a time
          arrows: true, // Keep arrows
        },
      },
      {
        breakpoint: 768, // Screen width less than 768px
        settings: {
          slidesToShow: 1, // Show 1 slide
          slidesToScroll: 1,
          arrows: false, // Hide arrows for smaller screens
        },
      },
      {
        breakpoint: 480, // Screen width less than 480px
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };

  const CustomArrow = (props: any) => {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{
          ...style,

          background: "#1E90FF",
          borderRadius: "50%",
        }}
        onClick={onClick}
      />
    );
  };
  const settingsInside = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: false,
    draggable: false,
    nextArrow: <CustomArrow />,
    prevArrow: <CustomArrow />,
  };
  return (
    <div className="mt-[85px]">
      <main>
        <section id="about" className="py-12 bg-white">
          <div className="container mx-auto px-6">
            <div>
              <div className="my-2">
                <div className="w-[100px] border-2 border-pink-500 mx-auto"></div>
              </div>
              <h1 className="font-bold text-4xl text-center my-5 ">
                Welcome to Pixels Piece Portfolio{" "}
              </h1>
              <p className="text-lg leading-relaxed text-center">
                At Pixels Piece, we turn your digital dreams into reality. We
                specialize in crafting visually stunning, highly functional
                websites tailored to your business needs. From sleek portfolios
                to robust e-commerce platforms, our team is dedicated to
                delivering web solutions that drive growth and elevate your
                brand.
              </p>
            </div>
            <h2 className="text-2xl font-semibold my-4">About Us</h2>
            <p className="text-lg leading-relaxed  ">
              At Pixels Piece, we provide top-notch web development services to
              help businesses achieve their digital goals. Our expertise lies in
              crafting user-friendly, efficient, and visually appealing web
              solutions tailored to your needs.
            </p>
          </div>
        </section>

        <section id="projects" className="py-12 bg-black-100  abc ">
          <div className="container mx-auto px-6 ">
            <h2 className="text-2xl font-semibold mb-6">Our Projects</h2>
            <Slider {...settings} className="flex">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className=" max-w-[400px] border-2 h-[250px]   border-pink-500 p-4 rounded-lg bg-common-white "
                >
                  <h3 className="text-xl font-semibold mb-2">
                    {project.title}
                  </h3>
                  <div className="p-4">
                    <Slider {...settingsInside}>
                      {project.images.map((image, imageIndex) => {
                        return (
                          <div
                            key={imageIndex}
                            className="border border-pink-600 p-1 rounded-lg h-full mt-2"
                          >
                            <Image
                              src={image}
                              alt="not found "
                              className="w-full h-full rounded-lg "
                            />
                          </div>
                        );
                      })}
                    </Slider>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Protfolio;
