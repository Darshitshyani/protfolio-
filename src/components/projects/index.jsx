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
import {
  FadeIn,
  SlideIn,
  SplitReveal,
  Stagger,
  StaggerItem,
  useReducedMotion,
} from "@/components/shared/motion";
import {
  AuroraBackground,
  GridPattern,
} from "@/components/shared/backgrounds";
import { GiantWord } from "@/components/shared/scroll";
import { PIMW } from "@/untils/data/pimw";

/* ── stand-in gallery for a project with no screenshots in the repo ───────── */

const DETAIL_MOCK_OPTIONS = [
  { label: "Custom text", value: "AVA" },
  { label: "Font", value: "35+ to choose from" },
  { label: "Swatch", value: "Image swatch" },
  { label: "Photo upload", value: "logo.png" },
];

/**
 * Animated illustration of a live product personalizer, shown in the gallery
 * column when an entry has no `images`. It is a single `role="img"` with a
 * written-out label so assistive tech gets a description instead of a stack of
 * decorative boxes, and every motion in it is gated on `useReducedMotion()`.
 */
const PersonalizerGalleryMock = () => {
  const reduce = useReducedMotion();

  return (
    <div
      role="img"
      aria-label="Illustration of a live product personalizer: a shopper enters custom text, picks a font and a swatch, uploads a logo, and sees the finished product previewed live before checkout."
      className="flex min-h-full w-full flex-col items-center justify-center gap-4 bg-pink-100 p-4 sm:p-6"
    >
      <div
        className={`flex w-full max-w-[220px] flex-col items-center gap-3 rounded-2xl border border-black-200 bg-common-white p-5 shadow-md${
          reduce ? "" : " animate-float"
        }`}
        style={reduce ? undefined : { "--float-duration": "5s" }}
      >
        <span className="flex h-[84px] w-[84px] items-center justify-center rounded-full border-2 border-pink-600 bg-pink-200">
          <span className="text-[20px] font-bold tracking-wide text-black-900">
            AVA
          </span>
        </span>
        <span className="text-[11px] font-medium uppercase tracking-wide text-black-600">
          Live preview
        </span>
      </div>

      <Stagger
        role="list"
        stagger={0.08}
        amount={0.2}
        className="grid w-full max-w-[360px] grid-cols-2 gap-2"
      >
        {DETAIL_MOCK_OPTIONS.map((option) => (
          <StaggerItem
            key={option.label}
            role="listitem"
            className="min-w-0 rounded-lg border border-black-200 bg-common-white px-3 py-2"
          >
            <p className="text-[10px] font-medium uppercase tracking-wide text-black-600">
              {option.label}
            </p>
            <p className="truncate text-[13px] font-semibold text-black-900">
              {option.value}
            </p>
          </StaggerItem>
        ))}
      </Stagger>
    </div>
  );
};

const Projects = ({index}) => {

    const projects = [
    {
      title: "PIMW Product Personalizer",
      // No App Store screenshots live in this repo, so the gallery column
      // falls back to <PersonalizerGalleryMock /> below.
      images: [],
      url: PIMW.appStoreUrl,
      description:
        `Our own Shopify app, published on the Shopify App Store by Pixelspiece solutions. PIMW lets merchants sell products their customers design themselves \u2014 engraving, monogram text, photo upload, swatches and dropdowns \u2014 with a live preview before checkout, dynamic pricing per option and conditional logic. No code. Rated ${PIMW.rating.toFixed(1)} from ${PIMW.reviewCount} reviews.`,
      features: [
        "Live canvas preview so customers see their personalized design on the product in real time, before checkout",
        "Ten option field types: custom text, dropdowns, swatches, radio buttons, checkboxes, numbers, multi-select, file upload and more",
        "Custom text with 35+ fonts, plus customer logo and photo uploads",
        "Dynamic pricing per option \u2014 charge extra for engraving, custom text or any add-on",
        "Real-time option pricing through Shopify's Cart Transform function",
        "Conditional logic that shows or hides fields based on earlier answers",
        "PNG and JPEG uploads with image rotation and print-ready output for fulfilment",
        "Works with every Shopify theme through app blocks; installs in under five minutes with no code",
        "Available in 18 languages, from English and German to Japanese, Korean and Thai",
        "Free, Basic, Pro and Unlimited plans, every one of them including unlimited custom orders",
      ],
      // NOTE: only Cart Transform and theme app blocks are stated on the public listing.
      // Confirm the rest of the stack before publishing — do not guess.
      technologies: [
        "Shopify Functions (Cart Transform)",
        "Theme App Extensions",
        "Shopify App Store",
      ],
    },
      
      
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
      <section className='relative overflow-hidden pb-4'>
        {/* The one rich surface on this page. fade="both", NOT the default
            "bottom": this section starts at document y=100px, not y=0, and it
            clips itself with overflow-hidden — so a bottom-only fade leaves the
            layer at full alpha along its own top edge, drawing a hard
            horizontal cut just under the floating topbar (which only spans
            5%–95% of the width, so the outer strips are never covered). */}
        <AuroraBackground variant="mixed" intensity={0.4} fade="both" />
        <GridPattern className="text-black-300" opacity={0.16} fade="edges" />
        {/* The case-study watermark. <GiantWord> rather than <ScrollStage>
            because this section already exists and is already
            `relative overflow-hidden` (verified above — that clip is what keeps
            a word wider than the viewport from creating page-wide horizontal
            scroll on mobile), and because painting it HERE, after the aurora
            and before the `relative z-10` row, gives the right stacking:
            aurora → word → content. Wrapping the section in a ScrollStage
            instead would have forced the aurora inside the z-10 wrapper, on top
            of the word.

            It shares the region with the aurora, so neither may assert itself —
            but tone and speed are BOTH the <GiantWord> defaults now
            (`text-black-200/45`, 0.6) rather than anything set here. The 45%
            watermark is the site-wide system tone, and 0.6 is what the other
            nine words use; this page used to run 0.65, which drifted at a
            visibly different rate as you moved between pages.

            Rendered UNCONDITIONALLY, and that is load-bearing. It used to be
            gated on `projectDetails`, which derives from `router.query.index`.
            On an auto-static-optimized dynamic route `router.query` is `{}` on
            the first client render, so the word was absent at mount — and
            ScrollSmoother collects its effect targets exactly ONCE, inside
            ScrollSmoother.create(). SmoothScroll keys that on `router.asPath`,
            which does not change when the query hydrates, and the
            ScrollTrigger.refresh() on window load re-measures existing triggers
            without re-querying the DOM. So on a refresh or a deep link the word
            mounted after the smoother and silently never parallaxed; only a
            client-side nav from /portfolio got the effect. It is aria-hidden
            decoration and an unresolved slug already renders an otherwise-empty
            page, so there is nothing to gate.

            The panel and the gallery frame are opaque, so the word reads in the
            outer margins and in the slack above/below the gallery — exactly the
            surface the frame then rides over. */}
        <GiantWord word="CASE" speed={0.6} />
        <div className='relative z-10 px-[20px] md:px-[87px] flex flex-col md:flex-row gap-6 mb-8 h-full items-center'>
            {/* Project Details Panel - No scrolling */}
            <SlideIn from="left" className='w-full md:w-[40%] bg-pink-100 border border-pink-200 p-6 rounded-2xl'>
              <h1 className='font-display tracking-tight text-2xl md:text-[30px] flex justify-between items-center mb-4'>
                <span className='flex items-center font-bold gap-2 text-primary-main'>
                  <button
                    type="button"
                    aria-label="Go back"
                    onClick={() => window.history.back()}
                    className="inline-flex items-center hover:scale-110 transition-transform cursor-pointer"
                  >
                    <ArrowBackIcon />
                  </button>
                  {projectDetails?.title ? (
                    <SplitReveal text={projectDetails.title} />
                  ) : null}
                </span>
                {projectDetails?.url && (
                  <a
                    href={projectDetails.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Open ${projectDetails?.title} in a new tab`}
                    className='inline-flex items-center hover:text-primary-main cursor-pointer hover:scale-110 transition-transform'
                  >
                    <OpenInNewIcon />
                  </a>
                )}
              </h1>

              <FadeIn y={12}>
                <h2 className='font-display text-lg font-semibold tracking-tight text-common-black my-2'>About</h2>
                <p className='text-black-700 mb-6'>{projectDetails?.description}</p>
              </FadeIn>

              {projectDetails?.features?.length ? (
                <>
                  <h2 className='font-display text-lg font-semibold tracking-tight text-common-black my-2'>Features</h2>
                  <Stagger className='mb-6' stagger={0.06} amount={0.15}>
                    <ul className='flex flex-col gap-3'>
                      {projectDetails.features.map((feature, idx) => (
                        <li key={idx}>
                          <StaggerItem className='flex items-start gap-2'>
                            <NavigateNextIcon className="text-primary-main mt-0.5 flex-shrink-0" />
                            <p className='min-w-0 text-black-700'>{feature}</p>
                          </StaggerItem>
                        </li>
                      ))}
                    </ul>
                  </Stagger>
                </>
              ) : null}

              {projectDetails?.technologies && (
                <>
                  <h2 className='font-display text-lg font-semibold tracking-tight text-common-black my-2'>Technologies</h2>
                  <Stagger stagger={0.05} amount={0.2}>
                    <ul className='flex gap-2 flex-wrap'>
                      {projectDetails.technologies.map((tech, idx) => (
                        <li key={idx}>
                          <StaggerItem className='px-3 py-1 rounded-full bg-pink-200 text-common-black'>
                            {tech}
                          </StaggerItem>
                        </li>
                      ))}
                    </ul>
                  </Stagger>
                </>
              )}
            </SlideIn>

            {/* Image Gallery - Full height and width images.
                NO parallax on this frame, for three compounding reasons.
                (a) The section is `relative overflow-hidden pb-4`: a 70vh
                element at 0.95 drifts ~0.05 x (viewportH + elemH) ~= 92px
                against 16px of bottom padding, so the frame's bottom edge and
                shadow get sliced by the section clip at the extremes. The
                service pages deliberately keep their parallaxes in UNCLIPPED
                sections for exactly this reason.
                (b) It sits in an `items-center` flex row opposite a static
                details panel — two visually paired columns sliding out of
                alignment reads as broken layout, not depth.
                (c) The frame is itself an `overflow-y-auto snap-y` scroller the
                user drags; moving an inner scroll container against the page is
                disorienting. The SlideIn entrance carries it instead. */}
            <div className='w-full md:w-[60%] h-[30vh] md:h-[70vh]'>
              <SlideIn from="right" className='h-full w-full'>
                <div className='h-full overflow-y-auto snap-y snap-mandatory rounded-2xl border border-black-200 bg-common-white shadow-md'>
                  {projectDetails?.images?.length ? (
                    projectDetails.images.map((val, imageIndex) => (
                      <div key={imageIndex} className='h-full w-full snap-start snap-always'>
                        <Image
                          src={val}
                          alt={`${projectDetails?.title} screenshot ${imageIndex + 1}`}
                          className='w-full h-full '
                        />
                      </div>
                    ))
                  ) : projectDetails ? (
                    <PersonalizerGalleryMock />
                  ) : null}
                </div>
              </SlideIn>
            </div>
        </div>
      </section>
    </div>
  );
};

export default memo(Projects);
