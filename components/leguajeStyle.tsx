import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Image, Card } from "@nextui-org/react";

export default function LenguajeStyle() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <section className="w-full h-auto">
            <Button key="Lenguaje de Estilado" onPress={onOpen} className="m-auto flex flex-col gap-2 h-full w-full bg-default-500 bg-opacity-50 p-4 rounded-3xl">
                <div className="flex flex-col">
                    <div className="flex justify-center">
                        <h5 className="text-2xl">Estilado</h5>
                    </div>
                </div>
                <div className="w-full flex items-center flex-col">
                    <div className="flex gap-4 justify-center items-center w-5/6">
                        <Card className="w-full bg-default-500 bg-opacity-0 shadow-none">
                            <Image alt="logo CSS" src="/images/css_logo.png"></Image>
                        </Card>
                        <Card className="w-full bg-default-500 bg-opacity-0 shadow-none">
                            <Image alt="logo SaSS" src="/images/Sass_logo.png"></Image>
                        </Card>
                    </div>
                    <div>
                        <p className="text-default-500 animate-pulse">Pulsa para más</p>
                    </div>
                </div>
            </Button>
            <Modal isOpen={isOpen} onClose={onOpenChange} backdrop="blur" size="xl" className="overflow-y-auto max-h-screen md:mt-32 xl:mt-0">
                <ModalContent>
                    {(onClose) => (
                        <section>
                            <ModalHeader className="border-b-[1px] border-default-300">
                                <h5 className="text-lg xl:text-2xl">Leguajes de Estilado</h5>
                            </ModalHeader>
                            <ModalBody>
                                <section className="flex flex-col gap-4 text-sm xl:text-base">
                                    <p>
                                        Durante mi trayectoria, he desarrollado habilidades en una variedad de lenguajes y herramientas de estilado que he utilizado para definir y perfeccionar el diseño de numerosos proyectos. 
                                    </p>
                                    <p>    
                                        Estas tecnologías han sido clave para crear interfaces que combinan un diseño atractivo con la capacidad de adaptarse de manera eficiente a distintos dispositivos y tamaños de pantalla. 
                                    </p>
                                    <p>
                                        Mi enfoque siempre ha estado en garantizar que cada proyecto ofrezca una experiencia visual agradable y funcional, adaptada a las expectativas de los usuarios y a los estándares actuales de diseño responsivo.
                                    </p>
                                </section>
                            </ModalBody>
                            <ModalFooter>
                                <Button key="Cerrar modal Lenguajes de Estilado" onPress={onClose} color="danger" className="bg-opacity-45">Cerrar</Button>
                            </ModalFooter>
                        </section>
                    )}
                </ModalContent>
            </Modal>
        </section>
    )
}