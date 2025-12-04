"use client";
import { Play } from "lucide-react";
import { motion } from "framer-motion";

export default function VideoSection() {
	return (
		<section className="relative w-full h-[80vh] bg-forest overflow-hidden group cursor-pointer">
			<div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-black/20 transition-colors duration-700" />

			<div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1512474932049-782abb8e68b2?q=80&w=2500&auto=format&fit=crop')] bg-cover bg-center bg-fixed transform scale-105 group-hover:scale-100 transition-transform duration-[1.5s]" />

			<div className="relative z-20 w-full h-full flex flex-col items-center justify-center text-cream">
				<motion.div
					whileHover={{ scale: 1.1 }}
					className="w-24 h-24 rounded-full border border-cream/30 backdrop-blur-md flex items-center justify-center mb-8 hover:bg-cream hover:text-forest transition-colors duration-300">
					<Play fill="currentColor" className="ml-1" size={32} />
				</motion.div>

				<h2 className="text-5xl md:text-8xl font-serif italic text-center mix-blend-overlay opacity-90">
					Family Traditions
				</h2>
				<p className="mt-4 text-sm uppercase tracking-[0.3em] opacity-80">
					Смотреть фильм о бренде
				</p>
			</div>
		</section>
	);
}
