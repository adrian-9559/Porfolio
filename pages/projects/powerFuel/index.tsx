import DefaultLayout from '@/layouts/default';
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Link, Accordion, AccordionItem, Image  } from "@nextui-org/react";
import React from "react";
import { GithubIcon } from "@/components/icons";

export default function PowerFuelProject() {
    const FuncionalidadesPrincipales = [
        {
            title: "Gestión de usuarios",
            features: [
                "Registro e inicio de sesión con autenticación por correo electrónico.",
                "Panel de configuración personalizado para cada usuario.",
                "Gestión de roles con permisos específicos para acciones diferenciadas.",
                "Panel de administración para activar, desactivar y editar usuarios."
            ]
        },
        {
            title: "Compras y transacciones",
            features: [
                "Carrito interactivo para visualizar y gestionar los productos antes de la compra.",
                "Registro detallado de pedidos, con acceso a historiales.",
                "Implementación del servicio externo Stripe para procesar pagos de manera segura y cumplir estándares regulatorios.",
            ]
        },
        {
            title: "Gestión de productos y categorías",
            features: [
                "Funcionalidad para añadir, editar y eliminar productos.",
                "Panel de administración de categorías para organizar los productos.",
                "Almacenamiento de imágenes de productos en el servidor backend."
            ]
        },
        {
            title: "Diseño adaptativo y usabilidad",
            features: [
                "Diseño responsivo para garantizar el funcionamiento óptimo en distintos dispositivos (PC, tabletas y móviles).",
                "Opciones para cambiar el esquema de colores (modos claros y oscuros)."
            ]
        },
        {
            title: "Paneles especializados",
            features: [
                "Panel de usuario: Historial de pedidos, direcciones de envío, notificaciones y configuraciones personales.",
                "Panel de administrador: Información del servidor y herramientas para la gestión integral de la tienda.",
            ]
        },
        {
            title: "Búsqueda y navegación eficiente",
            features: [
                "Menú de navegación con categorías principales y búsqueda rápida de productos.",
                "Carrusel de productos destacados y categorías en la página de inicio."
            ]
        },
        {
            title: "Soporte y personalización",
            features: [
                "Formulario de incidencias para reportar problemas.",
                "Opciones de personalización visual con ajustes de diseño."
            ]
        },
        {
            title: "Optimización y seguridad",
            features: [
                "Implementación de encriptación de contraseñas con Bcrypt.",
                "Autenticación y validación de usuarios mediante JSON Web Tokens (JWT).",
                "Compatibilidad con múltiples navegadores y estándares de accesibilidad."
            ]
        },
        {
            title: "Infraestructura tecnológica avanzada",
            features: [
                "Integración de tecnologías modernas como Next.js, React, Node.js, Express, Sequelize y TailwindCSS.",
                "Base de datos robusta con MySQL para garantizar la eficiencia en el almacenamiento y gestión de información.",
                "Gestión de seguridad con AWS Identity and Access Management (IAM)."
            ]
        },
        {
            title: "Escalabilidad y adaptabilidad",
            features: [
                "Diseño modular que permite integrar nuevas funcionalidades y soportar un crecimiento en el tráfico y transacciones.",
                "Preparación para su uso en entornos colaborativos con repositorios públicos en GitHub.",
            ]
        }
    ]

    const Technologies = [
        {
            title: "Next.js",
            description: "Next.js es un framework de React que permite crear aplicaciones web de alta velocidad y escalabilidad."
        },
        {
            title: "React",
            description: "React es una biblioteca de JavaScript para crear interfaces de usuario interactivas."
        },
        {
            title: "Node.js",
            description: "Node.js es un entorno de ejecución para JavaScript que permite la creación de aplicaciones web y APIs."
        },
        {
            title: "Express.js",
            description: "Express.js es un framework de Node.js para la creación de aplicaciones web y APIs."
        },
        {
            title: "Sequelize",
            description: "Sequelize es un ORM (Object-Relational Mapping) para Node.js que permite interactuar con una base de datos SQL."
        },
        {
            title: "MySQL",
            description: "MySQL es un sistema de gestión de bases de datos relacional que permite almacenar información de forma estructurada."
        },
        {
            title: "Stripe",
            description: "Stripe es un servicio de pagos en línea que permite procesar transacciones de forma segura y confiable."
        },
        {
            title: "TailwindCSS",
            description: "TailwindCSS es un framework de CSS que permite diseñar interfaces web modernas y responsivas."
        },
        {
            title: "Bcrypt",
            description: "Bcrypt es una librería de JavaScript que permite encriptar contraseñas de forma segura."
        },
        {
            title: "JSON Web Tokens (JWT)",
            description: "JWT es un estándar abierto que define un método compacto y seguro para transmitir información entre partes como un objeto JSON."
        },
        {
            title: "Cluster",
            description: "Cluster es un módulo de Node.js que permite crear procesos secundarios para mejorar el rendimiento y la escalabilidad de una aplicación."
        },
        {
            title: "Express-Fileupload",
            description: "Express-Fileupload es un middleware de Node.js para subir archivos al servidor."
        },
        {
            title: "Nodemailer",
            description: "Nodemailer es un módulo de Node.js que permite enviar correos electrónicos desde una aplicación."
        }
    ]

    const classNames = React.useMemo(
        () => ({
            th: ["bg-default-500 bg-opacity-40", "border-b", "border-divider"],
        }),
        [],
    );

    return (
        <DefaultLayout>
            <section className="flex flex-col gap-8 justify-between m-auto mt-16 xl:m-10 2xl:m-20 2xl:mx-64">
                <section className="flex justify-between gap-2">
                    <h2 className="text-3xl">PowerFuel</h2>
                    <Link href='https://github.com/adrian-9559/PowerFuel' className="border-[1px] border-black bg-default-500 bg-opacity-50 px-2 py-1 rounded-lg text-default-900 shadow-md shadow-[#9b27b073] w-fit flex justify-between gap-2">
                        <GithubIcon />
                        Proyecto
                    </Link>
                </section>
                <section className='flex flex-col gap-8'>
                    <section>
                        <p>
                            PowerFuel es un proyecto cooperativo el cual se enfoca en proporcionar una aplicación web de alimentos saludables para deportistas.
                            La aplicación incluye un servidor de Fronten, un servidor de Backend, un servicio externo para la gestión de pagos y una base de datos para el almacenamiento de información de productos y usuarios.
                        </p>
                    </section>
                    <section className='grid xl:flex gap-6'>
                        <section className='w-full xl:w-1/2 flex justify-center'>
                            <Image src="/images/powerFuel/home.png" alt="PowerFuel Home" />
                        </section>
                        <section className='flex flex-col gap-3 '>
                            <p>
                                En este proyecto se han utilizado diversas tecnologías clave para garantizar un desarrollo eficiente y funcional.
                            </p>
                            <section className='flex justify-end w-full'>
                                <section className='w-11/12 flex flex-col gap-2'>
                                    <p>
                                        - Para el frontend, se empleó el framework Next.js junto con React, logrando una interfaz dinámica y enfocada en la experiencia del usuario.
                                    </p>
                                    <p>
                                        - El backend se desarrolló utilizando Express.js y Node.js, que permiten gestionar de manera óptima las peticiones del servidor.
                                    </p>
                                    <p>
                                        - En cuanto al almacenamiento de datos, se optó por una base de datos MySQL, ideal para manejar información esencial de forma estructurada.
                                    </p>
                                    <p>
                                        - Para la gestión de transacciones, se integró el servicio externo Stripe, que asegura procesos de pago seguros y confiables.
                                    </p>
                                    <p>
                                        - Finalmente, el diseño de la aplicación se realizó con TailwindCSS, proporcionando una apariencia moderna y responsiva.
                                    </p>
                                </section>
                            </section>
                            <p>
                                Estas tecnologías en conjunto han permitido construir una solución sólida, escalable y adaptada a las necesidades del proyecto.
                            </p>
                        </section>
                    </section>
                    <section className='flex flex-col gap-2'>
                        <section>
                            <h3 className='text-2xl'>Funcionalidades</h3>
                        </section>
                        <section className='flex flex-col gap-4'>
                            <div>
                                <p>
                                    Entre las funcionalidades principales, destaca la implementación de procesos optimizados que mejoran significativamente la experiencia del usuario, permitiendo interacciones fluidas y accesibles. Además, se ha priorizado un enfoque modular en el desarrollo, facilitando la escalabilidad y el mantenimiento del sistema. Las herramientas implementadas aseguran un alto rendimiento, mientras que las medidas de seguridad integradas refuerzan la protección de los datos y la confiabilidad general de la plataforma.
                                </p>
                            </div>
                            <div className='grid xl:flex gap-12'>
                                <section className='w-full xl:w-3/6'>
                                    <Accordion>
                                        {FuncionalidadesPrincipales.map((funcionalidad, index) => (
                                            <AccordionItem key={index} title={funcionalidad.title} aria-label={funcionalidad.title}>
                                                <ul className='list-disc list-inside'>
                                                    {funcionalidad.features.map((feature, index) => (
                                                        <li className='text-base' key={index}>{feature}</li>
                                                    ))}
                                                </ul>
                                            </AccordionItem>
                                        ))}
                                    </Accordion>
                                </section>
                                <section className='flex flex-col gap-2 w-11/12'>
                                    <Image src="/images/powerFuel/adminPanel.png" alt="PowerFuel Admin Panel" />
                                    <div className='flex gap-2'>
                                        <div className='flex flex-col gap-2'>
                                            <div>
                                                <Image src="/images/powerFuel/adminPanelProducts.png" alt="PowerFuel Admin Roles Panel" />
                                            </div>
                                        </div>
                                        <div>
                                            <Image src="/images/powerFuel/adminPanelRoles.png" alt="PowerFuel Admin Roles Panel" />
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </section>
                    </section>
                    <section className='flex flex-col gap-2'>
                        <h3 className='text-2xl'>Tecnologías</h3>
                        <section className='flex bg-default-500 bg-opacity-35 rounded-lg'>
                            <Table removeWrapper isCompact aria-label="Tecnologias" classNames={classNames}>
                                <TableHeader >
                                    <TableColumn className='text-xl text-d'>Tecnología</TableColumn>
                                    <TableColumn className='text-xl text-d'>Descripción</TableColumn>
                                </TableHeader>
                                <TableBody>
                                    {Technologies.map((technology, index) => (
                                        <TableRow key={index}>
                                            <TableCell className='text-lg'>{technology.title}</TableCell>
                                            <TableCell>{technology.description}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </section>
                    </section>
                </section>
            </section>
        </DefaultLayout>
    );
}