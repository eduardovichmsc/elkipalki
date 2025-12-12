"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/catalog/card";
import PromoCard from "@/components/catalog/promo";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import { PATHS } from "@/config/paths";
import { Category, Product } from "@/types/product";
import TransitionLink from "@/components/ui/link";

interface CatalogClientProps {
	products: Product[];
	categories: Category[];
}

export default function CatalogClient({
	products,
	categories,
}: CatalogClientProps) {
	const [activeFilter, setActiveFilter] = useState<string>("all");
	const [isSortOpen, setIsSortOpen] = useState(false);
	const [sortOrder, setSortOrder] = useState<"price-asc" | "price-desc">(
		"price-asc"
	);

	const filters = useMemo(() => {
		const allOption = { id: "all", label: "Вся коллекция" };
		const categoryOptions = categories.map((cat) => ({
			id: cat.slug,
			label: cat.title,
		}));
		return [allOption, ...categoryOptions];
	}, [categories]);

	const filteredProducts = useMemo(() => {
		let result = products;
		if (activeFilter !== "all") {
			result = products.filter((p) => p.category?.slug === activeFilter);
		}
		return [...result].sort((a, b) => {
			if (sortOrder === "price-asc")
				return (a.startPrice || 0) - (b.startPrice || 0);
			return (b.startPrice || 0) - (a.startPrice || 0);
		});
	}, [activeFilter, sortOrder, products]);

	const getCount = (filterId: string) => {
		if (filterId === "all") return products.length;
		return products.filter((p) => p.category?.slug === filterId).length;
	};

	return (
		<>
			{/* --- HERO SECTION --- */}
			<section className="pt-32 pb-12 px-6 md:px-12">
				{/* Breadcrumbs: text-forest/40 */}
				<div className="flex items-center gap-2 text-xs uppercase tracking-widest text-forest/40 mb-8 font-mono">
					<TransitionLink
						href={PATHS.HOME}
						className="hover:text-forest transition-colors">
						Home
					</TransitionLink>
					<span>/</span>
					<span className="text-forest">Catalog</span>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					// Border: border-forest/10
					className="border-b border-forest/10 pb-12">
					<div className="flex flex-col md:flex-row justify-between items-start gap-8">
						<div>
							<span className="text-forest uppercase tracking-widest text-xs font-bold mb-4 block">
								Collection {new Date().getFullYear()}
							</span>
							{/* Heading: text-forest */}
							<h1 className="text-5xl md:text-8xl font-serif text-forest leading-[0.9]">
								Каталог <span className="italic text-forest/20">Елей</span>
							</h1>
						</div>

						{/* Description: text-forest/60 */}
						<p className="text-forest/60 max-w-sm leading-relaxed text-sm md:text-base text-left">
							Каждое дерево отобрано вручную в европейских питомниках. Мы
							гарантируем идеальную коническую форму и стойкость.
						</p>
					</div>
				</motion.div>
			</section>

			{/* --- CONTROLS & GRID --- */}
			<section className="px-6 md:px-12 pb-24 relative z-10">
				{/* Sticky Filter Bar */}
				<div className="sticky top-6 z-40 mb-16">
					{/* Bar BG: bg-cream/80 backdrop-blur, Border: border-forest/5 */}
					<div className="bg-cream/80 backdrop-blur-xl border border-forest/5 rounded-2xl md:rounded-full px-2 md:px-4 py-2 flex flex-col md:flex-row justify-between items-stretch md:items-center shadow-2xl shadow-forest/5 gap-2 md:gap-0">
						{/* 1. MOBILE SELECT */}
						<div className="relative block md:hidden w-full">
							<select
								value={activeFilter}
								onChange={(e) => setActiveFilter(e.target.value)}
								// Select styles: bg-forest/5, text-forest, border-forest/10
								className="w-full appearance-none bg-forest/5 text-forest border border-forest/10 rounded-xl px-4 py-3 text-xs uppercase tracking-widest focus:outline-none focus:border-gold transition-colors">
								{filters.map((filter) => (
									// Option bg must be solid for visibility
									<option
										key={filter.id}
										value={filter.id}
										className="bg-cream text-forest">
										{filter.label} ({getCount(filter.id)})
									</option>
								))}
							</select>
							<div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-forest/50">
								<ChevronDown size={14} />
							</div>
						</div>

						{/* 2. DESKTOP BUTTONS */}
						<div className="hidden md:flex flex-wrap gap-1">
							{filters.map((filter) => (
								<button
									key={filter.id}
									onClick={() => setActiveFilter(filter.id)}
									className={`relative px-4 md:px-6 py-2 rounded-full text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 group
                    ${
											activeFilter === filter.id
												? // Active: bg-forest text-cream (инверсия)
													"bg-forest text-cream shadow-lg"
												: // Inactive: text-forest/60 hover:bg-forest/5
													"text-forest/60 hover:text-forest hover:bg-forest/5"
										}`}>
									{filter.label}
									<span
										className={`text-[9px] opacity-50 ${
											activeFilter === filter.id ? "text-cream" : "text-forest"
										}`}>
										{getCount(filter.id)}
									</span>
								</button>
							))}
						</div>

						{/* Sort Dropdown */}
						<div className="relative flex justify-end px-2">
							<button
								onClick={() => setIsSortOpen(!isSortOpen)}
								className="flex items-center gap-2 text-xs uppercase tracking-widest text-forest/70 hover:text-forest transition-colors px-2 md:px-4 py-2">
								<SlidersHorizontal size={14} />
								<span className="hidden md:inline w-24 text-right">
									{sortOrder === "price-asc"
										? "Сначала дешевле"
										: "Сначала дороже"}
								</span>
								<span className="md:hidden">{sortOrder}</span>
								<ChevronDown
									size={14}
									className={`transition-transform ${
										isSortOpen ? "rotate-180" : ""
									}`}
								/>
							</button>

							<AnimatePresence>
								{isSortOpen && (
									<motion.div
										initial={{ opacity: 0, y: 10, scale: 0.95 }}
										animate={{ opacity: 1, y: 0, scale: 1 }}
										exit={{ opacity: 0, y: 10, scale: 0.95 }}
										// Dropdown BG: bg-white (или bg-[#EAE7E0]), Border: border-forest/10
										className="block absolute top-full right-0 mt-2 w-48 bg-white border border-forest/10 rounded-xl overflow-hidden shadow-xl py-2 z-50">
										<button
											onClick={() => {
												setSortOrder("price-asc");
												setIsSortOpen(false);
											}}
											// Items: text-forest/70 hover:bg-forest/5
											className="relative w-full text-left px-4 py-3 text-xs uppercase tracking-widest hover:bg-forest/5 text-forest/70 hover:text-forest transition-colors">
											Сначала дешевле
										</button>
										<button
											onClick={() => {
												setSortOrder("price-desc");
												setIsSortOpen(false);
											}}
											className="relative w-full text-left px-4 py-3 text-xs uppercase tracking-widest hover:bg-forest/5 text-forest/70 hover:text-forest transition-colors">
											Сначала дороже
										</button>
									</motion.div>
								)}
							</AnimatePresence>
						</div>
					</div>
				</div>

				{/* Product Grid */}
				<motion.div
					layout
					className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 md:gap-y-24">
					<AnimatePresence mode="popLayout">
						{filteredProducts.length > 0 ? (
							filteredProducts.map((product, index) => {
								const showPromo = activeFilter === "all" && index === 1;

								return (
									<div key={product.id} className="contents">
										{/* Передаем тему в карточку, если она поддерживает проп theme, или надеемся на глобальные стили, 
                        но лучше убедиться, что ProductCard использует text-forest, если он на светлом фоне */}
										<ProductCard product={product} index={index} />
										{showPromo && <PromoCard />}
									</div>
								);
							})
						) : (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="col-span-full py-32 text-center">
								<p className="text-2xl font-serif text-forest/30 mb-4">
									В этой категории пока пусто
								</p>
								<button
									onClick={() => setActiveFilter("all")}
									className="text-forest underline underline-offset-4 uppercase tracking-widest text-xs">
									Вернуться ко всем
								</button>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>
			</section>
		</>
	);
}
