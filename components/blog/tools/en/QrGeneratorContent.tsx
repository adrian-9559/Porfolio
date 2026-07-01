"use client";
import { useState } from "react";

export default function QrGeneratorContent() {
  const [text, setText] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [copied, setCopied] = useState(false);

  const generate = () => {
    if (!text.trim()) return;
    const encoded = encodeURIComponent(text.trim());

    setQrUrl(
      `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encoded}`,
    );
  };

  const download = async () => {
    if (!qrUrl) return;
    const resp = await fetch(qrUrl);
    const blob = await resp.blob();
    const a = document.createElement("a");

    a.href = URL.createObjectURL(blob);
    a.download = "qrcode.png";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const copyImg = () => {
    navigator.clipboard.writeText(qrUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
            Tool
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            Free to use
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          QR Generator
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          Generate QR codes from text or URLs. Download as PNG or copy the
          image.
        </p>
      </div>

      <div className="space-y-4">
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
            Text or URL
          </p>
          <textarea
            className="w-full h-24 p-3 text-sm font-mono rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white resize-none focus:outline-none focus:border-amber-400 dark:focus:border-amber-600 transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
            placeholder="https://yourdomain.com"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
        </div>

        <button
          className="px-4 py-2 rounded-lg text-sm font-semibold bg-amber-500 hover:bg-amber-600 text-white transition-colors disabled:opacity-40"
          disabled={!text.trim()}
          onClick={generate}
        >
          Generate QR
        </button>

        {qrUrl && (
          <div className="space-y-3">
            <div className="flex items-center gap-2 p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 w-fit">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img alt="QR Code" className="w-48 h-48" src={qrUrl} />
            </div>
            <div className="flex items-center gap-2">
              <button
                className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-black/8 dark:bg-white/8 text-[#1d1d1f] dark:text-white hover:bg-black/12 dark:hover:bg-white/12 transition-colors"
                onClick={download}
              >
                Download PNG
              </button>
              <button
                className="px-3 py-1.5 rounded-lg text-xs font-semibold text-amber-600 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors"
                onClick={copyImg}
              >
                {copied ? "Copied!" : "Copy image URL"}
              </button>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
