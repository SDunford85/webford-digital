"use client";

import { useId, useState } from "react";

/** Drag to compare a client's old website with the new one. The range input makes it work by touch, mouse and keyboard. */
export function BeforeAfter({ before, after, name }: { before: string; after: string; name: string }) {
  const id = useId();
  const [pos, setPos] = useState(50);
  return (
    <div className="relative aspect-[16/9] select-none overflow-hidden rounded-xl bg-ink">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={after} alt={`${name}: the new website`} className="absolute inset-0 h-full w-full object-cover object-left-top" />
      <div className="absolute inset-0 overflow-hidden" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={before} alt={`${name}: the old website`} className="absolute inset-0 h-full w-full object-cover object-left-top" />
      </div>
      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-[13px] font-bold text-white">Before</span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-gold px-3 py-1 text-[13px] font-bold text-ink">After</span>
      <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-gold" style={{ left: `${pos}%` }}>
        <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold text-ink shadow-lg" aria-hidden>
          <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9,6 3,12 9,18" />
            <polyline points="15,6 21,12 15,18" />
          </svg>
        </span>
      </div>
      <label htmlFor={id} className="sr-only">
        Compare the old and new {name} websites
      </label>
      <input
        id={id}
        type="range"
        min={0}
        max={100}
        value={pos}
        onChange={(e) => setPos(Number(e.target.value))}
        className="absolute inset-0 h-full w-full cursor-ew-resize opacity-0"
      />
    </div>
  );
}
