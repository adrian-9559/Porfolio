import { useI18n } from "@/utils/i18n";
import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Switch, useDisclosure } from "@heroui/react";
import { useEffect, useState } from 'react';

export default function Cookies() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [analytics, setAnalytics] = useState(true);
	const { messages, changeLang, lang } = useI18n();

	const t = (path: string, fallback?: string) => {
		try {
			const parts = path.split('.');
			let cur: any = messages;
			for (const p of parts) {
				if (!cur) return fallback ?? path;
				cur = cur[p];
			}
			return cur ?? fallback ?? path;
		} catch {
			return fallback ?? path;
		}
	};

	useEffect(() => {
		const cookies = localStorage.getItem('cookies');
		if (!cookies) {
			onOpen();
		}
	}, [onOpen]);

	const handleAccept = () => {
		const value = JSON.stringify({ accepted: true, analytics });
		localStorage.setItem('cookies', value);
		onClose();
	};

	const handleReject = () => {
		const value = JSON.stringify({ accepted: false, analytics: false });
		localStorage.setItem('cookies', value);
		onClose();
	};

	return (
		<section>
			<Modal isOpen={isOpen} hideCloseButton backdrop='blur'>
				<ModalContent className="max-w-3xl bg-white dark:bg-slate-800 rounded-xl border border-gray-100 dark:border-slate-700 shadow-glow overflow-hidden">
					<ModalHeader>
						<div className="flex items-center justify-between w-full gap-4">
							<div className="flex items-center gap-3">
								<div className="w-10 h-10 rounded-md bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center shadow-sm">
									<svg className="w-5 h-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h4l3 8 4-16 3 8h4" />
									</svg>
								</div>
								<div className="flex flex-col">
									<span className="text-lg font-semibold text-slate-900 dark:text-slate-100 text-gradient">{t('cookies.title', 'Consentimiento de Cookies')}</span>
									<span className="text-sm text-gray-500 dark:text-gray-400">{t('cookies.subtitle', 'Preferencias de privacidad y uso de datos')}</span>
								</div>
							</div>
							<div className="flex items-center gap-2">
								<button
									type="button"
									onClick={() => changeLang('es')}
									className={"px-2 py-1 rounded text-sm font-medium border border-gray-200 dark:border-slate-600 " + (lang === 'es' ? 'bg-primary-100 dark:bg-primary-700 text-primary-800 dark:text-white' : 'bg-gray-50 dark:bg-slate-700 text-gray-800 dark:text-gray-100')}
								>ES</button>
								<button
									type="button"
									onClick={() => changeLang('en')}
									className={"px-2 py-1 rounded text-sm font-medium border border-gray-200 dark:border-slate-600 " + (lang === 'en' ? 'bg-primary-100 dark:bg-primary-700 text-primary-800 dark:text-white' : 'bg-white dark:bg-slate-700 text-gray-800 dark:text-gray-100')}
								>EN</button>
							</div>
						</div>
					</ModalHeader>

					<ModalBody className="bg-transparent">
						<div className="grid gap-4 md:grid-cols-2">
							<div className="text-sm text-gray-700 dark:text-gray-200">
								<p className="mb-3">{t('cookies.description', 'Utilizamos cookies para mejorar la experiencia, analizar el uso y ofrecer funcionalidades personalizadas. Puedes aceptar todas las cookies o elegir permitir solo las necesarias y las de funcionalidad.')}</p>
								<ul className="list-disc pl-5 text-sm text-gray-600 dark:text-gray-300">
									<li><strong>{t('cookies.necessary', 'Necesarias')}:</strong> {t('cookies.necessary_desc', 'esenciales para el funcionamiento de la web.')}</li>
									<li><strong>{t('cookies.functional', 'Funcionales')}:</strong> {t('cookies.functional_desc', 'recuerdan preferencias de usuario.')}</li>
									<li><strong>{t('cookies.analytics', 'Analíticas')}:</strong> {t('cookies.analytics_desc', 'recogen estadísticas anónimas de uso.')}</li>
								</ul>
							</div>

							<div className="flex flex-col items-start md:items-end justify-center">
								<div className="w-full flex items-center justify-between mb-3">
									<div>
										<div className="text-sm font-medium text-slate-900 dark:text-slate-100">{t('cookies.analytics_label', 'Analíticas')}</div>
										<div className="text-xs text-gray-500 dark:text-gray-400">{t('cookies.analytics_help', 'Permite recopilar datos anónimos para mejorar el sitio')}</div>
									</div>
									<div className="ml-4">
										<Switch checked={analytics} onChange={() => setAnalytics(!analytics)} />
									</div>
								</div>

								<div className="w-full text-xs text-gray-500 dark:text-gray-400 md:text-right">{t('cookies.notice', 'Puedes cambiar estas opciones en cualquier momento desde la configuración de tu navegador o desde este sitio.')}</div>
							</div>
						</div>
					</ModalBody>

					<ModalFooter className="flex flex-col sm:flex-row gap-3 sm:gap-2 justify-between items-center w-full bg-transparent">
						<div className="flex items-center gap-3 text-xs text-gray-500 dark:text-gray-400">
							<a href="/privacy" className="underline text-xs text-gray-500 dark:text-gray-400">{t('cookies.privacy_policy', 'Política de privacidad')}</a>
						</div>
						<div className="flex gap-3 w-full sm:w-auto justify-end">
							<Button color="default" onClick={handleReject} className="rounded-lg px-4 py-2 shadow-sm border hover-lift bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100">{t('cookies.reject', 'Rechazar')}</Button>
							<Button color="primary" onClick={handleAccept} className="rounded-lg px-4 py-2 shadow hover-lift bg-gradient-to-r from-primary-500 to-secondary-500 hover:from-primary-600 hover:to-secondary-600 text-white border-0">{t('cookies.accept', 'Aceptar')}</Button>
						</div>
						<Button color="secondary" onClick={onClose} className="hidden sm:inline-block rounded px-3 py-1">{t('cookies.close', 'Cerrar')}</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</section>
	)
}
