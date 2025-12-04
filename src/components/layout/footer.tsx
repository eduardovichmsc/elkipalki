"use client";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { PATHS } from "@/config/paths";

export default function Footer() {
	return (
		<footer className="bg-forest text-cream pt-24 pb-12 px-6 md:px-24 border-t border-white/10">
			<div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 mb-24">
				{/* 1. Brand / Mission */}
				<div className="md:col-span-4 flex flex-col justify-between">
					<div>
						<Link href={PATHS.HOME} className="block w-max">
							<h2 className="text-6xl md:text-8xl font-serif mb-8 hover:opacity-80 transition-opacity">
								Noël
							</h2>
						</Link>
						<p className="text-white/40 max-w-xs leading-relaxed font-sans">
							Премиальные рождественские ели с доставкой, установкой и
							последующей утилизацией. Создаем магию с 2010 года.
						</p>
					</div>
				</div>

				{/* 2. Navigation */}
				<div className="md:col-span-4 grid grid-cols-2 gap-8">
					{/* Меню сайта */}
					<div>
						<h3 className="text-gold uppercase tracking-widest text-xs mb-6 font-bold">
							Меню
						</h3>
						<ul className="space-y-4 text-sm opacity-70 font-sans">
							<li>
								<Link
									href={PATHS.CATALOG}
									className="hover:text-gold transition-colors block w-max">
									Каталог
								</Link>
							</li>
							<li>
								<Link
									href={PATHS.SECTIONS.COLLECTIONS}
									className="hover:text-gold transition-colors block w-max">
									Коллекции
								</Link>
							</li>
							<li>
								<Link
									href={PATHS.SECTIONS.DELIVERY}
									className="hover:text-gold transition-colors block w-max">
									Доставка и Сервис
								</Link>
							</li>
							<li>
								<Link
									href={PATHS.SECTIONS.ABOUT}
									className="hover:text-gold transition-colors block w-max">
									О компании
								</Link>
							</li>
						</ul>
					</div>

					{/* Контакты */}
					<div>
						<h3 className="text-gold uppercase tracking-widest text-xs mb-6 font-bold">
							Контакты
						</h3>
						<ul className="space-y-4 text-sm opacity-70 font-sans">
							<li>
								<a
									href={PATHS.CONTACTS.INSTAGRAM}
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-gold transition-colors block w-max">
									Instagram
								</a>
							</li>
							<li>
								<a
									href={PATHS.CONTACTS.TELEGRAM}
									target="_blank"
									rel="noopener noreferrer"
									className="hover:text-gold transition-colors block w-max">
									Telegram
								</a>
							</li>
							<li>
								<a
									href={PATHS.CONTACTS.PHONE}
									className="hover:text-gold transition-colors block w-max">
									+7 (999) 000-00-00
								</a>
							</li>
							<li>
								<a
									href={PATHS.CONTACTS.EMAIL}
									className="hover:text-gold transition-colors block w-max">
									hello@noel-store.ru
								</a>
							</li>
						</ul>
					</div>
				</div>

				{/* 3. Newsletter */}
				<div className="md:col-span-4">
					<h3 className="text-3xl font-serif italic mb-6">
						Подпишитесь на новости
					</h3>
					<form
						onSubmit={(e) => e.preventDefault()}
						className="flex border-b border-cream/30 pb-4 group focus-within:border-gold transition-colors">
						<input
							type="email"
							placeholder="Ваш email"
							className="bg-transparent w-full outline-none placeholder:text-white/20 font-sans"
						/>
						<button
							type="submit"
							className="text-white/50 group-hover:text-gold transition-colors">
							<ArrowUpRight />
						</button>
					</form>
					<p className="mt-4 text-xs text-white/30 font-sans leading-relaxed">
						Получайте советы по уходу за ёлкой, идеи декора и ранний доступ к
						предзаказу на следующий сезон.
					</p>
				</div>
			</div>

			{/* Bottom Bar */}
			<div className="flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest opacity-30 pt-8 border-t border-white/5 font-sans">
				<p>© {new Date().getFullYear()} NOËL STORE. ALL RIGHTS RESERVED.</p>
				<div className="flex gap-6 mt-4 md:mt-0">
					<a href="#" className="hover:text-white transition-colors">
						Privacy Policy
					</a>
					<a href="#" className="hover:text-white transition-colors">
						Terms of Service
					</a>
				</div>
			</div>
		</footer>
	);
}
