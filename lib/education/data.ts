export interface EducationProject {
	name: string;
	description: string;
	technologies?: string[];
	url?: string;
}

export interface EducationSubject {
	name: string;
	description?: string;
}

export interface EducationData {
	id: string;
	institution: string;
	program: string;
	level: string;
	levelFull: string;
	year: string;
	location: string;
	color: string;
	summary: string;
	institutionDescription: string;
	objectives: string[];
	competencies: string[];
	technologies: string[];
	tools: string[];
	methodologies: string[];
	subjects: EducationSubject[];
	projects: EducationProject[];
	knowledge: string[];
	applications: string[];
	achievements?: string[];
}

export const educationData: EducationData[] = [
	{
		id: "fp-smr",
		institution: "IES Luis Braille",
		program: "FP Grado Medio: Sistemas Microinformáticos y Redes",
		level: "FP GM",
		levelFull: "Formación Profesional de Grado Medio",
		year: "2020 — 2022",
		location: "Coslada, Madrid",
		color: "from-violet-500 to-purple-400",
		summary:
			"Formación técnica en administración de sistemas, redes y soporte informático. Adquisición de competencias sólidas en hardware, sistemas operativos, infraestructura de red y atención al usuario.",
		institutionDescription:
			"El IES Luis Braille es un centro de referencia en Formación Profesional en Coslada, con amplia experiencia en ciclos de informática y telecomunicaciones. Dispone de talleres y laboratorios equipados para prácticas reales.",
		objectives: [
			"Instalar, configurar y mantener sistemas microinformáticos y periféricos.",
			"Administrar redes locales de área pequeña y mediana.",
			"Diagnosticar y resolver incidencias hardware y software.",
			"Instalar y configurar sistemas operativos en entornos profesionales.",
			"Aplicar protocolos de seguridad en sistemas y redes.",
			"Gestionar usuarios, permisos y políticas en entornos Active Directory.",
		],
		competencies: [
			"Administración de sistemas Windows y Linux",
			"Configuración de redes TCP/IP",
			"Montaje y mantenimiento de hardware",
			"Gestión de usuarios y políticas de grupo",
			"Soporte técnico y atención al usuario",
			"Seguridad informática básica",
			"Cableado estructurado y fibra óptica",
			"Virtualización de sistemas",
		],
		technologies: [
			"Windows Server 2019",
			"Linux (Ubuntu, Debian)",
			"TCP/IP",
			"Active Directory",
			"DNS / DHCP",
			"VirtualBox",
			"VMware",
		],
		tools: [
			"Wireshark",
			"Cisco Packet Tracer",
			"PuTTY",
			"WinSCP",
			"GParted",
			"Clonezilla",
			"Microsoft Office",
		],
		methodologies: [
			"Resolución de incidencias por niveles (L1/L2/L3)",
			"Documentación técnica de procedimientos",
			"Gestión de tickets de soporte",
			"Trabajo en equipo en laboratorio",
		],
		subjects: [
			{ name: "Montaje y Mantenimiento de Equipos", description: "Ensamblaje, diagnóstico y reparación de hardware informático" },
			{ name: "Sistemas Operativos Monopuesto", description: "Instalación y configuración de Windows y Linux" },
			{ name: "Redes Locales", description: "Fundamentos de redes, protocolos y topologías" },
			{ name: "Sistemas Operativos en Red", description: "Administración de Windows Server y Active Directory" },
			{ name: "Aplicaciones Web", description: "Introducción al desarrollo y gestión de aplicaciones web" },
			{ name: "Seguridad Informática", description: "Protocolos de seguridad, backups y políticas" },
			{ name: "Servicios de Red e Internet", description: "DNS, DHCP, FTP, HTTP y otros servicios" },
			{ name: "Formación en Centros de Trabajo", description: "Prácticas en empresa del sector TIC" },
		],
		projects: [
			{
				name: "Red empresarial simulada",
				description: "Diseño e implementación de una red empresarial completa en Cisco Packet Tracer con VLANs, DHCP, DNS y políticas de seguridad.",
				technologies: ["Cisco Packet Tracer", "TCP/IP", "VLANs"],
			},
			{
				name: "Infraestructura Windows Server",
				description: "Despliegue de un controlador de dominio con Active Directory, GPOs, usuarios y equipos en un entorno virtualizado.",
				technologies: ["Windows Server 2019", "Active Directory", "VirtualBox"],
			},
			{
				name: "Servidor Linux multiservicio",
				description: "Instalación y configuración de un servidor Ubuntu con servicios web (Apache), FTP (vsftpd), SSH y gestión de usuarios.",
				technologies: ["Ubuntu Server", "Apache", "SSH", "FTP"],
			},
		],
		knowledge: [
			"Fundamentos de electrónica y hardware informático",
			"Protocolos de red (TCP/IP, OSI, ARP, ICMP)",
			"Administración de sistemas operativos Windows y Linux",
			"Gestión de usuarios, grupos y permisos",
			"Seguridad informática y copias de seguridad",
			"Virtualización de sistemas y entornos",
			"Servicios de red: DNS, DHCP, FTP, HTTP, SSH",
		],
		applications: [
			"Soporte técnico a usuarios en entornos empresariales",
			"Despliegue de infraestructuras de red en pymes",
			"Administración remota de servidores Linux/Windows",
			"Diagnóstico y resolución de fallos hardware y software",
		],
		achievements: [
			"Nota media superior a 8 en el ciclo formativo",
			"Reconocimiento en prácticas de empresa por proactividad",
		],
	},
	{
		id: "fp-daw",
		institution: "IES Luis Braille",
		program: "FP Grado Superior: Desarrollo de Aplicaciones Web",
		level: "FP GS",
		levelFull: "Formación Profesional de Grado Superior",
		year: "2022 — 2024",
		location: "Coslada, Madrid",
		color: "from-blue-500 to-cyan-400",
		summary:
			"Formación avanzada en desarrollo web full-stack con React, Node.js, bases de datos y metodologías ágiles. Proyectos reales con tecnologías profesionales del mercado actual.",
		institutionDescription:
			"El IES Luis Braille ofrece el ciclo de Desarrollo de Aplicaciones Web con un enfoque muy práctico y actualizado a las demandas del mercado. El equipo docente combina experiencia académica con trayectoria profesional en el sector.",
		objectives: [
			"Desarrollar aplicaciones web completas en entornos cliente y servidor.",
			"Diseñar y gestionar bases de datos relacionales y no relacionales.",
			"Implementar APIs RESTful y consumirlas desde el frontend.",
			"Trabajar con control de versiones y flujos de trabajo colaborativos.",
			"Desplegar aplicaciones en entornos cloud y servidores de producción.",
			"Aplicar metodologías ágiles y trabajo en equipo en proyectos reales.",
		],
		competencies: [
			"Desarrollo Frontend con React y TypeScript",
			"Desarrollo Backend con Node.js y Express",
			"Diseño y gestión de bases de datos (SQL y NoSQL)",
			"Integración y consumo de APIs REST",
			"Control de versiones con Git y GitHub",
			"Despliegue en plataformas cloud (Vercel, Railway)",
			"Testing y depuración de aplicaciones",
			"Diseño UI/UX con Tailwind CSS",
		],
		technologies: [
			"JavaScript (ES6+)",
			"TypeScript",
			"React",
			"Next.js",
			"Node.js",
			"Express.js",
			"PostgreSQL",
			"MongoDB",
			"HTML5 / CSS3",
			"REST APIs",
			"JWT / Auth",
		],
		tools: [
			"Git / GitHub",
			"VS Code",
			"Postman",
			"DBeaver",
			"Docker (básico)",
			"Vercel",
			"Figma",
			"Trello / Jira",
		],
		methodologies: [
			"Scrum y metodologías ágiles",
			"Pair programming",
			"Code review",
			"Gitflow",
			"Diseño orientado a componentes",
			"API-first development",
		],
		subjects: [
			{ name: "Desarrollo Web en Entorno Cliente", description: "JavaScript avanzado, DOM, eventos y frameworks frontend" },
			{ name: "Desarrollo Web en Entorno Servidor", description: "Node.js, Express, APIs REST y autenticación" },
			{ name: "Diseño de Interfaces Web", description: "HTML5, CSS3, responsive design y accesibilidad" },
			{ name: "Bases de Datos", description: "SQL, PostgreSQL, MongoDB y ORMs" },
			{ name: "Despliegue de Aplicaciones Web", description: "Servidores, cloud, CI/CD y Docker" },
			{ name: "Proyecto de Desarrollo", description: "Aplicación completa full-stack con equipo" },
			{ name: "Formación en Centros de Trabajo", description: "Prácticas en empresa de desarrollo web" },
		],
		projects: [
			{
				name: "GymGO",
				description: "Aplicación web y móvil para gestión de rutinas de entrenamiento con seguimiento de progreso personalizado. Autenticación JWT, panel de administración y estadísticas.",
				technologies: ["React", "Node.js", "PostgreSQL", "React Native", "Express"],
				url: "https://github.com/adrian-9559/GymGO",
			},
			{
				name: "CodeXplore",
				description: "Plataforma educativa para aprender programación con cursos interactivos, sistema de seguimiento de progreso y gestión de usuarios.",
				technologies: ["Next.js", "TypeScript", "Tailwind CSS", "HeroUI", "PostgreSQL"],
				url: "https://github.com/adrian-9559/CodeXplore",
			},
			{
				name: "API REST de gestión de tareas",
				description: "API completa con autenticación JWT, roles de usuario, CRUD de tareas y documentación con Swagger.",
				technologies: ["Node.js", "Express", "PostgreSQL", "JWT", "Swagger"],
			},
		],
		knowledge: [
			"Arquitectura de aplicaciones web modernas (SPA, SSR, SSG)",
			"Gestión del estado en aplicaciones React (Context API, Redux)",
			"Seguridad web: autenticación, autorización y OWASP",
			"Optimización de rendimiento web (Lighthouse, Web Vitals)",
			"Diseño de bases de datos y normalización",
			"Integración continua y despliegue automático",
			"Patrones de diseño en JavaScript y TypeScript",
		],
		applications: [
			"Desarrollo de aplicaciones web para clientes y empresas",
			"Creación de APIs para consumo por aplicaciones móviles y web",
			"Optimización de rendimiento y accesibilidad en producción",
			"Trabajo en equipos de desarrollo con metodologías ágiles",
		],
		achievements: [
			"Proyecto GymGO seleccionado como trabajo destacado del ciclo",
			"Nota de acceso a prácticas superior a 8.5",
			"Contribuciones a proyectos open source durante el ciclo",
		],
	},
	{
		id: "42-madrid",
		institution: "42 Madrid",
		program: "42 Common Core — Cursus",
		level: "42",
		levelFull: "Formación intensiva en ingeniería informática",
		year: "2025 — Presente",
		location: "Madrid",
		color: "from-emerald-500 to-teal-400",
		summary:
			"Educación técnica intensiva peer-to-peer en programación de sistemas, algoritmos, arquitectura de software y ciencias de la computación. Sin profesores, sin clases: aprendizaje colaborativo 100% basado en proyectos.",
		institutionDescription:
			"42 es una escuela de programación fundada en París con presencia mundial. Su metodología revolucionaria elimina las clases magistrales y apuesta por el aprendizaje entre pares y la resolución de proyectos reales y retadores. La sede de Madrid cuenta con recursos técnicos de primer nivel abiertos 24/7.",
		objectives: [
			"Dominar programación en C y C++ desde los fundamentos hasta nivel avanzado.",
			"Comprender profundamente la gestión de memoria, punteros y estructuras de datos.",
			"Implementar algoritmos clásicos y resolver problemas computacionales complejos.",
			"Desarrollar autonomía, perseverancia y capacidad de investigación.",
			"Colaborar en proyectos técnicos complejos con otros programadores.",
			"Comprender el funcionamiento interno de sistemas operativos y procesos.",
		],
		competencies: [
			"Programación en C a bajo nivel",
			"Programación orientada a objetos en C++",
			"Algoritmos y estructuras de datos",
			"Gestión manual de memoria",
			"Sistemas operativos y procesos",
			"Redes y protocolos de comunicación",
			"Peer review y evaluación técnica",
			"Resolución de problemas complejos",
			"Autodidactismo y aprendizaje continuo",
		],
		technologies: [
			"C (C89/C99)",
			"C++98/11",
			"Bash / Shell scripting",
			"Make / Makefile",
			"OpenGL / MLX",
			"Sockets (POSIX)",
			"Threads (pthreads)",
		],
		tools: [
			"GDB (depuración)",
			"Valgrind (memory leaks)",
			"Git",
			"Norminette (linter 42)",
			"Linux / macOS",
			"SSH",
			"Vim / Neovim",
		],
		methodologies: [
			"Peer-to-peer learning",
			"Project-based learning",
			"Peer evaluation (evaluaciones entre pares)",
			"Blackhole system (gestión del tiempo)",
			"TDD básico en proyectos críticos",
			"Pair programming en proyectos colaborativos",
		],
		subjects: [
			{ name: "Libft", description: "Reimplementación de la librería estándar de C desde cero" },
			{ name: "ft_printf", description: "Implementación del printf con variadic functions" },
			{ name: "get_next_line", description: "Lectura de ficheros línea a línea con file descriptors" },
			{ name: "Born2beroot", description: "Administración de sistemas Linux: usuarios, sudo, firewall, SSH" },
			{ name: "so_long / fdf", description: "Gráficos 2D con la librería MLX (mini libX)" },
			{ name: "push_swap", description: "Algoritmo de ordenación óptimo con dos pilas" },
			{ name: "pipex", description: "Reimplementación de pipes y redirecciones de Shell" },
			{ name: "minishell", description: "Shell funcional con builtins, variables y señales en C" },
			{ name: "philosophers", description: "Concurrencia, hilos, mutexes y el problema de los filósofos" },
			{ name: "cub3D", description: "Motor gráfico 3D tipo raycasting inspirado en Wolfenstein 3D" },
			{ name: "CPP Modules (00-09)", description: "Programación orientada a objetos y patrones en C++" },
			{ name: "ft_irc", description: "Servidor IRC completo con sockets, clientes y canales" },
		],
		projects: [
			{
				name: "cub3D",
				description: "Motor gráfico 3D tipo raycasting en C con renderización en tiempo real. Implementación completa de perspectiva, colisiones, texturas y sprites inspirada en Wolfenstein 3D.",
				technologies: ["C", "MLX", "Raycasting", "Matemáticas 3D"],
				url: "https://github.com/adrigar25/cub3D",
			},
			{
				name: "ft_irc",
				description: "Servidor IRC (Internet Relay Chat) en C++ con soporte para múltiples clientes simultáneos, canales, operadores, mensajes directos y todos los comandos del protocolo IRC.",
				technologies: ["C++", "Sockets POSIX", "Multiplexing I/O", "Protocolo IRC"],
				url: "https://github.com/adrigar25/ft_irc",
			},
			{
				name: "minishell",
				description: "Shell funcional en C con soporte para builtins, variables de entorno, redirecciones, pipes y gestión de señales. Proyecto colaborativo de alto nivel técnico.",
				technologies: ["C", "POSIX", "Fork/exec", "Lex/parsing"],
			},
			{
				name: "philosophers",
				description: "Solución al problema de los filósofos comensales implementando concurrencia con pthreads y mutexes, sin deadlocks ni race conditions.",
				technologies: ["C", "pthreads", "mutexes", "semáforos"],
			},
		],
		knowledge: [
			"Arquitectura de computadores y representación de datos en memoria",
			"Gestión manual de memoria: malloc, free, y detección de leaks",
			"Sistemas de procesos: fork, exec, wait, signals",
			"Programación concurrente: hilos, mutexes, sincronización",
			"Programación de red: sockets TCP/UDP, select/poll",
			"Principios SOLID y patrones de diseño en C++",
			"Optimización de algoritmos y análisis de complejidad",
		],
		applications: [
			"Desarrollo de software de sistemas embebidos y de bajo nivel",
			"Optimización de rendimiento en aplicaciones críticas",
			"Diseño de protocolos de red y servidores concurrentes",
			"Contribución a proyectos open source en C/C++",
		],
		achievements: [
			"Superación del proceso de selección (La Piscine) entre cientos de candidatos",
			"Proyectos cub3D y ft_irc validados con nota máxima",
			"Evaluador activo con más de 50 peer reviews realizadas",
		],
	},
];

export function getEducationById(id: string): EducationData | undefined {
	return educationData.find((e) => e.id === id);
}
