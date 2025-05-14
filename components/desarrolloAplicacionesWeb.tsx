import { Chip, Image, Card } from "@heroui/react";

export default function DesarrolloAplicacionesWeb() {
    return (
        <section>
            <Card className="flex flex-col gap-4 p-4 bg-foreground bg-opacity-25 rounded-lg shadow-md" arial-label="Card de IES Luis Braille">
                <section className="grid sm:flex gap-4 justify-between items-center">
                    <div className="flex justify-center items-center rounded-full shadow-sm">
                        <Image
                            src="/images/desarrollo_de_aplicaciones_web.jpg"
                            alt="Logo de Desarrollo de Aplicaciones Web"
                            className="rounded-full"
                            width={110}
                            height={80}
                        />
                    </div>
                    <section className="flex w-full justify-between">
                        <div className="w-full flex flex-col gap-1 items-start">
                            <h3 className="text-2xl font-medium italic w-full">Desarrollo de Aplicaciones Web</h3>
                            <p className="text-sm font-medium">Ciclo Formativo de Grado Superior</p>
                        </div>
                        <div className="flex flex-col gap-1 text-center">
                            <p className="text-sm font-medium">Año cursado:</p>
                            <Chip className=" font-medium" color="success" variant="flat">
                                2022 - 2024
                            </Chip>
                        </div>
                    </section>
                </section>
                <section className="flex items-center gap-3 bg-green-800 bg-opacity-75 text-white p-2 rounded-lg shadow-sm">
                    <Image
                        src="/images/logo_luis_braille_coslada.png"
                        alt="Logo de IES Luis Braille"
                        className="rounded-full"
                        width={80}
                        height={50}
                    />
                    <p className="text-xl font-medium">IES Luis Braille - Coslada</p>
                </section>
                <p className="leading-relaxed">
                    He completado un ciclo formativo de grado superior en Desarrollo de Aplicaciones Web, donde adquirí conocimientos fundamentales en programación, bases de datos y desarrollo web. Este programa me proporcionó una sólida base técnica y habilidades prácticas para enfrentar desafíos en el campo del desarrollo de software.
                </p>
            </Card>
        </section>
    );
}