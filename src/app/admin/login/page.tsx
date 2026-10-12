import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { connection } from "next/server";
import { Logo } from "@/components/Logo";
import { adminConfigured, isAdmin } from "@/lib/admin-auth";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = { title: "Admin login", robots: { index: false, follow: false } };

export default async function AdminLogin() {
  await connection(); // always check secrets/cookie at request time
  if (await isAdmin()) redirect("/admin");
  return (
    <main className="flex flex-1 items-center justify-center bg-stone px-4 py-16">
      <div className="w-full max-w-sm rounded-2xl border border-line bg-white p-8 shadow-sm">
        <div className="flex justify-center">
          <Logo />
        </div>
        <h1 className="mt-6 text-center font-display text-2xl font-bold">Admin</h1>
        <p className="mb-6 mt-1 text-center text-sm text-muted">Manage your website content and enquiries.</p>
        {adminConfigured() ? (
          <LoginForm />
        ) : (
          <p className="m-0 rounded-lg bg-[#fef3f2] p-4 text-sm font-semibold text-[#b42318]">
            The admin site isn&apos;t set up yet. Add the ADMIN_PASSWORD and ADMIN_SESSION_SECRET secrets in Cloudflare (see the README).
          </p>
        )}
      </div>
    </main>
  );
}
