import React from "react";
import Slider from "react-slick";
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
import Link from "next/link";
import { useRouter } from "next/router";
import LaunchIcon from '@mui/icons-material/Launch';
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import SellOutlined from "@mui/icons-material/SellOutlined";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";
import OpenInNewRounded from "@mui/icons-material/OpenInNewRounded";
import StraightenOutlined from "@mui/icons-material/StraightenOutlined";
import { Button } from "@mui/material";
import type { ImageProps } from "next/image";
import {
  AnimatedGradientText,
  EASE,
  FadeIn,
  HoverLift,
  SplitReveal,
  Stagger,
  StaggerItem,
  useReducedMotion,
} from "@/components/shared/motion";
import {
  AuroraBackground,
  BorderBeam,
  GridPattern,
  SoftBand,
  SpotlightCard,
} from "@/components/shared/backgrounds";
import { Parallax, ScrollStage } from "@/components/shared/scroll";
import { ShopifyLogo } from "@/untils/images";
import { BuiltForShopifyBadge } from "@/components/shared/BuiltForShopifyBadge";
import {
  APP_PORTFOLIO,
  SHOPIFY_APPS,
  type ShopifyApp,
} from "@/untils/data/shopifyApps";
import { motion } from "motion/react";


/**
 * Shape of one card in the CLIENT-PROJECT grid.
 *
 * Our own Shopify apps are NOT modelled here — they come from SHOPIFY_APPS and
 * render through <ShopifyAppCard> in the section above the grid, so an app we
 * publish and support never reads as one more client website.
 *
 * Three navigation modes, checked in this order by the "View more" button:
 *   1. `directurl`   — an off-site URL, opened in a new tab.
 *   2. `internalUrl` — an in-app route on this site, for an entry that has a
 *                      dedicated marketing page rather than a generic detail page.
 *   3. neither       — falls back to /projects/<getProjectSlug(title)>, which is
 *                      rendered by src/components/projects/index.jsx.
 *
 * `url` is carried by some entries for parity with the detail-page data. It is
 * deliberately NOT read here — that has always been true and stays true.
 */
type PortfolioProject = {
  title: string;
  description: string;
  /** Omit (or leave empty) and the card renders the animated mock instead. */
  images?: ImageProps["src"][];
  directurl?: string;
  internalUrl?: string;
  url?: string | null;
  features?: string[];
  technologies?: string[];
};

/* ── animated stand-in for a project that has no screenshots ──────────────── */

/** Every class string here is a literal so Tailwind's scanner can see it. */
const MOCK_SWATCHES = [
  { dot: "bg-pink-600", ring: "border-pink-600", tint: "bg-pink-200" },
  // Every `tint` here must be a THEMED token — the preview text on top of it is
  // `text-black-900`, which inverts to #DEE4F2 in dark. `orange.light` used to
  // be a literal #FFF5EE (1.19:1 against that ink, and a white disc on the dark
  // card); it now reads `--pp-orange-light` like its three siblings.
  { dot: "bg-orange-main", ring: "border-orange-main", tint: "bg-orange-light" },
  { dot: "bg-shopify-500", ring: "border-shopify-500", tint: "bg-shopify-100" },
  // A literal product colour, so it uses the static tokens: `black-900`
  // inverts to near-WHITE in dark mode, which would turn the black swatch
  // white. `tint` stays themed — it is the preview *surface*, not the colour.
  { dot: "bg-static-black", ring: "border-static-black", tint: "bg-black-200" },
];

const MOCK_PRESETS = [
  { label: "Engraving text", text: "AVA", swatch: 0, price: "+ $6.00" },
  { label: "Monogram", text: "L.M.", swatch: 2, price: "+ $4.50" },
  { label: "Custom text", text: "MIA", swatch: 1, price: "+ $8.00" },
];

/**
 * A small, self-contained CSS-only mock of a live product personalizer:
 * a product preview on the left, an option panel on the right, cycling through
 * a few presets so the card has something alive in it when there is no
 * screenshot to show.
 *
 * Reduced motion: the interval never starts, the float and caret pulse are not
 * applied, and the first preset is rendered statically. The whole thing is one
 * `role="img"` with a written-out label, so assistive tech gets a description
 * rather than a pile of decorative boxes.
 */
const ProductPersonalizerMock = () => {
  const reduce = useReducedMotion();
  const [step, setStep] = React.useState(0);

  React.useEffect(() => {
    if (reduce) return;
    const id = window.setInterval(() => {
      setStep((current) => (current + 1) % MOCK_PRESETS.length);
    }, 2600);
    return () => window.clearInterval(id);
  }, [reduce]);

  const preset = MOCK_PRESETS[step];
  const swatch = MOCK_SWATCHES[preset.swatch];
  const swapIn = reduce ? false : { opacity: 0, y: 6 };

  return (
    <div
      role="img"
      aria-label="Illustration of a live product personalizer: a shopper types custom text, picks a color swatch, and the product preview and add-on price update in real time."
      className="relative flex h-[180px] w-full items-center gap-3 overflow-hidden rounded-xl border border-black-200 bg-pink-100 p-3"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-8 -top-10 h-[110px] w-[110px] rounded-full bg-pink-200"
      />

      {/* product preview */}
      <div className="relative z-10 flex min-w-0 flex-1 items-center justify-center">
        <div
          className={`flex h-[128px] w-[104px] shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-black-200 bg-common-white p-2 shadow-md${
            reduce ? "" : " animate-float"
          }`}
          style={
            reduce
              ? undefined
              : ({ "--float-duration": "4.5s" } as React.CSSProperties)
          }
        >
          <div
            className={`flex h-[54px] w-[54px] items-center justify-center rounded-full border-2 ${swatch.ring} ${swatch.tint}`}
          >
            <motion.span
              key={`preview-${step}`}
              initial={swapIn}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="text-[13px] font-bold tracking-wide text-black-900"
            >
              {preset.text}
            </motion.span>
          </div>
          <p className="text-[9px] font-medium uppercase tracking-wide text-black-600">
            Live preview
          </p>
        </div>
      </div>

      {/* option panel */}
      <div className="relative z-10 flex w-[46%] max-w-[170px] shrink-0 flex-col justify-center gap-2">
        <div className="rounded-lg border border-black-200 bg-common-white px-2 py-1.5">
          <p className="truncate text-[8px] font-medium uppercase tracking-wide text-black-600">
            {preset.label}
          </p>
          <div className="mt-0.5 flex items-center gap-1">
            <motion.span
              key={`field-${step}`}
              initial={swapIn}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: EASE }}
              className="min-w-0 truncate text-[11px] font-semibold text-black-900"
            >
              {preset.text}
            </motion.span>
            <span
              aria-hidden="true"
              className={`h-[11px] w-[2px] shrink-0 bg-primary-main${
                reduce ? "" : " animate-pulse"
              }`}
            />
          </div>
        </div>

        <div className="rounded-lg border border-black-200 bg-common-white px-2 py-1.5">
          <p className="text-[8px] font-medium uppercase tracking-wide text-black-600">
            Swatch
          </p>
          <div className="mt-1 flex items-center gap-1.5">
            {MOCK_SWATCHES.map((option, optionIndex) => (
              <span
                key={option.dot}
                className={`flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
                  optionIndex === preset.swatch
                    ? option.ring
                    : "border-transparent-main"
                }`}
              >
                <span
                  className={`h-2.5 w-2.5 rounded-full border border-black-300 ${option.dot}`}
                />
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between gap-1 rounded-lg bg-shopify-100 px-2 py-1.5">
          <span className="flex items-center gap-1 text-[8px] font-medium uppercase tracking-wide text-shopify-700">
            <Image
              src={ShopifyLogo}
              alt=""
              aria-hidden="true"
              className="h-[11px] w-[11px] shrink-0"
            />
            Add-on
          </span>
          <motion.span
            key={`price-${step}`}
            initial={swapIn}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="shrink-0 text-[11px] font-semibold text-shopify-700"
          >
            {preset.price}
          </motion.span>
        </div>
      </div>
    </div>
  );
};

/* ── published Shopify apps ───────────────────────────────────────────────── */

/** MUI icon per app, keyed by the data module's own `icon` field. */
const APP_ICONS: Record<ShopifyApp["icon"], React.ReactNode> = {
  personalize: <AutoAwesomeOutlined />,
  sizing: <StraightenOutlined />,
  delivery: <LocalShippingOutlined />,
  discount: <SellOutlined />,
};

const APP_ACTION_CLASS =
  "inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-main px-4 py-2.5 text-[14px] font-medium text-static-white transition-colors duration-200 hover:bg-pink-700";

/**
 * One published Shopify app. All four render through this single component, so
 * the cards are identical by construction — a client-website card (screenshots
 * + slider, <SpotlightCard>) reads as a different kind of work on sight.
 *
 * EVERY fact is read from `@/untils/data/shopifyApps`: name, tagline, rating,
 * review count, price and the badge. Nothing here is a literal. In particular
 * the "Built for Shopify" chip is driven off `app.builtForShopify`, which is
 * false for PIMW — so PIMW can never render one.
 *
 * The action follows the data too: an app that has an `internalUrl` routes to
 * its page on this site (PIMW → /shopify-app); every other app opens its App
 * Store listing in a new tab. The action sits in a `flex-grow items-end`
 * wrapper so it stays pinned to the bottom of every card, keeping the four
 * buttons on one line even though only three cards carry a badge.
 */
const ShopifyAppCard = ({ app }: { app: ShopifyApp }) => {
  const stars = "★".repeat(Math.round(app.rating));

  return (
    <BorderBeam
      tone="shopify"
      radius={16}
      duration={5}
      className="h-full transition-transform duration-300 hover:-translate-y-1"
      contentClassName="flex h-full flex-col bg-common-white p-6 shadow-md transition-shadow duration-300 group-hover:shadow-xl"
    >
      <span
        aria-hidden="true"
        className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-shopify-200 bg-shopify-100 text-shopify-700 transition-colors duration-300 group-hover:border-shopify-300 group-hover:bg-shopify-200"
      >
        {APP_ICONS[app.icon]}
      </span>

      <h4 className="mt-4 text-[16px] font-semibold text-common-black md:text-[18px]">
        {app.name}
      </h4>
      <p className="mt-2 text-[14px] text-black-700">{app.tagline}</p>

      <p className="mt-4 flex flex-wrap items-baseline gap-x-2 gap-y-1 text-[14px]">
        <span aria-hidden="true" className="text-orange-main">
          {stars}
        </span>
        <span className="font-semibold text-common-black">
          <span className="sr-only">Rated </span>
          {app.rating.toFixed(1)}
          <span className="sr-only"> out of 5</span>
        </span>
        <span className="text-black-700">
          from {app.reviewCount} review{app.reviewCount === 1 ? "" : "s"}
        </span>
      </p>

      <p className="mt-1 text-[13px] text-black-600">{app.priceLabel}</p>

      {app.builtForShopify ? (
        <p className="mt-4">
          <BuiltForShopifyBadge />
        </p>
      ) : null}

      <div className="mt-5 flex w-full flex-grow items-end">
        {app.internalUrl ? (
          <Link href={app.internalUrl} className={APP_ACTION_CLASS}>
            See the full product
            <ArrowForwardRounded fontSize="small" />
          </Link>
        ) : (
          <a
            href={app.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={APP_ACTION_CLASS}
          >
            View on Shopify App Store
            <OpenInNewRounded fontSize="small" />
            <span className="sr-only"> (opens in a new tab)</span>
          </a>
        )}
      </div>
    </BorderBeam>
  );
};


const getProjectSlug = (title: string) =>
  title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

const Protfolio = () => {
  // Client work only. Our own Shopify apps are rendered above this grid by
  // <ShopifyAppCard>, from SHOPIFY_APPS — they are a different kind of work.
  const projects: PortfolioProject[] = [
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
        <section id="about" className="relative overflow-hidden py-12">
          {/* fade="both", NOT the default "bottom": this section starts at
              document y=85px, not y=0, and it clips itself with
              overflow-hidden — a bottom-only fade leaves the layer at full
              alpha along its own top edge, cutting a hard horizontal line that
              drifts out from under the floating topbar as the viewport height
              changes (and is never covered outside its left-[5%]/right-[5%]
              span). py-12 leaves room for the 18% top feather. */}
          <AuroraBackground variant="mixed" intensity={0.45} fade="both" />
          <GridPattern className="text-black-300" opacity={0.18} fade="edges" />
          <div className="relative z-10 container mx-auto px-6">
            <div>
              <div className="my-2">
                <div
                  aria-hidden="true"
                  className="w-[100px] border-2 border-pink-500 mx-auto"
                ></div>
              </div>
              <h1 className="font-display font-bold tracking-tight text-4xl text-center text-common-black my-5">
                <SplitReveal text="Welcome to Pixels Piece Portfolio" />
              </h1>
              <FadeIn delay={0.08}>
                <p className="text-lg leading-relaxed text-center text-black-700">
                  At Pixels Piece, we turn your digital dreams into reality. We
                  specialize in crafting visually stunning, highly functional
                  websites and Shopify apps tailored to your business needs. We
                  are a Shopify Partner, and we publish {APP_PORTFOLIO.appCount}{" "}
                  of our own apps on the Shopify App Store &mdash;{" "}
                  {APP_PORTFOLIO.builtForShopifyCount} of them Built for Shopify
                  &mdash; alongside the sleek portfolios and robust e-commerce
                  platforms we build for clients.
                </p>
              </FadeIn>
            </div>
            <h2 className="font-display text-2xl font-semibold tracking-tight text-common-black my-4">
              <SplitReveal text="About Us" />
            </h2>
            <FadeIn delay={0.12}>
              <p className="text-lg leading-relaxed text-black-700">
                At Pixels Piece, we provide top-notch web development and
                Shopify app development services to help businesses achieve
                their digital goals. Our expertise lies in crafting
                user-friendly, efficient, and visually appealing web solutions
                &mdash; from custom storefronts and themes to the{" "}
                {APP_PORTFOLIO.appCount} apps we publish on the Shopify App
                Store, {APP_PORTFOLIO.builtForShopifyCount} of them carrying
                Shopify&rsquo;s Built for Shopify badge &mdash; tailored to your
                needs.
              </p>
            </FadeIn>
          </div>
        </section>

        {/* ── Our Shopify apps ───────────────────────────────────────────
            Kept as its own band above the client-project grid: an app we
            publish and support is a different kind of work from a site we
            built for a client, and the two should not read as one list.

            The tint rides a feathered <SoftBand> layer inside this `relative`
            section with the content in `relative z-10` — `band-soft` on the
            <section> itself would fade the heading and cards out along with
            the tint. No aurora here: the #about band above is this page's one
            rich moment, and no second AnimatedGradientText either — "Our
            Projects" below already carries the page's single accent phrase. */}
        <section
          id="shopify-apps"
          aria-labelledby="portfolio-apps-heading"
          className="relative overflow-hidden py-12"
        >
          <SoftBand className="bg-shopify-100/50" />
          <div className="relative z-10 container mx-auto px-6">
            <FadeIn className="mb-10 flex flex-col items-center">
              <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-shopify-200 bg-common-white px-3 py-1.5 text-[13px] font-medium text-shopify-700 shadow-md">
                <Image
                  src={ShopifyLogo}
                  alt=""
                  aria-hidden="true"
                  className="h-[16px] w-[16px]"
                />
                Shopify App Store
              </span>
              <h2
                id="portfolio-apps-heading"
                className="font-display text-3xl md:text-4xl text-center font-semibold tracking-tight text-common-black"
              >
                <SplitReveal text="Our Shopify apps" />
              </h2>
              <p className="mt-4 max-w-[760px] text-center text-[16px] leading-relaxed text-black-700 md:text-[18px]">
                We publish {APP_PORTFOLIO.appCount} apps on the Shopify App
                Store &mdash; {APP_PORTFOLIO.builtForShopifyCount} of them
                Built for Shopify &mdash; rated{" "}
                {APP_PORTFOLIO.rating.toFixed(1)} across{" "}
                {APP_PORTFOLIO.totalReviews} reviews.
              </p>
            </FadeIn>

            <Stagger className="w-full" stagger={0.08} amount={0.15}>
              <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
                {SHOPIFY_APPS.map((app) => (
                  <li key={app.id} className="h-full">
                    <StaggerItem className="h-full">
                      <ShopifyAppCard app={app} />
                    </StaggerItem>
                  </li>
                ))}
              </ul>
            </Stagger>
          </div>
        </section>

        {/* ── Our Projects ───────────────────────────────────────────────
            THE scroll stage for this page: "WORK" sits at z-0 behind the grid
            and rides at 0.6× the scroll rate, so the cards travel up over it
            instead of the whole band moving as one slab. <ScrollStage> owns the
            `relative overflow-hidden` section and the `relative z-10` content
            wrapper — the word is deliberately wider than the viewport, and the
            clip is the only thing standing between it and page-wide horizontal
            scroll on mobile.

            This is the page's ONLY giant word, and it lives here rather than on
            #about because that band already carries the page's one aurora — the
            two would otherwise stack in the same viewport region.

            Tone is NOT set here. The 45% watermark this page used to reach for
            with `wordClassName="opacity-75"` is now <GiantWord>'s own default
            (`text-black-200/45`), so every word on the site shares one tone
            defined in one place. LIGHT mode is what forced the value: black-200
            at /60 over the white page leaves black-700 body copy at 4.41:1 if
            the word drifts under it — just under AA — against 4.57:1 at 45%.
            Dark mode is comfortable either way (~15:1 for the heading). */}
        <ScrollStage
          id="projects"
          word="WORK"
          speed={0.6}
          className="py-12"
        >
          <div className="container mx-auto px-6">
            <div className="mb-10 text-center">
              <h2 className="font-display text-3xl md:text-4xl text-center font-semibold tracking-tight text-common-black">
                <SplitReveal text="Our" />{" "}
                <AnimatedGradientText>Projects</AnimatedGradientText>
              </h2>
              <FadeIn delay={0.08}>
                <p className="mx-auto mt-4 max-w-[760px] text-[16px] leading-relaxed text-black-700 md:text-[18px]">
                  Websites, storefronts and platforms we have built for clients.
                </p>
              </FadeIn>
            </div>
            <div className="flex justify-center gap-6 flex-wrap">
              <Stagger
                role="list"
                stagger={0.09}
                amount={0.15}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
              >
                {projects.map((project, index) => (
                  <StaggerItem
                    key={project.title}
                    role="listitem"
                    className="w-full md:max-w-[400px] h-full"
                  >
                    {/* The parallax rides on its OWN plain div, between the
                        StaggerItem above and the HoverLift below. GSAP writes
                        `transform` for data-speed and motion writes `transform`
                        for the entrance and the hover — merging data-speed onto
                        either motion component would let whichever wrote last
                        silently erase the other.

                        Only the middle column lags (0.95), so the grid reads
                        A-B-A instead of rising as one flat slab. `index % 3` is
                        the column index wherever this can be seen: the smoother
                        is off at ≤1024px, so the grid is always at its lg
                        3-column layout whenever data-speed is live. The other
                        columns still get the wrapper (no data-speed on it) so
                        every card keeps an identical DOM shape.

                        Safe over react-slick: getWidth() in
                        react-slick/lib/utils/innerSliderUtils reads
                        `elem.offsetWidth`, which a translate on an ancestor
                        does not touch — and #smooth-content is already a
                        transformed ancestor of every slider on the site. */}
                    <Parallax
                      speed={index % 3 === 1 ? 0.95 : undefined}
                      className="h-full w-full"
                    >
                      {/* HoverLift + SpotlightCard wrap the CARD, never the
                          slider internals: react-slick measures its own track and
                          a motion/spotlight wrapper inside it would fight those
                          measurements. press={1} disables the tap-scale so
                          dragging a slide does not shrink the card. */}
                      <HoverLift press={1} className="h-full w-full">
                        <SpotlightCard
                          className="h-full w-full rounded-2xl border border-black-200 bg-common-white py-4 shadow-md transition-shadow duration-300 hover:shadow-xl"
                          contentClassName="flex h-full flex-col"
                        >
                          <div className="p-4">
                            {project.images && project.images.length > 0 ? (
                              // Screenshots are light-UI shots sitting on a dark
                              // surface, so the frame clips and outlines them.
                              <Slider
                                {...settingsInside}
                                className="rounded-xl overflow-hidden border border-black-200"
                              >
                                {project.images.map((image, imageIndex) => (
                                  <div key={imageIndex} className="relative">
                                    <Image
                                      src={image}
                                      alt={`${project.title} screenshot ${
                                        imageIndex + 1
                                      }`}
                                      className="w-full h-[180px]"
                                    />
                                  </div>
                                ))}
                              </Slider>
                            ) : (
                              <ProductPersonalizerMock />
                            )}
                          </div>

                          <div className="flex flex-col flex-grow items-start justify-between p-5">
                            <h3 className="font-display text-2xl font-semibold tracking-tight mb-2 text-primary-main">
                              {project.title}
                            </h3>
                            <p className="flex-grow mb-2 text-black-700 text-[16px]">
                              {project.description}
                            </p>
                            <button
                              type="button"
                              aria-label={`View more about ${project.title}`}
                              className="cursor-pointer text-center rounded-lg text-black-700 border border-black-200 bg-black-100 w-full mt-2 py-2 transition-colors duration-200 hover:bg-black-200"
                              onClick={() => {
                                if (project.directurl) {
                                  window.open(
                                    project.directurl,
                                    "_blank",
                                    "noopener,noreferrer"
                                  );
                                } else if (project.internalUrl) {
                                  router.push(project.internalUrl);
                                } else {
                                  router.push(
                                    `/projects/${getProjectSlug(project.title)}`
                                  );
                                }
                              }}
                            >
                              View more
                              <span>
                                <LaunchIcon className="ml-1" fontSize="small" />
                              </span>
                            </button>
                          </div>
                        </SpotlightCard>
                      </HoverLift>
                    </Parallax>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
          </div>
        </ScrollStage>
      </main>
    </div>
  );
};

export default Protfolio;
