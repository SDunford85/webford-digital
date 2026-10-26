/**
 * The Hexford Digital logo: a gold circuit hexagon (six sides, one for each of the family)
 * with the HEXFORD / DIGITAL wordmark. Same artwork as the files in /public/brand.
 */
import { DIGITAL_CAP, DIGITAL_D, DIGITAL_W, HEXFORD_CAP, HEXFORD_D, HEXFORD_W, ICON_MARKUP } from "./brand-paths";

type Tone = "dark" | "light" | "mono-white";

/** Colours for each tone. "dark" = artwork for white backgrounds; "light" = for black and navy backgrounds. */
const tones: Record<Tone, { line: string; core: string; word: string; sub: string }> = {
  dark: { line: "#0C1A3A", core: "#D4A72C", word: "#0C1A3A", sub: "#8A6510" },
  light: { line: "#D4A72C", core: "#F2D27A", word: "#F2D27A", sub: "#C9D3EA" },
  "mono-white": { line: "#FFFFFF", core: "#FFFFFF", word: "#FFFFFF", sub: "#FFFFFF" },
};

type MarkProps = { className?: string; tone?: Tone; title?: string };

/** The hexagon on its own. */
export function LogoMark({ className = "h-8 w-auto", tone = "dark", title }: MarkProps) {
  const t = tones[tone];
  const markup = ICON_MARKUP.replaceAll("__LINE__", t.line).replaceAll("__CORE__", t.core);
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
      dangerouslySetInnerHTML={{ __html: markup }}
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

/** Mark + wordmark. `onDark` switches colours for black and navy backgrounds. */
export function Logo({ onDark = false, className = "" }: { onDark?: boolean; className?: string }) {
  const tone: Tone = onDark ? "light" : "dark";
  return (
    <span className={`inline-flex items-center gap-3 ${className}`} role="img" aria-label="Hexford Digital">
      <LogoMark tone={tone} className="h-11 w-11 shrink-0" />
      <Wordmark tone={tone} className="h-[32px] w-auto" />
    </span>
  );
}
