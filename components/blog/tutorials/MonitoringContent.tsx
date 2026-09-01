"use client";

import {
  BlogH2,
  BlogH3,
  BlogP,
  BlogCode,
  BlogInlineCode,
  BlogCallout,
} from "@/components/blog/shared";

export default function MonitoringContent() {
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
        Monitoreo y observabilidad
      </h1>

      <p className="text-base text-[#6e6e73] dark:text-[#86868b] mb-8">
        Observabilidad es la capacidad de entender el estado interno de un
        sistema a partir de sus salidas externas. Un sistema observable te dice
        qué falla y por qué, sin necesidad de desplegar código nuevo. Este
        tutorial recorre las tres pilares — métricas, logs y trazas — con las
        herramientas más usadas en producción.
      </p>

      <hr className="border-black/8 dark:border-white/8 mb-8" />

      <BlogH2 id="pilares">Pilares de la observabilidad</BlogH2>

      <BlogP>
        Toda estrategia de observabilidad se apoya en tres tipos de datos que
        responden a preguntas distintas. Juntos forman una imagen completa del
        comportamiento de tu sistema.
      </BlogP>

      <BlogH3 id="metricas">Métricas</BlogH3>

      <BlogP>
        Las métricas son valores numéricos agregados a lo largo del tiempo:{" "}
        <BlogInlineCode>requests_por_segundo</BlogInlineCode>,{" "}
        <BlogInlineCode>latencia_p99</BlogInlineCode>,{" "}
        <BlogInlineCode>errores_5xx</BlogInlineCode>. Son ligeras, baratas de
        almacenar y ideales para alertas y dashboards. No te dicen qué pasó con
        una petición concreta, pero sí cuántas están fallando y si la latencia
        sube.
      </BlogP>

      <BlogH3 id="logs">Logs</BlogH3>

      <BlogP>
        Los logs son eventos discretos con contexto: cada línea describe qué
        ocurrió en un momento dado. Son la fuente más rica de detalle — un log
        puede incluir el ID de usuario, el endpoint y el tiempo de ejecución —
        pero también la más pesada. Sin centralización, buscar en logs de
        diez servidores es inviable.
      </BlogP>

      <BlogH3 id="trazas">Trazas distribuidas</BlogH3>

      <BlogP>
        Una traza sigue una petición desde que entra al sistema hasta que sale,
        cruzando servicios, colas de mensajes y bases de datos. Cada paso se
        llama <BlogInlineCode>span</BlogInlineCode> y contiene duración,
        metadatos y el ID de la traza padre. Las trazas son la única pista
        fiable para diagnosticar cuellos de botella en arquitecturas
        microservicio.
      </BlogP>

      <BlogCallout type="info">
        Métricas, logs y trazas no compiten — se complementan. Las métricas te
        dicen <em>cuántos</em> errores hay, los logs te dicen{" "}
        <em>qué</em> falla, y las trazas te dicen <em>dónde</em> se origina el
        problema. Empezar por las tres es el camino más seguro.
      </BlogCallout>

      <BlogH2 id="prometheus">Métricas con Prometheus</BlogH2>

      <BlogP>
        Prometheus es el estándar de facto para métricas en entornos
        containerizados. Usa un modelo de <em>pull</em>: cada servicio expone
        un endpoint <BlogInlineCode>/metrics</BlogInlineCode> y Prometheus lo
        raspa cada cierto intervalo.
      </BlogP>

      <BlogH3 id="install-prometheus">Instalación con Docker</BlogH3>

      <BlogP>
        Ejecuta Prometheus con Docker y un archivo de configuración que le diga
        qué servicios raspar:
      </BlogP>

      <BlogCode>{`# prometheus.yml
global:
  scrape_interval: 15s        # cada cuánto raspa targets
  evaluation_interval: 15s    # cada cuánto evalúa reglas

scrape_configs:
  - job_name: "node-app"
    static_configs:
      - targets: ["host.docker.internal:3000"]  # tu app Node.js
    metrics_path: "/metrics"`}</BlogCode>

      <BlogCode>{`# Arrancar Prometheus
docker run -d --name prometheus \\
  -p 9090:9090 \\
  -v ./prometheus.yml:/etc/prometheus/prometheus.yml \\
  prom/prometheus

# Verificar que raspa correctamente
curl http://localhost:9090/api/v1/targets`}</BlogCode>

      <BlogH3 id="promql">Fundamentos de PromQL</BlogH3>

      <BlogP>
        PromQL es el lenguaje de consulta de Prometheus. Permite filtrar,
        agregar y transformar métricas en tiempo real.
      </BlogP>

      <BlogCode>{`# Tasa de peticiones por segundo (últimos 5 min)
rate(http_requests_total[5m])

# Percentil 99 de latencia
histogram_quantile(0.99, rate(http_request_duration_seconds_bucket[5m]))

# Errores 5xx agrupados por servicio
sum by (service) (
  rate(http_requests_total{status=~"5.."}[5m])
)

# Disponibilidad: peticiones exitosas / total
sum(rate(http_requests_total{status!~"5.."}[5m]))
/
sum(rate(http_requests_total[5m]))`}</BlogCode>

      <BlogH3 id="app-metrics">Exponer métricas en Node.js</BlogH3>

      <BlogP>
        La librería{" "}
        <BlogInlineCode>prom-client</BlogInlineCode> expone métricas
        automáticamente y crea el endpoint <BlogInlineCode>/metrics</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`import express from "express";
import { register, Counter, Histogram } from "prom-client";

const app = express();

const httpRequests = new Counter({
  name: "http_requests_total",
  help: "Total de peticiones HTTP",
  labelNames: ["method", "route", "status"],
});

const httpDuration = new Histogram({
  name: "http_request_duration_seconds",
  help: "Duración de peticiones HTTP en segundos",
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
        Usa <BlogInlineCode>rate()</BlogInlineCode> para contadores y{" "}
        <BlogInlineCode>histogram_quantile()</BlogInlineCode> para histograms.
        No uses <BlogInlineCode>increase()</BlogInlineCode> en dashboards de
        tiempo real: <BlogInlineCode>rate()</BlogInlineCode> suaviza mejor los
        picos.
      </BlogCallout>

      <BlogH2 id="grafana">Dashboards con Grafana</BlogH2>

      <BlogP>
        Grafana conecta Prometheus como fuente de datos y te permite construir
        paneles visuales — gráficos, estadísticas y tablas — que actualizan en
        tiempo real.
      </BlogP>

      <BlogH3 id="install-grafana">Instalación con Docker</BlogH3>

      <BlogCode>{`# Añadir Grafana al docker-compose
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

      <BlogH3 id="datasource">Añadir Prometheus como fuente</BlogH3>

      <BlogP>
        En Grafana ve a{" "}
        <strong>Configuration → Data Sources → Add data source</strong> y
        selecciona Prometheus. La URL será{" "}
        <BlogInlineCode>http://prometheus:9090</BlogInlineCode> si usas Docker
        Compose.
      </BlogP>

      <BlogH3 id="paneles">Crear paneles</BlogH3>

      <BlogP>
        Grafana ofrece tres tipos de panel principales:
      </BlogP>

      <BlogP>
        <strong>Graph:</strong>.series temporales — ideal para latencia, tasa de
        errores y throughput. Usa PromQL como query.
      </BlogP>

      <BlogP>
        <strong>Stat:</strong>un solo valor grande con color condicional — útil
        para mostrar disponibilidad actual o peticiones activas.
      </BlogP>

      <BlogP>
        <strong>Table:</strong>datos tabulares — perfecto para el top 5 de
        endpoints con mayor latencia.
      </BlogP>

      <BlogCode>{`# Ejemplo de PromQL para panel Graph — latencia P99
histogram_quantile(0.99,
  sum by (le) (
    rate(http_request_duration_seconds_bucket[5m])
  )
)

# Ejemplo para panel Stat — disponibilidad actual
1 - (
  sum(rate(http_requests_total{status=~"5.."}[5m]))
  /
  sum(rate(http_requests_total[5m]))
)`}</BlogCode>

      <BlogH3 id="variables">Variables para filtrar por servicio</BlogH3>

      <BlogP>
        Las variables permiten crear dashboards reutilizables. En Grafana ve a{" "}
        <strong>Dashboard Settings → Variables → New</strong> y crea una
        variable <BlogInlineCode>service</BlogInlineCode> con la query{" "}
        <BlogInlineCode>label_values(http_requests_total, service)</BlogInlineCode>.
        Después usa <BlogInlineCode>$service</BlogInlineCode> en tus queries
        para filtrar.
      </BlogP>

      <BlogCallout type="info">
        Grafana tiene miles de dashboards comunitarios en{" "}
        <strong>grafana.com/grafana/dashboards</strong>. Importa el ID del
        dashboard y ajusta las variables de tu entorno. Es la forma más rápida
        de empezar sin construir todo desde cero.
      </BlogCallout>

      <BlogH2 id="loki">Logging con Loki</BlogH2>

      <BlogP>
        Loki es el complemento de Prometheus para logs. No indexa el contenido
        completo de cada línea — solo las etiquetas — lo que lo hace mucho más
        ligero que Elasticsearch. Se integra directamente con Grafana.
      </BlogP>

      <BlogH3 id="centralizado-vs-archivos">Logging centralizado vs archivos sueltos</BlogH3>

      <BlogP>
        En un solo contenedor puedes leer logs con{" "}
        <BlogInlineCode>docker logs</BlogInlineCode>. Pero cuando tienes
        múltiples servicios o réplicas, necesitas centralizar: recopilar logs
        de todos los contenedores en un solo lugar, buscarlos y alertar sobre
        ellos. Eso es lo que hace Loki con Promtail.
      </BlogP>

      <BlogH3 id="docker-compose-loki">Docker Compose con Loki + Promtail</BlogH3>

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

      <BlogH3 id="logql">Consultas con LogQL</BlogH3>

      <BlogP>
        LogQL se parece a PromQL. Filtras por etiquetas y luego aplicas
        operadores de texto:
      </BlogP>

      <BlogCode>{`# Todos los logs del contenedor "api"
{container="api"}

# Logs que contienen "error"
{container="api"} |= "error"

# Logs de errores 5xx en los últimos 5 min
{container="api"} |~ "5[0-9]{2}" [5m]

# Conteo de errores por minuto
rate({container="api"} |= "error" [1m])`}</BlogCode>

      <BlogCallout type="warn">
        Loki indexa <em>etiquetas</em> (como{" "}
        <BlogInlineCode>container</BlogInlineCode> o{" "}
        <BlogInlineCode>service</BlogInlineCode>), no el contenido de los
        logs. Usar demasiadas etiquetas de alta cardinalidad (como IDs de
        usuario) puede degradar el rendimiento. Mantén las etiquetas bajas y
        usa filtros de texto para el contenido.
      </BlogCallout>

      <BlogH2 id="trazas-otel">Trazas distribuidas con OpenTelemetry</BlogH2>

      <BlogP>
        OpenTelemetry (OTel) es el estándar de la CNCF para telemetría. Provee
        APIs unificadas para métricas, logs y trazas, con SDKs para la mayoría
        de lenguajes y un{" "}
        <BlogInlineCode>Collector</BlogInlineCode> que recibe, procesa y
        exporta datos a múltiples backends.
      </BlogP>

      <BlogH3 id="que-son-traces">Qué son traces, spans y context propagation</BlogH3>

      <BlogP>
        Una <strong>trace</strong> representa el recorrido completo de una
        petición a través del sistema. Se compone de{" "}
        <strong>spans</strong>, cada uno representando una unidad de trabajo —
        una llamada HTTP, una query a la base de datos, una operación en cola.
        Cada span tiene un <BlogInlineCode>traceId</BlogInlineCode>, un{" "}
        <BlogInlineCode>spanId</BlogInlineCode>, un padre opcional, timestamps
        y atributos.
      </BlogP>

      <BlogP>
        La <strong>context propagation</strong> es el mecanismo que transporta
        el ID de traza entre servicios. Cuando tu API llama a otro
        microservicio, el SDK OTel inyecta headers HTTP (
        <BlogInlineCode>traceparent</BlogInlineCode>) para que el siguiente
        servicio cree un span hijo en la misma traza.
      </BlogP>

      <BlogH3 id="install-collector">Instalar el OTel Collector</BlogH3>

      <BlogCode>{`# Añadir al docker-compose
services:
  otel-collector:
    image: otel/opentelemetry-collector-contrib:latest
    command: ["--config=/etc/otelcol/config.yml"]
    volumes:
      - ./otel-config.yml:/etc/otelcol/config.yml
    ports:
      - "4317:4317"   # OTLP gRPC
      - "4318:4318"   # OTLP HTTP
      - "8888:8888"   # Métricas del propio collector

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

      <BlogH3 id="instrumentar-node">Instrumentar una app Node.js</BlogH3>

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

// Tu app Express/Koa/Fastify se instrumenta automáticamente
// Los spans se crean para cada request HTTP, query SQL, etc.`}</BlogCode>

      <BlogP>
        Con las auto-instrumentaciones, cada petición HTTP entrante y saliente,
        cada query a base de datos y cada llamada a cola se convierte en un
        span automáticamente, sin que modifiques tu código de negocio.
      </BlogP>

      <BlogH3 id="jaeger-ui">Ver trazas en Jaeger UI</BlogH3>

      <BlogP>
        Jaeger es un backend de trazas que visualiza las trazas recogidas por
        el Collector. Añádelo al compose y accede a la UI en{" "}
        <BlogInlineCode>http://localhost:16686</BlogInlineCode>:
      </BlogP>

      <BlogCode>{`# Añadir Jaeger al docker-compose
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
        En Jaeger UI selecciona tu servicio, busca trazas por duración o
        etiqueta, y explora el grafo de spans: verás exactamente cuánto tarda
        cada paso y dónde se acumula la latencia.
      </BlogP>

      <BlogCallout type="info">
        No necesitas instalar las tres herramientas de golpe. Empieza por las{" "}
        <strong>métricas</strong> (Prometheus + Grafana) — son las más baratas
        de operar y las que más valor dan al principio. Cuando tengas alerts
        funcionando, añade logs (Loki) y después trazas (OTel + Jaeger). Cada
        pilar se integra con los anteriores en Grafana.
      </BlogCallout>

      <hr className="border-black/8 dark:border-white/8 my-8" />

      <BlogP>
        Observabilidad no es un lujo — es una inversión que reduce el tiempo de
        resolución de incidentes de horas a minutos. Con Prometheus, Grafana,
        Loki y OpenTelemetry tienes un stack completo y gratuito que escala
        desde un portátil hasta un cluster de producción. La clave está en
        empezar poco a poco y construir la cultura de observabilidad en tu
        equipo.
      </BlogP>
    </article>
  );
}
