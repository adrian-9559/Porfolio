"use client";
import {
  BlogCallout,
  BlogCode,
  BlogH2,
  BlogH3,
  BlogLi,
  BlogP,
  BlogUl,
} from "@/components/blog/shared";

export default function RagMcpContent() {
  return (
    <article className="max-w-3xl">
      <div className="flex items-center gap-2 mb-8">
        <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-sky-50 dark:bg-sky-950/40 text-sky-700 dark:text-sky-400 border border-sky-200 dark:border-sky-800/50">
          Tutorial
        </span>
        <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
          10 min
        </span>
      </div>

      <h1
        className="text-3xl md:text-4xl font-bold text-[#1d1d1f] dark:text-white mb-4"
        style={{ letterSpacing: "-0.03em" }}
      >
        RAG with MCP: Information Retrieval for Your AI
      </h1>
      <p className="text-base md:text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed mb-8">
        Learn how to build a Retrieval Augmented Generation pipeline using
        MCP servers as data sources, memory, and context. Your AI will stop
        hallucinating and start answering with real information.
      </p>

      <div className="h-px bg-black/8 dark:bg-white/8 mb-8" />

      <BlogH2>What is RAG?</BlogH2>
      <BlogP>
        <strong>Retrieval Augmented Generation (RAG)</strong> is an
        architecture that combines information retrieval with text
        generation. Instead of a language model answering solely from
        its internal knowledge (with a cutoff date and prone to hallucinations),
        RAG first queries an external source — documents, databases,
        web — and then generates the answer using that retrieved context.
      </BlogP>
      <BlogP>A typical RAG pipeline has four components:</BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Ingestion</strong> — read source documents and extract their
          content
        </BlogLi>
        <BlogLi>
          <strong>Storage</strong> — save the processed information in
          a retrievable format
        </BlogLi>
        <BlogLi>
          <strong>Retrieval</strong> — search for the most relevant fragments
          for a query
        </BlogLi>
        <BlogLi>
          <strong>Generation</strong> — the language model responds using the
          retrieved context
        </BlogLi>
      </BlogUl>
      <BlogP>
        MCP fits naturally here: each pipeline phase can be
        covered by one or more MCP servers, without needing
        additional infrastructure.
      </BlogP>

      <BlogH2>RAG Components as MCPs</BlogH2>
      <BlogP>
        The MCP ecosystem includes servers that cover each stage of the RAG
        pipeline. These are the most relevant:
      </BlogP>

      <BlogH3>Filesystem MCP</BlogH3>
      <BlogP>
        The <code>@modelcontextprotocol/server-filesystem</code> server exposes
        tools for reading files from disk. It is your gateway for
        ingestion: technical documentation, manuals, markdown files, source
        code. With tools like <code>read_file</code>,{" "}
        <code>list_directory</code> and <code>search_files</code>, the AI can
        explore and extract content from any project folder.
      </BlogP>

      <BlogH3>Fetch MCP</BlogH3>
      <BlogP>
        The <code>@modelcontextprotocol/server-fetch</code> server allows the
        AI to download web content. Ideal for fetching online documentation,
        articles, or public APIs. The <code>fetch</code> tool receives a
        URL and returns the content as plain text, ready to be processed.
      </BlogP>

      <BlogH3>Memory MCP</BlogH3>
      <BlogP>
        The <code>@modelcontextprotocol/server-memory</code> server provides
        a persistent knowledge base based on entity graphs. With
        tools like <code>add_knowledge</code>, <code>search_knowledge</code> and{" "}
        <code>get_related_knowledge</code>, the AI can store facts,
        concepts, and relationships across sessions. It is the equivalent to a
        lightweight vector memory, but without needing embeddings or specialized
        databases.
      </BlogP>

      <BlogH3>Vector servers (optional)</BlogH3>
      <BlogP>
        For large-scale semantic search, there are MCP servers that
        connect to vector databases like Supabase (pgvector), Pinecone,
        or Weaviate. They are not part of the MCP standard, but the community has
        implemented them as wrappers. If your document volume exceeds a
        few megabytes, it is worth considering this option.
      </BlogP>

      <BlogH2>Ingestion Pipeline</BlogH2>
      <BlogP>
        Ingestion is the process of reading documents and converting them into
        structured knowledge that the AI can retrieve later. With MCP,
        this pipeline runs within the conversation:
      </BlogP>

      <BlogH3>1. Read documents with Filesystem MCP</BlogH3>
      <BlogP>
        The AI uses <code>list_directory</code> to explore the document
        folder and <code>read_file</code> to read each relevant file.
        It can filter by extension, name, or content with{" "}
        <code>search_files</code>.
      </BlogP>
      <BlogCode>{`// The AI internally executes something like:
list_directory("./docs/api/")
→ ["endpoints.md", "auth.md", "errors.md"]

read_file("./docs/api/endpoints.md")
→ "# Endpoints\\n## GET /users\\n..."`}</BlogCode>

      <BlogH3>2. Extract relevant chunks</BlogH3>
      <BlogP>
        The AI analyzes the content and extracts meaningful fragments:
        endpoint definitions, parameter descriptions, usage examples.
        Each fragment should be atomic — one idea per chunk — so
        retrieval is precise.
      </BlogP>

      <BlogH3>3. Store in Memory MCP</BlogH3>
      <BlogP>
        Each fragment is saved as a knowledge node with{" "}
        <code>add_knowledge</code>. You can include metadata like the source,
        the type of information, or tags to facilitate later filtering.
      </BlogP>
      <BlogCode>{`// Each chunk becomes a knowledge node
add_knowledge({
  fact: "GET /users returns the paginated list of users",
  source: "./docs/api/endpoints.md",
  tags: ["endpoint", "users", "GET"]
})`}</BlogCode>

      <BlogCallout type="tip">
        Ingestion does not have to be massive. You can do it incrementally: as
        the AI needs information from a file, it reads it, processes it, and
        saves it. This reduces token costs and avoids processing documents that
        are never queried.
      </BlogCallout>

      <BlogH2>Query Pipeline</BlogH2>
      <BlogP>
        When a user asks a question, the AI follows this flow:
      </BlogP>
      <BlogUl>
        <BlogLi>
          <strong>1. Interpret</strong> — the AI analyzes the question and extracts
          key terms
        </BlogLi>
        <BlogLi>
          <strong>2. Search memory</strong> — uses{" "}
          <code>search_knowledge</code> in Memory MCP to find relevant
          facts
        </BlogLi>
        <BlogLi>
          <strong>3. Supplement</strong> — if memory does not have enough
          context, read files directly with Filesystem MCP or fetch
        </BlogLi>
        <BlogLi>
          <strong>4. Combine</strong> — integrates the retrieved context with
          the original question
        </BlogLi>
        <BlogLi>
          <strong>5. Respond</strong> — generates the answer citing the
          sources
        </BlogLi>
      </BlogUl>
      <BlogP>
        The key to RAG with MCP is that retrieval and generation happen
        in the same conversation turn. There is no external embeddings
        system or intermediate vector database — everything lives in the
        MCP servers that the assistant already has configured.
      </BlogP>

      <BlogH2>Practical Example: Documentation Assistant</BlogH2>
      <BlogP>
        Let's build an assistant that analyzes a REST API's documentation and
        answers questions about its endpoints. You only need two MCP
        servers.
      </BlogP>

      <BlogH3>Configure Filesystem MCP</BlogH3>
      <BlogCode>{`{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-filesystem", "./docs"]
    }
  }
}`}</BlogCode>

      <BlogH3>Configure Memory MCP</BlogH3>
      <BlogCode>{`{
  "mcpServers": {
    "filesystem": { ... },
    "memory": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-memory"]
    }
  }
}`}</BlogCode>

      <BlogH3>Workflow</BlogH3>
      <BlogP>Once configured, you can ask the AI:</BlogP>
      <BlogCode>{`"Analyze my API documentation in ./docs and answer questions about the endpoints."`}</BlogCode>
      <BlogP>The AI will automatically do the following:</BlogP>
      <BlogUl>
        <BlogLi>
          Explore <code>./docs</code> with <code>list_directory</code>
        </BlogLi>
        <BlogLi>
          Read each markdown file with <code>read_file</code>
        </BlogLi>
        <BlogLi>
          Extract facts (endpoints, parameters, examples) and save them with{" "}
          <code>add_knowledge</code>
        </BlogLi>
        <BlogLi>
          On future queries, use <code>search_knowledge</code> to
          retrieve the context before answering
        </BlogLi>
      </BlogUl>
      <BlogP>For example, after ingestion you can ask:</BlogP>
      <BlogCode>{`"What parameters does the POST /users endpoint accept?"`}</BlogCode>
      <BlogP>
        The AI will search its MCP memory, find the relevant chunk, and
        respond with the exact information from the documentation, including the
        source.
      </BlogP>

      <BlogCallout type="info">
        MCP memory persists between sessions. Once ingestion is done, the
        knowledge is available even if you close and reopen the
        assistant. This makes MCP a permanent knowledge base for your team.
      </BlogCallout>

      <BlogH2>Advanced Strategies</BlogH2>

      <BlogH3>Semantic vs Token Chunking</BlogH3>
      <BlogP>
        Chunking determines how you split documents into retrievable
        fragments. The <strong>token-based</strong> approach cuts every N
        tokens, it's simple but can split an idea in half.{" "}
        <strong>Semantic chunking</strong> respects the natural boundaries
        of the content: paragraphs, sections, code blocks. Memory MCP works
        best with semantic chunks because each knowledge node represents
        a complete and coherent fact.
      </BlogP>

      <BlogH3>Metadata Tagging for Filtering</BlogH3>
      <BlogP>
        When storing knowledge in Memory MCP, tags are your most powerful
        filtering tool. You can tag chunks by:
      </BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Information type:</strong> "endpoint", "schema", "example",
          "error"
        </BlogLi>
        <BlogLi>
          <strong>Module or area:</strong> "auth", "payments", "users"
        </BlogLi>
        <BlogLi>
          <strong>Priority or version:</strong> "v2", "deprecated", "critical"
        </BlogLi>
      </BlogUl>
      <BlogP>
        When the AI searches, it can include tags in the query to narrow
        results and improve accuracy.
      </BlogP>

      <BlogH3>Incremental Memory Update</BlogH3>
      <BlogP>
        Documentation changes. With MCP you can keep memory updated
        without re-ingesting everything: the AI reads only the modified files,
        deletes obsolete knowledge nodes, and adds new ones. You can even
        request a periodic verification routine.
      </BlogP>

      <BlogH2>Limitations</BlogH2>
      <BlogP>
        RAG with MCP is powerful for small teams and technical
        documentation, but it has limitations worth knowing:
      </BlogP>
      <BlogUl>
        <BlogLi>
          <strong>Model context window</strong> — although Memory MCP
          stores many facts, the AI can only retrieve a few in each
          query. The limit is the context window of the model you are using.
        </BlogLi>
        <BlogLi>
          <strong>Token cost in large ingestion</strong> — if your
          documentation has hundreds of files, the initial ingestion can
          consume many tokens. Plan incremental ingestion to mitigate
          this cost.
        </BlogLi>
        <BlogLi>
          <strong>No native vector database in standard MCP</strong> —
          Memory MCP uses keyword and relationship-based search, not
          embeddings. For large-scale semantic search you will need an external
          vector server or a database like Supabase with pgvector.
        </BlogLi>
      </BlogUl>

      <BlogCallout type="done">
        RAG with MCP allows you to build an informed assistant on top of your own
        knowledge base without needing complex infrastructure. With
        Filesystem MCP for reading documents, Fetch MCP for web content, and
        Memory MCP as a persistent brain, your AI can answer accurately
        about any topic for which you have written documentation.
      </BlogCallout>
    </article>
  );
}
