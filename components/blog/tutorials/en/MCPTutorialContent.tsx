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
        How to install MCP for AI agents
      </h1>
      <p className="text-base md:text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed mb-8">
        Complete guide to the Model Context Protocol (MCP): what it is, how it works, and
        how to configure MCP servers in OpenCode, Claude Code, and Cursor.
        Includes 20 ready-to-use servers.
      </p>

      <div className="h-px bg-black/8 dark:bg-white/8 mb-8" />

      <BlogH2>What is MCP?</BlogH2>
      <BlogP>
        <strong>Model Context Protocol (MCP)</strong> is an open protocol
        standardized by Anthropic that allows AI assistants
        to connect with external tools — databases, file
        systems, APIs, browsers — through a single contract.
      </BlogP>
      <BlogP>
        Think of MCP as <strong>USB-C for AI</strong>: a universal
        connector where each MCP server is a peripheral that gives
        superpowers to the assistant. Instead of each AI implementing its own
        integration with GitHub, Postgres, or the file system, MCP unifies
        everything under a single protocol.
      </BlogP>

      <BlogH2>How it works</BlogH2>
      <BlogP>MCP follows a client-server architecture:</BlogP>
      <BlogUl>
        <BlogLi>
          <strong>MCP Client</strong> — the AI assistant (OpenCode, Claude Code,
          Cursor, etc.) that connects to servers
        </BlogLi>
        <BlogLi>
          <strong>MCP Server</strong> — a process that exposes tools,
          resources, and resource templates that the
          AI can use
        </BlogLi>
        <BlogLi>
          <strong>Protocol</strong> — communication via JSON-RPC over stdio
          (local) or HTTP+SSE (remote)
        </BlogLi>
      </BlogUl>
      <BlogP>
        Each MCP server declares what tools it offers. For example, the
        <strong> filesystem</strong> server exposes tools like <code>read_file</code>,
        <code>write_file</code>, <code>list_directory</code>. The AI decides
        when to call them based on the task.
      </BlogP>

      <BlogH3>Types of servers</BlogH3>
      <BlogUl>
        <BlogLi>
          <strong>Local (stdio)</strong> — run as child processes. The
          most common. E.g.: filesystem, github, sqlite
        </BlogLi>
        <BlogLi>
          <strong>Remote (HTTP+SSE)</strong> — cloud servers
          you connect to via URL. E.g.: Supabase, Stripe, Slack
        </BlogLi>
      </BlogUl>

      <BlogH2>Installation in OpenCode</BlogH2>
      <BlogP>
        OpenCode configures MCPs in the <code>opencode.json</code> file at
        the project root. Each server is defined as an object with
        <code>command</code>, <code>args</code>, and <code>env</code>:
      </BlogP>

      <BlogCode>{`{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "/path/to/project"]
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

      <BlogP>To activate them, open OpenCode and use the command:</BlogP>
      <BlogCode>{`opencode
# OpenCode automatically detects MCPs in opencode.json
# and loads them when starting a session`}</BlogCode>

      <BlogH3>Global vs local installation</BlogH3>
      <BlogUl>
        <BlogLi>
          <strong>Local (recommended)</strong> — in the project's
          <code>opencode.json</code>. MCPs are available
          only in that project
        </BlogLi>
        <BlogLi>
          <strong>Global</strong> — in
          <code>~/.config/opencode/opencode.json</code>. MCPs are
          available in all projects
        </BlogLi>
      </BlogUl>

      <BlogH2>Installation in Claude Code</BlogH2>
      <BlogP>
        Claude Code uses the same format. Create or edit the
        <code>claude.json</code> file at the project root:
      </BlogP>
      <BlogCode>{`{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
    }
  }
}`}</BlogCode>

      <BlogH2>Installation in Cursor</BlogH2>
      <BlogP>
        In Cursor go to
        <code>Settings → Cursor Settings → MCP Servers → Add New Server</code>.
        Each server is configured with a name, command, and args.
      </BlogP>

      <BlogCallout type="tip">
        Most MCP servers are installed with
        <code>npx -y @modelcontextprotocol/server-xxxx</code>. You don't need
        to install anything manually. npx downloads and runs the package on the fly.
      </BlogCallout>

      <BlogH2>Security and permissions</BlogH2>
      <BlogP>
        Each MCP server has access to whatever its configuration allows. A
        misconfigured filesystem server could read your entire disk. Best
        practices:
      </BlogP>
      <BlogUl>
        <BlogLi>
          Limit the directories the filesystem server exposes to only what's
          necessary
        </BlogLi>
        <BlogLi>
          Use tokens with minimum permissions (read-only GitHub token if you
          don't need to write)
        </BlogLi>
        <BlogLi>
          Don't share <code>opencode.json</code> with tokens in public
          repositories
        </BlogLi>
        <BlogLi>
          Use environment variables for tokens, never hardcoded values
        </BlogLi>
      </BlogUl>

      <BlogH2>Troubleshooting</BlogH2>
      <BlogUl>
        <BlogLi>
          <strong>MCP not showing up:</strong> verify that the command exists and
          that the args are correct. Try running the command manually in
          your terminal
        </BlogLi>
        <BlogLi>
          <strong>Connection error:</strong> local servers
          communicate via stdio. If the process fails to start, the MCP won't be
          available
        </BlogLi>
        <BlogLi>
          <strong>Invalid token:</strong> verify that the environment variables
          are spelled correctly and that the tokens haven't expired
        </BlogLi>
        <BlogLi>
          <strong>Logs:</strong> check the server output. Most
          write errors to stderr that the client captures
        </BlogLi>
      </BlogUl>

      <BlogH2>Verify it works</BlogH2>
      <BlogP>
        Once configured, open OpenCode and ask something like
        <em>"List the files in the current directory"</em> (uses filesystem) or
        <em>"Search my repo for issues tagged as bug"</em> (uses GitHub). If
        the assistant responds with real data, the MCP is working.
      </BlogP>

      <BlogCallout type="done">
        MCP is the standard that is unifying the ecosystem of tools
        for AI. Learning to configure it gives you access to a growing ecosystem
        of ready-to-use servers.
      </BlogCallout>

      {mcps.length > 0 && (
        <section className="mt-12 rounded-2xl border border-black/8 dark:border-white/8 bg-white dark:bg-[#111116] overflow-hidden">
          <div className="px-5 py-3 border-b border-black/8 dark:border-white/8">
            <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              Available MCP servers ({mcps.length})
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
              Articles tagged as{" "}
              <strong className="text-[#1d1d1f] dark:text-white">mcp</strong>{" "}
              appear here automatically.
            </p>
          </div>
        </section>
      )}
    </article>
  );
}
