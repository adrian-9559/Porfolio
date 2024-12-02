import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure } from "@nextui-org/react";
import { useState, useEffect } from 'react';

export default function Cookies () {
	const {isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		const cookies = localStorage.getItem('cookies');
		if (!cookies) {
			onOpen();
		}
	}, [onOpen]);

	const handleAccept = () => {
		localStorage.setItem('cookies', 'true');
		onClose();
	};

	const handleCancel = () => {
		window.location.href = 'https://www.google.com';
	};

    return(
        <section>
            <Modal isOpen={isOpen} hideCloseButton backdrop='blur'>
                <ModalContent>
                    <ModalHeader>Consentimiento de Cookies</ModalHeader>
                    <ModalBody>
                        <p>Utilizamos cookies para almacenar y procesar información de la página. Al utilizar nuestros servicios, usted acepta la utilización de cookies de la página.</p>
                    </ModalBody>
                    <ModalFooter className="flex w-full justify-end items-center">
                        <Button color="primary" onClick={handleAccept}>Aceptar</Button>
                        <Button color="danger" onClick={handleCancel}>Cerrar</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </section>
    )
}