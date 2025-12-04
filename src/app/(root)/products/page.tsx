import { client } from "@/sanity/client";
import { PRODUCTS_QUERY, CATEGORIES_QUERY } from "@/sanity/queries";
import CatalogClient from "@/app/(root)/products/client";

export const dynamic = "force-dynamic";

export default async function CatalogPage() {
	const [products, categories] = await Promise.all([
		client.fetch(PRODUCTS_QUERY, {}, { next: { revalidate: 60 } }),
		client.fetch(CATEGORIES_QUERY, {}, { next: { revalidate: 60 } }),
	]);

	return (
		<main className="min-h-screen bg-forest">
			<CatalogClient products={products} categories={categories} />
		</main>
	);
}
