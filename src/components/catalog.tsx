"use client";
import { motion } from "framer-motion";
import ProductCard from "@/components/catalog/card";
import Link from "next/link";
import { PATHS } from "@/config/paths";
import { Product } from "@/types";

type Props = {
	products: Product[];
};

export default function Catalog({ products }: Props) {
	const homepageProducts = products.slice(0, 3);

	return (
		// UPDATED: bg-cream
		<section className="py-24 px-6 md:px-12 bg-cream">
			{/* Заголовок секции */}
			{/* UPDATED: border-forest/10 */}
			<div className="flex flex-col md:flex-row justify-between items-end mb-16 border-b border-forest/10 pb-6 gap-4">
				<div>
					{/* UPDATED: text-forest */}
					<h2 className="text-4xl md:text-6xl font-serif text-forest">
						Коллекция 2025 - 2026
					</h2>
					{/* UPDATED: text-forest/40 */}
					<p className="text-forest/40 mt-2 text-sm max-w-md">
						С прекрасным материалом.
					</p>
				</div>

				<div className="flex gap-2 items-center">
					{/* Ссылка на полный каталог */}
					<Link
						href={PATHS.CATALOG}
						// UPDATED: text-forest hover:border-forest
						className="hidden md:block text-forest uppercase tracking-widest text-xs border-b border-transparent hover:border-forest transition-colors">
						Смотреть все
					</Link>
				</div>
			</div>

			{/* Сетка товаров */}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-y-16 gap-x-8">
				{homepageProducts.map((product, i) => (
					<motion.div
						key={product.id}
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true, margin: "-10%" }}
						transition={{
							delay: i * 0.1,
							duration: 0.8,
							ease: [0.22, 1, 0.36, 1],
						}}>
						{/* Используем наш универсальный компонент */}
						<ProductCard product={product} index={i} />
					</motion.div>
				))}
			</div>

			{/* Кнопка "Смотреть все" для мобильных */}
			<div className="mt-12 text-center md:hidden">
				<Link
					href={PATHS.CATALOG}
					// UPDATED: border-forest/20 text-forest hover:bg-forest hover:text-cream
					className="inline-block border border-forest/20 px-8 py-3 rounded-full text-forest text-xs uppercase tracking-widest hover:bg-forest hover:text-cream transition-colors">
					Весь каталог
				</Link>
			</div>
		</section>
	);
}
