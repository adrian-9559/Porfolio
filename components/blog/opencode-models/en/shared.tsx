"use client";

export function Divider() {
  return (
    <div className="h-px bg-gradient-to-r from-transparent via-black/10 dark:via-white/10 to-transparent my-8" />
  );
}

export function CapabilitiesCard({
  items,
}: {
  items: {
    label: string;
    value: string | React.ReactNode;
    positive?: boolean;
  }[];
}) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 my-4">
      {items.map(({ label, value, positive }) => (
        <div
          key={label}
          className="rounded-lg border border-black/8 dark:border-white/8 p-3"
        >
          <p className="text-[10px] font-medium text-[#6e6e73] dark:text-[#86868b] uppercase tracking-wider mb-1">
            {label}
          </p>
          <p
            className={`text-xs font-semibold ${positive === undefined ? "text-[#1d1d1f] dark:text-white" : positive ? "text-emerald-600 dark:text-emerald-400" : "text-amber-600 dark:text-amber-400"}`}
          >
            {value}
          </p>
        </div>
      ))}
    </div>
  );
}

export function UseCaseCard({
  icon,
  title,
  desc,
  children,
}: {
  icon: string;
  title: string;
  desc: string;
  children?: React.ReactNode;
}) {
  return (
    <div className="rounded-xl border border-black/8 dark:border-white/8 p-4 hover:border-violet-400/30 dark:hover:border-violet-600/30 transition-colors">
      <p className="text-lg mb-2">{icon}</p>
      <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-1">
        {title}
      </p>
      <p className="text-xs text-[#6e6e73] dark:text-[#86868b] leading-relaxed">
        {desc}
      </p>
      {children}
    </div>
  );
}

export function Step({
  number,
  title,
  children,
}: {
  number: number;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 my-5">
      <div className="w-7 h-7 rounded-lg bg-violet-100 dark:bg-violet-950/40 text-violet-600 dark:text-violet-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
        {number}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-[#1d1d1f] dark:text-white mb-1.5">
          {title}
        </p>
        <div className="text-sm text-[#3a3a3c] dark:text-[#aeaeb2] leading-relaxed [&>pre]:my-3">
          {children}
        </div>
      </div>
    </div>
  );
}

export function ProviderCard({
  color,
  name,
  children,
}: {
  color: string;
  name: string;
  children: React.ReactNode;
}) {
  const borderColors: Record<string, string> = {
    violet: "border-l-violet-500",
    blue: "border-l-blue-500",
    orange: "border-l-orange-500",
    amber: "border-l-amber-500",
  };

  return (
    <div
      className={`rounded-xl border border-black/8 dark:border-white/8 border-l-4 ${borderColors[color] || "border-l-violet-500"} p-5 my-6`}
    >
      <div className="text-sm text-[#3a3a3c] dark:text-[#aeaeb2] leading-relaxed space-y-3">
        {children}
      </div>
    </div>
  );
}

export function ModelRow({
  name,
  size,
  ram,
  ctx,
  tools,
}: {
  name: string;
  size: string;
  ram: string;
  ctx: string;
  tools: string;
}) {
  return (
    <tr className="border-b border-black/5 dark:border-white/5 hover:bg-black/[0.02] dark:hover:bg-white/[0.02]">
      <td className="py-2 px-3 font-medium text-[#1d1d1f] dark:text-white text-xs">
        {name}
      </td>
      <td className="py-2 px-3 text-[#3a3a3c] dark:text-[#aeaeb2] text-xs">
        {size}
      </td>
      <td className="py-2 px-3 text-[#3a3a3c] dark:text-[#aeaeb2] text-xs">
        {ram}
      </td>
      <td className="py-2 px-3 text-[#3a3a3c] dark:text-[#aeaeb2] text-xs">
        {ctx}
      </td>
      <td className="py-2 px-3 text-xs">{tools}</td>
    </tr>
  );
}
