import {
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarBrand,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { link as linkStyles } from "@nextui-org/theme";
import NextLink from "next/link";
import clsx from "clsx";
import React from "react";
import { useRouter } from 'next/router';
import { siteConfig } from "@/config/site";
import { ThemeSwitch } from "@/components/theme-switch";
import {
  GithubIcon,
  InstagramIcon,
  DiscordIcon,
  LinkedinIcon,
  Logo
} from "@/components/icons";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const router = useRouter();

  return (
    <NextUINavbar maxWidth="xl" position="sticky" className="fixed">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="xl:hidden"
        />
        <NavbarBrand className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <Logo />
            <p className="text-2xl text-inherit">Porfolio</p>
          </NextLink>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => {
            const isActive = router.pathname === item.href;

            return (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium",
                    { 'font-bold text-[#e138ffc4]': isActive }
                  )}
                  href={item.href}
                >
                  {item.label}
                </NextLink>
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
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {siteConfig.navItems.map((item, index) => {
        const isActive = router.pathname === item.href;

        return (
          <NavbarMenuItem key={`${item.href}-${index}`}>
            <NextLink
              className={clsx(
                "w-full",
                { 'font-bold text-[#9b27b073]': isActive }
              )}
              href={item.href}
            >
              <Link
                className={clsx(
                  "text-foreground",
                  { 'font-bold text-[#e138ffc4]': isActive }
                )}
                size="lg"
              >
                {item.label}
              </Link>
            </NextLink>
          </NavbarMenuItem>
        );
      })}
      </NavbarMenu>
    </NextUINavbar>
  );
};
