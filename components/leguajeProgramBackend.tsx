import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, useDisclosure, Image, Card } from "@nextui-org/react";

export default function lenguajeProgramBackend() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    return (
        <section className="w-full h-auto">
            <Button key="Lenguaje Programación Backend" onPress={onOpen} className="flex flex-col gap-2 m-auto h-full w-full bg-default-500 bg-opacity-50 p-4 rounded-3xl">
                <div className="flex flex-col">
                    <div className="flex justify-center">
                        <h5 className="text-2xl">Backend</h5>
                    </div>
                </div>
                <div className="w-full flex items-center flex-col">
                    <div className="flex gap-4 justify-center items-center w-5/6">
                        <Card className="w-full bg-default-500 bg-opacity-0 shadow-none">
                            <Image alt="logo java" src="/images/Java_logo.png"></Image>
                        </Card>
                        <Card className="w-full bg-default-500 bg-opacity-0 shadow-none">
                            <Image alt="logo php" src="/images/PHP_logo.png"></Image>
                        </Card>
                        <Card className="w-full bg-default-500 bg-opacity-0 shadow-none">
                            <Image alt="logo nodejs" src="/images/nodejs_logo.png"></Image>
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
                                <h5 className="text-lg xl:text-2xl">Leguajes de Programación de Backend</h5>
                            </ModalHeader>
                            <ModalBody>
                                <section className="flex flex-col gap-4 text-sm xl:text-base">
                                    <p>
                                        En el caso de Java, he trabajado en la creación de aplicaciones robustas y escalables, implementando lógica compleja y utilizando frameworks como Spring Boot para optimizar la productividad y estructuración del código.
                                    </p>
                                    <p>
                                        Por otro lado, con PHP he desarrollado aplicaciones dinámicas, aplicando buenas prácticas de programación como el uso del patrón MVC para garantizar un código modular y mantenible.
                                    </p>
                                    <p>
                                        Además, con Node.js he creado aplicaciones orientadas a eventos y altamente eficientes, especialmente para entornos que requieren manejo de datos en tiempo real. He utilizado frameworks como Express.js para desarrollar APIs RESTful, facilitando la integración con frontend y otras aplicaciones.
                                    </p>
                                </section>
                            </ModalBody>
                            <ModalFooter>
                                <Button key="Cerrar modal Lenguaje Programación Backend" onPress={onClose} color="danger" className="bg-opacity-45">Cerrar</Button>
                            </ModalFooter>
                        </section>
                    )}
                </ModalContent>
            </Modal>
        </section>
    )
}