"use client";

import {
  BlogH2,
  BlogH3,
  BlogP,
  BlogCode,
  BlogInlineCode,
  BlogCallout,
} from "@/components/blog/shared";

export default function TerraformIacContent() {
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
          60 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        Infraestructura como código con Terraform
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Terraform permite definir, versionar y ejecutar infraestructura
        completa mediante archivos declarativos. Aprende a convertir servidores,
        redes y servicios en código que se puede revisar, probar y ejecutar de
        forma repetible.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="que-es-iac">¿Qué es IaC?</BlogH2>

      <BlogP>
        Infraestructura como código (<strong>IaC</strong>) es el práctica de
        gestionar y aprovisionar recursos de infraestructura mediante archivos
        de configuración en lugar de procesos manuales. En vez de hacer clic en
        una consola web o ejecutar comandos <BlogInlineCode>ssh</BlogInlineCode>{" "}
        uno por uno, describes el estado deseado en archivos que se pueden
        versionar, auditar y ejecutar automáticamente.
      </BlogP>

      <BlogH3 id="declarativo-vs-imperativo">Declarativo vs imperativo</BlogH3>

      <BlogP>
        El enfoque <strong>declarativo</strong> (Terraform, CloudFormation) dice{" "}
        <em>"quiero que exista X con estas propiedades"</em> y el motor se
        encarga de calcular los pasos necesarios. El enfoque{" "}
        <strong>imperativo</strong> (scripts Bash, Pulumi en modo procedural)
        describe paso a paso cómo llegar al resultado. Terraform es declarativo
        por naturaleza: defines el estado final y él decide qué crear, modificar
        o eliminar.
      </BlogP>

      <BlogH3 id="beneficios-iac">Beneficios de IaC</BlogH3>

      <BlogP>
        <strong>Reproducibilidad</strong> — la misma configuración produce el
        mismo entorno en desarrollo, staging y producción.{" "}
        <strong>Versionado</strong> — cada cambio queda registrado en Git con un
        diff legible. <strong>Auditabilidad</strong> — puedes revisar quién
        cambió qué y cuándo.{" "}
        <strong>Colaboración</strong> — el equipo trabaja sobre los mismos
        archivos en vez de sobre conocimiento tácito.
      </BlogP>

      <BlogCallout type="info">
        IaC no reemplaza la experimentación — primero prueba en un entorno
        temporal, luego codifica lo que funciona. Terraform tiene{" "}
        <BlogInlineCode>plan</BlogInlineCode> justamente para eso: ver qué
        cambiaría antes de ejecutar.
      </BlogCallout>

      <BlogH2 id="primeros-pasos">Primeros pasos con Terraform</BlogH2>

      <BlogH3 id="instalacion-tf">Instalación</BlogH3>

      <BlogP>
        En macOS instala con Homebrew. En Linux descarga el binario o usa el
        gestor de paquetes. En Windows usa{" "}
        <BlogInlineCode>winget</BlogInlineCode> o Chocolatey.
      </BlogP>

      <BlogCode>{`# macOS
brew install hashicorp/tap/terraform

# Linux (Debian/Ubuntu)
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform

# Verificar instalación
terraform version`}</BlogCode>

      <BlogH3 id="sintaxis-hcl">Sintaxis HCL</BlogH3>

      <BlogP>
        Terraform usa <strong>HCL</strong> (HashiCorp Configuration Language).
        Un archivo <BlogInlineCode>.tf</BlogInlineCode> contiene bloques con
        atributos, comentarios con <BlogInlineCode>#</BlogInlineCode> o{" "}
        <BlogInlineCode>//</BlogInlineCode>, y strings entre comillas.
      </BlogP>

      <BlogCode>{`# Esto es un comentario en línea
terraform {
  required_version = ">= 1.5"

  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

# Bloque provider: configura DÓNDE ejecutar
provider "docker" {
  host = "unix:///var/run/docker.sock"
}

# Bloque resource: define QUÉ crear
resource "docker_container" "web" {
  name  = "mi-nginx"
  image = docker_image.nginx.image_id

  ports {
    internal = 80
    external = 8080
  }
}

# Bloque data: consulta recursos existentes
data "docker_image" "nginx" {
  name = "nginx:alpine"
}`}</BlogCode>

      <BlogH3 id="providers">Providers</BlogH3>

      <BlogP>
        Los <strong>providers</strong> son plugins que conectan Terraform con
        APIs externas: AWS, Azure, GCP, Docker, Kubernetes, GitHub, etc. Cada
        provider expone recursos y data sources que puedes usar en tu
        configuración.
      </BlogP>

      <BlogH3 id="ciclo-vida">Init / Plan / Apply / Destroy</BlogH3>

      <BlogP>
        El ciclo de vida de Terraform tiene cuatro comandos fundamentales:
      </BlogP>

      <BlogCode>{`# 1. init: descarga providers y configura el backend
terraform init

# 2. plan: muestra qué cambiaría (dry run)
terraform plan

# 3. apply: ejecuta los cambios
terraform apply

# 4. destroy: elimina todo lo gestionado
terraform destroy`}</BlogCode>

      <BlogH3 id="state-file">El state file</BlogH3>

      <BlogP>
        Terraform guarda el estado actual de la infraestructura en un archivo{" "}
        <BlogInlineCode>terraform.tfstate</BlogInlineCode>. Este archivo mapea
        los recursos definidos en código con los recursos reales en el proveedor.
        <strong>Nunca lo edites a mano</strong> — usa{" "}
        <BlogInlineCode>terraform state</BlogInlineCode> para manipularlo.
      </BlogP>

      <BlogCallout type="warn">
        El state file contiene datos sensibles (contraseñas, tokens). No lo
        subas a Git. Usa un backend remoto como S3 con bloqueo DynamoDB para
        producción.
      </BlogCallout>

      <BlogP>
        Ejemplo práctico: provisionar un contenedor Docker con Terraform:
      </BlogP>

      <BlogCode>{`# main.tf
terraform {
  required_providers {
    docker = {
      source  = "kreuzwerker/docker"
      version = "~> 3.0"
    }
  }
}

provider "docker" {}

resource "docker_image" "nginx" {
  name = "nginx:alpine"
}

resource "docker_container" "web" {
  name  = "terraform-nginx"
  image = docker_image.nginx.image_id

  ports {
    internal = 80
    external = 8080
  }
}

# Ejecutar:
# terraform init
# terraform apply -auto-approve
# curl http://localhost:8080  -> funciona
# terraform destroy -auto-approve`}</BlogCode>

      <BlogH2 id="recursos-variables">Recursos, variables y outputs</BlogH2>

      <BlogH3 id="resources">Resources</BlogH3>

      <BlogP>
        Los <strong>resources</strong> son los bloques que definen componentes
        de infraestructura. Cada resource tiene un tipo (
        <BlogInlineCode>aws_instance</BlogInlineCode>,{" "}
        <BlogInlineCode>docker_container</BlogInlineCode>) y un nombre lógico.
        Terraform compara el estado actual con el deseado y ejecuta los cambios
        necesarios.
      </BlogP>

      <BlogH3 id="data-sources">Data Sources</BlogH3>

      <BlogP>
        Los <strong>data sources</strong> permiten consultar información de
        recursos que ya existen sin gestionarlos. Útiles para obtener AMIs
       最新, IPs de VPCs existentes o IDs de subnets.
      </BlogP>

      <BlogCode>{`data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}`}</BlogCode>

      <BlogH3 id="variables-tf">Variables</BlogH3>

      <BlogP>
        Las variables parametrizan tu configuración. Terraform soporta strings,
        números, booleanos, listas y maps. Defínelas en{" "}
        <BlogInlineCode>variables.tf</BlogInlineCode> y asigna valores en{" "}
        <BlogInlineCode>terraform.tfvars</BlogInlineCode>.
      </BlogP>

      <BlogCode>{`# variables.tf
variable "container_name" {
  description = "Nombre del contenedor"
  type        = string
  default     = "mi-app"
}

variable "replicas" {
  description = "Número de réplicas"
  type        = number
  default     = 1
}

variable "enable_logging" {
  description = "Activar logging"
  type        = bool
  default     = true
}

variable "ports" {
  description = "Puertos a exponer"
  type        = list(number)
  default     = [80, 443]
}

variable "environment_vars" {
  description = "Variables de entorno"
  type        = map(string)
  default = {
    NODE_ENV = "production"
    LOG_LEVEL = "info"
  }
}

# terraform.tfvars
container_name  = "web-production"
replicas        = 3
enable_logging  = true
ports           = [80, 443, 8080]
environment_vars = {
  NODE_ENV   = "production"
  LOG_LEVEL  = "warn"
}`}</BlogCode>

      <BlogH3 id="outputs-tf">Outputs</BlogH3>

      <BlogP>
        Los <strong>outputs</strong> exponen información útil tras el{" "}
        <BlogInlineCode>apply</BlogInlineCode>: IPs públicas, IDs de
        recursos, URLs de endpoints. Marca valores sensibles con{" "}
        <BlogInlineCode>sensitive = true</BlogInlineCode> para que no se
        muestren en la CLI.
      </BlogP>

      <BlogCode>{`# outputs.tf
output "container_id" {
  description = "ID del contenedor creado"
  value       = docker_container.web.id
}

output "app_url" {
  description = "URL de la aplicación"
  value       = "http://localhost:8080"
}

output "db_password" {
  description = "Contraseña de la base de datos"
  value       = var.db_password
  sensitive   = true
}`}</BlogCode>

      <BlogP>
        Ejemplo completo: crear un security group parametrizado con variables:
      </BlogP>

      <BlogCode>{`# variables.tf
variable "allowed_ports" {
  type    = list(number)
  default = [22, 80, 443]
}

variable "allowed_cidrs" {
  type    = list(string)
  default = ["0.0.0.0/0"]
}

# main.tf
resource "aws_security_group" "web" {
  name        = "web-sg"
  description = "Security group para servidores web"

  dynamic "ingress" {
    for_each = var.allowed_ports
    content {
      from_port   = ingress.value
      to_port     = ingress.value
      protocol    = "tcp"
      cidr_blocks = var.allowed_cidrs
    }
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }
}`}</BlogCode>

      <BlogH2 id="modulos">Módulos reutilizables</BlogH2>

      <BlogP>
        Un <strong>módulo</strong> es un paquete de configuración Terraform que
        agrupa recursos relacionados y expone inputs (variables) y outputs.
        Los módulos promueven la reutilización, el testing y la separación de
        responsabilidades.
      </BlogP>

      <BlogH3 id="estructura-modulo">Estructura de directorios</BlogH3>

      <BlogCode>{`modules/
  docker-app/
    main.tf         # recursos principales
    variables.tf    # inputs del módulo
    outputs.tf      # outputs del módulo
    README.md       # documentación`}</BlogCode>

      <BlogH3 id="registry-modulos">Módulos del registry</BlogH3>

      <BlogP>
        Terraform tiene un registry público en{" "}
        <BlogInlineCode>registry.terraform.io</BlogInlineCode> con módulos
        oficiales para AWS, GCP, Azure y terceros. Usa módulos verificados
        para infraestructura de producción.
      </BlogP>

      <BlogCode>{`# Usar un módulo del registry
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.1.0"

  name = "mi-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["eu-west-1a", "eu-west-1b"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]
}

# Acceder a outputs del módulo
output "vpc_id" {
  value = module.vpc.vpc_id
}`}</BlogCode>

      <BlogP>
        Ejemplo: módulo para deploy de una app con Docker provider que acepta
        imagen, puerto y replicas:
      </BlogP>

      <BlogCode>{`# modules/docker-app/main.tf
variable "image" {
  type = string
}

variable "port" {
  type    = number
  default = 80
}

variable "replicas" {
  type    = number
  default = 1
}

resource "docker_image" "app" {
  name = var.image
}

resource "docker_container" "app" {
  count = var.replicas
  name  = "app-\${count.index + 1}"
  image = docker_image.app.image_id

  ports {
    internal = var.port
    external = var.port + count.index
  }
}

# modules/docker-app/outputs.tf
output "container_ids" {
  value = docker_container.app[*].id
}

output "endpoints" {
  value = [for c in docker_container.app :
    "http://localhost:\${c.ports[0].external}"
  ]
}

# --- Uso del módulo ---
module "web_app" {
  source   = "./modules/docker-app"
  image    = "nginx:alpine"
  port     = 80
  replicas = 3
}

output "urls" {
  value = module.web_app.endpoints
}`}</BlogCode>

      <BlogCallout type="info">
        Los módulos locales se referencian con{" "}
        <BlogInlineCode>source = "./ruta"</BlogInlineCode>. Los del registry
        usan <BlogInlineCode>source = "organizacion/modulo-provider"</BlogInlineCode>.
        Siempre fija la versión con <BlogInlineCode>version = "~&gt; X.Y"</BlogInlineCode>{" "}
        para evitar breaking changes.
      </BlogCallout>

      <BlogH2 id="buenas-practicas">Buenas prácticas y CI/CD para IaC</BlogH2>

      <BlogH3 id="remote-state">Remote state</BlogH3>

      <BlogP>
        En producción nunca uses el state file local. Configura un{" "}
        <strong>backend remoto</strong> como S3 con bloqueo DynamoDB para
        evitar que dos personas ejecuten <BlogInlineCode>apply</BlogInlineCode>{" "}
        simultáneamente.
      </BlogP>

      <BlogCode>{`# backend.tf
terraform {
  backend "s3" {
    bucket         = "mi-terraform-state"
    key            = "produccion/terraform.tfstate"
    region         = "eu-west-1"
    dynamodb_table = "terraform-locks"
    encrypt        = true
  }
}

# Crear el bucket y tabla DynamoDB primero (one-time setup)
# aws s3api create-bucket --bucket mi-terraform-state --region eu-west-1
# aws dynamodb create-table --table-name terraform-locks \\
#   --attribute-definitions AttributeName=LockID,AttributeType=S \\
#   --key-schema AttributeName=LockID,KeyType=HASH \\
#   --billing-mode PAY_PER_REQUEST`}</BlogCode>

      <BlogH3 id="workspaces">Workspaces</BlogH3>

      <BlogP>
        Los <strong>workspaces</strong> permiten tener múltiples estados en el
        mismo directorio. Usa uno por entorno:{" "}
        <BlogInlineCode>dev</BlogInlineCode>,{" "}
        <BlogInlineCode>staging</BlogInlineCode>,{" "}
        <BlogInlineCode>prod</BlogInlineCode>. Cada workspace tiene su propio{" "}
        <BlogInlineCode>terraform.tfstate</BlogInlineCode>.
      </BlogP>

      <BlogCode>{`terraform workspace new dev
terraform workspace new staging
terraform workspace new prod

terraform workspace list
terraform workspace select dev

# Ejecutar apply solo en el workspace activo
terraform apply`}</BlogCode>

      <BlogH3 id="drift-detection">Drift detection</BlogH3>

      <BlogP>
        El <strong>drift</strong> ocurre cuando alguien modifica la
        infraestructura manualmente (fuera de Terraform). Detecta drift
        ejecutando <BlogInlineCode>terraform plan</BlogInlineCode> en un
        pipeline periódico: si hay cambios no esperados, falla la build y avisa.
      </BlogP>

      <BlogH3 id="tfsec">tfsec para seguridad</BlogH3>

      <BlogP>
        <BlogInlineCode>tfsec</BlogInlineCode> (o{" "}
        <BlogInlineCode>trivy config</BlogInlineCode>) escanea tu código
        Terraform en busca de malas prácticas de seguridad: puertos abiertos,
        blobs sin cifrado, IAM overly permissive, etc. Ejecútalo como paso
        previo al <BlogInlineCode>plan</BlogInlineCode>.
      </BlogP>

      <BlogCode>{`# Instalar tfsec
brew install aquasecurity/tap/tfsec

# Ejecutar sobre el directorio actual
tfsec .

# Output en formato JSON para CI
tfsec . --format json --out tfsec-report.json`}</BlogCode>

      <BlogH3 id="cicd-terraform">Pipeline CI/CD con GitHub Actions</BlogH3>

      <BlogP>
        El flujo estándar: PR ejecuta{" "}
        <BlogInlineCode>terraform plan</BlogInlineCode> y comenta el resultado.
        Tras el merge a main, ejecuta{" "}
        <BlogInlineCode>terraform apply</BlogInlineCode> con aprobación
        manual.
      </BlogP>

      <BlogCode>{`# .github/workflows/terraform.yml
name: Terraform CI/CD

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

permissions:
  contents: read
  pull-requests: write
  id-token: write

jobs:
  terraform:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: "1.7.0"

      - name: Terraform fmt
        run: terraform fmt -check

      - name: Terraform Init
        run: terraform init
        env:
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}

      - name: Terraform Validate
        run: terraform validate

      - name: Terraform Plan
        id: plan
        run: terraform plan -no-color
        env:
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}

      - name: Comentar plan en PR
        if: github.event_name == 'pull_request'
        uses: actions/github-script@v7
        with:
          script: |
            github.rest.issues.createComment({
              issue_number: context.issue.number,
              owner: context.repo.owner,
              repo: context.repo.repo,
              body: \\\`### Terraform Plan
            \\\`\\\`\\\`
            \\\${{ steps.plan.outputs.stdout }}
            \\\`\\\`\\\`
            \\\`
            body: \\\`### Terraform Plan
            \\\`\\\`\\\`
            \\\${{ steps.plan.outputs.stdout }}
            \\\`\\\`\\\`
            \\\`

      - name: Terraform Apply
        if: github.ref == 'refs/heads/main' && github.event_name == 'push'
        run: terraform apply -auto-approve
        env:
          AWS_ACCESS_KEY_ID: \${{ secrets.AWS_ACCESS_KEY_ID }}
          AWS_SECRET_ACCESS_KEY: \${{ secrets.AWS_SECRET_ACCESS_KEY }}`}</BlogCode>

      <BlogCallout type="danger">
        Nunca hagas <BlogInlineCode>terraform apply</BlogInlineCode> sin{" "}
        <BlogInlineCode>terraform plan</BlogInlineCode> primero en
        producción. El plan es tu seguro: muestra exactamente qué se va a crear,
        modificar o destruir antes de tocar infraestructura real.
      </BlogCallout>

      <BlogCallout type="info">
        Usa <strong>aprobación manual</strong> en GitHub Actions para el apply
        en producción. Configura <BlogInlineCode>environment: production</BlogInlineCode>{" "}
        en el job para que requiera aprobación de un maintainer antes de ejecutar.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        Con Terraform tienes el ciclo completo de infraestructura como código:
        definir declarativamente, planificar cambios, ejecutar de forma
        repetible y gestionar estado remoto. El siguiente paso natural es
        integrar módulos con CI/CD, agregar testing con{" "}
        <BlogInlineCode>terratest</BlogInlineCode> y explorar herramientas
        como OpenTofu como alternativa open-source.
      </BlogP>
    </article>
  );
}
