import type { Metadata } from "next";
import "./globals.css";
import { inter, playfair } from "@/config/fonts";

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="ru">
			<body
				className={`${playfair.variable} ${inter.variable} antialiased bg-forest text-cream selection:bg-gold selection:text-forest`}>
				{children}
			</body>
		</html>
	);
}
