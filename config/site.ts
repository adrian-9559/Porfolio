export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Adrián Escribano | Full Stack Developer",
	description: "Portfolio profesional de Adrián Escribano Pérez (adrian_9559) - Desarrollador Full Stack especializado en React, Next.js, Node.js y soluciones web modernas. Creando experiencias digitales innovadoras desde Madrid.",
	author: "Adrián Escribano Pérez",
	keywords: [
		"Desarrollador Full Stack",
		"React",
		"Next.js",
		"Node.js",
		"TypeScript",
		"JavaScript",
		"Portfolio",
		"Madrid",
		"Programador",
		"Web Developer"
	],
	navItems: [
		{
			label: "Inicio",
			href: "/",
		},
		{
			label: "Proyectos",
			href: "/projects",
		},
		{
			label: "Sobre mí",
			href: "/about",
		},
	],
	navMenuItems: [
		{
			label: "Inicio",
			href: "/",
		},
		{
			label: "Proyectos",
			href: "/projects",
		},
		{
			label: "Experiencia",
			href: "/#experience",
		},
		{
			label: "Habilidades",
			href: "/#skills",
		},
		{
			label: "Contacto",
			href: "/#contact",
		},
	],
	links: {
		github: "https://github.com/adrian-9559",
		instagram: "https://instagram.com/adrian_9559",
		mail: "adrian.escribano.perez@gmail.com",
		discord: "https://discord.gg/Az35cdhM",
		linkedin: "https://www.linkedin.com/in/adrián-escribano-pérez",
		twitter: "https://twitter.com/adrian_9559",
		website: "https://adrian-escribano.vercel.app",
	},
	openGraph: {
		type: "website",
		locale: "es_ES",
		url: "https://adrian-escribano.vercel.app",
		siteName: "Adrián Escribano | Full Stack Developer",
		images: [
			{
				url: "/images/og-image.png",
				width: 1200,
				height: 630,
				alt: "Adrián Escribano - Full Stack Developer",
			},
		],
	},
	twitter: {
		handle: "@adrian_9559",
		site: "@adrian_9559",
		cardType: "summary_large_image",
	},
};
