"use client";

import { useState, useMemo } from "react";
import ProductCard from "@/components/catalog/card"; // Проверь путь импорта
import PromoCard from "@/components/catalog/promo"; // Проверь путь импорта
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { PATHS } from "@/config/paths";
import { Category, Product } from "@/types/product"; // Импортируем тип

// Типы фильтров
type FilterType = "all" | "bestseller" | "new" | "limited";

const filters: { id: FilterType; label: string }[] = [
	{ id: "all", label: "Вся коллекция" },
	{ id: "bestseller", label: "Бестселлеры" },
	{ id: "new", label: "Новинки" },
	{ id: "limited", label: "Limited Edition" },
];

interface CatalogClientProps {
	products: Product[];
	categories: Category[];
}

export default function CatalogClient({
	products,
	categories,
}: CatalogClientProps) {
	// activeFilter теперь хранит slug категории (строка) или 'all'
	const [activeFilter, setActiveFilter] = useState<string>("all");
	const [isSortOpen, setIsSortOpen] = useState(false);
	const [sortOrder, setSortOrder] = useState<"price-asc" | "price-desc">(
		"price-asc"
	);

	// 1. Формируем список фильтров динамически
	// Сначала "Вся коллекция", потом список из Sanity
	const filters = useMemo(() => {
		const allOption = { id: "all", label: "Вся коллекция" };
		const categoryOptions = categories.map((cat) => ({
			id: cat.slug,
			label: cat.title,
		}));
		return [allOption, ...categoryOptions];
	}, [categories]);

	// 2. Фильтрация
	const filteredProducts = useMemo(() => {
		let result = products;

		if (activeFilter !== "all") {
			// Фильтруем по слагу категории
			result = products.filter((p) => p.category?.slug === activeFilter);
		}

		// Сортировка
		return [...result].sort((a, b) => {
			if (sortOrder === "price-asc")
				return (a.startPrice || 0) - (b.startPrice || 0);
			return (b.startPrice || 0) - (a.startPrice || 0);
		});
	}, [activeFilter, sortOrder, products]);

	// Подсчет количества товаров для бейджиков
	const getCount = (filterId: string) => {
		if (filterId === "all") return products.length;
		return products.filter((p) => p.category?.slug === filterId).length;
	};

	return (
		<>
			{/* --- HERO SECTION --- */}
			<section className="pt-32 pb-12 px-6 md:px-24">
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
								Collection {new Date().getFullYear()}
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
				{/* Sticky Filter Bar */}
				<div className="top-6 z-40 mb-16">
					<div className="bg-forest/80 backdrop-blur-xl border border-white/10 rounded-full px-2 py-2 flex flex-wrap justify-between items-center shadow-2xl">
						{/* Filters (Dynamic) */}
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
									className={`transition-transform ${isSortOpen ? "rotate-180" : ""}`}
								/>
							</button>

							<AnimatePresence>
								{isSortOpen && (
									<motion.div
										initial={{ opacity: 0, y: 10, scale: 0.95 }}
										animate={{ opacity: 1, y: 0, scale: 1 }}
										exit={{ opacity: 0, y: 10, scale: 0.95 }}
										className="block absolute top-full right-0 mt-2 w-48 bg-[#1A4231] border border-white/10 rounded-xl overflow-hidden shadow-xl py-2">
										<button
											onClick={() => {
												setSortOrder("price-asc");
												setIsSortOpen(false);
											}}
											className="w-full text-left px-4 py-3 text-xs uppercase tracking-widest hover:bg-white/5 text-white/70 hover:text-gold transition-colors">
											Сначала дешевле
										</button>
										<button
											onClick={() => {
												setSortOrder("price-desc");
												setIsSortOpen(false);
											}}
											className="w-full text-left px-4 py-3 text-xs uppercase tracking-widest hover:bg-white/5 text-white/70 hover:text-gold transition-colors">
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
			</section>
		</>
	);
}
