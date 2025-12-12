"use client";
import { useState } from "react";
import { ShoppingBag, Menu, X, Settings, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NAVLINKS, PATHS } from "@/config";
import { useLenis } from "@/components/layout/scroll";
import { useMounted } from "@/hooks/useMounted";
import { useFavoritesStore } from "@/store/favorites";
import { useCartStore } from "@/store/cart";
import TransitionLink from "../ui/link";
import { BASE } from "@/config";

const menuVars = {
	initial: { opacity: 0 },
	animate: {
		opacity: 1,
		transition: { duration: 0.5, ease: [0.12, 0, 0.39, 0] },
	},
	exit: {
		opacity: 0,
		transition: { delay: 0.5, duration: 0.5, ease: [0.22, 1, 0.36, 1] },
	},
} as const;

const containerVars = {
	initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
	open: {
		transition: {
			delayChildren: 0.3,
			staggerChildren: 0.09,
			staggerDirection: 1,
		},
	},
} as const;

const mobileLinkVars = {
	initial: {
		y: "30vh",
		transition: { duration: 0.5, ease: [0.37, 0, 0.63, 1] },
	},
	open: { y: 0, transition: { duration: 0.7, ease: [0, 0.55, 0.45, 1] } },
} as const;

export default function Navbar() {
	const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const { items: favItems } = useFavoritesStore();
	const isMounted = useMounted();
	const favoritesCount = isMounted ? favItems.length : 0;
	const { openCart, items: cartItems } = useCartStore();
	const cartCount = isMounted
		? cartItems.reduce((acc, item) => acc + item.quantity, 0)
		: 0;

	const lenis = useLenis();

	const handleScroll = (
		e: React.MouseEvent<HTMLAnchorElement, MouseEvent>,
		href: string
	) => {
		if (href.includes("#")) {
			const targetId = href.split("#")[1];
			const elem = document.getElementById(targetId);

			if (elem) {
				e.preventDefault();
				lenis?.scrollTo(elem, { offset: -100, duration: 2 });
				setIsMenuOpen(false);
			}
		} else {
			setIsMenuOpen(false);
		}
	};

	return (
		<>
			<motion.header
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
				className="fixed top-6 left-0 right-0 z-50 flex justify-center items-center px-4">
				{/* 
                    UPDATED: 
                    - bg-cream/80 backdrop-blur-md (Светлый фон)
                    - border-forest/10 (Темная прозрачная граница)
                    - shadow-forest/5 (Легкая тень)
                */}
				<div className="relative flex items-center justify-between px-2 py-2 bg-cream/80 backdrop-blur-md border border-forest/10 rounded-full shadow-2xl shadow-forest/5 min-w-full md:min-w-[500px]">
					<TransitionLink
						href={PATHS.HOME}
						onClick={(e) => handleScroll(e, PATHS.HOME)}
						// UPDATED: text-forest
						className="pl-6 pr-4 font-serif text-xl tracking-widest text-forest">
						{BASE.logo.text}
					</TransitionLink>

					{/* Desktop Menu */}
					{/* UPDATED: bg-forest/5 (Светло-серый/зеленый фон контейнера) */}
					<nav className="hidden md:flex items-center gap-2 bg-forest/5 rounded-full px-2 py-1.5 border border-forest/5">
						{NAVLINKS.map((link, index) => (
							<TransitionLink
								key={link.name}
								href={link.href}
								onClick={(e) => handleScroll(e, link.href)}
								onMouseEnter={() => setHoveredIndex(index)}
								onMouseLeave={() => setHoveredIndex(null)}
								// UPDATED: text-forest/60 hover:text-forest hover:bg-forest/5
								className="relative text-xs uppercase tracking-widest text-forest/60 hover:text-forest hover:bg-forest/5 rounded-full transition-all duration-300">
								<span className="block relative z-10 px-4 py-2">
									{link.name}
								</span>
							</TransitionLink>
						))}
					</nav>

					<div className="flex items-center gap-2 pl-4 pr-2">
						<TransitionLink
							href="/studio"
							target="_blank"
							title="Панель администратора"
							// UPDATED: text-forest/40 hover:bg-forest/5
							className="hidden md:flex w-10 h-10 items-center justify-center rounded-full hover:bg-forest/5 text-forest/40 transition-all duration-300">
							<Settings size={16} />
						</TransitionLink>

						<button
							onClick={openCart}
							// UPDATED: bg-forest/5 text-forest hover:bg-forest hover:text-cream
							className="relative group w-10 h-10 flex items-center justify-center rounded-full bg-forest/5 hover:bg-forest text-forest hover:text-cream transition-all duration-300 cursor-pointer">
							<ShoppingBag size={18} />
							{/* UPDATED: bg-forest text-cream */}
							<span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-forest text-[10px] font-bold text-cream opacity-0 group-hover:opacity-100 transition-opacity">
								{cartCount}
							</span>
						</button>

						<TransitionLink
							href="/favorites"
							// UPDATED: bg-forest/5 text-forest hover:bg-forest hover:text-cream
							className="relative group w-10 h-10 flex items-center justify-center rounded-full bg-forest/5 hover:bg-forest text-forest hover:text-cream transition-all duration-300 cursor-pointer">
							<Heart size={18} />
							{favoritesCount > 0 && (
								// UPDATED: bg-forest text-cream
								<span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-forest text-[10px] font-bold text-cream">
									{favoritesCount}
								</span>
							)}
						</TransitionLink>

						<button
							onClick={() => setIsMenuOpen(true)}
							// UPDATED: hover:bg-forest/5 text-forest
							className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-forest/5 transition-colors text-forest">
							<Menu size={20} />
						</button>
					</div>
				</div>
			</motion.header>

			{/* --- NEW AWWWARDS MOBILE MENU (Cream Theme) --- */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						variants={menuVars}
						initial="initial"
						animate="animate"
						exit="exit"
						// UPDATED: bg-cream
						className="fixed inset-0 z-[60] bg-cream origin-top flex flex-col justify-between">
						{/* Header in Menu */}
						{/* UPDATED: border-forest/10 */}
						<div className="flex justify-between items-center p-6 border-b border-forest/10">
							{/* UPDATED: text-forest */}
							<span className="font-serif text-xl tracking-widest text-forest">
								NOËL
							</span>
							<button
								onClick={() => setIsMenuOpen(false)}
								// UPDATED: hover:bg-forest/5 text-forest
								className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-forest/5 transition-colors text-forest">
								<X size={24} />
							</button>
						</div>

						{/* Links */}
						<div className="flex flex-col justify-center px-6 h-full overflow-hidden">
							<motion.div
								variants={containerVars}
								initial="initial"
								animate="open"
								exit="initial"
								className="flex flex-col gap-4">
								{NAVLINKS.map((link, i) => (
									<div key={link.name} className="overflow-hidden">
										<motion.div variants={mobileLinkVars}>
											<TransitionLink
												href={link.href}
												onClick={(e) => handleScroll(e, link.href)}
												// UPDATED: text-forest
												className="group flex items-start gap-4 text-forest">
												{/* UPDATED: text-forest/40 */}
												<span className="text-xs font-mono text-forest/40 mt-2">
													0{i + 1}
												</span>
												{/* UPDATED: hover:text-forest */}
												<span className="text-5xl md:text-7xl font-serif italic transition-colors duration-500 hover:text-forest">
													{link.name}
												</span>
											</TransitionLink>
										</motion.div>
									</div>
								))}

								{/* Admin Link for Mobile */}
								<div className="overflow-hidden mt-4">
									<motion.div variants={mobileLinkVars}>
										<TransitionLink
											href="/studio"
											// UPDATED: text-forest/30 hover:text-forest
											className="text-sm uppercase tracking-widest text-forest/30 hover:text-forest flex items-center gap-2">
											<Settings size={14} /> Admin Panel
										</TransitionLink>
									</motion.div>
								</div>
							</motion.div>
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
