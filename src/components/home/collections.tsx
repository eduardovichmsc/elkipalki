"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils"; // Если нет utils, удали и используй шаблонные строки

const collections = [
	{
		id: 1,
		title: "Royal Gold",
		category: "Classic",
		description:
			"Теплое золото, латунь и янтарные огни. Классика, которая наполняет дом уютом старинного особняка.",
		image:
			"https://images.unsplash.com/photo-1544079860-244199c4c795?q=80&w=1500&auto=format&fit=crop", // Золотые игрушки
		color: "bg-[#D4AF37]",
	},
	{
		id: 2,
		title: "Nordic Frost",
		category: "Minimalism",
		description:
			"Серебро, белый фарфор и холодные огни. Вдохновлено заснеженными лесами Лапландии.",
		image:
			"https://images.unsplash.com/photo-1482638214219-c02cc0d26829?q=80&w=1500&auto=format&fit=crop", // Белое/Серебро
		color: "bg-[#E5E7EB]",
	},
	{
		id: 3,
		title: "Vintage Red",
		category: "Heritage",
		description:
			"Глубокий бархатный красный, деревянные щелкунчики и клетчатые ленты. Вкус детства и волшебства.",
		image:
			"https://images.unsplash.com/photo-1575373801874-d4b998a4d7d1?q=80&w=1500&auto=format&fit=crop", // Красное
		color: "bg-[#C41E3A]",
	},
];

export default function Collections() {
	const [activeId, setActiveId] = useState(1);

	return (
		<section className="py-24 bg-forest text-cream overflow-hidden">
			<div className="px-6 md:px-12 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
				<div>
					<span className="text-gold uppercase tracking-widest text-xs font-bold mb-4 block">
						Design Service
					</span>
					<h2 className="text-4xl md:text-6xl font-serif">Готовые решения</h2>
				</div>
				<p className="text-white/50 max-w-sm text-sm">
					Мы подобрали идеальные сочетания игрушек и гирлянд, чтобы ваша елка
					выглядела как с обложки журнала.
				</p>
			</div>

			{/* Accordion Container */}
			<div className="flex flex-col md:flex-row h-[80vh] md:h-[600px] w-full px-0 md:px-12 gap-2 md:gap-4">
				{collections.map((item) => (
					<motion.div
						key={item.id}
						onClick={() => setActiveId(item.id)}
						className={`relative cursor-pointer overflow-hidden rounded-none md:rounded-2xl transition-all duration-700 ease-[0.32,0.72,0,1]
              ${
								activeId === item.id
									? "flex-[3] md:flex-[3]"
									: "flex-[1] md:flex-[1]"
							}
              h-full group
            `}>
						{/* Background Image */}
						<Image
							src={item.image}
							alt={item.title}
							fill
							className={`object-cover transition-transform duration-1000 ${
								activeId === item.id ? "scale-100" : "scale-110 grayscale-[50%]"
							}`}
						/>

						{/* Dark Overlay */}
						<div
							className={`absolute inset-0 bg-black/30 transition-opacity duration-500 ${
								activeId === item.id
									? "opacity-20"
									: "opacity-60 group-hover:opacity-40"
							}`}
						/>

						{/* Content Content */}
						<div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-between">
							{/* Top Label */}
							<div className="flex justify-between items-start">
								<span className="backdrop-blur-md bg-white/10 border border-white/20 px-3 py-1 rounded-full text-xs uppercase tracking-widest">
									{item.category}
								</span>

								{/* Active Indicator Icon */}
								<div
									className={`w-10 h-10 rounded-full bg-cream text-forest flex items-center justify-center transition-transform duration-500 ${
										activeId === item.id ? "rotate-45" : "rotate-0"
									}`}>
									<ArrowUpRight size={18} />
								</div>
							</div>

							{/* Bottom Info */}
							<div>
								{/* Вертикальный текст для неактивных слайдов (Desktop only) */}
								{activeId !== item.id && (
									<h3 className="hidden md:block absolute bottom-10 left-10 text-3xl font-serif origin-bottom-left -rotate-90 translate-x-4 whitespace-nowrap">
										{item.title}
									</h3>
								)}

								<AnimatePresence mode="wait">
									{activeId === item.id ? (
										<motion.div
											initial={{ opacity: 0, y: 20 }}
											animate={{ opacity: 1, y: 0 }}
											exit={{ opacity: 0, y: 10 }}
											transition={{ duration: 0.4, delay: 0.2 }}>
											<h3 className="text-4xl md:text-5xl font-serif mb-4 leading-none">
												{item.title}
											</h3>
											<p className="text-white/80 max-w-md text-sm md:text-base leading-relaxed mb-6 font-sans backdrop-blur-sm bg-black/10 p-4 rounded-xl border border-white/5">
												{item.description}
											</p>
											<button className="bg-cream text-forest px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-gold transition-colors">
												Смотреть набор
											</button>
										</motion.div>
									) : (
										/* Заголовок для мобилки (когда свернут) */
										<div className="md:hidden">
											<h3 className="text-2xl font-serif">{item.title}</h3>
										</div>
									)}
								</AnimatePresence>
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</section>
	);
}
