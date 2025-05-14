import { Chip, Image, Card } from "@heroui/react";

export default function MadridTelefonica() {
    return (
        <section>
            <Card className="flex flex-col gap-4 p-4 bg-foreground bg-opacity-25 rounded-lg shadow-md" arial-label="Card de 42 Madrid">
                <section className="grid sm:flex gap-4 justify-between items-center">
                    <div className="flex justify-center items-center rounded-full shadow-sm">
                        <Image
                            src="/images/42_Logo.png"
                            alt="Logo de 42 Madrid"
                            className="rounded-full bg-white p-1"
                            width={110}
                            height={80}
                        />
                    </div>
                    <section className="flex w-full justify-between">
                        <div className="w-full flex flex-col gap-1 items-start">
                            <h3 className="text-2xl font-medium italic w-full">42 Madrid</h3>
                            <p className="text-sm font-medium">Campus de programación innovador</p>
                        </div>
                        <div className="flex flex-col gap-1 text-center">
                            <p className="text-sm font-medium">Año cursado:</p>
                            <Chip className=" font-medium" color="warning" variant="flat">
                                2025 - Actualidad
                            </Chip>
                        </div>
                    </section>
                </section>
                <section className="flex items-center gap-3 bg-blue-800 bg-opacity-75 text-white p-2 rounded-lg shadow-sm">
                    <Image
                        src="/images/logo_telefonica.jpg"
                        alt="Logo de Telefonica"
                        className="rounded-full"
                        width={50}
                        height={50}
                    />
                    <p className="text-xl font-medium">Fundación Telefónica</p>
                </section>
                <p className="leading-relaxed">
                    Actualmente estoy cursando un programa intensivo de desarrollo de software, enfocado en la resolución de problemas, programación en equipo y aprendizaje autónomo. Este programa me permite desarrollar habilidades técnicas esenciales para el mundo laboral.
                </p>
            </Card>
        </section>
    );
}
