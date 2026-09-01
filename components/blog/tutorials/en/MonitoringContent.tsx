"use client";

import {
  BlogH2,
  BlogH3,
  BlogP,
  BlogCode,
  BlogInlineCode,
  BlogCallout,
} from "@/components/blog/shared";

export default function MonitoringContentEn() {
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
        Monitoring and Observability
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Observability is the ability to understand the internal state of a
        system from its external outputs. An observable system tells you what
        fails and why, without deploying new code. This tutorial covers the
        three pillars — metrics, logs, and traces — with the most widely used
        production tools.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="pillars">The Three Pillars of Observability</BlogH2>

      <BlogP>
        Every observability strategy relies on three types of data that answer
        different questions. Together they form a complete picture of your
        system's behavior.
      </BlogP>

      <BlogH3 id="metrics">Metrics</BlogH3>

      <BlogP>
        Metrics are numerical values aggregated over time:{" "}
        <BlogInlineCode>requests_per_second</BlogInlineCode>,{" "}
        <BlogInlineCode>latency_p99</BlogInlineCode>,{" "}
        <BlogInlineCode>errors_5xx</BlogInlineCode>. They are lightweight,
        cheap to store, and ideal for alerts and dashboards. They won't tell
        you what happened to a specific request, but they will tell you how
        many are failing and whether latency is increasing.
      </BlogP>

      <BlogH3 id="logs">Logs</BlogH3>

      <BlogP>
        Logs are discrete events with context: each line describes what
        happened at a given moment. They are the richest source of detail — a
        log can include the user ID, the endpoint, and the execution time —
        but also the heaviest. Without centralization, searching logs across
        ten servers is unmanageable.
      </BlogP>

      <BlogH3 id="traces">Distributed Traces</BlogH3>

      <BlogP>
        A trace follows a request from the moment it enters the system until
        it leaves, crossing services, message queues, and databases. Each step
        is called a <BlogInlineCode>span</BlogInlineCode> and contains
        duration, metadata, and the parent span ID. Traces are the only
        reliable way to diagnose bottlenecks in microservice architectures.
      </BlogP>

      <BlogCallout type="info">
        Metrics, logs, and traces don't compete — they complement each other.
        Metrics tell you <em>how many</em> errors there are, logs tell you{" "}
        <em>what</em> fails, and traces tell you <em>where</em> the problem
        originates. Starting with all three is the safest path.
      </BlogCallout>

      <BlogH2 id="prometheus">Metrics with Prometheus</BlogH2>

      <BlogP>
        Prometheus is the de facto standard for metrics in containerized
        environments. It uses a <em>pull</em> model: each service exposes a{" "}
        <BlogInlineCode>/metrics</BlogInlineCode> endpoint and Prometheus
        scrapes it at a configured interval.
      </BlogP>

      <BlogH3 id="install-prometheus">Installation with Docker</BlogH3>

      <BlogP>
        Run Prometheus with Docker and a configuration file that tells it
        which services to scrape:
      </BlogP>

      <BlogCode>{`# prometheus.yml
global:
  scrape_interval: 15s        # how often to scrape targets
  evaluation_interval: 15s    # how often to evaluate rules

scrape_configs:
  - job_name: "node-app"
    static_configs:
      - targets: ["host.docker.internal:3000"]  # your Node.js app
    metrics_path: "/metrics"`}</BlogCode>

      <BlogCode>{`# Start Prometheus
docker run -d --name prometheus \\
  -p 9090:9090 \\
  -v ./prometheus.yml:/etc/prometheus/prometheus.yml \\
  prom/prometheus

# Verify it is scraping correctly
curl http://localhost:9090/api/v1/targets`}</BlogCode>

      <BlogH3 id="promql">PromQL Basics</BlogH3>

      <BlogP>
        PromQL is the query language for Prometheus. It lets you filter,
        aggregate, and transform metrics in real time.
      </BlogP>

      <BlogCode>{`# Request rate per second (last 5 min)
rate(http_requests_total[5m])

# 99th percentile latency
histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))

# 5xx errors grouped by service
sum by (service) (
  rate(http_requests_total{status=~"5.."}[5m])
)

# Availability: successful requests / total
sum(rate(http_requests_total{status!~"5.."}[5m]))
/
sum(rate(http_requests_total[5m]))`}</BlogCode>

      <BlogH3 id="app-metrics">Exposing Metrics in Node.js</BlogH3>

      <BlogP>
        The <BlogInlineCode>prom-client</BlogInlineCode> library exposes
        metrics automatically and creates the{" "}
        <BlogInlineCode>/metrics</BlogInlineCode> endpoint:
      </BlogP>

      <BlogCode>{`import express from "express";
import { register, Counter, Histogram } from "prom-client";

const app = express();

const httpRequests = new Counter({
  name: "http_requests_total",
  help: "Total HTTP requests",
  labelNames: ["method", "route", "status"],
});

const httpDuration = new Histogram({
  name: "http_request_duration_seconds",
  help: "HTTP request duration in seconds",
  labelNames: ["method", "route"],
  buckets: [0.01, 0.05, 0.1, 0.5, 1, 2, 5],
});

app.use((req, res, next) => {
  const end = httpDuration.startTimer({ method: req.method, route: req.path });
  res.on("finish", () => {
    end();
    httpRequests.inc({
      method: req.method,
      route: req.path,
      status: res.statusCode,
    });
  });
  next();
});

app.get("/metrics", async (_req, res) => {
  res.set("Content-Type", register.contentType);
  res.end(await register.metrics());
});

app.listen(3000);`}</BlogCode>

      <BlogCallout type="warn">
        Use <BlogInlineCode>rate()</BlogInlineCode> for counters and{" "}
        <BlogInlineCode>histogram_quantile()</BlogInlineCode> for histograms.
        Avoid <BlogInlineCode>increase()</BlogInlineCode> in real-time
        dashboards: <BlogInlineCode>rate()</BlogInlineCode> smooths spikes
        more effectively.
      </BlogCallout>

      <BlogH2 id="grafana">Dashboards with Grafana</BlogH2>

      <BlogP>
        Grafana connects Prometheus as a data source and lets you build visual
        panels — graphs, stats, and tables — that update in real time.
      </BlogP>

      <BlogH3 id="install-grafana">Installation with Docker</BlogH3>

      <BlogCode>{`# Add Grafana to docker-compose
services:
  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    environment:
      GF_SECURITY_ADMIN_PASSWORD: admin
    volumes:
      - grafana-data:/var/lib/grafana

volumes:
  grafana-data:`}</BlogCode>

      <BlogH3 id="datasource">Adding Prometheus as a Data Source</BlogH3>

      <BlogP>
        In Grafana go to{" "}
        <strong>Configuration → Data Sources → Add data source</strong> and
        select Prometheus. The URL will be{" "}
        <BlogInlineCode>http://prometheus:9090</BlogInlineCode> if you use
        Docker Compose.
      </BlogP>

      <BlogH3 id="panels">Creating Panels</BlogH3>

      <BlogP>Grafana offers three main panel types:</BlogP>

      <BlogP>
        <strong>Graph:</strong> time series — ideal for latency, error rate,
        and throughput. Uses PromQL as the query.
      </BlogP>

      <BlogP>
        <strong>Stat:</strong> a single large value with conditional color —
        useful for showing current availability or active requests.
      </BlogP>

      <BlogP>
        <strong>Table:</strong> tabular data — perfect for the top 5 endpoints
        with the highest latency.
      </BlogP>

      <BlogCode>{`# PromQL example for Graph panel — P99 latency
histogram_quantile(0.99,
  sum by (le) (
    rate(http_request_duration_seconds_bucket[5m])
  )
)

# Example for Stat panel — current availability
1 - (
  sum(rate(http_requests_total{status=~"5.."}[5m]))
  /
  sum(rate(http_requests_total[5m]))
)`}</BlogCode>

      <BlogH3 id="variables">Variables to Filter by Service</BlogH3>

      <BlogP>
        Variables let you create reusable dashboards. In Grafana go to{" "}
        <strong>Dashboard Settings → Variables → New</strong> and create a{" "}
        <BlogInlineCode>service</BlogInlineCode> variable with the query{" "}
        <BlogInlineCode>
          label_values(http_requests_total, service)
        </BlogInlineCode>
        . Then use <BlogInlineCode>$service</BlogInlineCode> in your queries
        to filter.
      </BlogP>

      <BlogCallout type="info">
        Grafana has thousands of community dashboards at{" "}
        <strong>grafana.com/grafana/dashboards</strong>. Import the dashboard
        ID and adjust the variables for your environment. It's the fastest
        way to get started without building everything from scratch.
      </BlogCallout>

      <BlogH2 id="loki">Centralized Logging with Loki</BlogH2>

      <BlogP>
        Loki is the complement to Prometheus for logs. It doesn't index the
        full content of every line — only labels — making it much lighter
        than Elasticsearch. It integrates directly with Grafana.
      </BlogP>

      <BlogH3 id="centralized-vs-files">
        Centralized Logging vs Log Files
      </BlogH3>

      <BlogP>
        In a single container you can read logs with{" "}
        <BlogInlineCode>docker logs</BlogInlineCode>. But when you have
        multiple services or replicas, you need to centralize: collect logs
        from all containers in one place, search them, and alert on them.
        That's what Loki does with Promtail.
      </BlogP>

      <BlogH3 id="docker-compose-loki">
        Docker Compose with Loki + Promtail
      </BlogH3>

      <BlogCode>{`services:
  loki:
    image: grafana/loki:latest
    ports:
      - "3100:3100"
    volumes:
      - loki-data:/loki

  promtail:
    image: grafana/promtail:latest
    volumes:
      - /var/log:/var/log:ro
      - /var/lib/docker/containers:/var/lib/docker/containers:ro
      - ./promtail-config.yml:/etc/promtail/config.yml
    command: -config.file=/etc/promtail/config.yml

  grafana:
    image: grafana/grafana:latest
    ports:
      - "3001:3000"
    volumes:
      - grafana-data:/var/lib/grafana

volumes:
  loki-data:
  grafana-data:`}</BlogCode>

      <BlogCode>{`# promtail-config.yml
server:
  http_listen_port: 9080

positions:
  filename: /tmp/positions.yaml

clients:
  - url: http://loki:3100/loki/api/v1/push

scrape_configs:
  - job_name: docker
    docker_sd_configs:
      - host: unix:///var/run/docker.sock
    relabel_configs:
      - source_labels: ["__meta_docker_container_name"]
        target_label: "container"`}</BlogCode>

      <BlogH3 id="logql">Queries with LogQL</BlogH3>

      <BlogP>
        LogQL is similar to PromQL. You filter by labels and then apply text
        operators:
      </BlogP>

      <BlogCode>{`# All logs from the "api" container
{container="api"}

# Logs containing "error"
{container="api"} |= "error"

# 5xx error logs from the last 5 min
{container="api"} |~ "5[0-9]{2}" [5m]

# Error count per minute
rate({container="api"} |= "error" [1m])`}</BlogCode>

      <BlogCallout type="warn">
        Loki indexes <em>labels</em> (like{" "}
        <BlogInlineCode>container</BlogInlineCode> or{" "}
        <BlogInlineCode>service</BlogInlineCode>), not log content. Using
        too many high-cardinality labels (like user IDs) can degrade
        performance. Keep labels minimal and use text filters for content.
      </BlogCallout>

      <BlogH2 id="traces-otel">
        Distributed Tracing with OpenTelemetry
      </BlogH2>

      <BlogP>
        OpenTelemetry (OTel) is the CNCF standard for telemetry. It provides
        unified APIs for metrics, logs, and traces, with SDKs for most
        languages and a{" "}
        <BlogInlineCode>Collector</BlogInlineCode> that receives, processes,
        and exports data to multiple backends.
      </BlogP>

      <BlogH3 id="what-are-traces">
        What Are Traces, Spans, and Context Propagation
      </BlogH3>

      <BlogP>
        A <strong>trace</strong> represents the complete journey of a request
        through the system. It is composed of{" "}
        <strong>spans</strong>, each representing a unit of work — an HTTP
        call, a database query, a queue operation. Each span has a{" "}
        <BlogInlineCode>traceId</BlogInlineCode>, a{" "}
        <BlogInlineCode>spanId</BlogInlineCode>, an optional parent,
        timestamps, and attributes.
      </BlogP>

      <BlogP>
        <strong>Context propagation</strong> is the mechanism that carries the
        trace ID across services. When your API calls another microservice,
        the OTel SDK injects HTTP headers (
        <BlogInlineCode>traceparent</BlogInlineCode>) so the next service
        creates a child span in the same trace.
      </BlogP>

      <BlogH3 id="install-collector">Installing the OTel Collector</BlogH3>

      <BlogCode>{`# Add to docker-compose
services:
  otel-collector:
    image: otel/opentelemetry-collector-contrib:latest
    command: ["--config=/etc/otelcol/config.yml"]
    volumes:
      - ./otel-config.yml:/etc/otelcol/config.yml
    ports:
      - "4317:4317"   # OTLP gRPC
      - "4318:4318"   # OTLP HTTP
      - "8888:8888"   # Collector's own metrics

volumes:
  loki-data:
  grafana-data:`}</BlogCode>

      <BlogCode>{`# otel-config.yml
receivers:
  otlp:
    protocols:
      grpc:
        endpoint: 0.0.0.0:4317
      http:
        endpoint: 0.0.0.0:4318

processors:
  batch:
    timeout: 5s
    send_batch_size: 1024

exporters:
  jaeger:
    endpoint: jaeger:14250
    tls:
      insecure: true

service:
  pipelines:
    traces:
      receivers: [otlp]
      processors: [batch]
      exporters: [jaeger]`}</BlogCode>

      <BlogH3 id="instrument-node">
        Instrumenting a Node.js App
      </BlogH3>

      <BlogCode>{`import { NodeSDK } from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-grpc";

const sdk = new NodeSDK({
  traceExporter: new OTLPTraceExporter({
    url: "http://otel-collector:4317",
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

sdk.start();

// Your Express/Koa/Fastify app is instrumented automatically
// Spans are created for each HTTP request, SQL query, etc.`}</BlogCode>

      <BlogP>
        With auto-instrumentations, every incoming and outgoing HTTP request,
        every database query, and every queue call becomes a span
        automatically — without modifying your business code.
      </BlogP>

      <BlogH3 id="jaeger-ui">Viewing Traces in Jaeger UI</BlogH3>

      <BlogP>
        Jaeger is a trace backend that visualizes traces collected by the
        Collector. Add it to the compose and access the UI at{" "}
        <BlogInlineCode>http://localhost:16686</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`# Add Jaeger to docker-compose
services:
  jaeger:
    image: jaegertracing/all-in-one:latest
    ports:
      - "16686:16686"   # UI
      - "14250:14250"   # gRPC

  otel-collector:
    image: otel/opentelemetry-collector-contrib:latest
    command: ["--config=/etc/otelcol/config.yml"]
    volumes:
      - ./otel-config.yml:/etc/otelcol/config.yml
    ports:
      - "4317:4317"
      - "4318:4318"
    depends_on:
      - jaeger`}</BlogCode>

      <BlogP>
        In Jaeger UI, select your service, search for traces by duration or
        label, and explore the span graph: you'll see exactly how long each
        step takes and where latency accumulates.
      </BlogP>

      <BlogCallout type="info">
        You don't need to install all three tools at once. Start with{" "}
        <strong>metrics</strong> (Prometheus + Grafana) — they are the cheapest
        to operate and provide the most value initially. Once alerts are
        working, add logs (Loki) and then traces (OTel + Jaeger). Each pillar
        integrates with the previous ones in Grafana.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        Observability isn't a luxury — it's an investment that reduces
        incident resolution time from hours to minutes. With Prometheus,
        Grafana, Loki, and OpenTelemetry you get a complete, free stack that
        scales from a laptop to a production cluster. The key is to start
        small and build a culture of observability in your team.
      </BlogP>
    </article>
  );
}
