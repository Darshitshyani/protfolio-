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
import  bid1  from "@/untils/images/bids/bid1.jpeg";
import  bid2  from "@/untils/images/bids/bid2.jpeg";
import  bid3  from "@/untils/images/bids/bid3.jpeg";
import  bid4  from "@/untils/images/bids/bid4.jpeg";
import  bid5  from "@/untils/images/bids/bid5.jpeg";
import  bid6  from "@/untils/images/bids/bid6.jpeg";
import  bid7  from "@/untils/images/bids/bid7.jpeg";
import cal1 from "@/untils/images/calc/clac-1.png"
import cal2 from "@/untils/images/calc/calc-2.png"
import cal3 from "@/untils/images/calc/calc-3.png";
import g1 from "@/untils/images/gabble/g1.jpeg"
import g2 from "@/untils/images/gabble/g2.jpeg"
import g3 from "@/untils/images/gabble/g3.jpeg" 
import g4 from "@/untils/images/gabble/g4.jpeg"
import n1 from "@/untils/images/neha/n1.jpeg"
import n2 from "@/untils/images/neha/n2.jpeg"
import n3 from "@/untils/images/neha/n3.jpeg"
import n4 from "@/untils/images/neha/n4.jpeg"
import n5 from "@/untils/images/neha/n5.jpeg"
import devc1 from "@/untils/images/st1/devc1.png"
import devc2 from "@/untils/images/st1/devc2.png"
import devc3 from "@/untils/images/st1/devc3.png"
import sp1 from "@/untils/images/shoprs/sp1.png"
import sp2 from "@/untils/images/shoprs/sp2.png"
import sp3 from "@/untils/images/shoprs/sp3.png"
import VisibilityIcon from '@mui/icons-material/Visibility';
import blue1 from "@/untils/images/bluesky/blue1.png"
import blue2 from "@/untils/images/bluesky/blue2.png"
import blue3 from "@/untils/images/bluesky/blue3.png"
import blue4 from "@/untils/images/bluesky/blue4.png"
import Image from "next/image";
import { url } from "inspector";


const Protfolio = () => {
  const projects = [
      
     {
      title: "Gabble ai",
      images: [g1, g2, g3, g4],
      url: "https://gabble.ai/"
    },
      {
        title: "BlueSky-NW",
        images: [blue1, blue2, blue3, blue4],
        url: "https://www.bluesky-nw.com/"
      },
    {
      title: "Calcue",
      images: [cal1, cal2, cal3],
      url: "https://calcue.vercel.app/"
    },
     {
      title: "Neha Fiber",
      images: [n1, n2, n3, n4, n5],
      url: "https://nehafiber.com/"
    },
     {
      title: "Shoprs ai",
      images: [sp1, sp2, sp3],
      url: "https://shoprs.ai/"
    },
    {
      title: "VIZU Admin Panel",
      images: [a1, a2, a3, a4, a5],
      url: "https://fajr-cb5f5.firebaseapp.com/"
    },
    {
      title: "Animals Food Store",
      images: [p1, p2, p3],
      url: null
    },
    {
      title: "Hotel Booking Site",
      images: [h1, h2, h3],
      url: null
    },
     {
      title: "Dimonds bid system",
      images: [bid1, bid2, bid3, bid4, bid5, bid6, bid7],
      url: null
    },
  
    {
      title: "Devinci",
      images: [devc1, devc2, devc3 ],
      url: null
    },
  ];

 
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
            <h2 className="text-4xl text-center font-semibold mb-10">Our Projects</h2>
       <div className="flex justify-center gap-6 flex-wrap">
              {projects.map((project, index) => (
                <div
                  key={index}
                  className=" max-w-[400px] border-2 h-[250px]   border-pink-500 p-4 rounded-lg bg-common-white "
                >
                  <div className="flex justify-between items-center">
                  <h3 className="text-xl font-semibold ">
                    {project.title}
                  </h3>
                {project.url&& <button className="bg-pink-600 mr-4 px-4 py-2 rounded hover:bg-pink-700" onClick={() => window.open(project.url, "_blank") }>
  <VisibilityIcon style={{ color: "white" }} />
</button>}
                  </div>
                  <div className="p-4">
                    <Slider {...settingsInside}>
                      {project.images.map((image, imageIndex) => {
                        return (
                          <div
                            key={imageIndex}
                            className="border border-pink-600 p-1 rounded-lg h-[155px] mt-2"
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
         </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Protfolio;
