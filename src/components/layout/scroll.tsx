"use client";
import {
	createContext,
	useContext,
	useEffect,
	useState,
	ReactNode,
} from "react";
import Lenis from "lenis";

// 1. Создаем контекст
const LenisContext = createContext<Lenis | null>(null);

// 2. Хук для использования в компонентах
export const useLenis = () => useContext(LenisContext);

export default function SmoothScroll({ children }: { children: ReactNode }) {
	const [lenis, setLenis] = useState<Lenis | null>(null);

	useEffect(() => {
		// Настройки для максимальной плавности
		const lenisInstance = new Lenis({
			duration: 1.2, // Длительность скролла (чем больше, тем плавнее)
			easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Функция плавности
			orientation: "vertical",
			gestureOrientation: "vertical",
			smoothWheel: true,
			touchMultiplier: 2,
		});

		setLenis(lenisInstance);

		function raf(time: number) {
			lenisInstance.raf(time);
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		return () => {
			lenisInstance.destroy();
		};
	}, []);

	return (
		<LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
	);
}
