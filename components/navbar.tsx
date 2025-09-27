import { Link } from "@heroui/link";
import {
	Navbar as HeroUINavbar,
	NavbarBrand,
	NavbarContent,
	NavbarItem,
	NavbarMenu,
	NavbarMenuToggle
} from "@heroui/navbar";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";
import NextLink from "next/link";

import {
	GithubIcon,
	Logo
} from "@/components/icons";
import { LanguageSwitch } from "@/components/languaje-switch";
import { ThemeSwitch } from "@/components/theme-switch";
import { useAppContext } from "@/config/appContext";
import { siteConfig } from "@/config/site";
import { Tooltip } from "@heroui/tooltip";

import dataLenguageNavbar from "@/locales/navbar/i18n.json";
import { useEffect, useState } from "react";

export const Navbar = () => {
	const { language } = useAppContext();
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	let tooltips = dataLenguageNavbar[language]?.tooltips || {
		selectLanguage: "Select language",
		themeSwitch: "Switch theme"
	};

	useEffect(() => {
		tooltips = dataLenguageNavbar[language]?.tooltips || {
			selectLanguage: "Select language",
			themeSwitch: "Switch theme"
		};
	}, [language]);

	return (
		<HeroUINavbar maxWidth="xl" position="sticky">
			<NavbarContent className="basis-1/5 sm:basis-full" justify="start">
				<NavbarBrand className="gap-3 max-w-fit">
					<NextLink className="flex justify-start items-center gap-1" href="/">
						<Logo />
						<p className="font-bold text-inherit">Porfolio</p>
					</NextLink>
				</NavbarBrand>
				<div className="hidden lg:flex gap-4 justify-start ml-2">
					{siteConfig.navItems.map((item) => (
						<NavbarItem key={item.href}>
							<NextLink
								className={clsx(
									linkStyles({ color: "foreground" }),
									"data-[active=true]:text-primary data-[active=true]:font-medium",
								)}
								color="foreground"
								href={item.href}
							>
								{item.label[language]}
							</NextLink>
						</NavbarItem>
					))}
				</div>
			</NavbarContent>

			<NavbarContent
				className="hidden lg:flex basis-1/5 sm:basis-full"
				justify="end"
			>
				<NavbarItem className="hidden sm:flex gap-2 items-center">
					<Link isExternal href={siteConfig.links.github} title="GitHub">
						<GithubIcon className="text-default-500" />
					</Link>
					<Tooltip content={tooltips.selectLanguage}>
						<span className="inline-block" tabIndex={0}>
							<LanguageSwitch />
						</span>
					</Tooltip>
					<Tooltip content={tooltips.themeSwitch}>
						<span className="inline-block" tabIndex={0}>
							<ThemeSwitch />
						</span>
					</Tooltip>
				</NavbarItem>
			</NavbarContent>

			<NavbarContent className="lg:hidden basis-1 pl-4" justify="end">
				<Link isExternal href={siteConfig.links.github}>
					<GithubIcon className="text-default-500" />
				</Link>
				<Tooltip content={tooltips.selectLanguage}>
					<span className="inline-block" tabIndex={0}>
						<LanguageSwitch />
					</span>
				</Tooltip>
				<Tooltip content={tooltips.themeSwitch}>
					<span className="inline-block" tabIndex={0}>
						<ThemeSwitch />
					</span>
				</Tooltip>
				<NavbarMenuToggle />
			</NavbarContent>
			<NavbarMenu
				open={isMenuOpen}
				onOpenChange={setIsMenuOpen}
				className="
					lg:hidden
					lg:bg-background/95
					lg:backdrop-blur-md
				"
			>
				{siteConfig.navItems.map((item) => (
					<NavbarItem key={item.href} className="w-full">
						<NextLink
							className={clsx(
								"data-[active=true]:text-primary data-[active=true]:font-medium",
								"w-full block py-2"
							)}
							href={item.href}
							onClick={() => setIsMenuOpen(false)}
						>
							{item.label[language]}
						</NextLink>
					</NavbarItem>
				))}
			</NavbarMenu>
		</HeroUINavbar>
	);
};
