export default function lenguajeProgramBackend() {
    return (
        <section className="flex gap-10">
            <div className="flex flex-col gap-6">
                <div className="flex justify-center">
                    <h3 className="text-xl font-semibold">Leguajes de Programación de Backend</h3>
                </div>
                <div className="flex flex-col gap-2">
                    <p>
                        Durante mi formación académica y experiencia profesional, he adquirido conocimientos y habilidades en el desarrollo backend utilizando lenguajes de programación como Java y PHP. 
                    </p>
                    <p>
                        En el caso de Java, he trabajado en la creación de aplicaciones robustas y escalables, implementando lógica compleja y utilizando frameworks como Spring Boot para optimizar la productividad y estructuración del código.
                        Por otro lado, con PHP he desarrollado aplicaciones, aplicando buenas prácticas de programación, como el uso del patrón MVC, para asegurar la eficiencia y mantenibilidad del código. 
                    </p>
                    <p>
                        Estos lenguajes han sido fundamentales en proyectos donde era necesario implementar servicios web, gestionar datos de forma eficiente y desarrollar aplicaciones web completas y funcionales.
                    </p>
                </div>
            </div>
            <div className="bg-default-200 w-auto p-2 rounded-xl">
                <section className="flex gap-4 justify-center items-center w-auto h-full">
                    <div>
                        <img alt="logo java" src="/images/Java_logo.png"></img>
                    </div>
                    <div>
                        <img alt="logo php" src="/images/PHP_logo.png"></img>
                    </div>
                </section>
            </div>
        </section>
    )
}