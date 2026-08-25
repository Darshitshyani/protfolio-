/**
 * The "Built for Shopify" badge — ONE drawing of it for the whole site.
 *
 * The badge is Shopify's, not ours: it means the listing cleared Shopify's own
 * bar, and it has to read as the same credential on every surface that shows
 * it. It used to be re-typed inline on five surfaces and had already drifted
 * (a solid green marketing chip on the home page, tinted pills of three
 * slightly different sizes elsewhere). It lives here now so it cannot diverge
 * again — import it, never re-type the pill.
 *
 * IMPORTANT: there is deliberately NO `builtForShopify` prop. The badge is not
 * something a call site can switch on; the call site renders it only inside
 * `{app.builtForShopify ? <BuiltForShopifyBadge /> : null}`, reading the flag
 * from `@/untils/data/shopifyApps`. Three of our four apps carry it — PIMW does
 * not — so a badge that could be turned on by a prop is a badge that will
 * eventually be turned on for an app that has not earned it.
 *
 * It renders a `<span>` (never a block element) so it is legal inside the
 * anchor- and paragraph-wrapped cards that use it.
 */
import * as React from "react";

import VerifiedRounded from "@mui/icons-material/VerifiedRounded";

import { cx } from "@/components/shared/motion";
import { BUILT_FOR_SHOPIFY_BLURB } from "@/untils/data/shopifyApps";

export interface BuiltForShopifyBadgeProps {
  /**
   * Spacing / placement only (`mt-4`, alignment). The pill's own look — fill,
   * border, radius, type size, icon — is fixed on purpose and is not
   * overridable; that is the entire point of this component.
   */
  className?: string;
}

export const BuiltForShopifyBadge = ({
  className,
}: BuiltForShopifyBadgeProps) => (
  <span
    // Shopify's own wording for the badge, as the hover tooltip. The same
    // wording is repeated as screen-reader text because `title` on a
    // non-interactive element is not reliably announced.
    title={BUILT_FOR_SHOPIFY_BLURB}
    className={cx(
      "inline-flex w-fit items-center gap-1.5 rounded-full border border-shopify-200 bg-shopify-100 px-2.5 py-1 text-[12px] font-medium text-shopify-700",
      className,
    )}
  >
    <VerifiedRounded aria-hidden="true" style={{ fontSize: 14 }} />
    Built for Shopify
    <span className="sr-only"> — {BUILT_FOR_SHOPIFY_BLURB}</span>
  </span>
);

export default BuiltForShopifyBadge;
