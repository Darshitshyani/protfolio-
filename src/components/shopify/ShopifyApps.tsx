/**
 * /shopify-apps — the Shopify app portfolio page.
 *
 * Pixels Piece publishes MORE THAN ONE app. Every fact on this page is read
 * from `@/untils/data/shopifyApps` (verified against the live App Store
 * listings) — never typed as a literal here. That includes:
 *
 *   • ratings, review counts, price labels and launch dates  -> `SHOPIFY_APPS`
 *   • the app count / review total / badge count roll-ups    -> `APP_PORTFOLIO`
 *   • the "Built for Shopify" wording                        -> `BUILT_FOR_SHOPIFY_BLURB`
 *
 * ⚠ THE BADGE IS PER-APP. It renders only where `app.builtForShopify` is true,
 * so a blanket "all our apps are Built for Shopify" sentence is impossible to
 * write by accident. PIMW does NOT carry it; three of the four do, and
 * "3 of our 4 apps are Built for Shopify" is the accurate, strong version of
 * that claim — it is assembled from `builtForShopifyCount` / `appCount`.
 *
 * Still never claimed anywhere on this page: install or merchant counts,
 * revenue or conversion-lift figures, Shopify Plus, partner tiers, awards.
 * Review quotes are verbatim and come only from `APP_REVIEWS` and
 * `PIMW_REVIEWS`; the Pixel Estimated Delivery Timer's reviews were only
 * available as summaries, so it is deliberately not quoted.
 *
 * Pages Router — deliberately no "use client" directive.
 *
 * Palette notes (tailwind.config.ts replaces Tailwind's default palette):
 *  - `pink-*` holds BLUE hex values; `primary-main` === `pink-600` === #1E90FF.
 *  - `common-white` / `common-black` are the themed surface/ink pair and FLIP
 *    in dark mode; `static-white` / `static-black` never flip, so they are what
 *    sits on a coloured fill (the dark CTA band, the blue buttons).
 *  - `shopify-*` marks Shopify-platform chrome only. Blue stays the action
 *    colour, so every primary CTA here is `bg-primary-main`.
 *
 * Band doctrine (the site has rejected hard colour seams three times): a
 * full-width tint is translucent AND feathered, and the feather rides its own
 * absolutely positioned layer (<SoftBand />, or the local <DarkBand /> below)
 * inside a `relative` section whose content sits in a sibling `relative z-10`.
 * `band-soft` on the <section> itself would mask the headings and cards too.
 */

import * as React from "react";
import Image from "next/image";
import Link from "next/link";

import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import AutoAwesomeOutlined from "@mui/icons-material/AutoAwesomeOutlined";
import CheckCircleRounded from "@mui/icons-material/CheckCircleRounded";
import ExtensionOutlined from "@mui/icons-material/ExtensionOutlined";
import GroupsOutlined from "@mui/icons-material/GroupsOutlined";
import LocalOfferOutlined from "@mui/icons-material/LocalOfferOutlined";
import LocalShippingOutlined from "@mui/icons-material/LocalShippingOutlined";
import OpenInNewRounded from "@mui/icons-material/OpenInNewRounded";
import PaymentsOutlined from "@mui/icons-material/PaymentsOutlined";
import StarRounded from "@mui/icons-material/StarRounded";
import StraightenOutlined from "@mui/icons-material/StraightenOutlined";
import SupportAgentOutlined from "@mui/icons-material/SupportAgentOutlined";
import VerifiedRounded from "@mui/icons-material/VerifiedRounded";

import {
  AnimatedGradientText,
  CountUp,
  FadeIn,
  HoverLift,
  Reveal,
  ScaleIn,
  SplitReveal,
  Stagger,
  StaggerItem,
  cx,
  useReducedMotion,
} from "@/components/shared/motion";
import {
  AuroraBackground,
  BorderBeam,
  GridPattern,
  SoftBand,
  SpotlightCard,
} from "@/components/shared/backgrounds";
import { BuiltForShopifyBadge } from "@/components/shared/BuiltForShopifyBadge";
import { ScrollStage } from "@/components/shared/scroll";
import {
  APP_PORTFOLIO,
  APP_REVIEWS,
  BUILT_FOR_SHOPIFY_BLURB,
  SHOPIFY_APPS,
  type ShopifyApp,
} from "@/untils/data/shopifyApps";
import { PIMW, PIMW_REVIEWS } from "@/untils/data/pimw";
import { ShopifyLogo } from "@/untils/images";

/* ── derived facts ────────────────────────────────────────────────────────
 * Everything below is computed from the data module, so none of it can drift
 * out of step with the listings when an app is added, renamed or repriced.
 */

/** True only while every listing genuinely offers a free plan. */
const EVERY_APP_HAS_FREE_PLAN = SHOPIFY_APPS.every((app) => app.freeplan);

/** Surfaces that EVERY app integrates with — the intersection of `worksWith`. */
const SHARED_SURFACES = SHOPIFY_APPS.reduce<string[]>(
  (shared, app) => shared.filter((surface) => app.worksWith.includes(surface)),
  [...(SHOPIFY_APPS[0]?.worksWith ?? [])]
);

/** "a, b and c" — used for the shared-surface line. */
const formatList = (items: string[]): string =>
  items.length <= 1
    ? items.join("")
    : `${items.slice(0, -1).join(", ")} and ${items[items.length - 1]}`;

/** The one sentence that states the badge split. Assembled, never typed. */
const BADGE_RATIO = `${APP_PORTFOLIO.builtForShopifyCount} of our ${APP_PORTFOLIO.appCount} apps are Built for Shopify`;

/**
 * `@/untils/data/shopifyApps` stays JSX-free, so it names icons by key. Every
 * key in the union is mapped here; adding one without a mapping is a compile
 * error, which is the point.
 */
const ICON_MAP: Record<ShopifyApp["icon"], typeof AutoAwesomeOutlined> = {
  personalize: AutoAwesomeOutlined,
  sizing: StraightenOutlined,
  delivery: LocalShippingOutlined,
  discount: LocalOfferOutlined,
};

/* ── small shared pieces ──────────────────────────────────────────────────── */

/** The site's section rule: a short blue bar above every section heading. */
const SectionRule = ({ className }: { className?: string }) => (
  <div
    aria-hidden="true"
    className={cx("w-[100px] border-2 border-pink-500", className)}
  />
);

/** Decorative star row. Always pair it with real text for assistive tech. */
const Stars = ({ className }: { className?: string }) => (
  <span
    aria-hidden="true"
    className={cx("inline-flex items-center text-orange-main", className)}
  >
    {[0, 1, 2, 3, 4].map((index) => (
      <StarRounded key={index} fontSize="small" />
    ))}
  </span>
);

/**
 * The accent band under the final CTA is DELIBERATELY dark in BOTH themes.
 * `bg-black-900` cannot express that — the neutral ramp inverts in dark, so it
 * would paint a near-white band and the text on it would vanish. The fill is
 * baked here, and every scrap of text on it uses `static-*` so it never flips.
 *
 * The feather matches `band-soft`'s 9rem, so the host section carries >= 9rem
 * of vertical padding and the copy sits on the band's solid core, not the fade.
 * (PimwApp has the same primitive, module-private to that file; this is the
 * only other page that needs it.)
 */
const DARK_BAND_FILL =
  "linear-gradient(135deg, #0C417A 0%, #08315C 55%, #061D35 100%)";

const DARK_BAND_FEATHER =
  "linear-gradient(to bottom, transparent 0, #000 9rem, #000 calc(100% - 9rem), transparent 100%)";

const DarkBand = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none absolute inset-0 z-0"
    style={{
      backgroundImage: DARK_BAND_FILL,
      maskImage: DARK_BAND_FEATHER,
      WebkitMaskImage: DARK_BAND_FEATHER,
    }}
  />
);

/* ── section 1: hero ──────────────────────────────────────────────────────── */

/**
 * Portfolio proof, up front. Each figure is a live read of `APP_PORTFOLIO`, so
 * publishing a fifth app changes this strip without an edit here.
 */
const HERO_STATS: Array<{ id: string; value: React.ReactNode; label: string }> = [
  {
    id: "apps",
    value: <CountUp value={APP_PORTFOLIO.appCount} duration={1.1} />,
    label: "apps published on the Shopify App Store",
  },
  {
    id: "reviews",
    value: <CountUp value={APP_PORTFOLIO.totalReviews} duration={1.5} />,
    label: "merchant reviews across those listings",
  },
  {
    id: "rating",
    value: (
      <CountUp value={APP_PORTFOLIO.rating} decimals={1} duration={1.2} />
    ),
    label: "the rating on every one of them",
  },
  {
    id: "badge",
    value: (
      <span className="inline-flex items-baseline">
        <CountUp value={APP_PORTFOLIO.builtForShopifyCount} duration={1.1} />
        <span className="px-1.5 text-[16px] font-medium text-black-600">of</span>
        <CountUp value={APP_PORTFOLIO.appCount} duration={1.1} />
      </span>
    ),
    label: "carry Shopify's Built for Shopify badge",
  },
];

/* The fixed topbar is 70px tall and floats at top-[2%], so the first section
   opens on ~85px of clearance. It is padding rather than a margin on purpose:
   a margin would start the aurora 85px down the page and draw exactly the
   horizontal seam the feathering exists to remove. */
const Hero = () => (
  <section
    aria-labelledby="apps-hero-heading"
    className="relative w-full overflow-hidden px-4 pb-[60px] pt-[120px] md:px-[50px] lg:px-[100px]"
  >
    {/* The page's one rich surface: aurora + grid over the global ambient mesh.
        `fade="bottom"` is mandatory — the section clips, and a blob still at
        full alpha at the clip draws a seam against the next section. */}
    <AuroraBackground variant="mixed" intensity={0.45} fade="bottom" />
    <GridPattern className="text-black-300" opacity={0.18} fade="edges" />

    <div className="relative z-10 mx-auto flex w-full max-w-[1000px] flex-col items-center text-center">
      <ScaleIn>
        <span className="inline-flex items-center gap-2 rounded-full border border-shopify-border bg-shopify-light px-3 py-1.5">
          <Image
            src={ShopifyLogo}
            alt=""
            aria-hidden="true"
            className="h-[18px] w-[18px]"
          />
          <span className="text-[13px] font-semibold text-shopify-dark">
            Shopify Partner &middot; Pixels Piece
          </span>
        </span>
      </ScaleIn>

      <h1
        id="apps-hero-heading"
        className="mt-6 font-display text-[32px] font-bold leading-tight tracking-tight text-common-black sm:text-[40px] lg:text-[48px]"
      >
        <SplitReveal text="Everything we publish on the" className="block" />
        <AnimatedGradientText className="block font-bold">
          Shopify App Store
        </AnimatedGradientText>
      </h1>

      <FadeIn y={16} delay={0.1}>
        <p className="mt-6 max-w-[720px] text-[15px] leading-relaxed text-black-700 md:text-[18px]">
          Pixels Piece builds and maintains {APP_PORTFOLIO.appCount} public apps
          on the Shopify App Store &mdash; product personalization, size guides
          and fit, estimated delivery dates and scheduled sales. Between them
          they hold {APP_PORTFOLIO.totalReviews} merchant reviews, and{" "}
          {BADGE_RATIO}.
        </p>
      </FadeIn>

      <FadeIn y={16} delay={0.16} className="w-full">
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
          <HoverLift className="w-full sm:w-auto">
            <a
              href="#apps"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-main px-6 py-3 text-[15px] font-medium text-static-white shadow-md transition-colors duration-200 hover:bg-pink-700 sm:w-auto md:text-[16px]"
            >
              <span>See all {APP_PORTFOLIO.appCount} apps</span>
              <ArrowForwardRounded aria-hidden="true" fontSize="small" />
            </a>
          </HoverLift>
          <HoverLift className="w-full sm:w-auto">
            <Link
              href="/services/shopify-app-development"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-primary-main bg-common-white px-6 py-3 text-[15px] font-medium text-primary-main transition-colors duration-200 hover:bg-pink-100 sm:w-auto md:text-[16px]"
            >
              <span>Have us build yours</span>
              <ExtensionOutlined aria-hidden="true" fontSize="small" />
            </Link>
          </HoverLift>
        </div>
      </FadeIn>

      <Stagger
        className="mt-14 w-full"
        stagger={0.08}
        delayChildren={0.05}
        amount={0.1}
      >
        <ul className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {HERO_STATS.map((stat) => (
            <li key={stat.id} className="h-full">
              <StaggerItem className="flex h-full flex-col items-center rounded-2xl border border-black-200 bg-common-white px-5 py-6 text-center shadow-md transition-shadow duration-300 hover:shadow-xl">
                <span className="font-display text-[32px] font-bold leading-none text-primary-main md:text-[38px]">
                  {stat.value}
                </span>
                <span className="mt-3 text-[13px] leading-snug text-black-700">
                  {stat.label}
                </span>
              </StaggerItem>
            </li>
          ))}
        </ul>
      </Stagger>
    </div>
  </section>
);

/* ── section 2: the apps ──────────────────────────────────────────────────── */

const AppCard = ({ app }: { app: ShopifyApp }) => {
  const Icon = ICON_MAP[app.icon];

  return (
    <BorderBeam
      tone="shopify"
      radius={16}
      duration={5}
      className="h-full transition-transform duration-300 hover:-translate-y-1"
      contentClassName="flex h-full flex-col bg-common-white p-6 shadow-md transition-shadow duration-300 group-hover:shadow-xl"
    >
      <div className="flex flex-wrap items-start justify-between gap-3">
        <span
          aria-hidden="true"
          className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-2xl border border-shopify-200 bg-shopify-100 text-shopify-700 transition-colors duration-300 group-hover:border-shopify-300 group-hover:bg-shopify-200"
        >
          <Icon />
        </span>
        {/* Rendered from the listing's own badge state — never for every card. */}
        {app.builtForShopify ? <BuiltForShopifyBadge /> : null}
      </div>

      <h3 className="mt-5 break-words font-display text-[19px] font-bold leading-snug tracking-tight text-common-black md:text-[22px]">
        {app.name}
      </h3>
      <p className="mt-2 text-[14px] leading-relaxed text-black-700 md:text-[15px]">
        {app.tagline}
      </p>

      {/* Rating proof. The star row is decorative; the link carries the text. */}
      <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1">
        <Stars />
        <span aria-hidden="true" className="text-[15px] font-bold text-common-black">
          {app.rating.toFixed(1)}
        </span>
        <a
          href={app.reviewsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[13px] text-black-700 underline decoration-black-300 underline-offset-4 transition-colors duration-200 hover:text-primary-main md:text-[14px]"
        >
          {app.rating.toFixed(1)} from {app.reviewCount}{" "}
          {app.reviewCount === 1 ? "review" : "reviews"} on the App Store
        </a>
      </div>

      <dl className="mt-6 grid grid-cols-2 gap-4 border-y border-black-200 py-4">
        <div className="min-w-0">
          <dt className="text-[12px] font-semibold uppercase tracking-[0.12em] text-black-600">
            Pricing
          </dt>
          <dd className="mt-1 text-[14px] font-semibold text-common-black md:text-[15px]">
            {app.priceLabel}
          </dd>
        </div>
        <div className="min-w-0">
          <dt className="text-[12px] font-semibold uppercase tracking-[0.12em] text-black-600">
            On the App Store since
          </dt>
          <dd className="mt-1 text-[14px] font-semibold text-common-black md:text-[15px]">
            {app.launched}
          </dd>
        </div>
      </dl>

      <ul className="mt-5 flex flex-wrap gap-2">
        {app.categories.map((category) => (
          <li key={category}>
            <span className="inline-flex items-center rounded-full border border-shopify-200 bg-shopify-100 px-3 py-1 text-[12px] font-medium text-shopify-700">
              {category}
            </span>
          </li>
        ))}
      </ul>

      <ul className="mt-6 flex flex-col gap-3">
        {app.highlights.map((highlight) => (
          <li key={highlight} className="flex items-start gap-3">
            <CheckCircleRounded
              aria-hidden="true"
              className="mt-[2px] shrink-0 text-shopify-700"
              style={{ fontSize: 18 }}
            />
            <span className="text-[14px] leading-relaxed text-black-800 md:text-[15px]">
              {highlight}
            </span>
          </li>
        ))}
      </ul>

      <div className="mt-auto flex flex-col gap-3 pt-7 sm:flex-row sm:flex-wrap">
        <HoverLift className="w-full sm:w-auto">
          <a
            href={app.appStoreUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`View ${app.name} on the Shopify App Store, opens in a new tab`}
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-main px-5 py-3 text-[14px] font-medium text-static-white shadow-md transition-colors duration-200 hover:bg-pink-700 sm:w-auto md:text-[15px]"
          >
            <span>View on Shopify App Store</span>
            <OpenInNewRounded aria-hidden="true" fontSize="small" />
          </a>
        </HoverLift>

        {/* Only PIMW has a deep page today; the rest link out only. */}
        {app.internalUrl ? (
          <HoverLift className="w-full sm:w-auto">
            <Link
              href={app.internalUrl}
              aria-label={`See the full ${app.name} product page`}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-primary-main bg-common-white px-5 py-3 text-[14px] font-medium text-primary-main transition-colors duration-200 hover:bg-pink-100 sm:w-auto md:text-[15px]"
            >
              <span>See the full product</span>
              <ArrowForwardRounded aria-hidden="true" fontSize="small" />
            </Link>
          </HoverLift>
        ) : null}
      </div>
    </BorderBeam>
  );
};

/**
 * THE PAGE'S ONE GIANT WORD — nothing else on /shopify-apps gets one.
 *
 * This is the showcase section, so it is the one that earns the effect: the
 * cards are opaque `bg-common-white` surfaces, so as you scroll they ride up
 * over "APPS" and occlude it cleanly, and the word reads through the gutters,
 * the column gap and the space around the heading. `speed={0.6}` lags the page
 * by 40%, so the word drifts down behind the cards instead of travelling with
 * them.
 *
 * <ScrollStage> supplies the mandatory `relative overflow-hidden` — the word is
 * deliberately wider than the viewport and an unclipped one would scroll the
 * whole page sideways on mobile — and drops the children into its own
 * `relative z-10` layer. The section's padding therefore moves to `className`
 * and the old inner max-width div becomes `contentClassName`; `id="apps"` is
 * still the hero's "See all N apps" anchor target.
 *
 * The word takes <GiantWord>'s default tone and does not restate it. That
 * default is now `text-black-200/45`: at the old /60 the word composited to
 * rgb(238,239,243) over the white page (NOT #F3F4F7 — that is black-100, an
 * unrelated token) and `text-black-700` intro copy on it measured 4.41:1,
 * under the 4.5:1 AA floor. At /45 the composite is rgb(242,243,246) and the
 * same copy is 4.57:1. Dark mode was never the problem (8.3:1). Tone lives in
 * the primitive because `important: true` in the Tailwind config makes a
 * call-site colour tie with the default on specificity, leaving emit order to
 * pick the winner.
 *
 * Below 1025px <GiantWord> hides itself, because that is where ScrollSmoother
 * is never created AND where this grid collapses to one full-width column — a
 * static word behind an opaque stack reads as an artifact, not a watermark.
 * At >=1025px the grid is `lg:grid-cols-2`, so the word reads through the
 * centre gutter and around the centred heading block above it.
 */
const AppsGrid = () => (
  <ScrollStage
    id="apps"
    aria-labelledby="apps-grid-heading"
    word="APPS"
    speed={0.6}
    className="px-4 py-[60px] md:px-[50px] lg:px-[100px]"
    contentClassName="mx-auto w-full max-w-[1200px]"
  >
    <FadeIn className="flex w-full flex-col items-center text-center">
      <SectionRule className="mb-4" />
      <Reveal>
        <p className="text-[20px] text-black-800 md:text-[25px]">Our apps</p>
      </Reveal>
      <h2
        id="apps-grid-heading"
        className="mt-1 max-w-[820px] font-display text-[25px] font-bold leading-tight tracking-tight text-common-black md:text-[35px]"
      >
        <SplitReveal
          text={`${APP_PORTFOLIO.appCount} apps, live on the Shopify App Store`}
        />
      </h2>
      <p className="mt-6 max-w-[760px] text-[15px] leading-relaxed text-black-700 md:text-[18px]">
        Each one solves a problem we kept being asked to solve for merchants,
        so we built it once, properly, and published it. Ratings, pricing and
        launch dates below are read straight from the listings.
      </p>
    </FadeIn>

    <Stagger
      className="mt-12 w-full"
      stagger={0.08}
      delayChildren={0.05}
      amount={0.08}
    >
      <ul className="grid w-full grid-cols-1 gap-6 lg:grid-cols-2">
        {SHOPIFY_APPS.map((app) => (
          <li key={app.id} className="h-full">
            <StaggerItem className="h-full">
              <AppCard app={app} />
            </StaggerItem>
          </li>
        ))}
      </ul>
    </Stagger>
  </ScrollStage>
);

/* ── section 3: what they have in common ──────────────────────────────────── */

interface CommonPoint {
  id: string;
  title: string;
  body: string;
  icon: React.ReactNode;
  /** Guard: the point renders only while the data still supports it. */
  when: boolean;
}

const COMMON_POINTS: CommonPoint[] = [
  {
    id: "free",
    title: "A free plan on every app",
    body: `All ${APP_PORTFOLIO.appCount} apps have a free plan. You can install one, set it up and see it working on your storefront before you decide whether to pay for anything.`,
    icon: <PaymentsOutlined />,
    when: EVERY_APP_HAS_FREE_PLAN,
  },
  {
    id: "rating",
    title: `Every listing sits at ${APP_PORTFOLIO.rating.toFixed(1)}`,
    body: `${APP_PORTFOLIO.totalReviews} merchant reviews across the ${APP_PORTFOLIO.appCount} listings, and not one of them has pulled an app below ${APP_PORTFOLIO.rating.toFixed(1)}.`,
    icon: <StarRounded />,
    when: APP_PORTFOLIO.allFiveStar,
  },
  {
    id: "badge",
    title: `${APP_PORTFOLIO.builtForShopifyCount} of ${APP_PORTFOLIO.appCount} are Built for Shopify`,
    body: `Shopify grants the badge to apps that, in its words, "${BUILT_FOR_SHOPIFY_BLURB.replace(/\.$/, "")}". ${APP_PORTFOLIO.builtForShopifyCount} of ours carry it, and it appears on those cards above and nowhere else.`,
    icon: <VerifiedRounded />,
    when: APP_PORTFOLIO.builtForShopifyCount > 0,
  },
  {
    id: "surfaces",
    title: "They plug into the same places",
    body: `Every app here works with ${formatList(SHARED_SURFACES)}, so each one installs into the store you already run instead of asking you to change how it works.`,
    icon: <ExtensionOutlined />,
    when: SHARED_SURFACES.length > 0,
  },
  {
    id: "team",
    title: "One team builds and maintains all of them",
    body: "The same developers who ship the apps also handle the roadmap, the Shopify API updates and the bug fixes. Nothing here is white-labelled or resold.",
    icon: <GroupsOutlined />,
    when: true,
  },
  {
    id: "support",
    title: "Support from the people who wrote the code",
    body: "The reviews below say it better than we can: merchants get answers from named people on our team, quickly, and those people stay with the problem until it is actually sorted.",
    icon: <SupportAgentOutlined />,
    when: true,
  },
].filter((point) => point.when);

const InCommon = () => (
  <section
    aria-labelledby="apps-common-heading"
    className="relative w-full px-4 py-[70px] md:px-[50px] lg:px-[100px]"
  >
    {/* Tint on its own feathered layer — `band-soft` on the <section> would fade
        the heading and the first/last card out along with the band. */}
    <SoftBand className="bg-shopify-100/50" />

    <div className="relative z-10 mx-auto w-full max-w-[1200px]">
      <FadeIn className="flex w-full flex-col items-center text-center">
        <SectionRule className="mb-4" />
        <Reveal>
          <p className="text-[20px] text-black-800 md:text-[25px]">
            The through-line
          </p>
        </Reveal>
        <h2
          id="apps-common-heading"
          className="mt-1 max-w-[820px] font-display text-[25px] font-bold leading-tight tracking-tight text-common-black md:text-[35px]"
        >
          <SplitReveal text="What they all have in common" />
        </h2>
      </FadeIn>

      <Stagger
        className="mt-10 w-full"
        stagger={0.07}
        delayChildren={0.05}
        amount={0.1}
      >
        <ul className="grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {COMMON_POINTS.map((point) => (
            <li key={point.id} className="h-full">
              <StaggerItem className="h-full">
                <SpotlightCard
                  color="green"
                  className="h-full rounded-2xl border border-black-200 bg-common-white shadow-md transition-shadow duration-300 hover:shadow-xl"
                  contentClassName="flex h-full flex-col p-6"
                >
                  <span
                    aria-hidden="true"
                    className="flex h-[46px] w-[46px] items-center justify-center rounded-full border border-shopify-200 bg-shopify-100 text-shopify-700"
                  >
                    {point.icon}
                  </span>
                  <h3 className="mt-4 text-[16px] font-semibold text-common-black md:text-[18px]">
                    {point.title}
                  </h3>
                  <p className="mt-2 text-[14px] leading-relaxed text-black-700 md:text-[15px]">
                    {point.body}
                  </p>
                </SpotlightCard>
              </StaggerItem>
            </li>
          ))}
        </ul>
      </Stagger>
    </div>
  </section>
);

/* ── section 4: merchant reviews ──────────────────────────────────────────── */

interface PortfolioReview {
  /** Listing name or short name — matched back to the app for the chip link. */
  app: string;
  store: string;
  country: string;
  date: string;
  text: string;
}

/**
 * PIMW's reviews live in `./pimw.ts` and carry no app label, so they are
 * stamped with PIMW's own short name on the way in. Three of the eight are
 * shown here; the full set is on /shopify-app.
 *
 * Pixel Estimated Delivery Timer is absent on purpose: its App Store reviews
 * were only available as summaries, and a paraphrase is not a quote.
 */
const PORTFOLIO_REVIEWS: PortfolioReview[] = [
  ...PIMW_REVIEWS.slice(0, 3).map((review) => ({
    app: PIMW.shortName,
    store: review.store,
    country: review.country,
    date: review.date,
    text: review.text,
  })),
  ...APP_REVIEWS,
];

/** Chip label -> listing, so each quote links to the reviews it came from. */
const appForLabel = (label: string): ShopifyApp | undefined =>
  SHOPIFY_APPS.find((app) => app.name === label || app.shortName === label);

const Reviews = () => {
  const reduce = useReducedMotion();

  return (
    <section
      id="reviews"
      aria-labelledby="apps-reviews-heading"
      className="w-full px-4 py-[60px] md:px-[50px] lg:px-[100px]"
    >
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0 max-w-[660px]">
            <SectionRule className="mb-4" />
            <Reveal>
              <p className="text-[20px] text-black-800 md:text-[25px]">
                Merchant reviews
              </p>
            </Reveal>
            <h2
              id="apps-reviews-heading"
              className="mt-1 font-display text-[25px] font-bold leading-tight tracking-tight text-common-black md:text-[35px]"
            >
              <SplitReveal text="In the merchants' own words" />
            </h2>
            <FadeIn y={16} delay={0.08}>
              <p className="mt-6 text-[15px] leading-relaxed text-black-700 md:text-[18px]">
                Every quote below is reproduced in full from the Shopify App
                Store, with the store name, country and date exactly as
                published, and labelled with the app it was left on.
              </p>
            </FadeIn>
          </div>

          <ScaleIn className="shrink-0">
            <div className="flex items-center gap-4 rounded-2xl border border-black-200 bg-black-100 px-6 py-5 shadow-md">
              <p className="font-display text-[40px] font-bold leading-none text-primary-main">
                {APP_PORTFOLIO.rating.toFixed(1)}
              </p>
              <div className="min-w-0">
                <Stars />
                <p className="mt-1 text-[13px] text-black-700">
                  {APP_PORTFOLIO.totalReviews} reviews across{" "}
                  {APP_PORTFOLIO.appCount} apps
                </p>
              </div>
            </div>
          </ScaleIn>
        </div>

        <ul className="mt-10 gap-6 sm:columns-2 lg:columns-3">
          {PORTFOLIO_REVIEWS.map((review, index) => {
            const source = appForLabel(review.app);

            return (
              <li
                key={`${review.app}-${review.store}-${review.date}`}
                className="mb-6 break-inside-avoid"
              >
                <FadeIn
                  delay={reduce ? 0 : (index % 3) * 0.08}
                  amount={0.05}
                >
                  <SpotlightCard
                    className="rounded-2xl border border-black-200 bg-common-white shadow-md transition-shadow duration-300 hover:shadow-xl"
                    contentClassName="flex flex-col p-6"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      {source ? (
                        <a
                          href={source.reviewsUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`Read the ${source.name} reviews on the Shopify App Store, opens in a new tab`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-shopify-200 bg-shopify-100 px-3 py-1 text-[12px] font-semibold text-shopify-700 transition-colors duration-200 hover:bg-shopify-200"
                        >
                          {source.shortName}
                          <OpenInNewRounded
                            aria-hidden="true"
                            style={{ fontSize: 13 }}
                          />
                        </a>
                      ) : (
                        <span className="inline-flex items-center rounded-full border border-shopify-200 bg-shopify-100 px-3 py-1 text-[12px] font-semibold text-shopify-700">
                          {review.app}
                        </span>
                      )}
                      <Stars />
                    </div>

                    <blockquote className="mt-4 text-[14px] leading-relaxed text-black-800 md:text-[15px]">
                      &ldquo;{review.text}&rdquo;
                    </blockquote>

                    <footer className="mt-5 flex items-start justify-between gap-3 border-t border-black-200 pt-4">
                      <div className="min-w-0">
                        <p className="truncate text-[14px] font-semibold text-primary-main">
                          {review.store}
                        </p>
                        <p className="text-[13px] text-black-600">
                          {review.country}
                        </p>
                      </div>
                      <p className="shrink-0 text-[13px] text-black-600">
                        {review.date}
                      </p>
                    </footer>
                  </SpotlightCard>
                </FadeIn>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

/* ── section 5: final CTA ─────────────────────────────────────────────────── */

/* py >= the 9rem DarkBand feather, so the badge and the closing links sit on
   the band's solid core rather than in the fade. */
const FinalCta = () => (
  <section
    aria-labelledby="apps-cta-heading"
    className="relative w-full overflow-hidden px-4 py-[150px] md:px-[50px] lg:px-[100px]"
  >
    <DarkBand />

    <div className="relative z-10 mx-auto flex w-full max-w-[1000px] flex-col items-center text-center">
      <ScaleIn>
        <span className="inline-flex items-center gap-2 rounded-full border border-static-white/25 bg-static-white/10 px-3 py-1.5 text-[13px] font-medium text-static-white">
          <Image
            src={ShopifyLogo}
            alt=""
            aria-hidden="true"
            className="h-[16px] w-[16px]"
          />
          {EVERY_APP_HAS_FREE_PLAN
            ? "Every app has a free plan"
            : `${APP_PORTFOLIO.appCount} apps on the Shopify App Store`}
        </span>
      </ScaleIn>

      <h2
        id="apps-cta-heading"
        className="mt-6 font-display text-[25px] font-bold leading-tight tracking-tight text-static-white md:text-[35px]"
      >
        <SplitReveal text="Install one, or have us build yours" />
      </h2>

      <FadeIn y={16} delay={0.08}>
        <p className="mt-5 max-w-[680px] text-[15px] leading-relaxed text-static-white/75 md:text-[18px]">
          Open any listing below and try it on your store. If what you need
          isn&rsquo;t on the shelf, the same team takes on custom and public
          Shopify app builds &mdash; from first scaffold to App Store
          submission.
        </p>
      </FadeIn>

      <FadeIn y={16} delay={0.14} className="w-full">
        <ul className="mt-8 flex w-full flex-wrap items-center justify-center gap-3">
          {SHOPIFY_APPS.map((app) => (
            <li key={app.id}>
              <a
                href={app.appStoreUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`View ${app.name} on the Shopify App Store, opens in a new tab`}
                className="inline-flex items-center gap-2 rounded-full border border-static-white/30 bg-static-white/10 px-4 py-2 text-[13px] font-medium text-static-white transition-colors duration-200 hover:bg-static-white/20 md:text-[14px]"
              >
                {app.shortName}
                <OpenInNewRounded aria-hidden="true" style={{ fontSize: 15 }} />
              </a>
            </li>
          ))}
        </ul>
      </FadeIn>

      <FadeIn y={16} delay={0.2} className="w-full">
        <div className="mt-8 flex w-full flex-col items-center justify-center gap-3 sm:flex-row">
          <HoverLift className="w-full sm:w-auto">
            <Link
              href="/services/shopify-app-development"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary-main px-6 py-3 text-[15px] font-medium text-static-white shadow-md transition-colors duration-200 hover:bg-pink-700 sm:w-auto md:text-[16px]"
            >
              <span>Shopify app development</span>
              <ArrowForwardRounded aria-hidden="true" fontSize="small" />
            </Link>
          </HoverLift>
          <HoverLift className="w-full sm:w-auto">
            <a
              href="#contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border-2 border-static-white/40 bg-transparent-main px-6 py-3 text-[15px] font-medium text-static-white transition-colors duration-200 hover:bg-static-white/10 sm:w-auto md:text-[16px]"
            >
              <span>Talk to the team</span>
            </a>
          </HoverLift>
        </div>
      </FadeIn>
    </div>
  </section>
);

/* ── page ─────────────────────────────────────────────────────────────────── */

/**
 * The whole /shopify-apps page body. `Wrapper` (src/wrapper/wrapper.tsx)
 * already renders the topbar, the #contact form and the footer around it, so
 * nothing here repeats them; the hero just carries the fixed-topbar clearance.
 */
const ShopifyApps = () => (
  <main className="w-full">
    <Hero />
    <AppsGrid />
    <InCommon />
    <Reviews />
    <FinalCta />
  </main>
);

export default ShopifyApps;
