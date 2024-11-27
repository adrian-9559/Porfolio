import LenguajeProgramBackend from "@/components/leguajeProgramBackend";
import LenguajeProgramFrontend from "@/components/leguajeProgramFrontend";
import LenguajeStyle from "@/components/leguajeStyle";
import LenguajeBBDD from "@/components/lenguajeBBDD";

export default function LenguajeProgram() {
    return (
        <section className="flex flex-col gap-6">
            <div>
                <p>
                    A lo largo de mi experiencia profesional y académica, he tenido la oportunidad de aprender y utilizar una variedad de lenguajes de programación. Estos conocimientos los he aplicado en diversos proyectos que abarcan distintas áreas, permitiéndome no solo consolidar mi entendimiento de estos lenguajes, sino también desarrollar soluciones prácticas y creativas.
                </p>
            </div>
            <div className="grid grid-cols-2 xl:flex gap-3 lg:gap-5">
                <LenguajeProgramBackend />
                <LenguajeProgramFrontend />
                <LenguajeStyle />
                <LenguajeBBDD />
            </div>
        </section>
    )
}