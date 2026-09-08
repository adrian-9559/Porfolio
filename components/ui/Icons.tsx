interface IconProps {
  className?: string;
  size?: number;
}

export function IconHome({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M2 7L8 2l6 5v7H10v-4H6v4H2z" />
    </svg>
  );
}

export function IconGit({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <circle cx="4" cy="4" r="1.5" />
      <circle cx="12" cy="4" r="1.5" />
      <circle cx="4" cy="12" r="1.5" />
      <path d="M4 5.5v5M5.5 4h5M12 5.5v1a3 3 0 01-3 3H8" />
    </svg>
  );
}

export function IconBot({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <rect height="9" rx="2" width="13" x="1.5" y="4.5" />
      <path d="M5.5 10.5h.01M10.5 10.5h.01M8 1.5v3M6 8h4" />
    </svg>
  );
}

export function IconBell({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M8 1.5a4.5 4.5 0 014.5 4.5v3l1 1.5H2.5L3.5 9V6A4.5 4.5 0 018 1.5zM6.5 11.5a1.5 1.5 0 003 0" />
    </svg>
  );
}

export function IconUsers({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <circle cx="6" cy="5" r="2.5" />
      <path d="M1 13c0-2.5 2-4 5-4s5 1.5 5 4" />
      <path d="M12 7.5c1.5.5 2.5 1.5 2.5 3.5M10 3a2.5 2.5 0 010 4" />
    </svg>
  );
}

export function IconShield({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M8 1.5L2 4v3c0 3 2.5 5.5 6 6.5 3.5-1 6-3.5 6-6.5V4L8 1.5z" />
    </svg>
  );
}

export function IconKey({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <circle cx="6" cy="6" r="3.5" />
      <path d="M9 9l5 5M12 12l1.5-1.5" />
    </svg>
  );
}

export function IconBlog({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <rect height="13" rx="2" width="13" x="1.5" y="1.5" />
      <path d="M4.5 5.5h7M4.5 8.5h5M4.5 11.5h3" />
    </svg>
  );
}

export function IconMail({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <rect height="9" rx="1.5" width="14" x="1" y="3.5" />
      <path d="M1 3.5l7 5.5 7-5.5" />
    </svg>
  );
}

export function IconServices({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <circle cx="8" cy="4" r="2.5" />
      <path d="M4 14c0-2.5 1.5-4 4-4s4 1.5 4 4" />
      <path d="M13 7.5a5.5 5.5 0 00-5-2.5M3 7.5a5.5 5.5 0 015-2.5" />
    </svg>
  );
}

export function IconLogs({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M2 4h12M2 8h8M2 12h5" />
    </svg>
  );
}

export function IconSkills({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M4 3l2 3-2 3M12 3l-2 3 2 3M7 1.5l2 13M3 12l4 2 4-2" />
    </svg>
  );
}

export function IconDocs({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <rect height="13" rx="1.5" width="11" x="2.5" y="1.5" />
      <path d="M5.5 5.5h5M5.5 8.5h5M5.5 11.5h3" />
    </svg>
  );
}

export function IconTaxonomy({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M2 4h4M2 8h6M2 12h3" />
      <rect height="3" rx="1" width="7" x="7" y="2.5" />
      <rect height="3" rx="1" width="5" x="9" y="6.5" />
      <rect height="3" rx="1" width="8" x="6" y="10.5" />
    </svg>
  );
}

export function IconFriends({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <circle cx="6" cy="5" r="2.5" />
      <path d="M1 14c0-2.5 2-4 5-4s5 1.5 5 4" />
      <path d="M13 8a2.5 2.5 0 000-5M15 14c0-2-1-3.5-2-4" />
    </svg>
  );
}

export function IconFriendships({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <circle cx="5" cy="5" r="2" />
      <circle cx="11" cy="5" r="2" />
      <path d="M1 14c0-2 1.5-3.5 4-3.5s4 1.5 4 3.5" />
      <path d="M9 12c.5-1.5 1.5-2.5 2-2.5s1.5 1 2 2.5" />
    </svg>
  );
}

export function IconApps({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <rect height="5" rx="1" width="5" x="1.5" y="1.5" />
      <rect height="5" rx="1" width="5" x="9.5" y="1.5" />
      <rect height="5" rx="1" width="5" x="1.5" y="9.5" />
      <rect height="5" rx="1" width="5" x="9.5" y="9.5" />
    </svg>
  );
}

export function IconTraffic({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M1 13l3-4 3 2 4-6 3 4" />
      <path d="M1 3h14" />
    </svg>
  );
}

export function IconIssues({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <rect height="12" rx="2" width="14" x="1" y="2" />
      <path d="M4 6h8M4 9h5M4 12h3" />
      <circle cx="11.5" cy="11.5" r="1.5" />
    </svg>
  );
}

export function IconIdeas({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M8 1.5a4.5 4.5 0 00-2 8.63V12h4v-1.87A4.5 4.5 0 008 1.5z" />
      <path d="M6 13h4" />
      <path d="M7 14.5h2" />
    </svg>
  );
}

export function IconAIHub({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M8 1v2M8 13v2M1 8h2M13 8h2M3.05 3.05l1.414 1.414M11.536 11.536l1.414 1.414M3.05 12.95l1.414-1.414M11.536 4.464l1.414-1.414" />
      <circle cx="8" cy="8" r="3" />
    </svg>
  );
}

export function IconDashboard({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <rect height="5" rx="1" width="5" x="1.5" y="1.5" />
      <rect height="5" rx="1" width="5" x="9.5" y="1.5" />
      <rect height="5" rx="1" width="5" x="1.5" y="9.5" />
      <rect height="5" rx="1" width="5" x="9.5" y="9.5" />
    </svg>
  );
}

export function IconUser({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <circle cx="8" cy="5" r="3" />
      <path d="M2 14a6 6 0 0112 0" />
    </svg>
  );
}

export function IconMoney({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <rect height="9" rx="1.5" width="14" x="1" y="4" />
      <path d="M1 7h14M5 10.5h.01M8 10.5h2" />
    </svg>
  );
}

export function IconCalendar({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <rect height="11" rx="1.5" width="13" x="1.5" y="3" />
      <path d="M1.5 6.5h13M5 1.5v3M11 1.5v3" />
      <path d="M5 9h.01M8 9h.01M11 9h.01M5 11.5h.01M8 11.5h.01" />
    </svg>
  );
}

export function IconTable({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <rect height="13" rx="1.5" width="13" x="1.5" y="1.5" />
      <path d="M1.5 5.5h13M5.5 1.5v13M10.5 1.5v13" />
    </svg>
  );
}

export function IconChart({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M1 14h14M3 11l3-4 3 2 5-6" />
      <circle cx="3" cy="11" r="1" />
      <circle cx="6" cy="7" r="1" />
      <circle cx="9" cy="9" r="1" />
      <circle cx="14" cy="5" r="1" />
    </svg>
  );
}

export function IconTasks({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <rect height="3.5" rx="1" width="13" x="1.5" y="1.5" />
      <rect height="3.5" rx="1" width="13" x="1.5" y="6.5" />
      <rect height="3.5" rx="1" width="13" x="1.5" y="11.5" />
      <path d="M4 3.5h8M4 8.5h8M4 13.5h8" />
    </svg>
  );
}

export function IconLock({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <rect height="7" rx="1.5" width="10" x="3" y="7.5" />
      <path d="M5 7.5V5a3 3 0 016 0v2.5M8 10.5v2" />
    </svg>
  );
}

export function IconSession({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M10 8H2m0 0l3-3M2 8l3 3" />
      <path d="M6 4.5A6 6 0 1114 8" />
    </svg>
  );
}

export function IconSearch({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <circle cx="7" cy="7" r="4.5" />
      <path d="M10.5 10.5L14 14" />
    </svg>
  );
}

export function IconClose({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

export function IconCheck({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M3 8.5l3.5 3.5L13 4" />
    </svg>
  );
}

export function IconChevronDown({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M4 6l4 4 4-4" />
    </svg>
  );
}

export function IconChevronRight({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M6 4l4 4-4 4" />
    </svg>
  );
}

export function IconPlus({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M8 3v10M3 8h10" />
    </svg>
  );
}

export function IconEdit({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M9.5 2.5l4 4M2 14l1-4L12.5 0.5a1.4 1.4 0 012 2L5 13z" />
    </svg>
  );
}

export function IconTrash({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M2 4h12M5.33 4V2.67a1.33 1.33 0 011.34-1.34h2.66a1.33 1.33 0 011.34 1.34V4M12.67 4v9.33a1.33 1.33 0 01-1.34 1.34H4.67a1.33 1.33 0 01-1.34-1.34V4h9.34z" />
      <path d="M6.67 7.33v4M10 7.33v4" />
    </svg>
  );
}

export function IconExternalLink({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 16 16"
    >
      <path d="M12 8.67v5.33H2V4.67h5.33M9.33 2h4.67v4.67M7.33 8.67L14 2" />
    </svg>
  );
}

export function IconMenu({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeWidth="1.5"
      viewBox="0 0 18 18"
    >
      <path d="M2 4.5h14M2 9h14M2 13.5h14" />
    </svg>
  );
}

export function IconGraduation({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3z" />
      <path d="M5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
    </svg>
  );
}

export function IconCode({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path d="M16 18l6-6-6-6M8 6l-6 6 6 6" />
    </svg>
  );
}

export function IconRocket({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
      <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
    </svg>
  );
}

export function IconMusic({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path d="M9 18V5l12-2v13" />
      <circle cx="6" cy="18" r="3" />
      <circle cx="18" cy="16" r="3" />
    </svg>
  );
}

export function IconDumbbell({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path d="M6.5 6.5h11M6.5 17.5h11M3 6.5v11M21 6.5v11M6 3v4M6 17v4M18 3v4M18 17v4M10 6.5h4v11h-4z" />
    </svg>
  );
}

export function IconGamepad({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <path d="M6 11h4M8 9v4" />
      <path d="M15 12h.01M18 12h.01" />
      <path d="M17.32 5H6.68a4 4 0 00-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 003 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 019.828 16h4.344a2 2 0 011.414.586L17 18c.5.5 1 1 2 1a3 3 0 003-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0017.32 5z" />
    </svg>
  );
}

export function IconBriefcase({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
    </svg>
  );
}

export function IconStar({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

export function IconTerminal({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

export function IconCpu({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg
      className={s}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="1.5"
      viewBox="0 0 24 24"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      <rect x="9" y="9" width="6" height="6" />
      <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
    </svg>
  );
}

export function IconReact({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg className={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="2" fill="currentColor" />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        stroke="currentColor"
        strokeWidth="1.5"
        transform="rotate(60 12 12)"
      />
      <ellipse
        cx="12"
        cy="12"
        rx="10"
        ry="4"
        stroke="currentColor"
        strokeWidth="1.5"
        transform="rotate(120 12 12)"
      />
    </svg>
  );
}

export function IconNextjs({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg className={s} viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 16V8l8 8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconTypescript({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg className={s} viewBox="0 0 24 24" fill="none">
      <rect
        x="2"
        y="2"
        width="20"
        height="20"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7 13v-2h2.5c1.5 0 2.5.5 2.5 2s-1 2-2.5 2H7M14 11v4M14 11c0-1 1-2 3-2v0c2 0 3 1 3 2v4M14 13h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconTailwind({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg className={s} viewBox="0 0 24 24" fill="none">
      <path
        d="M6 8c1-4 4-4 6-2s4 0 6-2-4-4-6-2-6 0-6 2 0 2 0 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M6 16c1-4 4-4 6-2s4 0 6-2-4-4-6-2-6 0-6 2 0 2 0 2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconFramer({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg className={s} viewBox="0 0 24 24" fill="none">
      <path
        d="M5 3h14v6h-7l7 6H5v-6h7L5 3z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconNodejs({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg className={s} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2l9 5v10l-9 5-9-5V7l9-5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 12v10M12 12l9-5M12 12l-9-5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconExpress({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg className={s} viewBox="0 0 24 24" fill="none">
      <rect
        x="2"
        y="4"
        width="20"
        height="16"
        rx="2"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M7 12h10M7 8h6M7 16h8"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconDatabase({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg className={s} viewBox="0 0 24 24" fill="none">
      <ellipse
        cx="12"
        cy="5"
        rx="9"
        ry="3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <path
        d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export function IconDocker({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg className={s} viewBox="0 0 24 24" fill="none">
      <path
        d="M3 14c0-3 2-5 6-5 2 0 3 .5 4 1.5.5-1 1.5-2 3-2 3 0 4 2 4 4v5H3v-3.5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M6 14h.01M9 14h.01M12 14h.01M15 14h.01M18 14h.01"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M21 10c1-1 1-3-1-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconVercel({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg className={s} viewBox="0 0 24 24" fill="none">
      <path
        d="M12 4L4 20h16L12 4z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconAws({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg className={s} viewBox="0 0 24 24" fill="none">
      <path
        d="M4 14c0-4 3-7 8-7s8 3 8 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M2 17c1 2 3 3 5 3h10c2 0 4-1 5-3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M8 11l-2 3M16 11l2 3M12 10v4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function IconCube({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg className={s} viewBox="0 0 24 24" fill="none">
      <path
        d="M21 16.5V7.5l-9 5-9-5v9l9 5 9-5z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 12l9-4.5M12 12v9.5M12 12L3 7.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function IconCloud({ className = "w-4 h-4", size }: IconProps) {
  const s = size ? `w-${size} h-${size}` : className;

  return (
    <svg className={s} viewBox="0 0 24 24" fill="none">
      <path
        d="M18 10a4 4 0 00-7.92-1A3 3 0 005 12a3 3 0 003 3h10a3 3 0 000-6z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}
