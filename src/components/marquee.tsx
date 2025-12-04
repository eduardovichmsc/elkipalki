"use client";
import { motion } from "framer-motion";

export default function Marquee() {
	return (
		<div className="w-full py-12 bg-gold overflow-hidden flex whitespace-nowrap">
			<motion.div
				className="flex gap-12 text-forest text-6xl md:text-8xl font-serif italic"
				animate={{ x: "-50%" }}
				transition={{ duration: 20, repeat: Infinity, ease: "linear" }}>
				<span>Merry Christmas</span>
				<span>•</span>
				<span>Happy New Year</span>
				<span>•</span>
				<span>Magic Moments</span>
				<span>•</span>
				<span>Merry Christmas</span>
				<span>•</span>
				<span>Happy New Year</span>
				<span>•</span>
				<span>Magic Moments</span>
				<span>•</span>
			</motion.div>
		</div>
	);
}
