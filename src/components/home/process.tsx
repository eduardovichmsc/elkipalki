"use client";
import { useRef } from "react";
import { motion, useScroll } from "framer-motion";
import Image from "next/image";
import { Check } from "lucide-react";

const steps = [
	{
		num: "01",
		title: "Выбор в питомнике",
		desc: "Каждая елка отбирается вручную нашими специалистами в Дании за 2 месяца до Рождества. Мы ищем идеальную симметрию, густоту хвои и насыщенный цвет.",
	},
	{
		num: "02",
		title: "Бережная доставка",
		desc: "Деревья перевозятся в специальных климатических камерах при температуре +2°C в спящем режиме. Это позволяет сохранить свежесть хвои до 2 месяцев.",
	},
	{
		num: "03",
		title: "Установка и Сервис",
		desc: "Наш курьер в белых перчатках не просто привезет елку. Он установит её в подставку, выровняет по уровню и уберет за собой все упаковочные материалы.",
	},
];

export default function Process() {
	const container = useRef(null);
	useScroll({
		target: container,
		offset: ["start start", "end end"],
	});

	return (
		<section ref={container} className="relative bg-cream text-forest">
			{/* Sticky Image Section (Левая часть / Фон) */}
			<div className="sticky top-0 h-screen w-full overflow-hidden">
				<div className="absolute inset-0 w-full h-full md:w-1/2 bg-forest">
					<Image
						src="https://images.unsplash.com/photo-1543258103-a62bdc069871?q=80&w=2574&auto=format&fit=crop"
						alt="Atmospheric Forest"
						fill
						priority
						className="object-cover opacity-90"
						sizes="(max-width: 768px) 100vw, 50vw"
					/>
					<div className="absolute inset-0 from-forest/80 to-transparent md:hidden" />
					<div className="absolute inset-0 bg-black/10 mix-blend-multiply" />
				</div>

				{/* Правая часть */}
				<div className="absolute right-0 top-0 w-full md:w-1/2 h-full flex flex-col justify-center px-6 md:px-24 bg-cream hidden md:flex">
					{/* Декоративная линия */}
					<div className="absolute left-0 top-12 bottom-12 w-[1px] bg-forest/5" />
				</div>
			</div>

			{/* Scrolling Content Overlay (Скроллящийся контент) */}
			<div className="relative z-10 mt-[-100vh]">
				<div className="grid grid-cols-1 md:grid-cols-2">
					{/* Пустая колонка слева (чтобы не перекрывать картинку на десктопе) */}
					<div className="hidden md:block" />

					{/* Колонка с текстом справа */}
					<div className="py-24 md:py-0">
						{steps.map((step, i) => (
							<div
								key={i}
								className="h-[75vh] flex flex-col justify-center px-6 md:px-24">
								{/* Карточка для мобилки с блюром, для десктопа прозрачная */}
								<motion.div
									initial={{ opacity: 0, y: 50 }}
									whileInView={{ opacity: 1, y: 0 }}
									transition={{ duration: 0.8, ease: "easeOut" }}
									viewport={{ once: true, margin: "-10%" }}
									className="bg-cream/90 backdrop-blur-md md:bg-transparent md:backdrop-blur-none p-8 md:p-0 rounded-2xl md:rounded-none shadow-xl md:shadow-none border border-forest/5 md:border-none">
									<span className="text-gold font-serif text-6xl md:text-8xl opacity-30 mb-4 block select-none">
										{step.num}
									</span>
									<h3 className="text-3xl md:text-5xl font-serif mb-6 text-forest leading-tight">
										{step.title}
									</h3>
									<p className="text-forest/70 leading-relaxed text-lg font-sans max-w-md">
										{step.desc}
									</p>
								</motion.div>
							</div>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}
