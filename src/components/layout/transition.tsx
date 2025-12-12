"use client";
import { motion } from "framer-motion";
import { useTransition } from "@/context/transition";
import { useEffect } from "react";
import { BASE } from "@/config";

const slideUp = {
	initial: { y: "115vh" },
	exiting: {
		y: "0vh",
		transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
	},
	entering: {
		y: "-115vh",
		transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] },
	},
} as const;

const opacityText = {
	initial: { opacity: 0, y: 20 },
	exiting: { opacity: 1, y: 0, transition: { delay: 0.2 } },
	entering: { opacity: 0, y: -20 },
} as const;

export default function PageTransitionOverlay() {
	const { timeline } = useTransition();

	return (
		<motion.div
			className="fixed left-0 w-full h-[120vh] -top-[10vh] bg-[#05140e] z-9999 flex items-center justify-center pointer-events-none"
			variants={slideUp}
			initial="initial"
			animate={timeline}>
			<motion.div variants={opacityText} className="text-center">
				<h2 className="text-5xl md:text-7xl font-serif text-cream italic">
					{BASE.logo.text}
				</h2>
				<p className="text-white/30 text-xs uppercase tracking-[0.4em] mt-4">
					Loading Magic
				</p>
			</motion.div>
		</motion.div>
	);
}
