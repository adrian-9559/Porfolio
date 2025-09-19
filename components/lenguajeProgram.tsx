import { useState } from "react";
import { Button, Image, Card } from "@heroui/react";

import LenguajeProgramBackend from "@/components/leguajeProgramBackend";
import LenguajeProgramFrontend from "@/components/leguajeProgramFrontend";
import LenguajeStyle from "@/components/leguajeStyle";
import Systems from "@/components/systems";

export default function LenguajeProgram() {
    const [selectedCategory, setSelectedCategory] = useState("Sistemas y Redes");

    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category);
    };
    return (
        <section className="flex flex-col gap-6 w-full items-center justify-center">
            <div>
                <p className="text-lg leading-relaxed">
                    A lo largo de mi trayectoria, he adquirido experiencia en diferentes áreas de la tecnología, desarrollando proyectos que combinan creatividad y eficiencia para resolver problemas complejos. 
                    Mi enfoque se centra en aprender continuamente y aplicar las mejores prácticas en cada proyecto, asegurando soluciones innovadoras y de alta calidad. 
                    Desde el diseño de sistemas robustos hasta la implementación de interfaces intuitivas, mi objetivo es crear tecnología que marque la diferencia.
                </p>
            </div>
            <div className="flex flex-col xl:flex-row gap-6 w-full items-center justify-center">
                <div className="flex flex-col gap-6 items-center justify-center w-full xl:w-1/3">
                    <h3 className="text-2xl text-center font-semibold">Categoría</h3>
                    <section className="flex flex-col xl:flex-col gap-4 w-full items-center">
                        <Button key="Sistemas y Redes" className="flex flex-col gap-2 bg-default-500 bg-opacity-50 p-3 rounded-3xl justify-between w-full h-auto" onClick={() => handleCategoryChange("Sistemas y Redes")}>
                            <Image alt="logo Sistemas y Redes" src="/images/sistemas_redes.jpg" width={500} height={150}></Image>
                            <p className="text-xl font-light">Sistemas</p>
                        </Button>
                        <Button key="Backend" className="flex flex-col gap-2 bg-default-500 bg-opacity-50 p-3 rounded-3xl justify-between w-full h-auto" onClick={() => handleCategoryChange("Backend")}>
                            <Image alt="logo Backend" src="/images/programacion_backend.webp"  width={500} height={150}></Image>
                            <p className="text-xl font-light">Backend</p>
                        </Button>
                        <Button key="Frontend" className="flex flex-col gap-2 bg-default-500 bg-opacity-50 p-3 rounded-3xl justify-between w-full h-auto" onClick={() => handleCategoryChange("Frontend")}>
                            <Image alt="logo Frontend" src="/images/desarrollo_frontend.avif"  width={500} height={150}></Image>
                            <p className="text-xl font-light">Frontend</p>
                        </Button>
                    </section>
                </div>
                <div className="flex h-full gap-6 w-full transition-all duration-500">
                    {selectedCategory === "Sistemas y Redes" && <Systems />}
                    {selectedCategory === "Frontend" && <LenguajeProgramFrontend />}
                    {selectedCategory === "Backend" && <LenguajeProgramBackend />}
                </div>
            </div>
        </section>
    )
}