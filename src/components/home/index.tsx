import React from "react";
import { ShopifyLogo, SoftWareImage, headerImage } from "@/untils/images";
import CustomButton from "../shared/CustomButton";
import Sliders from "./components/Slider";
import Image from "next/image";
import Review from "./components/Review";
import Circle from "@/untils/icons/Circle";
import ProjectWork from "./components/ProjectWork";
import CaseStuday from "./components/CaseStuday";
import ShopifyPartner from "./components/ShopifyPartner";
import Techology from "./components/Techonology";
import { useRouter } from "next/router";
import { motion } from "motion/react";
import RotatingText  from "../shared/RotatingText";
import {
  FadeIn,
  HoverLift,
  ScaleIn,
  SlideIn,
  SplitReveal,
  UnderlineDraw,
  useReducedMotion,
} from "@/components/shared/motion";
import {
  AuroraBackground,
  GlowOrb,
  GridPattern,
  SoftBand,
} from "@/components/shared/backgrounds";
import Text3D from "@/components/shared/Text3D";
import Tilt3D from "@/components/shared/Tilt3D";
import { PageWordTrack } from "@/components/shared/scroll/WordTrack";
import CursorGrid from "@/components/shared/backgrounds/CursorGrid";
import ScrollShapes from "@/components/shared/backgrounds/ScrollShapes";
import {
  Parallax,
  ScrollDrift,
  ScrollReveal,
} from "@/components/shared/scroll";

/**
 * Type scale for the extruded half of the H1. Both <Text3D> lines share it, so
 * they stay a single block of type rather than two independently tuned words.
 *
 * The ceiling is deliberate. <Text3D> lays its copies out `whitespace-pre` —
 * the word CANNOT wrap — so the longest string ("Experiences", ~6em in Space
 * Grotesk bold) has to fit the hero's left column at every breakpoint. At
 * `lg` the hero turns into two columns roughly 410px wide, and 6em x 56px is
 * ~340px, which clears it; anything larger than ~60px overflows there and gets
 * clipped by the section. Hence the jump to 64px waits for `xl`.
 */
const HERO_3D_TYPE =
  "text-[38px] leading-[1.05] sm:text-[52px] lg:text-[56px] xl:text-[64px]";

const HomePage = () => {
  const router = useRouter();
  // Only ever read inside `animate` / `transition` props, never to fork a
  // className or the element tree: motion writes those values imperatively
  // after mount, so the SSR markup is identical either way and hydration
  // cannot mismatch. (Forking a class on this is the bug called out in
  // @/components/shared/motion — useReducedMotion() is null on the server and
  // a real boolean on the client's first render.)
  const reduce = useReducedMotion();

  // NO page-level padding on the root: every band and both auroras below are
  // full-bleed, and neither `band-soft` nor the aurora fade map feathers
  // HORIZONTALLY — so any inset leaves a hard vertical edge with a strip of raw
  // page beside it. Gutters live on each section's own content wrapper.
  return (
    // `relative overflow-hidden` is required by the word track: its words are
    // deliberately wider than the viewport, and without clipping here they would
    // give the whole page horizontal scroll.
    <div className="relative isolate w-full h-full flex flex-col items-center justify-center overflow-hidden">
      {/* Cursor-reactive grid across the WHOLE page.
          `fixed`, not absolute: an absolutely-positioned canvas would have to
          span the full document height, and this page is several thousand
          pixels tall — at devicePixelRatio 2 that is a canvas backing store in
          the hundreds of MB, which stalls or crashes the tab. Pinned to the
          viewport it stays one screen in size no matter how long the page is,
          and because the component tracks the pointer on `window` it still
          lights up wherever the cursor goes as you scroll.
          -z-10 + the root's `isolate` keeps it behind every section, and
          pointer-events-none keeps it from intercepting a single click. */}
      <CursorGrid
        className="fixed inset-0 -z-10 pointer-events-none"
        cellSize={64}
        radius={180}
        color="#1E90FF"
        gridOpacity={0.04}
        maxOpacity={0.5}
        fillOpacity={0.05}
        lineWidth={1}
      />

      {/* Large gradient shapes — a tilted ring and a snaking tube with spheres
          riding along it — scrubbed to scroll position. Absolute (not fixed) so
          they travel with the page rather than sitting still in the viewport;
          the root's `overflow-hidden` clips them. */}
      <ScrollShapes />

      {/* Giant word track running the full page height. Each word drifts at its
          own rate, so they slide past each other as you scroll top to bottom
          rather than moving as one sheet. Sits at z-0 behind every section.

          The speeds are set EXPLICITLY rather than left to the component's
          0.55/0.64/0.73 default ladder, and they are set lower: travel is
          `viewportHeight * 0.5 * (1 - speed)`, so 0.34 moves a word ~2.9x
          further across its pass than 0.77 does. Pairing a slow word with a
          fast one (0.34 next to 0.77) is what makes them visibly slide PAST
          each other instead of drifting as one sheet — the spread between
          neighbours is the effect, not the absolute rate.

          They cannot collide: the words sit 19% of the page apart (from=12,
          to=88 over five words), which on this page is well over 1000px, and
          the largest travel here is around a third of a viewport. */}
      <PageWordTrack
        words={[
          { text: "DESIGN", tone: "blue", speed: 0.38 },
          { text: "BUILD", tone: "green", speed: 0.72 },
          { text: "SHOPIFY", tone: "green", speed: 0.34 },
          { text: "SHIP", tone: "blue", speed: 0.77 },
          { text: "SCALE", tone: "blue", speed: 0.42 },
        ]}
      />

      {/* ── Header Section ───────────────────────────────────────────────────
          A <section>, not a <div>, and that is load-bearing: <Text3D> tracks
          the pointer on `host.closest("section")` so the heading leans toward
          the cursor anywhere in the hero. With a plain div it falls back to
          `parentElement`, and the reactive zone shrinks to the glyphs
          themselves — which is the difference between a heading that feels
          like an object in the room and one that only wakes up on hover.

          Background stack, back to front: aurora wash -> faint line grid ->
          content at z-10. The grid is a static SVG (no loop, no canvas), so it
          adds depth for free on a page that already runs WebGL and a canvas
          grid. Exactly ONE aurora on this page, and it keeps fade="bottom" so
          it dissolves into the stat strip instead of ending on a seam. */}
      <section className="relative w-full overflow-hidden">
        <AuroraBackground variant="mixed" intensity={0.45} fade="bottom" />
        <GridPattern className="text-black-300" opacity={0.14} fade="bottom" />
        <div className="relative z-10 h-full flex flex-col lg:flex-row items-center justify-center gap-10 px-6 lg:px-20 py-10 mt-[80px]">
        <Parallax lag={0.1}>
        <SlideIn from="left" className={`text-center lg:text-left`}>
          <ScaleIn className="mb-5 flex justify-center lg:justify-start" delay={0.1}>
            {/* ScaleIn owns the entrance transform on its own wrapper; this
                span owns the endless float. Two nodes, because a single one
                would let the later `transform` write erase the earlier. */}
            <motion.span
              className="inline-flex items-center gap-2 rounded-full border border-shopify-200 bg-shopify-100 px-3 py-1.5 text-[13px] font-medium text-shopify-700 shadow-md"
              animate={reduce ? undefined : { y: [0, -5, 0] }}
              transition={
                reduce
                  ? undefined
                  : { duration: 4.4, repeat: Infinity, ease: "easeInOut" }
              }
            >
              <Image
                src={ShopifyLogo}
                alt=""
                aria-hidden="true"
                className="h-[16px] w-[16px]"
              />
              Shopify Partner
            </motion.span>
          </ScaleIn>

          {/* The headline is one sentence split across three rendered parts, so
              the accessible name is pinned with aria-label rather than left to
              content concatenation. The `{" "}` between the parts is not
              decorative either: it keeps the DOM text reading "Crafting
              Exceptional Digital Experiences" for crawlers, and a whitespace-
              only text run is never rendered as a flex item, so the layout is
              untouched by it.

              `flex flex-col` gives each part its own line without wrapping a
              <div> (which is what Text3D renders) inside a <span>. */}
          <h1
            aria-label="Crafting Exceptional Digital Experiences"
            className="flex flex-col items-center font-display font-bold tracking-tight text-common-black lg:items-start"
          >
            <SplitReveal
              text="Crafting Exceptional"
              className="text-[24px] font-semibold leading-[1.2] text-black-800 sm:text-[30px] lg:text-[34px]"
            />{" "}
            {/* Real CSS-3D extrusion, one word per line. Depth 8 at 2px a
                layer reads as a solid slab without burying the face; `max` is
                pulled back from the default 14deg to 10 because a heading this
                size swings a long way at the ends of the word and stops being
                comfortable to read. The two lines take different side colours
                — house blue, then Shopify green — so the extrusion looks lit
                rather than merely duplicated. */}
            <Text3D
              className={`mt-2 ${HERO_3D_TYPE}`}
              depth={7}
              step={2}
              max={10}
              sway={5}
              sideColor="#0A1830"
              faceClassName="text-common-black"
            >
              Digital
            </Text3D>{" "}
            <Text3D
              className={HERO_3D_TYPE}
              depth={7}
              step={2}
              max={10}
              sway={5}
              sideColor="#08221B"
              faceClassName="text-common-black"
            >
              Experiences
            </Text3D>
          </h1>

          {/* Stepped down from 22/26/30 so the extruded block above is
              unambiguously the largest thing in the hero. */}
          <p className="mt-5 font-display text-[18px] font-semibold text-black-800 sm:text-[22px] lg:text-[24px]">
            <SplitReveal text="Delivering" delay={0.35} />{" "}
            <UnderlineDraw delay={0.9} lineClassName="bg-primary-main">
              <SplitReveal text="Excellence" delay={0.45} className="text-primary-main" />
            </UnderlineDraw>{" "}
            <SplitReveal text="Worldwide." delay={0.6} />
          </p>

          {/* Settles in last, after the headline has finished landing. */}
          <FadeIn className="mt-6 w-full lg:w-[70%]" delay={0.8} y={14}>
            <p className="text-black-700">
              We Bring Your Vision to Life with World-Class Web Development,
              mobile app development and Shopify app development Expertise.
            </p>
          </FadeIn>

          <div className="mt-7 flex w-full justify-center lg:justify-start">
            <div className="relative w-full lg:w-[200px]">
              {/* Breathing glow behind the CTA. Positioned with margins, NOT
                  `-translate-x-1/2`: GlowOrb is a motion element that writes
                  its own `transform` for the breathe, and with Tailwind's
                  `important: true` a translate utility and that write fight
                  over the same property — one of the two always loses
                  silently. Margins touch no transform at all. */}
              <GlowOrb
                color="blue"
                size={300}
                duration={4}
                style={{
                  left: "50%",
                  top: "50%",
                  marginLeft: -150,
                  marginTop: -150,
                }}
              />
              <HoverLift className="relative z-10 w-full">
                <CustomButton
                  name="Let's Get Started"
                  className="w-full"
                  onClick={() => router.push("/services/digital-product-design")}
                />
              </HoverLift>
            </div>
          </div>
        </SlideIn>
        </Parallax>

        <Parallax speed={0.9} className="w-full lg:w-auto">
        <SlideIn from="right" className="relative w-full lg:w-auto" delay={0.1}>
          <GlowOrb
            color="blue"
            size={520}
            style={{
              left: "50%",
              top: "50%",
              marginLeft: -260,
              marginTop: -260,
            }}
          />
          {/* Slow bob so the illustration is never a still image. Parallax
              writes `y` on the outer node and SlideIn writes x/opacity on its
              own — this is a third element, so all three survive. */}
          <motion.div
            className="relative z-10"
            animate={reduce ? undefined : { y: [0, -12, 0] }}
            transition={
              reduce
                ? undefined
                : { duration: 7.5, repeat: Infinity, ease: "easeInOut" }
            }
          >
            <Image
              src={headerImage}
              alt="Illustration of a digital product being designed and built"
              height={600}
              className="w-full h-auto"
            />
          </motion.div>
        </SlideIn>
        </Parallax>
        </div>
      </section>

      {/* ── RHYTHM, TOP TO BOTTOM — BOTH LAYERS ────────────────────────────
          The page is loudest where it meets the hero, quiets down through the
          sections people actually READ, and swells once more at the closing
          CTA. There are TWO layers that have to say that, and they have to say
          the same thing:

          1. SCROLL-LINKED, as a lift in px: stat strip 70 (and a 0.90 scale)
             -> services 56 -> Shopify 44 -> about 38 -> testimonials 22 ->
             case studies 14 -> tech stack back up to 40 -> CTA 64 (0.90
             again). Nobody is asked to read a paragraph that is still moving.

          2. CONTINUOUS — the loops that run whether or not anyone scrolls.
             This is a budget of PERMANENT loops per card, and it follows the
             same curve, because a visitor moving from the stat strip into the
             testimonials must experience less motion, not more:

               hero / stat strip   2 per element (tilt sway + figure shimmer)
               services            2 per card    (electric rim + icon plate)
               Shopify apps        3 per card    (rim + plate + arrow)
               Shopify capability  2 per card    (border beam + tilt sway)
               testimonials        1 per card    (6px float — NO tilt sway)
               case studies        1 per card    (Ken Burns on the image only)
               tech stack          2 per chip    (float + tilt sway)
               CTA                 1             (very slow tilt sway)

             The rule that produces those numbers: no permanent rotation on an
             element that contains a PARAGRAPH anyone settles in to read. A
             rotation warps the glyphs, and a layer whose transform animates
             forever stays promoted and raster-cached, so the copy is rendered
             once and texture-scaled after that — which is what makes body copy
             read soft rather than crisp. Hence `idle={0}` on the testimonial,
             case-study and service cards. Their pointer tilt survives, because
             hover is something the reader chose, and it costs only while one
             card is under the cursor. Motion BEHIND reading content is fine;
             motion ON it is not.

             The app cards are `idle={0}` for a different reason: their glass
             surface carries a `backdrop-filter`, which is only cacheable while
             the element is stationary relative to what is behind it. The
             capability cards keep their sway — a heading and one short line,
             no backdrop-filter — and they are where the band's continuous 3D
             actually reads.

             Everything continuous is also viewport-gated — <Tilt3D>'s sway and
             <Text3D>'s included — so a card six viewports down costs nothing.

          Every wrapper here is a SEPARATE element from the section it holds
          and from any entrance inside it, because ScrollDrift writes `x`,
          ScrollReveal writes `scale`/`y`/`opacity` and the FadeIn/SlideIn/
          Stagger inside each section write their own — two of those on one
          node and the later write silently erases the earlier.

          NOTE which sections get a scale or a drift and which do not: Sliders,
          ShopifyPartner and CaseStuday each paint a full-bleed <SoftBand>, and
          `band-soft` feathers TOP AND BOTTOM ONLY. Scaling or side-drifting
          one of those insets its tint from the viewport edge and opens exactly
          the hard vertical colour seam the feathering exists to prevent, so
          they move on Y and opacity alone — the feathered axis. The About band
          gets its scale on the CONTENT instead, with the tint left at rest. */}

      {/* Strongest moment on the page: the strip has to feel like it is
          arriving out of the hero. */}
      <ScrollDrift className="w-full" from="right" distance={26}>
        <ScrollReveal className="w-full" scale={0.9} y={70} fade={0.35}>
          <ProjectWork />
        </ScrollReveal>
      </ScrollDrift>

      {/* Tinted band — vertical only (see the note above). */}
      <ScrollReveal className="w-full" y={56} fade={0.4}>
        <Sliders />
      </ScrollReveal>

      {/* Tinted band, and by far the tallest section on the page: the lift is
          pulled back so the arrival is over well before the app cards are in
          reading position. */}
      <ScrollReveal className="w-full" y={44} fade={0.5}>
        <ShopifyPartner />
      </ScrollReveal>

      {/* ── Leading Companies Section ─────────────────────────────────────
          A <section>, not a <div>, for the same reason the hero is one:
          <Text3D> tracks the pointer on `host.closest("section")`, so the
          extruded heading below leans toward the cursor anywhere in this band
          rather than only when it is over the glyphs. The `id` is unchanged,
          so every existing #who link still lands here, and a <section> with no
          accessible name is not exposed as a landmark — nothing changes for a
          screen reader. */}
      <section className="relative w-full py-[50px] p-8 xl:pl-[100px]" id="who">
        {/* Tint on its own feathered layer — `band-soft` on this element would
            mask the descendants too, fading the eyebrow rule, the heading and
            the closing Circle out along with the band.

            It also stays OUTSIDE the drift/scale wrappers below on purpose:
            band-soft has no horizontal feather, so a tint that scaled or slid
            sideways would show a hard vertical edge against the raw page. The
            content moves; the colour does not. */}
        <SoftBand className="bg-pink-100/50" />
        <ScrollDrift className="relative z-10" from="left" distance={20}>
          <ScrollReveal scale={0.965} y={38} fade={0.55}>
        <div
          className={`grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-2 w-full place-items-center `}
        >
          <SlideIn from="left" className=" w-full  items-start  text-start ">
            <div
              aria-hidden="true"
              className="w-[100px] border-2 mb-2 border-pink-500 mx-auto lg:mx-0"
            ></div>
            {/* Extruded, and modestly so: this is a section label sitting
                directly above body copy, not a hero headline, so the depth is
                6 layers at 1.6px rather than the hero's 8 at 2, and the swing
                is dialled back to 9deg. The side takes the band's own accent
                (pink-500 is #3BA6FF — the palette's "pink" ramp is the site
                BLUES) so the extrusion reads as lit by this band rather than
                bolted on. <Text3D> takes a plain string only. */}
            <h1 className="text-[20px] lg:text-[35px]">
              <Text3D
                depth={6}
                step={1.6}
                max={9}
                sway={4}
                sideColor="#0A1830"
                faceClassName="text-common-black"
              >
                About Pixels Piece
              </Text3D>
            </h1>
            <h1 className="text-[25px] lg:text-[40px] gap-3 font-bold flex items-center  lg:justify-start ">
              to  <RotatingText
                  texts={[
  "develop software",
  "develop software!",
  "build applications",
  "design user interfaces",
  "create digital solutions",
  "write clean code",
  "develop web apps",
  "build mobile apps",
  "optimize performance",
  "debug and test software",
  "deploy applications",
  "maintain software systems",
  "innovate with technology",
  "engineer digital products",
  "build Shopify apps",
  "customize storefronts"
]}
  mainClassName="px-2 sm:px-2 md:px-3 bg-pink-200 text-primary-main overflow-hidden py-0.5 sm:py-1 md:py-2 justify-center rounded-lg"
  staggerFrom={"last"}
  initial={{ y: "100%" }}
  animate={{ y: 0 }}
  exit={{ y: "-120%" }}
  staggerDuration={0.025}
  splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
  transition={{ type: "spring", damping: 30, stiffness: 400 }}
  rotationInterval={2000}
/> 
            </h1>
            <p className="mt-6 text-black-800 text-[15px] md:text-[18px]">
              <span className="text-pink-500 font-semibold text-[18px]">
                Pixels Piece
              </span>{" "}
              is an Indian-based custom software development company
              specializing in mobile and web app development. With over 20+
              projects offered to companies across the globe, we have the
              expertise needed to develop, test, and deploy tailored software
              solutions.
            </p>
     

            <p className="mt-6 text-black-800 text-[15px] md:text-[18px]">
              We have talented teams of React, React Native, Angular, Node, and
              Flutter developers and designers who are highly passionate about
              designing solutions for various industries.About Pixels Piece has
              developed innovative digital products for eCommerce, finance,
              manufacturing, wellness, travel, and more.
            </p>
            <p className="mt-6 text-black-800 text-[15px] md:text-[18px]">
              Count on us for custom, responsive software solutions built with
              cutting-edge technologies designed to add value.
            </p>
          </SlideIn>
          <SlideIn from="right" className="w-fit mt-2 md:mt-0" delay={0.1}>
            <Image
              src={SoftWareImage}
              alt="Illustration of the Pixels Piece team building custom software"
              className="w-full h-auto"
            />
          </SlideIn>
        </div>
        <div className="mt-3">
          <Circle />
        </div>
          </ScrollReveal>
        </ScrollDrift>
      </section>

      {/* ── The calm stretch ────────────────────────────────────────────────
          Testimonials and case studies are where visitors stop and READ. Both
          keep a lift small enough to have settled before their first line of
          copy reaches a comfortable reading height, and neither is scaled:
          type that is still resizing under the eye is the fastest way to make
          a page feel cheap.

          It is calm in the CONTINUOUS layer too, which is the half that is
          easy to forget — see the budget in the rhythm note above. Both
          sections run Tilt3D with `idle={0}`, so the only thing looping on a
          testimonial is a 6px card float and the only thing looping on a case
          study is the Ken Burns pan inside a picture frame that never moves.
          Neither of those touches a glyph. */}
      <ScrollReveal className="w-full" y={22} fade={0.62}>
        <Review />
      </ScrollReveal>

      {/* Calmest wrapper on the page, and deliberately the plainest. This
          section owns the home page's ONE giant scroll word, which runs its
          own useScroll drift inside — every pixel this wrapper moves is a
          pixel that shifts the word's measured position too, so the lift is
          kept to 14px where that coupling is invisible. Scaling it would also
          inset its <SoftBand>, which is the seam rule again. */}
      <ScrollReveal className="w-full" y={14} fade={0.7}>
        <CaseStuday />
      </ScrollReveal>

      {/* Lifting again on the way out of the reading stretch, and drifting
          back the other way from the About band above it.

          Lift and drift but deliberately NO scale, unlike the other loud
          sections: this band is a MUI <Tabs>, and MUI positions the tab
          indicator from getBoundingClientRect measurements that it then writes
          back as px INSIDE the same subtree. Under a scaled ancestor those px
          get scaled a second time, so a visitor who clicks a tab while the
          section is still arriving would leave the underline a few px narrow
          until the next resize. y and x are pure translation and measure
          identically at any offset. */}
      <ScrollDrift className="w-full" from="right" distance={20}>
        <ScrollReveal className="w-full" y={40} fade={0.5}>
          <Techology />
        </ScrollReveal>
      </ScrollDrift>
      
      {/* ── Footer Section ─────────────────────────────────────────────────
          The page's last swell, and the only thing after it is the site
          footer — so it gets the hero's intensity back: a 0.90 scale and a
          64px lift, plus a permanent, very slow tilt so the slab reads as a
          physical panel at rest rather than a rectangle waiting to be hovered.

          FOUR nested elements, one transform each, in this order:
            ScrollReveal  scale + y   (scroll-linked)
            Tilt3D        rotateX/Y   (idle sway, then pointer)
            FadeIn        entrance    (opacity + y, once)
            HoverLift     press/hover (inside, on the button only)
          Collapse any two of them onto one node and the later write wins in
          silence. ScrollReveal is left with no `fade` precisely because FadeIn
          below already owns this card's opacity.

          The tilt is deliberately gentler than a card's: at ~1000px wide, one
          degree already lifts a corner by ~9px, so 1.2deg of idle at
          perspective 1400 is as far as this can go before the CTA looks like
          it is falling over. */}
      <ScrollReveal
        className="w-[calc(100%_-_48px)] lg:w-[70%] mt-10 mb-[40px]"
        scale={0.9}
        y={64}
      >
        <Tilt3D
          className="w-full"
          innerClassName="w-full"
          max={5}
          perspective={1400}
          lift={12}
          idle={1.2}
          idleDuration={9}
        >
          <FadeIn className="w-full bg-black-200 h-auto lg:h-[200px] shadow-lg rounded-lg flex flex-col lg:flex-row items-center justify-between px-6 lg:px-[50px] py-6 lg:py-0">
            <h3 className="text-[20px] lg:text-[28px] font-semibold text-common-black text-center lg:text-left">
              Hire the best developers and designers around!
            </h3>
            <HoverLift className="mt-4 lg:mt-0 w-full lg:w-auto">
              <CustomButton
                name="Hire Top Developers"
                className="w-full"
                onClick={() =>
                  window.open(
                    "https://calendly.com/darshitshyani1/30min",
                    "_blank",
                    "noopener,noreferrer"
                  )
                }
              />
            </HoverLift>
          </FadeIn>
        </Tilt3D>
      </ScrollReveal>
  
    </div>
  );
};

export default HomePage;
