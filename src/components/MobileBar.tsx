"use client";

import Link from "next/link";
import { openAssistant } from "./Assistant";

/** Phones and tablets: a slim bar fixed to the bottom of the screen, so the next step is always one tap away. */
export function MobileBar() {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex gap-2 border-t border-ink-line bg-ink/95 px-3 py-2.5 backdrop-blur lg:hidden">
      <Link href="/#quote" className="btn btn-gold min-h-11 flex-1 px-3 text-[15px]">
        Get a quote
      </Link>
      <button type="button" onClick={openAssistant} className="btn btn-outline-light min-h-11 flex-1 px-3 text-[15px]">
        Ask a question
      </button>
    </div>
  );
}
