"use client";
import { useState } from "react";
import { ShoppingBag, Menu, X, Settings, Heart } from "lucide-react"; // 1. Добавили Settings
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { PATHS } from "@/config/paths";
import { useLenis } from "@/components/layout/scroll";
import { useMounted } from "@/hooks/useMounted";
import { useFavoritesStore } from "@/store/favorites";
import { useCartStore } from "@/store/cart";

const navLinks = [
	{ name: "Коллекция", href: PATHS.CATALOG },
	{ name: "О бренде", href: PATHS.SECTIONS.ABOUT },
	{ name: "Доставка", href: PATHS.SECTIONS.DELIVERY },
];

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
		}
	};

	return (
		<>
			<motion.header
				initial={{ y: -100, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
				className="fixed top-6 left-0 right-0 z-50 flex justify-center items-center px-4">
				<div className="relative flex items-center justify-between px-2 py-2 bg-forest/60 backdrop-blur-md border border-white/10 rounded-full shadow-2xl shadow-black/20 md:min-w-[500px]">
					<Link
						href="/"
						className="pl-6 pr-4 font-serif text-xl tracking-widest text-cream">
						NOËL
					</Link>

					<nav className="hidden md:flex items-center gap-2 bg-black/20 rounded-full px-2 py-1.5 border border-white/5">
						{navLinks.map((link, index) => (
							<Link
								key={link.name}
								href={link.href}
								onClick={(e) => handleScroll(e, link.href)}
								onMouseEnter={() => setHoveredIndex(index)}
								onMouseLeave={() => setHoveredIndex(null)}
								className="relative text-xs uppercase tracking-widest text-cream/80 hover:text-cream hover:bg-white/10 rounded-full transition-all duration-300">
								<span className="block relative z-10 px-4 py-2">
									{link.name}
								</span>
							</Link>
						))}
					</nav>

					<div className="flex items-center gap-2 pl-4 pr-2">
						{/* 2. Кнопка Админки (Скрыта на мобильных, открывается в новой вкладке) */}
						<Link
							href="/studio"
							target="_blank"
							title="Панель администратора"
							className="hidden md:flex w-10 h-10 items-center justify-center rounded-full hover:bg-white/10 text-cream/40 hover:text-gold transition-all duration-300">
							<Settings size={16} />
						</Link>

						<button className="relative group w-10 h-10 flex items-center justify-center rounded-full bg-gold/10 hover:bg-gold text-gold hover:text-forest transition-all duration-300 cursor-pointer">
							<ShoppingBag size={18} />
							<span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cream text-[10px] font-bold text-forest opacity-0 group-hover:opacity-100 transition-opacity">
								2
							</span>
						</button>

						<button
							onClick={() => setIsMenuOpen(true)}
							className="md:hidden w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-cream">
							<Menu size={20} />
						</button>

						{/* Кнопка Избранного */}
						<Link
							href="/favorites"
							className="relative group w-10 h-10 flex items-center justify-center rounded-full bg-gold/10 hover:bg-gold text-gold hover:text-forest transition-all duration-300 cursor-pointer">
							<Heart size={18} />
							{favoritesCount > 0 && (
								<span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cream text-[10px] font-bold text-forest">
									{favoritesCount}
								</span>
							)}
						</Link>

						<button
							onClick={openCart} // Вешаем открытие
							className="relative group w-10 h-10 flex items-center justify-center rounded-full bg-gold/10 hover:bg-gold text-gold hover:text-forest transition-all duration-300 cursor-pointer">
							<ShoppingBag size={18} />
							{cartCount > 0 && (
								<span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cream text-[10px] font-bold text-forest">
									{cartCount}
								</span>
							)}
						</button>
					</div>
				</div>
			</motion.header>

			{/* Mobile Menu */}
			<AnimatePresence>
				{isMenuOpen && (
					<motion.div
						initial={{ opacity: 0, y: "-100%" }}
						animate={{ opacity: 1, y: 0 }}
						exit={{ opacity: 0, y: "-100%" }}
						transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
						className="fixed inset-0 z-[60] bg-forest flex flex-col justify-center items-center text-cream">
						<button
							onClick={() => setIsMenuOpen(false)}
							className="absolute top-8 right-8 p-4 hover:rotate-90 transition-transform duration-500">
							<X size={32} />
						</button>

						<nav className="flex flex-col gap-8 text-center">
							{navLinks.map((link, i) => (
								<motion.div
									key={link.name}
									initial={{ y: 50, opacity: 0 }}
									animate={{ y: 0, opacity: 1 }}
									transition={{ delay: 0.2 + i * 0.1 }}>
									<Link
										href={link.href}
										onClick={(e) => handleScroll(e, link.href)}
										className="text-4xl font-serif italic hover:text-gold transition-colors">
										{link.name}
									</Link>
								</motion.div>
							))}
							{/* Ссылка на админку для мобильных (внизу списка, опционально) */}
							<motion.div
								initial={{ y: 50, opacity: 0 }}
								animate={{ y: 0, opacity: 1 }}
								transition={{ delay: 0.6 }}>
								<Link
									href="/studio"
									className="text-sm uppercase tracking-widest text-white/30 hover:text-gold mt-8 block">
									Admin Panel
								</Link>
							</motion.div>
						</nav>

						<div className="absolute bottom-12 text-xs uppercase tracking-widest opacity-40">
							Christmas Magic 2024
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
