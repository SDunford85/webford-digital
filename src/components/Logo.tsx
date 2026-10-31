/**
 * The Hexford Digital logo: a hexagon globe (a honeycomb wrapped round a sphere, gold at its heart)
 * with the HEXFORD / DIGITAL wordmark. Same artwork as the files in /public/brand.
 */
import { DIGITAL_CAP, DIGITAL_D, DIGITAL_W, GLOBE_MARKUP, GLOBE_SMALL_MARKUP, GLOBE_WHITE_MARKUP, HEXFORD_CAP, HEXFORD_D, HEXFORD_W } from "./brand-paths";

type Tone = "dark" | "light" | "mono-white";

/** Wordmark colours. "dark" = for white backgrounds; "light" = for black and navy backgrounds. */
const tones: Record<Tone, { word: string; sub: string }> = {
  dark: { word: "#0C1A3A", sub: "#8A6510" },
  light: { word: "#FFFFFF", sub: "#E2B33A" },
  "mono-white": { word: "#FFFFFF", sub: "#FFFFFF" },
};

type MarkProps = { className?: string; tone?: Tone; title?: string; /** Fewer, larger cells for sizes under ~64px. */ small?: boolean };

/** The globe on its own. Full colour works on both light and dark backgrounds. */
export function LogoMark({ className = "h-8 w-auto", tone = "dark", title, small = false }: MarkProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      dangerouslySetInnerHTML={{ __html: tone === "mono-white" ? GLOBE_WHITE_MARKUP : small ? GLOBE_SMALL_MARKUP : GLOBE_MARKUP }}
    />
  );
}

// Wordmark layout (in its own units): HEXFORD 34 high, DIGITAL 11.5 high, 10 apart.
const CAP1 = 34;
const CAP2 = 11.5;
const s1 = CAP1 / HEXFORD_CAP;
const s2 = CAP2 / DIGITAL_CAP;
const WORD_W = Math.max(HEXFORD_W * s1, DIGITAL_W * s2) + 2;
const BASE2 = CAP1 + 10 + CAP2;

/** HEXFORD over DIGITAL, drawn as shapes so it looks the same everywhere. */
export function Wordmark({ className = "h-9 w-auto", tone = "dark" }: { className?: string; tone?: Tone }) {
  const t = tones[tone];
  return (
    <svg viewBox={`0 0 ${WORD_W.toFixed(1)} ${(BASE2 + 1).toFixed(1)}`} className={className} aria-hidden>
      <path transform={`translate(0 ${CAP1}) scale(${s1})`} d={HEXFORD_D} fill={t.word} />
      <path transform={`translate(1 ${BASE2}) scale(${s2})`} d={DIGITAL_D} fill={t.sub} />
    </svg>
  );
}

/** Globe + wordmark. `onDark` switches the wordmark colours for black and navy backgrounds. */
export function Logo({ onDark = false, className = "" }: { onDark?: boolean; className?: string }) {
  const tone: Tone = onDark ? "light" : "dark";
  return (
    <span className={`inline-flex items-center gap-3 ${className}`} role="img" aria-label="Hexford Digital">
      <LogoMark tone={tone} small className="h-12 w-12 shrink-0" />
      <Wordmark tone={tone} className="h-[32px] w-auto" />
    </span>
  );
}
