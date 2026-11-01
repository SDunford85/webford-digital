/**
 * Hands a quote or a chat over to the enquiry form, which may be on this page or on the homepage.
 * Same page: an event fills the form in. Another page: the details wait in sessionStorage
 * and the form picks them up when the homepage opens at #contact.
 */
export type Prefill = { need?: string; packageInterest?: string; message?: string };

const KEY = "hexford-prefill";
export const PREFILL_EVENT = "hexford:prefill";

export function sendToEnquiry(p: Prefill, push: (href: string) => void) {
  const form = document.getElementById("contact");
  if (form) {
    window.dispatchEvent(new CustomEvent<Prefill>(PREFILL_EVENT, { detail: p }));
    form.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
    return;
  }
  try {
    sessionStorage.setItem(KEY, JSON.stringify(p));
  } catch {
    // storage blocked: the visitor can still fill the form in themselves
  }
  push("/#contact");
}

export function takeStoredPrefill(): Prefill | null {
  try {
    const raw = sessionStorage.getItem(KEY);
    if (!raw) return null;
    sessionStorage.removeItem(KEY);
    return JSON.parse(raw) as Prefill;
  } catch {
    return null;
  }
}
