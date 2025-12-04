"use client";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { useFavoritesStore } from "@/store/favorites";
import { Product } from "@/types/product";
import { useMounted } from "@/hooks/useMounted";
import { cn } from "@/lib/utils";

interface FavoriteButtonProps {
	product: Product;
	className?: string;
	iconSize?: number;
}

export default function FavoriteButton({
	product,
	className,
	iconSize = 20,
}: FavoriteButtonProps) {
	const { toggleItem, hasItem } = useFavoritesStore();
	const isMounted = useMounted();

	const isFavorite = isMounted ? hasItem(product.id) : false;

	return (
		<motion.button
			whileTap={{ scale: 0.8 }}
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				toggleItem(product);
			}}
			className={cn(
				"flex items-center justify-center transition-colors duration-300 z-20",
				isFavorite ? "text-gold" : "text-white/40 hover:text-gold",
				className
			)}>
			<Heart
				size={iconSize}
				fill={isFavorite ? "currentColor" : "none"}
				className="transition-all duration-300"
			/>
		</motion.button>
	);
}
