import React, { useState, useEffect } from "react";
import CustomButton from "../CustomButton";
import { Logo } from "@/untils/images";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
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

const technologies = [
	{
		category: "Web Development",
		items: [
			"React Js Development",
			"Next Js Development",
			"Vue Js Development",
			"Angular Js Development",
			"Node Js Development",
		],
	},
	{
		category: "Mobile Development",
		items: ["Flutter Development", "React Native Development"],
	},
	{
		category: "DevOps",
		items: ["Docker", "Kubernetes", "Amazon Web Services", "Google Cloud"],
	},
];

const Topbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isClosing, setIsClosing] = useState(false);
	const [isOpenList, setIsOpenList] = useState(false);
	const [openDrop, setOpenDrop] = useState(false);
	const [isService, setIsService] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const router = useRouter();

	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 10;
			setScrolled(isScrolled);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const handleSidebarClose = () => {
		setIsClosing(true);
		setTimeout(() => {
			setIsOpen(false);
			setIsClosing(false);
			setIsOpenList(false);
			setIsService(false);
		}, 350); // Match your animation duration
	};

	return (
		<>
			<div
				className={`h-[70px] left-[5%] right-[5%] border border-black-200 rounded-2xl flex justify-between items-center px-3 fixed top-[2%] z-50 transition-all duration-300 ${
					scrolled
						? "bg-white/80 backdrop-blur-2xl border-gray-200 shadow-sm"
						: "bg-white/60 backdrop-blur-2xl border-gray-100"
				}`}
			>
				<div>
					<h1
						className="text-[22px] text-primary-main font-bold flex mb-0 items-center cursor-pointer"
						onClick={() => router.push("/")}
					>
						<span className="mr-2">
							<Image
								src={Logo}
								alt="Pixels Piece Logo"
								width={40}
								height={40}
							/>
						</span>
						Pixels Piece
					</h1>
				</div>
				<div className="hidden gap-8 font-semibold text-[18px] text-black-600 md:hidden lg:flex xl:flex relative z-50">
					<p
						className="cursor-pointer hover:text-primary-main transition-colors duration-200"
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
						className={`flex items-center justify-center gap-1 hover:text-primary-main transition-colors duration-200 ${
							openDrop && "text-primary-main"
						}`}
					>
						<CustomPopover
							isOpen={openDrop}
							handleClose={(event) => setOpenDrop(event)}
							buttonTitleLabel="Services"
							children={
								<div className="flex flex-col absolute rounded-xl gap-3 p-5 left-[10%] bg-pink-200  shadow-lg border border-pink-400 text-common-black mt-[40px] min-w-[250px]">
									{services.map((item, index) => (
										<div
											key={index}
											className="flex flex-col"
											onClick={() => setOpenDrop(false)}
										>
											<h1
												className="font-semibold text-black-700 cursor-pointer hover:text-primary-main transition-colors duration-200 py-1 flex items-center"
												onClick={() => {
													router.push(item.path);
												}}
											>
												<span className="mr-2">
													<ArrowRight className="text-primary-main" />
												</span>
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
						className="cursor-pointer hover:text-primary-main transition-colors duration-200"
						onClick={() => router.push("/portfolio")}
					>
						Portfolio
					</p>
					<p
						className="cursor-pointer hover:text-primary-main transition-colors duration-200"
						onClick={() => {
							router.push("/testimonial");
						}}
					>
						Testimonial
					</p>
				</div>
				<div>
					<CustomButton
						className="w-[160px] rounded-lg hidden md:hidden lg:flex xl:flex bg-primary-main transition-colors duration-200"
						name="Contact us"
						onClick={() => {
							const el = document.getElementById("contact");
							if (el) {
								el.scrollIntoView({ behavior: "smooth" });
							} else {
								router.push("/#contact");
							}
						}}
					/>
				</div>
				<div
					className="flex sm:flex md:flex lg:hidden xl:hidden cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
					onClick={() => setIsOpen(!isOpen)}
				>
					<MenuIcon />
				</div>
			</div>

			{/* Mobile Menu */}
			{isOpen && (
				<>
					{/* Backdrop with fade-in */}
					<div
						className="fixed inset-0 bg-black/30 backdrop-blur-4xl z-40 animate-fade-in"
						onClick={handleSidebarClose}
					/>
					{/* Sidebar with slide-in/out animation */}
					<div
						className={`fixed w-[85%] h-full bg-white/95 backdrop-blur-3xl right-0 flex flex-col z-50 shadow-xl border-l border-pink-500
      ${isClosing ? "animate-slide-out-right" : "animate-slide-in-left"}
    `}
					>
						<div className="h-[70px] border-b border-pink-500 w-full flex justify-between items-center px-5 py-5">
							<h1 className="text-[22px] text-primary-main font-semibold flex items-center">
								<span className="mr-2">
									<Image
										src={Logo}
										alt="Pixels Piece Logo"
										width={32}
										height={32}
									/>
								</span>
								Pixels Piece
							</h1>
							<div
								className="cursor-pointer p-2 rounded-full hover:bg-gray-100 transition-colors duration-200"
								onClick={handleSidebarClose}
							>
								<CloseIcon />
							</div>
						</div>

						<div className="flex flex-col gap-0 font-semibold text-[16px] text-black-600 overflow-auto px-5 py-4">
							<div className="flex flex-col mt-1">
								<div
									className={`w-full flex justify-between ${
										!isOpenList && "border-b "
									}items-center py-4 cursor-pointer ${
										isOpenList && "text-primary-main"
									}`}
									onClick={() => setIsOpenList(!isOpenList)}
								>
									<span>Technologies</span>
									<span className="text-black-700">
										{isOpenList ? <RemoveIcon /> : <AddIcon />}
									</span>
								</div>
								{isOpenList && (
									<div className="text-black-700 flex flex-col gap-2 py-2 pl-4 animate-slide-in cursor-pointer font-normal text-[15px] border-l-2 border-primary-main/20 ml-1">
										{technologies.map((category, catIndex) => (
											<div key={catIndex} className="mb-3">
												<h3 className="text-black-800 font-medium text-[15px] mb-2">
													{category.category}
												</h3>
												{category.items.map((item, itemIndex) => (
													<p
														key={itemIndex}
														className="py-1.5 pl-3 hover:text-primary-main transition-colors duration-200 flex items-center"
														onClick={() => {
															router.push("/#hire");
															setIsOpen(false);
														}}
													>
														<span className="text-primary-main mr-2">•</span>
														{item}
													</p>
												))}
											</div>
										))}
									</div>
								)}
							</div>

							<div className="flex flex-col mt-1">
								<div
									className={`w-full flex justify-between items-center py-4 cursor-pointer ${
										isService && "text-primary-main"
									}`}
									onClick={() => setIsService(!isService)}
								>
									<span>Services</span>
									<span className="text-black-700">
										{isService ? <RemoveIcon /> : <AddIcon />}
									</span>
								</div>
								{isService && (
									<div className="text-black-700 mb-5 flex flex-col gap-2 py-2 pl-4 animate-slide-in cursor-pointer font-normal text-[15px] border-l-2 border-primary-main/20 ml-1">
										{services.map((service, index) => (
											<p
												key={index}
												className="py-1.5 pl-3  hover:text-primary-main transition-colors duration-200 flex items-center"
												onClick={() => {
													router.push(service.path);
													setIsOpen(false);
												}}
											>
												<span className="text-primary-main mr-2">•</span>
												{service.title}
											</p>
										))}
									</div>
								)}
							</div>

							<p
								className="py-4  border-t border-gray-200/50 cursor-pointer hover:text-primary-main transition-colors duration-200"
								onClick={() => {
									router.push("/portfolio");
									setIsOpen(false);
								}}
							>
								Portfolio
							</p>

							<p
								className="py-4 border-t border-gray-200/50 cursor-pointer hover:text-primary-main transition-colors duration-200"
								onClick={() => {
									router.push("/testimonial");
									setIsOpen(false);
								}}
							>
								Testimonial
							</p>

							<p
								className="py-4 border-t border-gray-200/50 cursor-pointer hover:text-primary-main transition-colors duration-200"
								onClick={() => {
									const el = document.getElementById("who");
									if (el) {
										el.scrollIntoView({ behavior: "smooth" });
									}
									setIsOpen(false);
								}}
							>
								Who we are
							</p>

							<div className="pt-4 border-t border-gray-200 ">
								<CustomButton
									className="w-full rounded-lg bg-primary-main transition-colors duration-200"
									name="Contact us"
									onClick={() => {
										const el = document.getElementById("contact");
										if (el) {
											el.scrollIntoView({ behavior: "smooth" });
										}
										setIsOpen(false);
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

