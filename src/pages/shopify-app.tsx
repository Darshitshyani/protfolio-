/**
 * /shopify-app — the PIMW product page.
 *
 * Thin page shell: <Head> metadata plus the SoftwareApplication JSON-LD, then
 * <PimwApp />. `Wrapper` (src/wrapper/wrapper.tsx) already supplies the topbar,
 * the #contact form and the footer for every route, so none of that is here.
 *
 * NOTE ON <title>: the site-wide default `<title>Pixelspiece</title>` lives in
 * _app.tsx, rendered ABOVE <Component />. next/head keeps the LAST title it
 * collects, so the page title below overrides it. Keep any global title above
 * the page component, never below it.
 *
 * Every string below is drawn from the verified brief via `@/untils/data/pimw`.
 * The rating (5.0) and review count (8) are the only social-proof numbers that
 * exist — do not add install counts, badges or lift percentages here.
 */

import Head from "next/head";
import React from "react";

import PimwApp from "@/components/shopify/PimwApp";
import { PIMW, PIMW_PLANS } from "@/untils/data/pimw";

/**
 * Absolute URL for canonical / OpenGraph. Derived from the developer site on
 * the App Store listing — change this one constant if the site ships on a
 * different domain.
 */
const PAGE_URL = "https://www.pixelspiece.com/shopify-app";

const PAGE_TITLE = `${PIMW.longName} | Shopify Product Personalizer`;

const PAGE_DESCRIPTION =
  "PIMW by Pixels Piece lets Shopify shoppers personalize products live: engraving, monogram text, photo upload, swatches, conditional logic and dynamic pricing per option. Rated 5.0 from 8 reviews.";

/** Structured data — every value is verified; nothing here is invented. */
const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: PIMW.longName,
  alternateName: PIMW.name,
  applicationCategory: "BusinessApplication",
  operatingSystem: "Shopify",
  url: PIMW.appStoreUrl,
  sameAs: [PIMW.siteUrl, PIMW.appStoreUrl],
  description: PAGE_DESCRIPTION,
  author: {
    "@type": "Organization",
    name: PIMW.developer,
    url: PIMW.developerSite,
  },
  offers: PIMW_PLANS.map((plan) => ({
    "@type": "Offer",
    name: plan.name,
    price: plan.monthlyValue.toFixed(2),
    priceCurrency: "USD",
    url: PIMW.appStoreUrl,
    // These are recurring subscription prices billed every 30 days. Without an explicit
    // UnitPriceSpecification a crawler reads `price` as a one-time charge.
    priceSpecification: {
      "@type": "UnitPriceSpecification",
      price: plan.monthlyValue.toFixed(2),
      priceCurrency: "USD",
      billingDuration: 30,
      billingIncrement: 1,
      unitCode: "DAY",
    },
  })),
};

const ShopifyAppPage = () => (
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

    <PimwApp />
  </>
);

export default ShopifyAppPage;
