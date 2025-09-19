import { DiscordIcon, GithubIcon, InstagramIcon, LinkedinIcon, MailIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/utils/i18n";
import { Button, Card, CardBody, CardHeader, Image, Link } from "@heroui/react";
import { motion } from "framer-motion";

export default function Contact() {
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

	const socialLinks = [
		{
			platform: "LinkedIn",
			username: "Adrián Escribano Pérez",
			url: siteConfig.links.linkedin,
			icon: LinkedinIcon,
			description: t('contact.social.LinkedIn.description', 'Conectemos profesionalmente'),
			color: "text-blue-400 hover:text-blue-300",
			gradient: "from-blue-500 to-blue-700"
		},
		{
			platform: "GitHub",
			username: "adrian-9559",
			url: siteConfig.links.github,
			icon: GithubIcon,
			description: t('contact.social.GitHub.description', 'Revisa mis proyectos'),
			color: "text-gray-300 hover:text-white",
			gradient: "from-gray-600 to-gray-800"
		},
		{
			platform: "Email",
			username: "adrian.escribano.perez@gmail.com",
			url: `mailto:${siteConfig.links.mail}`,
			icon: MailIcon,
			description: t('contact.social.Email.description', 'Hablemos de tu proyecto'),
			color: "text-red-400 hover:text-red-300",
			gradient: "from-red-500 to-red-700"
		},
		{
			platform: "Discord",
			username: "adrian_9559",
			url: siteConfig.links.discord,
			icon: DiscordIcon,
			description: t('contact.social.Discord.description', 'Chat directo'),
			color: "text-purple-400 hover:text-purple-300",
			gradient: "from-purple-500 to-purple-700"
		},
		{
			platform: "Instagram",
			username: "adrian_9559",
			url: siteConfig.links.instagram,
			icon: InstagramIcon,
			description: t('contact.social.Instagram.description', 'Sígueme para updates'),
			color: "text-pink-400 hover:text-pink-300",
			gradient: "from-pink-500 to-pink-700"
		}
	];


	const containerVariants = {
		hidden: { opacity: 0, x: 50 },
		visible: {
			opacity: 1,
			x: 0,
			transition: {
				duration: 0.6,
				staggerChildren: 0.1
			}
		}
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 20 },
		visible: {
			opacity: 1,
			y: 0,
			transition: { duration: 0.4 }
		}
	};

	return (
		<motion.section
			className="self-start w-full max-w-md mx-auto lg:fixed lg:top-0 lg:bottom-0 lg:my-auto lg:right-12 lg:w-80 lg:max-w-none lg:mx-0 z-50"
			variants={containerVariants}
			initial="hidden"
			animate="visible"
		>
			<Card className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border border-gray-200/30 dark:border-white/10 shadow-2xl hover:shadow-purple-500/20 transition-all duration-500">
				<CardHeader className="flex flex-col items-center gap-4 p-8">
					<motion.div
						className="relative"
						whileHover={{ scale: 1.05 }}
						transition={{ type: "spring", stiffness: 300 }}
					>
						<div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
						<Image
							className="relative rounded-full w-32 lg:w-40 shadow-2xl shadow-purple-500/30 border-4 border-gradient-to-r from-purple-500 to-blue-500"
							alt={t('contact.imageAlt', 'Adrián Escribano Pérez - Desarrollador Full Stack')}
							src="/images/userIMG.png"
						/>
						<div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-400 rounded-full border-3 border-white dark:border-gray-900 animate-pulse"></div>
					</motion.div>

					<div className="text-center">
						<h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent mb-2">
							{t('contact.title', '¡Conectemos!')}
						</h2>
						<p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
							{t('contact.subtitle', 'Siempre abierto a nuevas oportunidades y colaboraciones')}
						</p>
					</div>
				</CardHeader>

				<CardBody className="p-6 pt-0">
					<div className="space-y-3">
						{socialLinks.map((link, index) => {
							const IconComponent = link.icon;
							return (
								<motion.div
									key={link.platform}
									variants={itemVariants}
								>
									<Link
										href={link.url}
										isExternal
										className="block w-full p-4 rounded-xl bg-white/5 dark:bg-white/5 hover:bg-white/10 dark:hover:bg-white/10 border border-gray-200/20 dark:border-white/10 hover:border-purple-500/30 transition-all duration-300 group"
									>
										<div className="flex items-center gap-4">
											<div className={`p-2 rounded-lg bg-gradient-to-r ${link.gradient} bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300`}>
												<IconComponent className={`w-5 h-5 ${link.color}`} />
											</div>
											<div className="flex-1 min-w-0">
												<div className="flex items-center justify-between">
													<span className="font-medium text-gray-900 dark:text-white group-hover:text-purple-600 dark:group-hover:text-purple-300 transition-colors">
														{link.platform}
													</span>
													<svg
														className="w-4 h-4 text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 group-hover:translate-x-1 transition-all duration-300"
														fill="none"
														stroke="currentColor"
														viewBox="0 0 24 24"
													>
														<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
													</svg>
												</div>
												<p className="text-xs text-gray-600 dark:text-gray-400 truncate">
													{link.description}
												</p>
												<p className="text-xs text-gray-500 dark:text-gray-500 truncate font-mono">
													{link.username}
												</p>
											</div>
										</div>
									</Link>
								</motion.div>
							);
						})}
					</div>

					{/* Call to Action */}
					<motion.div
						className="mt-8 text-center"
						variants={itemVariants}
					>
						<Button
							as={Link}
							href={`mailto:${siteConfig.links.mail}`}
							className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-semibold py-3 rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300"
							size="lg"
						>
							{t('contact.cta_button', '📧 Envía un mensaje')}
						</Button>
						<p className="text-xs text-gray-500 dark:text-gray-400 mt-3">
							{t('contact.cta_note', 'Respondo en menos de 24 horas')}
						</p>
					</motion.div>
				</CardBody>
			</Card>
		</motion.section>
	);
}
