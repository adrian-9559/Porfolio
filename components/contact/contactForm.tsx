import { Envelope } from "@gravity-ui/icons";
import { Button, Card, Input, TextArea } from "@heroui/react";

import { siteConfig } from "@/config/site";

export default function ContactForm() {
	return (
		<div className="lg:col-span-2">
			<Card className="p-8 bg-gray-100 dark:bg-default">
				<Card.Header className="mb-6">
					<h2 className="text-2xl font-semibold">Formulario de Contacto</h2>
					<p className="text-gray-600 dark:text-gray-400">
						Completa el formulario y me pondré en contacto contigo lo antes posible.
					</p>
				</Card.Header>
				<form className="space-y-6">
					{/* Name */}
					<div>
						<label className="text-sm font-semibold block mb-2">Nombre</label>
						<Input
							placeholder="Tu nombre"
							className={"w-full dark:bg-gray-100"}
						/>
					</div>

					{/* Email */}
					<div>
						<label className="text-sm font-semibold block mb-2">Email</label>
						<Input
							placeholder="tu@email.com"
							className={"w-full dark:bg-gray-100"}
							type="email"
						/>
					</div>

					{/* Subject */}
					<div>
						<label className="text-sm font-semibold block mb-2">Asunto</label>
						<Input
							placeholder="¿De qué se trata?"
							className={"w-full dark:bg-gray-100"}
						/>
					</div>

					{/* Message */}
					<div className="">
						<label className="text-sm font-semibold block mb-2">Mensaje</label>
						<TextArea
							placeholder="Cuéntame más sobre tu proyecto..."
							className={"w-full dark:bg-gray-100"}
						/>
					</div>

					{/* Submit Button */}
					<div className="flex gap-4 pt-4 w-full">
						<Button
							className={"w-full h-12 bg-gray-500 dark:bg-gray-800 hover:bg-blue-600 dark:hover:bg-blue-400"}
							onClick={() => {
								alert("Gracias por tu mensaje. Pronto te contactaré!");
							}}
						>
							Enviar Mensaje
						</Button>
						<Button
							className={"w-full h-12 bg-gray-500 dark:bg-gray-800 hover:bg-blue-600 dark:hover:bg-blue-400"}
							onClick={() => {
								window.location.href = `<a href="mailto:${siteConfig.contact.email}?subject=Contacto desde el Portafolio&body=Hola Adrián, me gustaría ponerme en contacto contigo."</a>`;
							}}
						>
							<Envelope className="w-5 h-5 mr-2" />
							Enviar Email
						</Button>
					</div>
				</form>
			</Card>
		</div>
	);
}
