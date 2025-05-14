import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Image, Card } from "@heroui/react";

export default function LenguajeProgramFrontend() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <section className="w-full h-auto">
            <Button key="Lenguaje Programación Frontend" onPress={onOpen} className="m-auto flex flex-col gap-2 h-full w-full bg-default-500 bg-opacity-50 p-4 rounded-3xl justify-between">
                <div className="flex flex-col">
                    <div className="flex justify-center">
                        <h5 className="text-2xl">Frontend</h5>
                    </div>
                </div>
                <div className="w-full flex items-center flex-col">
                    <div className="flex gap-4 justify-center items-center w-5/6">
                        <Card className="w-full bg-default-500 bg-opacity-0 shadow-none">
                            <Image alt="logo JavaScript" src="/images/JavaScript_logo.png"></Image>
                        </Card>
                        <Card className="w-full bg-default-500 bg-opacity-0 shadow-none">
                            <Image alt="logo TypeScript" src="/images/Typescript_logo.png"></Image>
                        </Card>
                        <Card className="w-full bg-default-500 bg-opacity-0 shadow-none">
                            <Image alt="logo HTML" src="/images/html_logo.png" className="w-auto h-auto"></Image>
                        </Card>
                    </div>
                </div>
                <div>
                    <p className="text-default-500 animate-pulse">Pulsa para más</p>
                </div>
            </Button>
            <Modal isOpen={isOpen} onClose={onOpenChange} backdrop="blur" size="xl" className="overflow-y-auto max-h-screen md:mt-32 xl:mt-0">
                <ModalContent>
                    {(onClose) => (
                        <section className="h-auto">
                            <ModalHeader className="border-b-[1px] border-default-300">
                                <h5 className="text-lg xl:text-2xl">Leguajes de Programación de Frontend</h5>
                            </ModalHeader>
                            <ModalBody>
                                <section className="flex flex-col gap-6 text-sm xl:text-base">
                                    <p>
                                        Mi experiencia en desarrollo frontend incluye un amplio uso de JavaScript, con el cual he diseñado interfaces dinámicas y funcionalidades interactivas que enriquecen la experiencia del usuario. Gracias a TypeScript, he añadido mayor robustez a mis proyectos, asegurando un código más estructurado y fiable mediante el uso de tipado estático y herramientas avanzadas de desarrollo.
                                    </p>
                                    <p>
                                        Además, he trabajado intensivamente con HTML para construir estructuras semánticas y bien organizadas, complementadas con diferentes herramientas de estilado para lograr diseños responsivos y atractivos.
                                    </p>
                                    <p>
                                        Estas tecnologías han sido esenciales en la creación de aplicaciones web enfocadas en la usabilidad, accesibilidad y rendimiento, permitiéndome desarrollar soluciones que combinan diseño visual con funcionalidad técnica de alto nivel.
                                    </p>
                                </section>
                            </ModalBody>
                            <ModalFooter>
                                <Button key="Cerrar modal Lenguaje Programación Frontend" onPress={onClose} color="danger" className="bg-opacity-45">Cerrar</Button>
                            </ModalFooter>
                        </section>
                    )}
                </ModalContent>
            </Modal>
        </section>
    )
}