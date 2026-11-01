"use client";

import { useRouter } from "next/navigation";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import { sendToEnquiry } from "@/lib/prefill";

/**
 * The floating virtual assistant: a chat panel that answers questions about Hexford's services,
 * prices and process (see /api/assistant). On phones it opens from the bottom bar instead of a floating button.
 */

type Msg = { role: "user" | "assistant"; content: string };
export const ASSISTANT_OPEN_EVENT = "hexford:assistant-open";

const STORE = "hexford-chat";
const greeting: Msg = {
  role: "assistant",
  content: "Hi, I'm the Hexford assistant. Ask me about prices, what's included, hosting or how it all works. (I'm the kind of assistant Hexford can add to your website too.)",
};
const suggestions = ["How much does a website cost?", "Will I own my website?", "Can you move my existing site?", "What's included in hosting?"];

export function openAssistant() {
  window.dispatchEvent(new Event(ASSISTANT_OPEN_EVENT));
}

function GlobeDot({ className = "h-5 w-5" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="10" fill="#1846C8" />
      <path d="M12 6.5l3 1.7v3.5l-3 1.7-3-1.7V8.2z" fill="#E2B33A" />
      <path d="M7 12.6l2.4 1.4v2.8L7 18.2l-2.1-1.2" fill="none" stroke="#4C7BF4" strokeWidth="1.4" />
      <path d="M17 12.6l-2.4 1.4v2.8l2.4 1.4 2.1-1.2" fill="none" stroke="#4C7BF4" strokeWidth="1.4" />
    </svg>
  );
}

export function Assistant() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  // Keep the conversation while the visitor moves between pages (the panel only renders once opened, so no hydration mismatch)
  const [msgs, setMsgs] = useState<Msg[]>(() => {
    if (typeof window === "undefined") return [greeting];
    try {
      const saved = sessionStorage.getItem(STORE);
      return saved ? (JSON.parse(saved) as Msg[]) : [greeting];
    } catch {
      return [greeting];
    }
  });
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const titleId = useId();

  useEffect(() => {
    try {
      sessionStorage.setItem(STORE, JSON.stringify(msgs.slice(-20)));
    } catch {
      /* ignore */
    }
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight });
  }, [msgs]);

  const show = useCallback(() => {
    returnFocus.current = document.activeElement as HTMLElement | null;
    setOpen(true);
  }, []);
  const hide = useCallback(() => {
    setOpen(false);
    returnFocus.current?.focus();
  }, []);

  useEffect(() => {
    window.addEventListener(ASSISTANT_OPEN_EVENT, show);
    return () => window.removeEventListener(ASSISTANT_OPEN_EVENT, show);
  }, [show]);
  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, hide]);

  const ask = async (text: string) => {
    const q = text.trim();
    if (!q || busy) return;
    const next = [...msgs, { role: "user" as const, content: q.slice(0, 800) }];
    setMsgs(next);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ messages: next.filter((m, i) => !(i === 0 && m.role === "assistant")).slice(-12) }),
      });
      const data = (await res.json()) as { reply?: string; error?: string };
      setMsgs([...next, { role: "assistant", content: data.reply ?? data.error ?? "Sorry, something went wrong. Please try again." }]);
    } catch {
      setMsgs([...next, { role: "assistant", content: "Sorry, I couldn't connect just now. You can still send Steve a message with the enquiry form." }]);
    } finally {
      setBusy(false);
    }
  };

  const messageSteve = () => {
    const asked = msgs.filter((m) => m.role === "user").map((m) => `- ${m.content}`);
    hide();
    sendToEnquiry({ message: asked.length ? `From my chat with your assistant, I asked:\n${asked.slice(-3).join("\n")}\n\n` : "" }, router.push);
  };

  const goQuote = () => {
    hide();
    const el = document.getElementById("quote");
    if (el) el.scrollIntoView({ behavior: "smooth" });
    else router.push("/#quote");
  };

  return (
    <>
      {/* Desktop: floating button. Phones use the bottom bar (MobileBar). */}
      {!open && (
        <button
          type="button"
          onClick={show}
          className="fixed bottom-6 right-6 z-40 hidden min-h-12 items-center gap-2.5 rounded-full bg-ink py-2 pl-3 pr-5 font-bold text-white shadow-xl ring-1 ring-ink-line hover:bg-ink-2 lg:flex"
        >
          <GlobeDot className="h-7 w-7" />
          Ask a question
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-modal="false"
          aria-labelledby={titleId}
          className="fixed inset-x-0 bottom-0 z-50 flex h-[min(82vh,640px)] flex-col overflow-hidden rounded-t-2xl bg-white shadow-2xl ring-1 ring-black/10 lg:inset-x-auto lg:bottom-6 lg:right-6 lg:h-[600px] lg:w-[400px] lg:rounded-2xl"
        >
          <div className="flex items-center justify-between gap-3 bg-ink px-4 py-3 text-white">
            <div className="flex items-center gap-3">
              <GlobeDot className="h-8 w-8" />
              <div className="flex flex-col leading-tight">
                <strong id={titleId} className="font-display">
                  Hexford assistant
                </strong>
                <span className="text-[12.5px] text-muted-dark">Instant answers · built by Hexford Digital</span>
              </div>
            </div>
            <button type="button" onClick={hide} aria-label="Close the assistant" className="flex h-11 w-11 items-center justify-center rounded-full hover:bg-ink-2">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden>
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>

          <div ref={listRef} className="flex flex-1 flex-col gap-3 overflow-y-auto bg-stone px-4 py-4" aria-live="polite">
            {msgs.map((m, i) => (
              <p
                key={i}
                className={`m-0 max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-[15px] leading-snug ${
                  m.role === "user" ? "self-end rounded-br-md bg-blue text-white" : "self-start rounded-bl-md bg-white text-ink ring-1 ring-line"
                }`}
              >
                {m.content}
              </p>
            ))}
            {busy && (
              <p className="m-0 self-start rounded-2xl rounded-bl-md bg-white px-4 py-2.5 text-[15px] text-muted ring-1 ring-line">
                <span className="sr-only">The assistant is typing</span>
                <span aria-hidden className="tracking-[0.3em]">•••</span>
              </p>
            )}
            {msgs.length === 1 && !busy && (
              <div className="flex flex-wrap gap-2 pt-1">
                {suggestions.map((s) => (
                  <button key={s} type="button" onClick={() => ask(s)} className="min-h-10 rounded-full border border-blue bg-white px-3.5 text-left text-[14px] font-medium text-blue hover:bg-blue-tint">
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>

          <div className="flex gap-2 border-t border-line px-3 pt-3 text-[14px]">
            <button type="button" onClick={goQuote} className="min-h-10 flex-1 rounded-full bg-gold px-3 font-bold text-ink hover:bg-gold-dark">
              Instant quote
            </button>
            <button type="button" onClick={messageSteve} className="min-h-10 flex-1 rounded-full border border-ink px-3 font-bold text-ink hover:bg-stone">
              Message Steve
            </button>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              ask(input);
            }}
            className="flex items-end gap-2 p-3"
          >
            <label htmlFor="assistant-input" className="sr-only">
              Your question
            </label>
            <textarea
              id="assistant-input"
              ref={inputRef}
              rows={1}
              value={input}
              maxLength={800}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  ask(input);
                }
              }}
              placeholder="Type your question…"
              className="field max-h-28 min-h-11 flex-1 resize-none py-2.5 text-base"
            />
            <button type="submit" disabled={busy || !input.trim()} aria-label="Send" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue text-white disabled:opacity-50">
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="13,6 19,12 13,18" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
