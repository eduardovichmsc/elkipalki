"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowLeft, Star, ShieldCheck } from "lucide-react";
import { Product } from "@/types/product";
import { PATHS } from "@/config/paths";
import Accordion from "@/components/accordion";
import ProductCard from "@/components/catalog/card";
import FavoriteButton from "@/components/ui/favorite_button";
import { useCartStore } from "@/store/cart";
import TransitionLink from "@/components/ui/link";
import { BASE } from "@/config";

const MANAGER_PHONE = PATHS.CONTACTS.WHATSAPP.title;

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

	const handleWhatsApp = () => {
		let message = `Здравствуйте! Хочу оформить заказ:\n\n`;
		const url = `https://wa.me/${MANAGER_PHONE}?text=${encodeURIComponent(message)}`;
		window.open(url, "_blank");
	};

	return (
		<div className="pt-32 pb-24 px-6 md:px-12 mx-auto">
			{/* Back Button */}
			<div className="mb-8">
				<TransitionLink
					href={PATHS.CATALOG}
					// UPDATED: text-forest/40 hover:text-gold
					className="inline-flex items-center gap-2 text-forest/40 hover:text-gold transition-colors text-xs uppercase tracking-widest">
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
					{/* UPDATED: bg-forest/5 */}
					<div className="relative aspect-4/5 w-full overflow-hidden rounded-sm bg-forest/5">
						<Image
							src={product.images?.main || "/placeholder.jpg"}
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
							// UPDATED: bg-forest/5
							<div className="relative aspect-square overflow-hidden rounded-sm bg-forest/5">
								<Image
									src={product.images.hover}
									alt="Detail"
									fill
									className="object-cover hover:scale-105 transition-transform duration-700"
								/>
							</div>
						)}
						{/* Placeholder for gallery if empty */}
						{/* UPDATED: bg-forest/5 text-forest */}
						<div className="relative aspect-square bg-forest/5 flex items-center justify-center p-8 text-center">
							{/* UPDATED: text-forest/20 */}
							<p className="text-forest font-serif italic text-xl">
								«Каждое дерево имеет душу, предназначенную освещать ваш дом.»
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
						{/* UPDATED: border-forest/10 */}
						<div className="mb-8 border-b border-forest/10 pb-8">
							<div className="flex items-center gap-2 mb-2">
								{/* UPDATED: text-forest */}
								<span className="text-forest text-xs font-bold uppercase tracking-widest">
									{product.tags?.includes("bestseller")
										? "Бестселлер"
										: "Премиальная коллекция"}
								</span>
								{/* UPDATED: bg-forest/30 */}
								<div className="h-px w-8 bg-forest/30"></div>
								{/* UPDATED: text-forest/40 */}
								<span className="text-forest/40 font-serif italic">
									{product.latinName}
								</span>
							</div>

							{/* UPDATED: text-forest */}
							<h1 className="text-5xl md:text-7xl font-serif text-forest mb-4 leading-[0.9]">
								{product.name}
							</h1>

							<div className="flex items-end justify-between">
								{/* UPDATED: text-forest */}
								<div className="text-3xl font-sans text-forest">
									{new Intl.NumberFormat("ru-RU").format(selectedSize.price)}{" "}
									{BASE.currency}
								</div>
							</div>
						</div>

						{/* Description */}
						{/* UPDATED: text-forest/70 */}
						<p className="text-forest/70 font-sans leading-relaxed mb-10">
							{product.description}
						</p>

						{/* Size Selector */}
						<div className="mb-10">
							{/* UPDATED: text-forest/40 */}
							<span className="text-forest/40 text-xs uppercase tracking-widest mb-4 block">
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
																				? // UPDATED: border-forest text-forest bg-forest/5
																					"border-forest text-forest bg-forest/5"
																				: // UPDATED: border-forest/5 text-forest/60 hover:border-forest/30
																					"border-forest/5 text-forest/60 hover:border-forest/30"
																		}
                                    ${
																			!size.available
																				? "opacity-40 cursor-not-allowed line-through"
																				: ""
																		}
                                `}>
										{size.height}
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
								// UPDATED:
								// border-forest/20 text-forest
								// hover:bg-forest hover:border-forest hover:text-cream
								className="
                                    flex-1 py-4 rounded-full
                                    border border-forest/20 bg-transparent
                                    text-forest text-xs font-bold uppercase tracking-[0.2em]
                                    transition-all duration-300
                                    hover:bg-forest hover:border-forest hover:text-cream
                                    active:scale-95
                                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-forest disabled:hover:border-forest/20
                                ">
								{selectedSize.available
									? "Добавить в корзину"
									: "Нет в наличии"}
							</button>

							{/* UPDATED: border-forest/20 hover:border-forest */}
							<div className="w-14 h-14 border border-forest/20 rounded-full flex items-center justify-center hover:border-forest transition-colors">
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
								<p>Держите елку вдали от батарей.</p>
							</Accordion>
							<Accordion title="Доставка и Установка">
								<div className="flex items-start gap-3">
									<p>
										Доставка и установка платная, по городу Алматы. Цена 15000₸
									</p>
								</div>
							</Accordion>
						</div>
					</motion.div>
				</div>
			</div>

			{/* --- RELATED PRODUCTS --- */}
			{/* UPDATED: border-forest/10 */}
			<section className="mt-32 border-t border-forest/10 pt-24">
				<div className="flex justify-between items-end mb-12">
					{/* UPDATED: text-forest */}
					<h2 className="text-4xl font-serif text-forest">
						Вам может понравиться
					</h2>
					<TransitionLink
						href={PATHS.CATALOG}
						// UPDATED: text-forest
						className="text-forest underline underline-offset-4 text-xs uppercase tracking-widest">
						Смотреть все
					</TransitionLink>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{relatedProducts.map((p, i) => (
						<ProductCard key={p.id} product={p} index={i} />
					))}
					{/* Fake 'Design Service' card */}
					{/* UPDATED: bg-forest/5 hover:border-forest/10 */}
					<div className="bg-forest/5 flex flex-col items-center justify-center text-center p-8 group cursor-pointer border border-transparent hover:border-forest/10 transition-colors">
						{/* UPDATED: text-forest */}
						<h3 className="text-2xl font-serif text-forest mb-4 italic">
							Индивидуальный заказ
						</h3>
						{/* UPDATED: text-forest/50 */}
						<p className="text-forest/50 text-sm max-w-xs mb-6">
							Нужна елка выше 4 метров или особый сорт? Мы привезем под заказ.
						</p>
						{/* UPDATED: border-forest/20 hover:border-forest hover:text-forest */}
						<button
							onClick={handleWhatsApp}
							className="uppercase tracking-widest text-xs text-forest border-b border-forest/20 pb-1 group-hover:border-forest group-hover:text-forest transition-colors">
							Связаться с менеджером
						</button>
					</div>
				</div>
			</section>
		</div>
	);
}
