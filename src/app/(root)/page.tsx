import Hero from "@/components/home/hero";
import Catalog from "@/components/catalog";
import Marquee from "@/components/marquee";
import Process from "@/components/home/process";
import About from "@/components/home/about";
import Delivery from "@/components/home/delivery";
import { client } from "@/sanity/client";
import { PRODUCTS_QUERY } from "@/sanity/queries";
import { Metadata } from "next";
import { BASE } from "@/config";

export const metadata: Metadata = {
	title: `${BASE.logo.text} | Новогодные ёлки и аксессуары`,
	description:
		"Закажите идеальную новогоднюю елку с доставкой.Сервис: доставка, установка, демонтаж.",
};

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
			<Catalog products={products} />
			<About />
			<Delivery />
			<Process />
		</main>
	);
}
