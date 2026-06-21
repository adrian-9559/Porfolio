"use client";
import { Link } from "@heroui/react";
import { usePathname } from "next/navigation";

import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";

export const Navbar = () => {
	const pathname = usePathname();

	return (
		<nav className="w-full border-b border-gray-200 dark:border-gray-800 bg-white/95 dark:bg-gray-950/95 backdrop-blur-xl">
			<div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
				{/* Logo */}
				<Link href="/" className="flex items-center gap-2 no-underline">
					<div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-cyan-600 flex items-center justify-center text-white font-bold text-lg">
						A
					</div>
					<span className="hidden sm:inline font-semibold text-foreground">Adrián</span>
				</Link>

				{/* Navigation Links */}
				<div className="hidden md:flex items-center gap-8">
					{siteConfig.navItems.map((item) => (
						<Link
							key={item.href}
							className={`text-sm font-medium transition-colors ${
								pathname === item.href
									? "text-blue-600 dark:text-blue-400"
									: "text-gray-600 dark:text-gray-400 hover:text-foreground"
							}`}
							href={item.href}
						>
							{item.label}
						</Link>
					))}
				</div>

				{/* Theme Switch */}
				<ThemeSwitch />
			</div>
		</nav>
	);
};
