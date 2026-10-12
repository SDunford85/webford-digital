"use client";

import { useEffect, useState } from "react";
import type { ProjectView } from "@/lib/content";

const INTERVAL = 5000; // ms per slide

function hostOf(url: string, name: string) {
  try {
    return new URL(url).host.replace(/^www\./, "");
  } catch {
    return name; // no live address yet: never invent a domain that might belong to someone else
  }
}

/**
 * The homepage hero: your portfolio screenshots in a browser frame, fading from one to the next.
 * Pauses on hover/focus and with the pause button; doesn't move at all for visitors who ask
 * their device to reduce motion.
 */
export function HeroShowcase({ projects }: { projects: (ProjectView & { image: string })[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false); // pause button
  const [hovering, setHovering] = useState(false);
  const [reduceMotion, setReduceMotion] = useState(false);
  const count = projects.length;

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const running = count > 1 && !paused && !hovering && !reduceMotion;
  useEffect(() => {
    if (!running) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % count), INTERVAL);
    return () => clearInterval(t);
  }, [running, count]);

  if (count === 0) return null;
  const current = projects[index % count];

  return (
    <section
      aria-roledescription="carousel"
      aria-label="Websites I've built"
      className="overflow-hidden rounded-2xl border border-ink-line bg-ink-2 shadow-2xl shadow-black/40"
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      onFocus={() => setHovering(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setHovering(false);
      }}
    >
      {/* Browser bar: shows the site's address so the frame reads as a web browser */}
      <div className="flex items-center gap-3 border-b border-ink-line px-4 py-3" aria-hidden>
        <span className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-[#3a4150]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3a4150]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#3a4150]" />
        </span>
        <span className="min-w-0 flex-1 truncate rounded-md bg-ink px-3 py-1 text-center text-xs text-[#9ca3af]">{hostOf(current.url, current.name)}</span>
      </div>

      {/* Slides, stacked and cross-faded */}
      <a href="#work" className="relative block aspect-[16/9] bg-ink" aria-label={`${current.name}: see this and more under Recent work`}>
        {projects.map((p, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={p.name}
            src={p.image}
            alt={i === index ? `${p.name} website homepage` : ""}
            aria-hidden={i !== index}
            loading={i === 0 ? "eager" : "lazy"}
            fetchPriority={i === 0 ? "high" : "auto"}
            className={`absolute inset-0 h-full w-full object-cover object-left-top transition-opacity duration-700 ease-in-out motion-reduce:transition-none ${
              i === index ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </a>

      {/* Caption and controls */}
      <div className="flex items-center justify-between gap-3 px-4 py-3.5">
        <div className="min-w-0" aria-live={running ? "off" : "polite"}>
          <p className="m-0 truncate font-display text-[17px] font-bold text-white">{current.name}</p>
          <p className="m-0 truncate text-[13px] text-gold">{current.tags[0]}</p>
        </div>
        {count > 1 && (
          <div className="flex shrink-0 items-center gap-1">
            {projects.map((p, i) => (
              <button
                key={p.name}
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Show ${p.name}`}
                aria-current={i === index ? "true" : undefined}
                className="flex h-11 w-7 items-center justify-center"
              >
                <span className={`block h-2.5 rounded-full transition-all ${i === index ? "w-6 bg-gold" : "w-2.5 bg-[#4b5563] hover:bg-[#9ca3af]"}`} />
              </button>
            ))}
            {!reduceMotion && (
              <button
                type="button"
                onClick={() => setPaused((v) => !v)}
                aria-label={paused ? "Play slideshow" : "Pause slideshow"}
                className="ml-1 flex h-11 w-11 items-center justify-center rounded-full text-[#d1d5db] hover:bg-ink hover:text-white"
              >
                {paused ? (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                    <path d="M7 4.5v15l13-7.5z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden>
                    <rect x="6" y="4.5" width="4" height="15" rx="1" />
                    <rect x="14" y="4.5" width="4" height="15" rx="1" />
                  </svg>
                )}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
