"use client";
import { useState } from "react";

import { useT } from "@/hooks/useT";

interface Props {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoComplete?: string;
}

export function PasswordField({ label, value, onChange, placeholder, autoComplete }: Props) {
  const [show, setShow] = useState(false);

  return (
    <div>
      <label className="text-[10px] font-semibold uppercase tracking-wider text-muted/60 block mb-1.5">
        {label}
      </label>
      <div className="relative">
        <input
          autoComplete={autoComplete}
          className="w-full px-3 py-2 pr-10 rounded-xl border border-black/12 dark:border-white/12 bg-black/[0.03] dark:bg-white/[0.05] text-sm text-foreground placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
          placeholder={placeholder}
          type={show ? "text" : "password"}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-muted/60 hover:text-foreground transition-colors"
          tabIndex={-1}
          type="button"
          onClick={() => setShow(!show)}
        >
          {show ? (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
              <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
