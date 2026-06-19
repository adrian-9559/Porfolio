import { Envelope, Handset, MapPin } from "@gravity-ui/icons";
import { Button, Card, Input, TextArea } from "@heroui/react";

const contactMethods = [
	{
		icon: Envelope,
		label: "Email",
		value: "adrian.escribano.perez@gmail.com",
		href: "mailto:adrian.escribano.perez@gmail.com",
		description: "Mi forma preferida de contacto",
	},
	{
		icon: Handset,
		label: "LinkedIn",
		value: "adrián-escribano-pérez",
		href: "https://www.linkedin.com/in/adrián-escribano-pérez",
		description: "Conéctate conmigo en LinkedIn",
	},
	{
		icon: MapPin,
		label: "Ubicación",
		value: "Madrid, España",
		href: "#",
		description: "Disponible para trabajo remoto",
	},
];

export default function Contact() {
	return (
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
								className="p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer no-underline"
								href={method.href}
								target={method.href.startsWith("http") ? "_blank" : undefined}
								rel={method.href.startsWith("http") ? "noopener noreferrer" : undefined}
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

				{/* Contact Form */}
				<div className="lg:col-span-2">
					<Card className="p-8">
						<form className="space-y-6">
							{/* Name */}
							<div>
								<label className="text-sm font-semibold block mb-2">Nombre</label>
								<Input
									placeholder="Tu nombre"
									radius="lg"
									size="lg"
									variant="bordered"
								/>
							</div>

							{/* Email */}
							<div>
								<label className="text-sm font-semibold block mb-2">Email</label>
								<Input
									placeholder="tu@email.com"
									radius="lg"
									size="lg"
									type="email"
									variant="bordered"
								/>
							</div>

							{/* Subject */}
							<div>
								<label className="text-sm font-semibold block mb-2">Asunto</label>
								<Input
									placeholder="¿De qué se trata?"
									radius="lg"
									size="lg"
									variant="bordered"
								/>
							</div>

							{/* Message */}
							<div>
								<label className="text-sm font-semibold block mb-2">Mensaje</label>
								<TextArea
									minRows={6}
									placeholder="Cuéntame más sobre tu proyecto..."
									radius="lg"
									variant="bordered"
								/>
							</div>

							{/* Submit Button */}
							<div className="flex gap-4 pt-4">
								<Button
									className="flex-1 px-8 py-6 text-base font-semibold"
									color="primary"
									size="lg"
									onClick={() => {
										alert("Gracias por tu mensaje. Pronto te contactaré!");
									}}
								>
									Enviar Mensaje
								</Button>
								<Button
									className="flex-1 px-8 py-6 text-base font-semibold"
									size="lg"
									variant="bordered"
									onClick={() => {
										window.location.href = "mailto:adrian.escribano.perez@gmail.com";
									}}
								>
									Enviar Email
								</Button>
							</div>
						</form>
					</Card>
				</div>
			</div>

			{/* Social Links */}
			<div className="text-center pt-8 border-t border-gray-200 dark:border-gray-800">
				<p className="text-gray-600 dark:text-gray-400 mb-6">Sígueme en mis redes sociales</p>
				<div className="flex justify-center gap-4">
					{[
						{ name: "GitHub", icon: "🐙", href: "https://github.com/adrian-9559" },
						{ name: "LinkedIn", icon: "💼", href: "https://www.linkedin.com/in/adrián-escribano-pérez" },
						{ name: "Twitter", icon: "🐦", href: "https://twitter.com" },
						{ name: "Instagram", icon: "📸", href: "https://instagram.com/adrian_9559" },
					].map((social, idx) => (
						<a
							key={idx}
							className="w-12 h-12 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 flex items-center justify-center text-xl transition-colors"
							href={social.href}
							rel="noopener noreferrer"
							target="_blank"
							title={social.name}
						>
							{social.icon}
						</a>
					))}
				</div>
			</div>
		</div>
	);
}
