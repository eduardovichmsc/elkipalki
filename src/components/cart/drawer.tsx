"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ArrowRight, Loader2 } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store/cart";
import { useMounted } from "@/hooks/useMounted";
import { BASE, PATHS } from "@/config";

// --- НАСТРОЙКИ ---
const MANAGER_PHONE = PATHS.CONTACTS.WHATSAPP.title;

// Иконка WhatsApp (SVG)
const WhatsAppIcon = ({ className }: { className?: string }) => (
	<svg viewBox="0 0 24 24" fill="currentColor" className={className}>
		<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
	</svg>
);

export default function CartDrawer() {
	const {
		items,
		isOpen,
		closeCart,
		removeItem,
		updateQuantity,
		totalPrice,
		clearCart,
	} = useCartStore();
	const isMounted = useMounted();

	const [isCheckout, setIsCheckout] = useState(false);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [formData, setFormData] = useState({
		name: "",
		phone: "",
		comment: "",
	});

	if (!isMounted) return null;

	// --- ЛОГИКА WHATSAPP ---
	const handleWhatsApp = () => {
		// Формируем красивый текст сообщения
		let message = `Здравствуйте! Хочу оформить заказ:\n\n`;
		items.forEach((item, i) => {
			message += `${i + 1}. ${item.name} (${item.selectedSize.height}) - ${item.quantity} шт.\n`;
		});
		message += `\nИтого: ${new Intl.NumberFormat("ru-RU").format(totalPrice())} ${BASE.currency}`;
		message += `\n\n(Заказ с сайта)`;

		// Кодируем и открываем
		const url = `https://wa.me/${MANAGER_PHONE}?text=${encodeURIComponent(message)}`;
		window.open(url, "_blank");
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		try {
			const res = await fetch("/api/checkout", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					contact: formData,
					items: items,
					total: totalPrice(),
				}),
			});

			if (res.ok) {
				setSuccess(true);
				setTimeout(() => {
					clearCart();
					setSuccess(false);
					setIsCheckout(false);
					closeCart();
					setFormData({ name: "", phone: "", comment: "" });
				}, 3000);
			}
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<AnimatePresence>
			{isOpen && (
				<>
					{/* Backdrop */}
					<motion.div
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						onClick={closeCart}
						className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
					/>

					{/* Drawer */}
					<motion.div
						initial={{ x: "100%" }}
						animate={{ x: 0 }}
						exit={{ x: "100%" }}
						transition={{ type: "spring", damping: 25, stiffness: 200 }}
						className="fixed top-0 right-0 h-full w-full md:w-[500px] bg-[#0F2E22] border-l border-white/10 z-[70] flex flex-col shadow-2xl">
						{/* Header */}
						<div className="flex items-center justify-between p-6 border-b border-white/10">
							<h2 className="text-2xl font-serif text-cream">
								{isCheckout ? "Оформление" : success ? "Спасибо!" : "Корзина"}
							</h2>
							<button
								onClick={closeCart}
								className="text-white/50 hover:text-gold transition-colors">
								<X size={24} />
							</button>
						</div>

						{/* Content */}
						<div className="flex-1 overflow-y-auto p-6">
							{success ? (
								<div className="h-full flex flex-col items-center justify-center text-center">
									<div className="w-20 h-20 rounded-full bg-gold/10 text-gold flex items-center justify-center mb-6">
										<ArrowRight size={40} className="-rotate-45" />
									</div>
									<h3 className="text-3xl font-serif text-cream mb-4">
										Заказ принят!
									</h3>
									<p className="text-white/60">
										Наш менеджер свяжется с вами в течение 15 минут для
										подтверждения деталей.
									</p>
								</div>
							) : items.length === 0 ? (
								<div className="h-full flex flex-col items-center justify-center text-center text-white/30">
									<p>Ваша корзина пуста</p>
								</div>
							) : isCheckout ? (
								/* Checkout Form */
								<form
									id="checkout-form"
									onSubmit={handleSubmit}
									className="space-y-6">
									<div>
										<label className="text-xs uppercase tracking-widest text-gold mb-2 block">
											Ваше имя
										</label>
										<input
											required
											type="text"
											value={formData.name}
											onChange={(e) =>
												setFormData({ ...formData, name: e.target.value })
											}
											className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-cream focus:border-gold outline-none transition-colors"
											placeholder="Иван Иванов"
										/>
									</div>
									<div>
										<label className="text-xs uppercase tracking-widest text-gold mb-2 block">
											Телефон
										</label>
										<input
											required
											type="tel"
											value={formData.phone}
											onChange={(e) =>
												setFormData({ ...formData, phone: e.target.value })
											}
											className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-cream focus:border-gold outline-none transition-colors"
											placeholder="+7 (999) 000-00-00"
										/>
									</div>
									<div>
										<label className="text-xs uppercase tracking-widest text-gold mb-2 block">
											Комментарий
										</label>
										<textarea
											rows={3}
											value={formData.comment}
											onChange={(e) =>
												setFormData({ ...formData, comment: e.target.value })
											}
											className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-cream focus:border-gold outline-none transition-colors resize-none"
											placeholder="Код домофона, этаж..."
										/>
									</div>
								</form>
							) : (
								/* Cart Items List */
								<div className="space-y-6">
									{items.map((item) => (
										<div key={item.cartId} className="flex gap-4">
											<div className="relative w-20 h-24 bg-white/5 rounded-lg overflow-hidden shrink-0">
												<Image
													src={item.images?.main || ""}
													alt={item.name}
													fill
													className="object-cover"
												/>
											</div>
											<div className="flex-1 flex flex-col justify-between">
												<div>
													<div className="flex justify-between items-start">
														<h4 className="font-serif text-cream text-lg">
															{item.name}
														</h4>
														<button
															onClick={() => removeItem(item.cartId)}
															className="text-white/20 hover:text-red-400 transition-colors">
															<Trash2 size={16} />
														</button>
													</div>
													<p className="text-xs text-white/50 uppercase tracking-widest mt-1">
														Размер: {item.selectedSize.height}
													</p>
												</div>
												<div className="flex justify-between items-end">
													<div className="flex items-center gap-3 bg-white/5 rounded-full px-3 py-1">
														<button
															onClick={() => updateQuantity(item.cartId, -1)}
															className="text-white/50 hover:text-white">
															<Minus size={14} />
														</button>
														<span className="text-sm font-mono w-4 text-center">
															{item.quantity}
														</span>
														<button
															onClick={() => updateQuantity(item.cartId, 1)}
															className="text-white/50 hover:text-white">
															<Plus size={14} />
														</button>
													</div>
													<span className="text-gold font-sans">
														{new Intl.NumberFormat("ru-RU").format(
															item.selectedSize.price * item.quantity
														)}{" "}
														{BASE.currency}
													</span>
												</div>
											</div>
										</div>
									))}
								</div>
							)}
						</div>

						{/* Footer / Actions */}
						{!success && items.length > 0 && (
							<div className="p-6 border-t border-white/10 bg-[#0B2319]">
								<div className="flex justify-between items-center mb-6">
									<span className="text-white/50 text-sm uppercase tracking-widest">
										Итого:
									</span>
									<span className="text-2xl font-serif text-cream">
										{new Intl.NumberFormat("ru-RU").format(totalPrice())}{" "}
										{BASE.currency}
									</span>
								</div>

								{isCheckout ? (
									<div className="flex gap-4">
										<button
											onClick={() => setIsCheckout(false)}
											className="w-1/3 py-4 rounded-full border border-white/20 bg-transparent text-cream text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-white hover:text-forest hover:border-white active:scale-95">
											Назад
										</button>
										<button
											type="submit"
											form="checkout-form"
											disabled={loading}
											className="flex-1 py-4 rounded-full border border-white/20 bg-transparent text-cream text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-gold hover:text-forest hover:border-gold active:scale-95 flex justify-center items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed">
											{loading && (
												<Loader2 size={16} className="animate-spin" />
											)}
											{loading ? "Отправка..." : "Подтвердить"}
										</button>
									</div>
								) : (
									<div className="flex flex-col gap-3">
										<button
											onClick={() => setIsCheckout(true)}
											className="w-full py-4 rounded-full border border-white/20 bg-transparent text-cream text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-gold hover:text-forest hover:border-gold active:scale-95">
											Оформить заказ
										</button>

										{/* Кнопка WhatsApp */}
										<button
											onClick={handleWhatsApp}
											className="w-full py-3 rounded-full border border-white/10 bg-[#25D366]/10 text-[#25D366] text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#1b8f45] hover:text-white active:scale-95 flex items-center justify-center gap-3">
											<WhatsAppIcon className="w-4 h-4" /> Быстрый заказ
										</button>
									</div>
								)}
							</div>
						)}
					</motion.div>
				</>
			)}
		</AnimatePresence>
	);
}
