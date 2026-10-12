"use client";

import { startTransition, useActionState, useEffect, useRef } from "react";
import type { FormState } from "./actions";

type Action = (prev: FormState, fd: FormData) => Promise<FormState>;

/**
 * A form wired to an admin action: shows "Saved" or the problem next to the button,
 * and can ask "Are you sure?" first (for deletes).
 */
export function AdminForm({
  action,
  children,
  submitLabel = "Save",
  confirm,
  variant = "primary",
  className = "",
  resetOnSuccess = false,
}: {
  action: Action;
  children?: React.ReactNode;
  submitLabel?: string;
  confirm?: string;
  variant?: "primary" | "outline" | "danger" | "dark";
  className?: string;
  /** Clear the fields after a successful save (for "Add …" forms). */
  resetOnSuccess?: boolean;
}) {
  const [state, formAction, pending] = useActionState(action, { ok: false, message: "" });
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (resetOnSuccess && state.ok) formRef.current?.reset();
  }, [resetOnSuccess, state.ok, state.at]);
  const btn = {
    primary: "btn btn-blue",
    outline: "btn btn-outline-dark",
    dark: "btn bg-ink text-white hover:bg-ink-2",
    danger: "btn border-2 border-[#b42318] text-[#b42318] hover:bg-[#b42318] hover:text-white",
  }[variant];

  return (
    <form
      ref={formRef}
      action={formAction}
      className={className}
      onSubmit={(e) => {
        // Submit ourselves rather than letting React do it: React clears the form after every
        // submit, which would wipe what was typed whenever a save fails validation.
        e.preventDefault();
        if (confirm && !window.confirm(confirm)) return;
        const fd = new FormData(e.currentTarget);
        startTransition(() => formAction(fd));
      }}
    >
      {children}
      <div className="flex flex-wrap items-center gap-3">
        <button type="submit" disabled={pending} className={`${btn} min-h-11 py-2 text-sm disabled:opacity-60`}>
          {pending ? "Working…" : submitLabel}
        </button>
        {state.message && (
          <span role="status" key={state.at} className={`text-sm font-semibold ${state.ok ? "text-[#166534]" : "text-[#b42318]"}`}>
            {state.ok ? "✓ " : ""}
            {state.message}
          </span>
        )}
      </div>
    </form>
  );
}

/* Small labelled inputs to keep the admin pages tidy */

export function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required = false,
  hint,
  className = "",
}: {
  label: string;
  name: string;
  defaultValue?: string | number | null;
  type?: string;
  required?: boolean;
  hint?: string;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1 text-sm font-bold ${className}`}>
      {label}
      <input name={name} type={type} required={required} defaultValue={defaultValue ?? ""} className="field min-h-11 text-base font-normal" />
      {hint && <span className="text-xs font-normal text-muted">{hint}</span>}
    </label>
  );
}

export function Area({
  label,
  name,
  defaultValue,
  rows = 3,
  required = false,
  hint,
  className = "",
}: {
  label: string;
  name: string;
  defaultValue?: string | null;
  rows?: number;
  required?: boolean;
  hint?: string;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1 text-sm font-bold ${className}`}>
      {label}
      <textarea name={name} rows={rows} required={required} defaultValue={defaultValue ?? ""} className="field text-base font-normal" />
      {hint && <span className="text-xs font-normal text-muted">{hint}</span>}
    </label>
  );
}

export function Check({ label, name, defaultChecked }: { label: string; name: string; defaultChecked?: boolean }) {
  return (
    <label className="flex min-h-11 items-center gap-2.5 text-sm font-bold">
      <input type="checkbox" name={name} defaultChecked={defaultChecked} className="h-5 w-5 accent-blue" />
      {label}
    </label>
  );
}

export function Select({ label, name, defaultValue, options }: { label: string; name: string; defaultValue?: string; options: { value: string; label: string }[] }) {
  return (
    <label className="flex flex-col gap-1 text-sm font-bold">
      {label}
      <select name={name} defaultValue={defaultValue} className="field min-h-11 text-base font-normal">
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </label>
  );
}
