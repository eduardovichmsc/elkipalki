export const PATHS = {
	HOME: "/#home",
	CATALOG: "/products",
	PRODUCT: (slug: string) => `${PATHS.CATALOG}/${slug}`,
	SECTIONS: {
		ABOUT: "/#about",
		DELIVERY: "/#delivery",
		PROCESS: "/#process",
		COLLECTIONS: "/#collections",
	},
	CONTACTS: {
		INSTAGRAM: "https://instagram.com",
		TELEGRAM: "https://t.me",
		PHONE: "tel:+77075419884",
		EMAIL: "mailto:hello@noel-store.ru",
	},
} as const;

export const NAVLINKS = [
	{ name: "Коллекция", href: PATHS.CATALOG },
	{ name: "О бренде", href: PATHS.SECTIONS.ABOUT },
	{ name: "Доставка", href: PATHS.SECTIONS.DELIVERY },
] as const;
