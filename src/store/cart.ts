import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product, ProductSize } from "@/types/product";

// Расширяем тип продукта, добавляя выбранный размер и количество
export interface CartItem extends Product {
	cartId: string;
	selectedSize: ProductSize;
	quantity: number;
}

interface CartState {
	items: CartItem[];
	isOpen: boolean; // Состояние открыта/закрыта корзина
	openCart: () => void;
	closeCart: () => void;
	addItem: (product: Product, size: ProductSize) => void;
	removeItem: (cartId: string) => void;
	updateQuantity: (cartId: string, delta: number) => void; // delta: +1 или -1
	clearCart: () => void;
	totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
	persist(
		(set, get) => ({
			items: [],
			isOpen: false,

			openCart: () => set({ isOpen: true }),
			closeCart: () => set({ isOpen: false }),

			addItem: (product, size) => {
				const { items } = get();
				const cartId = `${product.id}-${size.id}`;

				// Проверяем, есть ли уже такой товар с таким же размером
				const existingItem = items.find((i) => i.cartId === cartId);

				if (existingItem) {
					// Если есть, увеличиваем количество
					set({
						items: items.map((i) =>
							i.cartId === cartId ? { ...i, quantity: i.quantity + 1 } : i
						),
						isOpen: true, // Открываем корзину при добавлении
					});
				} else {
					// Если нет, добавляем новый
					set({
						items: [
							...items,
							{ ...product, selectedSize: size, quantity: 1, cartId },
						],
						isOpen: true,
					});
				}
			},

			removeItem: (cartId) => {
				set({ items: get().items.filter((i) => i.cartId !== cartId) });
			},

			updateQuantity: (cartId, delta) => {
				const { items } = get();
				set({
					items: items.map((item) => {
						if (item.cartId === cartId) {
							const newQuantity = item.quantity + delta;
							return newQuantity > 0
								? { ...item, quantity: newQuantity }
								: item;
						}
						return item;
					}),
				});
			},

			clearCart: () => set({ items: [] }),

			totalPrice: () => {
				return get().items.reduce(
					(total, item) => total + item.selectedSize.price * item.quantity,
					0
				);
			},
		}),
		{
			name: "noel-cart-storage",
			storage: createJSONStorage(() => localStorage),
			// Не сохраняем состояние isOpen, чтобы при перезагрузке корзина была закрыта
			partialize: (state) => ({ items: state.items }),
		}
	)
);
