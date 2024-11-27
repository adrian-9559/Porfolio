import {Image} from "@nextui-org/react";

export default function Frameworks() {
    const Frameworks = [
        {name: "React", logo: "/images/react_logo.png"},
        {name: "Next.js", logo: "/images/nextjs_logo.png"},
        {name: "Angular", logo: "/images/angular_logo.png"},
        {name: "Node.js", logo: "/images/nodejs_logo.png"},
        {name: "Tailwind CSS", logo: "/images/tailwindcss_logo.png"},
        {name: "Bootstrap", logo: "/images/bootstrap_logo.png"},
        {name: "Express", logo: "/images/express_logo.png"},
        {name: "Spring Boot", logo: "/images/springboot_logo.png"},
    ]

    return (
        <section className="flex flex-col gap-6">
            <div className="flex flex-col items-center w-full gap-4">
                <h2 className="text-3xl">Frameworks</h2>
                <p>
                    En esta sección, presento un recorrido por todos los frameworks que he aprendido y aplicado a lo largo de mi experiencia en diversos proyectos. Cada uno de estos frameworks ha sido una pieza fundamental en la construcción de soluciones innovadoras y eficientes, adaptadas a las necesidades específicas de cada iniciativa. A través de su implementación, no solo he optimizado procesos y funcionalidades, sino que también he explorado nuevas formas de desarrollo que me han permitido llevar mis habilidades técnicas al siguiente nivel. Estos frameworks han sido aliados indispensables en mi camino profesional, ayudándome a transformar ideas en realidades funcionales y escalables.
                </p>
            </div>
            <div className="flex gap-5">
                {Frameworks.map((framework, index) => (
                    <div key={index} className="flex flex-col justify-center items-center gap-2 h-auto bg-default-500 bg-opacity-50 p-4 rounded-3xl">
                        <Image src={framework.logo} alt={framework.name}/>
                        <p>{framework.name}</p>
                    </div>
                ))}
            </div>
        </section>
    )
}