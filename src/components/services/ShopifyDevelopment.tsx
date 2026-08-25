import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";
import OpenInNewRounded from "@mui/icons-material/OpenInNewRounded";
import SellOutlined from "@mui/icons-material/SellOutlined";
import StraightenOutlined from "@mui/icons-material/StraightenOutlined";

import { BuiltForShopifyBadge } from "@/components/shared/BuiltForShopifyBadge";
import Circle from "@/untils/icons/Circle";
import { ShopifyLogo, WebImage } from "@/untils/images";
import { PIMW, PIMW_PLATFORM } from "@/untils/data/pimw";
import {
  APP_PORTFOLIO,
  BUILT_FOR_SHOPIFY_BLURB,
  SHOPIFY_APPS,
  type ShopifyApp,
} from "@/untils/data/shopifyApps";
import {
  AnimatedGradientText,
  CountUp,
  FadeIn,
  HoverLift,
  Reveal,
  ScaleIn,
  SlideIn,
  SplitReveal,
  Stagger,
  StaggerItem,
} from "@/components/shared/motion";
import {
  AuroraBackground,
  BorderBeam,
  GridPattern,
  SoftBand,
  SpotlightCard,
} from "@/components/shared/backgrounds";
import { Parallax, ScrollStage } from "@/components/shared/scroll";

type BuildItem = {
  title: string;
  description: string;
};

const whatWeBuild: BuildItem[] = [
  {
    title: "Public App Store apps",
    description:
      "End-to-end delivery of an app that is listed publicly on the Shopify App Store: OAuth and session handling, billing, mandatory webhooks, listing copy and the review submission itself.",
  },
  {
    title: "Custom and private apps",
    description:
      "Single-merchant apps that solve one store’s workflow — bulk operations, ERP and 3PL sync, pricing rules, reporting — installed straight onto the store without a public listing.",
  },
  {
    title: "Admin and checkout extensions",
    description:
      "App extensions that put your interface where merchants already work: admin blocks and actions, checkout UI extensions, customer account extensions and POS tiles.",
  },
  {
    title: "Shopify Functions",
    description:
      "Server-side logic that runs inside Shopify itself — discounts, cart and checkout validation, delivery and payment customizations, order routing and Cart Transform.",
  },
  {
    title: "Themes and app blocks",
    description:
      "Liquid theme work and theme app blocks so your feature drops into any Online Store 2.0 theme from the theme editor, with no code edits asked of the merchant.",
  },
  {
    title: "Hydrogen headless storefronts",
    description:
      "React storefronts on Hydrogen and Oxygen, wired to the Storefront API, for teams that need full control of rendering, routing and content.",
  },
  {
    title: "Data modelling and integrations",
    description:
      "Metafields, metaobjects, webhooks and the Admin GraphQL API modelled properly up front, so the data survives catalogue growth instead of being patched later.",
  },
  {
    title: "Migrations and performance",
    description:
      "Moves onto Shopify from another platform, app-to-app migrations, and the unglamorous work of trimming payloads, queries and theme weight until pages feel quick.",
  },
];

type ProcessStep = {
  phase: string;
  description: string;
};

const buildProcess: ProcessStep[] = [
  {
    phase: "Scope the merchant problem",
    description:
      "We start on the store, not the spec: how merchandising actually works today, where staff lose time, and which of it belongs in an app, a Function, a theme block or nothing at all.",
  },
  {
    phase: "Model the data first",
    description:
      "Metafields, metaobjects and webhook topics are decided before any UI is drawn. Getting the shape right early is what keeps the app fast and keeps later features cheap to add.",
  },
  {
    phase: "Build in the merchant’s surface",
    description:
      "We build against a development store with the Shopify CLI, so admin extensions, theme blocks and Functions are exercised in the real surface they will ship into.",
  },
  {
    phase: "Prepare for App Store review",
    description:
      "For public apps we work through the requirements checklist ahead of submission: OAuth flow, billing, mandatory compliance webhooks, privacy policy, performance and listing assets.",
  },
  {
    phase: "Launch and stay on it",
    description:
      "After release we watch installs and errors, answer merchant questions, and keep the app current as Shopify ships new API versions each quarter.",
  },
];

type PortfolioStat = {
  id: string;
  value: number;
  decimals?: number;
  label: string;
};

/**
 * Every figure below is READ from `@/untils/data/shopifyApps` — the roll-ups
 * there are derived from the app list itself, so a new listing updates this
 * section without anyone editing a number. Never restate one as a literal, and
 * never state the badge for an app: it is per-app, and PIMW does not carry it.
 */
const portfolioStats: PortfolioStat[] = [
  {
    id: "apps",
    value: APP_PORTFOLIO.appCount,
    label: "Apps published on the Shopify App Store",
  },
  {
    id: "rating",
    value: APP_PORTFOLIO.rating,
    decimals: 1,
    label: APP_PORTFOLIO.allFiveStar
      ? "Rating on every one of them"
      : "Average rating across the portfolio",
  },
  {
    id: "reviews",
    value: APP_PORTFOLIO.totalReviews,
    label: APP_PORTFOLIO.allFiveStar
      ? "Five-star merchant reviews"
      : "Merchant reviews",
  },
  {
    id: "built-for-shopify",
    value: APP_PORTFOLIO.builtForShopifyCount,
    label: "Carry Shopify’s Built for Shopify badge",
  },
];

/** One icon per listing, keyed by the data module's JSX-free icon key. */
const APP_ICONS: Record<ShopifyApp["icon"], typeof AutoAwesomeOutlined> = {
  personalize: AutoAwesomeOutlined,
  sizing: StraightenOutlined,
  delivery: LocalShippingOutlined,
  discount: SellOutlined,
};

const ShopifyDevelopment = () => {
  return (
    <div className="mt-[80px] w-full">
      <Head>
        <meta
          name="description"
          content="Shopify app and storefront development by Pixels Piece — public and custom apps, app extensions, Shopify Functions, theme app blocks and Hydrogen headless storefronts."
        />
      </Head>

      {/* ── hero ───────────────────────────────────────────────────────── */}
      <section className="relative w-full overflow-hidden">
        {/* fade="both": this hero starts ~80px down the document, not at y=0, and
            the section clips with overflow-hidden. The topbar pill only covers
            5%–95% of the width, so an unfeathered top edge draws a visible
            horizontal cut across the outer strips at every viewport height. */}
        <AuroraBackground variant="green" intensity={0.45} fade="both" />
        <GridPattern className="text-black-300" opacity={0.16} fade="edges" />
        <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center px-4 py-[60px] text-center md:px-[50px] md:py-[80px] lg:px-[100px]">
          <FadeIn>
            <div
              aria-hidden="true"
              className="mx-auto mb-6 w-[50px] border-2 border-pink-500 md:w-[80px]"
            />
          </FadeIn>
          <Reveal className="text-center">
            <p className="text-[18px] text-black-800 md:text-[22px]">
              Pixels Piece
            </p>
          </Reveal>
          <h1 className="mt-2 font-display text-[28px] font-bold leading-[1.14] tracking-tight text-common-black md:text-[40px] lg:text-[46px]">
            <SplitReveal text="Shopify App &amp; Storefront" />{" "}
            <AnimatedGradientText className="font-bold">
              Development
            </AnimatedGradientText>
          </h1>
          <FadeIn delay={0.08}>
            <h2 className="mt-5 text-center font-display text-[22px] font-semibold tracking-tight text-black-800 md:text-[28px] lg:text-[32px]">
              We build on Shopify, and we ship on Shopify.
            </h2>
          </FadeIn>
          <FadeIn delay={0.14}>
            <p className="mx-auto mt-6 max-w-[760px] text-center text-[15px] text-black-700 md:text-[18px]">
              We are a Shopify Partner in Surat, India, building apps,
              extensions and storefronts for merchants and for ourselves. We
              publish {APP_PORTFOLIO.appCount} of our own apps on the Shopify
              App Store — so every recommendation on this page comes from
              codebases we maintain, submit for review and support in
              production.
            </p>
          </FadeIn>
          <FadeIn delay={0.2}>
            <ul className="mt-8 flex flex-wrap items-center justify-center gap-2">
              {PIMW.worksWith.map((item) => (
                <li
                  key={item}
                  className="inline-flex items-center gap-1 rounded-full bg-shopify-100 px-3 py-1 text-[13px] font-medium text-shopify-700"
                >
                  {item}
                </li>
              ))}
            </ul>
          </FadeIn>
        </div>
      </section>

      {/* ── what we build ──────────────────────────────────────────────── */}
      <section className="relative w-full px-4 py-[50px] md:px-[50px] lg:px-[100px]">
        {/* The tint rides its own feathered layer. `band-soft` on the <section>
            masks every painted descendant, so with only 50px of padding it
            would render this heading and the closing CTAs at partial opacity.
            Only the tint feathers now. */}
        <SoftBand className="bg-black-100/50" />
        <div className="relative z-10 mx-auto w-full max-w-[1200px]">
          <div
            aria-hidden="true"
            className="mb-4 w-[100px] border-2 border-pink-500"
          />
          <FadeIn>
            <p className="text-[20px] text-black-800 md:text-[25px]">
              What we build
            </p>
            <h2 className="mt-1 font-display text-[25px] font-bold tracking-tight text-common-black md:text-[35px]">
              <SplitReveal text="Shopify" className="text-pink-600" />{" "}
              <SplitReveal text="work, end to end" delay={0.12} />
            </h2>
            <p className="mt-6 max-w-[760px] text-[15px] text-black-700 md:text-[18px]">
              Most stores do not need one big custom build. They need the right
              piece in the right surface. These are the pieces we work in.
            </p>
          </FadeIn>

          {/* The gentle lag rides its OWN wrapper. <Stagger> is a motion.div:
              GSAP writes `transform` for data-speed and motion writes
              `transform` for the entrance, so merging the two onto one node
              would let whichever writes last silently kill the other. This
              section is not clipped, so a lagging grid cannot be cut off at
              its edges — which is why the parallax sits here rather than on
              the step cards inside the overflow-hidden stage below. */}
          <Parallax speed={0.95}>
            <Stagger className="mt-10 w-full" stagger={0.06}>
              <ul className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {whatWeBuild.map((item, index) => (
                  <li key={item.title} className="h-full">
                    <StaggerItem className="h-full">
                      <BorderBeam
                        tone="shopify"
                        radius={16}
                        duration={5}
                        className="h-full transition-transform duration-300 hover:-translate-y-1"
                        contentClassName="flex h-full flex-col bg-common-white p-6 shadow-md transition-shadow duration-300 group-hover:shadow-xl"
                      >
                      <div className="w-fit rounded-full border border-black-400 p-1">
                        <span
                          aria-hidden="true"
                          className="flex h-[46px] w-[46px] items-center justify-center rounded-full bg-pink-100 text-[16px] font-bold text-primary-main"
                        >
                          {String(index + 1).padStart(2, "0")}
                        </span>
                      </div>
                      <h3 className="mt-4 text-[16px] font-semibold text-common-black md:text-[18px]">
                        {item.title}
                      </h3>
                      <p className="mt-2 text-[14px] text-black-700 md:text-[16px]">
                        {item.description}
                      </p>
                      </BorderBeam>
                    </StaggerItem>
                  </li>
                ))}
              </ul>
            </Stagger>
          </Parallax>
        </div>
      </section>

      {/* ── process ────────────────────────────────────────────────────── */}
      {/* The ONE giant word on this page — the hero already spends the page's
          single aurora, and the global AmbientBackground carries depth
          everywhere else. It rides the process section because that is the
          only band-free block here with real empty space in it: on xl a lone
          image sits opposite a taller five-step column, so "SHOPIFY" surfaces
          in the gap below the image and through the card gutters instead of
          under body copy, and every step card is an opaque `bg-common-white`
          surface that rides up over it. The heading and intro sit above the
          centred word, so no real text loses contrast.

          <ScrollStage> supplies the mandatory `relative overflow-hidden` — the
          word is deliberately wider than the viewport and an unclipped one
          would scroll the whole page sideways on mobile — plus the
          `relative z-10` content layer. Same speed and same tone as the word
          on the other four service pages. */}
      <ScrollStage
        word="SHOPIFY"
        speed={0.6}
        align="center"
        className="px-4 py-[50px] md:px-[50px] lg:px-[100px]"
      >
        <div className="mx-auto w-full max-w-[1200px]">
          <div
            aria-hidden="true"
            className="mb-4 w-[100px] border-2 border-pink-500"
          />
          <FadeIn>
            <p className="text-[20px] text-black-800 md:text-[25px]">
              How we work
            </p>
            <h2 className="mt-1 font-display text-[25px] font-bold tracking-tight text-common-black md:text-[30px] lg:text-[35px]">
              <SplitReveal text="Our Shopify delivery" className="text-pink-600" />{" "}
              <SplitReveal text="stages" delay={0.16} />
            </h2>
            <p className="mt-6 max-w-[760px] text-[15px] text-black-700 md:text-[18px]">
              The same five stages whether it is a public app, a single Function
              or a headless storefront. The order matters more than the size of
              the project.
            </p>
          </FadeIn>

          <div className="mt-8 grid grid-cols-1 items-start gap-8 xl:grid-cols-2 xl:gap-12">
            <SlideIn from="left" className="w-full">
              <Image
                src={WebImage}
                alt=""
                aria-hidden="true"
                className="w-full h-auto rounded-xl border border-black-200"
              />
            </SlideIn>

            <Stagger className="w-full" stagger={0.07}>
              <ol className="flex w-full flex-col gap-3">
                {buildProcess.map((item, index) => (
                  <li key={item.phase}>
                    <StaggerItem className="flex w-full flex-col rounded-xl border-2 border-pink-500 bg-common-white p-3 shadow-lg">
                      <h3 className="flex items-center gap-2 text-[18px] font-semibold text-common-black md:text-[20px]">
                        <span
                          aria-hidden="true"
                          className="text-primary-main font-bold"
                        >
                          ➤
                        </span>
                        <span className="sr-only">Stage {index + 1}: </span>
                        {item.phase}
                      </h3>
                      <p className="pl-8 text-[14px] font-medium text-black-700 md:text-[15px] lg:text-[16px]">
                        {item.description}
                      </p>
                    </StaggerItem>
                  </li>
                ))}
              </ol>
            </Stagger>
          </div>

          <div className="mt-6 flex justify-center xl:justify-start">
            <Circle />
          </div>
        </div>
      </ScrollStage>

      {/* ── proof: the apps we publish ─────────────────────────────────── */}
      <section
        id="shopify-proof"
        className="relative w-full px-4 py-[50px] md:px-[50px] lg:px-[100px]"
      >
        {/* The tint rides its own feathered layer. `band-soft` on the <section>
            masks every painted descendant, so with only 50px of padding it
            would render this heading and the closing CTAs at partial opacity.
            Only the tint feathers now. */}
        <SoftBand className="bg-shopify-100/50" />
        <div className="relative z-10 mx-auto flex w-full max-w-[1200px] flex-col items-center">
          <ScaleIn>
            <span className="inline-flex items-center gap-2 rounded-full bg-common-white px-4 py-2 text-[13px] font-medium text-shopify-700 shadow-md">
              <Image src={ShopifyLogo} alt="Shopify" width={18} height={18} />
              {APP_PORTFOLIO.appCount} apps live on the Shopify App Store
            </span>
          </ScaleIn>

          <FadeIn delay={0.06}>
            <h2 className="mt-6 text-center font-display text-[25px] font-bold tracking-tight text-common-black md:text-[35px]">
              <SplitReveal text="We do not just build Shopify apps. We publish our own." />
            </h2>
          </FadeIn>

          <FadeIn delay={0.12}>
            <p className="mx-auto mt-6 max-w-[760px] text-center text-[15px] text-black-800 md:text-[18px]">
              We have taken {APP_PORTFOLIO.appCount} apps through Shopify’s
              review process and onto the App Store, and{" "}
              {APP_PORTFOLIO.builtForShopifyCount} of them meet Shopify’s
              highest standards for performance, design and integration. That is
              the same review checklist, the same API deprecations and the same
              merchants your project will meet.
            </p>
          </FadeIn>

          <Stagger className="mt-10 w-full" stagger={0.08}>
            <ul className="grid w-full grid-cols-2 gap-6 lg:grid-cols-4">
              {portfolioStats.map((stat) => (
                <li key={stat.id} className="h-full">
                  <StaggerItem className="flex h-full flex-col items-center justify-center rounded-2xl border border-shopify-200 bg-common-white p-6 text-center shadow-md transition-shadow duration-300 hover:shadow-xl">
                    <CountUp
                      value={stat.value}
                      decimals={stat.decimals}
                      className="text-[35px] font-bold text-shopify-700 md:text-[50px]"
                    />
                    <p className="mt-2 text-[14px] text-black-700 md:text-[16px]">
                      {stat.label}
                    </p>
                  </StaggerItem>
                </li>
              ))}
            </ul>
          </Stagger>

          <FadeIn delay={0.08} className="w-full">
            <h3 className="mt-14 text-center font-display text-[20px] font-semibold tracking-tight text-common-black md:text-[25px]">
              <SplitReveal text="The apps we have shipped" />
            </h3>
          </FadeIn>

          <Stagger className="mt-8 w-full" stagger={0.07}>
            <ul className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {SHOPIFY_APPS.map((app) => {
                const Icon = APP_ICONS[app.icon];
                return (
                  <li key={app.id} className="h-full">
                    <StaggerItem className="h-full">
                      {/* chrome on className, layout on contentClassName */}
                      <SpotlightCard
                        color="green"
                        className="h-full rounded-2xl border border-black-200 bg-common-white shadow-md transition-shadow duration-300 hover:shadow-xl"
                        contentClassName="flex h-full flex-col p-6"
                      >
                        <span
                          aria-hidden="true"
                          className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-shopify-200 bg-shopify-100 text-shopify-700"
                        >
                          <Icon />
                        </span>

                        <h4 className="mt-4 text-[16px] font-semibold text-common-black md:text-[18px]">
                          {app.name}
                        </h4>
                        <p className="mt-2 text-[14px] text-black-700 md:text-[15px]">
                          {app.tagline}
                        </p>

                        <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[13px] text-black-700">
                          <span aria-hidden="true" className="text-orange-main">
                            {"★".repeat(Math.round(app.rating))}
                          </span>
                          <span className="font-semibold text-common-black">
                            {app.rating.toFixed(1)}
                          </span>
                          <span>from {app.reviewCount} reviews</span>
                        </p>
                        <p className="mt-1 text-[13px] text-black-600">
                          {app.priceLabel} · Launched {app.launched}
                        </p>

                        {/* Per-app, always. Three of the four carry it; PIMW
                            does not, and a blanket badge would be a lie. */}
                        {app.builtForShopify ? (
                          <BuiltForShopifyBadge className="mt-4" />
                        ) : null}

                        <div className="mt-auto flex flex-col items-start gap-2 pt-5">
                          <a
                            href={app.appStoreUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label={`View ${app.name} on the Shopify App Store, opens in a new tab`}
                            className="inline-flex items-center gap-1 text-[14px] font-medium text-shopify-700 underline underline-offset-4 transition-colors duration-200 hover:text-shopify-600 dark:hover:text-shopify-400"
                          >
                            View on the App Store
                            <OpenInNewRounded
                              aria-hidden="true"
                              style={{ fontSize: 15 }}
                            />
                          </a>
                          {app.internalUrl ? (
                            <Link
                              href={app.internalUrl}
                              className="inline-flex items-center gap-1 text-[14px] font-medium text-primary-main underline underline-offset-4 transition-colors duration-200 hover:text-pink-700 dark:hover:text-pink-400"
                            >
                              Inside {app.shortName}
                              <ArrowForwardRounded
                                aria-hidden="true"
                                style={{ fontSize: 15 }}
                              />
                            </Link>
                          ) : null}
                        </div>
                      </SpotlightCard>
                    </StaggerItem>
                  </li>
                );
              })}
            </ul>
          </Stagger>

          <FadeIn delay={0.1}>
            <p className="mx-auto mt-8 max-w-[760px] text-center text-[14px] text-black-700 md:text-[15px]">
              Built for Shopify is Shopify’s own badge:{" "}
              <span className="italic">“{BUILT_FOR_SHOPIFY_BLURB}”</span> It
              sits on {APP_PORTFOLIO.builtForShopifyCount} of our{" "}
              {APP_PORTFOLIO.appCount} listings.
            </p>
          </FadeIn>

          <FadeIn delay={0.12} className="w-full">
            <div className="mx-auto mt-12 w-full max-w-[860px] rounded-2xl border border-black-200 bg-common-white p-6 shadow-md md:p-8">
              <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-black-600">
                The deepest build
              </p>
              <h3 className="mt-2 text-[18px] font-semibold text-common-black md:text-[20px]">
                {PIMW.name}
              </h3>
              <p className="mt-3 text-[15px] text-black-700 md:text-[16px]">
                Our own product personalizer for Shopify stores, published by{" "}
                {PIMW.developer}. {PIMW.launchedLabel}. It is the reference build
                behind everything above — app blocks, ten option field types,
                live preview and real-time option pricing through Shopify’s Cart
                Transform function.
              </p>
              <ul className="mt-6 flex flex-col gap-3">
                {PIMW_PLATFORM.map((fact) => (
                  <li
                    key={fact}
                    className="flex items-start gap-3 text-[15px] text-black-800 md:text-[16px]"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-[2px] shrink-0 text-shopify-500"
                    >
                      ✓
                    </span>
                    <span className="min-w-0 break-words">{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>

          <FadeIn delay={0.16}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
              <HoverLift className="inline-block">
                <Link
                  href="/shopify-apps"
                  className="inline-flex items-center justify-center rounded-lg bg-primary-main px-6 py-3 text-[16px] font-medium text-static-white shadow-md transition-colors duration-200 hover:bg-pink-700"
                >
                  See all {APP_PORTFOLIO.appCount} of our apps
                </Link>
              </HoverLift>
              <HoverLift className="inline-block">
                <Link
                  href="/shopify-app"
                  className="inline-flex items-center justify-center rounded-lg border-2 border-primary-main bg-common-white px-6 py-3 text-[16px] font-medium text-primary-main transition-colors duration-200 hover:bg-pink-100"
                >
                  See what {PIMW.shortName} does
                </Link>
              </HoverLift>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── closing CTA ────────────────────────────────────────────────── */}
      <section className="relative w-full px-4 py-[50px] md:px-[50px] lg:px-[100px]">
        {/* The tint rides its own feathered layer. `band-soft` on the <section>
            masks every painted descendant, so with only 50px of padding it
            would render this heading and the closing CTAs at partial opacity.
            Only the tint feathers now. */}
        <SoftBand className="bg-pink-100/50" />
        <div className="relative z-10 mx-auto flex w-full max-w-[860px] flex-col items-center">
          <div
            aria-hidden="true"
            className="mb-5 w-[100px] border-2 border-pink-500"
          />
          <FadeIn>
            <h2 className="text-center font-display text-[25px] font-bold tracking-tight text-common-black md:text-[35px]">
              <SplitReveal text="Have a Shopify idea that does not fit an off-the-shelf app?" />
            </h2>
          </FadeIn>
          <FadeIn delay={0.08}>
            <p className="mt-6 text-center text-[15px] text-black-700 md:text-[18px]">
              Tell us what the store needs to do. We will tell you whether it is
              an app, a Function, a theme block — or a much smaller change than
              you expected.
            </p>
          </FadeIn>
          <FadeIn delay={0.14}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <HoverLift className="inline-block">
                <a
                  href="#contact"
                  className="inline-flex items-center justify-center rounded-lg bg-primary-main px-6 py-3 text-[16px] font-medium text-static-white shadow-md transition-shadow duration-300 hover:shadow-xl"
                >
                  Talk to us
                </a>
              </HoverLift>
              <Link
                href="/portfolio"
                className="inline-flex items-center justify-center rounded-lg border-2 border-primary-main bg-common-white px-6 py-3 text-[16px] font-medium text-primary-main transition-colors duration-200 hover:bg-pink-100"
              >
                See our work
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </div>
  );
};

export default ShopifyDevelopment;
