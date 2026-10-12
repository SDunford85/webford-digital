import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { Logo } from "@/components/Logo";
import { hasDb } from "@/db";
import { requireAdmin } from "@/lib/admin-auth";
import { logout } from "../actions";
import { AdminNav } from "./AdminNav";

export const metadata: Metadata = { robots: { index: false, follow: false } };

export default async function AdminPanelLayout({ children }: LayoutProps<"/admin">) {
  await connection();
  await requireAdmin();
  return (
    <div className="flex flex-1 flex-col bg-stone">
      <header className="border-b border-ink-line bg-ink px-4 text-white sm:px-6">
        <div className="container-wf flex min-h-16 flex-wrap items-center justify-between gap-3 py-2">
          <Link href="/admin" className="flex items-center gap-3 no-underline">
            <Logo onDark />
            <span className="rounded-full bg-gold px-2.5 py-0.5 text-xs font-bold text-ink">Admin</span>
          </Link>
          <div className="flex items-center gap-2">
            <Link href="/" className="btn btn-outline-light min-h-10 py-1.5 text-sm" target="_blank">
              View site
            </Link>
            <form action={logout}>
              <button type="submit" className="btn btn-gold min-h-10 py-1.5 text-sm">
                Log out
              </button>
            </form>
          </div>
        </div>
      </header>
      <div className="border-b border-line bg-white px-4 sm:px-6">
        <div className="container-wf">
          <AdminNav />
        </div>
      </div>
      <main className="flex-1 px-4 py-10 sm:px-6">
        <div className="container-wf">
          {!hasDb() && (
            <p className="mb-6 rounded-lg bg-[#fef3f2] p-4 font-semibold text-[#b42318]">
              The database isn&apos;t connected (DATABASE_URL is not set), so changes can&apos;t be saved.
            </p>
          )}
          {children}
        </div>
      </main>
    </div>
  );
}
