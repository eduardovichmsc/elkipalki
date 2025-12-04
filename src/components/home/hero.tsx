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
			className="relative h-screen w-full overflow-hidden flex items-center justify-center">
			{/* Background Parallax */}
			<motion.div style={{ y }} className="absolute inset-0 z-0">
				<Image
					src="https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=2574&auto=format&fit=crop"
					alt="Christmas Atmosphere"
					fill
					className="object-cover opacity-60"
					priority
				/>
				<div className="absolute inset-0 from-forest/30 via-forest/10 to-forest" />
			</motion.div>

			{/* Content */}
			<div className="relative z-10 text-center px-4">
				<div className="overflow-hidden">
					<motion.h1
						initial={{ y: "100%" }}
						animate={{ y: 0 }}
						transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }}
						className="text-[12vw] leading-[0.9] font-serif text-cream mix-blend-overlay">
						Christmas
					</motion.h1>
				</div>
				<div className="overflow-hidden">
					<motion.h1
						initial={{ y: "100%" }}
						animate={{ y: 0 }}
						transition={{ duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.3 }}
						className="text-[12vw] leading-[0.9] font-serif text-gold italic">
						Magic
					</motion.h1>
				</div>

				<motion.p
					style={{ opacity }}
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ delay: 0.8, duration: 0.8 }}
					className="mt-8 text-sm md:text-lg uppercase tracking-[0.2em] font-light max-w-md mx-auto">
					Премиальные живые ели из датских питомников
				</motion.p>
			</div>
		</section>
	);
}
