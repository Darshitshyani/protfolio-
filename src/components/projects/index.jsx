import { memo } from 'react';
import React from "react";
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
import g5 from "@/untils/images/gabble/g5.jpg"
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
import blue1 from "@/untils/images/bluesky/blue1.png"
import blue2 from "@/untils/images/bluesky/blue2.png"
import blue3 from "@/untils/images/bluesky/blue3.png"
import blue4 from "@/untils/images/bluesky/blue4.png"
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import Image from "next/image";

const Projects = ({index}) => {
  
    const projects = [
      
      
     {
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

    },
     {
  title: "BlueSky-NW",
  images: [blue1, blue2, blue3, blue4],
  url: "https://www.bluesky-nw.com/",
  description: "A static corporate website built for BlueSky-NW to showcase their IT consulting, cloud, AI, and data analytics services with a clean and professional design.",
  features: [
    "Responsive static website with modern layout",
    "Clean UI to highlight company services and solutions",
    "Multi-page structure (Home, About, Services, Contact)",
    "SEO-friendly meta tags and structure",
    "Optimized images and fast loading speed",
    "Cross-browser compatibility",
    "Integration of contact form (non-functional/static)",
    "Consistent branding and professional styling"
  ],
  technologies: [
    "Wix",
    "Figma",
    "Illustrator"    
  ]
},
   {
  title: "Calcue",
  images: [cal1, cal2, cal3],
  url: "https://calcue.vercel.app/",
  description: "A static and responsive website built for Calcue with a modern design to present content clearly and professionally.",
  features: [
    "Responsive static website with clean UI",
    "Modern and user-friendly layout",
    "SEO-friendly structure",
    "Optimized images and fast loading speed",
    "Cross-browser compatibility",
    "Consistent branding and styling",
    "Deployed on Vercel for reliable hosting"
  ],
  technologies: [
    "HTML",
    "CSS",
    "JavaScript",
    "React",
    "Vercel"
  ]
},
    {
  title: "Neha Fiber",
  images: [n1, n2, n3, n4, n5],
  url: "https://nehafiber.com/",
  description: "A static business website built for Neha Fiber to showcase their products and services with a simple, user-friendly, and professional design.",
  features: [
    "Responsive static website for multiple devices",
    "Modern layout to highlight company offerings",
    "SEO-friendly structure and metadata",
    "Optimized images for fast performance",
    "Cross-browser compatibility",
    "Consistent branding and visual styling",
    "Deployed for stable online presence"
  ],
  technologies: [
    "HTML",
    "CSS",
    "JavaScript"
  ]
},
    {
  title: "Shoprs AI",
  images: [sp1, sp2, sp3],
  url: "https://shoprs.ai/",
  description: "A static landing website designed for Shoprs AI to present their AI-driven shopping solutions with a modern and engaging interface.",
  features: [
    "Responsive static landing page",
    "Clean and modern UI showcasing company solutions",
    "Multi-section layout (Home, Features, About, Contact)",
    "SEO-friendly page structure",
    "Optimized assets for faster performance",
    "Cross-browser compatibility",
    "Brand-focused styling for consistency",
    "Deployed for stable online accessibility"
  ],
  technologies: [
    "HTML",
    "CSS",
    "JavaScript"
  ]
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
  
    {
  title: "Devinci",
  images: [devc1, devc2, devc3],
  url: null,
  description: "A static company website created for Devinci with a professional and modern design to showcase their business offerings.",
  features: [
    "Responsive static website with clean design",
    "Multi-page layout (Home, About, Services, Contact)",
    "SEO-friendly structure and metadata",
    "Optimized images and smooth navigation",
    "Cross-browser compatibility",
    "Consistent branding and styling across pages",
    "Fast loading and performance-focused build"
  ],
  technologies: [
    "HTML",
    "CSS",
    "JavaScript"
  ]
}

  ];

  const getProjectSlug = (title) =>
    title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

  const projectDetails = projects.find(
    (p) => getProjectSlug(p.title) === index
  );

    
  return (
    <div className='mt-[100px] min-h-[60vh]'>
        <div className='px-[20px] md:px-[87px] flex flex-col md:flex-row gap-6 mb-8 h-full items-center'>
            {/* Project Details Panel - No scrolling */}
            <div className='w-full md:w-[40%] bg-pink-100 p-6 rounded-2xl'>
              <h1 className='text-2xl md:text-[30px] flex justify-between items-center mb-4'>
                <span className='flex items-center font-bold gap-2 text-primary-main cursor-pointer'>
                  <ArrowBackIcon 
                    onClick={() => window.history.back()} 
                    className="hover:scale-110 transition-transform"
                  />
                  {projectDetails?.title}
                </span> 
                {projectDetails?.url && (
                  <OpenInNewIcon 
                    className='hover:text-primary-main cursor-pointer hover:scale-110 transition-transform'
                    onClick={() => window.open(projectDetails.url, '_blank')}
                  />
                )}
              </h1> 
              
              <p className='text-lg font-semibold my-2'>About</p>
              <p className='text-gray-600 mb-6'>{projectDetails?.description}</p>
              
              <p className='text-lg font-semibold my-2'>Features</p>
              <div className='flex flex-col gap-3 mb-6'>
                {projectDetails?.features.map((feature, idx) => (
                  <div key={idx} className='flex items-start gap-2'>
                    <NavigateNextIcon className="text-primary-main mt-0.5 flex-shrink-0" />
                    <p className='text-gray-600'>{feature}</p>
                  </div>
                ))}
              </div>
              
              {projectDetails?.technologies && (
                <>
                  <p className='text-lg font-semibold my-2'>Technologies</p>
                  <div className='flex gap-2 flex-wrap'>
                    {projectDetails?.technologies.map((tech, idx) => (
                      <div key={idx} className='px-3 py-1 rounded-full bg-pink-300 text-primary-main'>
                        {tech}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
            
            {/* Image Gallery - Full height and width images */}
            <div className='w-full md:w-[60%] h-[30vh] md:h-[70vh]'>
              <div className='h-full overflow-y-auto snap-y snap-mandatory rounded-2xl border border-black-200'>
                {projectDetails?.images.map((val, index) => (  
                  <div key={index} className='h-full w-full snap-start snap-always'>
                    <Image 
                      src={val} 
                      alt={`${projectDetails?.title} screenshot ${index + 1}`}
                      className='w-full h-full '
                    />
                  </div>
                ))}
              </div>
            </div>
        </div>
    </div>
  );
};

export default memo(Projects);