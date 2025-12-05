import Hero from "@/components/home/hero";
import Catalog from "@/components/catalog";
import Marquee from "@/components/marquee";
import Process from "@/components/home/process";
import About from "@/components/home/about";
import Delivery from "@/components/home/delivery";
import { client } from "@/sanity/client";
import { PRODUCTS_QUERY } from "@/sanity/queries";

export default async function Home() {
	const products = await client.fetch(
		PRODUCTS_QUERY,
		{},
		{ next: { revalidate: 60 } }
	);

	return (
		<main className="min-h-screen">
			<Hero />
			<Marquee />
			<About />
			<Catalog products={products} />
			<Delivery />
			<Process />
		</main>
	);
}
