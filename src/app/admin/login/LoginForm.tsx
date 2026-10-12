"use client";

import { useActionState } from "react";
import { login } from "../actions";

export function LoginForm() {
  const [state, action, pending] = useActionState(login, { error: "" });
  return (
    <form action={action} className="flex flex-col gap-4">
      <label className="flex flex-col gap-1.5 text-sm font-bold">
        Password
        <input name="password" type="password" required autoComplete="current-password" autoFocus className="field min-h-12 text-base font-normal" />
      </label>
      {state.error && (
        <p role="alert" className="m-0 text-sm font-semibold text-[#b42318]">
          {state.error}
        </p>
      )}
      <button type="submit" disabled={pending} className="btn btn-blue disabled:opacity-60">
        {pending ? "Checking…" : "Log in"}
      </button>
    </form>
  );
}
