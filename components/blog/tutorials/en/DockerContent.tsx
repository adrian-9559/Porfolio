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
  level: "Easy" | "Intermediate" | "Hard";
  description: string;
  hint?: string;
  solution?: string;
}) {
  const [open, setOpen] = useState(false);
  const levelColor = {
    Easy: "bg-green-100 dark:bg-green-950/30 text-green-700 dark:text-green-400",
    Intermediate:
      "bg-amber-100 dark:bg-amber-950/30 text-amber-700 dark:text-amber-400",
    Hard: "bg-red-100 dark:bg-red-950/30 text-red-700 dark:text-red-400",
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
              <strong>Hint:</strong> {hint}
            </div>
          )}
          {solution && <BlogCode>{solution}</BlogCode>}
        </div>
      )}
    </div>
  );
}

export default function DockerContentEn() {
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
        Docker: containers from zero to production
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Docker packages your application together with its environment —
        dependencies, configuration, runtime — into a reproducible unit called a
        container. Learn everything from the core concepts to deployment with
        Docker Compose and image registries.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="what-is-docker">What is Docker?</BlogH2>

      <BlogP>
        Docker is a platform for developing, shipping and running applications
        in containers. A container is an isolated process that shares the host
        operating system kernel but has its own filesystem, network and process
        space. That makes it far lighter than a virtual machine.
      </BlogP>

      <BlogH3 id="containers-vs-vms">Containers vs virtual machines</BlogH3>

      <BlogP>
        A VM virtualizes the hardware and runs a complete operating system on
        top of a hypervisor: it weighs gigabytes and takes minutes to boot. A
        container virtualizes only the user space and shares the host kernel: it
        weighs megabytes, boots in milliseconds, and you can run dozens of them
        without exhausting the machine.
      </BlogP>

      <BlogCallout type="info">
        Container isolation relies on Linux kernel features:{" "}
        <BlogInlineCode>namespaces</BlogInlineCode> (processes, network, mounts)
        and <BlogInlineCode>cgroups</BlogInlineCode> (CPU and memory limits). On
        macOS and Windows, Docker Desktop runs a lightweight Linux VM in the
        background to provide the same behavior.
      </BlogCallout>

      <BlogH3 id="images">Images and containers</BlogH3>

      <BlogP>
        An <strong>image</strong> is an immutable, read-only template: code,
        runtime, libraries and configuration. A <strong>container</strong> is a
        running instance of an image: it can be started, stopped, deleted and
        duplicated. The relationship is the same as between a class and its
        objects in object-oriented programming.
      </BlogP>

      <BlogH3 id="daemon">The daemon and the CLI</BlogH3>

      <BlogP>
        Docker has two pieces: the <strong>daemon</strong> (
        <BlogInlineCode>dockerd</BlogInlineCode>), a background service that
        manages images, containers, networks and volumes; and the{" "}
        <strong>client</strong> (<BlogInlineCode>docker</BlogInlineCode>), the
        CLI you use to issue commands. When you type{" "}
        <BlogInlineCode>docker run</BlogInlineCode>, the client sends the
        request to the daemon over a local REST API.
      </BlogP>

      <BlogP>
        In a CI/CD pipeline you will see images packaged in the exact same
        format that runs in production: that is the core value. If it works on
        your machine, it will work on the server, because the container carries
        the complete environment with it.
      </BlogP>

      <BlogH2 id="installation">Installation</BlogH2>

      <BlogP>
        1. Download <strong>Docker Desktop</strong> from docker.com and drag the
        app into Applications. It bundles the daemon, the CLI, Docker Compose
        and a graphical interface.
      </BlogP>
      <BlogP>
        2. Open it for the first time and accept the hypervisor usage (it may
        ask for administrator permissions).
      </BlogP>
      <BlogP>3. Verify the installation — the daemon must be running:</BlogP>

      <BlogCode>{`docker version
# Client: ... Engine: ... -> all good

docker info
# Shows kernel version, current containers and images`}</BlogCode>

      <BlogP>
        On Linux you can install the engine directly (
        <BlogInlineCode>apt install docker.io</BlogInlineCode>) and run
        containers without a GUI, but Docker Desktop is the easiest path on
        macOS and Windows.
      </BlogP>

      <BlogCallout type="warn">
        If <BlogInlineCode>docker version</BlogInlineCode> fails with{" "}
        <em>"Cannot connect to the Docker daemon"</em>, the problem is almost
        always that Docker Desktop is not open. Launch it and wait until the
        whale stops animating.
      </BlogCallout>

      <BlogH2 id="first-commands">First commands</BlogH2>

      <BlogP>
        Download an image without running it with{" "}
        <BlogInlineCode>pull</BlogInlineCode> and run it interactively with{" "}
        <BlogInlineCode>run -it</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`# Download the Ubuntu image
docker pull ubuntu:24.04

# Run an interactive container with a shell inside
docker run -it ubuntu:24.04 bash
root@a1b2c3:/# cat /etc/os-release
root@a1b2c3:/# exit

# Run and remove the container on exit
docker run --rm -it ubuntu:24.04 echo "hello from a container"`}</BlogCode>

      <BlogP>Manage running and stopped containers:</BlogP>

      <BlogCode>{`docker ps          # running containers
docker ps -a      # also stopped ones
docker stop <id>  # stop one
docker rm <id>    # remove one (only stopped)
docker rm -f <id> # remove even while running`}</BlogCode>

      <BlogP>
        Run an additional process inside a live container with{" "}
        <BlogInlineCode>exec</BlogInlineCode> — essential for debugging:
      </BlogP>

      <BlogCode>{`docker run -d --name web nginx
docker exec -it web bash
# opens a shell inside the nginx container

docker logs web     # view standard output
docker inspect web  # JSON with all configuration and state`}</BlogCode>

      <BlogCallout type="info">
        The <BlogInlineCode>-d</BlogInlineCode> flag (detached) runs the
        container in the background and returns your prompt. With{" "}
        <BlogInlineCode>--name</BlogInlineCode> you give it a readable
        identifier so you don't depend on long IDs.
      </BlogCallout>

      <BlogH2 id="dockerfile">The Dockerfile</BlogH2>

      <BlogP>
        A Dockerfile is a script that describes how to build an image,
        instruction by instruction. Each instruction creates an immutable layer
        that Docker caches: if a layer doesn't change, the following ones are
        reused in the next build.
      </BlogP>

      <BlogCode>{`# Dockerfile for a Node.js API
FROM node:22-alpine

# Working directory: all instructions run here
WORKDIR /app

# Copy dependencies first to leverage the layer cache
COPY package.json package-lock.json ./
RUN npm ci --omit=dev

# Then the source code (changes more often)
COPY . .

# Port the container will expose (documentational)
EXPOSE 3000

CMD ["node", "src/index.js"]`}</BlogCode>

      <BlogH3 id="entrypoint-vs-cmd">ENTRYPOINT vs CMD</BlogH3>

      <BlogP>
        <BlogInlineCode>CMD</BlogInlineCode> defines the default command and{" "}
        <strong>can be overridden</strong> at run time:{" "}
        <BlogInlineCode>docker run my-api node other.js</BlogInlineCode>.{" "}
        <BlogInlineCode>ENTRYPOINT</BlogInlineCode> defines the fixed executable
        of the image and is not replaced, although it accepts extra arguments.
      </BlogP>

      <BlogCode>{`# Fixed ENTRYPOINT: the image ALWAYS runs python app.py
ENTRYPOINT ["python", "app.py"]

# Exec form (recommended) vs shell form
CMD ["python", "app.py"]    # exec: PID 1 is the real process
CMD python app.py           # shell: wrapped in /bin/sh -c`}</BlogCode>

      <BlogCallout type="warn">
        Always prefer the exec form (JSON array). In the shell form the real
        process ends up wrapped in <BlogInlineCode>/bin/sh -c</BlogInlineCode>,
        so signals (CTRL+C, SIGTERM) never reach the process and Docker has to
        wait for a timeout before forcing the shutdown.
      </BlogCallout>

      <BlogP>
        The base image choice matters: the{" "}
        <BlogInlineCode>-alpine</BlogInlineCode> or{" "}
        <BlogInlineCode>-slim</BlogInlineCode> variants shave off tens of
        megabytes and reduce the attack surface, at the cost of some library you
        may need to install yourself.
      </BlogP>

      <BlogH2 id="dockerignore">.dockerignore</BlogH2>

      <BlogP>
        It works like <BlogInlineCode>.gitignore</BlogInlineCode>: it excludes
        files from the build context sent to the daemon. Avoid sending{" "}
        <BlogInlineCode>node_modules</BlogInlineCode>, builds and environment
        files with secrets:
      </BlogP>

      <BlogCode>{`node_modules
dist
.env
.git
*.log
.DS_Store`}</BlogCode>

      <BlogCallout type="danger">
        Never copy <BlogInlineCode>.env</BlogInlineCode> into the image: layers
        are stored forever and anyone with registry access can extract the
        secrets. Environment values are injected at run time with{" "}
        <BlogInlineCode>--env-file</BlogInlineCode> or your provider's secrets.
      </BlogCallout>

      <BlogH2 id="build-tag">Build and tag</BlogH2>

      <BlogP>
        Build the image from the Dockerfile with{" "}
        <BlogInlineCode>build</BlogInlineCode> and name it with{" "}
        <BlogInlineCode>-t</BlogInlineCode>. The tag goes after the registry,
        the repository and the version:
      </BlogP>

      <BlogCode>{`# Build with name:version tag
docker build -t my-api:v1 .

# List local images
docker images

# Tag an existing image with another name (to push it to a registry)
docker tag my-api:v1 ghcr.io/myuser/my-api:latest

# Run mapping ports: HOST:CONTAINER
docker run -d -p 8080:3000 --name api my-api:v1
curl http://localhost:8080`}</BlogCode>

      <BlogP>
        In <BlogInlineCode>-p 8080:3000</BlogInlineCode>,{" "}
        <BlogInlineCode>8080</BlogInlineCode> is the port on your machine and{" "}
        <BlogInlineCode>3000</BlogInlineCode> the internal port of the
        container. Without this mapping the app stays unreachable from the host
        even if it is listening.
      </BlogP>

      <BlogH2 id="volumes">Volumes</BlogH2>

      <BlogP>
        A container's filesystem is ephemeral: everything you write disappears
        when it is deleted. Volumes mount host data (or Docker-managed storage)
        inside the container to persist and share information:
      </BlogP>

      <BlogCode>{`# Bind mount: host folder inside the container
docker run -d -p 80:80 -v "$PWD/site:/usr/share/nginx/html" nginx

# Named volume: Docker manages the storage for you
docker volume create postgres-data
docker run -d -v postgres-data:/var/lib/postgresql/data postgres:16

docker volume ls
docker volume inspect postgres-data`}</BlogCode>

      <BlogCallout type="info">
        The bind mount (<BlogInlineCode>-v path:path</BlogInlineCode>) is ideal
        for development: you edit the code on the host and the container sees it
        instantly. Named volumes are the right choice for database data: Docker
        controls the location and the backup.
      </BlogCallout>

      <BlogH2 id="compose">Docker Compose</BlogH2>

      <BlogP>
        Compose defines your application's services, networks and volumes in a
        single YAML file and starts them with one command. It is the standard
        way to orchestrate several containers in development: an API with its
        database, for example.
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
      - postgres-data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app"]
      interval: 5s
      timeout: 3s
      retries: 5

volumes:
  postgres-data:`}</BlogCode>

      <BlogCode>{`# Start everything in the background
docker compose up -d

# View logs from all services
docker compose logs -f

# Stop and remove containers (volumes persist)
docker compose down

# Also remove the volumes
docker compose down -v`}</BlogCode>

      <BlogP>
        Inside the Compose network, services resolve each other by name:{" "}
        <BlogInlineCode>api</BlogInlineCode> connects to{" "}
        <BlogInlineCode>db:5432</BlogInlineCode> with no IPs or host
        configuration. <BlogInlineCode>depends_on</BlogInlineCode> with{" "}
        <BlogInlineCode>condition: service_healthy</BlogInlineCode> waits for
        the database to pass its healthcheck before starting the API.
      </BlogP>

      <BlogH2 id="registries">Registries and push</BlogH2>

      <BlogP>
        A registry is a remote repository of images. Docker Hub is the public
        default; GitHub Container Registry (
        <BlogInlineCode>ghcr.io</BlogInlineCode>), GitLab and AWS ECR are common
        alternatives tied to your CI/CD platform.
      </BlogP>

      <BlogCode>{`# Login to Docker Hub
docker login

# Tag with your Hub username and push
docker tag my-api:v1 myuser/my-api:v1
docker push myuser/my-api:v1

# Anyone (or your CI/CD) can pull it
docker pull myuser/my-api:v1
docker run -d -p 3000:3000 myuser/my-api:v1`}</BlogCode>

      <BlogP>
        Use immutable version tags (<BlogInlineCode>v1.2.3</BlogInlineCode>) in
        production and keep <BlogInlineCode>latest</BlogInlineCode> for
        development. If a deployment fails, you can roll back to the exact
        previous version.
      </BlogP>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="exercises">Exercises</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Run an nginx container serving on port 8080 of your machine and verify with curl that it responds."
          hint="Combine -d, -p and the nginx image. nginx's internal port is 80."
          level="Easy"
          num={1}
          solution={`docker run -d --name web -p 8080:80 nginx
curl http://localhost:8080
# nginx welcome HTML

docker stop web && docker rm web`}
          title="Run nginx with a mapped port"
        />

        <ExerciseCard
          description="Write a Dockerfile for a Node.js app that installs production dependencies and starts the server."
          hint="Copy package.json before the rest of the code to leverage the cache. Use CMD in exec form."
          level="Easy"
          num={2}
          solution={`FROM node:22-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY . .
EXPOSE 3000
CMD ["node", "src/index.js"]`}
          title="Write a Node.js Dockerfile"
        />

        <ExerciseCard
          description="Build the image from the Dockerfile above, tag it as my-app:v1 and run it mapping port 3000."
          hint="docker build -t ... followed by docker run -p."
          level="Intermediate"
          num={3}
          solution={`docker build -t my-app:v1 .
docker images
docker run -d -p 3000:3000 --name app my-app:v1
curl http://localhost:3000
docker logs app`}
          title="Build, tag and run"
        />

        <ExerciseCard
          description="Create a docker-compose.yml with a Node.js API and a PostgreSQL database, with volumes for both and a healthcheck on the DB."
          hint="Use services with build for the API, image: postgres for the DB, and a named volume for the data."
          level="Intermediate"
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
      - data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app"]
      interval: 5s
      timeout: 3s
      retries: 5

volumes:
  data:`}
          title="Compose with API + PostgreSQL"
        />

        <ExerciseCard
          description="Create a named volume, mount the /data directory in an ubuntu container, write a file, delete the container and verify the data persists in a new container."
          hint="The data keeps existing as long as the volume exists, even after the container is deleted."
          level="Hard"
          num={5}
          solution={`docker volume create my-data
docker run --rm -v my-data:/data ubuntu:24.04 bash -c "echo persistent > /data/hello.txt"
# the container is removed on exit (--rm)

# The volume keeps the file
docker run --rm -v my-data:/data ubuntu:24.04 cat /data/hello.txt
# persistent`}
          title="Persistent volume"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        With Docker you now have the full cycle: isolated containers,
        reproducible images, persistent volumes and multi-service setups with
        Compose. The natural next step is orchestration: when you need dozens of
        containers with load balancing, scaling and self-healing, tools like
        Kubernetes take over.
      </BlogP>
    </article>
  );
}
