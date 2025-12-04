"use client";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/catalog/card";
import { useFavoritesStore } from "@/store/favorites";
import { useMounted } from "@/hooks/useMounted";
import Link from "next/link";
import { PATHS } from "@/config/paths";

export default function FavoritesPage() {
	const { items } = useFavoritesStore();
	const isMounted = useMounted();

	if (!isMounted) return null;

	return (
		<main className="min-h-screen bg-forest">
			<section className="pt-32 pb-24 px-6 md:px-24">
				<div className="border-b border-white/10 pb-8 mb-16">
					<h1 className="text-5xl md:text-8xl font-serif text-cream mb-4">
						Избранное
					</h1>
					<p className="text-white/50">
						Ваш личный список желаний. {items.length} товаров сохранено.
					</p>
				</div>

				{items.length > 0 ? (
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-16">
						<AnimatePresence>
							{items.map((product, i) => (
								<ProductCard key={product.id} product={product} index={i} />
							))}
						</AnimatePresence>
					</div>
				) : (
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						className="flex flex-col items-center justify-center py-24 text-center border border-dashed border-white/10 rounded-3xl">
						<div className="text-6xl mb-6">🎄</div>
						<h2 className="text-3xl font-serif text-cream mb-4">
							Список пока пуст
						</h2>
						<p className="text-white/50 max-w-md mb-8">
							Вы еще не добавили ни одной елки в избранное. Перейдите в каталог,
							чтобы найти ту самую.
						</p>
						<Link
							href={PATHS.CATALOG}
							className="bg-cream text-forest px-8 py-3 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-gold transition-colors">
							Перейти в каталог
						</Link>
					</motion.div>
				)}
			</section>
		</main>
	);
}
