export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Adrian_9559",
	description: "Porfolio of Adrian_9559.",
	navItems: [
		{
			label: {
				es: "Inicio",
				en: "Home",
			},
			href: "/",
		},
		{
			label: {
				es: "Proyectos",
				en: "Projects",
			},
			href: "/projects",
		},
		{
			label: {
				es: "Blog",
				en: "Blog",
			},
			href: "/blog",
		},
		{
			label: {
				es: "Acerca de mí",
				en: "About Me",
			},
			href: "/about",
		},
	],
	links: {
		github: "https://github.com/adrian-9559"
	},
};
