import Hero from "@/components/home/hero";
import Catalog from "@/components/catalog";
import Marquee from "@/components/marquee";
import Process from "@/components/home/process";
import About from "@/components/home/about";
import Delivery from "@/components/home/delivery";

export default function Home() {
	return (
		<main className="min-h-screen bg-forest">
			<Hero />
			<Marquee />
			<About />
			<Catalog />
			<Process />
			<Delivery />
		</main>
	);
}
