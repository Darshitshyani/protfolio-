import React, { useState, useEffect } from "react";
import CustomButton from "../CustomButton";
import { LogoLockupDark, LogoLockupLight } from "@/untils/images";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import Link from "next/link";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { ClickAwayListener } from "@mui/material";
import { ArrowDropDown, ArrowDropUp, ArrowRight } from "@mui/icons-material";
import { useRouter } from "next/router";
import { AnimatePresence, motion } from "motion/react";
import { EASE, cx, useReducedMotion } from "@/components/shared/motion";
import { PIMW } from "@/untils/data/pimw";
import ThemeToggle from "@/components/shared/ThemeToggle";

/** Landing page for our own Shopify app. */
const SHOPIFY_APP_PATH = "/shopify-app";
/** "5.0" — straight off the verified listing data, never hand-typed. */
const APP_RATING = PIMW.rating.toFixed(1);

const services = [
	{
		title: "Shopify App Development",
		path: "/services/shopify-app-development",
	},
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
		category: "Shopify",
		items: [
			"Shopify App Development",
			"Shopify Theme Development",
			"Hydrogen Storefronts",
			"Shopify Functions",
			"App Extensions",
		],
	},
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

/**
 * Small rating chip beside the "Shopify App" nav item. The star is decorative;
 * screen readers get the full sentence once, from the sr-only twin.
 */
const RatingPill = ({ className }: { className?: string }) => (
	<span
		className={cx(
			"inline-flex items-center gap-[2px] rounded-full bg-shopify-100 px-2 py-[1px] text-[11px] font-semibold leading-[16px] text-shopify-700",
			className
		)}
	>
		<span aria-hidden="true">★</span>
		<span aria-hidden="true">{APP_RATING}</span>
		<span className="sr-only">
			Rated {APP_RATING} out of 5 on the Shopify App Store
		</span>
	</span>
);

const Topbar = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenList, setIsOpenList] = useState(false);
	const [openDrop, setOpenDrop] = useState(false);
	const [isService, setIsService] = useState(false);
	const [scrolled, setScrolled] = useState(false);

	const reduce = useReducedMotion();
	const router = useRouter();

	useEffect(() => {
		const handleScroll = () => {
			const isScrolled = window.scrollY > 10;
			setScrolled(isScrolled);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	/** Closing is now driven by AnimatePresence — no timers. */
	const handleSidebarClose = () => setIsOpen(false);

	/** Runs once the sidebar has finished sliding out, so the accordions do not
	 * visibly collapse mid-animation. */
	const handleSidebarExited = () => {
		setIsOpenList(false);
		setIsService(false);
	};

	/** Same-page smooth scroll with a hash-route fallback for other routes.
	 *  Native scrolling: ScrollSmoother is gone, so scrollIntoView works
	 *  directly again. `scroll-margin-top` on the targets (globals.css) keeps
	 *  the heading clear of the fixed 70px header. */
	const scrollToSection = (id: string, fallbackPath: string) => {
		const el = document.getElementById(id);
		if (el) {
			el.scrollIntoView({ behavior: reduce ? "auto" : "smooth" });
		} else {
			router.push(fallbackPath);
		}
	};

	return (
		<>
			<header
				className={`h-[70px] left-[5%] right-[5%] border border-black-200 rounded-2xl flex justify-between items-center px-3 fixed top-[2%] z-50 transition-all duration-300 ${
					scrolled
						? "bg-common-white/80 backdrop-blur-2xl border-black-200 shadow-sm"
						: "bg-common-white/60 backdrop-blur-2xl border-black-100"
				}`}
			>
				<div>
					{/* Brand lockup already contains the wordmark, so no text node
					    here. Two files rather than one CSS-recoloured asset: the
					    wordmark is baked into the PNG, so light/dark swap the
					    IMAGE. Both are rendered and toggled by the `dark` class —
					    no JS, no hydration mismatch, and the correct one is
					    painted on the very first frame. `priority` because this
					    is above the fold on every route. */}
					<Link href="/" className="flex items-center" aria-label="Pixels Piece — home">
						<Image
							src={LogoLockupLight}
							alt="Pixelspiece"
							priority
							className="hidden h-[34px] w-auto dark:block"
						/>
						<Image
							src={LogoLockupDark}
							alt="Pixelspiece"
							priority
							className="h-[34px] w-auto dark:hidden"
						/>
					</Link>
				</div>

				<nav
					aria-label="Main"
					className="hidden gap-3 xl:gap-8 items-center whitespace-nowrap font-semibold text-[15px] xl:text-[18px] text-black-600 md:hidden lg:flex xl:flex relative z-50"
				>
					<button
						type="button"
						className="cursor-pointer hover:text-primary-main transition-colors duration-200"
						onClick={() => scrollToSection("who", "/#who")}
					>
						Who we are
					</button>

					<ClickAwayListener onClickAway={() => setOpenDrop(false)}>
						<div className="relative">
							<button
								type="button"
								aria-expanded={openDrop}
								aria-haspopup="true"
								className={cx(
									"flex items-center justify-center gap-1 hover:text-primary-main transition-colors duration-200",
									openDrop && "text-primary-main"
								)}
								onClick={() => setOpenDrop(!openDrop)}
							>
								Services
								{openDrop ? <ArrowDropUp /> : <ArrowDropDown />}
							</button>
							<AnimatePresence>
								{openDrop && (
									<motion.div
										key="services-dropdown"
										initial={
											reduce
												? { opacity: 0 }
												: { opacity: 0, y: -8, scale: 0.98 }
										}
										animate={
											reduce
												? { opacity: 1 }
												: { opacity: 1, y: 0, scale: 1 }
										}
										exit={
											reduce
												? { opacity: 0 }
												: { opacity: 0, y: -8, scale: 0.98 }
										}
										transition={
											reduce
												? { duration: 0 }
												: { duration: 0.2, ease: EASE }
										}
										style={{ transformOrigin: "top left" }}
										className="flex flex-col absolute rounded-xl gap-3 p-5 left-0 top-full mt-[18px] bg-pink-200 shadow-lg border border-pink-400 text-common-black min-w-[250px] z-50"
									>
										{services.map((item) => (
											<Link
												key={item.path}
												href={item.path}
												onClick={() => setOpenDrop(false)}
												className="font-semibold text-black-700 cursor-pointer hover:text-primary-main transition-colors duration-200 py-1 flex items-center"
											>
												<span className="mr-2">
													<ArrowRight className="text-primary-main" />
												</span>
												{item.title}
											</Link>
										))}
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</ClickAwayListener>

					<Link
						href={SHOPIFY_APP_PATH}
						className="cursor-pointer hover:text-primary-main transition-colors duration-200 flex items-center gap-2"
					>
						Shopify App
						<RatingPill className="hidden xl:inline-flex" />
					</Link>

					<Link
						href="/portfolio"
						className="cursor-pointer hover:text-primary-main transition-colors duration-200"
					>
						Portfolio
					</Link>

					<Link
						href="/testimonial"
						className="cursor-pointer hover:text-primary-main transition-colors duration-200"
					>
						Testimonial
					</Link>
				</nav>

				<div className="flex items-center gap-2">
					{/* Desktop theme switch. Below lg the sidebar carries its twin, so
					    only one toggle is ever in the accessibility tree per breakpoint. */}
					<ThemeToggle className="hidden lg:flex" />
					<CustomButton
						className="w-[160px] rounded-lg hidden md:hidden lg:flex xl:flex bg-primary-main transition-colors duration-200"
						name="Contact us"
						onClick={() => scrollToSection("contact", "/#contact")}
					/>
				</div>
				<button
					type="button"
					aria-label="Open menu"
					aria-expanded={isOpen}
					className="flex sm:flex md:flex lg:hidden xl:hidden cursor-pointer p-2 rounded-full hover:bg-black-100 transition-colors duration-200"
					onClick={() => setIsOpen(!isOpen)}
				>
					<MenuIcon />
				</button>
			</header>

			{/* Mobile Menu — enter/exit both driven by AnimatePresence */}
			<AnimatePresence onExitComplete={handleSidebarExited}>
				{isOpen && (
					<motion.div
						key="sidebar-backdrop"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: reduce ? 0 : 0.25, ease: EASE }}
						className="fixed inset-0 bg-static-black/60 backdrop-blur-sm z-40"
						onClick={handleSidebarClose}
					/>
				)}
				{isOpen && (
					<motion.aside
						key="sidebar"
						aria-label="Mobile navigation"
						initial={reduce ? { opacity: 0 } : { x: "100%" }}
						animate={reduce ? { opacity: 1 } : { x: 0 }}
						exit={reduce ? { opacity: 0 } : { x: "100%" }}
						transition={
							reduce ? { duration: 0 } : { duration: 0.35, ease: EASE }
						}
						className="fixed w-[85%] max-w-[360px] h-full bg-common-white/95 backdrop-blur-3xl right-0 top-0 flex flex-col z-50 shadow-xl border-l border-pink-500"
					>
						<div className="h-[70px] border-b border-pink-500 w-full flex justify-between items-center px-5 py-5">
							<Link
								href="/"
								onClick={handleSidebarClose}
								className="flex min-w-0 items-center"
								aria-label="Pixels Piece — home"
							>
								<Image
									src={LogoLockupLight}
									alt="Pixelspiece"
									className="hidden h-[30px] w-auto dark:block"
								/>
								<Image
									src={LogoLockupDark}
									alt="Pixelspiece"
									className="h-[30px] w-auto dark:hidden"
								/>
							</Link>
							<div className="flex items-center gap-1 shrink-0">
								<ThemeToggle className="lg:hidden" />
								<button
									type="button"
									aria-label="Close menu"
									className="cursor-pointer p-2 rounded-full hover:bg-black-100 transition-colors duration-200"
									onClick={handleSidebarClose}
								>
									<CloseIcon />
								</button>
							</div>
						</div>

						<nav
							aria-label="Mobile"
							className="flex flex-col gap-0 font-semibold text-[16px] text-black-600 overflow-auto px-5 py-4"
						>
							<Link
								href={SHOPIFY_APP_PATH}
								onClick={handleSidebarClose}
								className="py-4 flex items-center gap-2 flex-wrap cursor-pointer hover:text-primary-main transition-colors duration-200"
							>
								Shopify App
								<RatingPill />
							</Link>

							<div className="flex flex-col mt-1">
								<button
									type="button"
									aria-expanded={isOpenList}
									className={`w-full flex justify-between border-t border-black-200 items-center py-4 cursor-pointer text-left ${
										isOpenList ? "text-primary-main" : ""
									}`}
									onClick={() => setIsOpenList(!isOpenList)}
								>
									<span>Technologies</span>
									<span className="text-black-700">
										{isOpenList ? <RemoveIcon /> : <AddIcon />}
									</span>
								</button>
								<AnimatePresence initial={false}>
									{isOpenList && (
										<motion.div
											key="technologies-panel"
											initial={
												reduce
													? { opacity: 1 }
													: { height: 0, opacity: 0 }
											}
											animate={
												reduce
													? { opacity: 1 }
													: { height: "auto", opacity: 1 }
											}
											exit={
												reduce ? { opacity: 1 } : { height: 0, opacity: 0 }
											}
											transition={
												reduce
													? { duration: 0 }
													: { duration: 0.28, ease: EASE }
											}
											className="overflow-hidden"
										>
											<div className="text-black-700 flex flex-col gap-2 py-2 pl-4 cursor-pointer font-normal text-[15px] border-l-2 border-primary-main/20 ml-1">
												{technologies.map((category) => (
													<div key={category.category} className="mb-3">
														<h3 className="text-black-800 font-medium text-[15px] mb-2">
															{category.category}
														</h3>
														{category.items.map((item) => (
															<button
																type="button"
																key={item}
																className="py-1.5 pl-3 w-full text-left hover:text-primary-main transition-colors duration-200 flex items-center"
																onClick={() => {
																	router.push("/#hire");
																	setIsOpen(false);
																}}
															>
																<span className="text-primary-main mr-2">
																	•
																</span>
																{item}
															</button>
														))}
													</div>
												))}
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>

							<div className="flex flex-col mt-1">
								<button
									type="button"
									aria-expanded={isService}
									className={`w-full flex justify-between items-center border-t border-black-200 py-4 cursor-pointer text-left ${
										isService ? "text-primary-main" : ""
									}`}
									onClick={() => setIsService(!isService)}
								>
									<span>Services</span>
									<span className="text-black-700">
										{isService ? <RemoveIcon /> : <AddIcon />}
									</span>
								</button>
								<AnimatePresence initial={false}>
									{isService && (
										<motion.div
											key="services-panel"
											initial={
												reduce
													? { opacity: 1 }
													: { height: 0, opacity: 0 }
											}
											animate={
												reduce
													? { opacity: 1 }
													: { height: "auto", opacity: 1 }
											}
											exit={
												reduce ? { opacity: 1 } : { height: 0, opacity: 0 }
											}
											transition={
												reduce
													? { duration: 0 }
													: { duration: 0.28, ease: EASE }
											}
											className="overflow-hidden"
										>
											<div className="text-black-700 mb-5 flex flex-col gap-2 py-2 pl-4 cursor-pointer font-normal text-[15px] border-l-2 border-primary-main/20 ml-1">
												{services.map((service) => (
													<Link
														key={service.path}
														href={service.path}
														onClick={handleSidebarClose}
														className="py-1.5 pl-3 hover:text-primary-main transition-colors duration-200 flex items-center"
													>
														<span className="text-primary-main mr-2">•</span>
														{service.title}
													</Link>
												))}
											</div>
										</motion.div>
									)}
								</AnimatePresence>
							</div>

							<Link
								href="/portfolio"
								onClick={handleSidebarClose}
								className="py-4 border-t border-black-200 cursor-pointer hover:text-primary-main transition-colors duration-200"
							>
								Portfolio
							</Link>

							<Link
								href="/testimonial"
								onClick={handleSidebarClose}
								className="py-4 border-t border-black-200 cursor-pointer hover:text-primary-main transition-colors duration-200"
							>
								Testimonial
							</Link>

							<button
								type="button"
								className="py-4 border-t border-black-200 cursor-pointer text-left hover:text-primary-main transition-colors duration-200"
								onClick={() => {
									scrollToSection("who", "/#who");
									setIsOpen(false);
								}}
							>
								Who we are
							</button>

							<div className="pt-4 border-t border-black-200 ">
								<CustomButton
									className="w-full rounded-lg bg-primary-main transition-colors duration-200"
									name="Contact us"
									onClick={() => {
										scrollToSection("contact", "/#contact");
										setIsOpen(false);
									}}
								/>
							</div>
						</nav>
					</motion.aside>
				)}
			</AnimatePresence>
		</>
	);
};

export default Topbar;
