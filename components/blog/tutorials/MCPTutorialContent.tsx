"use client";
import Link from "next/link";

import {
  BlogCallout,
  BlogCode,
  BlogH2,
  BlogH3,
  BlogLi,
  BlogP,
  BlogUl,
} from "@/components/blog/shared";
import { getContentByTag, typeSlug } from "@/lib/blog/registry";

export default function MCPTutorialContent() {
  const mcps = getContentByTag("mcp");

  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 mb-8">
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-800/50">
          Tutorial
        </span>
        <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
          15 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-4"
        style={{ letterSpacing: "-0.03em" }}
      >
        Cómo instalar MCP para agentes de IA
      </h1>
      <p className="text-base md:text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed mb-8">
        Guía completa del Model Context Protocol (MCP): qué es, cómo funciona y
        cómo configurar servidores MCP en OpenCode, Claude Code y Cursor.
        Incluye 20 servidores listos para usar.
      </p>

      <div className="h-px bg-black/8 dark:bg-white/8 mb-8" />

      <BlogH2>¿Qué es MCP?</BlogH2>
      <BlogP>
        <strong>Model Context Protocol (MCP)</strong> es un protocolo abierto
        estandarizado por Anthropic que permite a los asistentes de IA
        conectarse con herramientas externas — bases de datos, sistemas de
        archivos, APIs, navegadores — a través de un mismo contrato.
      </BlogP>
      <BlogP>
        Piensa en MCP como <strong>USB-C para la IA</strong>: un conector
        universal donde cada servidor MCP es un periférico que le da
        superpoderes al asistente. En lugar de que cada IA implemente su propia
        integración con GitHub, Postgres o el sistema de archivos, MCP unifica
        todo bajo un mismo protocolo.
      </BlogP>

      <BlogH2>Cómo funciona</BlogH2>
      <BlogP>MCP sigue una arquitectura cliente-servidor:</BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Cliente MCP</strong> — el asistente IA (OpenCode, Claude Code,
          Cursor, etc.) que se conecta a los servidores
        </BlogLi>
        <BlogLi>
          <strong>Servidor MCP</strong> — un proceso que expone herramientas
          (tools), recursos (resources) y plantillas (resource templates) que la
          IA puede usar
        </BlogLi>
        <BlogLi>
          <strong>Protocolo</strong> — comunicación via JSON-RPC sobre stdio
          (local) o HTTP+SSE (remoto)
        </BlogLi>
      </BlogUl>
      <BlogP>
        Cada servidor MCP declara qué tools ofrece. Por ejemplo, el servidor{" "}
        <strong>filesystem</strong> expone tools como <code>read_file</code>,{" "}
        <code>write_file</code>, <code>list_directory</code>. La IA decide
        cuándo llamarlas según la tarea.
      </BlogP>

      <BlogH3>Types de servidores</BlogH3>
      <BlogUl>
        <BlogLi>
          <strong>Locales (stdio)</strong> — se ejecutan como procesos hijo. El
          más común. Ej: filesystem, github, sqlite
        </BlogLi>
        <BlogLi>
          <strong>Remotos (HTTP+SSE)</strong> — servidores en la nube a los que
          te conectas via URL. Ej: Supabase, Stripe, Slack
        </BlogLi>
      </BlogUl>

      <BlogH2>Instalación en OpenCode</BlogH2>
      <BlogP>
        OpenCode configura los MCPs en el archivo <code>opencode.json</code> de
        la raíz del proyecto. Cada servidor se define como un objeto con{" "}
        <code>command</code>, <code>args</code> y <code>env</code>:
      </BlogP>

      <BlogCode>{`{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/ruta/al/proyecto"]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "ghp_..."
      }
    }
  }
}`}</BlogCode>

      <BlogP>Para activarlos, abre OpenCode y usa el comando:</BlogP>
      <BlogCode>{`opencode
# OpenCode detecta automáticamente los MCPs en opencode.json
# y los carga al iniciar sesión`}</BlogCode>

      <BlogH3>Instalación global vs local</BlogH3>
      <BlogUl>
        <BlogLi>
          <strong>Local (recomendado)</strong> — en el{" "}
          <code>opencode.json</code> del proyecto. Los MCPs están disponibles
          solo en ese proyecto
        </BlogLi>
        <BlogLi>
          <strong>Global</strong> — en{" "}
          <code>~/.config/opencode/opencode.json</code>. Los MCPs están
          disponibles en todos los proyectos
        </BlogLi>
      </BlogUl>

      <BlogH2>Instalación en Claude Code</BlogH2>
      <BlogP>
        Claude Code usa el mismo formato. Crea o edita el archivo{" "}
        <code>claude.json</code> en la raíz del proyecto:
      </BlogP>
      <BlogCode>{`{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
    }
  }
}`}</BlogCode>

      <BlogH2>Instalación en Cursor</BlogH2>
      <BlogP>
        En Cursor ve a{" "}
        <code>Settings → Cursor Settings → MCP Servers → Add New Server</code>.
        Cada servidor se configura con nombre, comando y args.
      </BlogP>

      <BlogCallout type="tip">
        La mayoría de servidores MCP se instalan con{" "}
        <code>npx -y @modelcontextprotocol/server-xxxx</code>. No necesitas
        instalar nada manualmente. npx descarga y ejecuta el paquete al vuelo.
      </BlogCallout>

      <BlogH2>Seguridad y permisos</BlogH2>
      <BlogP>
        Cada servidor MCP tiene acceso a lo que su configuración permita. Un
        servidor filesystem mal configurado podría leer todo tu disco. Buenas
        prácticas:
      </BlogP>
      <BlogUl>
        <BlogLi>
          Limita los directorios que expone el servidor filesystem a solo lo
          necesario
        </BlogLi>
        <BlogLi>
          Usa tokens con permisos mínimos (GitHub token de solo lectura si no
          necesitas escribir)
        </BlogLi>
        <BlogLi>
          No compartas <code>opencode.json</code> con tokens en repositorios
          públicos
        </BlogLi>
        <BlogLi>
          Usa variables de entorno para los tokens, nunca valores hardcodeados
        </BlogLi>
      </BlogUl>

      <BlogH2>Solución de problemas</BlogH2>
      <BlogUl>
        <BlogLi>
          <strong>El MCP no aparece:</strong> verifica que el comando existe y
          que los args son correctos. Prueba ejecutar el comando manualmente en
          tu terminal
        </BlogLi>
        <BlogLi>
          <strong>Error de conexión:</strong> los servidores locales se
          comunican por stdio. Si el proceso falla al iniciar, el MCP no estará
          disponible
        </BlogLi>
        <BlogLi>
          <strong>Token inválido:</strong> verifica que las variables de entorno
          están bien escritas y que los tokens no han expirado
        </BlogLi>
        <BlogLi>
          <strong>Logs:</strong> revisa la salida del servidor. La mayoría
          escribe errores a stderr que el cliente captura
        </BlogLi>
      </BlogUl>

      <BlogH2>Verifica que funciona</BlogH2>
      <BlogP>
        Una vez configurado, abre OpenCode y pide algo como{" "}
        <em>"Lista los archivos del directorio actual"</em> (usa filesystem) o{" "}
        <em>"Busca en mi repo issues etiquetados como bug"</em> (usa GitHub). Si
        el asistente responde con datos reales, el MCP está funcionando.
      </BlogP>

      <BlogCallout type="done">
        MCP es el estándar que está unificando el ecosistema de herramientas
        para IA. Aprender a configurarlo te da acceso a un ecosistema creciente
        de servidores listos para usar.
      </BlogCallout>

      {mcps.length > 0 && (
        <section className="mt-12 rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] overflow-hidden">
          <div className="px-5 py-3 border-b border-black/8 dark:border-white/8">
            <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              Servidores MCP disponibles ({mcps.length})
            </p>
          </div>
          <ul className="divide-y divide-black/[0.04] dark:divide-white/[0.04]">
            {mcps.map((m) => (
              <li key={m.slug}>
                <Link
                  className="flex items-center gap-3 px-5 py-3 hover:bg-black/[0.02] dark:hover:bg-white/[0.02] transition-colors no-underline group"
                  href={`/blog/${typeSlug(m.type)}/${m.slug}`}
                >
                  <span
                    aria-hidden="true"
                    className={`w-1.5 h-1.5 rounded-full ${m.categoryColor} flex-shrink-0`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#1d1d1f] dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors truncate">
                      {m.title}
                    </p>
                    <p className="text-xs text-[#6e6e73] dark:text-[#86868b] line-clamp-1">
                      {m.description}
                    </p>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <div className="px-5 py-2 border-t border-black/8 dark:border-white/8">
            <p className="text-[10px] text-[#aeaeb2] dark:text-[#636366]">
              Los artículos etiquetados como{" "}
              <strong className="text-[#1d1d1f] dark:text-white">mcp</strong>{" "}
              aparecen automáticamente aquí.
            </p>
          </div>
        </section>
      )}
    </article>
  );
}
