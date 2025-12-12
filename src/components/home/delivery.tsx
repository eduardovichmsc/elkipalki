"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Truck, Ruler, Recycle, CalendarClock } from "lucide-react";

export default function Delivery() {
	return (
		<section
			id="delivery"
			// UPDATED: bg-cream border-forest/10
			className="py-24 px-6 md:px-12 bg-cream border-t border-forest/10">
			{/* Header */}
			<div className="mb-16 flex flex-col md:flex-row justify-between items-end gap-6">
				<div>
					{/* UPDATED: text-forest */}
					<h2 className="text-4xl md:text-6xl font-serif text-forest leading-[1.1]">
						Сервис белых перчаток
					</h2>
				</div>
				{/* UPDATED: text-forest/80 */}
				<p className="text-forest/80 max-w-sm text-sm">
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
					{/* Градиент оставляем темным, так как текст поверх фото светлый */}
					<div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

					<div className="absolute bottom-8 left-8 right-8">
						<div className="w-12 h-12 rounded-full bg-cream text-forest flex items-center justify-center mb-6">
							<Truck size={20} />
						</div>
						{/* Текст на фото всегда светлый */}
						<h3 className="text-2xl font-serif text-cream mb-2">
							Бережная доставка
						</h3>
						<p className="text-white/70 text-sm max-w-md hidden">
							Перевозим ели в климатических камерах при +2°C. Курьеры работают в
							бахилах и белых перчатках, чтобы не оставить и следа в вашем доме.
						</p>
					</div>
				</motion.div>

				{/* Card 2: Installation (Light Theme) */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.1 }}
					// UPDATED: bg-forest/5 border-forest/10 hover:border-gold/50
					className="md:col-span-2 bg-forest/5 rounded-3xl p-8 flex flex-col justify-between border border-forest/10 group hover:border-gold/50 transition-colors min-h-[200px]">
					<div className="flex justify-between items-start">
						<Ruler className="text-gold" size={24} />
						{/* UPDATED: text-forest/20 */}
						<span className="text-forest/20 text-xs font-mono">01</span>
					</div>
					<div>
						{/* UPDATED: text-forest */}
						<h3 className="text-xl font-serif text-forest mb-2">Монтаж</h3>
						{/* UPDATED: text-forest/50 */}
						<p className="text-forest/50 text-xs leading-relaxed">
							Качественно установим. Вам лишь остается радоваться новой покупке.
						</p>
					</div>
				</motion.div>

				{/* Card 3: Recycling (White Theme) */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.2 }}
					// UPDATED: bg-white (или просто отличный от фона цвет)
					className="bg-white rounded-3xl p-8 hidden flex-col justify-between group min-h-[200px] border border-forest/5">
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

				{/* Card 4: Timing (Accent/Green Theme or Light) */}
				{/* Здесь можно сделать темно-зеленый блок для контраста или светлый. 
                    Давайте сделаем темно-зеленый (accent), чтобы разбавить "белизну" */}
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.6, delay: 0.3 }}
					// UPDATED: bg-forest text-cream
					className="md:col-span-2 bg-forest rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6 border border-forest/10 relative overflow-hidden group">
					{/* Abstract Map Background (Light pattern) */}
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
									stroke="white" // stroke-white так как фон темный
									strokeWidth="0.5"
								/>
							</pattern>
							<rect width="100%" height="100%" fill="url(#grid)" />
						</svg>
					</div>

					<div className="relative z-10 flex gap-6 items-center w-full">
						{/* UPDATED: bg-white/10 text-gold */}
						<div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-gold">
							<CalendarClock size={28} />
						</div>
						<div>
							{/* UPDATED: text-cream text-white/50 */}
							<h3 className="text-xl font-serif text-cream mb-1">
								Доставка день в день
							</h3>
							<p className="text-white/50 text-sm">
								Доставка работает только в городе Алматы
							</p>
						</div>
					</div>
				</motion.div>
			</div>
		</section>
	);
}
