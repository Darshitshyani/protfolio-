/**
 * /shopify-apps — the Shopify app portfolio page.
 *
 * Thin page shell: <Head> metadata plus the ItemList JSON-LD, then
 * <ShopifyApps />. `Wrapper` (src/wrapper/wrapper.tsx) already supplies the
 * topbar, the #contact form and the footer for every route, so none of that
 * is here.
 *
 * NOTE ON <title>: the site-wide default `<title>Pixelspiece</title>` lives in
 * _app.tsx, rendered ABOVE <Component />. next/head keeps the LAST title it
 * collects, so the page title below overrides it. Keep any global title above
 * the page component, never below it.
 *
 * ── DATA DOCTRINE ──────────────────────────────────────────────────────────
 * Every number and name below is read from `@/untils/data/shopifyApps` (the
 * verified listing data) or its `APP_PORTFOLIO` roll-ups. A literal "4", "18"
 * or "5.0" in this file would be a defect: publishing a fifth app must change
 * the copy without an edit here.
 *
 * ── WHY THERE IS NO aggregateRating ────────────────────────────────────────
 * The ratings are real, but self-serving review markup — a site marking up
 * ratings for its OWN products, on its own domain, with no independent review
 * source — is exactly what Google's structured-data policy penalises, and it
 * risks a manual action against the whole domain. The ratings live on the
 * Shopify App Store listings, which are linked from every app card and from
 * each `url` below, so a crawler can reach the authoritative source. Do not
 * add `aggregateRating`, `review` or `ratingValue` to this payload.
 */

import Head from "next/head";
import React from "react";

import ShopifyApps from "@/components/shopify/ShopifyApps";
import { APP_PORTFOLIO, SHOPIFY_APPS } from "@/untils/data/shopifyApps";
import { PIMW } from "@/untils/data/pimw";

/**
 * Absolute URL for canonical / OpenGraph. Same derivation as /shopify-app —
 * change the one constant per page if the site ships on a different domain.
 */
const PAGE_URL = "https://www.pixelspiece.com/shopify-apps";

const PAGE_TITLE = `Our Shopify Apps | ${APP_PORTFOLIO.appCount} Apps by Pixels Piece on the Shopify App Store`;

const PAGE_DESCRIPTION = `Pixels Piece publishes ${APP_PORTFOLIO.appCount} apps on the Shopify App Store: product personalization, size guides, estimated delivery dates and scheduled sales. ${APP_PORTFOLIO.builtForShopifyCount} of ${APP_PORTFOLIO.appCount} are Built for Shopify, with ${APP_PORTFOLIO.totalReviews} merchant reviews across the listings.`;

/**
 * Structured data — an ItemList of the apps we publish. Every field is read
 * from the verified listing data; nothing here is invented, and per the note
 * at the top of this file there is deliberately NO rating markup.
 *
 * `isAccessibleForFree` mirrors `app.freeplan` (each listing does have a free
 * plan). No `offers` node: the paid tiers are expressed as human-readable
 * ranges in the data ("Free – $24.99/mo"), and turning those into a machine
 * price would mean inventing a currency, a billing period and a tier name.
 */
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: `Shopify apps by ${PIMW.developer}`,
  description: PAGE_DESCRIPTION,
  url: PAGE_URL,
  numberOfItems: APP_PORTFOLIO.appCount,
  itemListOrder: "https://schema.org/ItemListUnordered",
  itemListElement: SHOPIFY_APPS.map((app, index) => ({
    "@type": "ListItem",
    position: index + 1,
    item: {
      "@type": "SoftwareApplication",
      name: app.name,
      alternateName: app.shortName,
      description: app.tagline,
      applicationCategory: "BusinessApplication",
      operatingSystem: "Shopify",
      url: app.appStoreUrl,
      sameAs: app.appStoreUrl,
      isAccessibleForFree: app.freeplan,
      author: {
        "@type": "Organization",
        name: PIMW.developer,
        url: PIMW.developerSite,
      },
    },
  })),
};

const ShopifyAppsPage = () => (
  <>
    <Head>
      <title>{PAGE_TITLE}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={PAGE_DESCRIPTION} />
      <link rel="canonical" href={PAGE_URL} />

      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Pixels Piece" />
      <meta property="og:title" content={PAGE_TITLE} />
      <meta property="og:description" content={PAGE_DESCRIPTION} />
      <meta property="og:url" content={PAGE_URL} />
      <meta property="og:locale" content="en_US" />

      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={PAGE_TITLE} />
      <meta name="twitter:description" content={PAGE_DESCRIPTION} />
    </Head>

    {/*
      JSON-LD lives in the body rather than <Head>: next/head logs a warning for
      any <script> passed to it, and crawlers read structured data from either
      position. The payload is a static object, so the serialization is safe.
    */}
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
    />

    <ShopifyApps />
  </>
);

export default ShopifyAppsPage;
