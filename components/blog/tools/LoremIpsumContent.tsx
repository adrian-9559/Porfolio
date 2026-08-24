"use client";
import { useState, useCallback } from "react";
import { useT } from "@/hooks/useT";

const WORD_BANK = [
  "lorem", "ipsum", "dolor", "sit", "amet", "consectetur", "adipiscing", "elit",
  "sed", "do", "eiusmod", "tempor", "incididunt", "ut", "labore", "et", "dolore",
  "magna", "aliqua", "enim", "ad", "minim", "veniam", "quis", "nostrud",
  "exercitation", "ullamco", "laboris", "nisi", "aliquip", "ex", "ea", "commodo",
  "consequat", "duis", "aute", "irure", "in", "reprehenderit", "voluptate",
  "velit", "esse", "cillum", "fugiat", "nulla", "pariatur", "excepteur", "sint",
  "occaecat", "cupidatat", "non", "proident", "sunt", "culpa", "qui", "officia",
  "deserunt", "mollit", "anim", "id", "est", "laborum", "perspiciatis", "unde",
  "omnis", "iste", "natus", "error", "voluptatem", "accusantium", "doloremque",
  "laudantium", "totam", "rem", "aperiam", "eaque", "ipsa", "quae", "ab", "illo",
  "inventore", "veritatis", "quasi", "architecto", "beatae", "vitae", "dicta",
  "explicabo", "nemo", "ipsam", "quia", "voluptas", "aspernatur", "aut", "odit",
  "fugit", "consequuntur", "magni", "dolores", "ratione", "sequi", "nesciunt",
  "neque", "porro", "quisquam", "nihil", "impedit", "quo", "minus", "maxime",
  "placeat", "facere", "possimus", "omnis", "repellat", "incidunt", "tempore",
  "corrupti", "eos", "ratione", "tenetur", "sapiente", "delectus", "reiciendis",
  "voluptatibus", "maiores", "alias", "perferendis", "doloribus", "asperiores",
  "reprehenderit",
];

function pickRandom(count: number): string[] {
  const words: string[] = [];
  for (let i = 0; i < count; i++) {
    words.push(WORD_BANK[Math.floor(Math.random() * WORD_BANK.length)]);
  }
  return words;
}

function generateParagraph(wordCount: number, startIndex: number): string {
  const words: string[] = [];
  const capitalized = WORD_BANK.filter((w) => /^[A-Z]/.test(w)).length > 0
    ? WORD_BANK
    : WORD_BANK.map((w, i) => (i === 0 ? w.charAt(0).toUpperCase() + w.slice(1) : w));

  for (let i = 0; i < wordCount; i++) {
    if (i === 0) {
      words.push(capitalized[(startIndex + i) % capitalized.length]);
    } else {
      words.push(WORD_BANK[(startIndex + i) % WORD_BANK.length]);
    }
  }

  words[words.length - 1] = words[words.length - 1].replace(/.$/, (ch) => ch === "." ? ch : ".");

  return words.join(" ");
}

export default function LoremIpsumContent() {
  const { t } = useT();
  const [paragraphs, setParagraphs] = useState(3);
  const [wordsPerParagraph, setWordsPerParagraph] = useState(40);
  const [includeHtml, setIncludeHtml] = useState(false);
  const [startWithLorem, setStartWithLorem] = useState(true);
  const [copied, setCopied] = useState(false);
  const [key, setKey] = useState(0);

  const generate = useCallback((): string => {
    const result: string[] = [];
    for (let i = 0; i < paragraphs; i++) {
      let text = generateParagraph(wordsPerParagraph, i * 7);
      if (i === 0 && startWithLorem) {
        const parts = text.split(" ");
        parts[0] = "Lorem";
        if (parts[1]) parts[1] = "ipsum";
        if (parts[2]) parts[2] = "dolor";
        if (parts[3]) parts[3] = "sit";
        if (parts[4]) parts[4] = "amet.";
        text = parts.join(" ");
      }
      if (includeHtml) {
        text = `<p>${text}</p>`;
      }
      result.push(text);
    }

    return includeHtml ? result.join("\n\n") : result.join("\n\n");
  }, [paragraphs, wordsPerParagraph, includeHtml, startWithLorem]);

  const output = generate();
  const wordCount = output.replace(/<[^>]*>/g, "").split(/\s+/).filter(Boolean).length;

  const copy = () => {
    navigator.clipboard.writeText(output);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const regenerate = () => setKey((k) => k + 1);

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
            {t("blog.loremIpsum.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.loremIpsum.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.loremIpsum.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.loremIpsum.desc")}
        </p>
      </div>

      <div className="space-y-4" key={key}>
        {/* Options */}
        <div className="flex flex-wrap items-end gap-4">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              {t("blog.loremIpsum.paragraphs")}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={1}
                max={10}
                value={paragraphs}
                onChange={(e) => setParagraphs(Number(e.target.value))}
                className="w-24 accent-amber-500"
              />
              <span className="text-sm font-mono text-[#1d1d1f] dark:text-white w-6 text-center">{paragraphs}</span>
            </div>
          </div>
          <div className="space-y-1">
            <label className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              {t("blog.loremIpsum.wordsPerParagraph")}
            </label>
            <div className="flex items-center gap-2">
              <input
                type="range"
                min={10}
                max={100}
                step={5}
                value={wordsPerParagraph}
                onChange={(e) => setWordsPerParagraph(Number(e.target.value))}
                className="w-24 accent-amber-500"
              />
              <span className="text-sm font-mono text-[#1d1d1f] dark:text-white w-8 text-center">{wordsPerParagraph}</span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={includeHtml}
                onChange={(e) => setIncludeHtml(e.target.checked)}
                className="rounded accent-amber-500"
              />
              <span className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                {t("blog.loremIpsum.includeHtml")}
              </span>
            </label>
            <label className="flex items-center gap-1.5 cursor-pointer">
              <input
                type="checkbox"
                checked={startWithLorem}
                onChange={(e) => setStartWithLorem(e.target.checked)}
                className="rounded accent-amber-500"
              />
              <span className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                {t("blog.loremIpsum.startLorem")}
              </span>
            </label>
          </div>
        </div>

        {/* Output */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              {t("blog.loremIpsum.result")}
            </p>
            <div className="flex items-center gap-3">
              <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
                {wordCount} {t("blog.loremIpsum.words")}
              </span>
              <button
                className="text-xs text-amber-600 dark:text-amber-400 hover:underline"
                onClick={regenerate}
              >
                {t("blog.loremIpsum.regenerate")}
              </button>
              <button
                className="text-xs text-amber-600 dark:text-amber-400 hover:underline"
                onClick={copy}
              >
                {copied ? t("blog.loremIpsum.copied") : t("blog.loremIpsum.copy")}
              </button>
            </div>
          </div>
          <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-sm leading-relaxed text-[#1d1d1f] dark:text-white max-h-96 overflow-auto whitespace-pre-wrap">
            {output}
          </div>
        </div>
      </div>
    </article>
  );
}
