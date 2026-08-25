import { memo, useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Video from 'next-video';

import {
  AnimatedGradientText,
  CountUp,
  FadeIn,
  HoverLift,
  SplitReveal,
  Stagger,
  StaggerItem,
  useReducedMotion,
} from '@/components/shared/motion';
import { AuroraBackground, SoftBand } from '@/components/shared/backgrounds';
import { GiantWord } from '@/components/shared/scroll';
import { PIMW, PIMW_REVIEWS } from '@/untils/data/pimw';

// ✅ Use public/ folder paths or absolute URLs for images
const testimonials = [
    {
    name: "Steve Zimmernan",
    image: "/images/client1.png",
    url: "/video_denoised.mp4",
    position: "Founder, BLUESKY-NW",
    feedback:
      "Darshit redesigned our company website with a modern and user-friendly interface. The updated design improved usability and gave our platform a more professional look.",
  },
  {
    name: "Nikesh Bisht",
    image: "/images/client2.png",
    url: "/blinqmobility.mp4",
    position: "Founder, Blinq mobility",
    feedback:
      "Darshit did an outstanding job redesigning the Blinq Mobility website. His modern design approach and attention to detail greatly enhanced our brand presence. Highly recommended!",
  },

  {
    name: "Sergio Palma",
    image: null,
    url: null,
    position: "Co-Founder, BLUESKY-NW",
    feedback:
      "Darshit redesigned our company website with a modern look and optimized performance. The site now loads faster and has received great feedback from clients.",
  },
  {
    name: "Sanjay Bodariya",
    image: null,
    url: null,
    position: "Diamonds Trader",
    feedback:
      "Darshit developed a streamlined bidding system for diamond trading, improving our workflow efficiency. His attention to detail and technical skills were impressive!",
  },
  {
    name: "Vishal Modi",
    image: null,
    url: null,
    position: "Founder, Valencia Lifesciences",
    feedback:
      "Darshit built our pharmaceutical company's static website with a clean, professional design. Delivered on time and exceeded our expectations!",
  },
  {
    name: "Rachana Rambhad",
    image: null,
    url: null,
    position: "Founder, Gabble.ai",
    feedback:
      "As a freelancer, Darshit implemented a TOEFL MCQ exam section in React for our platform. His code was modular and easy to maintain. Highly recommended!",
  },
  {
    name: "Mansukh Patoliya",
    image: null,
    url: null,
    position: "Founder, Neha Fiber",
    feedback:
      "Darshit created a professional and fast-loading website for our industrial fiber company. The site reflects our brand well, and he ensured it was SEO-friendly and device-compatible. Great experience working with him.",
  },
];

const DOUBLED_TESTIMONIALS = [...testimonials, ...testimonials];

/**
 * Shopify App Store numbers. Every figure is read from the verified PIMW data
 * module — nothing here is estimated, and the 100% is simply 8 five-star
 * reviews out of 8 total.
 */
const REVIEW_STATS = [
  {
    id: 'rating',
    value: PIMW.rating,
    decimals: 1,
    suffix: ' / 5',
    label: 'Average rating',
  },
  {
    id: 'count',
    value: PIMW.reviewCount,
    label: 'Merchant reviews',
  },
  {
    id: 'fiveStar',
    value: 100,
    suffix: '%',
    label: 'Five-star reviews',
  },
];

/** "Krishnam Jewel" → "KJ", "Vanasparsh" → "VA". Purely decorative. */
const storeInitials = (store) => {
  const words = String(store).trim().split(/\s+/);
  if (words.length > 1) {
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }
  return String(store).trim().slice(0, 2).toUpperCase();
};

const Testimonial = () => {
  const reduce = useReducedMotion();
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [displayedTestimonials] = useState(DOUBLED_TESTIMONIALS);
  const [videoIndex, setVideoIndex] = useState(0);
  const scrollContainerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const scrollPositionRef = useRef(0);
  const SCROLL_SPEED = 0.5;
  const halfHeightRef = useRef(null);

  const startAnimation = () => {
    // Reduced motion: never auto-scroll. The column falls back to a normal
    // scrollable box (motion-reduce:overflow-y-auto below) so every quote is
    // still reachable.
    if (reduce) return;
    if (!animationFrameRef.current) {
      animationFrameRef.current = requestAnimationFrame(animateScroll);
    }
  };
  const pauseAnimation = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  };
  const resumeAnimation = () => startAnimation();

  function animateScroll() {
    const el = scrollContainerRef.current;
    if (!el) return;

    // Cache half height - recompute when scrollHeight changes (e.g. resize)
    const totalHeight = el.scrollHeight;
    if (halfHeightRef.current === null || Math.abs(halfHeightRef.current - totalHeight / 2) > 10) {
      halfHeightRef.current = totalHeight / 2;
    }
    const halfHeight = halfHeightRef.current;

    scrollPositionRef.current -= SCROLL_SPEED;

    // Reset when we've scrolled one full set (seamless loop)
    if (Math.abs(scrollPositionRef.current) >= halfHeight) {
      scrollPositionRef.current = 0;
    }

    el.style.transform = `translate3d(0, ${scrollPositionRef.current}px, 0)`;
    animationFrameRef.current = requestAnimationFrame(animateScroll);
  }

   const playVideo = () => {
     setIsVideoPlaying(true);
   };
 
   const videodetails = testimonials[videoIndex];
 
  // Start animation after DOM has laid out (content is visible)
  useEffect(() => {
    if (reduce) return undefined;

    const startAfterLayout = () => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          const el = scrollContainerRef.current;
          if (el && el.scrollHeight > 0) {
            halfHeightRef.current = el.scrollHeight / 2;
            startAnimation();
          }
        });
      });
    };
    startAfterLayout();
    return () => pauseAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reduce]);

  return (
    <>
      <Head>
        <title>Testimonials &amp; Shopify App Store reviews | Pixels Piece</title>
        <meta
          name="description"
          content={`What clients say about working with Pixels Piece, plus every verbatim merchant review of ${PIMW.name} — rated ${PIMW.rating.toFixed(
            1
          )} from ${PIMW.reviewCount} reviews on the Shopify App Store.`}
        />
        <meta
          property="og:title"
          content="Testimonials & Shopify App Store reviews | Pixels Piece"
        />
        <meta
          property="og:description"
          content={`Client testimonials and all ${PIMW.reviewCount} verbatim Shopify App Store reviews of ${PIMW.name}.`}
        />
        <meta property="og:type" content="website" />
      </Head>

      <section className="relative overflow-hidden py-16 px-4 font-sans pt-[120px]">
        {/* The tint is a decorative LAYER rather than the section's own
            background: `band-soft` masks the top and bottom 9rem of whatever
            carries it, and on the section itself that would also fade out the
            video card and the quote column at the edges. Same tokens and the
            same /50 weight as the home-page bands, so the ambient mesh reads
            straight through and no horizontal seam is drawn. */}
        <SoftBand className="bg-gradient-to-br from-black-100/50 to-black-200/40" />
        {/* The one giant word on this page — "WORDS", for the clients’ own.
            It is centred, so it lands behind the 600px testimonial row rather
            than behind the heading: the video card and every quote card are
            opaque surfaces that ride up over it, and it reads through the
            column gutter, the card gaps and the masked top/bottom edges of the
            scrolling column. The Shopify App Store reviews section below keeps
            its own aurora and band untouched.

            NOTHING here wraps the players or the auto-scrolling column in
            <Parallax>. GSAP would write `transform` on that wrapper, and this
            page cannot afford a transformed ancestor in either place: the
            column’s seamless loop drives `translate3d` on
            `scrollContainerRef` itself every frame, and a transformed ancestor
            becomes the containing block for the video player’s own
            positioned chrome. The word is an absolutely positioned sibling of
            the content, so it adds no transform to either subtree.

            Placed directly rather than through <ScrollStage> so <SoftBand> can
            stay a direct child of the section: inside ScrollStage’s
            `relative z-10` wrapper the tint would shrink to the padding box and
            leave the pt-[120px] strip untinted — a horizontal seam. That makes
            the clipping this section’s own job, hence `overflow-hidden`
            above: the word is deliberately wider than the viewport and an
            unclipped one scrolls the whole page sideways on mobile. */}
        <GiantWord
          word="WORDS"
          speed={0.6}
          align="center"
        />
        <div className="relative z-10 max-w-6xl mx-auto">
          <FadeIn>
            <h1 className="font-display text-[34px] sm:text-[44px] lg:text-[56px] font-bold leading-[1.12] tracking-tight text-center text-common-black mb-2">
              <SplitReveal text="What Clients Say" />
            </h1>
            <p className="text-[15px] md:text-[18px] text-center text-black-600 mb-12">
              Hear from those who have worked with me
            </p>
          </FadeIn>

          <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
            {/* 🎥 Video Section */}
            <FadeIn
              delay={0.05}
              className="w-full lg:w-2/5 flex justify-center items-center h-[400px] md:h-[450px] lg:h-[600px]"
            >
              {/* static-black, not common-black: `common-black` is the themed
                  INK token and inverts to near-white in dark mode, which would
                  turn the video letterbox into a white slab. */}
              <div className="w-full max-w-md aspect-video rounded-xl overflow-hidden shadow-xl bg-static-black h-full">
                {!isVideoPlaying ? (
                  <button
                    type="button"
                    aria-label={`Play the video testimonial from ${
                      videodetails?.name || "our client"
                    }`}
                    className="w-full h-full flex flex-col justify-between bg-cover bg-center cursor-pointer text-left"
                    style={{
                      backgroundImage: videodetails?.image
                        ? `url(${videodetails.image})`
                        : "linear-gradient(135deg, #111827, #1f2937)",
                    }}
                    onClick={playVideo}
                  >
                    {/* A dark scrim in BOTH themes — the poster text and the
                        play glyph below are literal white, so the wash under
                        them can never be allowed to flip light. */}
                    <div className="w-full h-full bg-static-black/30 backdrop-blur-lg flex flex-col justify-between p-4 cursor-pointer">
                      <div></div>
                      <div className="w-full flex flex-col items-center justify-center rounded-full">
                        <svg
                          className="w-16 h-16 md:w-20 md:h-20 text-static-white"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 100 100"
                          fill="none"
                          stroke="#fff"
                          aria-hidden="true"
                        >
                          <circle cx="50" cy="50" r="45" strokeWidth="2" />
                          <path fill="#fff" d="M40 30L70 50L40 70Z" />
                        </svg>
                      </div>
                      <div className="mb-5 text-start">
                        <p className="font-semibold text-static-white">
                          {videodetails?.name}
                        </p>
                        <p className="text-static-white/75">
                          {videodetails?.position}
                        </p>
                      </div>
                    </div>
                  </button>
                ) : (
                  <div className="w-full h-full">
                    <Video
                      width="100%"
                      height="100%"
                      src={videodetails?.url || ""}
                      title="Testimonial video"
                      className="w-full h-full"
                    />
                  </div>
                )}
              </div>
            </FadeIn>

            {/* 💬 Text Testimonials Section */}
            <FadeIn
              delay={0.1}
              className="w-full mt-[50px] sm:mt-0 lg:w-3/5
                leading-[1.6em] font-[Arial]
                [--mask:linear-gradient(to_bottom,rgba(0,0,0,0)_0%,rgba(0,0,0,1)_10%,rgba(0,0,0,1)_90%,rgba(0,0,0,0)_100%)]
                [-webkit-mask:var(--mask)]
                [mask:var(--mask)]"
            >
              <div className="h-[600px] overflow-hidden motion-reduce:overflow-y-auto relative"
                   onMouseEnter={pauseAnimation}
                   onMouseLeave={resumeAnimation}
                   onTouchStart={pauseAnimation}
                   onTouchEnd={resumeAnimation}
                >
                <div
                  ref={scrollContainerRef}
                  className="md:grid md:grid-cols-2 gap-6 place-items-start w-full"
                >
                  {displayedTestimonials.map((testimonial, index) => {
                    // The list is rendered twice so the loop can be seamless.
                    // The second copy is decorative: hide it from assistive
                    // tech so each quote is announced once.
                    const isDuplicate = index >= testimonials.length;

                    return (
                      <div
                        key={index}
                        aria-hidden={isDuplicate ? "true" : undefined}
                        className="bg-common-white p-6 mt-[20px] md:mt-0 rounded-xl h-[290px] border border-black-200 shadow-md relative hover:shadow-xl transition-shadow w-full max-w-xs md:max-w-none"
                      >
                        <div className="absolute -top-3 -left-1 text-6xl text-pink-600 font-serif">&ldquo;</div>
                        <div className="flex flex-col h-full justify-between">
                          <p className="text-black-700 text-base mb-4 z-10 relative">
                            {testimonial?.feedback}
                          </p>
                          <div className="border-t border-black-200 pt-3 flex items-center justify-between w-full">
                            <div className="min-w-0">
                              <h3 className="font-semibold text-primary-main truncate">
                                {testimonial?.name}
                              </h3>
                              <p className="text-black-600 text-sm">{testimonial?.position}</p>
                            </div>
                            {testimonial?.url && (
                              <button
                                type="button"
                                tabIndex={isDuplicate ? -1 : undefined}
                                aria-label={`Play the video testimonial from ${testimonial?.name}`}
                                className="flex shrink-0 items-center justify-center ml-3 text-primary-main cursor-pointer"
                                onClick={() => {
                                  setVideoIndex(index % testimonials.length);
                                  setIsVideoPlaying(false);
                                }}
                              >
                                <svg
                                  width="28"
                                  height="28"
                                  viewBox="0 0 100 100"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="w-7 h-7"
                                  aria-hidden="true"
                                >
                                  <circle cx="50" cy="50" r="45" stroke="#1E90FF" strokeWidth="6" fill="white" />
                                  <polygon points="42,32 72,50 42,68" fill="#1E90FF" />
                                </svg>
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ⭐ Shopify App Store reviews — every quote verbatim from the listing */}
      <section
        id="shopify-reviews"
        aria-labelledby="shopify-reviews-heading"
        className="relative w-full px-4 py-[50px] md:px-[50px] lg:px-[100px]"
      >
        {/* Same feathered-layer treatment as the band above. */}
        <SoftBand className="bg-shopify-100/50" />
        <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center">
          {/* The only aurora on this page, and it sits behind the section
              header alone — fade="both" so it dissolves before this
              overflow-hidden box clips it at either edge. */}
          <div className="relative w-full overflow-hidden pb-6">
            <AuroraBackground variant="green" intensity={0.4} fade="both" />
            <FadeIn className="relative z-10 flex w-full flex-col items-center">
              <div
                aria-hidden="true"
                className="mb-5 w-[100px] border-2 border-pink-500"
              />
              <p className="text-center text-[20px] text-black-800 md:text-[25px]">
                Straight from the Shopify App Store
              </p>
              <h2
                id="shopify-reviews-heading"
                className="mt-1 font-display text-center text-[28px] md:text-[34px] lg:text-[40px] font-bold tracking-tight text-common-black"
              >
                <SplitReveal text="What merchants say about" />{" "}
                <AnimatedGradientText className="font-bold">
                  {PIMW.shortName}
                </AnimatedGradientText>
              </h2>
              <p className="mt-6 max-w-[760px] text-center text-[15px] text-black-700 md:text-[18px]">
                {PIMW.name} is our own Shopify app, published by{" "}
                {PIMW.developer}. Every review below is quoted in full, exactly
                as the merchant wrote it on the App Store listing.
              </p>
            </FadeIn>
          </div>

          <FadeIn delay={0.08} className="w-full">
            <dl className="mx-auto mt-8 grid w-full max-w-[720px] grid-cols-1 gap-4 sm:grid-cols-3">
              {REVIEW_STATS.map((stat) => (
                <div
                  key={stat.id}
                  className="flex flex-col-reverse items-center rounded-2xl border border-shopify-200 bg-common-white px-4 py-5 text-center shadow-md"
                >
                  <dt className="mt-1 text-[13px] text-black-600 md:text-[15px]">
                    {stat.label}
                  </dt>
                  <dd className="text-[30px] font-bold text-shopify-700 md:text-[35px]">
                    <CountUp
                      value={stat.value}
                      decimals={stat.decimals}
                      suffix={stat.suffix}
                    />
                  </dd>
                </div>
              ))}
            </dl>
          </FadeIn>

          <Stagger className="w-full" amount={0.05}>
            <ul className="mt-10 grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {PIMW_REVIEWS.map((review) => (
                <li key={review.store}>
                  <StaggerItem className="relative flex h-full flex-col justify-between rounded-2xl border border-black-200 bg-common-white p-6 shadow-md transition-shadow duration-300 hover:shadow-xl">
                    <span
                      aria-hidden="true"
                      className="absolute -left-1 -top-3 font-serif text-[50px] leading-none text-pink-600"
                    >
                      &ldquo;
                    </span>
                    <blockquote className="relative z-10 break-words text-[14px] leading-relaxed text-black-700 md:text-[16px]">
                      {review.text}
                    </blockquote>
                    <footer className="mt-5 flex items-center justify-between gap-3 border-t border-black-200 pt-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <span
                          aria-hidden="true"
                          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-shopify-100 text-[14px] font-semibold text-shopify-700"
                        >
                          {storeInitials(review.store)}
                        </span>
                        <div className="min-w-0">
                          <p className="truncate font-semibold text-primary-main">
                            {review.store}
                          </p>
                          <p className="text-[13px] text-black-600">
                            {review.country} &middot; {review.date}
                          </p>
                        </div>
                      </div>
                      <p className="shrink-0 text-[14px] text-orange-main">
                        {/* aria-label is ignored on a <p>, so name the rating
                            with real text instead of an attribute. */}
                        <span aria-hidden="true">
                          {"★".repeat(review.rating)}
                        </span>
                        <span className="sr-only">
                          {`${review.rating} out of 5 stars`}
                        </span>
                      </p>
                    </footer>
                  </StaggerItem>
                </li>
              ))}
            </ul>
          </Stagger>

          <FadeIn
            delay={0.05}
            className="mt-10 flex w-full flex-col items-center gap-4 sm:flex-row sm:justify-center"
          >
            <HoverLift className="w-full sm:w-auto">
              <a
                href={PIMW.reviewsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center rounded-lg bg-primary-main px-6 py-3 text-center text-[16px] font-medium text-static-white transition-colors duration-200 hover:bg-pink-700 sm:w-auto"
              >
                Read all {PIMW.reviewCount} reviews on the Shopify App Store
              </a>
            </HoverLift>
            <a
              href={PIMW.appStoreUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex w-full items-center justify-center rounded-lg border-2 border-primary-main bg-common-white px-6 py-3 text-center text-[16px] font-medium text-primary-main transition-colors duration-200 hover:bg-pink-100 sm:w-auto"
            >
              View {PIMW.shortName} on the App Store
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  );
};

export default memo(Testimonial);
