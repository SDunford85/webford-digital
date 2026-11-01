"use client";

import { openAssistant } from "./Assistant";

export function AskAssistantButton({ className = "btn btn-gold self-start" }: { className?: string }) {
  return (
    <button type="button" onClick={openAssistant} className={className}>
      Ask the assistant
    </button>
  );
}
