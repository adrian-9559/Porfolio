import {
	GithubIcon,
	LinkedinIcon,
	MailIcon
} from "@/components/icons";
import { siteConfig } from "@/config/site";
import { useI18n } from "@/utils/i18n";
import { Button, Chip, Image, Link } from "@heroui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Hero() {
	const [scrollY, setScrollY] = useState(0);

	useEffect(() => {
		const handleScroll = () => setScrollY(window.scrollY);
		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const calculateYearsOfExperience = () => {
		const start = new Date("2022-09-01");
		const now = new Date();
		const differenceInMilliseconds = now.getTime() - start.getTime();
		const millisecondsInYear = 1000 * 60 * 60 * 24 * 365.25;

		const years = Math.floor(differenceInMilliseconds / millisecondsInYear);

		if (years > 0) {
			return `${years} ${years === 1 ? "año" : "años"}`;
		} else {
			const months = Math.floor((differenceInMilliseconds % millisecondsInYear) / (millisecondsInYear / 12));
			return `${months} ${months === 1 ? "mes" : "meses"}`;
		}
	};

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

	return (
		<motion.section
			className='relative flex md:my-20 lg:my-32 2xl:my-0 flex-col gap-6 lg:gap-12 w-auto min-h-screen justify-center m-auto lg:mx-24 px-4'
			initial={{ opacity: 0 }}
			animate={{ opacity: 1 }}
			transition={{ duration: 1 }}
		>
			{/* Background gradient effect */}
			<div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-blue-500/5 rounded-3xl -z-10"></div>

			{/* Profile Image with enhanced styling */}
			<motion.section
				className='flex justify-center items-center 2xl:hidden'
				initial={{ scale: 0, opacity: 0 }}
				animate={{ scale: 1, opacity: 1 }}
				transition={{ duration: 0.8, delay: 0.2 }}
				style={{
					transform: `translateY(${Math.sin(scrollY * 0.01) * 20}px)`
				}}
			>
				<div className="relative">
					<div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-lg opacity-30 animate-pulse"></div>
					<Image
						className="relative rounded-full w-40 lg:w-72 shadow-2xl shadow-purple-500/30 border-4 border-gradient-to-r from-purple-500 to-blue-500 transition-transform duration-300"
						alt="Adrián Escribano Pérez - Desarrollador Full Stack"
						src="/images/userIMG.png"
						style={{
							transform: `translateY(${scrollY * 0.1}px) rotate(${scrollY * 0.05}deg)`
						}}
					/>
					<div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-400 rounded-full border-4 border-white dark:border-gray-900 animate-pulse"></div>
				</div>
			</motion.section>

			{/* Enhanced Title Section */}
			<motion.section
				className="flex flex-col gap-4"
				initial={{ y: 50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.8, delay: 0.4 }}
			>
				<div className="text-center lg:text-left">
					<motion.h1
						className="text-2xl lg:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-blue-500 bg-clip-text text-transparent leading-tight"
						whileHover={{ scale: 1.02 }}
						transition={{ type: "spring", stiffness: 300 }}
					>
						{t('hero.hello', 'Hola, soy')}
					</motion.h1>
					<motion.span
						className="block text-2xl lg:text-6xl xl:text-8xl font-black mt-2 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
						whileHover={{ scale: 1.02 }}
						transition={{ type: "spring", stiffness: 300 }}
					>
						{t('hero.name', 'Adrián Escribano')}
					</motion.span>
					<motion.div
						className="flex flex-wrap gap-3 justify-center lg:justify-start mt-4"
						initial={{ y: 20, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.6, delay: 0.6 }}
					>
						<Chip
							size="lg"
							color="success"
							variant="shadow"
							className='animate-bounce font-semibold'
						>
							{t('hero.available', '✨ Disponible para trabajar')}
						</Chip>
						<Chip
							size="lg"
							color="primary"
							variant="flat"
							className='font-semibold'
						>
							{t('hero.role', '🚀 Full Stack Developer')}
						</Chip>
					</motion.div>
				</div>
			</motion.section>

			{/* Enhanced Description */}
			<motion.section
				className="flex flex-col gap-6"
				initial={{ y: 50, opacity: 0 }}
				animate={{ y: 0, opacity: 1 }}
				transition={{ duration: 0.8, delay: 0.6 }}
			>
				<div className="bg-white/60 dark:bg-white/10 backdrop-blur-lg rounded-2xl p-6 lg:p-8 border border-gray-200/50 dark:border-white/20 shadow-xl">
					<p className='text-lg lg:text-xl leading-relaxed text-gray-800 dark:text-gray-100'>
						{t('hero.desc1', '💻 Desarrollador Full Stack con {years} de experiencia especializado en crear soluciones digitales innovadoras.').replace('{years}', calculateYearsOfExperience())}
					</p>
					<p className='text-lg lg:text-xl leading-relaxed text-gray-800 dark:text-gray-100 mt-4'>
						{t('hero.desc2', '🎯 Mi enfoque combina arquitecturas robustas de backend con interfaces frontend intuitivas, creando experiencias de usuario excepcionales que impulsan el éxito empresarial.')}
					</p>
				</div>

				{/* Enhanced Action Buttons */}
				<motion.section
					className='flex flex-col lg:grid gap-6 lg:gap-8 items-center'
					initial={{ y: 30, opacity: 0 }}
					animate={{ y: 0, opacity: 1 }}
					transition={{ duration: 0.8, delay: 0.8 }}
				>
					<div className='flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto'>
						<motion.div
							whileHover={{ scale: 1.05 }}
							whileTap={{ scale: 0.95 }}
						>
							<Button
								as={Link}
								href='/documents/CSV-Adrian-Escribano-Perez.pdf'
								download
								className="bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold py-3 px-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 text-lg border-2 border-transparent hover:border-white/20"
								size="lg"
							>
								{t('hero.download_cv', '📄 Descargar CV')}
							</Button>
						</motion.div>

						<div className='flex gap-4'>
							{[
								{ href: siteConfig.links.linkedin, icon: LinkedinIcon, title: "LinkedIn", color: "hover:text-blue-400" },
								{ href: siteConfig.links.github, icon: GithubIcon, title: "GitHub", color: "hover:text-gray-300" },
								{ href: `mailto:${siteConfig.links.mail}`, icon: MailIcon, title: "Correo", color: "hover:text-red-400" }
							].map((social, index) => (
								<motion.div
									key={social.title}
									whileHover={{ scale: 1.2, rotate: 5 }}
									whileTap={{ scale: 0.9 }}
								>
									<Link
										isExternal
										href={social.href}
										title={social.title}
										className={`text-gray-400 ${social.color} transition-all duration-300 p-2 rounded-full bg-white/10 backdrop-blur-sm hover:bg-white/20`}
									>
										<social.icon className="w-6 h-6" />
									</Link>
								</motion.div>
							))}
						</div>
					</div>

					{/* Stats Section */}
					<motion.div
						className="flex flex-wrap gap-4 justify-center lg:justify-start"
						initial={{ y: 30, opacity: 0 }}
						animate={{ y: 0, opacity: 1 }}
						transition={{ duration: 0.8, delay: 1 }}
					>
						<div className="bg-gradient-to-r from-purple-200/60 to-blue-200/60 dark:from-purple-500/20 dark:to-blue-500/20 backdrop-blur-lg rounded-xl p-4 border border-purple-200/50 dark:border-white/10">
							<div className="text-2xl font-bold text-gray-900 dark:text-white">1+</div>
							<div className="text-sm text-gray-600 dark:text-gray-300">{t('metrics.cards.0.title', 'Años de experiencia')}</div>
						</div>
						<div className="bg-gradient-to-r from-green-200/60 to-teal-200/60 dark:from-green-500/20 dark:to-teal-500/20 backdrop-blur-lg rounded-xl p-4 border border-green-200/50 dark:border-white/10">
							<div className="text-2xl font-bold text-gray-900 dark:text-white">15+</div>
							<div className="text-sm text-gray-600 dark:text-gray-300">{t('metrics.cards.1.title', 'Proyectos completados')}</div>
						</div>
						<div className="bg-gradient-to-r from-pink-200/60 to-rose-200/60 dark:from-pink-500/20 dark:to-rose-500/20 backdrop-blur-lg rounded-xl p-4 border border-pink-200/50 dark:border-white/10">
							<div className="text-2xl font-bold text-gray-900 dark:text-white">8+</div>
							<div className="text-sm text-gray-600 dark:text-gray-300">Tecnologías dominadas</div>
						</div>
					</motion.div>
				</motion.section>
			</motion.section>

			{/* Floating elements for visual appeal */}
			<div className="absolute top-10 right-10 w-20 h-20 bg-purple-500/10 rounded-full blur-xl animate-pulse"></div>
			<div className="absolute bottom-20 left-10 w-16 h-16 bg-blue-500/10 rounded-full blur-xl animate-pulse delay-300"></div>
		</motion.section>
	);
}
