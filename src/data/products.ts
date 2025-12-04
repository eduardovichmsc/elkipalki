import { Product } from "@/types/product";

export const products: Product[] = [
	{
		id: "1",
		slug: "danish-king",
		name: "Датская Пихта",
		latinName: "Abies Nordmanniana",
		shortDesc:
			"Эталон рождественского дерева. Идеальная симметрия, мягкая хвоя и глубокий изумрудный цвет.",
		description:
			"Датская пихта Нордмана — выбор королевских дворов Европы. Она практически не осыпается, а её мягкие иголки безопасны для детей и животных.",
		startPrice: 12900,
		currency: "RUB",
		images: {
			// Темная, атмосферная, стоит в комнате
			main: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=1200&auto=format&fit=crop",
			// Деталь: украшения крупным планом
			hover:
				"https://images.unsplash.com/photo-1512474932049-782abb8e68b2?q=80&w=1200&auto=format&fit=crop",
			gallery: [],
		},
		specs: {
			origin: "Дания (Ютландия)",
			color: "Глубокий изумруд",
			needleSoftness: "Soft",
		},
		sizes: [
			{ id: "s1", height: "150-175 см", price: 12900, available: true },
			{ id: "s2", height: "175-200 см", price: 15900, available: true },
			{ id: "s3", height: "200-225 см", price: 19900, available: true },
		],
		tags: ["bestseller"],
	},
	{
		id: "2",
		slug: "blue-diamond",
		name: "Голубая Ель",
		latinName: "Picea Pungens",
		shortDesc:
			"Благородный серебристо-голубой отлив и насыщенный хвойный аромат леса.",
		description:
			"Аристократка среди елей. Жесткие ветви идеально подходят для тяжелых стеклянных игрушек, а цвет меняется от освещения.",
		startPrice: 15500,
		currency: "RUB",
		images: {
			// Слегка припорошенная снегом, холодный оттенок
			main: "https://images.unsplash.com/photo-1482331043320-74972559560a?q=80&w=1200&auto=format&fit=crop",
			// Деталь хвои с инеемs
			hover:
				"https://images.unsplash.com/photo-1576088809282-581d582d1c68?q=80&w=1200&auto=format&fit=crop",
			gallery: [],
		},
		specs: {
			origin: "Россия (Питомник)",
			color: "Серебристо-голубой",
			needleSoftness: "Prickly",
		},
		sizes: [
			{ id: "b1", height: "150-175 см", price: 15500, available: true },
			{ id: "b2", height: "175-200 см", price: 18500, available: true },
		],
		tags: ["limited"],
	},
	{
		id: "3",
		slug: "fraser-fir",
		name: "Пихта Фразера",
		latinName: "Abies Fraseri",
		shortDesc:
			"Компактная, густая, с невероятным цитрусово-хвойным ароматом, который держится месяцами.",
		description:
			"Идеальный выбор для небольших квартир. Ветки направлены немного вверх, создавая пышный силуэт.",
		startPrice: 14900,
		currency: "RUB",
		images: {
			// Элегантная минималистичная елка
			main: "https://images.unsplash.com/photo-1544967082-d9d3fdd06a7d?q=80&w=1200&auto=format&fit=crop",
			// Уютный кадр с подарками
			hover:
				"https://images.unsplash.com/photo-1606839358356-b07204545564?q=80&w=1200&auto=format&fit=crop",
			gallery: [],
		},
		specs: {
			origin: "Шотландия",
			color: "Темно-зеленый с серебром",
			needleSoftness: "Soft",
		},
		sizes: [{ id: "f1", height: "150-175 см", price: 14900, available: true }],
		tags: ["new"],
	},
];
