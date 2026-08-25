"use client";
import { useState, useMemo } from "react";
import { useT } from "@/hooks/useT";
import { copyToClipboard } from "@/lib/clipboard";

function parseMarkdown(md: string): string {
  let html = md;

  // Code blocks (fenced)
  html = html.replace(/```(\w*)\n([\s\S]*?)```/g, (_, lang, code) => {
    const escaped = code
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    return `<pre class="bg-black/[0.06] dark:bg-white/[0.06] rounded-lg p-4 my-4 overflow-x-auto text-sm font-mono"><code class="text-[#1d1d1f] dark:text-white">${escaped}</code></pre>`;
  });

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="bg-black/[0.06] dark:bg-white/[0.06] px-1.5 py-0.5 rounded text-sm font-mono text-[#1d1d1f] dark:text-white">$1</code>');

  // Headers
  html = html.replace(/^######\s+(.+)$/gm, '<h6 class="text-base font-bold text-[#1d1d1f] dark:text-white mt-4 mb-2">$1</h6>');
  html = html.replace(/^#####\s+(.+)$/gm, '<h5 class="text-lg font-bold text-[#1d1d1f] dark:text-white mt-4 mb-2">$1</h5>');
  html = html.replace(/^####\s+(.+)$/gm, '<h4 class="text-xl font-bold text-[#1d1d1f] dark:text-white mt-5 mb-2">$1</h4>');
  html = html.replace(/^###\s+(.+)$/gm, '<h3 class="text-2xl font-bold text-[#1d1d1f] dark:text-white mt-6 mb-3">$1</h3>');
  html = html.replace(/^##\s+(.+)$/gm, '<h2 class="text-3xl font-bold text-[#1d1d1f] dark:text-white mt-8 mb-3">$1</h2>');
  html = html.replace(/^#\s+(.+)$/gm, '<h1 class="text-4xl font-bold text-[#1d1d1f] dark:text-white mt-8 mb-4">$1</h1>');

  // Bold and italic
  html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong class="font-bold text-[#1d1d1f] dark:text-white"><em class="italic">$1</em></strong>');
  html = html.replace(/\*\*(.+?)\*\*/g, '<strong class="font-bold text-[#1d1d1f] dark:text-white">$1</strong>');
  html = html.replace(/\*(.+?)\*/g, '<em class="italic text-[#1d1d1f] dark:text-white">$1</em>');

  // Links
  html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a class="text-indigo-600 dark:text-indigo-400 underline hover:text-indigo-700 dark:hover:text-indigo-300" href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

  // Images
  html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" class="max-w-full rounded-lg my-4" src="$2" />');

  // Blockquotes
  html = html.replace(/^>\s+(.+)$/gm, '<blockquote class="border-l-4 border-indigo-400 dark:border-indigo-600 pl-4 py-1 my-4 text-[#6e6e73] dark:text-[#86868b] italic">$1</blockquote>');

  // Horizontal rule
  html = html.replace(/^---$/gm, '<hr class="border-black/8 dark:border-white/8 my-6" />');

  // Unordered lists
  html = html.replace(/^[\-\*]\s+(.+)$/gm, '<li class="text-[#1d1d1f] dark:text-white ml-4 mb-1">• $1</li>');

  // Ordered lists
  html = html.replace(/^\d+\.\s+(.+)$/gm, '<li class="text-[#1d1d1f] dark:text-white ml-4 mb-1 list-decimal">$1</li>');

  // Paragraphs (lines that aren't already wrapped)
  html = html
    .split("\n\n")
    .map((block) => {
      const trimmed = block.trim();
      if (!trimmed) return "";
      if (
        trimmed.startsWith("<h") ||
        trimmed.startsWith("<pre") ||
        trimmed.startsWith("<blockquote") ||
        trimmed.startsWith("<hr") ||
        trimmed.startsWith("<img") ||
        trimmed.startsWith("<ul") ||
        trimmed.startsWith("<ol") ||
        trimmed.startsWith("<li")
      ) {
        return trimmed;
      }
      return `<p class="text-[#1d1d1f] dark:text-white mb-3 leading-relaxed">${trimmed}</p>`;
    })
    .join("\n");

  // Wrap adjacent li elements in ul
  html = html.replace(/((?:<li[^>]*>.*?<\/li>\n?)+)/g, '<ul class="list-disc pl-6 my-3 space-y-1">$1</ul>');

  return html;
}

export default function MarkdownHtmlContent() {
  const { t } = useT();
  const [markdown, setMarkdown] = useState(
    `# Hello World\n\nThis is a **bold** and *italic* text example.\n\n## Features\n\n- Item one\n- Item two\n- Item three\n\n> This is a blockquote\n\n\`\`\`js\nconsole.log("Hello!");\n\`\`\`\n\n[Visit GitHub](https://github.com)`,
  );
  const [copied, setCopied] = useState(false);

  const renderedHtml = useMemo(() => parseMarkdown(markdown), [markdown]);

  const copyHtml = async () => {
    if (await copyToClipboard(renderedHtml)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-400 border border-indigo-200 dark:border-indigo-800/50">
            {t("blog.markdownHtml.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.markdownHtml.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.markdownHtml.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.markdownHtml.desc")}
        </p>
      </div>

      <div className="space-y-4">
        {/* Split view */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Markdown input */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                Markdown
              </p>
            </div>
            <textarea
              className="w-full h-80 p-3 text-sm font-mono rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white resize-none focus:outline-none focus:border-indigo-400 dark:focus:border-indigo-600 transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
              placeholder={t("blog.markdownHtml.placeholder")}
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
            />
          </div>

          {/* HTML preview */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                HTML {t("blog.markdownHtml.preview")}
              </p>
              <button
                className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
                onClick={copyHtml}
              >
                {copied ? t("blog.markdownHtml.copied") : t("blog.markdownHtml.copyHtml")}
              </button>
            </div>
            <div
              className="h-80 p-4 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 overflow-y-auto prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: renderedHtml }}
            />
          </div>
        </div>

        {/* Full HTML output */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              {t("blog.markdownHtml.htmlOutput")}
            </p>
            <button
              className="text-xs text-indigo-600 dark:text-indigo-400 hover:underline"
              onClick={copyHtml}
            >
              {copied ? t("blog.markdownHtml.copied") : t("blog.markdownHtml.copyHtml")}
            </button>
          </div>
          <textarea
            readOnly
            className="w-full h-32 p-3 text-xs font-mono rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#6e6e73] dark:text-[#86868b] resize-none focus:outline-none"
            value={renderedHtml}
          />
        </div>

        {/* Tips */}
        <div className="p-4 rounded-xl bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-100 dark:border-indigo-900/50 space-y-2">
          <p className="text-xs font-semibold text-indigo-800 dark:text-indigo-300 uppercase tracking-wider">
            {t("blog.markdownHtml.syntaxGuide")}
          </p>
          <div className="grid grid-cols-2 gap-2 text-xs text-indigo-700 dark:text-indigo-400">
            <span><code className="font-mono"># Heading</code></span>
            <span><code className="font-mono">**bold**</code></span>
            <span><code className="font-mono">*italic*</code></span>
            <span><code className="font-mono">`code`</code></span>
            <span><code className="font-mono">[link](url)</code></span>
            <span><code className="font-mono">- list item</code></span>
            <span><code className="font-mono">{'>'} quote</code></span>
            <span><code className="font-mono">---  (hr)</code></span>
          </div>
        </div>
      </div>
    </article>
  );
}