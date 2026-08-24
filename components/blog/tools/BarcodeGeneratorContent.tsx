"use client";
import { useState, useRef, useCallback } from "react";
import { useT } from "@/hooks/useT";

type BarcodeFormat = "code128" | "code39" | "ean13";

const FORMAT_LABELS: Record<BarcodeFormat, string> = {
  code128: "Code 128",
  code39: "Code 39",
  ean13: "EAN-13",
};

const CODE128_PATTERNS: Record<number, string> = {
  0: "11011001100", 1: "11001101100", 2: "11001100110", 3: "10010011000",
  4: "10010001100", 5: "10001001100", 6: "10011001000", 7: "10011000100",
  8: "10001100100", 9: "11001001000", 10: "11001000100", 11: "11000100100",
  12: "10110011100", 13: "10011011100", 14: "10011001110", 15: "10111001100",
  16: "10011101100", 17: "10011100110", 18: "11001110010", 19: "11001011100",
  20: "11001001110", 21: "11011100100", 22: "11001110100", 23: "11101101110",
  24: "11101001100", 25: "11100101100", 26: "11100100110", 27: "11101100100",
  28: "11100110100", 29: "11100110010", 30: "11011011000", 31: "11011000110",
  32: "11000110110", 33: "10100011000", 34: "10001011000", 35: "10001000110",
  36: "10110001000", 37: "10001101000", 38: "10001100010", 39: "11010001000",
  40: "11000101000", 41: "11000100010", 42: "10110111000", 43: "10110001110",
  44: "10001101110", 45: "10111011000", 46: "10111000110", 47: "10001110110",
  48: "11101110110", 49: "11010001110", 50: "11000101110", 51: "11011101000",
  52: "11011100010", 53: "11011101110", 54: "11101011000", 55: "11101000110",
  56: "11100010110", 57: "11101101000", 58: "11101100010", 59: "11100011010",
  60: "11101111010", 61: "11001000010", 62: "11110001010", 63: "10100110000",
  64: "10100001100", 65: "10010110000", 66: "10010000110", 67: "10000101100",
  68: "10000100110", 69: "10110010000", 70: "10110000100", 71: "10011010000",
  72: "10011000010", 73: "10000110100", 74: "10000110010", 75: "11000010010",
  76: "11001010000", 77: "11110111010", 78: "11000010100", 79: "10001111010",
  80: "10100111100", 81: "10010111100", 82: "10010011110", 83: "10111100100",
  84: "10011110100", 85: "10011110010", 86: "11110100100", 87: "11110010100",
  88: "11110010010", 89: "11011011110", 90: "11011110110", 91: "11110110110",
  92: "10101111000", 93: "10100011110", 94: "10001011110", 95: "10111101000",
  96: "10111100010", 97: "11110101000", 98: "11110100010", 99: "10111011110",
  100: "10111101110", 101: "11101011110", 102: "11110101110", 103: "11010000100",
  104: "11010010000", 105: "11010011100", 106: "11000111010",
};

const CODE128_START_B = 104;
const CODE128_STOP = 106;

function code128Encode(text: string): string {
  if (!text) return "";
  let checksum = CODE128_START_B;
  let bits = CODE128_PATTERNS[CODE128_START_B];

  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i) - 32;
    if (code < 0 || code > 95) continue;
    checksum += code * (i + 1);
    bits += CODE128_PATTERNS[code];
  }

  checksum = checksum % 103;
  bits += CODE128_PATTERNS[checksum];
  bits += CODE128_PATTERNS[CODE128_STOP];

  return bits;
}

const CODE39_CHARS = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ-. $/+%*";
const CODE39_PATTERNS: Record<string, string> = {
  "0": "nnnwwnwnn", "1": "wnnwnnnnw", "2": "nnwwnnnnw", "3": "wnwwnnnnn",
  "4": "nnnwwnnnw", "5": "wnnwwnnnn", "6": "nnwwnwnnn", "7": "nnnwnnwnw",
  "8": "wnnwnnwnn", "9": "nnwwnnwnn", "A": "wnnnnwnnw", "B": "nnwnnwnnw",
  "C": "wnwnnwnnn", "D": "nnnnwwnnw", "E": "wnnnwwnnn", "F": "nnwnwwnnn",
  "G": "nnnnnwwnw", "H": "wnnnnwwnn", "I": "nnwnnwwnn", "J": "nnnnwwwnn",
  "K": "wnnnnnnww", "L": "nnwnnnnww", "M": "wnwnnnnwn", "N": "nnnnwnnww",
  "O": "wnnnwnnwn", "P": "nnwnwnnwn", "Q": "nnnnnnwww", "R": "wnnnnnwwn",
  "S": "nnwnnnwwn", "T": "nnnnwnwwn", "U": "wwnnnnnnn", "V": "nwwnnnnnn",
  "W": "wwwnnnnnn", "X": "nwnnwnnnn", "Y": "wwnnwnnnn", "Z": "nwwnwnnnn",
  "-": "nwnnnnwnn", ".": "wwnnnnnnn", " ": "nwwnnnnnn", "$": "nwnwnwnnn",
  "/": "nwnnwnwnn", "+": "nwnnnnwnn", "%": "nnnwnwnwnn", "*": "nwnnwnwnn",
};

function code39Encode(text: string): string {
  const upper = text.toUpperCase();
  let bits = "";
  for (const ch of `*${upper}*`) {
    const pattern = CODE39_PATTERNS[ch];
    if (!pattern) continue;
    for (const c of pattern) {
      if (c === "w") bits += "111";
      else bits += "1";
      bits += "0";
    }
    bits += "0";
  }

  return bits;
}

function ean13Generate(text: string): string {
  const digits = text.replace(/\D/g, "").slice(0, 12);
  if (digits.length < 12) {
    const padded = digits.padEnd(12, "0");
    return ean13Encode(padded);
  }

  return ean13Encode(digits);
}

const EAN13_L = [
  "0001101", "0011001", "0010011", "0111101", "0100011",
  "0110001", "0101111", "0111011", "0110111", "0001011",
];

const EAN13_G = [
  "0100111", "0110011", "0011011", "0100001", "0011101",
  "0111001", "0000101", "0010001", "0001001", "0010111",
];

const EAN13_R = [
  "1110010", "1100110", "1101100", "1000010", "1011100",
  "1001110", "1010000", "1000100", "1001000", "1110100",
];

const EAN13_PARITY = [
  [0, 0, 0, 0, 0, 0], [0, 0, 1, 0, 1, 1], [0, 0, 1, 1, 0, 1],
  [0, 0, 1, 1, 1, 0], [0, 1, 0, 0, 1, 1], [0, 1, 1, 0, 0, 1],
  [0, 1, 1, 1, 0, 0], [0, 1, 0, 1, 0, 1], [0, 1, 0, 1, 1, 0],
  [0, 1, 1, 0, 1, 0], [0, 0, 0, 1, 0, 1], [0, 0, 1, 0, 1, 0],
  [0, 0, 1, 1, 0, 0], [0, 0, 0, 1, 1, 0], [0, 0, 1, 0, 0, 0],
  [0, 0, 0, 0, 1, 0], [0, 0, 1, 1, 1, 0], [0, 0, 0, 0, 0, 0],
  [0, 0, 1, 0, 0, 0], [0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 1, 0],
];

function ean13Encode(digits: string): string {
  const d = digits.split("").map(Number);
  const first = d[0];
  const parity = EAN13_PARITY[first] || EAN13_PARITY[0];

  let bits = "101";
  for (let i = 0; i < 6; i++) {
    const val = d[i + 1];
    bits += parity[i] === 0 ? EAN13_L[val] : EAN13_G[val];
  }
  bits += "01010";
  for (let i = 0; i < 6; i++) {
    bits += EAN13_R[d[i + 7]];
  }
  bits += "101";

  return bits;
}

function renderBarcode(canvas: HTMLCanvasElement, bits: string, width: number, height: number) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;
  canvas.width = width;
  canvas.height = height;
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);
  ctx.fillStyle = "black";
  const barWidth = width / bits.length;
  for (let i = 0; i < bits.length; i++) {
    if (bits[i] === "1") {
      ctx.fillRect(i * barWidth, 0, barWidth + 0.5, height);
    }
  }
}

export default function BarcodeGeneratorContent() {
  const { t } = useT();
  const [input, setInput] = useState("");
  const [format, setFormat] = useState<BarcodeFormat>("code128");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [generated, setGenerated] = useState(false);
  const [error, setError] = useState("");

  const generate = useCallback(() => {
    if (!input.trim()) {
      setError(t("blog.barcodeGenerator.errorEmpty"));

      return;
    }
    if (format === "ean13" && !/^\d{12,13}$/.test(input.replace(/\D/g, ""))) {
      setError(t("blog.barcodeGenerator.errorEan13"));

      return;
    }
    setError("");
    let bits = "";
    if (format === "code128") bits = code128Encode(input);
    else if (format === "code39") bits = code39Encode(input);
    else bits = ean13Generate(input);

    const canvas = canvasRef.current;
    if (canvas) {
      renderBarcode(canvas, bits, Math.max(bits.length * 2, 400), 120);
      setGenerated(true);
    }
  }, [input, format, t]);

  const downloadPng = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement("a");
    link.download = `barcode-${format}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
            {t("blog.barcodeGenerator.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.barcodeGenerator.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.barcodeGenerator.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.barcodeGenerator.desc")}
        </p>
      </div>

      <div className="space-y-4">
        {/* Format selector */}
        <div className="flex gap-1 p-1 rounded-xl bg-black/[0.04] dark:bg-white/[0.04]">
          {(Object.keys(FORMAT_LABELS) as BarcodeFormat[]).map((f) => (
            <button
              key={f}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors ${format === f ? "bg-white dark:bg-[#1c1c22] text-amber-600 dark:text-amber-400 shadow-sm" : "text-[#6e6e73] dark:text-[#86868b] hover:text-[#1d1d1f] dark:hover:text-white"}`}
              onClick={() => setFormat(f)}
            >
              {FORMAT_LABELS[f]}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="space-y-1.5">
          <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
            {t("blog.barcodeGenerator.data")}
          </p>
          <div className="flex gap-2">
            <input
              className="flex-1 px-3 py-2 text-sm font-mono rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white focus:outline-none focus:border-amber-400 dark:focus:border-amber-600 transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
              placeholder={format === "ean13" ? "590123412345" : "Hello World"}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && generate()}
            />
            <button
              className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold transition-colors"
              onClick={generate}
            >
              {t("blog.barcodeGenerator.generate")}
            </button>
          </div>
          {error && (
            <p className="text-xs text-red-600 dark:text-red-400">⚠️ {error}</p>
          )}
        </div>

        {/* Barcode output */}
        {generated && (
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                {t("blog.barcodeGenerator.barcode")}
              </p>
              <button
                className="text-xs text-amber-600 dark:text-amber-400 hover:underline"
                onClick={downloadPng}
              >
                {t("blog.barcodeGenerator.download")}
              </button>
            </div>
            <div className="p-4 rounded-xl bg-white border border-black/8 dark:border-white/8 flex justify-center">
              <canvas ref={canvasRef} className="max-w-full" />
            </div>
            <p className="text-xs text-center text-[#6e6e73] dark:text-[#86868b] font-mono">
              {t("blog.barcodeGenerator.encodedData")}: {input}
            </p>
          </div>
        )}
      </div>
    </article>
  );
}
