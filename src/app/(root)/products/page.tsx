"use client";
import { useState, useMemo } from "react";
import ProductCard from "@/components/catalog/card";
import PromoCard from "@/components/catalog/promo";
import { products } from "@/data/products";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { PATHS } from "@/config/paths";

type FilterType = "all" | "bestseller" | "new" | "limited";

const filters: { id: FilterType; label: string }[] = [
	{ id: "all", label: "Вся коллекция" },
	{ id: "bestseller", label: "Бестселлеры" },
	{ id: "new", label: "Новинки" },
	{ id: "limited", label: "Limited Edition" },
];

export default function CatalogPage() {
	const [activeFilter, setActiveFilter] = useState<FilterType>("all");
	const [isSortOpen, setIsSortOpen] = useState(false);
	const [sortOrder, setSortOrder] = useState<"price-asc" | "price-desc">(
		"price-asc"
	);

	// 1. Фильтрация
	const filteredProducts = useMemo(() => {
		let result = products;
		if (activeFilter !== "all") {
			result = products.filter((p) => p.tags?.includes(activeFilter as any));
		}
		// 2. Сортировка
		return [...result].sort((a, b) => {
			if (sortOrder === "price-asc") return a.startPrice - b.startPrice;
			return b.startPrice - a.startPrice;
		});
	}, [activeFilter, sortOrder]);

	// Подсчет количества товаров для каждого фильтра
	const getCount = (filterId: FilterType) => {
		if (filterId === "all") return products.length;
		return products.filter((p) => p.tags?.includes(filterId as any)).length;
	};

	return (
		<main className="min-h-screen bg-forest">
			{/* --- HERO SECTION --- */}
			<section className="pt-32 pb-12 px-6 md:px-24">
				{/* Breadcrumbs */}
				<div className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/30 mb-8 font-mono">
					<Link href={PATHS.HOME} className="hover:text-gold transition-colors">
						Home
					</Link>
					<span>/</span>
					<span className="text-gold">Catalog</span>
				</div>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8 }}
					className="border-b border-white/10 pb-12">
					<div className="flex flex-col md:flex-row justify-between items-end gap-8">
						<div>
							<span className="text-gold uppercase tracking-widest text-xs font-bold mb-4 block">
								Collection 2024
							</span>
							<h1 className="text-5xl md:text-8xl font-serif text-cream leading-[0.9]">
								Каталог <span className="italic text-white/20">Елей</span>
							</h1>
						</div>

						<p className="text-white/50 max-w-sm leading-relaxed text-sm md:text-base text-right md:text-left">
							Каждое дерево отобрано вручную в европейских питомниках. Мы
							гарантируем идеальную коническую форму и стойкость.
						</p>
					</div>
				</motion.div>
			</section>

			{/* --- CONTROLS & GRID --- */}
			<section className="px-6 md:px-24 pb-24 relative z-10">
				{/* Filter Bar Sticky */}
				<div className="sticky top-6 z-40 mb-16">
					<div className="bg-forest/80 backdrop-blur-xl border border-white/10 rounded-full px-2 py-2 flex flex-wrap justify-between items-center shadow-2xl">
						{/* Filters */}
						<div className="flex flex-wrap gap-1">
							{filters.map((filter) => (
								<button
									key={filter.id}
									onClick={() => setActiveFilter(filter.id)}
									className={`relative px-4 md:px-6 py-2 rounded-full text-[10px] md:text-xs uppercase tracking-widest transition-all duration-300 flex items-center gap-2 group
                            ${
															activeFilter === filter.id
																? "bg-cream text-forest shadow-lg"
																: "text-white/60 hover:text-white hover:bg-white/5"
														}`}>
									{filter.label}
									<span
										className={`text-[9px] opacity-50 ${
											activeFilter === filter.id ? "text-forest" : "text-gold"
										}`}>
										{getCount(filter.id)}
									</span>
								</button>
							))}
						</div>

						{/* Sort Dropdown */}
						<div className="relative hidden md:block px-2">
							<button
								onClick={() => setIsSortOpen(!isSortOpen)}
								className="flex items-center gap-2 text-xs uppercase tracking-widest text-white/70 hover:text-gold transition-colors px-4 py-2">
								<SlidersHorizontal size={14} />
								<span className="w-24 text-right">
									{sortOrder === "price-asc"
										? "Сначала дешевле"
										: "Сначала дороже"}
								</span>
								<ChevronDown
									size={14}
									className={`transition-transform ${
										isSortOpen ? "rotate-180" : ""
									}`}
								/>
							</button>

							{/* Dropdown Menu */}
							<AnimatePresence>
								{isSortOpen && (
									<motion.div
										initial={{ opacity: 0, y: 10, scale: 0.95 }}
										animate={{ opacity: 1, y: 0, scale: 1 }}
										exit={{ opacity: 0, y: 10, scale: 0.95 }}
										className="absolute top-full right-0 mt-2 w-48 bg-[#1A4231] border border-white/10 rounded-xl overflow-hidden shadow-xl py-2">
										<button
											onClick={() => {
												setSortOrder("price-asc");
												setIsSortOpen(false);
											}}
											className={`w-full text-left px-4 py-3 text-xs uppercase tracking-widest hover:bg-white/5 transition-colors ${
												sortOrder === "price-asc"
													? "text-gold"
													: "text-white/70"
											}`}>
											Сначала дешевле
										</button>
										<button
											onClick={() => {
												setSortOrder("price-desc");
												setIsSortOpen(false);
											}}
											className={`w-full text-left px-4 py-3 text-xs uppercase tracking-widest hover:bg-white/5 transition-colors ${
												sortOrder === "price-desc"
													? "text-gold"
													: "text-white/70"
											}`}>
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
							<>
								{filteredProducts.map((product, index) => {
									// Вставляем PromoCard после 2-го элемента (визуально будет 3-м блоком)
									// Но только если фильтр "Все"
									const showPromo = activeFilter === "all" && index === 1;

									return (
										<>
											<ProductCard
												key={product.id}
												product={product}
												index={index}
											/>
											{showPromo && <PromoCard key="promo-card" />}
										</>
									);
								})}
							</>
						) : (
							<motion.div
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								className="col-span-full py-32 text-center">
								<p className="text-2xl font-serif text-white/30 mb-4">
									В этой категории пока пусто
								</p>
								<button
									onClick={() => setActiveFilter("all")}
									className="text-gold underline underline-offset-4 uppercase tracking-widest text-xs">
									Вернуться ко всем
								</button>
							</motion.div>
						)}
					</AnimatePresence>
				</motion.div>

				{/* Infinite Scroll Trigger (Visual) */}
				{filteredProducts.length > 0 && (
					<div className="mt-32 flex justify-center">
						<div className="relative">
							<div className="absolute inset-0 bg-gold blur-xl opacity-20" />
							<button className="relative border border-white/20 px-8 py-4 rounded-full text-xs uppercase tracking-[0.2em] hover:bg-cream hover:text-forest transition-all duration-500">
								Загрузить еще
							</button>
						</div>
					</div>
				)}
			</section>
		</main>
	);
}
