import React, { use } from "react";
import CustomButton from "../CustomButton";
import { Logo } from "@/untils/images";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import CustomPopover from "../CustomPopover";
import { ArrowDropDown, ArrowDropUp, ArrowRight } from "@mui/icons-material";

import { useRouter } from "next/router";
const services = [
  {
    title: "Digital Product Design",
    path: "/services/digital-product-design",
  },
  {
    title: "Software Architecture",
    path: "/services/software-architecture",
  },
  {
    title: "Engineering & DevOps",
    path: "/services/engineering-devops",
  },
  {
    title: "Mobile App Development",
    path: "/services/mobile-app-development",
  },
];

const Topbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isOpenList, setIsOpenList] = React.useState(false);
  const [openDrop, setOpenDrop] = React.useState(false);

  const router = useRouter();

  return (
    <>
      <div className=" h-[70px] left-[5%] right-[5%]  border rounded-2xl  border-black-200 flex justify-between items-center px-3 bg-inherit fixed  top-[2%] z-50 bg-common-white">
        <div>
          <h1
            className="text-[22px] text-primary-main font-bold flex mb-0 items-center cursor-pointer"
            onClick={() => router.push("/")}
          >
            <span>
              {" "}
              <Image src={Logo} alt="not found" />
            </span>
            ixels Piece
          </h1>
        </div>
        <div className="hidden gap-8 font-semibold text-[18px] text-black-600 md:hidden lg:flex  xl:flex relative z-50">
          <p
            className="cursor-pointer hover:text-primary-main"
            onClick={() => router.push("/#who")}
          >
            Who we are
          </p>
          <div
            className={`flex items-center justify-center gap-1 hover:text-primary-main ${
              openDrop && "text-primary-main"
            }`}
          >
            <CustomPopover
              isOpen={openDrop}
              handleClose={(event) => setOpenDrop(event)}
              buttonTitleLabel="Services"
              children={
                <div className="flex flex-col  absolute rounded-xl gap-2 p-5 left-[10%]   bg-pink-200 text-common-black mt-[40px]">
                  {services.map((item, index) => (
                    <div
                    key={index}
                      className="flex flex-col "
                      onClick={() => setOpenDrop(false)}
                    >
                      <h1
                        key={index}
                        className="font-semibold text-black-700 cursor-pointer hover:text-primary-main"
                        onClick={() => {
                          router.push(item.path);
                        }}
                      >
                        <span>
                          <ArrowRight className="text-pink-500" />
                        </span>{" "}
                        {item.title}
                      </h1>
                    </div>
                  ))}
                </div>
              }
            />
            {openDrop ? <ArrowDropUp /> : <ArrowDropDown />}
          </div>
          <p
            className="cursor-pointer hover:text-primary-main"
            onClick={() => {
              router.push("/protfolio");
            }}
          >
            Protfolio
          </p>
          <p
            className="cursor-pointer hover:text-primary-main"
            onClick={() => router.push("/#casestudy")}
          >
            Case Studies
          </p>
        </div>
        <div>
          <CustomButton
            className="w-[160px] rounded-lg hidden md:hidden lg:flex  xl:flex"
            name="Contact us"
            onClick={() => router.push("#contact")}
          />
        </div>
        <div
          className="flex sm:flex  md:flex lg:hidden   xl:hidden"
          onClick={() => setIsOpen(!isOpen)}
        >
          <MenuIcon />
        </div>
      </div>
      {isOpen && (
        <div className="fixed w-[90%]  h-full bg-common-white flex px-3 flex-col z-50 animate-slide-in  ">
          <div className="h-[60px] border-b border-black-200 w-full flex justify-between items-center">
            <h1 className="text-[22px] text-primary-main font-semibold">
              Pixels Piece
            </h1>
            <div
              className="cursor-pointer mr-2 "
              onClick={() => setIsOpen(!isOpen)}
            >
              <CloseIcon />
            </div>
          </div>
          <div className="flex flex-col gap-2 font-semibold text-[18px] text-black-600 overflow-auto">
            <div className="flex flex-col  mt-2">
              <p className="w-full border-b border-black-200 flex justify-between items-center pb-2">
                Technologies{" "}
                <span
                  className="cursor-pointer"
                  onClick={() => setIsOpenList(!isOpenList)}
                >
                  <AddIcon />
                </span>
              </p>
              {isOpenList && (
                <div className="text-black-800 animate-slide-in cursor-pointer border-b border-black-200 font-normal text-[16px] pb-2 ">
                  <p>React Js Development</p>
                  <p>Next Js Development</p>
                  <p>Vue Js Development</p>
                  <p>Angular Js Development</p>
                  <p>Node Js Development</p>
                  <h1 className=" my-2 border-b border-t py-2 text-black-800 font-medium text-[18px]">
                    Mobile Development Technology
                  </h1>
                  <p>Flutter Development</p>
                  <p>React Native Development</p>
                  <h1 className="text-[18px] my-2 border-b border-t py-2 text-black-800 font-medium">
                    Dev Ops
                  </h1>
                  <p>Docker</p>
                  <p>Kubernetes</p>
                  <p>Amazon Web Services</p>
                  <p>Google Cloud</p>
                </div>
              )}
            </div>
            <p
              className="border-b border-black-200 pb-2 "
              onClick={() => {
                router.push("/protfolio");
                setIsOpen(!isOpen);
              }}
            >
              Protfolio
            </p>
            <p
              className="border-b border-black-200 pb-2"
              onClick={() => {
                router.push("/#casestudy");
                setIsOpen(!isOpen);
              }}
            >
              Case Studies
            </p>
            <p className="border-b border-black-200 pb-2" onClick={() => { router.push("/#who"); setIsOpen(!isOpen); }}>Who we are</p>
            <div>
              <CustomButton
                className="w-[160px] rounded-lg mt-2 mb-2"
                name="Contact us"
                onClick={() => {
                  router.push("#contact");
                  setIsOpen(!isOpen);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Topbar;
