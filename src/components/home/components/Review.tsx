import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import Tilt3D from "@/components/shared/Tilt3D";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { motion } from "motion/react";
import {
  FadeIn,
  SplitReveal,
  Stagger,
  StaggerItem,
  useReducedMotion,
} from "@/components/shared/motion";
import { SpotlightCard } from "@/components/shared/backgrounds";
import { TESTIMONIALS, initialsOf } from "@/untils/data/testimonials";

/**
 * Client testimonials on the home page.
 *
 * Replaces a react-slick carousel that clipped its own content: the track sat
 * in a fixed `h-[120px]` box, so every quote was cut off top and bottom, and
 * neighbouring slides bled in from both sides behind the arrows. A static card
 * grid shows more proof at once, needs no measurement, and cannot clip.
 *
 * Interior section — calm by design. The global <AmbientBackground/> supplies
 * the depth; the hero and the Shopify band are the page's two rich moments.
 * No giant scroll-stage word here either — the home page's one word lives
 * behind the case studies. No parallax on the grid either: these are quote
 * cards whose entire content is body copy people stop to read, and a reading
 * surface should not drift at its own scroll rate. The <Stagger> entrance is
 * the grid's arrival moment.
 *
 * What the grid DOES carry is continuous, scroll-independent life, and exactly
 * ONE loop per card: <CardFloat> drifts it a few pixels, phased by column. That
 * is deliberate restraint rather than an oversight. This is the calm stretch of
 * the page rhythm, so the budget here is one permanent accent per card, and it
 * is spent on the only kind of motion that cannot degrade the copy — a pure
 * translate of a whole card, which warps no glyph and changes no raster scale.
 *
 * What is NOT here, and why:
 *  • Tilt3D's idle sway. A permanent rotation applied to the element that
 *    contains body copy distorts that copy and keeps the layer raster-cached.
 *    The pointer tilt survives, because hover is a thing the reader chose.
 *  • A rocking quote glyph. It sits at the top of the card and pulls the eye
 *    back up out of the paragraph; <QuoteMark> keeps a 3px drift and no rotate.
 */

const FEATURED = TESTIMONIALS.slice(0, 6);

/**
 * Gentle continuous float for one testimonial card, phased BY COLUMN.
 *
 * The grid is three columns wide on desktop, and phasing per column rather than
 * per card is what makes it read as a wall breathing rather than as six
 * unrelated cards twitching: neighbours in a row are always a beat apart, while
 * the card directly below one keeps its rhythm, so the eye reads columns.
 *
 * ── ITS OWN ELEMENT, ON PURPOSE ───────────────────────────────────────────
 * <StaggerItem> (entrance) and <Tilt3D> (idle sway, then pointer tilt) already
 * write `transform` on nodes of their own. Two transforms on ONE node means the
 * later write silently erases the earlier — it compiles, it just stops moving —
 * so the float nests between them with an element to itself.
 *
 * ── whileInView IS THE GATE ───────────────────────────────────────────────
 * It is an IntersectionObserver: the loop runs only while the card is on
 * screen and is dropped the moment it leaves. The keyframes open AND close on
 * the resting value, so the revert on exit and the restart on re-entry are both
 * invisible, and the SSR markup carries no transform to mismatch on hydration.
 *
 * Amplitude is deliberately tiny (6px over ten-plus seconds). These are reading
 * surfaces — enough drift to stop the grid looking pinned to the page, not
 * enough to move a line of body copy under someone's eye.
 */
function CardFloat({
  column,
  className,
  children,
}: {
  column: number;
  className?: string;
  children: React.ReactNode;
}) {
  const reduce = useReducedMotion();

  if (reduce) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={{ y: [0, -6, 0] }}
      viewport={{ once: false }}
      transition={{
        duration: 10.5 + column * 1.4,
        delay: column * 1.1,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * The quote glyph, drifting.
 *
 * Y ONLY — no rotate track. A glyph that rocks is a moving object in the corner
 * of the eye, and it sits at the TOP of a card whose body someone is three
 * lines into: it pulls them back up. A 3px vertical drift is enough to say the
 * card is alive without ever becoming the thing you are looking at.
 *
 * `w-fit` still matters: the card body is a column flex, so a bare wrapper
 * would stretch to the full card width and the drift would then apply to a box
 * the width of the card rather than to the mark itself.
 *
 * Same whileInView gate and same rest-to-rest keyframes as <CardFloat>.
 */
function QuoteMark() {
  const reduce = useReducedMotion();

  const icon = (
    <FormatQuoteIcon
      aria-hidden="true"
      className="text-primary-main"
      style={{ fontSize: 34 }}
    />
  );

  if (reduce) return <span className="block w-fit">{icon}</span>;

  return (
    <motion.span
      className="block w-fit"
      initial={false}
      whileInView={{ y: [0, -3, 0] }}
      viewport={{ once: false }}
      transition={{ duration: 7.5, repeat: Infinity, ease: "easeInOut" }}
    >
      {icon}
    </motion.span>
  );
}

const Review = () => {
  return (
    <section
      className="w-full px-4 py-[70px] md:px-[50px] lg:px-[100px]"
      aria-labelledby="reviews-heading"
    >
      <FadeIn className="flex flex-col items-center text-center">
        <div
          aria-hidden="true"
          className="mb-5 w-[100px] border-2 border-pink-500"
        />
        <p className="text-[13px] font-semibold uppercase tracking-[0.16em] text-black-600">
          Meet the people we work with
        </p>
        <h2
          id="reviews-heading"
          className="mt-2 font-display text-[30px] font-bold tracking-tight text-common-black md:text-[40px]"
        >
          <SplitReveal text="Why customers love working with us" />
        </h2>
      </FadeIn>

      {/* Deliberately NOT a <Parallax>. These are quote cards whose whole
          content is body copy people stop and read; a reading surface should
          not drift at its own scroll rate. The <Stagger> entrance below
          already gives the grid its arrival moment. */}
      <div className="mx-auto mt-12 w-full max-w-[1180px]">
        <Stagger
          className="grid w-full grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          stagger={0.08}
          amount={0.1}
        >
          {FEATURED.map((item, index) => (
            <StaggerItem key={item.name} className="h-full">
              <CardFloat column={index % 3} className="h-full">
              {/* ── NO IDLE SWAY: THIS CARD IS A READING SURFACE ──────────
                  Each of these holds a paragraph of body copy someone stops and
                  reads, and this is the section the page rhythm designates as
                  the calm one. A permanent rotateX/rotateY applied to the very
                  element that CONTAINS the copy warps its glyphs — at 377px
                  wide the text corners were oscillating ~1.5px horizontally and
                  ~2.2px vertically, forever — and an endlessly animating 3D
                  layer stays promoted and raster-cached, so the quote is
                  rendered once and texture-scaled from then on.

                  <CardFloat> is what keeps the grid from looking pinned: a pure
                  6px translate changes no raster scale and warps nothing. The
                  pointer tilt below stays, because hover is opt-in.

                  `grid` on BOTH of Tilt3D's own wrappers is load-bearing for
                  equal-height cards, not decoration: Tilt3D nests four boxes
                  (perspective → idle sway → pointer tilt → translateZ) where
                  the touch/reduced-motion branch nests two. A single-child grid
                  container stretches its item to the full row height, so the
                  chain stays unbroken from the grid cell down to the card. */}
              <Tilt3D
                className="grid h-full"
                innerClassName="grid h-full"
                max={7}
                lift={14}
                idle={0}
              >
              <SpotlightCard
                className="h-full rounded-2xl border border-black-200 bg-common-white shadow-md"
                contentClassName="flex h-full flex-col p-6"
              >
                <QuoteMark />

                <blockquote className="mt-2 flex-grow text-[15px] leading-relaxed text-black-700">
                  {item.feedback}
                </blockquote>

                <figcaption className="mt-6 flex items-center gap-3 border-t border-black-200 pt-5">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt=""
                      aria-hidden="true"
                      width={44}
                      height={44}
                      className="h-11 w-11 shrink-0 rounded-full border border-black-200 object-cover"
                    />
                  ) : (
                    <span
                      aria-hidden="true"
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-black-200 bg-black-100 text-[14px] font-semibold text-primary-main"
                    >
                      {initialsOf(item.name)}
                    </span>
                  )}
                  <span className="min-w-0">
                    <span className="block truncate font-display text-[15px] font-semibold text-common-black">
                      {item.name}
                    </span>
                    <span className="block truncate text-[13px] text-black-600">
                      {item.position}
                    </span>
                  </span>
                </figcaption>
              </SpotlightCard>
              </Tilt3D>
              </CardFloat>
            </StaggerItem>
          ))}
        </Stagger>
      </div>

      <FadeIn className="mt-10 flex justify-center" delay={0.1}>
        <Link
          href="/testimonial"
          className="inline-flex items-center gap-2 rounded-xl border-2 border-primary-main bg-common-white px-6 py-3 text-[15px] font-medium text-primary-main transition-colors duration-200 hover:bg-pink-100"
        >
          Read all client stories
        </Link>
      </FadeIn>
    </section>
  );
};

export default Review;
