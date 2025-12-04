import { MoveRight } from "lucide-react";

export default function About() {
	return (
		<section className="py-32 px-12 bg-cream text-forest">
			<div className="max-w-4xl">
				<p className="text-lg md:text-xl uppercase tracking-widest mb-8 text-gold font-bold">
					О нас
				</p>
				<h2 className="text-4xl md:text-7xl font-serif leading-[1.1] mb-12">
					Мы не просто продаем елки. Мы доставляем дух Рождества прямо в вашу
					гостиную.
				</h2>
				<div className="flex items-center gap-4 cursor-pointer group">
					<span className="uppercase tracking-widest border-b border-forest pb-1">
						Наша история
					</span>
					<MoveRight className="group-hover:translate-x-2 transition-transform" />
				</div>
			</div>
		</section>
	);
}
