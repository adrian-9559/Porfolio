"use client";
import { useState } from "react";

import {
  BlogH2,
  BlogH3,
  BlogP,
  BlogCode,
  BlogInlineCode,
  BlogCallout,
} from "@/components/blog/shared";

function ExerciseCard({
  num,
  title,
  level,
  description,
  hint,
  solution,
}: {
  num: number;
  title: string;
  level: "Básico" | "Intermedio" | "Avanzado";
  description: string;
  hint?: string;
  solution?: string;
}) {
  const [open, setOpen] = useState(false);
  const levelColor = {
    Básico:
      "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400",
    Intermedio:
      "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
    Avanzado: "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400",
  }[level];

  return (
    <div className="border border-black/10 dark:border-white/10 rounded-2xl overflow-hidden">
      <button
        className="w-full px-4 py-3 flex items-center justify-between gap-3 hover:bg-black/3 dark:hover:bg-white/3 transition-colors text-left"
        onClick={() => setOpen(!open)}
      >
        <div className="flex items-center gap-3">
          <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs font-bold flex items-center justify-center shrink-0">
            {num}
          </span>
          <span className="text-sm font-medium text-[#1d1d1f] dark:text-white">
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColor}`}
          >
            {level}
          </span>
          <span className="text-[#aeaeb2] text-xs">{open ? "▲" : "▼"}</span>
        </div>
      </button>
      {open && (
        <div className="px-4 pb-4 border-t border-black/8 dark:border-white/8 pt-3 space-y-3">
          <p className="text-sm text-[#3a3a3c] dark:text-[#aeaeb2]">
            {description}
          </p>
          {hint && (
            <div className="bg-blue-50 dark:bg-blue-950/20 rounded-xl px-3 py-2 text-xs text-blue-800 dark:text-blue-300">
              <strong>Pista:</strong> {hint}
            </div>
          )}
          {solution && <BlogCode>{solution}</BlogCode>}
        </div>
      )}
    </div>
  );
}

export default function DockerContent() {
  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 text-xs text-[#aeaeb2] dark:text-[#636366] mb-4">
        <span className="flex items-center gap-1">
          <svg
            aria-hidden="true"
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          Tutorial
        </span>
        <span className="w-1 h-1 rounded-full bg-[#aeaeb2]" />
        <span className="flex items-center gap-1">
          <svg
            aria-hidden="true"
            className="w-3.5 h-3.5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
          50 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        Docker: contenedores de cero a producción
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Docker empaqueta tu aplicación junto con su entorno — dependencias,
        configuración, runtime — en una unidad reproducible llamada contenedor.
        Aprende desde los conceptos hasta el despliegue con Docker Compose y
        registros de imágenes.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="que-es-docker">¿Qué es Docker?</BlogH2>

      <BlogP>
        Docker es una plataforma para desarrollar, enviar y ejecutar
        aplicaciones en contenedores. Un contenedor es un proceso aislado que
        comparte el kernel del sistema operativo anfitrión pero tiene su propio
        sistema de archivos, red y espacio de procesos. Eso lo hace mucho más
        ligero que una máquina virtual.
      </BlogP>

      <BlogH3 id="contenedores-vs-vm">
        Contenedores vs máquinas virtuales
      </BlogH3>

      <BlogP>
        Una VM virtualiza el hardware y ejecuta un sistema operativo completo
        por encima de un hypervisor: pesa gigabytes y tarda minutos en arrancar.
        Un contenedor virtualiza solo el espacio de usuario y comparte el kernel
        del host: pesa megabytes, arranca en milisegundos y arranca decenas de
        ellos sin agotar la máquina.
      </BlogP>

      <BlogCallout type="info">
        El aislamiento de contenedores se apoya en funcionalidades del kernel
        Linux: <BlogInlineCode>namespaces</BlogInlineCode> (procesos, red,
        montajes) y <BlogInlineCode>cgroups</BlogInlineCode> (límites de CPU y
        memoria). En macOS y Windows, Docker Desktop ejecuta una VM ligera de
        Linux en segundo plano para darles el mismo comportamiento.
      </BlogCallout>

      <BlogH3 id="imagenes">Imágenes y contenedores</BlogH3>

      <BlogP>
        Una <strong>imagen</strong> es una plantilla inmutable y de solo
        lectura: código, runtime, librerías y configuración. Un{" "}
        <strong>contenedor</strong> es una instancia en ejecución de una imagen:
        puede arrancarse, detenerse, eliminarse y duplicarse. La relación es la
        misma que entre una clase y sus objetos en programación orientada a
        objetos.
      </BlogP>

      <BlogH3 id="daemon">El daemon y el CLI</BlogH3>

      <BlogP>
        Docker tiene dos piezas: el <strong>daemon</strong> (
        <BlogInlineCode>dockerd</BlogInlineCode>), un servicio en segundo plano
        que gestiona imágenes, contenedores, redes y volúmenes; y el{" "}
        <strong>cliente</strong> (<BlogInlineCode>docker</BlogInlineCode>), la
        CLI con la que le das órdenes. Al escribir{" "}
        <BlogInlineCode>docker run</BlogInlineCode>, el cliente envía la
        petición al daemon vía una API REST local.
      </BlogP>

      <BlogP>
        En un flujo de CI/CD verás imágenes empaquetadas en el mismo formato que
        corre en producción: ese es el valor central. Si funciona en tu máquina,
        funcionará en el servidor, porque el contenedor lleva consigo el entorno
        completo.
      </BlogP>

      <BlogH2 id="instalacion">Instalación</BlogH2>

      <BlogP>
        1. Descarga <strong>Docker Desktop</strong> desde docker.com y arrastra
        la app a Aplicaciones. Incluye el daemon, el CLI, Docker Compose y una
        interfaz gráfica.
      </BlogP>
      <BlogP>
        2. Ábrela por primera vez y acepta el uso del Hypervisor (puede pedir
        permisos de administrador).
      </BlogP>
      <BlogP>
        3. Verifica la instalación — el daemon debe estar en ejecución:
      </BlogP>

      <BlogCode>{`docker version
# Client: ... Engine: ... -> todo OK

docker info
# Muestra versión del kernel, contenedores e imágenes actuales`}</BlogCode>

      <BlogP>
        En Linux puedes instalar el engine directamente (
        <BlogInlineCode>apt install docker.io</BlogInlineCode>) y ejecutar
        contenedores sin GUI, pero Docker Desktop es la vía más sencilla en
        macOS y Windows.
      </BlogP>

      <BlogCallout type="warn">
        Si <BlogInlineCode>docker version</BlogInlineCode> falla con{" "}
        <em>"Cannot connect to the Docker daemon"</em>, el problema casi siempre
        es que Docker Desktop no está abierto. Ábrelo y espera a que la ballena
        deje de animarse.
      </BlogCallout>

      <BlogH2 id="primeros-comandos">Primeros comandos</BlogH2>

      <BlogP>
        Descarga una imagen sin ejecutarla con{" "}
        <BlogInlineCode>pull</BlogInlineCode> y ejecútala de forma interactiva
        con <BlogInlineCode>run -it</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`# Descargar la imagen de Ubuntu
docker pull ubuntu:24.04

# Ejecutar un contenedor interactivo con una shell dentro
docker run -it ubuntu:24.04 bash
root@a1b2c3:/# ls /etc/os-release
root@a1b2c3:/# exit

# Ejecutar y eliminar al salir
docker run --rm -it ubuntu:24.04 echo "hola desde un contenedor"`}</BlogCode>

      <BlogP>Gestiona los contenedores en ejecución y detenidos:</BlogP>

      <BlogCode>{`docker ps          # contenedores en ejecución
docker ps -a      # también los detenidos
docker stop <id>  # detener uno
docker rm <id>    # eliminar uno (solo detenidos)
docker rm -f <id> # eliminar incluso en ejecución`}</BlogCode>

      <BlogP>
        Ejecuta un proceso adicional dentro de un contenedor vivo con{" "}
        <BlogInlineCode>exec</BlogInlineCode> — imprescindible para depurar:
      </BlogP>

      <BlogCode>{`docker run -d --name web nginx
docker exec -it web bash
# abre una shell dentro del contenedor nginx

docker logs web   # ver la salida estándar
docker inspect web# JSON con toda la configuración y estado`}</BlogCode>

      <BlogCallout type="info">
        El flag <BlogInlineCode>-d</BlogInlineCode> (detached) ejecuta el
        contenedor en segundo plano y te devuelve el prompt. Con{" "}
        <BlogInlineCode>--name</BlogInlineCode> le pones un identificador
        legible para no depender de IDs largos.
      </BlogCallout>

      <BlogH2 id="dockerfile">El Dockerfile</BlogH2>

      <BlogP>
        Un Dockerfile es un script que describe cómo construir una imagen,
        instrucción a instrucción. Cada instrucción crea una capa inmutable que
        Docker cachea: si una capa no cambia, las siguientes se reutilizan en la
        siguiente construcción.
      </BlogP>

      <BlogCode>{`# Dockerfile de una API Node.js
FROM node:22-alpine

# Directorio de trabajo: todas las instrucciones se ejecutan ahí
WORKDIR /app

# Copiar dependencias primero para aprovechar el cache de capas
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Después el código fuente (cambia más a menudo)
COPY . .

# Puerto que expondrá el contenedor (documental)
EXPOSE 3000

CMD ["node", "src/index.js"]`}</BlogCode>

      <BlogH3 id="entrypoint-vs-cmd">ENTRYPOINT vs CMD</BlogH3>

      <BlogP>
        <BlogInlineCode>CMD</BlogInlineCode> define el comando por defecto y{" "}
        <strong>se puede sobrescribir</strong> al ejecutar:{" "}
        <BlogInlineCode>docker run mi-api node otra.js</BlogInlineCode>.{" "}
        <BlogInlineCode>ENTRYPOINT</BlogInlineCode> define el ejecutable fijo de
        la imagen y no se reemplaza, aunque admite argumentos adicionales.
      </BlogP>

      <BlogCode>{`# ENTRYPOINT fijo: la imagen SIEMPRE ejecuta python app.py
ENTRYPOINT ["python", "app.py"]

# Forma exec (recomendada) vs forma shell
CMD ["python", "app.py"]      # exec: el PID 1 es el proceso real
CMD python app.py             # shell: envuelto en /bin/sh -c`}</BlogCode>

      <BlogCallout type="warn">
        Prefiere siempre la forma exec (array JSON). En la forma shell, el
        proceso real queda envuelto por{" "}
        <BlogInlineCode>/bin/sh -c</BlogInlineCode>, así las señales (CTRL+C,
        SIGTERM) no llegan al proceso y Docker debe esperar un timeout antes de
        forzar el cierre.
      </BlogCallout>

      <BlogP>
        La selección de la imagen base importa: las variantes{" "}
        <BlogInlineCode>-alpine</BlogInlineCode> o{" "}
        <BlogInlineCode>-slim</BlogInlineCode> reducen decenas de megabytes y la
        superficie de ataque, a cambio de alguna librería que quizá debas
        instalar tú mismo.
      </BlogP>

      <BlogH2 id="dockerignore">.dockerignore</BlogH2>

      <BlogP>
        Funciona como <BlogInlineCode>.gitignore</BlogInlineCode>: excluye
        archivos del contexto de construcción que se envía al daemon. Evita
        mandar <BlogInlineCode>node_modules</BlogInlineCode>, builds y archivos
        de entorno con secretos:
      </BlogP>

      <BlogCode>{`node_modules
dist
.env
.git
*.log
.DS_Store`}</BlogCode>

      <BlogCallout type="danger">
        Jamás copies <BlogInlineCode>.env</BlogInlineCode> dentro de la imagen:
        las capas se quedan guardadas y cualquiera con acceso al registro puede
        extraer los secretos. Los valores de entorno se inyectan en tiempo de
        ejecución con <BlogInlineCode>--env-file</BlogInlineCode> o con secretos
        de tu proveedor.
      </BlogCallout>

      <BlogH2 id="build-tag">Construir y etiquetar</BlogH2>

      <BlogP>
        Construye la imagen a partir del Dockerfile con{" "}
        <BlogInlineCode>build</BlogInlineCode> y nómbrala con{" "}
        <BlogInlineCode>-t</BlogInlineCode>. El tag va seguido del registro, el
        repositorio y la versión:
      </BlogP>

      <BlogCode>{`# Construir con tag nombre:version
docker build -t mi-api:v1 .

# Ver las imágenes locales
docker images

# Etiquetar una imagen existente con otro nombre (para subirla a un registro)
docker tag mi-api:v1 ghcr.io/miusuario/mi-api:latest

# Ejecutar mapeando puertos: HOST:CONTENEDOR
docker run -d -p 8080:3000 --name api mi-api:v1
curl http://localhost:8080`}</BlogCode>

      <BlogP>
        En <BlogInlineCode>-p 8080:3000</BlogInlineCode>,{" "}
        <BlogInlineCode>8080</BlogInlineCode> es el puerto de tu máquina y{" "}
        <BlogInlineCode>3000</BlogInlineCode> el puerto interno del contenedor.
        Sin este mapeo, la app queda inaccesible desde el host aunque esté
        escuchando.
      </BlogP>

      <BlogH2 id="volumenes">Volúmenes</BlogH2>

      <BlogP>
        El sistema de archivos de un contenedor es efímero: todo lo que escribas
        desaparece al eliminarlo. Los volúmenes montan datos del host (o
        gestionados por Docker) dentro del contenedor para persistir y compartir
        información:
      </BlogP>

      <BlogCode>{`# Bind mount: carpeta del host dentro del contenedor
docker run -d -p 80:80 -v "$PWD/sitio:/usr/share/nginx/html" nginx

# Named volume: Docker gestiona el almacenamiento por ti
docker volume create datos-postgres
docker run -d -v datos-postgres:/var/lib/postgresql/data postgres:16

docker volume ls
docker volume inspect datos-postgres`}</BlogCode>

      <BlogCallout type="info">
        El bind mount (<BlogInlineCode>-v ruta:ruta</BlogInlineCode>) es ideal
        en desarrollo: editas el código en el host y el contenedor lo ve al
        instante. Los named volumes son la opción correcta para datos de bases
        de datos: Docker controla la ubicación y el backup.
      </BlogCallout>

      <BlogH2 id="compose">Docker Compose</BlogH2>

      <BlogP>
        Compose define en un único archivo YAML los servicios, redes y volúmenes
        de tu aplicación y los arranca con un comando. Es la forma estándar de
        orquestar varios contenedores en desarrollo: una API con su base de
        datos, por ejemplo.
      </BlogP>

      <BlogCode>{`# docker-compose.yml
services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://app:secret@db:5432/app
    depends_on:
      db:
        condition: service_healthy
    volumes:
      - .:/app
      - /app/node_modules

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: app
    volumes:
      - datos-postgres:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app"]
      interval: 5s
      timeout: 3s
      retries: 5

volumes:
  datos-postgres:`}</BlogCode>

      <BlogCode>{`# Arrancar todo en segundo plano
docker compose up -d

# Ver logs de todos los servicios
docker compose logs -f

# Detener y eliminar contenedores (los volúmenes persisten)
docker compose down

# Eliminar también los volúmenes
docker compose down -v`}</BlogCode>

      <BlogP>
        Dentro de la red de Compose, los servicios se resuelven por su nombre:{" "}
        <BlogInlineCode>api</BlogInlineCode> conecta a{" "}
        <BlogInlineCode>db:5432</BlogInlineCode> sin necesidad de IPs ni
        configuración de host. <BlogInlineCode>depends_on</BlogInlineCode> con{" "}
        <BlogInlineCode>condition: service_healthy</BlogInlineCode> espera a que
        la base de datos pase el healthcheck antes de arrancar la API.
      </BlogP>

      <BlogH2 id="registros">Registros y push</BlogH2>

      <BlogP>
        Un registro es un repositorio remoto de imágenes. Docker Hub es el
        público por defecto; GitHub Container Registry (
        <BlogInlineCode>ghcr.io</BlogInlineCode>), GitLab y ECR de AWS son
        alternativas habituales ligadas a tu plataforma de CI/CD.
      </BlogP>

      <BlogCode>{`# Login en Docker Hub
docker login

# Etiquetar con tu usuario de Hub y subir
docker tag mi-api:v1 miusuario/mi-api:v1
docker push miusuario/mi-api:v1

# Cualquiera (o tu CI/CD) puede bajarla
docker pull miusuario/mi-api:v1
docker run -d -p 3000:3000 miusuario/mi-api:v1`}</BlogCode>

      <BlogP>
        Usa tags inmutables por versión (<BlogInlineCode>v1.2.3</BlogInlineCode>
        ) en producción y reserva <BlogInlineCode>latest</BlogInlineCode> para
        desarrollo. Si un despliegue falla, así puedes volver a la versión
        exacta anterior.
      </BlogP>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="ejercicios">Ejercicios</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Ejecuta un contenedor nginx que sirva en el puerto 8080 de tu máquina y comprueba con curl que responde."
          hint="Combina -d, -p y la imagen nginx. El puerto interno de nginx es el 80."
          level="Básico"
          num={1}
          solution={`docker run -d --name web -p 8080:80 nginx
curl http://localhost:8080
# HTML de bienvenida de nginx

docker stop web && docker rm web`}
          title="Correr nginx con puerto mapeado"
        />

        <ExerciseCard
          description="Escribe un Dockerfile para una app Node.js que instale dependencias de producción y ejecute el servidor."
          hint="Copia package.json antes que el resto del código para aprovechar la cache. Usa CMD con forma exec."
          level="Básico"
          num={2}
          solution={`FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "src/index.js"]`}
          title="Escribir un Dockerfile Node.js"
        />

        <ExerciseCard
          description="Construye la imagen del Dockerfile anterior, etiquétala como mi-app:v1 y ejecútala mapeando el puerto 3000."
          hint="docker build -t ... seguido de docker run -p."
          level="Intermedio"
          num={3}
          solution={`docker build -t mi-app:v1 .
docker images
docker run -d -p 3000:3000 --name app mi-app:v1
curl http://localhost:3000
docker logs app`}
          title="Build, tag y run"
        />

        <ExerciseCard
          description="Crea un docker-compose.yml con una API Node.js y una base de datos PostgreSQL, con volúmenes para ambos y healthcheck en la BD."
          hint="Usa services con build para la API, image: postgres para la BD, y un volumen nombrado para los datos."
          level="Intermedio"
          num={4}
          solution={`services:
  api:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgres://app:secret@db:5432/app
    depends_on:
      db:
        condition: service_healthy

  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: app
      POSTGRES_PASSWORD: secret
      POSTGRES_DB: app
    volumes:
      - datos:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app"]
      interval: 5s
      timeout: 3s
      retries: 5

volumes:
  datos:`}
          title="Compose con API + PostgreSQL"
        />

        <ExerciseCard
          description="Crea un volumen nombrado, monta el directorio /data en un contenedor ubuntu, escribe un archivo, elimina el contenedor y comprueba que el dato persiste en un nuevo contenedor."
          hint="Los datos siguen existiendo mientras el volumen exista, aunque el contenedor se elimine."
          level="Avanzado"
          num={5}
          solution={`docker volume create mis-datos
docker run --rm -v mis-datos:/data ubuntu:24.04 bash -c "echo persistente > /data/hola.txt"
# el contenedor se elimina al salir (--rm)

# El volumen conserva el archivo
docker run --rm -v mis-datos:/data ubuntu:24.04 cat /data/hola.txt
# persistente`}
          title="Volumen persistente"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        Con Docker ya tienes el ciclo completo: contenedores aislados, imágenes
        reproducibles, volúmenes persistentes y multi-servicio con Compose. El
        siguiente paso natural es la orquestación: cuando necesitas decenas de
        contenedores con balanceo, escalado y auto-reparación, herramientas como
        Kubernetes toman el relevo.
      </BlogP>
    </article>
  );
}
