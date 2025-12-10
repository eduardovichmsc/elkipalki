"use client";
import {
	createContext,
	useContext,
	useState,
	ReactNode,
	useEffect,
	useLayoutEffect,
} from "react";

type TransitionContextType = {
	timeline: string; // 'initial' | 'entering' | 'exiting'
	animatePageOut: (href: string, router: any) => void;
	animatePageIn: () => void;
};

const TransitionContext = createContext<TransitionContextType | null>(null);

export const TransitionProvider = ({ children }: { children: ReactNode }) => {
	const [timeline, setTimeline] = useState("initial"); // initial, entering, exiting

	const animatePageOut = (href: string, router: any) => {
		// 1. Старт анимации "шторка выезжает"
		setTimeline("exiting");

		// 2. Ждем пока шторка закроет экран (например 1 сек)
		setTimeout(() => {
			// 3. Делаем переход
			router.push(href);
			// 4. Запускаем анимацию "шторка уезжает" (на новой странице)
			animatePageIn();
		}, 1000);
	};

	const animatePageIn = () => {
		// Небольшая задержка чтобы роутер успел схватить страницу
		setTimeout(() => {
			setTimeline("entering");
		}, 500);
	};

	return (
		<TransitionContext.Provider
			value={{ timeline, animatePageOut, animatePageIn }}>
			{children}
		</TransitionContext.Provider>
	);
};

export const useTransition = () => {
	const context = useContext(TransitionContext);
	if (!context)
		throw new Error("useTransition must be used within a TransitionProvider");
	return context;
};
