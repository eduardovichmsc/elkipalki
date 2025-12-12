import { notFound } from "next/navigation";
import { client } from "@/sanity/client";
import {
	PRODUCT_BY_SLUG_QUERY,
	RELATED_PRODUCTS_QUERY,
} from "@/sanity/queries";
import ProductPageClient from "./client";
import { Product } from "@/types/product";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps) {
	const { slug } = await params;

	const product = await client.fetch(
		`*[_type == "product" && slug.current == $slug][0]{name, shortDesc}`,
		{ slug }
	);

	if (!product) return { title: "Not Found" };

	return {
		title: `${product.name} | Noël Store`,
		description: product.shortDesc,
	};
}

export default async function ProductPage({ params }: PageProps) {
	const { slug } = await params;

	const [product, relatedProducts] = await Promise.all([
		client.fetch<Product>(
			PRODUCT_BY_SLUG_QUERY,
			{ slug },
			{ next: { revalidate: 60 } }
		),
		client.fetch<Product[]>(
			RELATED_PRODUCTS_QUERY,
			{ slug },
			{ next: { revalidate: 60 } }
		),
	]);

	if (!product) {
		notFound();
	}

	return (
		<main className="min-h-screen bg-cream selection:bg-gold selection:text-forest">
			<ProductPageClient product={product} relatedProducts={relatedProducts} />
		</main>
	);
}
