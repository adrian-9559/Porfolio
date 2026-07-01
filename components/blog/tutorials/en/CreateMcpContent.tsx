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
        How to Create Your Own MCP Server
      </h1>
      <p className="text-base md:text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed mb-8">
        Learn to build an MCP server from scratch using Anthropic's official
        SDK. Tools, resources, and deployment step by step.
      </p>

      <div className="h-px bg-black/8 dark:bg-white/8 mb-8" />

      <BlogH2>What you need</BlogH2>
      <BlogUl>
        <BlogLi>
          <BlogInlineCode>Node.js 18+</BlogInlineCode> — any recent LTS
          version
        </BlogLi>
        <BlogLi>
          TypeScript — the SDK is written in TS, though you can use it from JS
        </BlogLi>
        <BlogLi>
          <BlogInlineCode>npm</BlogInlineCode> or{" "}
          <BlogInlineCode>pnpm</BlogInlineCode> to manage dependencies
        </BlogLi>
        <BlogLi>A code editor (VS Code, Cursor, etc.)</BlogLi>
      </BlogUl>

      <BlogH2>Project from scratch</BlogH2>
      <BlogP>Create a folder for your server and initialize the project:</BlogP>
      <BlogCode>{`mkdir my-mcp-server
cd my-mcp-server
npm init -y`}</BlogCode>
      <BlogP>Install the necessary dependencies:</BlogP>
      <BlogCode>{`npm install @modelcontextprotocol/sdk zod
npm install -D typescript @types/node`}</BlogCode>
      <BlogP>
        Create a <BlogInlineCode>tsconfig.json</BlogInlineCode> with the
        basic configuration:
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
      <BlogP>The final project structure will be:</BlogP>
      <BlogCode>{`my-mcp-server/
├── package.json
├── tsconfig.json
├── src/
│   └── index.ts
└── dist/`}</BlogCode>

      <BlogH2>Your first MCP server</BlogH2>
      <BlogP>
        We'll create a server that exposes a greeting tool. Open{" "}
        <BlogInlineCode>src/index.ts</BlogInlineCode> and write:
      </BlogP>
      <BlogCode>{`import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "my-server",
  version: "1.0.0",
});

server.tool(
  "greet",
  "Greet a person by name",
  { name: z.string().describe("The person's name") },
  async ({ name }) => {
    return {
      content: [{ type: "text", text: "Hello, " + name + "! Welcome to MCP." }],
    };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);`}</BlogCode>
      <BlogP>
        Add the scripts to the <BlogInlineCode>package.json</BlogInlineCode>:
      </BlogP>
      <BlogCode>{`"scripts": {
  "build": "tsc",
  "start": "node dist/index.js"
}`}</BlogCode>
      <BlogP>Compile and test:</BlogP>
      <BlogCode>{`npm run build
node dist/index.js`}</BlogCode>
      <BlogP>
        The server will listen on stdio. You won't see anything in the terminal
        because it waits for JSON-RPC messages from the client. To test it you need
        an MCP client like OpenCode or the Inspector.
      </BlogP>

      <BlogCallout type="tip">
        Use <BlogInlineCode>z.string().describe()</BlogInlineCode> so the
        AI understands what to pass for each parameter. The description is key
        for the model to use your tool correctly.
      </BlogCallout>

      <BlogH2>Add a Resource</BlogH2>
      <BlogP>
        Resources allow the AI to read structured data from your
        server. Let's expose fictional projects using a URI template:
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
            name: \`Project \${id}\`,
            status: "active",
            createdAt: new Date().toISOString(),
          }, null, 2),
        },
      ],
    };
  },
);`}</BlogCode>
      <BlogP>
        The client can request{" "}
        <BlogInlineCode>file://projects/42</BlogInlineCode> and will receive a JSON
        with the project data. The URI is automatically parsed and the
        handler receives the full <BlogInlineCode>URI</BlogInlineCode> object.
      </BlogP>
      <BlogP>
        Your full <BlogInlineCode>src/index.ts</BlogInlineCode> should look
        like this:
      </BlogP>
      <BlogCode>{`import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const server = new McpServer({
  name: "my-server",
  version: "1.0.0",
});

server.tool(
  "greet",
  "Greet a person by name",
  { name: z.string().describe("The person's name") },
  async ({ name }) => {
    return {
      content: [{ type: "text", text: \`Hello, \${name}! Welcome to MCP.\` }],
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
            name: \`Project \${id}\`,
            status: "active",
            createdAt: new Date().toISOString(),
          }, null, 2),
        },
      ],
    };
  },
);

const transport = new StdioServerTransport();
await server.connect(transport);`}</BlogCode>

      <BlogH2>Test with MCP Inspector</BlogH2>
      <BlogP>
        Anthropic provides an interactive tool for debugging MCP servers
        without needing an AI client.
      </BlogP>
      <BlogP>First compile your server, then run:</BlogP>
      <BlogCode>{`npx @modelcontextprotocol/inspector node dist/index.js`}</BlogCode>
      <BlogP>This opens a UI in the browser where you can:</BlogP>
      <BlogUl>
        <BlogLi>View the list of available tools and resources</BlogLi>
        <BlogLi>Execute tools with custom parameters</BlogLi>
        <BlogLi>Inspect the complete JSON-RPC response</BlogLi>
        <BlogLi>Test URI resource resolution</BlogLi>
      </BlogUl>

      <BlogCallout type="info">
        The Inspector is a development tool. Don't use it in production.
        It lets you iterate quickly without setting up a client each time.
      </BlogCallout>

      <BlogH2>Configure in OpenCode</BlogH2>
      <BlogP>
        Once your server works, add it to{" "}
        <BlogInlineCode>opencode.json</BlogInlineCode> in your project
        root:
      </BlogP>
      <BlogCode>{`{
  "mcpServers": {
    "my-server": {
      "command": "node",
      "args": ["dist/index.js"]
    }
  }
}`}</BlogCode>
      <BlogP>
        If you prefer the server to compile automatically before
        running, use <BlogInlineCode>npm run build</BlogInlineCode> as
        a pre-callback or point directly to the source with{" "}
        <BlogInlineCode>tsx</BlogInlineCode>:
      </BlogP>
      <BlogCode>{`{
  "mcpServers": {
    "my-server": {
      "command": "npx",
      "args": ["tsx", "src/index.ts"]
    }
  }
}`}</BlogCode>
      <BlogP>
        With this configuration, OpenCode will load your server when starting a
        session and you'll be able to use the <BlogInlineCode>greet</BlogInlineCode> tool and the{" "}
        <BlogInlineCode>file://projects/</BlogInlineCode> resource directly from
        the chat.
      </BlogP>

      <BlogH2>Publish your server</BlogH2>
      <BlogP>
        If you want to share your server with the community, you can publish it on
        npm:
      </BlogP>
      <BlogCode>{`npm publish`}</BlogCode>
      <BlogP>
        Make sure you have a complete <BlogInlineCode>package.json</BlogInlineCode>{" "}
        with <BlogInlineCode>name</BlogInlineCode>,{" "}
        <BlogInlineCode>version</BlogInlineCode>,{" "}
        <BlogInlineCode>main</BlogInlineCode> pointing to{" "}
        <BlogInlineCode>dist/index.js</BlogInlineCode>, and{" "}
        <BlogInlineCode>bin</BlogInlineCode> if you want it to run with{" "}
        <BlogInlineCode>npx</BlogInlineCode>.
      </BlogP>
      <BlogP>
        You can also create a GitHub template for others to fork.
        Include a README with clear instructions and configuration examples.
      </BlogP>

      <BlogCallout type="done">
        You have created your first MCP server from scratch. Now you understand the
        protocol architecture, how to define tools with Zod, how to expose
        resources, and how to connect it to OpenCode. From here you can explore the
        rest of the SDK: prompts, notifications, HTTP transport, and custom
        handlers.
      </BlogCallout>
    </article>
  );
}
