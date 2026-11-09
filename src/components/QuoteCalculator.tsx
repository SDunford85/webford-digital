"use client";

import { useRouter } from "next/navigation";
import { useId, useMemo, useState } from "react";
import { hostingFreeMonths, type QuoteConfig } from "@/content/site";
import { sendToEnquiry } from "@/lib/prefill";

type Tier = "bronze" | "silver" | "gold";
type Monthly = "none" | "hosting" | "care";

const tiers: { id: Tier; title: string; body: string; pages: number | null }[] = [
  { id: "bronze", title: "A professional website", body: "Show what you do and get enquiries", pages: 5 },
  { id: "silver", title: "Update it myself and take bookings", body: "Your own admin area, bookings and an assistant", pages: 10 },
  { id: "gold", title: "Sell online", body: "A full online shop or business system", pages: null },
];

type ExtraId = "admin" | "bookings" | "assistant" | "move" | "email" | "copy";
const extras: { id: ExtraId; label: string; includedIn: Tier[]; perPage?: boolean }[] = [
  { id: "admin", label: "An admin area to update it myself", includedIn: ["silver", "gold"] },
  { id: "bookings", label: "Online bookings", includedIn: ["silver", "gold"] },
  { id: "assistant", label: "A virtual assistant for customer questions", includedIn: ["silver", "gold"] },
  { id: "move", label: "Move my existing website and domain", includedIn: ["silver", "gold"] },
  { id: "email", label: "Business email set-up", includedIn: ["gold"] },
  { id: "copy", label: "Help writing the words", includedIn: [], perPage: true },
];

const gbp = (n: number) => `£${Math.round(n).toLocaleString("en-GB")}`;
const tierName: Record<Tier, string> = { bronze: "Bronze", silver: "Silver", gold: "Gold" };

export function QuoteCalculator({ quote }: { quote: QuoteConfig }) {
  const uid = useId();
  const router = useRouter();
  const [tier, setTier] = useState<Tier>("silver");
  const [pages, setPages] = useState(5);
  const [picked, setPicked] = useState<Set<ExtraId>>(new Set());
  const [monthly, setMonthly] = useState<Monthly>("hosting");
  const [spread, setSpread] = useState(false);

  const t = tiers.find((x) => x.id === tier)!;
  const result = useMemo(() => {
    const lines: { label: string; amount: number }[] = [{ label: `${tierName[tier]} package`, amount: quote[tier] }];
    const extraPages = t.pages === null ? 0 : Math.max(0, pages - t.pages);
    if (extraPages) lines.push({ label: `${extraPages} extra page${extraPages > 1 ? "s" : ""}`, amount: extraPages * quote.extraPage });
    for (const x of extras) {
      if (!picked.has(x.id) || x.includedIn.includes(tier)) continue;
      lines.push({ label: x.perPage ? `${x.label} (${pages} pages)` : x.label, amount: x.perPage ? quote[x.id] * pages : quote[x.id] });
    }
    const total = lines.reduce((s, l) => s + l.amount, 0);
    const perMonth = monthly === "hosting" ? quote.hosting : monthly === "care" ? quote.care : 0;
    // Whole-pound instalments; the deposit (about a quarter) absorbs the rounding so the parts add up exactly
    const instalment = Math.round((total * 0.75) / 6);
    const deposit = total - instalment * 6;
    return { lines, total, perMonth, deposit, instalment };
  }, [quote, tier, t.pages, pages, picked, monthly]);

  const toggle = (id: ExtraId) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });

  const send = () => {
    const included = extras.filter((x) => x.includedIn.includes(tier)).map((x) => x.label.toLowerCase());
    const chosen = extras.filter((x) => picked.has(x.id) && !x.includedIn.includes(tier)).map((x) => x.label.toLowerCase());
    const message = [
      `My instant quote: ${tierName[tier]} package, about ${pages} page${pages > 1 ? "s" : ""}.`,
      chosen.length ? `Extras: ${chosen.join(", ")}.` : "",
      included.length ? `Included: ${included.join(", ")}.` : "",
      monthly === "none"
        ? "No monthly plan."
        : monthly === "care"
          ? `Monthly plan: hosting and care (${gbp(result.perMonth)}/month).`
          : `Monthly plan: hosting only (first ${hostingFreeMonths} months free, then ${gbp(result.perMonth)}/month).`,
      `Estimate: ${gbp(result.total)}${spread ? `, spread as ${gbp(result.deposit)} deposit then 6 × ${gbp(result.instalment)}` : ""}.`,
    ]
      .filter(Boolean)
      .join("\n")
      .concat("\n\nA bit about my business: ");
    sendToEnquiry({ packageInterest: tierName[tier], need: tier === "gold" ? "Online shop" : tier === "silver" ? "Bookings or appointments" : "New website", message }, router.push);
  };

  const optionCls = (on: boolean) =>
    `flex cursor-pointer flex-col gap-1 rounded-xl border-2 p-4 transition-colors ${on ? "border-blue bg-blue-tint" : "border-line bg-white hover:border-[#c7cfdc]"}`;

  return (
    <div className="grid items-start gap-6 lg:grid-cols-[7fr_5fr]">
      <div className="flex flex-col gap-7 rounded-2xl border border-line bg-white p-5 sm:p-7">
        <fieldset className="m-0 flex flex-col gap-3 border-0 p-0">
          <legend className="mb-3 font-display text-[18px] font-bold">1. What do you need?</legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {tiers.map((x) => (
              <label key={x.id} className={optionCls(tier === x.id)}>
                <input type="radio" name={`${uid}-tier`} value={x.id} checked={tier === x.id} onChange={() => setTier(x.id)} className="sr-only" />
                <span className="font-bold leading-snug">{x.title}</span>
                <span className="text-[14px] text-muted">{x.body}</span>
              </label>
            ))}
          </div>
        </fieldset>

        <div className="flex flex-col gap-2">
          <label htmlFor={`${uid}-pages`} className="flex items-baseline justify-between font-display text-[18px] font-bold">
            2. How many pages?
            <span className="font-sans text-[15px] font-medium text-muted">
              {pages} page{pages > 1 ? "s" : ""}
              {t.pages === null ? " · all included" : pages <= t.pages ? ` · up to ${t.pages} included` : ` · ${t.pages} included`}
            </span>
          </label>
          <input id={`${uid}-pages`} type="range" min={1} max={25} value={pages} onChange={(e) => setPages(Number(e.target.value))} className="w-full accent-blue" />
        </div>

        <fieldset className="m-0 flex flex-col gap-2 border-0 p-0">
          <legend className="mb-2 font-display text-[18px] font-bold">3. Any extras?</legend>
          {extras.map((x) => {
            const included = x.includedIn.includes(tier);
            const price = x.perPage ? `${gbp(quote[x.id])} a page` : gbp(quote[x.id]);
            return (
              <label key={x.id} className={`flex min-h-11 items-center justify-between gap-3 rounded-lg px-1 ${included ? "cursor-default" : "cursor-pointer"}`}>
                <span className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={included || picked.has(x.id)}
                    disabled={included}
                    onChange={() => toggle(x.id)}
                    className="h-5 w-5 shrink-0 accent-blue"
                  />
                  <span>{x.label}</span>
                </span>
                <span className={`shrink-0 text-[14px] font-bold ${included ? "text-[#047857]" : "text-muted"}`}>{included ? "Included" : `+ ${price}`}</span>
              </label>
            );
          })}
        </fieldset>

        <fieldset className="m-0 flex flex-col gap-3 border-0 p-0">
          <legend className="mb-3 font-display text-[18px] font-bold">4. Hosting and support</legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {(
              [
                ["hosting", "Hosting only", `First year free, then ${gbp(quote.hosting)} a month`],
                ["care", "Hosting and care", `${gbp(quote.care)} a month`],
                ["none", "I'll host it myself", "No monthly cost"],
              ] as const
            ).map(([id, title, body]) => (
              <label key={id} className={optionCls(monthly === id)}>
                <input type="radio" name={`${uid}-monthly`} value={id} checked={monthly === id} onChange={() => setMonthly(id)} className="sr-only" />
                <span className="font-bold">{title}</span>
                <span className="text-[14px] text-muted">{body}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      <aside aria-live="polite" className="flex flex-col gap-5 rounded-2xl bg-ink p-6 text-white sm:p-7 lg:sticky lg:top-24">
        <p className="kicker m-0 text-gold">Your estimate</p>
        <div className="flex flex-col gap-1">
          <span className="font-display text-[clamp(40px,6vw,54px)] font-bold leading-none tracking-[-0.02em]">{gbp(result.total)}</span>
          <span className="text-muted-dark">one-off build
            {result.perMonth
              ? monthly === "hosting"
                ? `, first year's hosting free, then ${gbp(result.perMonth)} a month`
                : `, then ${gbp(result.perMonth)} a month`
              : ""}</span>
        </div>
        <ul className="m-0 flex list-none flex-col gap-1.5 border-y border-ink-line p-0 py-4 text-[15px] text-muted-dark">
          {result.lines.map((l) => (
            <li key={l.label} className="flex justify-between gap-4">
              <span>{l.label}</span>
              <span className="shrink-0 text-white">{gbp(l.amount)}</span>
            </li>
          ))}
        </ul>
        <div className="flex rounded-full bg-ink-2 p-1 text-[14.5px] font-bold" role="group" aria-label="How to pay">
          {[
            [false, "Pay in full"],
            [true, "Spread the cost"],
          ].map(([v, label]) => (
            <button
              key={String(v)}
              type="button"
              aria-pressed={spread === v}
              onClick={() => setSpread(v as boolean)}
              className={`min-h-10 flex-1 rounded-full px-3 ${spread === v ? "bg-gold text-ink" : "text-muted-dark hover:text-white"}`}
            >
              {label as string}
            </button>
          ))}
        </div>
        {spread ? (
          <p className="m-0 text-[15.5px] text-muted-dark">
            <strong className="text-white">{gbp(result.deposit)}</strong> deposit, then <strong className="text-white">6 × {gbp(result.instalment)}</strong> a month,
            interest free.
          </p>
        ) : null}
        <button type="button" onClick={send} className="btn btn-gold min-h-[52px] text-[17px]">
          Send me this quote
        </button>
        <p className="m-0 text-[13px] text-[#9ca3af]">
          An estimate to help you plan. You&apos;ll get a fixed quote after a free chat, and nothing is charged until you&apos;ve agreed it.
        </p>
      </aside>
    </div>
  );
}
