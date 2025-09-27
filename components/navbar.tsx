import {
	DiscordIcon,
	GithubIcon,
	InstagramIcon,
	LinkedinIcon,
	Logo
} from "@/components/icons";
import { ThemeSwitch } from "@/components/theme-switch";
import { siteConfig } from "@/config/site";
import { Link } from "@heroui/link";
import {
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenuToggle,
	Navbar as NextUINavbar
} from "@heroui/navbar";
import clsx from "clsx";
import dynamic from 'next/dynamic';
import NextLink from "next/link";
import { useRouter } from 'next/router';
import React, { useEffect, useRef } from "react";

const LanguageSwitcher = dynamic(() => import('./LanguageSwitcher'), { ssr: false });

import { useI18n } from "@/utils/i18n";

export const Navbar = () => {
	const [isMenuOpen, setIsMenuOpen] = React.useState(false);
	const router = useRouter();
	const { messages } = useI18n();
	const t = (path: string, fallback?: string) => {
		const parts = path.split('.');
		let cur: any = messages;
		for (const p of parts) {
			if (!cur) return fallback ?? '';
			cur = cur[p];
		}
		return cur ?? fallback ?? '';
	}

	// Lock body scroll when menu is open and add escape key handler
	useEffect(() => {
		if (isMenuOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}

		const onKey = (e: KeyboardEvent) => {
			if (e.key === 'Escape') setIsMenuOpen(false);
		};
		window.addEventListener('keydown', onKey);
		return () => window.removeEventListener('keydown', onKey);
	}, [isMenuOpen]);

	const overlayRef = useRef<HTMLDivElement | null>(null);

	return (
		<NextUINavbar maxWidth="xl" position="sticky" className="fixed site-navbar transition-perf">
			<NavbarContent className="basis-1/5 sm:basis-full transition-perf" justify="start">
				<NavbarMenuToggle
					aria-label={isMenuOpen ? "Close menu" : "Open menu"}
					aria-expanded={isMenuOpen}
					className="xl:hidden p-2 -mr-2 transition-perf z-50"
					style={{ touchAction: 'manipulation' }}
					onClick={() => setIsMenuOpen(v => !v)}
					onPointerUp={(e) => {
						// use pointerup to avoid preventing native behaviors and ensure reliable firing on touch
						e.stopPropagation();
						setIsMenuOpen(v => !v);
					}}
					onKeyDown={(e) => {
						if (e.key === 'Enter' || e.key === ' ') {
							e.preventDefault();
							setIsMenuOpen(v => !v);
						}
					}}
				/>
				<NavbarBrand className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Logo />
						<p className="text-2xl text-inherit">Adrián</p>
					</NextLink>
				</NavbarBrand>
				<div className="hidden lg:flex gap-4 justify-start ml-2 transition-perf">
					{siteConfig.navItems.map((item) => {
						const isActive = router.pathname === item.href;

						return (
							<NavbarItem key={item.href}>
								<Link
									className={clsx(
										"text-foreground",
										{ 'font-bold text-[#e138ffc4]': isActive }
									)}
									href={item.href}
								>
									{t(`navbar.${item.href === '/' ? 'home' : item.href.replace('/', '')}`, item.label)}
								</Link>
							</NavbarItem>
						);
					})}
				</div>
			</NavbarContent>

			<NavbarContent
				className="flex"
				justify="end"
			>
				<NavbarItem className="flex gap-2">
					<Link isExternal href={siteConfig.links.linkedin} title="LinkedIn">
						<LinkedinIcon className="text-default-500" />
					</Link>
					<Link isExternal href={siteConfig.links.instagram} title="Instagram">
						<InstagramIcon className="text-default-500" />
					</Link>
					<Link isExternal href={siteConfig.links.discord} title="Discord">
						<DiscordIcon className="text-default-500" />
					</Link>
					<Link isExternal href={siteConfig.links.github} title="GitHub">
						<GithubIcon className="text-default-500" />
					</Link>
					<ThemeSwitch />
					<div className="ml-2 hidden sm:block">
						<LanguageSwitcher />
					</div>
				</NavbarItem>
			</NavbarContent>
			{/* Mobile menu: overlay + fixed menu for small screens */}
			{isMenuOpen && (
				<>
					{/* overlay */}
					<div
						ref={overlayRef}
						onPointerUp={(e) => { e.stopPropagation(); setIsMenuOpen(false); }}
						aria-hidden
						className="fixed inset-0 bg-black/30 z-40"
					/>
					<nav
						className="fixed top-14 right-0 left-0 z-50 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 p-4 transition-perf lg:hidden mobile-slide-in"
						role="dialog"
						aria-modal="true"
					>
						{siteConfig.navItems.map((item, index) => {
							const isActive = router.pathname === item.href;

							return (
								<div key={`${item.href}-${index}`} className="py-2">
									<NextLink
										href={item.href}
										className={clsx("w-full block text-foreground py-2 px-3 rounded-md", { 'font-bold text-[#9b27b073]': isActive })}
										onClick={() => setIsMenuOpen(false)}
									>
										{t(`navbar.${item.href === '/' ? 'home' : item.href.replace('/', '')}`, item.label)}
									</NextLink>
								</div>
							);
						})}
					</nav>
				</>
			)}
		</NextUINavbar>
	);
};
