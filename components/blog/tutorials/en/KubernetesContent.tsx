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

export default function KubernetesContentEn() {
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
        Kubernetes: container orchestration
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Docker runs containers; Kubernetes orchestrates them: it scales, load
        balances traffic, restarts failures and ships versions with zero
        downtime. Learn the architecture, the main objects and the kubectl
        workflow.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="what-is-k8s">What is Kubernetes?</BlogH2>

      <BlogP>
        Kubernetes (k8s) is an open-source container orchestrator born from
        Google's experience with Borg. Instead of deciding where each container
        runs, you <strong>declare the desired state</strong>: "3 replicas of
        my-api with image v1.2" — and the system continuously works to make
        reality match that declaration.
      </BlogP>

      <BlogP>
        That is what <strong>declarative</strong> means: you don't say "create
        this", "delete that", but how you want the system to look at the end. If
        a container dies, k8s creates another one without you asking. If you ask
        for 5 replicas, it adjusts until there are 5.
      </BlogP>

      <BlogCallout type="info">
        The quick comparison: Docker Compose orchestrates containers on a single
        machine with a simple YAML. Kubernetes orchestrates a cluster of many
        machines (nodes) with self-healing, autoscaling, rolling updates and
        network load balancing. Compose for local development, k8s for
        production.
      </BlogCallout>

      <BlogH2 id="architecture">Architecture</BlogH2>

      <BlogP>
        A cluster has two planes. The <strong>control plane</strong> is the
        brain: it makes global decisions. The <strong>nodes</strong> (or
        workers) are the machines that run your applications. The control plane
        is usually made more highly available than the workers because its
        failure paralyses the cluster.
      </BlogP>

      <BlogH3 id="control-plane">Control plane components</BlogH3>

      <BlogP>
        <strong>kube-apiserver</strong>: the single entry point to the cluster.
        All communication (kubectl, other components) goes through this REST
        API.
      </BlogP>
      <BlogP>
        <strong>etcd</strong>: the distributed key-value store that holds all
        cluster state. What is not in etcd does not exist.
      </BlogP>
      <BlogP>
        <strong>kube-scheduler</strong>: decides which node gets each new pod
        based on available resources, affinities and restrictions.
      </BlogP>
      <BlogP>
        <strong>kube-controller-manager</strong>: runs the controllers that
        reconcile the desired state (replicas, deployments, jobs...).
      </BlogP>

      <BlogH3 id="node-components">Node components</BlogH3>

      <BlogP>
        <strong>kubelet</strong>: the agent living on every node. It makes sure
        the assigned pods are running and reports their status to the apiserver.
      </BlogP>
      <BlogP>
        <strong>kube-proxy</strong>: manages the network rules that route
        traffic to the pods.
      </BlogP>
      <BlogP>
        <strong>Container runtime</strong>: the engine that runs containers
        (containerd, CRI-O). Docker doesn't run pods directly in modern k8s, but
        the images you build with Docker are the same ones the runtime runs.
      </BlogP>

      <BlogH2 id="installation">Install minikube and kubectl</BlogH2>

      <BlogP>
        To practice locally you need a single-machine cluster (minikube or kind)
        and the <BlogInlineCode>kubectl</BlogInlineCode> client:
      </BlogP>

      <BlogCode>{`# macOS with Homebrew
brew install minikube kubectl

# Start the local cluster (downloads a VM image the first time)
minikube start

# Verify kubectl talks to the cluster
kubectl cluster-info
kubectl get nodes
# NAME       STATUS   ROLES           AGE   VERSION
# minikube   Ready    control-plane   ...   v1.30.0`}</BlogCode>

      <BlogCallout type="warn">
        <BlogInlineCode>kubectl</BlogInlineCode> is not the cluster: it's just
        the client. Without a cluster to point to (minikube locally, EKS, GKE or
        K3s in the cloud), commands fail with{" "}
        <em>"Unable to connect to the server"</em>.{" "}
        <BlogInlineCode>minikube start</BlogInlineCode> brings one up on your
        machine.
      </BlogCallout>

      <BlogH2 id="pods">Pods</BlogH2>

      <BlogP>
        The <strong>pod</strong> is the smallest unit of computing in k8s: one
        or more containers sharing network and storage. In practice, it is
        almost always a single container per pod. Pods are ephemeral — don't
        create them by hand in production; they are managed with workloads:
      </BlogP>

      <BlogCode>{`# Create a pod directly (just for testing)
kubectl run nginx --image=nginx:alpine

# Pod status
kubectl get pods
kubectl get pods -o wide     # with node and IP

# Full detail as YAML
kubectl describe pod nginx

# Logs and inspection
kubectl logs nginx
kubectl exec -it nginx -- sh

# Access a pod port from your machine (debug)
kubectl port-forward pod/nginx 8080:80
curl http://localhost:8080

kubectl delete pod nginx`}</BlogCode>

      <BlogP>
        <BlogInlineCode>kubectl run</BlogInlineCode> is handy for testing, but
        pods created this way don't self-heal: if they die, nobody recreates
        them. That's what controllers are for, starting with the Deployment.
      </BlogP>

      <BlogH2 id="deployments">Deployments</BlogH2>

      <BlogP>
        A <strong>Deployment</strong> manages a set of pod replicas, declaring
        the desired state. It is the object you'll use 90% of the time for
        stateless applications:
      </BlogP>

      <BlogCode>{`# deployment.yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-api
  labels:
    app: my-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-api
  template:
    metadata:
      labels:
        app: my-api
    spec:
      containers:
        - name: my-api
          image: myuser/my-api:v1
          ports:
            - containerPort: 3000`}</BlogCode>

      <BlogCode>{`kubectl apply -f deployment.yaml
kubectl get deployments
kubectl get pods
# 3 pods prefixed my-api-...

# Scale
kubectl scale deployment my-api --replicas=5

# Deploy a new image (rolling update)
kubectl set image deployment/my-api my-api=myuser/my-api:v2

# Watch the rollout and roll back if something fails
kubectl rollout status deployment/my-api
kubectl rollout history deployment/my-api
kubectl rollout undo deployment/my-api`}</BlogCode>

      <BlogP>
        The Deployment creates one <strong>ReplicaSet</strong> per version:
        during an update, the new ReplicaSet scales replicas up while the old
        one scales them down (rolling update). If a revision fails,{" "}
        <BlogInlineCode>rollout undo</BlogInlineCode> restores the previous one.
      </BlogP>

      <BlogCallout type="info">
        The <BlogInlineCode>matchLabels</BlogInlineCode> selector is the key to
        everything: k8s relates objects (Deployment ↔ pods ↔ Service) by
        labels, not by name. Keep the labels consistent between the Deployment
        selector and the pod template.
      </BlogCallout>

      <BlogH2 id="services">Services</BlogH2>

      <BlogP>
        Pods are ephemeral and change IPs every time they are recreated. A{" "}
        <strong>Service</strong> provides a stable address and load balances
        traffic among the pods matching its selector:
      </BlogP>

      <BlogCode>{`# service.yaml
apiVersion: v1
kind: Service
metadata:
  name: my-api
spec:
  selector:
    app: my-api
  ports:
    - port: 80          # Service port
      targetPort: 3000  # pod port
  type: ClusterIP`}</BlogCode>

      <BlogP>The three main types:</BlogP>

      <BlogP>
        <strong>ClusterIP</strong> (default): stable internal address, only
        reachable inside the cluster. Ideal for communication between internal
        services.
      </BlogP>
      <BlogP>
        <strong>NodePort</strong>: exposes the Service on a port of every node
        (30000-32767). Practical locally or for tests.
      </BlogP>
      <BlogP>
        <strong>LoadBalancer</strong>: provisions a cloud provider load balancer
        (ELB, GCP LB...) that distributes external traffic. The standard path in
        the cloud.
      </BlogP>

      <BlogCode>{`kubectl apply -f service.yaml

# Internal DNS: pods reach "my-api" by name
kubectl run test --rm -it --image=busybox -- wget -qO- http://my-api

# On minikube, expose the Service to the host
minikube service my-api`}</BlogCode>

      <BlogH2 id="configmaps-secrets">ConfigMaps and Secrets</BlogH2>

      <BlogP>
        Separate configuration from the image: <strong>ConfigMaps</strong> hold
        non-sensitive values and <strong>Secrets</strong> (base64, not encrypted
        by default) hold sensitive ones. Both are mounted as environment
        variables or as files:
      </BlogP>

      <BlogCode>{`# configmap.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: my-api-config
data:
  LOG_LEVEL: debug
  FEATURES: "notifications,analytics"

# secret.yaml — the value is base64
apiVersion: v1
kind: Secret
metadata:
  name: my-api-secrets
type: Opaque
data:
  API_KEY: c2VjcmV0bzEyMw==  # "secret123" in base64

# Reference them in the Deployment
envFrom:
  - configMapRef:
      name: my-api-config
  - secretRef:
      name: my-api-secrets
env:
  - name: DATABASE_URL
    valueFrom:
      secretKeyRef:
        name: my-api-secrets
        key: API_KEY`}</BlogCode>

      <BlogCallout type="danger">
        Secrets are only base64-encoded: anyone with cluster access can decode
        them. For truly sensitive data use etcd encryption at rest, an external
        secret manager (SOPS, Sealed Secrets, Vault) or your cloud provider's
        integrations.
      </BlogCallout>

      <BlogH2 id="ingress">Ingress</BlogH2>

      <BlogP>
        One LoadBalancer per Service multiplies costs and URLs. The{" "}
        <strong>Ingress</strong> is a single entry point that routes by host and
        path to different Services, with TLS terminated at the edge:
      </BlogP>

      <BlogCode>{`# ingress.yaml
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: my-ingress
spec:
  rules:
    - host: api.mydomain.com
      http:
        paths:
          - path: /api
            pathType: Prefix
            backend:
              service:
                name: my-api
                port:
                  number: 80
          - path: /web
            pathType: Prefix
            backend:
              service:
                name: frontend
                port:
                  number: 80
    - host: admin.mydomain.com
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
        The Ingress requires an <strong>Ingress Controller</strong> installed in
        the cluster (nginx-ingress, Traefik, or the cloud provider's own) that
        materializes those rules into a real proxy. On minikube:
      </BlogP>

      <BlogCode>{`minikube addons enable ingress
kubectl apply -f ingress.yaml
kubectl get ingress`}</BlogCode>

      <BlogH2 id="namespaces">Namespaces and apply -f</BlogH2>

      <BlogP>
        <strong>Namespaces</strong> partition the cluster by teams, environments
        or applications, with their own resource limits and network policies.
        Always working in <BlogInlineCode>default</BlogInlineCode> is a bad
        habit that eventually bites:
      </BlogP>

      <BlogCode>{`kubectl create namespace production
kubectl get namespaces

# Operate on a specific namespace
kubectl -n production get pods

# Apply a whole directory of manifests
kubectl apply -f ./k8s/
kubectl apply -n production -f deployment.yaml

# Explore the cluster
kubectl get all
kubectl get events --sort-by=.lastTimestamp`}</BlogCode>

      <BlogCallout type="info">
        <BlogInlineCode>kubectl apply -f</BlogInlineCode> is idempotent: you can
        run it a thousand times and the result is the same. That turns the YAML
        manifests into your single source of truth and lets you version them in
        Git (GitOps): the cluster is described in the repository, not touched by
        hand.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogH2 id="exercises">Exercises</BlogH2>

      <div className="space-y-3">
        <ExerciseCard
          description="Create a pod with the nginx:alpine image using kubectl run and check its status and logs."
          hint="kubectl run nginx --image=nginx:alpine, then kubectl get pods and kubectl logs."
          level="Easy"
          num={1}
          solution={`kubectl run nginx --image=nginx:alpine
kubectl get pods
kubectl describe pod nginx
kubectl logs nginx`}
          title="Create a pod"
        />

        <ExerciseCard
          description="Write a Deployment with 3 replicas of a my-api:v1 image, apply it and verify that all 3 pods are Ready."
          hint="Kind: Deployment, replicas: 3, coherent matchLabels and labels, containerPort 3000."
          level="Intermediate"
          num={2}
          solution={`apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-api
  labels:
    app: my-api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: my-api
  template:
    metadata:
      labels:
        app: my-api
    spec:
      containers:
        - name: my-api
          image: myuser/my-api:v1
          ports:
            - containerPort: 3000
---
# Commands:
kubectl apply -f deployment.yaml
kubectl get pods`}
          title="Deployment with 3 replicas"
        />

        <ExerciseCard
          description="Expose the Deployment above with a NodePort Service pointing at port 3000 of the pods, and reach it from your machine."
          hint="Type: NodePort, selector app: my-api, port 80, targetPort 3000. On minikube use minikube service."
          level="Intermediate"
          num={3}
          solution={`apiVersion: v1
kind: Service
metadata:
  name: my-api
spec:
  selector:
    app: my-api
  type: NodePort
  ports:
    - port: 80
      targetPort: 3000
---
kubectl apply -f service.yaml
minikube service my-api   # opens the browser against the NodePort`}
          title="NodePort Service"
        />

        <ExerciseCard
          description="Create a ConfigMap with LOG_LEVEL=debug and FEATURES, and reference it with envFrom in a Deployment so the pod receives them as environment variables."
          hint="ConfigMap data + envFrom.configMapRef.name on the container. Verify with kubectl exec env."
          level="Hard"
          num={4}
          solution={`apiVersion: v1
kind: ConfigMap
metadata:
  name: my-api-config
data:
  LOG_LEVEL: debug
  FEATURES: "notifications,analytics"
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-api
spec:
  replicas: 1
  selector:
    matchLabels:
      app: my-api
  template:
    metadata:
      labels:
        app: my-api
    spec:
      containers:
        - name: my-api
          image: myuser/my-api:v1
          envFrom:
            - configMapRef:
                name: my-api-config
---
kubectl apply -f configmap.yaml -f deployment.yaml
kubectl exec -it <pod> -- env | grep LOG_LEVEL`}
          title="ConfigMap as environment variables"
        />

        <ExerciseCard
          description="Update a Deployment from v1 to v2 with kubectl set image, check the rollout and, after reviewing the history, roll back with rollout undo."
          hint="kubectl set image deployment/my-api my-api=my:v2, then rollout status and rollout history."
          level="Hard"
          num={5}
          solution={`# Update the image
kubectl set image deployment/my-api my-api=myuser/my-api:v2
kubectl rollout status deployment/my-api

# Review the revision history
kubectl rollout history deployment/my-api
kubectl rollout history deployment/my-api --revision=1

# Roll back to the previous revision
kubectl rollout undo deployment/my-api
kubectl rollout status deployment/my-api

# Final state
kubectl get pods`}
          title="Rollout update and rollback"
        />
      </div>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        Kubernetes changes your mindset: you stop managing processes and start
        declaring states the system reconciles on its own. With pods,
        deployments, services, configmaps and ingress you already have the
        essential vocabulary to work with any cluster — the next step is GitOps:
        describing that state in Git and letting the cluster apply it.
      </BlogP>
    </article>
  );
}
