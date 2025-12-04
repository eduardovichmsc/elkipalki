import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductPageClient from "./client";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
	const { slug } = await params;
	const product = products.find((p) => p.slug === slug);
	if (!product) return { title: "Not Found" };
	return {
		title: `${product.name} | Noël Store`,
		description: product.shortDesc,
	};
}

export default async function ProductPage({ params }: PageProps) {
	const { slug } = await params;
	const product = products.find((p) => p.slug === slug);

	if (!product) {
		notFound();
	}

	const relatedProducts = products
		.filter((p) => p.id !== product.id)
		.slice(0, 2);

	return (
		<main className="min-h-screen bg-forest selection:bg-gold selection:text-forest">
			<ProductPageClient product={product} relatedProducts={relatedProducts} />
		</main>
	);
}
