"use client";
import Link, { LinkProps } from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useTransition } from "@/context/transition";
import { ReactNode, ComponentProps } from "react";

interface Props extends LinkProps, Omit<ComponentProps<"a">, "href"> {
	children: ReactNode;
	href: string;
}

export default function TransitionLink({
	children,
	href,
	className,
	onClick,
	...props
}: Props) {
	const router = useRouter();
	const pathname = usePathname();
	const { animatePageOut } = useTransition();

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
		const targetPath = href.toString().split("#")[0];

		if (pathname === targetPath) {
			if (onClick) onClick(e);
			return;
		}

		e.preventDefault();
		if (onClick) onClick(e);
		animatePageOut(href, router);
	};

	return (
		<Link href={href} className={className} onClick={handleClick} {...props}>
			{children}
		</Link>
	);
}
