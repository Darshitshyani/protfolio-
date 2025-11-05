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
import g1 from "@/untils/images/gabble/g1.jpg"
import g2 from "@/untils/images/gabble/g2.jpg"
import g3 from "@/untils/images/gabble/g3.jpg" 
import g4 from "@/untils/images/gabble/g4.jpg"
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
import blinq from "@/untils/images/blinq.png"
import blinq2 from "@/untils/images/blinq2.png"
import Image from "next/image";
import { url } from "inspector";
import { useRouter } from "next/router";
import LaunchIcon from '@mui/icons-material/Launch';
import { Button } from "@mui/material";


const Protfolio = () => {
    const projects = [
       {
        title: "Blinq Mobility",
        images: [blinq,blinq2],
        directurl: "https://blinqmobility.com/",
        description: "Drive the future today with Blinq Mobility’s smart, swappable-battery EV pods urban mobility made sustainable and affordable.", 
      },
       {
    title: "Shoprs AI",
    images: [sp1, sp2, sp3],
    directurl: "https://shoprs.ai/",
    description: "A static landing website designed for Shoprs AI to present their AI-driven shopping solutions with a modern and engaging interface.",
   
  },
        
     
       {
    title: "BlueSky-NW",
    images: [blue1, blue2, blue3, blue4],
    directurl: "https://bluesky-nw.com/",
    description: "A static corporate website built for BlueSky-NW to showcase their IT consulting, cloud, AI, and data analytics services with a clean and professional design.",
   
  },
   
      {
    title: "Neha Fiber",
    images: [n1, n2, n3, n4, n5],
    directurl: "https://nehafiber.com/",
    description: "A static business website built for Neha Fiber to showcase their products and services with a simple, user-friendly, and professional design.",
  
  },
     
    {
    title: "VIZU Admin Panel",
    images: [a1, a2, a3, a4, a5],
    url: "https://fajr-cb5f5.firebaseapp.com/",
    description: "An admin dashboard built for VIZU to manage data, monitor activities, and control system operations with a clean and intuitive interface.",
    features: [
      "Responsive admin panel with dashboard overview",
      "User management (view, add, edit, delete users)",
      "Data tables with search, sort, and filter options",
      "Authentication and secure access",
      "Interactive charts and visual reports",
      "Form handling for data input and updates",
      "Real-time data updates integrated with Firebase",
      "Cross-browser compatibility and responsive design"
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "React",
      "Firebase"
    ]
  }
    ,{
        title: "Gabble ai",
        images: [g1, g2, g3, g4],
        url: "https://gabble.ai/",
        description: "An AI-powered personal speaking coach offering 360° speech analysis and personalized feedback to improve fluency, pronunciation, grammar, and confidence in a judgment-free space.",
      features: [
        "360° speech assessment (speaking, pronunciation, fluency, grammar)",
        "Real-time feedback and instant grading",
        "Support for IELTS, TOEFL exam preparation",
        "Interview practice with common questions and AI simulations",
        "Reading, listening, vocabulary practice",
        "Progress tracking over time",
        "Contextual vocabulary building and accent training",
        "Supports multiple languages"
      ],
         "technologies": [
        "HTML",
        "CSS",
        "JavaScript",
        "React",
        "Python"
      ],
  
      }
  ,
    {
    title: "Animals Food Store",
    images: [p1, p2, p3],
    url: null,
    description: "An online store developed for selling animal food products with a user-friendly interface and product showcase.",
    features: [
      "Responsive e-commerce website design",
      "Product listing with images and descriptions",
      "Category-wise product organization",
      "Add to cart functionality",
      "User-friendly navigation and search",
      "Optimized for mobile and desktop devices",
      "Clean and modern UI for better shopping experience",
      "Fast loading and performance-optimized pages"
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "React"
    ]
  },
    {
    title: "Hotel Booking Site",
    images: [h1, h2, h3],
    url: null,
    description: "A hotel booking website built to allow users to explore rooms, check availability, and make reservations through a simple and responsive interface.",
    features: [
      "Responsive hotel booking interface",
      "Room listings with images, descriptions, and pricing",
      "Search and filter functionality for hotels/rooms",
      "Booking form with date selection",
      "User-friendly navigation across pages",
      "Optimized images and fast loading performance",
      "Cross-browser and mobile compatibility",
      "Clean and professional UI design"
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "React"
    ]
  }
  ,
      {
    title: "Diamonds Bid System",
    images: [bid1, bid2, bid3, bid4, bid5, bid6, bid7],
    url: null,
    description: "An interactive bidding platform designed for diamond auctions, allowing users to place bids and view competitive pricing in real-time with a clean and professional interface.",
    features: [
      "Responsive bidding system UI",
      "Diamond product listings with images and details",
      "Real-time bidding interface",
      "Price comparison and highest bid highlighting",
      "User-friendly forms for placing bids",
      "Dynamic updates of bid history",
      "Cross-browser and mobile compatibility",
      "Clean, modern design optimized for usability"
    ],
    technologies: [
      "HTML",
      "CSS",
      "JavaScript",
      "React"
    ]
  }
  ,
    
  
  
    ];

 const router = useRouter()
  
  const settingsInside = {
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: true,
    draggable: true,
    infinite: true,
    
    arrows: false,
   
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

        <section id="projects" className="py-12  ">
          <div className="container mx-auto px-6 ">
            <h2 className="text-4xl text-center font-semibold mb-10">Our Projects</h2>
       <div className="flex justify-center gap-6 flex-wrap">
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
  {projects.map((project, index) => (
    <div
      key={index}
      className=" bg-common-white w-full md:max-w-[400px] py-4 rounded-2xl border border-black-200 flex flex-col shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="p-4   ">
        <Slider {...settingsInside}
        className="rounded-2xl border-2 border-black-200 overflow-hidden"
        >
          {project.images.map((image, imageIndex) => (
            <div
              key={imageIndex}
              className=" relative"
            >
              <Image
                src={image}
                alt="not found"
                className="w-full h-[180px] rounded-lg"
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="flex flex-col flex-grow items-start justify-between p-5">
        <h3 className="text-2xl font-semibold mb-2 text-primary-main">{project.title}</h3>
        <p className="flex-grow mb-2 text-black-700 text-md ">{project.description}</p>
        <p
          className="cursor-pointer text-center rounded-lg text-black-700 border border-black-300 bg-black-100 border border-black-200 w-full mt-2 py-2"
          onClick={() => {
  if (project.directurl) {
    window.open(project.directurl, "_blank");
  } else {
    router.push(`/projects/${index}`);
  }
}}

        >
          View more<span ><LaunchIcon className="ml-1" fontSize="small"/></span>
        </p>
      </div>
    </div>
  ))}
</div>

         </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Protfolio;
