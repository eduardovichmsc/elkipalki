"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";

interface AccordionProps {
	title: string;
	children: React.ReactNode;
	defaultOpen?: boolean;
}

export default function Accordion({
	title,
	children,
	defaultOpen = false,
}: AccordionProps) {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	return (
		// UPDATED: border-forest/10
		<div className="border-b border-forest/10">
			<button
				onClick={() => setIsOpen(!isOpen)}
				className="w-full py-6 flex justify-between items-center text-left group">
				{/* UPDATED: text-forest group-hover:text-forest */}
				<span className="text-lg font-serif text-forest group-hover:text-forest transition-colors">
					{title}
				</span>
				<motion.div
					animate={{ rotate: isOpen ? 45 : 0 }}
					transition={{ duration: 0.3 }}
					// UPDATED: text-forest/50 group-hover:text-forest
					className="text-forest/50 group-hover:text-forest">
					<Plus size={18} />
				</motion.div>
			</button>
			<AnimatePresence initial={false}>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
						className="overflow-hidden">
						{/* UPDATED: text-forest/60 */}
						<div className="pb-6 text-forest/60 font-sans text-sm leading-relaxed max-w-md">
							{children}
						</div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
