"use client";

import {
  BlogH2,
  BlogH3,
  BlogP,
  BlogCode,
  BlogInlineCode,
  BlogCallout,
} from "@/components/blog/shared";

export default function TerraformIacContentEn() {
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
        Terraform: Infrastructure as Code
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Stop clicking through cloud consoles. With Terraform you declare
        infrastructure in code, version it, review it like any other change and
        reproduce entire environments with a single command.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="what-is-iac">What is IaC?</BlogH2>

      <BlogP>
        <strong>Infrastructure as Code</strong> means managing and provisioning
        infrastructure — servers, networks, databases, DNS records — through
        machine-readable configuration files instead of manual clicks in a
        web console. The same way you version application code, you version your
        infrastructure.
      </BlogP>

      <BlogP>
        There are two main approaches.{" "}
        <strong>Imperative</strong> scripts describe each step: "create this VPC,
        then this subnet, then this instance."{" "}
        <strong>Declarative</strong> tools like Terraform describe the{" "}
        <em>desired end state</em> and let the engine figure out the steps to
        get there.
      </BlogP>

      <BlogP>
        The benefits are significant:{" "}
        <strong>reproducibility</strong> (spin up identical environments on
        demand), <strong>versioning</strong> (git history of every
        infrastructure change), <strong>auditability</strong> (review PRs for
        infra), and <strong>collaboration</strong> (teams share modules and
        conventions).
      </BlogP>

      <BlogP>
        Terraform by HashiCorp has become the de facto standard for multi-cloud
        IaC. It uses <BlogInlineCode>HCL</BlogInlineCode> (HashiCorp
        Configuration Language), works with hundreds of providers (AWS, GCP,
        Azure, Docker, Supabase, Cloudflare...), and manages state
        automatically so it knows what exists, what changed and what needs to be
        destroyed.
      </BlogP>

      <BlogCallout type="info">
        IaC doesn&apos;t replace hands-on experimentation. The recommended workflow is:
        test manually or in a throwaway sandbox first, then codify what you
        learned. The code becomes the single source of truth.
      </BlogCallout>

      <BlogH2 id="getting-started">Getting Started with Terraform</BlogH2>

      <BlogH3 id="installation">Installation</BlogH3>

      <BlogP>
        Install via Homebrew on macOS or the official packages on Linux:
      </BlogP>

      <BlogCode>{`# macOS
brew install terraform

# Linux (Debian/Ubuntu)
wget -O- https://apt.releases.hashicorp.com/gpg | sudo gpg --dearmor -o /usr/share/keyrings/hashicorp-archive-keyring.gpg
echo "deb [signed-by=/usr/share/keyrings/hashicorp-archive-keyring.gpg] https://apt.releases.hashicorp.com $(lsb_release -cs) main" | sudo tee /etc/apt/sources.list.d/hashicorp.list
sudo apt update && sudo apt install terraform

# Verify
terraform --version
# Terraform v1.9.x`}</BlogCode>

      <BlogH3 id="hcl-syntax">HCL Syntax</BlogH3>

      <BlogP>
        Terraform configuration lives in <BlogInlineCode>.tf</BlogInlineCode>{" "}
        files. HCL is human-readable and supports blocks, attributes and
        comments:
      </BlogP>

      <BlogCode>{`# This is a comment
# Block syntax: "resource" "type" "name" { ... }
resource "docker_container" "web" {
  name  = "nginx-server"
  image = docker_image.nginx.name
  ports {
    internal = 80
    external = 8080
  }
}

# Attribute assignment
variable "region" {
  type    = string
  default = "eu-west-1"
}

# Single-line and multi-line comments
/* This is also
   a comment */`}</BlogCode>

      <BlogH3 id="providers">Providers</BlogH3>

      <BlogP>
        Providers are plugins that let Terraform interact with platforms. Each
        provider exposes resources and data sources:
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

provider "docker" {
  host = "unix:///var/run/docker.sock"
}

resource "docker_image" "nginx" {
  name = "nginx:alpine"
}

resource "docker_container" "nginx" {
  name  = "web"
  image = docker_image.nginx.name
  ports {
    internal = 80
    external = 8080
  }
}`}</BlogCode>

      <BlogH3 id="workflow">The Core Workflow</BlogH3>

      <BlogP>
        The Terraform lifecycle has four commands you&apos;ll use constantly:
      </BlogP>

      <BlogCode>{`# 1. Initialize — downloads providers, sets up the backend
terraform init

# 2. Plan — shows what will be created/changed/destroyed
terraform plan

# 3. Apply — executes the plan (asks for confirmation)
terraform apply

# 4. Destroy — tears down everything managed by this config
terraform destroy`}</BlogCode>

      <BlogP>
        Terraform keeps a <strong>state file</strong>{" "}
        (<BlogInlineCode>terraform.tfstate</BlogInlineCode>) that maps your
        configuration to real-world resources. Never edit this file manually —
        always use <BlogInlineCode>terraform state</BlogInlineCode> commands or
        let the engine manage it.
      </BlogP>

      <BlogCallout type="warn">
        The <BlogInlineCode>.tfstate</BlogInlineCode> file contains sensitive
        data (IP addresses, passwords, keys). Add it to{" "}
        <BlogInlineCode>.gitignore</BlogInlineCode> and use remote state in
        production.
      </BlogCallout>

      <BlogH2 id="resources-variables">Resources, Variables and Outputs</BlogH2>

      <BlogH3 id="resources">Resources and Data Sources</BlogH3>

      <BlogP>
        <strong>Resources</strong> are the infrastructure objects Terraform
        manages. <strong>Data sources</strong> (read with{" "}
        <BlogInlineCode>data</BlogInlineCode>) let you query existing
        infrastructure without creating it:
      </BlogP>

      <BlogCode>{`# A managed resource — Terraform creates and owns this
resource "aws_instance" "api" {
  ami           = "ami-0c55b159cbfafe1f0"
  instance_type = "t3.micro"

  tags = {
    Name = "api-server"
  }
}

# A data source — reads existing infrastructure
data "aws_ami" "ubuntu" {
  most_recent = true
  owners      = ["099720109477"]

  filter {
    name   = "name"
    values = ["ubuntu/images/hvm-ssd/ubuntu-jammy-22.04-amd64-server-*"]
  }
}`}</BlogCode>

      <BlogH3 id="variables">Variables</BlogH3>

      <BlogP>
        Variables make configs parameterized and reusable. Terraform supports
        several types:
      </BlogP>

      <BlogCode>{`# variables.tf
variable "region" {
  type        = string
  description = "AWS region"
  default     = "eu-west-1"
}

variable "instance_count" {
  type    = number
  default = 2
}

variable "enable_monitoring" {
  type    = bool
  default = true
}

variable "allowed_cidrs" {
  type    = list(string)
  default = ["10.0.0.0/8"]
}

variable "tags" {
  type = map(string)
  default = {
    Environment = "staging"
    Team        = "backend"
  }
}`}</BlogCode>

      <BlogP>
        Set values via <BlogInlineCode>terraform.tfvars</BlogInlineCode> files,
        CLI flags, or environment variables:
      </BlogP>

      <BlogCode>{`# terraform.tfvars
region             = "eu-west-1"
instance_count     = 3
enable_monitoring  = false
allowed_cidrs      = ["10.0.0.0/8", "192.168.1.0/16"]
tags = {
  Environment = "production"
  Team        = "platform"
}`}</BlogCode>

      <BlogH3 id="outputs">Outputs</BlogH3>

      <BlogP>
        Outputs expose values after apply — useful for referencing between
        modules or printing to the console:
      </BlogP>

      <BlogCode>{`# outputs.tf
output "instance_ids" {
  description = "IDs of the created instances"
  value       = aws_instance.api[*].id
}

output "public_ip" {
  description = "Public IP of the first instance"
  value       = aws_instance.api[0].public_ip
}

# Sensitive output — hidden in plan/apply logs
output "db_password" {
  value     = random_password.db.result
  sensitive = true
}`}</BlogCode>

      <BlogCallout type="tip">
        Use <BlogInlineCode>sensitive = true</BlogInlineCode> on outputs that
        contain secrets. Terraform will redact the value in CLI output and
        logs.
      </BlogCallout>

      <BlogP>
        A practical example — a security group with parameterized rules:
      </BlogP>

      <BlogCode>{`# security_group.tf
variable "ssh_allowed_cidrs" {
  type = list(string)
}

resource "aws_security_group" "api" {
  name        = "api-sg"
  description = "Security group for the API server"

  ingress {
    from_port   = 443
    to_port     = 443
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
    description = "HTTPS from anywhere"
  }

  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = var.ssh_allowed_cidrs
    description = "SSH from trusted IPs"
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "api-sg"
  }
}

output "sg_id" {
  value = aws_security_group.api.id
}`}</BlogCode>

      <BlogH2 id="modules">Reusable Modules</BlogH2>

      <BlogP>
        Modules are the building blocks of reusable Terraform. A module is just
        a directory with <BlogInlineCode>.tf</BlogInlineCode> files that
        accepts inputs (variables) and returns outputs. You can publish modules
        to the{" "}
        <BlogInlineCode>registry.terraform.io</BlogInlineCode> or consume them
        locally.
      </BlogP>

      <BlogH3 id="module-structure">Module Directory Structure</BlogH3>

      <BlogCode>{`modules/
  docker-app/
    main.tf          # resources
    variables.tf     # input variables
    outputs.tf       # output values
    README.md        # documentation`}</BlogCode>

      <BlogH3 id="writing-a-module">Writing a Module</BlogH3>

      <BlogCode>{`# modules/docker-app/variables.tf
variable "app_name" {
  type        = string
  description = "Name of the application"
}

variable "image" {
  type        = string
  description = "Docker image to deploy"
}

variable "port" {
  type        = number
  description = "Host port to expose"
  default     = 8080
}

variable "replicas" {
  type    = number
  default = 1
}`}</BlogCode>

      <BlogCode>{`# modules/docker-app/main.tf
resource "docker_image" "app" {
  name = var.image
}

resource "docker_container" "app" {
  count = var.replicas
  name  = "\${var.app_name}-\${count.index + 1}"
  image = docker_image.app.name
  ports {
    internal = 80
    external = var.port + count.index
  }
}`}</BlogCode>

      <BlogCode>{`# modules/docker-app/outputs.tf
output "container_names" {
  value = docker_container.app[*].name
}

output "mapped_ports" {
  value = docker_container.app[*].ports[0].external
}`}</BlogCode>

      <BlogH3 id="using-modules">Using a Module</BlogH3>

      <BlogP>
        Reference a local module by path or a registry module by slug:
      </BlogP>

      <BlogCode>{`# root main.tf — local module
module "backend" {
  source   = "./modules/docker-app"
  app_name = "backend"
  image    = "node:20-alpine"
  port     = 3000
  replicas = 3
}

# Registry module example
module "vpc" {
  source  = "terraform-aws-modules/vpc/aws"
  version = "5.1.0"

  name = "my-vpc"
  cidr = "10.0.0.0/16"

  azs             = ["eu-west-1a", "eu-west-1b", "eu-west-1c"]
  private_subnets = ["10.0.1.0/24", "10.0.2.0/24"]
  public_subnets  = ["10.0.101.0/24", "10.0.102.0/24"]
}

# Access module outputs
output "backend_containers" {
  value = module.backend.container_names
}

output "vpc_id" {
  value = module.vpc.vpc_id
}`}</BlogCode>

      <BlogCallout type="info">
        Start with official registry modules for common infrastructure (VPC,
        RDS, ECS). Write your own modules for company-specific patterns.
        Modules are the key to keeping Terraform configs DRY at scale.
      </BlogCallout>

      <BlogH2 id="best-practices">Best Practices and CI/CD for IaC</BlogH2>

      <BlogH3 id="remote-state">Remote State</BlogH3>

      <BlogP>
        Never use local <BlogInlineCode>terraform.tfstate</BlogInlineCode> in
        production. Store state remotely with locking to prevent concurrent
        modifications:
      </BlogP>

      <BlogCode>{`# backend.tf
terraform {
  backend "s3" {
    bucket         = "my-terraform-state"
    key            = "prod/infrastructure.tfstate"
    region         = "eu-west-1"
    encrypt        = true
    dynamodb_table = "terraform-locks"
  }
}

# Create the S3 bucket + DynamoDB table once with a bootstrap config:
# aws s3api create-bucket --bucket my-terraform-state --region eu-west-1
# aws dynamodb create-table \\
#   --table-name terraform-locks \\
#   --attribute-definitions AttributeName=LockID,AttributeType=S \\
#   --key-schema AttributeName=LockID,KeyType=HASH \\
#   --billing-mode PAY_PER_REQUEST`}</BlogCode>

      <BlogH3 id="workspaces">Workspaces</BlogH3>

      <BlogP>
        Workspaces let you manage multiple state files from the same
        configuration — perfect for dev/staging/prod environments:
      </BlogP>

      <BlogCode>{`# Create and switch workspaces
terraform workspace new dev
terraform workspace new staging
terraform workspace new prod

# List and select
terraform workspace list
terraform workspace select staging

# Reference the current workspace
resource "aws_instance" "api" {
  instance_type = terraform.workspace == "prod" ? "t3.medium" : "t3.micro"
}`}</BlogCode>

      <BlogH3 id="drift-detection">Drift Detection</BlogH3>

      <BlogP>
        Infrastructure drift happens when someone makes manual changes outside
        Terraform. Detect it by running{" "}
        <BlogInlineCode>terraform plan</BlogInlineCode> regularly — it will
        show any differences between state and reality:
      </BlogP>

      <BlogCode>{`# Detect drift
terraform plan

# If drift is found, you can either:
# 1. Import the manual change into state
terraform import aws_instance.api i-0abc123def456

# 2. Revert the manual change
terraform apply  # brings infrastructure back to config state`}</BlogCode>

      <BlogH3 id="security">Security with tfsec</BlogH3>

      <BlogP>
        <BlogInlineCode>tfsec</BlogInlineCode> (now{" "}
        <BlogInlineCode>trivy config</BlogInlineCode>) scans your Terraform
        for security misconfigurations before you apply:
      </BlogP>

      <BlogCode>{`# Install tfsec
brew install tfsec

# Run against current directory
tfsec .

# Example finding:
# aws/security-group.tf:1
#   [WARN] Security group rule allows unrestricted ingress on port 22.
#   Ensure access to the SSH port is restricted to known IPs.

# trivy (newer replacement)
trivy config --severity HIGH,CRITICAL .`}</BlogCode>

      <BlogH3 id="cicd">CI/CD with GitHub Actions</BlogH3>

      <BlogP>
        Automate <BlogInlineCode>terraform plan</BlogInlineCode> on PRs and{" "}
        <BlogInlineCode>terraform apply</BlogInlineCode> on merge to main:
      </BlogP>

      <BlogCode>{`# .github/workflows/terraform.yml
name: Terraform

on:
  pull_request:
    paths: ["terraform/**"]
  push:
    branches: [main]
    paths: ["terraform/**"]

defaults:
  run:
    working-directory: terraform

permissions:
  id-token: write   # OIDC for AWS
  contents: read
  pull-requests: write

jobs:
  terraform:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: hashicorp/setup-terraform@v3
        with:
          terraform_version: "1.9.x"

      - name: Configure AWS credentials
        uses: aws-actions/configure-aws-credentials@v4
        with:
          role-to-assume: arn:aws:iam::ACCOUNT_ID:role/terraform-ci
          aws-region: eu-west-1

      - name: Terraform Init
        run: terraform init

      - name: Terraform Format Check
        run: terraform fmt -check -recursive

      - name: Terraform Validate
        run: terraform validate

      - name: Terraform Plan
        run: terraform plan -out=tfplan -no-color
        if: github.event_name == 'pull_request'

      - name: Comment plan on PR
        uses: actions/github-script@v7
        if: github.event_name == 'pull_request'
        with:
          script: |
            const plan = \`\${{ steps.plan.outputs.stdout }}\`
            github.rest.issues.createComment({
              owner: context.repo.owner,
              repo: context.repo.repo,
              issue_number: context.issue.number,
              body: \`### Terraform Plan
            \\\`\\\`\\\`
            \${plan}
            \\\`\\\`\`
            > Push to main to apply these changes.\`
            })

      - name: Terraform Apply
        run: terraform apply -auto-approve tfplan
        if: github.ref == 'refs/heads/main' && github.event_name == 'push'`}</BlogCode>

      <BlogCallout type="danger">
        Never run <BlogInlineCode>terraform apply</BlogInlineCode> without
        reviewing the plan first in production. The plan is your safety net —
        it shows exactly what will be created, changed or destroyed. Automate
        the review in CI but always require human approval for apply.
      </BlogCallout>

      <BlogCallout type="done">
        You now have the full Terraform workflow: declare infrastructure in
        HCL, modularize with reusable modules, secure with tfsec, and ship
        through CI/CD. The same code that defines your infra becomes the
        documentation, the audit trail and the recovery mechanism.
      </BlogCallout>
    </article>
  );
}
