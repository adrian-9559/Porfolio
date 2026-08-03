import React from "react";

export function BookIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M2 3h5a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2V3Z" />
      <path d="M14 3H9a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h5V3Z" />
      <path d="M7 6H3.5M7 8H3.5" />
    </svg>
  );
}

export function FolderIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M1.5 4.5v7a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1H8.5L7 3.5h-4a1 1 0 0 0-1 1Z" />
    </svg>
  );
}

export function LinkIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M6.5 9.5a4 4 0 0 0 5.66 0l2-2a4 4 0 0 0-5.66-5.66l-1 1" />
      <path d="M9.5 6.5a4 4 0 0 0-5.66 0l-2 2a4 4 0 1 0 5.66 5.66l1-1" />
    </svg>
  );
}

export function DocumentIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M4 1.5h5l3.5 3.5v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-12a1 1 0 0 1 1-1Z" />
      <path d="M9 1.5V5h3.5" />
    </svg>
  );
}

export function WarningIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M8 1L1 14h14L8 1Z" />
      <path d="M8 6v3M8 12v.5" />
    </svg>
  );
}

export function KeyIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
      {...props}
    >
      <circle cx="6" cy="10" r="3.5" />
      <path d="M8.5 7.5L13 3" />
      <path d="M11 5l1.5-1.5" />
    </svg>
  );
}

export function ClipboardIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
      {...props}
    >
      <rect height="12" rx="1" width="9" x="3.5" y="2.5" />
      <path d="M6 1.5h4a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H6a.5.5 0 0 1-.5-.5V2a.5.5 0 0 1 .5-.5Z" />
      <path d="M5.5 6.5h5M5.5 9h5M5.5 11.5h3" />
    </svg>
  );
}

export function TrashIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M2 3.5h12" />
      <path d="M5 3.5V2a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 .5.5v1.5" />
      <path d="M3.5 3.5l.72 9.36a1 1 0 0 0 .995.89h5.57a1 1 0 0 0 .995-.89L12.5 3.5" />
    </svg>
  );
}

export function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M3 8l3 3 7-7" />
    </svg>
  );
}

export function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="2"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

export function highlightSQL(sql: string): React.ReactNode {
  const keywords = new Set([
    "SELECT",
    "FROM",
    "WHERE",
    "JOIN",
    "ON",
    "AND",
    "ORDER",
    "BY",
    "GROUP",
    "ASC",
    "DESC",
    "AS",
    "LEFT",
    "RIGHT",
    "INNER",
    "OUTER",
    "INSERT",
    "UPDATE",
    "DELETE",
    "CREATE",
    "TABLE",
    "PRIMARY",
    "KEY",
    "FOREIGN",
    "REFERENCES",
    "NOT",
    "NULL",
    "DEFAULT",
    "UNIQUE",
    "INTO",
    "VALUES",
    "SET",
    "HAVING",
    "LIMIT",
    "OFFSET",
  ]);
  const parts = sql.split(/(\b\w+\b|'[^']*')/g);

  return parts.map((part, i) => {
    const upper = part.toUpperCase();

    if (keywords.has(upper)) {
      return (
        <span
          key={i}
          className="text-purple-500 dark:text-purple-400 font-semibold"
        >
          {part}
        </span>
      );
    }
    if (/^'[^']*'$/.test(part)) {
      return (
        <span key={i} className="text-emerald-600 dark:text-emerald-400">
          {part}
        </span>
      );
    }
    if (/^\d+(\.\d+)?$/.test(part)) {
      return (
        <span key={i} className="text-amber-600 dark:text-amber-400">
          {part}
        </span>
      );
    }

    return (
      <span key={i} className="text-[#e6edf3]">
        {part}
      </span>
    );
  });
}
