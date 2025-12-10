"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Star, Truck, ShieldCheck } from "lucide-react";
import { Product } from "@/types/product";
import { PATHS } from "@/config/paths";
import Accordion from "@/components/accordion";
import ProductCard from "@/components/catalog/card";
import FavoriteButton from "@/components/ui/favorite_button";
import { useCartStore } from "@/store/cart";
import TransitionLink from "@/components/ui/link";
import { BASE } from "@/config";

interface ProductPageClientProps {
	product: Product;
	relatedProducts: Product[];
}

export default function ProductPageClient({
	product,
	relatedProducts,
}: ProductPageClientProps) {
	const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
	const { addItem } = useCartStore();

	return (
		<div className="pt-32 pb-24 px-6 md:px-12 mx-auto">
			{/* Back Button */}
			<div className="mb-8">
				<TransitionLink
					href={PATHS.CATALOG}
					className="inline-flex items-center gap-2 text-white/40 hover:text-gold transition-colors text-xs uppercase tracking-widest">
					<ArrowLeft size={14} /> Back to Catalog
				</TransitionLink>
			</div>

			<div className="flex flex-col lg:flex-row gap-12 lg:gap-24">
				{/* --- LEFT COLUMN: IMAGES (SCROLLABLE) --- */}
				<motion.div
					initial={{ opacity: 0, y: 50 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="lg:w-[60%] space-y-4">
					{/* Main Image */}
					<div className="relative aspect-4/5 w-full overflow-hidden rounded-sm bg-pine/30">
						<Image
							src={product.images?.main || "/placeholder.jpg"} // Заглушка на всякий случай
							alt={product.name}
							fill
							className="object-cover"
							priority
							sizes="(max-width: 768px) 100vw, 60vw"
						/>
					</div>

					{/* Grid of details */}
					<div className="grid grid-cols-2 gap-4">
						{product.images.hover && (
							<div className="relative aspect-square overflow-hidden rounded-sm bg-pine/30">
								<Image
									src={product.images.hover}
									alt="Detail"
									fill
									className="object-cover hover:scale-105 transition-transform duration-700"
								/>
							</div>
						)}
						{/* Placeholder for gallery if empty */}
						<div className="relative aspect-square bg-[#133326] flex items-center justify-center p-8 text-center">
							<p className="text-white/20 font-serif italic text-xl">
								"Every tree has a soul meant to light up your home."
							</p>
						</div>
					</div>
				</motion.div>

				{/* --- RIGHT COLUMN: INFO (STICKY) --- */}
				<div className="lg:w-[40%] relative">
					<motion.div
						initial={{ opacity: 0, x: 20 }}
						animate={{ opacity: 1, x: 0 }}
						transition={{ duration: 0.8, delay: 0.2 }}
						className="sticky top-32">
						{/* Header */}
						<div className="mb-8 border-b border-white/10 pb-8">
							<div className="flex items-center gap-2 mb-2">
								<span className="text-gold text-xs font-bold uppercase tracking-widest">
									{product.tags?.includes("bestseller")
										? "Bestseller"
										: "Premium Collection"}
								</span>
								<div className="h-px w-8 bg-gold/30"></div>
								<span className="text-white/40 font-serif italic">
									{product.latinName}
								</span>
							</div>

							<h1 className="text-5xl md:text-7xl font-serif text-cream mb-4 leading-[0.9]">
								{product.name}
							</h1>

							<div className="flex items-end justify-between">
								<div className="text-3xl font-sans text-cream">
									{new Intl.NumberFormat("ru-RU").format(selectedSize.price)}{" "}
									{BASE.currency}
								</div>
								{/* <div className="flex items-center gap-1 text-gold text-sm">
									<Star size={14} fill="currentColor" />
									<Star size={14} fill="currentColor" />
									<Star size={14} fill="currentColor" />
									<Star size={14} fill="currentColor" />
									<Star size={14} fill="currentColor" />
									<span className="ml-2 text-white/30 text-xs underline decoration-white/20 underline-offset-4">
										(42 отзыва)
									</span>
								</div> */}
							</div>
						</div>

						{/* Description */}
						<p className="text-white/70 font-sans leading-relaxed mb-10">
							{product.description}
						</p>

						{/* Size Selector */}
						<div className="mb-10">
							<span className="text-white/40 text-xs uppercase tracking-widest mb-4 block">
								Выберите высоту
							</span>
							<div className="grid grid-cols-2 md:grid-cols-3 gap-3">
								{product.sizes.map((size) => (
									<button
										key={size.id}
										onClick={() => setSelectedSize(size)}
										disabled={!size.available}
										className={`
                                    relative py-3 px-2 border rounded-sm text-sm transition-all duration-300
                                    ${
																			selectedSize.id === size.id
																				? "border-gold text-gold bg-gold/5"
																				: "border-white/5 text-white/60 hover:border-white/30"
																		}
                                    ${
																			!size.available
																				? "opacity-40 cursor-not-allowed line-through"
																				: ""
																		}
                                `}>
										{size.height}
										{selectedSize.id === size.id && (
											<motion.div
												layoutId="active-size"
												className="absolute inset-0 border border-gold shadow-[0_0_15px_rgba(212,175,55,0.2)]"
											/>
										)}
									</button>
								))}
							</div>
							{selectedSize.id === "s3" && (
								<p className="mt-3 text-gold text-[10px] uppercase tracking-widest flex items-center gap-2">
									<ShieldCheck size={12} /> Подходит для высоких потолков (от
									3м)
								</p>
							)}
						</div>

						<div className="flex gap-4 mb-12">
							<button
								onClick={() => addItem(product, selectedSize)}
								disabled={!selectedSize.available}
								className="
    flex-1 py-4 rounded-full
    border border-white/20 bg-transparent
    text-cream text-xs font-bold uppercase tracking-[0.2em]
    transition-all duration-300
    hover:bg-gold hover:border-gold hover:text-forest
    active:scale-95
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-cream disabled:hover:border-white/20
  ">
								{selectedSize.available
									? "Добавить в корзину"
									: "Нет в наличии"}
							</button>

							<div className="w-14 h-14 border border-white/20 rounded-full flex items-center justify-center hover:border-gold transition-colors">
								<FavoriteButton
									product={product}
									iconSize={24}
									className="w-full h-full rounded-full"
								/>
							</div>
						</div>

						{/* Details Accordion */}
						<div className="mb-12">
							<Accordion title="Характеристики" defaultOpen>
								<ul className="grid grid-cols-2 gap-y-2">
									<li>
										<span className="opacity-50">Страна:</span>{" "}
										{product.specs.origin}
									</li>
									<li>
										<span className="opacity-50">Цвет:</span>{" "}
										{product.specs.color}
									</li>
									<li>
										<span className="opacity-50">Иголки:</span>{" "}
										{product.specs.needleSoftness === "Soft"
											? "Мягкие"
											: "Жесткие"}
									</li>
									<li>
										<span className="opacity-50">Свежесть:</span> до 60 дней
									</li>
								</ul>
							</Accordion>
							<Accordion title="Уход за деревом">
								<p>
									Держите елку вдали от батарей. Используйте нашу подставку с
									резервуаром для воды и добавляйте специальный раствор (идет в
									комплекте) каждые 2 дня.
								</p>
							</Accordion>
							<Accordion title="Доставка и Установка">
								<div className="flex items-start gap-3">
									<Truck size={20} className="text-gold mt-1 shrink-0" />
									<p>
										Бесплатная доставка по Москве в пределах МКАД. Установка
										занимает 15 минут. Мы уберем весь мусор после монтажа.
									</p>
								</div>
							</Accordion>
						</div>
					</motion.div>
				</div>
			</div>

			{/* --- RELATED PRODUCTS --- */}
			<section className="mt-32 border-t border-white/10 pt-24">
				<div className="flex justify-between items-end mb-12">
					<h2 className="text-4xl font-serif text-cream">
						Вам может понравиться
					</h2>
					<TransitionLink
						href={PATHS.CATALOG}
						className="text-gold underline underline-offset-4 text-xs uppercase tracking-widest">
						Смотреть все
					</TransitionLink>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{relatedProducts.map((p, i) => (
						<ProductCard key={p.id} product={p} index={i} />
					))}
					{/* Fake 'Design Service' card to fill space if needed */}
					<div className="bg-[#133326] flex flex-col items-center justify-center text-center p-8 group cursor-pointer border border-transparent hover:border-white/10 transition-colors">
						<h3 className="text-2xl font-serif text-gold mb-4 italic">
							Индивидуальный заказ
						</h3>
						<p className="text-white/50 text-sm max-w-xs mb-6">
							Нужна елка выше 4 метров или особый сорт? Мы привезем под заказ.
						</p>
						<span className="uppercase tracking-widest text-xs border-b border-white/20 pb-1 group-hover:border-gold group-hover:text-gold transition-colors">
							Связаться с менеджером
						</span>
					</div>
				</div>
			</section>
		</div>
	);
}
