"use client";
import {
  BlogCallout,
  BlogCode,
  BlogH2,
  BlogInlineCode,
  BlogLi,
  BlogP,
  BlogUl,
} from "@/components/blog/shared";

export default function CreateMcpContent() {
  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 mb-8">
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-800/50">
          Tutorial
        </span>
        <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
          10-15 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-4"
        style={{ letterSpacing: "-0.03em" }}
      >
        Cómo crear tu propio servidor MCP
      </h1>
      <p className="text-base md:text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed mb-8">
        Aprende a construir un servidor MCP desde cero usando el SDK oficial de
        Anthropic. Tools, resources y despliegue paso a paso.
      </p>

      <div className="h-px bg-black/8 dark:bg-white/8 mb-8" />

      <BlogH2>¿Qué necesitas?</BlogH2>
      <BlogUl>
        <BlogLi>
          <BlogInlineCode>Node.js 18+</BlogInlineCode> — cualquier versión LTS
          reciente
        </BlogLi>
        <BlogLi>
          TypeScript — el SDK está escrito en TS, aunque puedes usarlo desde JS
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>npm</BlogInlineCode> o{" "}
          <BlogInlineCode>pnpm</BlogInlineCode> para gestionar dependencias
        </BlogLi>
        <BlogLi>Un editor de código (VS Code, Cursor, etc.)</BlogLi>
      </BlogUl>

      <BlogH2>Proyecto desde cero</BlogH2>
      <BlogP>Crea una carpeta para tu servidor e inicializa el proyecto:</BlogP>
      <BlogCode>{`mkdir mi-servidor-mcp
cd mi-servidor-mcp
npm init -y`}</BlogCode>
      <BlogP>Instala las dependencias necesarias:</BlogP>
      <BlogCode>{`npm install @modelcontextprotocol/sdk zod
npm install -D typescript @types/node`}</BlogCode>
      <BlogP>
        Crea un <BlogInlineCode>tsconfig.json</BlogInlineCode> con la
        configuración básica:
      </BlogP>
      <BlogCode>{`{
  "compilerOptions": {
    "target": "ES2022",
    "module": "Node16",
    "moduleResolution": "Node16",
    "strict": true,
    "esModuleInterop": true,
    "outDir": "./dist",
    "rootDir": "./src",
    "declaration": true,
    "skipLibCheck": true
  },
  "include": ["src/**/*"]
}`}</BlogCode>
      <BlogP>La estructura final del proyecto será:</BlogP>
      <BlogCode>{`mi-servidor-mcp/
├── package.json
├── tsconfig.json
├── src/
│   └── index.ts
└── dist/`}</BlogCode>

      <BlogH2>Tu primer servidor MCP</BlogH2>
      <BlogP>
        Vamos a crear un servidor que exponga un tool de saludo. Abre{" "}
        <BlogInlineCode>src/index.ts</BlogInlineCode> y escribe:
      </BlogP>
      <BlogCode>{`import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "mi-servidor",
  version: "1.0.0",
});

server.tool(
  "greet",
  "Saluda a una persona por su nombre",
  { name: z.string().describe("El nombre de la persona") },
  async ({ name }) => {
    return {
      content: [{ type: "text", text: "Hola, " + name + "! Bienvenido a MCP." }],
    };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);`}</BlogCode>
      <BlogP>
        Añade los scripts al <BlogInlineCode>package.json</BlogInlineCode>:
      </BlogP>
      <BlogCode>{`"scripts": {
  "build": "tsc",
  "start": "node dist/index.js"
}`}</BlogCode>
      <BlogP>Compila y prueba:</BlogP>
      <BlogCode>{`npm run build
node dist/index.js`}</BlogCode>
      <BlogP>
        El servidor se queda escuchando por stdio. No verás nada en la terminal
        porque espera mensajes JSON-RPC del cliente. Para probarlo necesitas un
        cliente MCP como OpenCode o el Inspector.
      </BlogP>

      <BlogCallout type="tip">
        Usa <BlogInlineCode>z.string().describe()</BlogInlineCode> para que la
        IA entienda qué debe pasar en cada parámetro. La descripción es clave
        para que el modelo use bien tu tool.
      </BlogCallout>

      <BlogH2>Añadir un Resource</BlogH2>
      <BlogP>
        Los resources permiten que la IA lea datos estructurados desde tu
        servidor. Vamos a exponer proyectos ficticios usando una plantilla URI:
      </BlogP>
      <BlogCode>{`server.resource(
  "project",
  "file://projects/{id}",
  async (uri) => {
    const id = uri.pathname.split("/").pop();

    return {
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify({
            id,
            name: \`Proyecto \${id}\`,
            status: "activo",
            createdAt: new Date().toISOString(),
          }, null, 2),
        },
      ],
    };
  },
);`}</BlogCode>
      <BlogP>
        El cliente puede solicitar{" "}
        <BlogInlineCode>file://projects/42</BlogInlineCode> y recibirá un JSON
        con los datos del proyecto. El URI se parsea automáticamente y el
        handler recibe el objeto <BlogInlineCode>URI</BlogInlineCode> completo.
      </BlogP>
      <BlogP>
        Tu <BlogInlineCode>src/index.ts</BlogInlineCode> completo debería verse
        así:
      </BlogP>
      <BlogCode>{`import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "mi-servidor",
  version: "1.0.0",
});

server.tool(
  "greet",
  "Saluda a una persona por su nombre",
  { name: z.string().describe("El nombre de la persona") },
  async ({ name }) => {
    return {
      content: [{ type: "text", text: \`Hola, \${name}! Bienvenido a MCP.\` }],
    };
  },
);

server.resource(
  "project",
  "file://projects/{id}",
  async (uri) => {
    const id = uri.pathname.split("/").pop();

    return {
      contents: [
        {
          uri: uri.href,
          mimeType: "application/json",
          text: JSON.stringify({
            id,
            name: \`Proyecto \${id}\`,
            status: "activo",
            createdAt: new Date().toISOString(),
          }, null, 2),
        },
      ],
    };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);`}</BlogCode>

      <BlogH2>Probar con MCP Inspector</BlogH2>
      <BlogP>
        Anthropic provee una herramienta interactiva para depurar servidores MCP
        sin necesidad de un cliente IA.
      </BlogP>
      <BlogP>Primero compila tu servidor y luego ejecuta:</BlogP>
      <BlogCode>{`npx @modelcontextprotocol/inspector node dist/index.js`}</BlogCode>
      <BlogP>Esto abre una UI en el navegador donde puedes:</BlogP>
      <BlogUl>
        <BlogLi>Ver la lista de tools y resources disponibles</BlogLi>
        <BlogLi>Ejecutar tools con parámetros personalizados</BlogLi>
        <BlogLi>Inspeccionar la respuesta JSON-RPC completa</BlogLi>
        <BlogLi>Probar la resolución de resources por URI</BlogLi>
      </BlogUl>

      <BlogCallout type="info">
        El Inspector es una herramienta de desarrollo. No la uses en producción.
        Te permite iterar rápido sin tener que configurar un cliente cada vez.
      </BlogCallout>

      <BlogH2>Configurar en OpenCode</BlogH2>
      <BlogP>
        Una vez que tu servidor funciona, añádelo a{" "}
        <BlogInlineCode>opencode.json</BlogInlineCode> en la raíz de tu
        proyecto:
      </BlogP>
      <BlogCode>{`{
  "mcpServers": {
    "mi-servidor": {
      "command": "node",
      "args": ["dist/index.js"]
    }
  }
}`}</BlogCode>
      <BlogP>
        Si prefieres que el servidor se compile automáticamente antes de
        ejecutarse, usa <BlogInlineCode>npm run build</BlogInlineCode> como
        pre-callback o apunta directamente al source con{" "}
        <BlogInlineCode>tsx</BlogInlineCode>:
      </BlogP>
      <BlogCode>{`{
  "mcpServers": {
    "mi-servidor": {
      "command": "npx",
      "args": ["tsx", "src/index.ts"]
    }
  }
}`}</BlogCode>
      <BlogP>
        Con esta configuración, OpenCode cargará tu servidor al iniciar sesión y
        podrás usar el tool <BlogInlineCode>greet</BlogInlineCode> y el resource{" "}
        <BlogInlineCode>file://projects/</BlogInlineCode> directamente desde el
        chat.
      </BlogP>

      <BlogH2>Publicar tu servidor</BlogH2>
      <BlogP>
        Si quieres compartir tu servidor con la comunidad, puedes publicarlo en
        npm:
      </BlogP>
      <BlogCode>{`npm publish`}</BlogCode>
      <BlogP>
        Asegúrate de tener un <BlogInlineCode>package.json</BlogInlineCode>{" "}
        completo con <BlogInlineCode>name</BlogInlineCode>,{" "}
        <BlogInlineCode>version</BlogInlineCode>,{" "}
        <BlogInlineCode>main</BlogInlineCode> apuntando a{" "}
        <BlogInlineCode>dist/index.js</BlogInlineCode>, y los{" "}
        <BlogInlineCode>bin</BlogInlineCode> si quieres que se ejecute con{" "}
        <BlogInlineCode>npx</BlogInlineCode>.
      </BlogP>
      <BlogP>
        También puedes crear un template en GitHub para que otros hagan fork.
        Incluye un README con instrucciones claras y ejemplos de configuración.
      </BlogP>

      <BlogCallout type="done">
        Has creado tu primer servidor MCP desde cero. Ahora entiendes la
        arquitectura del protocolo, cómo definir tools con Zod, cómo exponer
        resources y cómo conectarlo a OpenCode. Desde aquí puedes explorar el
        resto del SDK: prompts, notificaciones, transporte HTTP, y handlers
        personalizados.
      </BlogCallout>
    </article>
  );
}
