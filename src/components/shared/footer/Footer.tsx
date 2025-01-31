import React from "react";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import XIcon from "@mui/icons-material/X";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useRouter } from "next/router";
const Footer = () => {
  const router = useRouter();
  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-5 p-6 bg-black-100 h-full py-5 border-t border-black-200">
      <div>
        <p className="font-semibold">
          We are creative Peoples, passionate for designing well crafted,simple
          and functional web and mobile apps.
        </p>
      </div>
      <div>
        <p className="font-semibold">Social</p>
        <div className="flex gap-2 mt-2">
          <div className="mr-1 border p-2 rounded-full border-black-200 shadow-xl bg-common-white">
            <InstagramIcon />
          </div>

          <div className="mr-1 border p-2 rounded-full border-black-200 shadow-xl bg-common-white">
            <LinkedInIcon />
          </div>
        </div>
      </div>
      <div className="flex gap-2 flex-col">
        <p className="font-semibold">Links</p>
        <div className="flex flex-col gap-1">
          <p
            className="hover:text-pink-600 cursor-pointer font-semibold text-black-700"
            onClick={() => router.push("/#who")}
          >
            About Us
          </p>

          <p
            className="hover:text-pink-600 cursor-pointer font-semibold text-black-700"
            onClick={() => router.push("/#casestudy")}
          >
            Case Studies
          </p>
          <p
            className="hover:text-pink-600 cursor-pointer font-semibold text-black-700"
            onClick={() => router.push("/protfolio")}
          >
            {" "}
            Portfolio
          </p>
          <p className="hover:text-pink-600 cursor-pointer font-semibold text-black-700">
            Who we are
          </p>
        </div>
      </div>
      <div>
        <p className="font-semibold">Support</p>
        <div className="flex flex-col gap-6 mt-5">
          <p
            onClick={() =>
              (window.location.href = "mailto: pixelspieceinfo@gmail.com")
            }
            className="cursor-pointer flex items-center gap-2"
          >
            <span className=" border p-2 rounded-full border-black-200 shadow-xl bg-common-white">
              <ForwardToInboxIcon />
            </span>
            pixelspieceinfo@gmail.com
          </p>
          <p>
            <a
              href="tel:+91 9377098863"
              className="flex items-center space-x-2"
            >
              <span className="mr-1 border p-2 rounded-full border-black-200 shadow-xl bg-common-white">
                <LocalPhoneIcon />
              </span>
              +91 9377098863
            </a>
          </p>
        </div>
      </div>
      <p className="text-black-600">
        © 2025 PixelsPiece Solutions. All rights reserved.
      </p>
    </div>
  );
};

export default Footer;
