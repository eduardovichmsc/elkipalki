import CartDrawer from "@/components/cart/drawer";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import SmoothScroll from "@/components/layout/scroll";
import PageTransitionOverlay from "@/components/layout/transition";
import { TransitionProvider } from "@/context/transition";

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
