import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Image, Card } from "@nextui-org/react";

export default function lenguajeBBDD() {

    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <section className="w-full h-auto">
            <Button key="Lenguaje de Base de datos" onPress={onOpen} className="m-auto flex flex-col gap-2 h-full w-full bg-default-500 bg-opacity-50 p-4 rounded-3xl">
                <div className="flex flex-col">
                    <div className="flex justify-center">
                        <h5 className="text-2xl">BBDD</h5>
                    </div>
                </div>
                <div className="w-full flex items-center flex-col">
                    <div className="flex gap-4 justify-center items-center w-5/6">
                        <Card className="w-auto bg-default-500 bg-opacity-0 shadow-none">
                            <Image alt="logo Oracle" src="/images/oracle_logo.png"></Image>
                        </Card>
                        <Card className="w-auto bg-default-500 bg-opacity-0 shadow-none">
                            <Image alt="logo MySQL" src="/images/mysql_logo.png"></Image>
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
                                <h5 className="text-lg xl:text-2xl">Gestores de Datos</h5>
                            </ModalHeader>
                            <ModalBody>
                                <section className="flex flex-col gap-4 text-sm xl:text-base">
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