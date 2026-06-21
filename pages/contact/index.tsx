import ContactForm from "@/components/contact/contactForm";
import DefaultLayout from "@/layouts/default";

import { Envelope, Handset, MapPin } from "@gravity-ui/icons";
import { Button, Card, Tooltip } from "@heroui/react";

import { GitHub, Instagram, LinkedIn } from "@/components/icons";

import { siteConfig } from "@/config/site";

const contactMethods = [
	{
		icon: Envelope,
		label: "Email",
		value: `${siteConfig.contact.email}`,
		href: `<a href="mailto:${siteConfig.contact.email}">Email</a>`,
		description: "Mi forma preferida de contacto",
	},
	{
		icon: Handset,
		label: "LinkedIn",
		value: "adrián-escribano-pérez",
		href: `${siteConfig.links.linkedin}`,
		description: "Conéctate conmigo en LinkedIn",
	},
	{
		icon: MapPin,
		label: "Ubicación",
		value: "Madrid, España",
		href: `${siteConfig.links.maps}`,
		description: "Disponible para trabajo remoto",
	},
];


export default function ContactPage() {
	return (
		<DefaultLayout>
			<div className="space-y-12 py-8 md:py-12">
				{/* Header */}
				<div className="text-center space-y-4">
					<h1 className="text-5xl md:text-6xl font-bold">Ponte en Contacto</h1>
					<p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
						¿Tienes una idea interesante? Me encantaría escucharte y colaborar en tu próximo proyecto.
					</p>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
					{/* Contact Methods */}
					<div className="lg:col-span-1 space-y-6">
						{contactMethods.map((method, idx) => {
							const Icon = method.icon;
							return (
								<Card
									key={idx}
									className="p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer no-underline bg-default"
									onClick={() => window.open(method.href, "_blank")}
								>
									<div className="space-y-4">
										<div className="w-12 h-12 rounded-lg bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
											<Icon className="w-6 h-6 text-blue-600 dark:text-blue-400" />
										</div>
										<div>
											<h3 className="font-bold text-foreground">{method.label}</h3>
											<p className="text-sm text-gray-600 dark:text-gray-400">{method.value}</p>
											<p className="text-xs text-gray-500 dark:text-gray-500 mt-2">{method.description}</p>
										</div>
									</div>
								</Card>
							);
						})}
					</div>

					<ContactForm />
				</div>
				{/* Social Links */}
				<div className="text-center pt-8 border-t border-gray-200 dark:border-gray-800">
					<p className="text-gray-600 dark:text-gray-400 mb-6">Sígueme en mis redes sociales</p>
					<div className="flex justify-center gap-4">
						{[
							siteConfig.links.github && {
								name: "GitHub",
								href: siteConfig.links.github,
								icon: (
									<GitHub />
								),
							},
							siteConfig.links.linkedin && {
								name: "LinkedIn",
								href: siteConfig.links.linkedin,
								icon: (
									<LinkedIn />
								),
							},
							siteConfig.links.instagram && {
								name: "Instagram",
								href: siteConfig.links.instagram,
								icon: (
									<Instagram />
								),
							},
						].map((social, idx) => (
							<Tooltip delay={100} >
								<Button
									key={idx}
									className="w-12 h-12 rounded-lg bg-gray-400 dark:bg-gray-800 hover:bg-blue-300 dark:hover:bg-blue-900/30 flex items-center justify-center text-xl transition-colors"
								>
									{social.icon}
								</Button>
								<Tooltip.Content placement="bottom">
									<p className="text-sm">{social.name}</p>
								</Tooltip.Content>
							</Tooltip>
						))}
					</div>
				</div>
			</div>
		</DefaultLayout>
	);
}
