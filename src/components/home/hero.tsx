"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function Hero() {
	const containerRef = useRef(null);
	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start start", "end start"],
	});

	const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
	const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

	return (
		<section
			ref={containerRef}
			className="relative h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center">
			{/* Background Parallax */}
			<motion.div style={{ y }} className="absolute inset-0 z-0">
				<Image
					src="https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=2574&auto=format&fit=crop"
					alt="Christmas Atmosphere"
					fill
					className="object-cover opacity-60"
					priority
				/>
				{/* Исправлен градиент: добавлено bg-gradient-to-b */}
				<div className="absolute inset-0 bg-gradient-to-b from-forest/30 via-forest/10 to-forest" />
			</motion.div>

			{/* Content */}
			<div className="relative z-10 text-center px-4 flex flex-col items-center w-full">
				<div className="overflow-hidden w-full">
					<motion.h1
						initial={{ y: "100%" }}
						animate={{ y: 0 }}
						transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
						// Увеличили размер на мобилках до 17vw
						className="text-[17vw] md:text-[12vw] leading-[0.9] font-serif text-cream mix-blend-overlay tracking-tight">
						Christmas
					</motion.h1>
				</div>
				<div className="overflow-hidden w-full -mt-2 md:-mt-6">
					<motion.h1
						initial={{ y: "100%" }}
						animate={{ y: 0 }}
						transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
						// Увеличили размер и добавили padding-right для динамики
						className="text-[17vw] md:text-[12vw] leading-[0.9] font-serif text-gold italic tracking-tighter pr-4 md:pr-0">
						Magic
					</motion.h1>
				</div>

				<motion.p
					style={{ opacity }}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.8, duration: 0.8 }}
					className="mt-8 text-xs md:text-lg uppercase tracking-[0.3em] font-light max-w-[280px] md:max-w-md mx-auto text-cream/80">
					Премиальные живые ели из датских питомников
				</motion.p>
			</div>

			{/* Scroll Indicator (New for Mobile) */}
			<motion.div
				style={{ opacity }}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ delay: 1.5, duration: 1 }}
				className="absolute bottom-12 left-1/2 -translate-x-1/2 flex md:hidden flex-col items-center gap-2">
				<span className="text-[10px] uppercase tracking-widest text-white/40">
					Scroll
				</span>
				<div className="w-px h-12 bg-gradient-to-b from-gold via-white/20 to-transparent">
					<motion.div
						animate={{ y: [0, 48, 48] }}
						transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
						className="w-full h-1/2 bg-gold"
					/>
				</div>
			</motion.div>
		</section>
	);
}
