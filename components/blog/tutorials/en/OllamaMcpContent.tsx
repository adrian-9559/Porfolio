"use client";
import {
  BlogCallout,
  BlogCode,
  BlogH2,
  BlogLi,
  BlogP,
  BlogUl,
} from "@/components/blog/shared";

export default function OllamaMcpContent() {
  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 mb-8">
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-800/50">
          Tutorial
        </span>
        <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
          8 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-4"
        style={{ letterSpacing: "-0.03em" }}
      >
        Ollama + MCP: local models with tools
      </h1>
      <p className="text-base md:text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed mb-8">
        Learn how to run language models locally with Ollama and
        connect them to MCP tools to supercharge your AI agents without
        relying on the cloud.
      </p>

      <div className="h-px bg-black/8 dark:bg-white/8 mb-8" />

      <BlogH2>Why local models with MCP?</BlogH2>
      <BlogP>
        Combining local models with the MCP protocol gives you the best of both
        worlds: the autonomy of running AI on your machine and the ability to
        use real tools (files, terminal, APIs) through the same
        standard that cloud models use.
      </BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Total privacy</strong> — your data never leaves your
          computer. Ideal for sensitive code, personal documents, or
          projects under NDA
        </BlogLi>
        <BlogLi>
          <strong>Zero cost</strong> — no API tokens, no subscriptions.
          Use your GPU or CPU as much as you want
        </BlogLi>
        <BlogLi>
          <strong>Offline</strong> — works without an Internet connection. Take
          your assistant on a plane, to the countryside, or to an isolated room
        </BlogLi>
        <BlogLi>
          <strong>Same protocol</strong> — the MCPs you configure for OpenAI
          or Anthropic work the same with Ollama. You change the backend, not the
          tools
        </BlogLi>
      </BlogUl>

      <BlogH2>Install Ollama</BlogH2>
      <BlogP>
        Ollama is the simplest local model manager. On macOS you
        install it with Homebrew:
      </BlogP>
      <BlogCode>{`brew install ollama
ollama serve`}</BlogCode>
      <BlogP>
        Once running, download the models you need. For tool calling
        you need models with good function support:
      </BlogP>
      <BlogCode>{`ollama pull llama3.2:3b
ollama pull qwen2.5-coder:7b
ollama pull mistral
ollama pull deepseek-coder`}</BlogCode>
      <BlogP>
        You can verify it works with <code>ollama list</code>. Ollama
        exposes an API at <code>http://localhost:11434</code> compatible with
        OpenAI.
      </BlogP>

      <BlogH2>OpenCode + Ollama</BlogH2>
      <BlogP>
        OpenCode supports Ollama as a native provider. Configure it in your
        <code>opencode.json</code> along with the MCPs you want to use:
      </BlogP>
      <BlogCode>{`{
  "provider": "ollama",
  "model": "qwen2.5-coder:7b",
  "ollamaUrl": "http://localhost:11434",
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
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
      <BlogP>
        With this, OpenCode uses the local model for all conversations and
        the MCPs give it access to the file system and GitHub. Every time
        the AI needs to read a file or list a directory, it will
        automatically call the filesystem server.
      </BlogP>

      <BlogH2>Continue.dev + Ollama</BlogH2>
      <BlogP>
        Continue.dev is the open source assistant for VS Code and JetBrains.
        It supports Ollama as a backend and MCPs as a tool source. The
        configuration goes in <code>.continuerc.json</code> or in the settings UI:
      </BlogP>
      <BlogCode>{`{
  "models": [
    {
      "title": "Qwen Coder Local",
      "provider": "ollama",
      "model": "qwen2.5-coder:7b",
      "apiBase": "http://localhost:11434"
    }
  ],
  "experimental": {
    "mcpServers": {
      "filesystem": {
        "command": "npx",
        "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
      },
      "playwright": {
        "command": "npx",
        "args": ["-y", "@anthropic/mcp-server-playwright"]
      }
    }
  },
  "tabAutocompleteModel": {
    "title": "Starcoder Local",
    "provider": "ollama",
    "model": "starcoder2:3b"
  }
}`}</BlogCode>
      <BlogP>
        With this setup, the local Qwen model provides autocomplete, contextual
        chat, and the ability to run MCP tools directly from
        the editor.
      </BlogP>

      <BlogH2>Cline + Ollama</BlogH2>
      <BlogP>
        Cline is the VS Code extension that turns the editor into an autonomous
        agent. It uses the <code>cline_mcp_settings.json</code> configuration:
      </BlogP>
      <BlogCode>{`{
  "apiProvider": "ollama",
  "model": "qwen2.5-coder:7b",
  "ollamaBaseUrl": "http://localhost:11434",
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "."]
    },
    "terminal": {
      "command": "npx",
      "args": ["-y", "@nicholasgriffintn/mcp-terminal"]
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
      <BlogP>
        Cline executes multi-step tasks: reads files, runs commands, creates
        PRs. With Ollama as the backend everything happens locally.
      </BlogP>

      <BlogH2>Practical example</BlogH2>
      <BlogP>
        Imagine you just cloned a project and want to understand its
        structure without reading file by file. With Ollama + Filesystem MCP
        you can ask the AI:
      </BlogP>
      <BlogCode>{`"Analyze this project's structure.
First list the root files, then read the package.json
and the README. Then tell me what the project is about,
what stack it uses, and how to run it."`}</BlogCode>
      <BlogP>The agent will automatically do this:</BlogP>
      <BlogUl>
        <BlogLi>
          Call <code>list_directory</code> to see the project root
        </BlogLi>
        <BlogLi>
          Call <code>read_file</code> on <code>package.json</code> and
          <code>README.md</code>
        </BlogLi>
        <BlogLi>Analyze the content with the local model</BlogLi>
        <BlogLi>
          Return a complete summary with stack, scripts, and dependencies
        </BlogLi>
      </BlogUl>
      <BlogP>
        All of this without sending a single line of your code to the cloud. The
        local model processes the files that the MCP filesystem server delivers.
      </BlogP>

      <BlogH2>Which models work best</BlogH2>
      <BlogP>
        Not all local models handle tool calling well. These are the
        ones that work best with MCP:
      </BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Qwen2.5-Coder (7B)</strong> — the best for tool calling
          locally. Follows instructions precisely, understands when to call
          tools, and generates quality code. The most balanced option
        </BlogLi>
        <BlogLi>
          <strong>Llama 3.2 (3B)</strong> — lightweight and fast. Works well on
          CPU. Basic but effective tool calling for simple tasks like reading
          files or searching text
        </BlogLi>
        <BlogLi>
          <strong>DeepSeek Coder (6.7B)</strong> — excellent for code. Its
          technical responses are detailed, though it sometimes loses precision in
          multi-tool calls
        </BlogLi>
        <BlogLi>
          <strong>Mistral (7B)</strong> — fast and consistent. Good tool calling
          support, ideal as a versatile option when switching between
          code and general tasks
        </BlogLi>
      </BlogUl>

      <BlogH2>Limitations</BlogH2>
      <BlogUl>
        <BlogLi>
          <strong>Tool calling consistency</strong> — local models don't
          always decide to call the right tool. Sometimes they ignore an
          available MCP or call the wrong tool. Cloud models
          (GPT-4o, Claude) are more reliable in this aspect
        </BlogLi>
        <BlogLi>
          <strong>Context window</strong> — local models have
          smaller contexts (4K-32K tokens). If the MCP returns a lot of
          information, the model may forget previous instructions
        </BlogLi>
        <BlogLi>
          <strong>Speed</strong> — without a dedicated GPU, 7B
          models can take seconds to respond. In the cloud you get responses in
          milliseconds. For long tasks with multiple MCP calls the
          difference is noticeable
        </BlogLi>
        <BlogLi>
          <strong>Small models</strong> — 3B or 7B models understand
          simple tools but get confused with complex workflows
          requiring multiple chained tools
        </BlogLi>
      </BlogUl>

      <BlogCallout type="tip">
        <strong>Recommendation:</strong> start with
        <strong>Qwen2.5-Coder:7B</strong> as your main model. If your machine
        is modest, use <strong>Llama 3.2:3B</strong> for quick tasks and
        switch to Qwen when you need precision. For complex tool calling,
        combine it with a cloud model as a fallback.
      </BlogCallout>
    </article>
  );
}
