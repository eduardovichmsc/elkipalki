import FavoritesClient from "./client";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Мой список желаний",
	description: "Сохраненные товары. Выберите лучшую елку для вашего праздника.",
	robots: {
		index: false,
		follow: true,
	},
};

export default function FavoritesPage() {
	return <FavoritesClient />;
}
