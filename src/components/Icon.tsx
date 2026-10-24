import type { IconName } from "@/content/site";

/** Simple outline icons for the services grid. */
export function Icon({ name, className = "h-7 w-7" }: { name: IconName; className?: string }) {
  const common = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };
  switch (name) {
    case "code":
      return (
        <svg {...common}>
          <polyline points="8,6 2,12 8,18" />
          <polyline points="16,6 22,12 16,18" />
        </svg>
      );
    case "sliders":
      return (
        <svg {...common}>
          <line x1="4" y1="7" x2="20" y2="7" />
          <line x1="4" y1="12" x2="20" y2="12" />
          <line x1="4" y1="17" x2="20" y2="17" />
          <circle cx="9" cy="7" r="2" fill="#fff" />
          <circle cx="15" cy="12" r="2" fill="#fff" />
          <circle cx="7" cy="17" r="2" fill="#fff" />
        </svg>
      );
    case "gallery":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <circle cx="9" cy="10" r="2" />
          <polyline points="3,18 9,13 13,16 16,13 21,17" />
        </svg>
      );
    case "chat":
      return (
        <svg {...common}>
          <path d="M4 5h16v11H9l-5 4z" />
          <line x1="8" y1="10" x2="16" y2="10" />
        </svg>
      );
    case "cart":
      return (
        <svg {...common}>
          <circle cx="9" cy="20" r="1.5" />
          <circle cx="18" cy="20" r="1.5" />
          <path d="M2 3h3l2.5 12h11.5l2-8H6" />
        </svg>
      );
    case "link":
      return (
        <svg {...common}>
          <path d="M10 14a4 4 0 0 0 5.7 0l3-3a4 4 0 0 0-5.7-5.7l-1 1" />
          <path d="M14 10a4 4 0 0 0-5.7 0l-3 3a4 4 0 0 0 5.7 5.7l1-1" />
        </svg>
      );
    case "embed":
      return (
        <svg {...common}>
          <rect x="3" y="4" width="18" height="16" rx="2" />
          <line x1="3" y1="8" x2="21" y2="8" />
          <rect x="7" y="11" width="10" height="6" rx="1" />
        </svg>
      );
    case "book":
      return (
        <svg {...common}>
          <path d="M4 4h6a3 3 0 0 1 2 1 3 3 0 0 1 2-1h6v15h-6a2 2 0 0 0-2 2 2 2 0 0 0-2-2H4z" />
          <line x1="12" y1="5" x2="12" y2="20" />
        </svg>
      );
    case "globe":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="9" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <path d="M12 3a14 14 0 0 1 0 18a14 14 0 0 1 0-18z" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 3l8 3v6c0 4.5-3.4 8-8 9c-4.6-1-8-4.5-8-9V6z" />
          <polyline points="8.5,12 11,14.5 15.5,10" />
        </svg>
      );
    case "mail":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <polyline points="3,7 12,13 21,7" />
        </svg>
      );
    case "move":
      return (
        <svg {...common}>
          <rect x="2" y="6" width="8" height="12" rx="1.5" />
          <rect x="14" y="6" width="8" height="12" rx="1.5" />
          <line x1="7" y1="12" x2="17" y2="12" />
          <polyline points="14,9 17,12 14,15" />
        </svg>
      );
  }
}

export function Check({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <polyline points="4,12.5 9.5,18 20,6.5" />
    </svg>
  );
}
