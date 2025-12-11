"use client";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { NAVLINKS, PATHS } from "@/config/paths";
import TransitionLink from "@/components/ui/link";
import { useLenis } from "@/components/layout/scroll";
import { BASE } from "@/config";

export default function Footer() {
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
			}
		}
	};

	const scrollToTop = () => {
		lenis?.scrollTo(0, { duration: 2 });
	};

	return (
		<footer className="relative md:h-screen bottom-0 z-0 bg-[#05140e] text-cream overflow-hidden">
			{/* 1. Big CTA Section */}
			<div className="px-6 md:px-12 pt-24 pb-12 md:pt-32 border-t border-white/10">
				<div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
					<div className="max-w-2xl">
						<span className="text-gold uppercase tracking-[0.2em] text-xs font-bold mb-6 block">
							Свяжитесь с нами
						</span>
						<h2 className="text-4xl md:text-7xl font-serif leading-[1.1] mb-8">
							Готовы наполнить дом <br />
							<span className="italic text-white/30">
								настроением Нового Года?
							</span>
						</h2>
						<a
							href={PATHS.CONTACTS.EMAIL}
							className="inline-flex items-center gap-4 text-xl md:text-2xl border-b border-white/20 pb-2 hover:border-gold hover:text-gold transition-colors duration-300">
							{BASE.email.text}
							<ArrowUpRight className="w-6 h-6" />
						</a>
					</div>

					{/* Newsletter Minimal */}
					<div className="w-full md:w-auto min-w-[300px]">
						<form
							onSubmit={(e) => e.preventDefault()}
							className="relative group">
							<input
								type="email"
								placeholder="Подписаться на новости"
								className="w-full bg-transparent border-b border-white/20 py-4 pr-12 text-sm uppercase tracking-widest placeholder:text-white/20 outline-none focus:border-gold transition-colors"
							/>
							<button
								type="submit"
								className="absolute right-0 top-1/2 -translate-y-1/2 text-white/50 group-hover:text-gold transition-colors">
								<ArrowUpRight size={20} />
							</button>
						</form>
					</div>
				</div>
			</div>

			{/* 2. Grid Links Section */}
			<div className="border-t border-white/10">
				<div className="grid grid-cols-1 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-white/10">
					{/* Col 1: Menu */}
					<div className="p-6 md:p-12 flex flex-col gap-6">
						<span className="text-white/30 text-xs uppercase tracking-widest">
							Меню
						</span>
						<nav className="flex flex-col gap-4 items-start">
							{NAVLINKS.map((link) => (
								<TransitionLink
									key={link.name}
									href={link.href}
									onClick={(e) => handleScroll(e, link.href)}
									className="text-lg font-serif hover:text-gold hover:translate-x-2 transition-all duration-300">
									{link.name}
								</TransitionLink>
							))}
						</nav>
					</div>

					{/* Col 2: Service */}
					<div className="p-6 md:p-12 flex flex-col gap-6">
						<span className="text-white/30 text-xs uppercase tracking-widest">
							Сервис
						</span>
						<nav className="flex flex-col gap-4 items-start">
							<TransitionLink
								href={PATHS.SECTIONS.DELIVERY}
								className="text-sm uppercase tracking-widest hover:text-gold transition-colors">
								Доставка и Оплата
							</TransitionLink>
							<a
								href="#"
								className="text-sm uppercase tracking-widest hover:text-gold transition-colors">
								Возврат
							</a>
							<a
								href="#"
								className="text-sm uppercase tracking-widest hover:text-gold transition-colors">
								FAQ
							</a>
						</nav>
					</div>

					{/* Col 3: Socials */}
					<div className="p-6 md:p-12 flex flex-col gap-6">
						<span className="text-white/30 text-xs uppercase tracking-widest">
							Соцсети
						</span>
						<nav className="flex flex-col gap-4 items-start">
							<a
								href={PATHS.CONTACTS.INSTAGRAM}
								target="_blank"
								className="text-sm uppercase tracking-widest hover:text-gold transition-colors">
								Instagram
							</a>
							<a
								href={PATHS.CONTACTS.TELEGRAM}
								target="_blank"
								className="text-sm uppercase tracking-widest hover:text-gold transition-colors">
								Telegram
							</a>
							<a
								href="#"
								className="text-sm uppercase tracking-widest hover:text-gold transition-colors">
								Pinterest
							</a>
						</nav>
					</div>

					{/* Col 4: Back to Top */}
					<div className="p-6 md:p-12 flex flex-col justify-between items-start md:items-end">
						<span className="text-white/30 text-xs uppercase tracking-widest hidden md:block">
							{new Date().getFullYear()}
						</span>

						<button
							onClick={scrollToTop}
							className="group flex items-center gap-4 text-xs uppercase tracking-widest hover:text-gold transition-colors">
							Наверх
							<div className="w-10 h-10 border border-white/20 rounded-full flex items-center justify-center group-hover:bg-gold group-hover:text-forest group-hover:border-gold transition-all duration-300">
								<ArrowUp size={16} />
							</div>
						</button>
					</div>
				</div>
			</div>

			{/* 3. Massive Typography (The "Awwwards" Signature) */}
			<div className="border-t border-white/10 pt-4 md:pt-0 overflow-hidden">
				<h1 className="text-[24vw] leading-[0.8] font-serif text-center text-white/5 select-none pointer-events-none translate-y-4 md:translate-y-8">
					{BASE.logo.text}
				</h1>
			</div>

			{/* Mobile Copyright */}
			<div className="absolute bottom-4 w-full text-center md:hidden">
				<p className="text-[10px] text-white/20 uppercase tracking-widest">
					© {new Date().getFullYear()} Noël Store
				</p>
			</div>
		</footer>
	);
}
