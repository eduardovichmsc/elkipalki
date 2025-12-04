import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Product } from "@/types/product";

interface FavoritesState {
	items: Product[];
	addItem: (product: Product) => void;
	removeItem: (productId: string) => void;
	toggleItem: (product: Product) => void;
	hasItem: (productId: string) => boolean;
}

export const useFavoritesStore = create<FavoritesState>()(
	persist(
		(set, get) => ({
			items: [],

			addItem: (product) => {
				const { items } = get();
				if (!items.find((i) => i.id === product.id)) {
					set({ items: [...items, product] });
				}
			},

			removeItem: (productId) => {
				set({ items: get().items.filter((i) => i.id !== productId) });
			},

			toggleItem: (product) => {
				const { items } = get();
				const exists = items.find((i) => i.id === product.id);
				if (exists) {
					set({ items: items.filter((i) => i.id !== product.id) });
				} else {
					set({ items: [...items, product] });
				}
			},

			hasItem: (productId) => {
				return !!get().items.find((i) => i.id === productId);
			},
		}),
		{
			name: "noel-favorites-storage",
			storage: createJSONStorage(() => localStorage),
		}
	)
);
