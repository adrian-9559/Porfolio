"use client";
import { Input, TextArea } from "@heroui/react";
import { useState } from "react";
import { siteConfig } from "@/config/site";

export default function ContactForm() {
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitted(true);
		setTimeout(() => setSubmitted(false), 4000);
	};

	const handleEmail = () => {
		window.location.href = `mailto:${siteConfig.contact.email}?subject=Contacto desde el Portafolio&body=Hola Adrián, me gustaría ponerme en contacto contigo.`;
	};

	return (
		<div className="lg:col-span-2">
			<div className="p-8 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8">
				<div className="mb-8">
					<h2 className="text-xl font-bold text-[#1d1d1f] dark:text-white">Formulario de contacto</h2>
					<p className="text-sm text-[#6e6e73] dark:text-[#86868b] mt-1">
						Rellena el formulario y te respondo en menos de 24 horas.
					</p>
				</div>

				{submitted && (
					<div className="mb-6 p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800/50 text-sm text-emerald-700 dark:text-emerald-400 font-medium">
						✓ Mensaje enviado. ¡Gracias por escribirme!
					</div>
				)}

				<form className="space-y-5" onSubmit={handleSubmit}>
					<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
						<div className="space-y-1.5">
							<label className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">Nombre</label>
							<Input
								placeholder="Tu nombre"
								className="w-full"
								required
							/>
						</div>
						<div className="space-y-1.5">
							<label className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">Email</label>
							<Input
								placeholder="tu@email.com"
								type="email"
								className="w-full"
								required
							/>
						</div>
					</div>

					<div className="space-y-1.5">
						<label className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">Asunto</label>
						<Input
							placeholder="¿De qué trata tu mensaje?"
							className="w-full"
							required
						/>
					</div>

					<div className="space-y-1.5">
						<label className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">Mensaje</label>
						<TextArea
							placeholder="Cuéntame más sobre tu proyecto o idea..."
							className="w-full min-h-[120px]"
							required
						/>
					</div>

					<div className="flex flex-col sm:flex-row gap-3 pt-2">
						<button type="submit" className="apple-btn-primary flex-1 justify-center text-sm py-3">
							Enviar mensaje
						</button>
						<button
							type="button"
							className="apple-btn-secondary flex-1 justify-center text-sm py-3 inline-flex items-center gap-2"
							onClick={handleEmail}
						>
							<svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
							</svg>
							Abrir email
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
