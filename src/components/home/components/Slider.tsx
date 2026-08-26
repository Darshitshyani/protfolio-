import { CustomImagePreview } from "@/components/shared/CustomImagePreview";
import Tilt3D from "@/components/shared/Tilt3D";
import { MobileApp, TestingImage, WebImage } from "@/untils/images";
import React from "react";
import Slider from "react-slick";
import type { StaticImageData } from "next/image";
import ElectricBorder from "@/components/shared/backgrounds/ElectricBorder";
import { SplitReveal } from "@/components/shared/motion";
import { SoftBand } from "@/components/shared/backgrounds";
import { motion, useInView, useReducedMotion, type MotionProps } from "motion/react";

/**
 * The four service cards.
 *
 * Extracted from four hand-written, near-identical JSX blocks. They had already
 * drifted (inconsistent whitespace, one title at text-[18px] where the others
 * were text-[16px]) and, more importantly, two of them had SWAPPED ICONS:
 * "Web Design & Development" rendered the mobile-app glyph and "Mobile App
 * Development" rendered the web glyph. One component over one array makes that
 * class of bug impossible.
 *
 * Copy is verbatim from the previous markup.
 */
type Service = { title: string; body: string[]; image: StaticImageData };

const SERVICES: Service[] = [
  {
    title: "Web Design & Development",
    image: WebImage, // was MobileApp — the icons were swapped with the card below
    body: [
      "We offer comprehensive services in application management and modernization, designed to drive the growth and success of your business.",
      "We enhance performance, scalability, and security, empowering your business to stay competitive in a rapidly evolving digital landscape. With our tailored solutions.",
    ],
  },
  {
    title: "Mobile App Development",
    image: MobileApp, // was WebImage
    body: [
      "We specialize in application management and modernization services to drive the growth and innovation of your business. Our solutions focus on upgrading legacy systems with the technologies.",
      "By streamlining processes and enhancing application efficiency, we empower your business to thrive in today\u2019s competitive digital environment.",
    ],
  },
  {
    title: "Software Testing Service",
    image: TestingImage,
    body: [
      "We offer expert application management and modernization services to support the growth and evolution of your business. By upgrading outdated systems with cutting-edge technologies",
      "we enhance performance, scalability. Our tailored solutions ensure seamless operations, enabling your business to adapt to changing market demands and achieve sustained success.",
    ],
  },
  {
    title: "IT Consulting Services",
    image: MobileApp,
    body: [
      "We are a premier IT consulting firm dedicated to delivering top-notch solutions that enhance your company's scalability, efficiency, and performance.",
      "We strive to streamline operations, optimize processes, and drive sustainable growth, ensuring your company stays ahead in a competitive market.",
    ],
  },
];

/* ── Depth and life inside the cards ────────────────────────────────────────
 *
 * WHY THE PLATE BELOW OPENS ITS OWN `perspective`
 * <Tilt3D> gives the card a real 3D context, but that context does not survive
 * the trip down into the card's contents: Tilt3D's `translateZ` lift wrapper
 * leaves `transform-style` at its `flat` default, and every element between it
 * and the icon inherits that flattening. A `translateZ` written down here is not
 * a bug you can see — it compiles, it renders, it simply does nothing. So the
 * plate opens a LOCAL perspective root, which nothing above it can flatten. The
 * bonus is that its depth reads CONTINUOUSLY rather than only under the pointer.
 *
 * WHY THE LOOP IS GATED
 * The sway runs off a card-level `useInView`, so a slide parked off-screen (and
 * react-slick keeps several of those, plus its infinite-mode clones) costs
 * nothing. The page already carries a WebGL logo, a cursor-grid canvas and eight
 * electric borders; it does not also need animations nobody is looking at.
 *
 * NOTE: <ShopifyPartner> carries a twin of `accent` and <DepthPlate>. If a third
 * caller ever appears, promote the pair into @/components/shared rather than
 * copying it a third time.
 */

/**
 * `animate` + `transition` for one looping accent. `run` folds together "on
 * screen" and "motion is welcome"; when it is false the element eases back to
 * `rest` ONCE and holds. The two props travel together because the transition
 * has to change with the target — a `repeat: Infinity` left on the settle keeps
 * the loop ticking at zero amplitude, all of the cost and none of the payoff.
 *
 * `phase` is not optional decoration. Cards in one row share a single
 * IntersectionObserver threshold, so without a delay every accent in the row
 * starts at phase 0 the instant the row arrives. Differing DURATIONS only pull
 * them apart after several cycles — which is long after the two seconds when
 * someone is actually looking at a row that just landed, so the grid reads as
 * lockstep at precisely the moment lockstep is most visible. A per-index delay
 * separates them from the first frame.
 */
const accent = (
  run: boolean,
  cycle: number,
  keyframes: MotionProps["animate"],
  rest: MotionProps["animate"],
  phase = 0
): MotionProps => ({
  animate: run ? keyframes : rest,
  transition: run
    ? { duration: cycle, delay: phase, repeat: Infinity, ease: "easeInOut" }
    : { duration: 0.4, ease: "easeOut" },
});

/** Extrusion layers. Four reads solid at icon size; more is only more nodes. */
const PLATE_WALLS = [1, 2, 3, 4];

interface DepthPlateProps {
  /** The face. Rendered in flow at Z 0, so it should fill the plate. */
  children: React.ReactNode;
  /** Plate edge in px. */
  size: number;
  /** Seconds for one sway. VARY IT per card. */
  cycle: number;
  /** False parks the plate square-on and stops its loop. */
  run: boolean;
  /**
   * Seconds of delay before the loop's first cycle. Cards in one row share an
   * IntersectionObserver threshold, so without this every plate in the row
   * starts at phase 0 together and a differing `cycle` only pulls them apart
   * several seconds later — long after the moment anyone is looking at a row
   * that just arrived.
   */
  phase?: number;
  wallClassName?: string;
  haloClassName?: string;
  className?: string;
}

/**
 * The service icon, given real thickness on two depth planes: the face at Z 0,
 * four copies receding behind it to build the rim (the construction <Text3D>
 * uses to extrude letters), and a wider halo far enough back that the sway
 * visibly slides it against the face. That parallax between planes is the depth
 * cue — the one thing a flat icon with a drop shadow cannot fake.
 *
 * Everything it draws stays inside the plate's own box plus the halo's inset, so
 * nothing here relies on overflowing: .slick-list clips, and a card that needs
 * to spill outside it would be sheared off mid-slide.
 */
const DepthPlate = ({
  children,
  size,
  cycle,
  run,
  phase = 0,
  // Rings, not discs. This face is a bordered circle with a TRANSPARENT
  // interior, so filled copies behind it would show straight through the middle
  // as a grey blob instead of reading as the edge of a solid.
  wallClassName = "border border-black-400",
  haloClassName = "-inset-2 border border-black-300",
  className = "",
}: DepthPlateProps) => (
  <span
    className={`relative block shrink-0 ${className}`}
    style={{ width: size, height: size, perspective: size * 5 }}
  >
    {/* Sway on the group, Z offsets on the children. Both are `transform`, and
        two of them on one node means the later write erases the earlier. */}
    <motion.span
      className="relative block h-full w-full"
      style={{ transformStyle: "preserve-3d" }}
      {...accent(
        run,
        cycle,
        // Both tracks START at the resting angle, because a keyframe array
        // begins AT its first value: written [-15, 15, -15] the plate would jump
        // 15 degrees the instant the card scrolled into view. The X track runs
        // at twice the frequency of the Y track, which keeps the sway off any
        // single axis and stops it looking like a hinge.
        {
          rotateY: [0, -15, 0, 15, 0],
          rotateX: [0, 10, 0, -10, 0, 10, 0, -10, 0],
        },
        { rotateY: 0, rotateX: 0 },
        phase
      )}
    >
      <span
        aria-hidden="true"
        className={`absolute rounded-full ${haloClassName}`}
        style={{ transform: "translateZ(-20px)" }}
      />
      {PLATE_WALLS.map((i) => (
        <span
          key={i}
          aria-hidden="true"
          className={`absolute inset-0 rounded-full ${wallClassName}`}
          style={{
            // The scale cancels the perspective shrink of a receding copy, so
            // the rim still shows past the face instead of hiding behind it.
            transform: `translateZ(${-i * 3}px) scale(${1 + i * 0.03})`,
            opacity: 0.5 - i * 0.08,
          }}
        />
      ))}
      {children}
    </motion.span>
  </span>
);

/**
 * One service card: green electric rim over a glass surface, matching the app
 * cards in <ShopifyPartner> but tinted to the platform green.
 *
 * `my-6` is load-bearing — react-slick clips .slick-list, and the border's
 * outer glow (scale 1.1 + 32px blur) needs vertical room or it is sheared off.
 */
const ServiceCard = ({
  service,
  index,
}: {
  service: Service;
  index: number;
}) => {
  const reduce = useReducedMotion();
  const cardRef = React.useRef<HTMLDivElement>(null);
  const inView = useInView(cardRef, { margin: "120px" });
  const run = inView && !reduce;

  return (
  <div ref={cardRef} className="mx-3 my-6">
    <Tilt3D
      className="h-full"
      innerClassName="h-full"
      max={9}
      // ── NO IDLE SWAY, AND A DEEPER PERSPECTIVE ─────────────────────────
      // The body of this card is two paragraphs of service copy and three or
      // four of them are side by side at any time. A permanent rotation on the
      // element that HOLDS the prose warps its glyphs and keeps the layer
      // promoted and raster-cached, so the copy renders once and is
      // texture-scaled after that — which is what makes it read soft rather
      // than crisp. The same lift against Tilt3D's 900 default also magnified
      // the contents ~3% while that cache was built at 1x; 1600 cuts that to
      // ~1.5% and keeps the pointer lean from fisheyeing a 400px-wide card.
      //
      // The card does not go still: <ElectricBorder> arcs around the rim and
      // <DepthPlate> turns the icon, and both of those are on elements that
      // carry no text.
      //
      // `lift` is up from 16 but held here for two reasons: <ElectricBorder>
      // sizes its canvas from getBoundingClientRect(), which reports the
      // TRANSFORMED box, and the lifted card grows inside a .slick-list that
      // clips.
      lift={24}
      perspective={1600}
      idle={0}
    >
    <ElectricBorder
      color="#4ADE80"
      speed={0.8}
      chaos={0.12}
      borderRadius={12}
      className="h-full"
      // Four of these sit side by side, so the outer glow is dialled well below
      // upstream's 0.3 — at full strength the four halos merge into one green
      // wash and the section stops reading as separate cards.
      style={{ "--eb-glow": 0.1, "--eb-glow-blur": "18px" } as React.CSSProperties}
    >
      <div className="flex min-h-[350px] flex-col gap-2 rounded-xl bg-common-white/85 px-4 py-4 backdrop-blur-xl backdrop-saturate-150 ring-1 ring-inset ring-static-white/10">
        {/* 60 = the 50px image box + p-1 either side + the 1px rim, so the
            plate is the same size the flat version was. */}
        <DepthPlate size={60} cycle={6.4 + index * 0.65} phase={index * 0.5} run={run}>
          <span className="block h-full w-full rounded-full border border-black-400 p-1">
            <span className="relative block h-full w-full">
              <CustomImagePreview image={service.image} />
            </span>
          </span>
        </DepthPlate>
        <h3 className="text-[16px] font-semibold text-common-black md:text-[18px]">
          {service.title}
        </h3>
        {service.body.map((para) => (
          <p key={para} className="text-[15px] text-black-600 md:text-[16px]">
            {para}
          </p>
        ))}
      </div>
    </ElectricBorder>
    </Tilt3D>
  </div>
  );
};

const Sliders = () => {
  var settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1324,
        settings: {
          slidesToShow: 2,
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
        breakpoint: 700,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="relative w-full h-full py-[40px] px-4 md:px-[50px] lg:px-[100px] ">
      {/* The tint rides its own feathered layer, never this element: `band-soft`
          masks every painted descendant, so on the wrapper it would fade the
          "Services we offer" heading and the top row of cards out with it. */}
      <SoftBand className="bg-black-100/50" />
      <div className="relative z-10">
      {/* Heading Section */}
      <div className="flex justify-center">
        <h2 className="font-display text-[28px] md:text-[34px] lg:text-[40px] font-bold text-common-black mb-[20px]">
          <SplitReveal text="Services we offer" />
        </h2>
      </div>

      {/* Slider Section */}
      <div className="w-full px-2 md:px-5 overflow-hidden pb-[50px] ">
        <Slider {...settings} className="flex  h-full">
          {SERVICES.map((service, index) => (
            <ServiceCard key={service.title} service={service} index={index} />
          ))}
        </Slider>
      </div>
      </div>
    </div>
  );
};

export default Sliders;
