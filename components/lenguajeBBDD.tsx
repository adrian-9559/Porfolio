import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Image, Card } from "@nextui-org/react";

export default function lenguajeBBDD() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <section className="w-auto h-auto">
            <Button key="Lenguaje de Base de datos" onPress={onOpen} className="flex flex-col gap-2 h-auto bg-default-500 bg-opacity-50 p-4 rounded-3xl">
                <div className="flex flex-col">
                    <div className="flex justify-center">
                        <h5 className="text-2xl">Gestor de Datos</h5>
                    </div>
                </div>
                <div className="my-2 px-4 flex flex-col gap-3">
                    <div className="flex gap-10 justify-center items-center">
                        <Card className="w-full bg-default-500 bg-opacity-0 shadow-none">
                            <Image alt="logo Oracle" src="/images/oracle_logo.png"></Image>
                        </Card>
                        <Card className="w-full bg-default-500 bg-opacity-0 shadow-none">
                            <Image alt="logo MySQL" src="/images/mysql_logo.png"></Image>
                        </Card>
                    </div>
                    <div>
                        <p className="text-default-500 animate-pulse">Pulsa para más</p>
                    </div>
                </div>
            </Button>
            <Modal isOpen={isOpen} onClose={onOpenChange} backdrop="blur" size="lg">
                <ModalContent>
                    {(onClose) => (
                        <section>
                            <ModalHeader className="border-b-[1px] border-default-300">
                                <h5 className="text-2xl">Gestores de Datos</h5>
                            </ModalHeader>
                            <ModalBody>
                                <section className="flex flex-col gap-4">
                                    <p>
                                        En el transcurso de mi trayectoria, he tenido la oportunidad de trabajar con una variedad de lenguajes de programación que han sido fundamentales para el desarrollo e implementación de la mayoría de mis proyectos. 
                                    </p>
                                    <p>
                                        Estos lenguajes han sido herramientas clave para abordar y resolver desafíos específicos, permitiéndome diseñar, construir y optimizar soluciones eficientes y adaptadas a las necesidades de cada proyecto. 
                                    </p>
                                    <p>
                                        Mi experiencia con estos lenguajes no solo ha fortalecido mis habilidades técnicas, sino que también ha enriquecido mi capacidad para enfrentar problemas complejos con creatividad y eficacia.
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