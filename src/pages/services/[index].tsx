import Digitalproductdesign from "@/components/services/Digitalproductdesign";
import EngineeringDevOps from "@/components/services/EngineeringDevOps";
import MobileDevelopment from "@/components/services/mobileDevelopment";
import ShopifyDevelopment from "@/components/services/ShopifyDevelopment";
import SoftwareAct from "@/components/services/SoftwareAct";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";

/**
 * slug -> service component. The slugs here must stay byte-identical to the
 * `path` values in the topbar's `services` array, otherwise the menu item
 * lands on the not-found panel below.
 */
const servicePages: Record<string, React.ComponentType> = {
  "shopify-app-development": ShopifyDevelopment,
  "digital-product-design": Digitalproductdesign,
  "software-architecture": SoftwareAct,
  "engineering-devops": EngineeringDevOps,
  "mobile-app-development": MobileDevelopment,
};

const ServicePage = () => {
  const router = useRouter();

  // On a dynamic route the query is empty on the first client render. Hold a
  // quiet placeholder of the same height instead of flashing an empty page.
  if (!router.isReady) {
    return <div className="mt-[80px] min-h-[60vh] w-full" aria-busy="true" />;
  }

  const slug =
    typeof router.query.index === "string" ? router.query.index : undefined;
  const Service = slug ? servicePages[slug] : undefined;

  if (!Service) {
    return (
      <div className="mt-[80px] w-full px-4 py-[50px] md:px-[50px] lg:px-[100px]">
        <div className="mx-auto flex w-full max-w-[720px] flex-col items-center text-center">
          <div
            aria-hidden="true"
            className="mb-5 w-[100px] border-2 border-pink-500"
          />
          <p className="text-[20px] text-black-800 md:text-[25px]">
            Service not found
          </p>
          <h1 className="mt-1 font-display text-[25px] font-bold tracking-tight text-common-black md:text-[35px]">
            We could not find that service
          </h1>
          <p className="mt-6 text-[15px] text-black-700 md:text-[18px]">
            The link may be out of date. Browse what we do, or get in touch and
            we will point you at the right team.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/services/shopify-app-development"
              className="rounded-lg bg-primary-main px-6 py-3 text-[16px] font-medium text-static-white transition-opacity duration-200 hover:opacity-90"
            >
              Shopify app development
            </Link>
            <Link
              href="/"
              className="rounded-lg border-2 border-primary-main bg-common-white px-6 py-3 text-[16px] font-medium text-primary-main transition-colors duration-200 hover:bg-pink-100"
            >
              Back to home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <Service />;
};

export default ServicePage;
