/**
 * The Webford "woven W": two overlapping Vs (blue and gold) — you and your client, working together.
 * Same geometry as the SVG files in /public/brand.
 */

type MarkProps = {
  className?: string;
  /** Colour of the first V. Use "light" on dark backgrounds. */
  tone?: "dark" | "light" | "mono-white";
  title?: string;
};

export function LogoMark({ className = "h-8 w-auto", tone = "dark", title }: MarkProps) {
  const first = tone === "mono-white" ? "#ffffff" : tone === "light" ? "#4c7bf4" : "#1846c8";
  const second = tone === "mono-white" ? "#ffffff" : "#d4a72c";
  return (
    <svg viewBox="0 0 100 70" className={className} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title}>
      <polyline points="8,10 31,60 54,10" fill="none" stroke={first} strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
      <polyline points="46,10 69,60 92,10" fill="none" stroke={second} strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Mark + "Webford / DIGITAL SERVICES". `onDark` switches colours for black and navy backgrounds. */
export function Logo({ onDark = false, className = "" }: { onDark?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <LogoMark tone={onDark ? "light" : "dark"} className="h-8 w-auto shrink-0" />
      <span className="flex flex-col leading-none">
        <span className={`font-display text-[22px] font-bold tracking-[-0.01em] ${onDark ? "text-white" : "text-ink"}`}>Webford</span>
        <span className={`mt-1 text-[10.5px] font-bold tracking-[0.22em] ${onDark ? "text-gold" : "text-blue"}`}>DIGITAL SERVICES</span>
      </span>
    </span>
  );
}
