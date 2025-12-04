import CartDrawer from "@/components/cart/drawer";
import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import SmoothScroll from "@/components/layout/scroll";

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<SmoothScroll>
			<CartDrawer />
			<Navbar />
			{children}
			<Footer />
		</SmoothScroll>
	);
}
