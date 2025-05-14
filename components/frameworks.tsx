import {Image} from "@heroui/react";

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
        <section className="flex flex-col gap-6 m-auto">
            <div className="flex flex-col items-center w-full gap-4">
                <h2 className="text-3xl">Frameworks</h2>
                <p>
                    Presento un recorrido por los frameworks que he aprendido y aplicado en diversos proyectos, fundamentales para crear soluciones innovadoras y adaptadas. Su implementación ha optimizado procesos, impulsado mi desarrollo técnico y transformado ideas en realidades funcionales y escalables.
                </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-4 lg:flex gap-5">
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