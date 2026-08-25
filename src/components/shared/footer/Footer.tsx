import React from "react";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import Image from "next/image";
import Link from "next/link";
import { Stagger, StaggerItem } from "@/components/shared/motion";
import { GradientBeam } from "@/components/shared/backgrounds";
import { LogoLockupDark, LogoLockupLight, ShopifyLogo } from "@/untils/images";
import { APP_PORTFOLIO, SHOPIFY_APPS } from "@/untils/data/shopifyApps";

const linkClass =
  "hover:text-pink-600 cursor-pointer font-semibold text-black-700 transition-colors duration-200 break-words";

/** Off-site link: real anchor, safe rel, and an audible "new tab" hint. */
const ExternalLink = ({
  href,
  title,
  children,
}: {
  href: string;
  /** Optional hover hint — used to carry an app's full listing name. */
  title?: string;
  children: React.ReactNode;
}) => (
  <a
    href={href}
    title={title}
    target="_blank"
    rel="noopener noreferrer"
    className={linkClass}
  >
    {children}
    <span className="sr-only"> (opens in a new tab)</span>
  </a>
);

const Footer = () => {
  return (
    <footer className="relative w-full border-t border-black-200 bg-black-100/60">
      <GradientBeam
        className="absolute inset-x-0 top-0 opacity-60"
        style={{
          maskImage:
            "linear-gradient(to right, transparent, #000 25%, #000 75%, transparent)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent, #000 25%, #000 75%, transparent)",
        }}
      />
      <div className="mx-auto w-full max-w-[1200px] px-4 py-14 md:px-6">
        <Stagger
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
          stagger={0.06}
        >
          <StaggerItem>
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-black-600">Address</p>
            <address className="mt-2 text-sm text-black-700 font-semibold not-italic">
              Pragati IT park, C-2/716,
              <br />
              Sudama Chowk, Mota Varachha,
              <br />
              Surat, Gujarat 394101
            </address>
          </StaggerItem>

          {/* Every app we publish, straight from SHOPIFY_APPS — the column can
              never drift from the portfolio. `shortName` keeps it to one line
              each; the full listing name rides along as the hover title, and
              /shopify-apps carries the detail (ratings, pricing, badges) that
              will not fit in a footer column. */}
          <StaggerItem>
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-black-600">Our Shopify apps</p>
            <ul className="mt-2 flex flex-col gap-1 min-w-0">
              {SHOPIFY_APPS.map((app) => (
                <li key={app.id}>
                  <ExternalLink href={app.appStoreUrl} title={app.name}>
                    {app.shortName}
                  </ExternalLink>
                </li>
              ))}
              <li>
                <Link href="/shopify-apps" className={linkClass}>
                  All Shopify apps
                </Link>
              </li>
            </ul>
            <p className="mt-2 text-[12px] text-black-600">
              {APP_PORTFOLIO.builtForShopifyCount} of {APP_PORTFOLIO.appCount}{" "}
              are Built for Shopify
            </p>
          </StaggerItem>

          <StaggerItem className="flex gap-2 flex-col">
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-black-600">Links</p>
            <ul className="flex flex-col gap-1">
              <li>
                <Link href="/#who" className={linkClass}>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#casestudy" className={linkClass}>
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/portfolio" className={linkClass}>
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="/#who" className={linkClass}>
                  Who we are
                </Link>
              </li>
            </ul>
          </StaggerItem>

          <StaggerItem>
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-black-600">Support</p>
            <div className="mt-2 flex flex-col gap-3">
              <a
                href="mailto:darshit@pixelspiece.com"
                className="flex min-w-0 items-center gap-2 break-words text-[15px] text-black-700 transition-colors duration-200 hover:text-primary-main"
              >
                <span className="shrink-0 rounded-full border border-black-200 bg-common-white p-2 text-primary-main">
                  <ForwardToInboxIcon />
                </span>
                darshit@pixelspiece.com
              </a>
              <a
                href="tel:+919377098863"
                className="flex items-center gap-2 text-[15px] text-black-700 transition-colors duration-200 hover:text-primary-main"
              >
                <span className="mr-1 shrink-0 rounded-full border border-black-200 bg-common-white p-2 text-primary-main">
                  <LocalPhoneIcon />
                </span>
                +91 9377098863
              </a>
            </div>
          </StaggerItem>

          <StaggerItem>
            <p className="text-[12px] font-semibold uppercase tracking-[0.14em] text-black-600">Social</p>
            <div className="mt-2 flex gap-2.5">
              <a
                href="https://www.instagram.com/pixelspiece/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pixels Piece on Instagram"
                className="inline-flex rounded-full border border-black-200 bg-common-white p-2.5 text-black-700 transition-colors duration-200 hover:border-primary-main hover:text-primary-main"
              >
                <InstagramIcon />
              </a>

              <a
                href="https://www.linkedin.com/company/pixelspiece/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Pixels Piece on LinkedIn"
                className="inline-flex rounded-full border border-black-200 bg-common-white p-2.5 text-black-700 transition-colors duration-200 hover:border-primary-main hover:text-primary-main"
              >
                <LinkedInIcon />
              </a>
            </div>
          </StaggerItem>
        </Stagger>

        <div className="mt-8 flex flex-col gap-3 border-t border-black-200 pt-4 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3">
            {/* Same two-file light/dark swap as the topbar — the wordmark is
                baked into the artwork, so the theme swaps the image. */}
            <Link href="/" className="w-fit" aria-label="Pixels Piece — home">
              <Image
                src={LogoLockupLight}
                alt="Pixelspiece"
                className="hidden h-[28px] w-auto dark:block"
              />
              <Image
                src={LogoLockupDark}
                alt="Pixelspiece"
                className="h-[28px] w-auto dark:hidden"
              />
            </Link>
            <p className="text-black-600 text-[14px]">
              © 2025 Pixelspiece Solutions. All rights reserved.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-shopify-100 px-3 py-1 text-[13px] font-medium text-shopify-700">
              <Image
                src={ShopifyLogo}
                alt=""
                aria-hidden="true"
                width={14}
                height={14}
              />
              Shopify Partner
            </span>
            <span className="text-[13px] text-black-700">
              We build, publish and support apps on the Shopify App Store.
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
