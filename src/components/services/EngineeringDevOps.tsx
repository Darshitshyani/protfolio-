import Circle from "@/untils/icons/Circle";
import { DEV1, DEV2 } from "@/untils/images";
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

const whyEngineeringDevOpsMatters = [
    {
      title: "Diverse Domain Expertise",
      description: "Our technical capabilities span multiple industries, allowing us to cater to varied client needs. From cloud infrastructure and CI/CD pipelines to monitoring and automation, we bring a holistic approach to Engineering DevOps, fostering adaptability and innovative solutions."
    },
    {
      title: "Commitment to Learning and Innovation",
      description: "In the rapidly evolving tech landscape, our team is dedicated to continuous learning and experimentation. By adopting cutting-edge tools and practices such as containerization, orchestration, and IaC (Infrastructure as Code), we deliver scalable and future-proof solutions aligned with industry best practices."
    },
    {
      title: "User-Focused Technology Stack",
      description: "We prioritize the adoption of tools and technologies that meet user needs and improve developer efficiency. By implementing user-friendly DevOps practices, we ensure seamless workflows, robust infrastructure, and high-quality deployments that enhance user satisfaction and product reliability."
    }
  ];
const engineeringDevOpsPrinciples = [
  {
    title: "Scalability and Performance Optimization",
    description:
      "Engineering and DevOps prioritize designing scalable systems that grow seamlessly while maintaining performance. Optimization ensures systems handle increased loads without compromising user experience.",
  },
  {
    title: "Security Integration",
    description:
      "By embedding robust security measures like encryption, authentication, and authorization, we protect sensitive data and safeguard systems from vulnerabilities and cyber threats.",
  },
  {
    title: "Commitment to Learning and Innovation",
    description:
      "Our teams embrace continuous learning and experimentation to stay ahead in the evolving tech landscape. Leveraging cutting-edge tools and practices, we deliver forward-thinking solutions aligned with modern standards.",
  },
  {
    title: "Automation and Efficiency",
    description:
      "Automation through CI/CD pipelines streamlines software delivery, reducing manual effort while improving accuracy and accelerating development lifecycles.",
  },
  {
    title: "Modularity and Component Reusability",
    description:
      "A modular approach promotes the development of reusable components, simplifying maintenance and enabling efficient updates across applications.",
  },
  {
    title: "Technology Stack Selection",
    description:
      "Careful selection of programming languages, frameworks, and tools ensures performance, scalability, and compatibility with project-specific requirements.",
  },
  {
    title: "Collaborative Communication and Documentation",
    description:
      "Clear documentation and open communication among teams foster collaboration and ensure smooth implementation of engineering and DevOps strategies.",
  },
];
const EngineeringDevOps = () => {
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
            <SplitReveal text="Engineering &amp;" />{" "}
            <AnimatedGradientText className="font-bold">
              DevOps
            </AnimatedGradientText>
          </h1>
          <p className="mx-auto mt-5 max-w-[820px] font-display text-[18px] font-semibold tracking-tight text-black-800 md:text-[24px] lg:text-[28px]">
            <SplitReveal
              text="Streamlining Development and Operations for Scalable Secure and Efficient Solutions."
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
          word="DEVOPS"
          speed={0.6}
          align="center"
        />
        <div className="relative z-10 mx-auto w-full max-w-[1200px]">
          <h2 className="font-display text-[25px] font-bold tracking-tight text-common-black md:text-[30px] lg:text-[35px]">
            <SplitReveal text="Engineering &amp; DevOps" className="text-pink-500" />{" "}
            <SplitReveal text="Stages" delay={0.14} />
          </h2>
          <FadeIn delay={0.08}>
            <p className="mt-3 w-full text-black-600 lg:w-1/2">
              Engineering &amp; DevOps focuses on integrating development and
              operations practices to build scalable, maintainable systems,
              ensuring seamless collaboration, automation, and optimal
              performance
            </p>
          </FadeIn>
          <div className="mt-5 grid grid-cols-1 items-start gap-5 xl:grid-cols-2">
            <SlideIn from="left" className="w-full">
              <Image
                src={DEV1}
                alt="Engineers working on a continuous delivery pipeline"
                className="h-auto w-full rounded-xl border border-black-200"
              />
            </SlideIn>

            <Stagger className="flex flex-col gap-2" stagger={0.06}>
              {engineeringDevOpsPrinciples.map((item) => (
                <StaggerItem
                  key={item.title}
                  className="flex w-full flex-col rounded-xl border-2 border-black-500 bg-common-white p-2 shadow-lg"
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
              <SplitReveal text="Why whyEngineering &amp; DevOps Matters for Your Company?" />
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
                {whyEngineeringDevOpsMatters.map((item) => (
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
              src={DEV2}
              alt="Cloud infrastructure and automation dashboard"
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

export default EngineeringDevOps;
