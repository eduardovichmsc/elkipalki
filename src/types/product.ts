export type ProductTag = "new" | "bestseller" | "limited" | "sale";

export interface ProductSize {
	id: string;
	height: string; // например "150-175 см"
	price: number;
	available: boolean;
}

export interface Product {
	id: string;
	slug: string; // для ссылки, например /product/nordmann-gold
	name: string;
	latinName: string; // Abies nordmanniana - для пафоса
	description: string; // Полное описание
	shortDesc: string; // Для карточки в каталоге

	// Цены
	startPrice: number; // Цена "от"
	currency: "RUB" | "USD";

	// Медиа
	images: {
		main: string; // Основное фото
		hover?: string; // Фото при наведении (атмосфера/детали)
		gallery: string[]; // Для детальной страницы
	};

	// Характеристики
	specs: {
		origin: string; // Страна (Denmark)
		color: string; // Оттенок (Deep Emerald)
		needleSoftness: "Soft" | "Medium" | "Prickly"; // Мягкость
	};

	// Вариации
	sizes: ProductSize[];

	tags?: ProductTag[];
}
