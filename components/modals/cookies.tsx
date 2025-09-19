import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Switch, useDisclosure } from "@heroui/react";
import { useEffect, useState } from 'react';

export default function Cookies() {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const [analytics, setAnalytics] = useState(true);

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
				<ModalContent className="max-w-3xl">
					<ModalHeader>
						<div className="flex flex-col">
							<span className="text-lg font-semibold">Consentimiento de Cookies</span>
							<span className="text-sm text-gray-500">Preferencias de privacidad y uso de datos</span>
						</div>
					</ModalHeader>

					<ModalBody>
						<div className="grid gap-4 md:grid-cols-2">
							<div className="text-sm text-gray-700">
								<p className="mb-3">Utilizamos cookies para mejorar la experiencia, analizar el uso y ofrecer funcionalidades personalizadas. Puedes aceptar todas las cookies o elegir permitir solo las necesarias y las de funcionalidad.</p>
								<ul className="list-disc pl-5 text-sm text-gray-600">
									<li><strong>Necesarias:</strong> esenciales para el funcionamiento de la web.</li>
									<li><strong>Funcionales:</strong> recuerdan preferencias de usuario.</li>
									<li><strong>Analíticas:</strong> recogen estadísticas anónimas de uso.</li>
								</ul>
							</div>

							<div className="flex flex-col items-start md:items-end justify-center">
								<div className="w-full flex items-center justify-between mb-3">
									<div>
										<div className="text-sm font-medium">Analíticas</div>
										<div className="text-xs text-gray-500">Permite recopilar datos anónimos para mejorar el sitio</div>
									</div>
									<div className="ml-4">
										<Switch checked={analytics} onChange={() => setAnalytics(!analytics)} />
									</div>
								</div>

								<div className="w-full text-xs text-gray-500 md:text-right">Puedes cambiar estas opciones en cualquier momento desde la configuración de tu navegador o desde este sitio.</div>
							</div>
						</div>
					</ModalBody>

					<ModalFooter className="flex flex-col sm:flex-row gap-3 sm:gap-2 justify-end items-center w-full">
						<div className="flex gap-2 w-full sm:w-auto">
							<Button color="default" onClick={handleReject}>Rechazar</Button>
							<Button color="primary" onClick={handleAccept}>Aceptar</Button>
						</div>
						<Button color="secondary" onClick={onClose} className="hidden sm:inline-block">Cerrar</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</section>
	)
}
