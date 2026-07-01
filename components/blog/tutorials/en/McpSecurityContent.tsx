"use client";
import {
  BlogCallout,
  BlogCode,
  BlogH2,
  BlogH3,
  BlogInlineCode,
  BlogLi,
  BlogP,
  BlogUl,
} from "@/components/blog/shared";

export default function McpSecurityContent() {
  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 mb-8">
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-800/50">
          Article
        </span>
        <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
          10 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-4"
        style={{ letterSpacing: "-0.03em" }}
      >
        MCP Security: how to audit and protect your servers
      </h1>
      <p className="text-base md:text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed mb-8">
        El protocolo MCP da a la IA acceso directo a tu sistema de archivos,
        secretos y servicios externos. Aprende a auditar cada servidor antes de
        instalarlo y a mantener un entorno seguro.
      </p>

      <div className="h-px bg-black/8 dark:bg-white/8 mb-8" />

      <BlogH2>Threat model</BlogH2>
      <BlogP>
        Cada servidor MCP que añades a tu configuración recibe los mismos
        permisos que la herramienta que lo ejecuta. Un MCP malicioso —o un MCP
        legítimo con una vulnerabilidad— puede causar daños en varias áreas:
      </BlogP>
      <BlogH3>Filesystem access</BlogH3>
      <BlogP>
        Servidores como{" "}
        <BlogInlineCode>@modelcontextprotocol/server-filesystem</BlogInlineCode>{" "}
        pueden leer, escribir y eliminar cualquier archivo dentro del directorio
        que se les conceda. Si el directorio de inicio se expone sin
        restricciones, un MCP podría leer claves SSH, tokens de acceso o
        credenciales de base de datos almacenadas en archivos de configuración.
      </BlogP>
      <BlogH3>HTTP exfiltration / SSE</BlogH3>
      <BlogP>
        Un servidor MCP puede realizar peticiones HTTP a Internet. Esto
        significa que puede enviar datos sensibles —como tokens o fragmentos de
        código propietario— a un servidor controlado por un atacante. La
        exfiltración es difícil de detectar porque el tráfico parece una
        comunicación API legítima.
      </BlogP>
      <BlogH3>Environment token access</BlogH3>
      <BlogP>
        Los MCPs de terceros suelen requerir tokens de API (GitHub, Stripe,
        Slack, etc.). Si el servidor es malicioso, puede capturar esas variables
        de entorno y reutilizarlas. Incluso si el servidor es legítimo, una
        vulnerabilidad en sus dependencias puede exponer esos tokens.
      </BlogP>
      <BlogH3>Arbitrary command execution</BlogH3>
      <BlogP>
        Algunos servidores ejecutan comandos del sistema a través de{" "}
        <BlogInlineCode>child_process</BlogInlineCode> o declaran scripts de{" "}
        <BlogInlineCode>postinstall</BlogInlineCode> en{" "}
        <BlogInlineCode>package.json</BlogInlineCode>. Un paquete comprometido
        puede ejecutar cualquier cosa con los permisos del usuario que ejecuta
        el MCP.
      </BlogP>

      <BlogH2>Auditing a server before installing</BlogH2>
      <BlogP>
        Nunca confíes ciegamente en un servidor MCP. Aplica esta auditoría
        mínima antes de añadirlo a tu configuración:
      </BlogP>
      <BlogH3>Revisar package.json</BlogH3>
      <BlogP>
        Examina el <BlogInlineCode>package.json</BlogInlineCode> del paquete.
        Busca dos cosas principalmente:
      </BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Dependencias.</strong> Cuantas más dependencias tenga, mayor
          es la superficie de ataque. Un paquete con 200 dependencias indirectas
          debería ser examinado con cuidado.
        </BlogLi>
        <BlogLi>
          <strong>Scripts de postinstall.</strong> Cualquier script en{" "}
          <BlogInlineCode>scripts.postinstall</BlogInlineCode> se ejecuta
          automáticamente al instalar. Si ves comandos como{" "}
          <BlogInlineCode>curl</BlogInlineCode>,{" "}
          <BlogInlineCode>eval</BlogInlineCode> o descargas desde URLs no
          verificadas, desconfía.
        </BlogLi>
      </BlogUl>
      <BlogH3>Buscar process.env en el código fuente</BlogH3>
      <BlogP>
        El servidor necesita acceder a variables de entorno para funcionar, pero
        debes verificar qué hace con ellas. Busca en el código referencias a{" "}
        <BlogInlineCode>process.env</BlogInlineCode> y asegúrate de que los
        tokens solo se usan para autenticar peticiones API, no para enviarlos a
        terceros ni almacenarlos en logs.
      </BlogP>
      <BlogH3>Verificar los argumentos del comando</BlogH3>
      <BlogP>
        Algunos MCPs aceptan rutas como argumento (
        <BlogInlineCode>"args": ["/ruta/al/proyecto"]</BlogInlineCode>). Nunca
        pases rutas sin control: si el servidor espera un directorio, asegúrate
        de que sea el mínimo necesario. Por ejemplo, en lugar de pasar{" "}
        <BlogInlineCode>~</BlogInlineCode>, pasa{" "}
        <BlogInlineCode>./mi-proyecto</BlogInlineCode>.
      </BlogP>
      <BlogH3>Preferir servidores open-source verificables</BlogH3>
      <BlogP>
        Los servidores con código fuente abierto permiten inspeccionar cada
        línea. Los paquetes cerrados o sin repositorio público son una caja
        negra. Siempre que sea posible, elige servidores cuyo código puedas
        revisar directamente en GitHub.
      </BlogP>

      <BlogH2>Configuration best practices</BlogH2>
      <BlogP>
        Una vez que has auditado el servidor, la configuración segura es igual
        de importante. Estas prácticas reducen el riesgo incluso si un servidor
        se ve comprometido:
      </BlogP>
      <BlogUl>
        <BlogLi>
          <strong>.env separado.</strong> No hardcodees tokens en el archivo de
          configuración del MCP. Usa un archivo{" "}
          <BlogInlineCode>.env</BlogInlineCode> que no se suba al repositorio y
          referencia las variables con{" "}
          <BlogInlineCode>{"${VAR_NAME}"}</BlogInlineCode>.
        </BlogLi>
        <BlogLi>
          <strong>GitHub tokens con scopes mínimos.</strong> Crea tokens de
          acceso personal con permisos de solo lectura (
          <BlogInlineCode>repo:read</BlogInlineCode>,{" "}
          <BlogInlineCode>contents:read</BlogInlineCode>). Nunca uses tokens con
          permisos de escritura a menos que sea estrictamente necesario.
        </BlogLi>
        <BlogLi>
          <strong>Rotación periódica de tokens.</strong> Programa la rotación de
          tokens cada 30-90 días. Un token filtrado tiene una ventana de
          exposición limitada si se rota con regularidad.
        </BlogLi>
        <BlogLi>
          <strong>No subir tokens a repos públicos.</strong> El archivo{" "}
          <BlogInlineCode>opencode.json</BlogInlineCode> contiene la
          configuración de los MCPs. Asegúrate de que los tokens no aparecen
          literalmente en ese archivo. Usa variables de entorno y añade{" "}
          <BlogInlineCode>.env</BlogInlineCode> a{" "}
          <BlogInlineCode>.gitignore</BlogInlineCode>.
        </BlogLi>
      </BlogUl>

      <BlogCode>{`// Mal — token hardcodeado en el config
"servers": {
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": {
      "GITHUB_TOKEN": "ghp_miTokenAqui"
    }
  }
}

// Bien — token desde variable de entorno
"servers": {
  "github": {
    "command": "npx",
    "args": ["-y", "@modelcontextprotocol/server-github"],
    "env": {
      "GITHUB_TOKEN": "\${GITHUB_TOKEN}"
    }
  }
}`}</BlogCode>

      <BlogH2>Sandboxing</BlogH2>
      <BlogP>
        El sandboxing es la capa más efectiva de defensa. Aísla los MCPs de
        terceros para que, incluso si son maliciosos, el daño esté contenido.
      </BlogP>
      <BlogH3>Docker para aislar MCPs de terceros</BlogH3>
      <BlogP>
        Ejecuta servidores MCP no verificados dentro de contenedores Docker.
        Esto limita el acceso al sistema de archivos, la red y los procesos del
        host. Puedes definir un contenedor con montajes de solo lectura y sin
        acceso a la red externa.
      </BlogP>
      <BlogCode>{`services:
  mcp-filesystem:
    image: node:20-alpine
    working_dir: /proyecto
    volumes:
      - ./proyecto:/proyecto:ro
    command: npx -y @modelcontextprotocol/server-filesystem /proyecto
    network_mode: none
    read_only: true`}</BlogCode>
      <BlogH3>Deno con permisos selectivos</BlogH3>
      <BlogP>
        Si el servidor MCP está escrito en Deno, puedes usar su sistema de
        permisos granular. Por ejemplo,{" "}
        <BlogInlineCode>
          deno run --allow-read=/proyecto --allow-net=api.github.com
        </BlogInlineCode>{" "}
        restringe el acceso a solo un directorio y un host específico. Evita
        usar <BlogInlineCode>--allow-all</BlogInlineCode>.
      </BlogP>
      <BlogH3>Sistema de archivos read-only</BlogH3>
      <BlogP>
        Cuando configures un MCP que solo necesita leer archivos, monta el
        volumen como <BlogInlineCode>read-only</BlogInlineCode>. Así, incluso si
        el servidor es comprometido, no podrá modificar ni eliminar archivos del
        proyecto.
      </BlogP>

      <BlogH2>Trusted MCPs vs community</BlogH2>
      <BlogP>
        No todos los MCPs tienen el mismo nivel de fiabilidad. Aquí tienes una
        clasificación orientativa:
      </BlogP>
      <table className="w-full text-sm border-collapse mb-6">
        <thead>
          <tr className="border-b border-black/8 dark:border-white/8">
            <th className="text-left py-2 pr-4 font-semibold text-[#1d1d1f] dark:text-white">
              Origin
            </th>
            <th className="text-left py-2 pr-4 font-semibold text-[#1d1d1f] dark:text-white">
              Examples
            </th>
            <th className="text-left py-2 font-semibold text-[#1d1d1f] dark:text-white">
              Trust
            </th>
          </tr>
        </thead>
        <tbody className="text-[#3a3a3c] dark:text-[#aeaeb2]">
          <tr className="border-b border-black/6 dark:border-white/6">
            <td className="py-2 pr-4">Oficiales de Anthropic</td>
            <td className="py-2 pr-4">
              <BlogInlineCode>@modelcontextprotocol/*</BlogInlineCode>
            </td>
            <td className="py-2">
              High — mantenidos por el equipo de Anthropic
            </td>
          </tr>
          <tr className="border-b border-black/6 dark:border-white/6">
            <td className="py-2 pr-4">Oficiales de partners</td>
            <td className="py-2 pr-4">
              <BlogInlineCode>@cloudflare/*</BlogInlineCode>,{" "}
              <BlogInlineCode>@anthropic/*</BlogInlineCode>
            </td>
            <td className="py-2">High — empresas verificadas</td>
          </tr>
          <tr className="border-b border-black/6 dark:border-white/6">
            <td className="py-2 pr-4">Comunidad establecida</td>
            <td className="py-2 pr-4">
              <BlogInlineCode>@kukapay/*</BlogInlineCode>,{" "}
              <BlogInlineCode>@executeautomation/*</BlogInlineCode>
            </td>
            <td className="py-2">Medium — revisar código antes de usar</td>
          </tr>
          <tr>
            <td className="py-2 pr-4">Desconocido / nuevo</td>
            <td className="py-2 pr-4">
              Paquetes con &lt;100 ⭐ o sin releases
            </td>
            <td className="py-2">Low — auditoría obligatoria</td>
          </tr>
        </tbody>
      </table>
      <BlogP>
        Los servidores oficiales del{" "}
        <BlogInlineCode>@modelcontextprotocol</BlogInlineCode> pasan por
        revisiones de seguridad y tienen un mantenimiento activo. Para
        servidores de terceros, aplica siempre la auditoría descrita en la
        sección anterior.
      </BlogP>
      <BlogH3>Mantener actualizados los servidores</BlogH3>
      <BlogP>
        Las vulnerabilidades se descubren constantemente. Ejecuta{" "}
        <BlogInlineCode>npm audit</BlogInlineCode> regularmente en los proyectos
        que instalan MCPs. Si un servidor no se actualiza en meses, considera
        migrar a una alternativa más activa. Un servidor abandonado es un riesgo
        acumulativo.
      </BlogP>

      <BlogH2>Security checklist</BlogH2>
      <BlogP>
        Usa esta checklist cada vez que añadas un nuevo servidor MCP a tu
        proyecto:
      </BlogP>
      <BlogUl>
        <BlogLi>
          ✅ Revisé el <BlogInlineCode>package.json</BlogInlineCode> —
          dependencias razonables, sin scripts de postinstall sospechosos
        </BlogLi>
        <BlogLi>
          ✅ Leí el código fuente del servidor (al menos los archivos
          principales)
        </BlogLi>
        <BlogLi>
          ✅ Verifiqué que los tokens solo se envían a la API esperada
        </BlogLi>
        <BlogLi>
          ✅ Configuré los tokens como variables de entorno, no hardcodeados
        </BlogLi>
        <BlogLi>
          ✅ Restringí el directorio de trabajo al mínimo necesario
        </BlogLi>
        <BlogLi>
          ✅ Usé un token con scopes de solo lectura siempre que fue posible
        </BlogLi>
        <BlogLi>
          ✅ Ejecuté el servidor en un contenedor Docker si es de un tercero no
          verificado
        </BlogLi>
        <BlogLi>
          ✅ Añadí <BlogInlineCode>.env</BlogInlineCode> a{" "}
          <BlogInlineCode>.gitignore</BlogInlineCode>
        </BlogLi>
        <BlogLi>
          ✅ Verifiqué que el servidor tiene mantenimiento activo (commits
          recientes, releases)
        </BlogLi>
        <BlogLi>
          ✅ Ejecuté <BlogInlineCode>npm audit</BlogInlineCode> y no hay
          vulnerabilidades críticas
        </BlogLi>
      </BlogUl>

      <BlogCallout type="warn">
        <strong>La seguridad es tu responsabilidad.</strong> El protocolo MCP da
        acceso privilegiado a la IA a tu sistema, y ningún proveedor de
        herramientas —ya sea OpenCode, Claude Code o Cursor— puede garantizar la
        seguridad de servidores de terceros. Audita cada MCP como auditarías
        cualquier otra dependencia de tu proyecto. Un fallo de seguridad en un
        MCP puede exponer tokens, código fuente o datos sensibles de tu
        infraestructura.
      </BlogCallout>
    </article>
  );
}
