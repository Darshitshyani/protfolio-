import Circle from "@/untils/icons/Circle";
import { SA1, SA2 } from "@/untils/images";
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

const expertiseHighlights = [
  {
    title: "Diverse Domain Expertise",
    description:
      "Our technical capabilities span across multiple industries, allowing us to cater to a wide range of client requirements. With knowledge extending beyond healthcare, education, and finance, we bring a comprehensive outlook to product design, fostering flexibility and innovative solutions.",
  },
  {
    title: "Commitment to Learning and Innovation",
    description:
      "To stay ahead in the ever-evolving tech landscape, our team embraces continuous learning and experimentation. By leveraging the latest tools and practices, we deliver forward-thinking solutions that align with emerging trends and industry standards.",
  },
  {
    title: "User-Focused Technology Stack",
    description:
      "We emphasize the adoption of technologies that resonate with user needs and preferences. By focusing on a user-friendly tech stack, we create intuitive and immersive experiences that drive user satisfaction and contribute to product success.",
  },
];
const softwareArchitecturePrinciples = [
  {
    title: "Scalability and Performance Optimization",
    description:
      "Designing scalable solutions ensures the system can grow seamlessly while maintaining responsiveness and efficiency. Performance optimization focuses on handling increased loads without compromising user experience.",
  },
  {
    title: "Security Integration",
    description:
      "Robust security measures, such as encryption, authentication, and authorization, are integrated into the architecture to protect sensitive data and safeguard against vulnerabilities and cyber threats.",
  },
  {
    title: "Modularity and Component Reusability",
    description:
      "A modular approach divides the system into independent, reusable components, enhancing maintainability, simplifying updates, and enabling efficient reuse across various application parts.",
  },
  {
    title: "Technology Stack Selection",
    description:
      "Selecting the right programming languages, frameworks, and tools ensures compatibility, performance, and scalability, aligning the technology stack with the project's unique requirements.",
  },
  {
    title: "Documentation and Communication",
    description:
      "Comprehensive documentation outlines the system's structure, components, and interactions, while clear communication among development teams ensures a shared understanding of the architecture and its objectives.",
  },
];
const SoftwareAct = () => {
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
            <SplitReveal text="Software" />{" "}
            <AnimatedGradientText className="font-bold">
              Architecture
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
          word="ARCH"
          speed={0.6}
          align="center"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1200px]">
          <h2 className="font-display text-[25px] font-bold tracking-tight text-common-black md:text-[30px] lg:text-[35px]">
            <SplitReveal text="Software Architecture" className="text-pink-500" />{" "}
            <SplitReveal text="Stages" delay={0.14} />
          </h2>
          <FadeIn delay={0.08}>
            <p className="mt-3 w-full text-black-600 lg:w-1/2">
              Software architecture involves designing and structuring the
              fundamental components of a software system, defining their
              relationships and interactions to ensure scalability,
              maintainability, and optimal performance
            </p>
          </FadeIn>
          <div className="mt-5 grid grid-cols-1 items-start gap-5 xl:grid-cols-2">
            <SlideIn from="left" className="w-full">
              <Image
                src={SA2}
                alt="Architecture diagram being sketched on a whiteboard"
                className="h-auto w-full rounded-xl border border-black-200"
              />
            </SlideIn>

            <Stagger className="flex flex-col gap-2" stagger={0.07}>
              {softwareArchitecturePrinciples.map((item) => (
                <StaggerItem
                  key={item.title}
                  className="flex w-full flex-col rounded-xl border-2 border-pink-500 bg-common-white p-2 shadow-lg"
                >
                  <h3 className="flex items-center gap-2 text-[20px] font-semibold text-common-black">
                    <span aria-hidden="true" className="font-bold text-primary-main">
                      ➤
                    </span>{" "}
                    {item.title}
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

      {/* ── why it matters ─────────────────────────────────────────────── */}
      <section className="w-full px-4 py-[50px] md:px-[50px] lg:px-[100px]">
        <div className="mx-auto grid w-full max-w-[1200px] grid-cols-1 place-items-center gap-8 xl:grid-cols-2">
          <div className="w-full items-start text-start">
            <h2 className="text-center font-display text-[25px] font-bold tracking-tight text-common-black md:text-left lg:text-[35px]">
              <SplitReveal text="Why Software Architecture Matters" />
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
                {expertiseHighlights.map((item) => (
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
              src={SA1}
              alt="Developer planning a software system architecture"
              className="relative z-10 h-auto w-full rounded-xl border border-black-200"
            />
          </SlideIn>
        </div>
        <div className="mt-3">
          <Circle />
        </div>
      </section>
    </div>
  );
};

export default SoftwareAct;
