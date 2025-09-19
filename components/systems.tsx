import { Image } from "@heroui/react";

export default function Systems() {
    return (
        <section className="w-full h-full flex flex-col gap-6">
            <div className="flex flex-col gap-6 w-full items-center justify-center bg-default-500 bg-opacity-50 p-3 rounded-3xl">
                <h3 className="text-2xl">Administración de sistemas</h3>
            </div>
            <div className="flex flex-col gap-6 w-full items-center px-4">
                <div className="flex flex-col gap-6 w-full items-start">
                    <p className="text-lg leading-relaxed">
                        He adquirido experiencia en una amplia variedad de sistemas operativos y herramientas de administración. Estos conocimientos han sido fundamentales para desarrollar proyectos innovadores y soluciones eficientes, abarcando diferentes áreas y desafíos tecnológicos.
                    </p>
                </div>
                <div className="grid xl:flex gap-6 w-full justify-center">
                    <section className="flex flex-col gap-3 w-full">
                        <section className="flex flex-col gap-3 w-full bg-default-500 bg-opacity-50 p-5 rounded-3xl h-full">
                            <h5 className="text-xl underline text-center">Sistamas Operativos</h5>
                            <ul className="list-disc list-inside flex flex-col gap-1 items-start text-base">
                                <li>Windows Server</li>
                                <li>Linux (Ubuntu, Debian)</li>
                                <li>MacOS</li>
                            </ul>
                        </section>
                        <section className="flex flex-col gap-3 w-full bg-default-500 bg-opacity-50 p-5 rounded-3xl h-full">
                            <h5 className="text-xl underline text-center">Sistemas Operativos en Servidores</h5>
                            <ul className="list-disc list-inside flex flex-col gap-1 items-start text-base">
                                <li>Ubuntu Server</li>
                                <li>Windows Server</li>
                            </ul>
                        </section>
                        <section className="flex flex-col gap-3 w-full bg-default-500 bg-opacity-50 p-5 rounded-3xl h-full">
                            <h5 className="text-xl underline text-center">Herramientas de Administración</h5>
                            <ul className="list-disc list-inside flex flex-col gap-1 items-start text-base">
                                <li>Active Directory</li>
                                <li>PowerShell</li>
                                <li>SSH</li>
                            </ul>
                        </section>
                    </section>
                    <section className="flex flex-col gap-3 w-full">
                        <section className="flex flex-col gap-3 w-full bg-default-500 bg-opacity-50 p-5 rounded-3xl">
                            <h5 className="text-xl underline text-center">Servicios Administrados</h5>
                            <ul className="list-disc list-inside flex flex-col gap-1 items-start text-base">
                                <li>TCP/IP</li>
                                <li>DHCP</li>
                                <li>DNS</li>
                                <li>BIND9</li>
                                <li>HTTP/S</li>
                                <li>FTP/SFTP</li>
                                <li>SSH</li>
                                <li>SQL Server</li>
                                <li>MySQL</li>
                                <li>Apache</li>
                                <li>Nginx</li>
                                <li>Email</li>
                            </ul>
                        </section>
                        <section className="flex w-full bg-default-500 bg-opacity-50 p-3 rounded-3xl justify-between items-center px-5">
                            <Image alt="logo Ubuntu" src="/images/ubuntu.png" width={50} height={50}></Image>
                            <Image alt="logo Windows" src="/images/windows.png" width={90} height={50}></Image>
                            <Image alt="logo DNS" src="/images/dns.png" width={50} height={50}></Image>
                            <Image alt="logo SQL" src="/images/sql.png" width={50} height={50}></Image>
                            <Image alt="logo Apache" src="/images/apache.webp" width={100} height={50}></Image>
                        </section>
                    </section>
                </div>
            </div>
        </section>
    );
}
