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
			<Navbar />
			{children}
			<Footer />
		</SmoothScroll>
	);
}
