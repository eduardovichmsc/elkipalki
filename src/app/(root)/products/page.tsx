import { client } from "@/sanity/client";
import { PRODUCTS_QUERY } from "@/sanity/queries";
import CatalogClient from "@/app/(root)/products/client";

export default async function CatalogPage() {
	const products = await client.fetch(
		PRODUCTS_QUERY,
		{},
		{ next: { revalidate: 60 } }
	);

	return (
		<main className="min-h-screen bg-forest">
			<CatalogClient products={products} />
		</main>
	);
}
