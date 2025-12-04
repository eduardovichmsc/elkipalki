export const PATHS = {
	HOME: "/",
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
		PHONE: "tel:+79990000000",
		EMAIL: "mailto:hello@noel-store.ru",
	},
} as const;
