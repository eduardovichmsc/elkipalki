import CartDrawer from "@/components/cart/drawer";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import SmoothScroll from "@/components/layout/scroll";
import PageTransitionOverlay from "@/components/layout/transition";
import { BASE } from "@/config";
import { TransitionProvider } from "@/context/transition";
import { Metadata, Viewport } from "next";

export const viewport: Viewport = {
	themeColor: "#0B2319",
	width: "device-width",
	initialScale: 1,
	maximumScale: 1,
};

export const metadata: Metadata = {
	title: {
		default: "Noël Store | Живые Датские Елки Премиум",
		template: `%s | ${BASE.logo.text}`,
	},
	description: "Премиальные живые новогодние елки с доставкой и установкой.",

	keywords: [
		"Живые елки",
		"Датская пихта",
		"Пихта Нордмана",
		"Купить елку",
		"Новогодние елки с доставкой",
		"Елки в горшках",
		"Премиум елки",
		"Оформление нового года",
	],

	openGraph: {
		title: BASE.logo.text + " | Премиальные Живые Елки",
		description:
			"Магия настоящего Рождества. Живые датские пихты с доставкой до двери.",
		siteName: BASE.logo.text,
		locale: "ru_RU",
		type: "website",
	},

	icons: {
		icon: "/favicon.ico",
		apple: "/apple-touch-icon.png",
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<TransitionProvider>
			<SmoothScroll>
				<PageTransitionOverlay />
				<CartDrawer />
				<Navbar />
				<main className="relative z-10 bg-neutral-950">{children}</main>
				<Footer />
			</SmoothScroll>
		</TransitionProvider>
	);
}
