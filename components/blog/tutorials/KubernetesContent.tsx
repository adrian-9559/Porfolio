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

export default function KubernetesContent() {
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
          55 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-3"
        style={{ letterSpacing: "-0.03em" }}
      >
        Kubernetes: orquestación de contenedores
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Docker ejecuta contenedores; Kubernetes los orquesta: escala, balancea
        tráfico, reinicia fallos y despliega versiones sin tiempo de inactividad.
        Aprende la arquitectura, los objetos principales y el flujo de trabajo
        con kubectl.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="que-es-k8s">¿Qué es Kubernetes?</BlogH2>

      <BlogP>
        Kubernetes (k8s) es un orquestador de contenedores open-source nacido de
        la experiencia de Google con Borg. En lugar de que tú decidas dónde
        ejecutar cada contenedor, le <strong>declaras el estado deseado</strong>:
        "3 réplicas de mi-api con la imagen v1.2" — y el sistema trabaja
        continuamente para que la realidad coincida con esa declaración.
      </BlogP>

      <BlogP>
        De ahí lo de <strong>declarativo</strong>: no le dices "crea esto",
        "borra aquello", sino cómo quieres que sea el sistema al final. Si un
        contenedor muere, k8s crea otro sin que lo pidas. Si pides 5 réplicas,
        ajusta hasta tener 5.
      </BlogP>

      <BlogCallout type="info">
        La comparación rápida: Docker Compose orquesta contenedores en una sola
        máquina con un YAML simple. Kubernetes orquesta un clúster de muchas
        máquinas (nodes) con auto-reparación, escalado automático, rolling
        updates y balanceo de red. Compose para desarrollo local, k8s para
        producción.
      </BlogCallout>

      <BlogH2 id="arquitectura">Arquitectura</BlogH2>

      <BlogP>
        Un clúster tiene dos planos. El <strong>control plane</strong> es el
        cerebro: toma decisiones globales. Los <strong>nodes</strong> (o
        workers) son las máquinas que ejecutan tus aplicaciones. El control
        plane suele ser el doble de disponible que los workers porque su caída
        paraliza el clúster.
      </BlogP>

      <BlogH3 id="control-plane">Componentes del control plane</BlogH3>

      <BlogP>
        <strong>kube-apiserver</strong>: única puerta de entrada al clúster.
        Toda comunicación (kubectl, otros componentes) pasa por esta API REST.
      </BlogP>
      <BlogP>
        <strong>etcd</strong>: base de datos clave-valor distribuida que guarda
        todo el estado del clúster. Lo que no está en etcd no existe.
      </BlogP>
      <BlogP>
        <strong>kube-scheduler</strong>: decide en qué node colocar cada nuevo
        pod según recursos disponibles, afinidades y restricciones.
      </BlogP>
      <BlogP>
        <strong>kube-controller-manager</strong>: ejecuta los controladores que
        reconcilian el estado deseado (replicas, deployments, jobs...).
      </BlogP>

      <BlogH3 id="node-components">Componentes del node</BlogH3>

      <BlogP>
        <strong>kubelet</strong>: agente que vive en cada node. Garantiza que
        los pods asignados estén corriendo y reporta su estado al apiserver.
      </BlogP>
      <BlogP>
        <strong>kube-proxy</strong>: gestiona las reglas de red que enrutan el
        tráfico a los pods.
      </BlogP>
      <BlogP>
        <strong>Container runtime</strong>: el motor que ejecuta contenedores
        (containerd, CRI-O). Docker no corre pods directamente en k8s moderno,
        pero las imágenes que construyes con Docker son las mismas que corre
        el runtime.
      </BlogP>

      <BlogH2 id="instalacion">Instalar minikube y kubectl</BlogH2>

      <BlogP>
        Para practicar localmente necesitas un clúster de una sola máquina
        (minikube o kind) y el cliente <BlogInlineCode>kubectl</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`# macOS con Homebrew
brew install minikube kubectl

# Arrancar el clúster local (descarga una imagen de VM la primera vez)
minikube start

# Verificar que kubectl habla con el clúster
kubectl cluster-info
kubectl get nodes
# NAME           STATUS   ROLES           AGE   VERSION
# minikube       Ready    control-plane   ...   v1.30.0`}</BlogCode>

      <BlogCallout type="warn">
        <BlogInlineCode>kubectl</BlogInlineCode> no es el clúster: es solo el
        cliente. Sin un clúster al que apuntar (minikube en local, EKS, GKE o
        K3s en la nube), los comandos fallan con{" "}
        <em>"Unable to connect to the server"</em>.{" "}
        <BlogInlineCode>minikube start</BlogInlineCode> lo levanta en tu
        máquina.
      </BlogCallout>

      <BlogH2 id="pods">Pods</BlogH2>

      <BlogP>
        El <strong>pod</strong> es la unidad mínima de computación en k8s: uno
        o más contenedores que comparten red y almacenamiento. En la práctica,
        casi siempre es un único contenedor por pod. Los pods son efímeros —
        no los crees a mano en producción; se gestionan con workloads:
      </BlogP>

      <BlogCode>{`# Crear un pod directamente (solo para probar)
kubectl run nginx --image=nginx:alpine

# Estado de los pods
kubectl get pods
kubectl get pods -o wide     # con el node y la IP

# Detalle completo en YAML
kubectl describe pod nginx

# Logs e inspección
kubectl logs nginx
kubectl exec -it nginx -- sh

# Acceder a un puerto del pod desde tu máquina (debug)
kubectl port-forward pod/nginx 8080:80
curl http://localhost:8080

kubectl delete pod nginx`}</BlogCode>

      <BlogP>
        <BlogInlineCode>kubectl run</BlogInlineCode> es cómodo para probar, pero
        los pods así creados no se auto-reparan: si mueren, nadie los recrea.
        Para eso existen los controllers, empezando por el Deployment.
      </BlogP>

      <BlogH2 id="deployments">Deployments</BlogH2>

      <BlogP>
        Un <strong>Deployment</strong> gestiona un conjunto de réplicas de un
        pod, declarando el estado deseado. Es el objeto que usarás el 90% del
        tiempo para aplicaciones stateless:
      </BlogP>

      <BlogCode>{`# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mi-api
  labels:
    app: mi-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: mi-api
  template:
    metadata:
      labels:
        app: mi-api
    spec:
      containers:
        - name: mi-api
          image: miusuario/mi-api:v1
          ports:
            - containerPort: 3000`}</BlogCode>

      <BlogCode>{`kubectl apply -f deployment.yaml
kubectl get deployments
kubectl get pods
# 3 pods con prefijo mi-api-...

# Escalar
kubectl scale deployment mi-api --replicas=5

# Desplegar una nueva imagen (rolling update)
kubectl set image deployment/mi-api mi-api=miusuario/mi-api:v2

# Ver el rollout y volver atrás si algo falla
kubectl rollout status deployment/mi-api
kubectl rollout history deployment/mi-api
kubectl rollout undo deployment/mi-api`}</BlogCode>

      <BlogP>
        El Deployment crea un <strong>ReplicaSet</strong> por versión: durante
        un update, el ReplicaSet nuevo va subiendo réplicas mientras el viejo
        las baja (rolling update). Si una revisión falla,{" "}
        <BlogInlineCode>rollout undo</BlogInlineCode> restaura la anterior.
      </BlogP>

      <BlogCallout type="info">
        El selector con <BlogInlineCode>matchLabels</BlogInlineCode> es la clave
        de todo: k8s relaciona objetos (Deployment ↔ pods ↔ Service) por
        etiquetas, no por nombre. Mantén las labels coherentes entre el selector
        del Deployment y las del pod template.
      </BlogCallout>

      <BlogH2 id="services">Services</BlogH2>

      <BlogP>
        Los pods son efímeros y cambian de IP cada vez que se recrean. Un{" "}
        <strong>Service</strong> da una dirección estable y balancea el tráfico
        entre los pods que coinciden con su selector:
      </BlogP>

      <BlogCode>{`# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: mi-api
spec:
  selector:
    app: mi-api
  ports:
    - port: 80          # puerto del Service
      targetPort: 3000  # puerto de los pods
  type: ClusterIP`}</BlogCode>

      <BlogP>Los tres tipos principales:</BlogP>

      <BlogP>
        <strong>ClusterIP</strong> (por defecto): dirección interna estable,
        solo accesible dentro del clúster. Ideal para comunicación entre
        servicios internos.
      </BlogP>
      <BlogP>
        <strong>NodePort</strong>: expone el Service en un puerto de cada node
        (30000-32767). Práctico en local o para tests.
      </BlogP>
      <BlogP>
        <strong>LoadBalancer</strong>: provisiona un balanceador del cloud
        provider (ELB, LB de GCP...) que reparte tráfico externo. El camino
        estándar en la nube.
      </BlogP>

      <BlogCode>{`kubectl apply -f service.yaml

# DNS interno: los pods acceden a "mi-api" por nombre
kubectl run test --rm -it --image=busybox -- wget -qO- http://mi-api

# En minikube, exponer el Service al host
minikube service mi-api`}</BlogCode>

      <BlogH2 id="configmaps-secrets">ConfigMaps y Secrets</BlogH2>

      <BlogP>
        Separa la configuración de la imagen: los{" "}
        <strong>ConfigMaps</strong> guardan valores no sensibles y los{" "}
        <strong>Secrets</strong> (base64, no cifrado por defecto) los sensibles.
        Ambos se montan como variables de entorno o como archivos:
      </BlogP>

      <BlogCode>{`# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mi-api-config
data:
  LOG_LEVEL: debug
  FEATURES: "notificaciones,analytics"

# secret.yaml — el valor está en base64
apiVersion: v1
kind: Secret
metadata:
  name: mi-api-secrets
type: Opaque
data:
  API_KEY: c2VjcmV0bzEyMw==  # "secreto123" en base64

# Referenciarlos en el Deployment
envFrom:
  - configMapRef:
      name: mi-api-config
  - secretRef:
      name: mi-api-secrets
env:
  - name: DATABASE_URL
    valueFrom:
      secretKeyRef:
        name: mi-api-secrets
        key: API_KEY`}</BlogCode>

      <BlogCallout type="danger">
        Los Secrets solo codifican en base64: cualquiera con acceso al clúster
        puede decodificarlos. Para datos realmente sensibles usa el cifrado en
        reposo de etcd, un secret manager externo (SOPS, Sealed Secrets, Vault)
        o las integraciones del cloud provider.
      </BlogCallout>

      <BlogH2 id="ingress">Ingress</BlogH2>

      <BlogP>
        Un LoadBalancer por Service multiplica costes y URLs. El{" "}
        <strong>Ingress</strong> es un punto de entrada único que enruta por
        host y por path hacia distintos Services, con TLS terminado en el
        borde:
      </BlogP>

      <BlogCode>{`# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: mi-ingress
spec:
  rules:
    - host: api.midominio.com
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: mi-api
                port:
                  number: 80
          - path: /web
            pathType: Prefix
            backend:
              service:
                name: frontend
                port:
                  number: 80
    - host: admin.midominio.com
      http:
        paths:
          - path: /
            pathType: Prefix
            backend:
              service:
                name: admin-panel
                port:
                  number: 80`}</BlogCode>

      <BlogP>
        El Ingress requiere un <strong>Ingress Controller</strong> instalado en
        el clúster (nginx-ingress, Traefik, o el del cloud provider) que
        materialice esas reglas en un proxy real. En minikube:
      </BlogP>

      <BlogCode>{`minikube addons enable ingress
kubectl apply -f ingress.yaml
kubectl get ingress`}</BlogCode>

      <BlogH2 id="namespaces">Namespaces y apply -f</BlogH2>

      <BlogP>
        Los <strong>Namespaces</strong> particionan el clúster por equipos,
        entornos o aplicaciones, con límites de recursos y políticas de red
        propios. Trabajar siempre en <BlogInlineCode>default</BlogInlineCode>{" "}
        es una mala práctica que tarde o temprano pica:
      </BlogP>

      <BlogCode>{`kubectl create namespace produccion
kubectl get namespaces

# Operar sobre un namespace concreto
kubectl -n produccion get pods

# Aplicar todo un directorio de manifiestos
kubectl apply -f ./k8s/
kubectl apply -n produccion -f deployment.yaml

# Navegar el clúster
kubectl get all
kubectl get events --sort-by=.lastTimestamp`}</BlogCode>

      <BlogCallout type="info">
        <BlogInlineCode>kubectl apply -f</BlogInlineCode> es idempotente: puedes
        ejecutarlo mil veces y el resultado es el mismo. Eso convierte los
        manifiestos YAML en tu única fuente de verdad y permite versionarlos en
        Git (GitOps): el clúster se describe en el repositorio, no se toca a
        mano.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="ejercicios">Ejercicios</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Crea un pod con la imagen nginx:alpine usando kubectl run y comprueba su estado y sus logs."
          hint="kubectl run nginx --image=nginx:alpine, luego kubectl get pods y kubectl logs."
          level="Básico"
          num={1}
          solution={`kubectl run nginx --image=nginx:alpine
kubectl get pods
kubectl describe pod nginx
kubectl logs nginx`}
          title="Crear un pod"
        />

        <ExerciseCard
          description="Escribe un Deployment con 3 réplicas de una imagen mi-api:v1, aplícalo y verifica que los 3 pods están Ready."
          hint="Kind: Deployment, replicas: 3, matchLabels y labels coherentes, containerPort 3000."
          level="Intermedio"
          num={2}
          solution={`apiVersion: apps/v1
kind: Deployment
metadata:
  name: mi-api
  labels:
    app: mi-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: mi-api
  template:
    metadata:
      labels:
        app: mi-api
    spec:
      containers:
        - name: mi-api
          image: miusuario/mi-api:v1
          ports:
            - containerPort: 3000
---
# Comandos:
kubectl apply -f deployment.yaml
kubectl get pods`}
          title="Deployment con 3 réplicas"
        />

        <ExerciseCard
          description="Expón el Deployment anterior con un Service NodePort que apunte al puerto 3000 de los pods, y accede a él desde tu máquina."
          hint="Type: NodePort, selector app: mi-api, port 80, targetPort 3000. En minikube usa minikube service."
          level="Intermedio"
          num={3}
          solution={`apiVersion: v1
kind: Service
metadata:
  name: mi-api
spec:
  selector:
    app: mi-api
  type: NodePort
  ports:
    - port: 80
      targetPort: 3000
---
kubectl apply -f service.yaml
minikube service mi-api   # abre el navegador contra el NodePort`}
          title="Service NodePort"
        />

        <ExerciseCard
          description="Crea un ConfigMap con LOG_LEVEL=debug y FEATURES, y referéncialo con envFrom en un Deployment para que el pod los reciba como variables de entorno."
          hint="ConfigMap data + envFrom.configMapRef.name en el contenedor. Verifica con kubectl exec env."
          level="Avanzado"
          num={4}
          solution={`apiVersion: v1
kind: ConfigMap
metadata:
  name: mi-api-config
data:
  LOG_LEVEL: debug
  FEATURES: "notificaciones,analytics"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: mi-api
spec:
  replicas: 1
  selector:
    matchLabels:
      app: mi-api
  template:
    metadata:
      labels:
        app: mi-api
    spec:
      containers:
        - name: mi-api
          image: miusuario/mi-api:v1
          envFrom:
            - configMapRef:
                name: mi-api-config
---
kubectl apply -f configmap.yaml -f deployment.yaml
kubectl exec -it <pod> -- env | grep LOG_LEVEL`}
          title="ConfigMap como variables de entorno"
        />

        <ExerciseCard
          description="Actualiza un Deployment de v1 a v2 con kubectl set image, comprueba el rollout y, tras ver la revisión, haz rollback con rollout undo."
          hint="kubectl set image deployment/mi-api mi-api=mi:v2, luego rollout status y rollout history."
          level="Avanzado"
          num={5}
          solution={`# Actualizar la imagen
kubectl set image deployment/mi-api mi-api=miusuario/mi-api:v2
kubectl rollout status deployment/mi-api

# Revisar el historial de versiones
kubectl rollout history deployment/mi-api
kubectl rollout history deployment/mi-api --revision=1

# Volver a la revisión anterior
kubectl rollout undo deployment/mi-api
kubectl rollout status deployment/mi-api

# Estado final
kubectl get pods`}
          title="Rollout update y rollback"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        Kubernetes cambia la mentalidad: dejas de gestionar procesos y empiezas
        a declarar estados que el sistema reconcilia por sí solo. Con pods,
        deployments, services, configmaps e ingress ya tienes el vocabulario
        esencial para trabajar con cualquier clúster — el paso siguiente es
        GitOps: describir ese estado en Git y dejar que el clúster lo aplique.
      </BlogP>
    </article>
  );
}
