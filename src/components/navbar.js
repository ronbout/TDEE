"use client";
import { MouseEvent } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
	SignedIn,
	SignedOut,
	SignInButton,
	SignUpButton,
	UserButton,
} from "@clerk/nextjs";

const links = [
	{ href: "/", label: "Home" },
	{ href: "/foods", label: "Foods" },
	{ href: "/foods/lookup", label: "Food Lookup" },
	{ href: "/members", label: "Members" },
	{ href: "/welcome", label: "Welcome" },
];

const Navbar = () => {
	const pathname = usePathname();
	const isActive = (path) => {
		if (pathname === path) return true;
		// if ("/products" === path) {
		// 	return pathname.startsWith("/products");
		// }
		return false;
	};
	const activeClassName = "text-blue-600 font-bold cursor-default";
	const inactiveClassName = "text-blue-400 hover:text-blue-600";
	return (
		<nav className="flex items-center justify-end">
			{links.map((menuLink) => {
				return (
					<Link
						onClick={
							isActive(menuLink.href) ? (e) => e.preventDefault() : undefined
						}
						key={menuLink.href}
						className={`mr-6 ${
							isActive(menuLink.href) ? activeClassName : inactiveClassName
						}`}
						href={menuLink.href}
					>
						{menuLink.label}
					</Link>
				);
			})}
			<SignedOut>
				<SignInButton mode="modal" />
			</SignedOut>
			<SignedIn>
				<UserButton showName />
			</SignedIn>
		</nav>
	);
};

export default Navbar;
