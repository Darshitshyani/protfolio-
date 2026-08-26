import { CaseImageOne, CaseImageThree, CaseImageTwo } from "@/untils/images";
import Tilt3D from "@/components/shared/Tilt3D";
import type { StaticImageData } from "next/image";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";
import {
  FadeIn,
  SplitReveal,
  Stagger,
  StaggerItem,
  useReducedMotion,
} from "@/components/shared/motion";
import { SoftBand, SpotlightCard } from "@/components/shared/backgrounds";

/**
 * Case studies band.
 *
 * The band is translucent (`/50`) and feathered, so it reads as a tint over the
 * global <AmbientBackground/> instead of an opaque rectangle. The feather rides
 * a <SoftBand> layer, NOT the <section>: `band-soft` masks every painted
 * descendant, so on the section it would fade the heading and the first/last
 * card out along with the tint.
 * Interior section: no aurora — the hero and the Shopify band are the page's
 * two rich moments.
 *
 * Card surfaces are UNIFORM. They previously used three unrelated tint tokens
 * (grey-light / green-light / salmon_Pink-light) which, once the palette
 * inverted for dark, read as an arbitrary navy/green/mauve sequence. One
 * surface + alternating image side carries the rhythm instead.
 *
 * Every metric below is lifted verbatim from the paragraph beside it — the
 * chips surface numbers that were already buried in the prose, they do not
 * introduce new claims. Copy is otherwise untouched.
 *
 * ── THE GIANT WORD (NOT CURRENTLY RENDERED) ────────────────────────────────
 * Read the rest of this block as the contract for the word, not as a
 * description of the markup below: no <GiantWord> is mounted here at present,
 * and the home page currently carries no giant word at all. Everything the
 * word needs is still standing — the z-0 <SoftBand>, the `relative z-10`
 * content wrapper and the mandatory `overflow-hidden` on the <section> — so
 * restoring it is a one-line change, and the reasoning below is why it goes
 * back exactly where it is described and nowhere else.
 *
 * This is the home page's ONE scroll-stage word. The alternating cards are the
 * reason it lives here: they are wide, opaque `bg-common-white` slabs, so they
 * occlude and reveal the word as they ride up over it, which is the entire
 * effect. It is aria-hidden decoration (handled inside <GiantWord>), never
 * copy, and it makes no claim.
 *
 * It rides <GiantWord> rather than <ScrollStage> because this section ALREADY
 * owns a background layer. The tint has to paint UNDER the word, and every
 * child of <ScrollStage> lands inside its `relative z-10` wrapper — which
 * would (a) stack the tint on top of the word and roughly halve an already
 * low-contrast watermark, and (b) inset the band by the section's own padding,
 * leaving the hard left/right edge that the feathering exists to remove. So
 * the order below is load-bearing:
 *
 *   <SoftBand>   absolute z-0            — the tint
 *   <GiantWord>  absolute z-0, later     — paints above the tint
 *   <div relative z-10>                  — every bit of real content
 *
 * `overflow-hidden` on the <section> is therefore MANDATORY, not cosmetic: the
 * word is deliberately wider than the viewport, and an unclipped one scrolls
 * the whole page sideways on mobile.
 *
 * ALIGNMENT IS LOAD-BEARING: `align="top"`, not centre. The card stack below
 * is `grid-cols-1` at `max-w-[1180px]` — one column of full-bleed opaque
 * slabs with NO horizontal gutter. "BUILD" is at most 20rem (the clamp inside
 * <GiantWord>), so it is roughly 870-990px wide across every desktop width and
 * therefore fits ENTIRELY inside the 1180px card footprint. Centred, it spends
 * its whole travel behind the cards and surfaces only as two 24px slivers
 * through the `gap-6` seams — a rendering artifact, not a watermark. Anchored
 * top, it sits in the genuinely open band around the "Case Studies" heading and
 * drifts down behind the first card as you scroll, which is the read the effect
 * is for. The heading is `text-common-black` (10.9:1 over the word in light,
 * 13.7:1 in dark), so nothing loses contrast on the way past.
 *
 * Tone is NOT set here — <GiantWord>'s `text-black-200/45` default is the one
 * system tone, and `important: true` in the Tailwind config means a call-site
 * colour would tie with it on specificity and be resolved by emit order rather
 * than by this file. speed 0.6 matches every other word on the site.
 *
 * The drift is bounded by the word's own pass through the viewport — about
 * (1 - speed) x (viewport + word height) — not by the section, so however tall
 * this stack grows the word never wanders out of it.
 */

/**
 * Slow ken-burns drift for a case-study image.
 *
 * ── THE FRAME NEVER MOVES ─────────────────────────────────────────────────
 * Only this layer transforms. The 16/10 frame around it keeps its own size and
 * does the cropping with `overflow-hidden`, so nothing here can reflow the card
 * — no width, height or aspect is animated, which is the house rule.
 *
 * ── WHY THE KEYFRAMES START AND END AT REST ───────────────────────────────
 * `scale` opens and closes at 1 with zero offset, and the pan peaks at 1.6% /
 * 1.2% against a 4.5%-per-side overhang at the scale peak. Because both run on
 * the same duration and easing, the pan is a smaller fraction of the frame than
 * the overhang at EVERY instant, not just at the peak — so no edge of the image
 * is ever exposed. Resting at both ends also means the whileInView gate can
 * drop the loop on exit and pick it up on re-entry with nothing visible, and it
 * leaves the SSR markup with no transform to mismatch on hydration.
 *
 * whileInView IS the gate: an IntersectionObserver, so a case study two
 * viewports below the fold is not paying for a scaling bitmap.
 */
function KenBurns({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className="absolute inset-0">{children}</div>;

  // Alternate the pan direction so the stack does not drift as one block.
  const dir = index % 2 === 0 ? 1 : -1;

  return (
    <motion.div
      className="absolute inset-0"
      initial={false}
      whileInView={{
        scale: [1, 1.09, 1],
        x: ["0%", `${dir * 1.6}%`, "0%"],
        y: ["0%", `${dir * -1.2}%`, "0%"],
      }}
      viewport={{ once: false, amount: 0.15 }}
      transition={{
        duration: 21 + index * 3.5,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * An arrival swell on a metric figure. It fires ONCE, as the card comes into
 * view, and then the number holds perfectly still — see the note on the
 * viewport prop below.
 *
 * A lift-and-swell rather than a shimmer, deliberately: the figures are
 * `text-primary-main` (#1E90FF) on the card surface, which clears the 3:1 bar
 * for large bold text with very little headroom. Anything that breathed opacity
 * or swept a gradient through them would dip that contrast on every cycle,
 * whereas a transform leaves the rendered colour untouched.
 *
 * `phase` is the point of the whole thing: three figures pulsing together read
 * as a page glitch, three arriving a beat apart read as a heartbeat. It is
 * derived from both the card and the metric index, so no two on screen share a
 * clock.
 *
 * The origin is pinned left so the figure grows rightward and its left edge
 * stays locked to the label beneath it, and the keyframes rest at both ends so
 * the figure is at its layout size before and after.
 */
function MetricPulse({
  phase,
  className,
  children,
}: {
  phase: number;
  className?: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <span className={className}>{children}</span>;

  return (
    <motion.span
      className={className}
      initial={false}
      whileInView={{ scale: [1, 1.055, 1], y: [0, -2, 0] }}
      // ONCE, on arrival — not a loop. Eight figures on screen, each firing
      // every 5.4s, sit directly above a 130-word paragraph: on a loop they
      // pull the reader's eye off the line it is on eight times a cycle,
      // forever. The phase offsets are still doing their job — they stagger the
      // arrival — but staggering a permanent distraction only spreads it out.
      viewport={{ once: true, amount: 0.4 }}
      transition={{
        duration: 3.8,
        delay: phase,
        ease: "easeInOut",
      }}
      style={{ transformOrigin: "left center" }}
    >
      {children}
    </motion.span>
  );
}

type CaseStudy = {
  industry: string;
  title: string;
  body: string;
  metrics: { value: string; label: string }[];
  image: StaticImageData;
  alt: string;
};

const CASE_STUDIES: CaseStudy[] = [
  {
    industry: "E-commerce",
    title: "Transforming E-Commerce with Scalable Solutions",
    body: "We collaborated with a leading e-commerce platform facing significant challenges with slow load times, outdated infrastructure, and declining user engagement. Our team conducted a thorough assessment of their existing architecture and identified bottlenecks affecting performance. By implementing a scalable and modernized framework using cutting-edge technologies, we achieved a 40% reduction in page load times and enhanced the platform's responsiveness across all devices. Additionally, we integrated advanced analytics tools to track user behavior, allowing the client to make data-driven decisions. As a result, user engagement increased by 30%, customer retention improved, and the client experienced a significant boost in revenue within just six months.",
    metrics: [
      { value: "40%", label: "faster page loads" },
      { value: "30%", label: "more engagement" },
      { value: "6 mo", label: "to revenue lift" },
    ],
    image: CaseImageOne,
    alt: "Illustration for the e-commerce scalability case study",
  },
  {
    industry: "Healthcare",
    title: "Modernizing Legacy Systems for a Healthcare Client",
    body: "A prominent healthcare provider approached us to address critical challenges with their outdated legacy systems. These systems were not only inefficient but also posed risks to data security and compliance. Our solution involved developing a custom cloud-based platform tailored to their specific operational needs. The platform featured secure data encryption, HIPAA-compliant storage, and seamless integration with third-party applications. We also implemented real-time analytics dashboards to provide actionable insights for better decision-making. The modernization effort streamlined patient data management, reduced operational costs by 25%, and significantly enhanced the provider’s ability to deliver high-quality patient care.",
    metrics: [
      { value: "25%", label: "lower operating cost" },
      { value: "HIPAA", label: "compliant storage" },
      { value: "Real-time", label: "analytics dashboards" },
    ],
    image: CaseImageTwo,
    alt: "Illustration for the healthcare modernization case study",
  },
  {
    industry: "Logistics",
    title: "Enhancing Mobile App Efficiency for a Logistics Company",
    body: "A logistics company struggling with a poorly performing mobile app reached out to us for help. Their existing app was plagued by frequent crashes, long loading times, and a confusing user interface, resulting in frustrated users and inefficiencies in their delivery processes. We began by conducting usability testing and analyzing user feedback to identify critical pain points. Based on these insights, we redesigned the app’s user interface to make it more intuitive and user-friendly. On the backend, we optimized database queries, improved API response times, and implemented a robust caching system. The revamped app was launched successfully, leading to a 45% increase in user retention and a 35% improvement in delivery process efficiency. Employees and customers alike praised the app for its reliability and ease of use, strengthening the company's reputation in the logistics industry.",
    metrics: [
      { value: "45%", label: "better retention" },
      { value: "35%", label: "faster delivery ops" },
    ],
    image: CaseImageThree,
    alt: "Illustration for the logistics mobile app case study",
  },
];

const CaseStuday = () => {
  return (
    <section
      className="relative w-full overflow-hidden px-4 py-[70px]"
      id="casestudy"
      aria-labelledby="casestudy-heading"
    >
      {/* Paint order matters — see the header comment. Both layers are z-0, so
          the word wins only by coming second in the DOM. */}
      <SoftBand className="bg-black-100/50" />
      <div className="relative z-10">
      <FadeIn className="flex flex-col items-center">
        <div
          aria-hidden="true"
          className="mb-5 w-[100px] border-2 border-pink-500"
        />
        <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-black-600">
          Our recent
        </p>
        <h2
          id="casestudy-heading"
          className="mt-2 font-display text-[30px] font-bold tracking-tight text-common-black md:text-[40px]"
        >
          <SplitReveal text="Case Studies" />
        </h2>
      </FadeIn>

      <Stagger
        className="mx-auto mt-12 grid w-full max-w-[1180px] grid-cols-1 gap-6"
        stagger={0.12}
        amount={0.1}
      >
        {CASE_STUDIES.map((study, index) => (
          <StaggerItem key={study.title}>
            {/* ── NO IDLE SWAY ON THIS ONE, AND A FAR DEEPER PERSPECTIVE ──
                The right half of this panel is a 130-word paragraph, and the
                panel is 1180px wide. Two consequences:

                • `perspective` must be LARGER than the card, or the projection
                  is a fisheye. Tilt3D's 900 default is less than the card's own
                  width, so even a 4° pointer tilt sheared the outer edge of the
                  prose by tens of pixels. 2400 puts the vanishing point safely
                  beyond the panel and the lean stays a lean.
                • A permanent rotation is a permanent distortion OF the text. At
                  1.6° the paragraph's outer margin swept ~9px sideways and back
                  every 8.5s, forever, under the reader's eye — and a layer whose
                  transform animates continuously is promoted and raster-cached,
                  so the copy is rendered once and texture-scaled after that. It
                  stays soft for as long as the card is on screen. Motion BEHIND
                  reading content is fine; motion ON it is not.

                `max={4}` stays: a lean the reader asked for by putting the
                pointer on the card is a moment, not a condition. The continuous
                life this card needs is already here and correctly placed —
                <KenBurns> on the image, inside a frame that never moves. */}
            <Tilt3D max={4} lift={10} perspective={2400} idle={0}>
            <SpotlightCard
              className="overflow-hidden rounded-2xl border border-black-200 bg-common-white shadow-md"
              contentClassName="grid grid-cols-1 items-center gap-0 lg:grid-cols-2"
            >
              {/* Alternating image side gives the stack rhythm without
                  needing a different fill colour per card. */}
              <div
                className={`p-4 lg:p-6 ${
                  index % 2 === 1 ? "lg:order-2" : ""
                }`}
              >
                {/* The frame is fixed — `aspect-[16/10]` and `overflow-hidden`
                    stay on THIS div, and only the layer inside it transforms,
                    so the drift can never resize the card. <KenBurns> is also
                    the positioned parent that `fill` resolves against. */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl border border-black-200 bg-black-100">
                  <KenBurns index={index}>
                    <Image
                      src={study.image}
                      alt={study.alt}
                      fill
                      sizes="(min-width: 1024px) 45vw, 92vw"
                      className="object-cover"
                    />
                  </KenBurns>
                </div>
              </div>

              <div className="flex flex-col justify-center p-6 lg:p-10">
                <span className="w-fit rounded-full border border-black-200 bg-black-100 px-3 py-1 text-[12px] font-semibold uppercase tracking-[0.12em] text-black-700">
                  {study.industry}
                </span>

                <h3 className="mt-4 font-display text-[20px] font-bold leading-snug tracking-tight text-common-black md:text-[26px]">
                  {study.title}
                </h3>

                <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                  {study.metrics.map((metric, metricIndex) => (
                    <li key={metric.label} className="min-w-0">
                      {/* Phase mixes both indices, so the figures inside one
                          card land ~0.9s apart AND no two cards share a beat. */}
                      <MetricPulse
                        phase={index * 0.5 + metricIndex * 0.9}
                        className="block font-display text-[20px] font-bold leading-none text-primary-main md:text-[24px]"
                      >
                        {metric.value}
                      </MetricPulse>
                      <span className="mt-1 block text-[12px] text-black-600">
                        {metric.label}
                      </span>
                    </li>
                  ))}
                </ul>

                <p className="mt-5 max-w-[62ch] text-[14px] leading-relaxed text-black-700 md:text-[15px]">
                  {study.body}
                </p>
              </div>
            </SpotlightCard>
            </Tilt3D>
          </StaggerItem>
        ))}
      </Stagger>
      </div>
    </section>
  );
};

export default CaseStuday;
