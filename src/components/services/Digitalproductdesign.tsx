import Circle from "@/untils/icons/Circle";
import { ProductDesign1, ProductDesign2 } from "@/untils/images";
import Image from "next/image";
import React from "react";

import {
  AnimatedGradientText,
  FadeIn,
  Reveal,
  SlideIn,
  SplitReveal,
  Stagger,
  StaggerItem,
} from "@/components/shared/motion";
import {
  AuroraBackground,
  GlowOrb,
  GridPattern,
  SoftBand,
} from "@/components/shared/backgrounds";
import { GiantWord, Parallax } from "@/components/shared/scroll";

const designProcess = [
  {
    phase: "Comprehensive User Research",
    description:
      "Thorough user research and analysis are essential for creating effective digital product designs. Our designers focus on gaining genuine insights into user preferences by conducting interviews, mapping customer journeys, and understanding their needs and goals.",
  },
  {
    phase: "Defining User Challenges",
    description:
      "The next phase involves clearly defining the problems based on the research findings. Our designers analyze these insights to understand user challenges better, which helps in framing the issues from a user-centric perspective. This stage includes brainstorming potential solutions to address these challenges.",
  },
  {
    phase: "Idea Generation and Prioritization",
    description:
      "During this phase, designers work on the most promising solutions. We collect, prioritize, and implement ideas to create the best possible product or service. This process involves generating, selecting, and executing ideas using various techniques to foster innovation and explore diverse options.",
  },
  {
    phase: "Rapid Prototyping",
    description:
      "Prototyping involves creating scaled-down versions of the product to test user experience, gather market feedback, and identify potential issues. This iterative process helps refine the product based on user feedback and assess the viability of ideas before the final launch.",
  },
  {
    phase: "Thorough Product Testing",
    description:
      "Testing is crucial for ensuring that the product functions as intended. It involves identifying and fixing bugs, minimizing development costs, and enhancing performance. Testing often leads to revisiting earlier stages to refine the problem statement and spark new ideas, ensuring the final product meets user expectations and quality standards.",
  },
];
const benefitsOfDesign = [
  {
    title: "Enhanced User Engagement",
    description:
      "A well-designed digital product keeps users engaged, encouraging them to spend more time interacting with your platform and achieving their goals with ease.",
  },
  {
    title: "Business Growth",
    description:
      "A seamless user experience can drive conversions, increase customer retention, and ultimately boost revenue. Good design isn’t just an investment in aesthetics; it’s a business strategy.",
  },
  {
    title: "Competitive Advantage",
    description:
      "In a world of countless apps and websites, exceptional design can set your product apart from the competition. A thoughtful design creates a lasting impression and fosters brand loyalty.",
  },
];
const Digitalproductdesign = () => {
  return (
    <div className="mt-[80px] w-full">
      {/* ── hero ───────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden">
        {/* fade="both": this hero starts ~80px down the document, not at y=0, and
            the section clips with overflow-hidden. The topbar pill only covers
            5%–95% of the width, so an unfeathered top edge draws a visible
            horizontal cut across the outer strips at every viewport height. */}
        <AuroraBackground variant="blue" intensity={0.45} fade="both" />
        <GridPattern className="text-black-300" opacity={0.16} fade="edges" />
        <div className="relative z-10 mx-auto flex w-full max-w-[1100px] flex-col items-center px-4 py-[60px] text-center md:px-[50px] md:py-[80px] lg:px-[100px]">
          <FadeIn>
            <div
              aria-hidden="true"
              className="mx-auto mb-6 w-[50px] border-2 border-pink-500 md:w-[80px]"
            />
          </FadeIn>
          <Reveal>
            <p className="text-[18px] text-black-800 md:text-[22px]">
              Pixels Piece
            </p>
          </Reveal>
          <h1 className="mt-2 font-display text-[28px] font-bold leading-[1.14] tracking-tight text-common-black md:text-[40px] lg:text-[48px]">
            <SplitReveal text="Digital product" />{" "}
            <AnimatedGradientText className="font-bold">
              design
            </AnimatedGradientText>
          </h1>
          <p className="mx-auto mt-5 max-w-[820px] font-display text-[18px] font-semibold tracking-tight text-black-800 md:text-[24px] lg:text-[28px]">
            <SplitReveal
              text="Elevating your brand with stunning digital designs and user experiences."
              delay={0.25}
            />
          </p>
        </div>
      </section>

      {/* ── why it matters ─────────────────────────────────────────────── */}
      <section className="w-full px-4 py-[50px] md:px-[50px] lg:px-[100px]">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 place-items-center gap-8 xl:grid-cols-2">
          <div className="w-full items-start text-start">
            <h2 className="text-center font-display text-[25px] font-bold tracking-tight text-common-black md:text-left lg:text-[35px]">
              <SplitReveal text="Why Digital Product Design Matters" />
            </h2>
            {/* The gentle lag rides its OWN wrapper. <Stagger> is a motion.div:
                GSAP writes `transform` for data-speed and motion writes
                `transform` for the entrance, so merging the two onto one node
                would let whichever writes last silently kill the other. It sits
                on THIS grid rather than on the stage cards because this section
                is not clipped — a lagging column inside the overflow-hidden
                giant-word section would have its bottom edge cut off at the
                extremes of the scroll. */}
            <Parallax speed={0.95} className="w-full">
              <Stagger className="w-full" stagger={0.07}>
                {benefitsOfDesign.map((item) => (
                  <StaggerItem key={item.title}>
                    <p className="mt-6 text-[20px] font-medium text-common-black">
                      {item.title}
                    </p>
                    <p className="text-[16px] text-black-800 md:text-[18px]">
                      {item.description}
                    </p>
                  </StaggerItem>
                ))}
              </Stagger>
            </Parallax>
          </div>
          <SlideIn
            from="right"
            className="relative my-3 w-full md:w-[80%] xl:w-full"
          >
            <GlowOrb
              color="blue"
              size={420}
              className="left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            />
            <Image
              src={ProductDesign1}
              alt="Designers mapping a digital product experience together"
              className="relative z-10 h-auto w-full rounded-xl border border-black-200"
            />
          </SlideIn>
        </div>
        <div className="mt-3">
          <Circle />
        </div>
      </section>

      {/* ── stages ─────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden px-4 py-[50px] md:px-[50px] lg:px-[100px]">
        {/* The tint rides its own feathered layer. `band-soft` on the <section>
            masks every painted descendant, so with only 50px of padding it
            would render this heading at ~35% opacity and the last row of cards
            at less than half. Only the tint feathers now. */}
        <SoftBand className="bg-black-100/50" />
        {/* The ONE giant word on this page — the hero already spends the page's
            single aurora, and the global AmbientBackground carries depth
            everywhere else. It rides this section because on xl a lone image
            sits opposite a taller card column, so the word surfaces in the
            empty space below the image and through the card gutters instead of
            under body copy; the heading and intro sit above the centred word,
            and every card is an opaque `bg-common-white` surface that rides up
            over it.

            Placed directly rather than through <ScrollStage> so <SoftBand> can
            stay a direct child of the section: inside ScrollStage's
            `relative z-10` wrapper the tint would shrink to the padding box and
            draw exactly the horizontal seam it exists to prevent. That makes
            the clipping this section's own job — `overflow-hidden` above is
            mandatory, because the word is deliberately wider than the viewport
            and an unclipped one scrolls the whole page sideways on mobile.

            Same speed and same tone as the word on the other four service
            pages. */}
        <GiantWord
          word="DESIGN"
          speed={0.6}
          align="center"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1200px]">
          <h2 className="font-display text-[25px] font-bold tracking-tight text-common-black md:text-[30px] lg:text-[35px]">
            <SplitReveal text="Digital Product Design" className="text-pink-500" />{" "}
            <SplitReveal text="Stages" delay={0.14} />
          </h2>
          <FadeIn delay={0.08}>
            <p className="mt-3 w-full text-black-600 lg:w-1/2">
              Product design using a human-centered approach allows us to build
              tools that your customers will love to use. We follow a five-stage
              process to design and develop optimized software that drives
              engagement.
            </p>
          </FadeIn>
          <div className="mt-5 grid grid-cols-1 items-start gap-5 xl:grid-cols-2">
            <SlideIn from="left" className="w-full">
              <Image
                src={ProductDesign2}
                alt="Design team reviewing wireframes and prototypes"
                className="h-auto w-full rounded-xl border border-black-200"
              />
            </SlideIn>

            <Stagger className="flex flex-col gap-2" stagger={0.07}>
              {designProcess.map((item) => (
                <StaggerItem
                  key={item.phase}
                  className="flex w-full flex-col rounded-xl border-2 border-pink-500 bg-common-white p-2 shadow-lg"
                >
                  <h3 className="flex items-center gap-2 text-[20px] font-semibold text-common-black">
                    <span aria-hidden="true" className="font-bold text-primary-main">
                      ➤
                    </span>{" "}
                    {item.phase}
                  </h3>

                  <p className="pl-8 text-[14px] font-medium text-black-700 md:text-[15px] lg:text-[16px]">
                    {item.description}
                  </p>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Digitalproductdesign;
