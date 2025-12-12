"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PATHS } from "@/config/paths";

export default function PromoCard() {
	const handleWhatsApp = (e: React.MouseEvent<HTMLAnchorElement>) => {
		let message = `Здравствуйте! Хочу взять консультацию.`;
		const url = `https://wa.me/${PATHS.CONTACTS.WHATSAPP}?text=${encodeURIComponent(message)}`;
		window.open(url, "_blank");
	};

	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.9 }}
			transition={{ duration: 0.4 }}
			className="relative h-full min-h-[500px] bg-forest flex flex-col justify-between p-8 md:p-10 group overflow-hidden">
			{/* Background decoration */}
			<div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />

			<div className="relative z-10">
				<span className="text-cream/60 uppercase tracking-widest text-xs font-bold mb-4 block border-b border-cream/20 pb-4 w-max">
					Concierge Service
				</span>
				<h3 className="text-3xl md:text-4xl font-serif text-cream leading-tight mb-4">
					Не знаете, какую ель выбрать?
				</h3>
				<p className="text-cream/80 font-sans text-sm leading-relaxed max-w-xs">
					Наш стилист поможет подобрать дерево под интерьер и пришлет живые фото
					вариантов в WhatsApp.
				</p>
			</div>

			<div className="relative z-10">
				<Link
					href={PATHS.CONTACTS.WHATSAPP.title}
					onClick={(e) => handleWhatsApp(e)}
					target="_blank"
					className="flex items-center gap-4 text-cream font-bold uppercase tracking-widest text-xs">
					Написать стилисту <ArrowUpRight size={18} />
				</Link>
			</div>

			{/* Hover Effect overlay */}
			<div className="absolute inset-0 bg-white/20 translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.22,1,0.36,1]" />
		</motion.div>
	);
}
