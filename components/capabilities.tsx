import LenguajeProgram from "@/components/lenguajeProgram";
import Frameworks from "@/components/frameworks";

export default function Capabilities() {
    return (
        <section className="flex flex-col gap-4">
            <section>
                <h3 className="text-3xl text-center">Habilidades desarrolladas</h3>
            </section>
            <section className="flex flex-col gap-16">
                <LenguajeProgram />
                <Frameworks />
            </section>
        </section>
    )
}