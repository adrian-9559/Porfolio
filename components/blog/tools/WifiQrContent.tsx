"use client";
import { useState, useMemo } from "react";
import { useT } from "@/hooks/useT";
import { copyToClipboard } from "@/lib/clipboard";

type Encryption = "WPA" | "WEP" | "nopass";

interface WifiConfig {
  ssid: string;
  password: string;
  encryption: Encryption;
  hidden: boolean;
}

function generateWifiString(config: WifiConfig): string {
  const escape = (s: string) => s.replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/;/g, "\\;");
  const parts = [`T:${config.encryption}`];

  parts.push(`S:${escape(config.ssid)}`);
  if (config.encryption !== "nopass") {
    parts.push(`P:${escape(config.password)}`);
  }
  if (config.hidden) {
    parts.push("H:true");
  }

  return `WIFI:${parts.join(";")};;`;
}

export default function WifiQrContent() {
  const { t } = useT();
  const [config, setConfig] = useState<WifiConfig>({
    ssid: "",
    password: "",
    encryption: "WPA",
    hidden: false,
  });
  const [copied, setCopied] = useState(false);

  const wifiString = useMemo(() => {
    if (!config.ssid.trim()) return "";
    return generateWifiString(config);
  }, [config]);

  const copyString = async () => {
    if (!wifiString) return;
    if (await copyToClipboard(wifiString)) {
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  };

  const update = <K extends keyof WifiConfig>(key: K, value: WifiConfig[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <article className="max-w-3xl">
      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50">
            {t("blog.wifiQr.tool")}
          </span>
          <span className="text-xs text-[#aeaeb2] dark:text-[#636366]">
            {t("blog.wifiQr.freeToUse")}
          </span>
        </div>
        <h1
          className="text-4xl font-bold text-[#1d1d1f] dark:text-white"
          style={{ letterSpacing: "-0.02em" }}
        >
          {t("blog.wifiQr.title")}
        </h1>
        <p className="text-lg text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
          {t("blog.wifiQr.desc")}
        </p>
      </div>

      <div className="space-y-4">
        {/* Config form */}
        <div className="p-5 rounded-2xl bg-white dark:bg-[#111116] border border-black/8 dark:border-white/8 space-y-5">
          {/* SSID */}
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              {t("blog.wifiQr.ssid")}
            </p>
            <input
              className="w-full px-4 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white focus:outline-none focus:border-amber-400 dark:focus:border-amber-600 transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
              placeholder={t("blog.wifiQr.ssidPlaceholder")}
              value={config.ssid}
              onChange={(e) => update("ssid", e.target.value)}
            />
          </div>

          {/* Password */}
          {config.encryption !== "nopass" && (
            <div className="space-y-1.5">
              <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                {t("blog.wifiQr.password")}
              </p>
              <input
                className="w-full px-4 py-3 rounded-xl bg-black/[0.03] dark:bg-white/[0.03] border border-black/8 dark:border-white/8 text-[#1d1d1f] dark:text-white font-mono focus:outline-none focus:border-amber-400 dark:focus:border-amber-600 transition-colors placeholder:text-[#aeaeb2] dark:placeholder:text-[#636366]"
                placeholder={t("blog.wifiQr.passwordPlaceholder")}
                type="text"
                value={config.password}
                onChange={(e) => update("password", e.target.value)}
              />
            </div>
          )}

          {/* Encryption type */}
          <div className="space-y-1.5">
            <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
              {t("blog.wifiQr.encryption")}
            </p>
            <div className="flex gap-2">
              {(["WPA", "WEP", "nopass"] as const).map((enc) => (
                <button
                  key={enc}
                  className={`px-4 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    config.encryption === enc
                      ? "bg-amber-500 text-white"
                      : "bg-black/8 dark:bg-white/8 text-[#1d1d1f] dark:text-white hover:bg-black/12 dark:hover:bg-white/12"
                  }`}
                  onClick={() => update("encryption", enc)}
                >
                  {enc === "nopass" ? t("blog.wifiQr.none") : enc}
                </button>
              ))}
            </div>
          </div>

          {/* Hidden network toggle */}
          <div className="flex items-center gap-3">
            <div
              className={`w-10 h-6 rounded-full transition-colors duration-200 flex-shrink-0 relative cursor-pointer ${
                config.hidden ? "bg-amber-500" : "bg-black/10 dark:bg-white/15"
              }`}
              onClick={() => update("hidden", !config.hidden)}
            >
              <div
                className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all duration-200 ${
                  config.hidden ? "left-5" : "left-1"
                }`}
              />
            </div>
            <span className="text-sm text-[#3d3d3d] dark:text-[#c0c0c5]">
              {t("blog.wifiQr.hiddenNetwork")}
            </span>
          </div>
        </div>

        {/* Result */}
        {wifiString && (
          <div className="space-y-3">
            {/* WiFi string preview */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider">
                  {t("blog.wifiQr.qrString")}
                </p>
                <button
                  className="text-xs text-amber-600 dark:text-amber-400 hover:underline"
                  onClick={copyString}
                >
                  {copied ? t("blog.wifiQr.copied") : t("blog.wifiQr.copyString")}
                </button>
              </div>
              <div className="p-4 rounded-xl bg-amber-50/60 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40">
                <p className="text-sm font-mono text-[#1d1d1f] dark:text-white break-all">
                  {wifiString}
                </p>
              </div>
            </div>

            {/* QR code generation info */}
            <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/8 dark:border-white/8 space-y-3">
              <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white">
                {t("blog.wifiQr.howToUse")}
              </p>
              <ol className="text-xs text-[#6e6e73] dark:text-[#86868b] space-y-2">
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-600 dark:text-amber-400">1.</span>
                  {t("blog.wifiQr.step1")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-600 dark:text-amber-400">2.</span>
                  {t("blog.wifiQr.step2")}
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-bold text-amber-600 dark:text-amber-400">3.</span>
                  {t("blog.wifiQr.step3")}
                </li>
              </ol>
            </div>

            <button
              className="w-full py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-semibold text-sm transition-colors active:scale-[0.98]"
              onClick={copyString}
            >
              {copied ? t("blog.wifiQr.copied") : t("blog.wifiQr.copyString")}
            </button>
          </div>
        )}

        {/* Info */}
        <div className="p-4 rounded-xl bg-black/[0.02] dark:bg-white/[0.02] border border-black/8 dark:border-white/8 space-y-1.5">
          <p className="text-xs font-semibold text-[#1d1d1f] dark:text-white">
            {t("blog.wifiQr.infoTitle")}
          </p>
          <ul className="text-xs text-[#6e6e73] dark:text-[#86868b] space-y-1">
            <li>• {t("blog.wifiQr.infoItem1")}</li>
            <li>• {t("blog.wifiQr.infoItem2")}</li>
            <li>• {t("blog.wifiQr.infoItem3")}</li>
          </ul>
        </div>
      </div>
    </article>
  );
}