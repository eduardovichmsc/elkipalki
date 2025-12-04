"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import {
	Truck,
	Ruler,
	Recycle,
	MapPin,
	CalendarClock,
	ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { PATHS } from "@/config/paths";

export default function Delivery() {
	return (
		<section
			id="delivery"
			className="py-24 px-6 md:px-12 bg-forest border-t border-white/5">
			{/* Header */}
			<div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
				<div>
					<span className="text-gold uppercase tracking-widest text-xs font-bold mb-4 block">
						Premium Service
					</span>
					<h2 className="text-4xl md:text-6xl font-serif text-cream leading-[1.1]">
						Сервис белых перчаток
					</h2>
				</div>
				<p className="text-white/50 max-w-sm text-sm">
					Мы берем на себя все хлопоты. Вам остается только включить гирлянду и
					налить какао.
				</p>
			</div>

			{/* Bento Grid */}
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 grid-rows-[auto] md:grid-rows-2 gap-4 h-auto md:h-[600px]">
				{/* Card 1: Main Visual (Large) */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6 }}
					className="md:col-span-2 md:row-span-2 relative rounded-3xl overflow-hidden group min-h-[300px]">
					<Image
						src="https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?q=80&w=1500&auto=format&fit=crop"
						alt="Delivery Truck in Snow"
						fill
						className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80"
					/>
					<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

					<div className="absolute bottom-8 left-8 right-8">
						<div className="w-12 h-12 rounded-full bg-cream text-forest flex items-center justify-center mb-6">
							<Truck size={20} />
						</div>
						<h3 className="text-2xl font-serif text-cream mb-2">
							Бережная доставка
						</h3>
						<p className="text-white/70 text-sm max-w-md">
							Перевозим ели в климатических камерах при +2°C. Курьеры работают в
							бахилах и белых перчатках, чтобы не оставить и следа в вашем доме.
						</p>
					</div>
				</motion.div>

				{/* Card 2: Installation (Dark) */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.1 }}
					className="bg-[#133326] rounded-3xl p-8 flex flex-col justify-between border border-white/5 group hover:border-gold/30 transition-colors min-h-[200px]">
					<div className="flex justify-between items-start">
						<Ruler className="text-gold" size={24} />
						<span className="text-white/20 text-xs font-mono">01</span>
					</div>
					<div>
						<h3 className="text-xl font-serif text-cream mb-2">Монтаж</h3>
						<p className="text-white/50 text-xs leading-relaxed">
							Выровняем ствол по лазерному уровню, надежно закрепим в подставке
							и подрежем нижние ветки при необходимости.
						</p>
					</div>
				</motion.div>

				{/* Card 3: Recycling (Light/Gold) */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2 }}
					className="bg-cream rounded-3xl p-8 flex flex-col justify-between group min-h-[200px]">
					<div className="flex justify-between items-start">
						<Recycle className="text-forest" size={24} />
						<span className="text-forest/30 text-xs font-mono">02</span>
					</div>
					<div>
						<h3 className="text-xl font-serif text-forest mb-2">Утилизация</h3>
						<p className="text-forest/70 text-xs leading-relaxed">
							После праздников мы вернемся, аккуратно упакуем елку в специальный
							чехол, вынесем и отправим на переработку в щепу.
						</p>
					</div>
				</motion.div>

				{/* Card 4: Timing (Dark) */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.3 }}
					className="md:col-span-2 bg-[#0F2E22] rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-white/5 relative overflow-hidden group">
					{/* Abstract Map Background */}
					<div className="absolute inset-0 opacity-10 pointer-events-none">
						<svg width="100%" height="100%">
							<pattern
								id="grid"
								width="40"
								height="40"
								patternUnits="userSpaceOnUse">
								<path
									d="M 40 0 L 0 0 0 40"
									fill="none"
									stroke="white"
									strokeWidth="0.5"
								/>
							</pattern>
							<rect width="100%" height="100%" fill="url(#grid)" />
						</svg>
					</div>

					<div className="relative z-10 flex gap-6 items-center w-full">
						<div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center shrink-0 text-gold">
							<CalendarClock size={28} />
						</div>
						<div>
							<h3 className="text-xl font-serif text-cream mb-1">
								Доставка день в день
							</h3>
							<p className="text-white/50 text-sm">
								При заказе до 14:00 по Москве и МО (до 15км от МКАД).
							</p>
						</div>
					</div>

					<Link
						href={PATHS.SECTIONS.DELIVERY}
						className="relative z-10 flex items-center gap-2 bg-gold/10 text-gold px-6 py-3 rounded-full text-xs uppercase tracking-widest hover:bg-gold hover:text-forest transition-colors whitespace-nowrap">
						Зоны доставки <ArrowRight size={14} />
					</Link>
				</motion.div>
			</div>
		</section>
	);
}
