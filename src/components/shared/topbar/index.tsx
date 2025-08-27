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
  const [isService, setIsService] = React.useState(false);

  const router = useRouter();

  return (
    <>
      <div className=" h-[70px] left-[5%] right-[5%]  border rounded-2xl  border-black-200 flex justify-between items-center px-3 bg-inherit fixed  top-[2%] z-50 bg-common-white animate-slide-bottom">
        <div>
          <h1
            className="text-[22px] text-primary-main font-bold flex mb-0 items-center cursor-pointer"
            onClick={() => router.push("/")}
          >
            <span>
              {/* Replace the logo image here */}
              <Image src={Logo} alt="Pixels Piece Logo" width={40} height={40} />
            </span>
            {/* Update the text here */}
            Pixels Piece
          </h1>
        </div>
        <div className="hidden gap-8 font-semibold text-[18px] text-black-600 md:hidden lg:flex  xl:flex relative z-50">
          <p
            className="cursor-pointer hover:text-primary-main"
            onClick={() => {
              const el = document.getElementById("who");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              } else {
                router.push("/#who");
              }
            }}
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
            onClick={() => router.push("/protfolio")}
          >
            Portfolio
          </p>
          <p
            className="cursor-pointer hover:text-primary-main"
            onClick={() => {
              const el = document.getElementById("casestudy");
              if (el) {
                el.scrollIntoView({ behavior: "smooth" });
              } else {
                router.push("/#casestudy");
              }
            }}
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
        <>
          {/* Fade background */}
          <div
            className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 animate-fade-in"
            onClick={() => {
              setIsOpen(false);
              setIsOpenList(false);
              setIsService(false);
            }}
          />
          {/* Sidebar */}
          <div className="fixed w-[90%] h-full bg-common-white flex px-3 flex-col z-50 animate-slide-in transition-opacity duration-300 opacity-100">
            <div className="h-[60px] border-b border-black-200 w-full flex justify-between items-center">
              <h1 className="text-[22px] text-primary-main font-semibold">
                Pixels Piece
              </h1>
              <div
                className="cursor-pointer mr-2 "
                onClick={() => {
                  setIsOpen(!isOpen);

                  setIsOpenList(false);
                  setIsService(false);
                }}
              >
                <CloseIcon />
              </div>
            </div>
            <div className="flex flex-col gap-2 font-semibold text-[18px] text-black-600 overflow-auto">
              <div className="flex flex-col  mt-2">
                <p
                  className={`w-full border-b border-black-200 flex justify-between items-center pb-2 ${
                    isOpenList && "text-primary-main"
                  } `}
                >
                  Technologies{" "}
                  <span
                    className={`cursor-pointer text-black-700 `}
                    onClick={() => setIsOpenList(!isOpenList)}
                  >
                    <AddIcon />
                  </span>
                </p>
                {isOpenList && (
                  <div
                    className={`text-black-800 flex flex-col gap-2 py-2 animate-slide-in cursor-pointer border-b border-black-200 font-normal text-[16px]`}
                  >
                    <p
                      onClick={() => {
                        router.push("/#hire");
                        setIsOpen(!isOpen);
                      }}
                    >
                      {" "}
                      <span className="text-primary-main font-bold mr-2">➤</span>
                      React Js Development
                    </p>
                    <p>
                      {" "}
                      <span className="text-primary-main font-bold mr-2">➤</span>
                      Next Js Development
                    </p>
                    <p
                      onClick={() => {
                        router.push("/#hire");
                        setIsOpen(!isOpen);
                      }}
                    >
                      {" "}
                      <span className="text-primary-main font-bold mr-2">➤</span>
                      Vue Js Development
                    </p>
                    <p
                      onClick={() => {
                        router.push("/#hire");
                        setIsOpen(!isOpen);
                      }}
                    >
                      {" "}
                      <span className="text-primary-main font-bold mr-2">➤</span>
                      Angular Js Development
                    </p>
                    <p
                      onClick={() => {
                        router.push("/#hire");
                        setIsOpen(!isOpen);
                      }}
                    >
                      {" "}
                      <span className="text-primary-main font-bold mr-2">➤</span>
                      Node Js Development
                    </p>
                    <h1 className=" my-1 text-black-800 font-medium text-[18px]">
                      Mobile Development Technology
                    </h1>
                    <p
                      onClick={() => {
                        router.push("/#hire");
                        setIsOpen(!isOpen);
                      }}
                    >
                      {" "}
                      <span className="text-primary-main font-bold mr-2">➤</span>
                      Flutter Development
                    </p>
                    <p
                      onClick={() => {
                        router.push("/#hire");
                        setIsOpen(!isOpen);
                      }}
                    >
                      {" "}
                      <span className="text-primary-main font-bold mr-2">➤</span>
                      React Native Development
                    </p>
                    <h1 className="text-[18px] my-1   text-black-800 font-medium">
                      Dev Ops
                    </h1>
                    <p
                      onClick={() => {
                        router.push("/#hire");
                        setIsOpen(!isOpen);
                      }}
                    >
                      {" "}
                      <span className="text-primary-main font-bold mr-2">➤</span>
                      Docker
                    </p>
                    <p
                      onClick={() => {
                        router.push("/#hire");
                        setIsOpen(!isOpen);
                      }}
                    >
                      {" "}
                      <span className="text-primary-main font-bold mr-2">➤</span>
                      Kubernetes
                    </p>
                    <p
                      onClick={() => {
                        router.push("/#hire");
                        setIsOpen(!isOpen);
                      }}
                    >
                      {" "}
                      <span className="text-primary-main font-bold mr-2">➤</span>
                      Amazon Web Services
                    </p>
                    <p
                      onClick={() => {
                        router.push("/#hire");
                        setIsOpen(!isOpen);
                      }}
                    >
                      {" "}
                      <span className="text-primary-main font-bold mr-2">➤</span>
                      Google Cloud
                    </p>
                  </div>
                )}
              </div>
              <div className="flex flex-col  mt-2">
                <p
                  className={`w-full border-b border-black-200 flex justify-between items-center pb-2 ${
                    isService && "text-primary-main"
                  }`}
                >
                  Services{" "}
                  <span
                    className="cursor-pointer text-black-700"
                    onClick={() => setIsService(!isService)}
                  >
                    <AddIcon />
                  </span>
                </p>
                {isService && (
                  <div className="text-black-800 flex flex-col gap-2 animate-slide-in cursor-pointer border-b border-black-200 font-normal text-[16px] py-2 ">
                    <p
                      onClick={() => {
                        router.push("/services/digital-product-design");
                        setIsOpen(!isOpen);
                      }}
                    >
                      <span className="text-primary-main font-bold mr-2">➤</span>{" "}
                      Digital Product Design
                    </p>
                    <p
                      onClick={() => {
                        router.push("/services/software-architecture");
                        setIsOpen(!isOpen);
                      }}
                    >
                      <span className="text-primary-main font-bold mr-2">➤</span>{" "}
                      Software Architecture
                    </p>
                    <p
                      onClick={() => {
                        router.push("/services/engineering-devops");
                        setIsOpen(!isOpen);
                      }}
                    >
                      <span className="text-primary-main font-bold mr-2">➤</span>{" "}
                      Engineering & DevOps
                    </p>
                    <p
                      onClick={() => {
                        router.push("/services/mobile-app-development");
                        setIsOpen(!isOpen);
                      }}
                    >
                      <span className="text-primary-main font-bold mr-2">➤</span>{" "}
                      Mobile App Development
                    </p>
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
                Portfolio
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
              <p
                className="border-b border-black-200 pb-2"
                onClick={() => {
                  router.push("/#who");
                  setIsOpen(!isOpen);
                }}
              >
                Who we are
              </p>
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
        </>
      )}
    </>
  );
};

export default Topbar;
