import FormatQuoteIcon from "@mui/icons-material/FormatQuote";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  FadeIn,
  SplitReveal,
  Stagger,
  StaggerItem,
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
 * the grid's arrival moment and that is enough.
 */

const FEATURED = TESTIMONIALS.slice(0, 6);

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
          {FEATURED.map((item) => (
            <StaggerItem key={item.name} className="h-full">
              <SpotlightCard
                className="h-full rounded-2xl border border-black-200 bg-common-white shadow-md"
                contentClassName="flex h-full flex-col p-6"
              >
                <FormatQuoteIcon
                  aria-hidden="true"
                  className="text-primary-main"
                  style={{ fontSize: 34 }}
                />

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
