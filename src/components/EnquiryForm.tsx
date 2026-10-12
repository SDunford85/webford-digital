"use client";

import { useActionState } from "react";
import { sendEnquiry, type EnquiryState } from "@/app/(site)/actions";
import { enquiryNeeds, packageChoices } from "@/content/site";

const initial: EnquiryState = { ok: false, message: "" };

function Field({
  id,
  label,
  error,
  children,
  wide = false,
}: {
  id: string;
  label: string;
  error?: string;
  children: React.ReactNode;
  wide?: boolean;
}) {
  return (
    <div className={`flex flex-col gap-1.5 ${wide ? "sm:col-span-2" : ""}`}>
      <label htmlFor={id} className="text-[15px] font-bold">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-error`} className="m-0 text-sm font-medium text-[#b42318]">
          {error}
        </p>
      ) : null}
    </div>
  );
}

export function EnquiryForm() {
  const [state, action, pending] = useActionState(sendEnquiry, initial);
  const e = state.errors ?? {};

  if (state.ok) {
    return (
      <div role="status" className="rounded-2xl border border-line bg-stone p-8">
        <p className="m-0 font-display text-2xl font-bold">Thank you.</p>
        <p className="mt-2 text-muted">{state.message}</p>
      </div>
    );
  }

  const err = (k: string) => (e[k] ? { "aria-invalid": true, "aria-describedby": `f-${k}-error` } : {});

  return (
    <form action={action} noValidate aria-label="Enquiry form" className="grid gap-5 rounded-2xl border border-line bg-stone p-6 sm:grid-cols-2 sm:p-8">
      <Field id="f-name" label="Your name" error={e.name}>
        <input id="f-name" name="name" type="text" autoComplete="name" required className="field" {...err("name")} />
      </Field>
      <Field id="f-business" label="Business name (optional)">
        <input id="f-business" name="business" type="text" autoComplete="organization" className="field" />
      </Field>
      <Field id="f-email" label="Email" error={e.email}>
        <input id="f-email" name="email" type="email" autoComplete="email" required className="field" {...err("email")} />
      </Field>
      <Field id="f-phone" label="Phone (optional)">
        <input id="f-phone" name="phone" type="tel" autoComplete="tel" className="field" />
      </Field>
      <Field id="f-need" label="What do you need?">
        <select id="f-need" name="need" className="field" defaultValue={enquiryNeeds[0]}>
          {enquiryNeeds.map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>
      </Field>
      <Field id="f-package" label="Package of interest">
        <select id="f-package" name="packageInterest" className="field" defaultValue={packageChoices[0]}>
          {packageChoices.map((n) => (
            <option key={n}>{n}</option>
          ))}
        </select>
      </Field>
      <Field id="f-message" label="Tell me about your project" error={e.message} wide>
        <textarea id="f-message" name="message" rows={5} required className="field resize-y" {...err("message")} />
      </Field>

      {/* Honeypot for spam bots — hidden from people and screen readers */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="f-website">Leave this empty</label>
        <input id="f-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="flex flex-col gap-1.5 sm:col-span-2">
        <div className="flex items-start gap-3 text-[14.5px] text-muted">
          <input id="f-consent" name="consent" type="checkbox" className="mt-0.5 h-5 w-5 shrink-0 accent-blue" {...err("consent")} />
          <label htmlFor="f-consent">
            I’m happy for Webford Digital Services to contact me about my enquiry. See the <a href="/privacy" className="text-blue">Privacy policy</a>.
          </label>
        </div>
        {e.consent ? (
          <p id="f-consent-error" className="m-0 text-sm font-medium text-[#b42318]">
            {e.consent}
          </p>
        ) : null}
      </div>

      {state.message && !state.ok ? (
        <p role="alert" className="m-0 rounded-lg bg-[#fef3f2] px-4 py-3 text-[15px] font-medium text-[#b42318] sm:col-span-2">
          {state.message}
        </p>
      ) : null}

      <button type="submit" disabled={pending} className="btn btn-blue min-h-[52px] text-[17px] disabled:opacity-60 sm:col-span-2">
        {pending ? "Sending…" : "Send enquiry"}
      </button>
    </form>
  );
}
