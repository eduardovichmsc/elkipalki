"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Product } from "@/types/product";
import { ArrowUpRight } from "lucide-react";
import { PATHS } from "@/config/paths";
import FavoriteButton from "@/components/ui/favorite_button";
import TransitionLink from "../ui/link";
import { BASE } from "@/config";

interface ProductCardProps {
	product: Product;
	index: number;
}

export default function ProductCard({ product, index }: ProductCardProps) {
	return (
		<motion.div
			layout
			initial={{ opacity: 0, y: 20 }}
			animate={{ opacity: 1, y: 0 }}
			exit={{ opacity: 0, scale: 0.9 }}
			transition={{ duration: 0.4, delay: index * 0.05 }}
			className="group cursor-pointer flex flex-col h-full relative">
			<TransitionLink
				href={PATHS.PRODUCT(product.slug)}
				className="block h-full">
				{/* --- Image Container --- */}
				{/* Меняем фон-заглушку на светлый полупрозрачный зеленый */}
				<div className="relative aspect-4/5 overflow-hidden mb-6 bg-forest/5 rounded-sm">
					{/* Badge: Bestseller (Gold) */}
					{product.tags?.includes("bestseller") && (
						<div className="absolute top-4 left-4 z-20 bg-gold text-forest text-[10px] font-bold px-3 py-1 uppercase tracking-widest pointer-events-none">
							Bestseller
						</div>
					)}

					{/* Badge: New Season (White instead of Cream for contrast) */}
					{product.tags?.includes("new") && (
						<div className="absolute top-4 left-4 z-20 bg-white text-forest text-[10px] font-bold px-3 py-1 uppercase tracking-widest pointer-events-none shadow-sm">
							New Season
						</div>
					)}

					{/* Badge: Limited (Dark Green) */}
					{product.tags?.includes("limited") && (
						<div className="absolute top-4 left-4 z-20 bg-[#1A4231] text-forest border border-gold/30 text-[10px] font-bold px-3 py-1 uppercase tracking-widest pointer-events-none">
							Limited
						</div>
					)}

					{/* Кнопка Лайка (Оставляем контрастной, так как она на фото) */}
					<div className="absolute top-4 right-4 z-30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
						<FavoriteButton
							product={product}
							className="w-10 h-10 bg-black/20 backdrop-blur-md rounded-full hover:bg-white text-cream hover:text-forest shadow-lg"
						/>
					</div>

					{/* Images with Hover Effect */}
					<motion.div
						whileHover={{ scale: 1.05 }}
						transition={{ duration: 0.7, ease: [0.33, 1, 0.68, 1] }}
						className="w-full h-full relative">
						{/* Main Image */}
						<Image
							src={product.images?.main || "/placeholder.jpg"}
							alt={product.name}
							fill
							className="object-cover transition-opacity duration-500"
							sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
						/>

						{/* Hover Image */}
						{product.images?.hover && (
							<Image
								src={product.images.hover}
								alt={product.name + " detail"}
								fill
								className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
							/>
						)}

						{/* Dark Overlay on Hover (чтобы текст/кнопки поверх фото были видны) */}
						<div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-500" />
					</motion.div>

					{/* Quick Add Button (White/Cream pop against image) */}
					<div className="absolute bottom-4 right-4 w-10 h-10 bg-white text-forest rounded-full flex items-center justify-center opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-gold hover:text-forest z-20 shadow-lg">
						<ArrowUpRight size={18} />
					</div>
				</div>

				{/* --- Content (Dark Text for Cream Background) --- */}
				<div className="flex flex-col grow">
					<div className="flex justify-between items-start mb-2">
						<div>
							{/* Latin: text-forest/40 */}
							<span className="text-forest/40 text-xs font-serif italic mb-1 block line-clamp-1">
								{product.latinName}
							</span>
							{/* Title: text-forest + hover:text-forest */}
							<h3 className="text-xl md:text-2xl font-serif text-forest group-hover:text-forest transition-colors duration-300 line-clamp-2">
								{product.name}
							</h3>
						</div>

						<div className="shrink-0 text-right">
							{product.startPrice ? (
								/* Price: text-forest */
								<span className="text-forest font-sans text-lg block">
									от {new Intl.NumberFormat("ru-RU").format(product.startPrice)}{" "}
									{BASE.currency}
								</span>
							) : (
								<span className="text-forest/50 font-sans text-sm block">
									Под заказ
								</span>
							)}
						</div>
					</div>

					{/* Decorative Line: bg-forest/10 */}
					<div className="w-full h-px bg-forest/10 my-4 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />

					{/* Available Sizes */}
					{product.sizes && product.sizes.length > 0 && (
						<div className="flex gap-2 mb-4 opacity-60 text-[10px] uppercase tracking-wider text-forest">
							{product.sizes.slice(0, 3).map((s) => (
								<span
									key={s.id}
									className={!s.available ? "line-through text-forest/30" : ""}>
									{s.height.replace(" см", "")}
								</span>
							))}
							{product.sizes.length > 3 && <span>+</span>}
						</div>
					)}

					{/* Desc: text-forest/60 */}
					<p className="text-forest/60 text-sm font-sans leading-relaxed line-clamp-2 mt-auto">
						{product.shortDesc}
					</p>
				</div>
			</TransitionLink>
		</motion.div>
	);
}
