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
		INSTAGRAM: {
			title: "star.season_kz",
			href: "https://instagram.com/star.season_kz",
		},
		TELEGRAM: {
			title: "starseason_kz",
			href: "https://t.me/starseason_kz",
		},
		PHONE: {
			title: "+77075419884",
			href: "tel:+77075419884",
		},
		EMAIL: {
			title: "hello@noel-store.ru",
			href: "mailto:hello@noel-store.ru",
		},
		WHATSAPP: {
			title: "77075419884",
		},
	},
} as const;

export const NAVLINKS = [
	{ name: "Коллекция", href: PATHS.CATALOG },
	{ name: "О бренде", href: PATHS.SECTIONS.ABOUT },
	{ name: "Доставка", href: PATHS.SECTIONS.DELIVERY },
] as const;
