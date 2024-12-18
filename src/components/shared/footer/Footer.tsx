import React from "react";
import ForwardToInboxIcon from "@mui/icons-material/ForwardToInbox";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import InstagramIcon from '@mui/icons-material/Instagram';
import FacebookIcon from '@mui/icons-material/Facebook';
import XIcon from '@mui/icons-material/X';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
const Footer = () => {
  return (
    <div className="flex justify-between px-[100px] bg-black-100 h-full py-5 border-t border-black-200">
      <div className="flex flex-col  gap-2 w-[25%] justify-between">
        <p className="font-semibold">
          We are creative Peoples, passionate for designing well crafted,simple
          and functional web and mobile apps.
        </p>
       
        <p className="text-black-600">© 2024 Darshit Solutions. All rights reserved.</p>
      </div>
      <div>
        <p className="font-semibold">Social</p>
        <div className="flex  gap-2 mt-2">
          <div className="mr-1 border p-2 rounded-full border-black-200 shadow-xl bg-common-white">
            <InstagramIcon />
          </div>

          <div className="mr-1 border p-2 rounded-full border-black-200 shadow-xl bg-common-white">
            <FacebookIcon />
          </div>
          <div className="mr-1 border p-2 rounded-full border-black-200 shadow-xl bg-common-white">
            <XIcon />
          </div>
          <div className="mr-1 border p-2 rounded-full border-black-200 shadow-xl bg-common-white">
            <LinkedInIcon />
          </div>
        </div>
      </div>
      <div className="flex gap-2 flex-col">
        <p className="font-semibold">Links</p>
        <div className="flex flex-col gap-1">
          <p>About Us</p>
          <p>Services</p>
          <p>Case Studies</p>
          <p>Careers</p>
          <p>Areas We Serve</p>
        </div>
      </div>
      <div>
        <p className="font-semibold">Support</p>
        <div className="flex flex-col gap-6 mt-5">
          <p>
            <span className="mr-1 border p-2 rounded-full border-black-200 shadow-xl bg-common-white">
              <ForwardToInboxIcon />
            </span>{" "}
            darshitshyani1@gmail.com
          </p>
          <p>
            <span className="mr-1 border p-2 rounded-full border-black-200 shadow-xl bg-common-white">
              <LocalPhoneIcon />
            </span>{" "}
            9377098863
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
