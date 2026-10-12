"use server";

import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect, unstable_rethrow } from "next/navigation";
import { z } from "zod";
import { getDb, schema } from "@/db";
import { checkPassword, endSession, requireAdmin, startSession } from "@/lib/admin-auth";
import { settingKeys } from "@/lib/content";

/* ---------- helpers ---------- */

export type FormState = { ok: boolean; message: string; at?: number };

/** Runs an admin change and turns any problem into a friendly message for the form. */
async function run(fn: () => Promise<void>, success = "Saved"): Promise<FormState> {
  try {
    await requireAdmin();
    await fn();
    return { ok: true, message: success, at: Date.now() };
  } catch (err) {
    unstable_rethrow(err); // let redirects (e.g. to the login page) through
    if (err instanceof z.ZodError) return { ok: false, message: err.issues[0]?.message ?? "Please check the form", at: Date.now() };
    if (err instanceof Error && !err.message.includes("Failed query")) return { ok: false, message: err.message, at: Date.now() };
    console.error("[admin]", err);
    return { ok: false, message: "Couldn't save — please try again", at: Date.now() };
  }
}

const text = (fd: FormData, k: string) => {
  const v = fd.get(k);
  return typeof v === "string" && v.trim() !== "" ? v.trim() : null;
};
const req = (fd: FormData, k: string, label: string) => {
  const v = text(fd, k);
  if (!v) throw new Error(`${label} is required`);
  return v;
};
const bool = (fd: FormData, k: string) => fd.get(k) === "on";
const int = (fd: FormData, k: string) => {
  const n = Number(text(fd, k) ?? 0);
  return Number.isFinite(n) ? Math.round(n) : 0;
};
/** One item per line, blank lines ignored. */
const lines = (fd: FormData, k: string) =>
  String(fd.get(k) ?? "")
    .split(/\r?\n/)
    .map((s) => s.trim())
    .filter(Boolean);
/** Comma-separated tags. */
const tags = (fd: FormData, k: string) =>
  String(fd.get(k) ?? "")
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
const link = (fd: FormData, k: string) => {
  const v = text(fd, k);
  if (!v) return null;
  if (v.startsWith("/")) return v;
  return z.url({ error: "Links must start with https:// (or / for a file on this site)" }).parse(v);
};
const id = (fd: FormData) => z.uuid().parse(fd.get("id"));

function refresh(...paths: string[]) {
  revalidatePath("/");
  for (const p of paths) revalidatePath(p);
}

/* ---------- login ---------- */

export async function login(_prev: { error: string }, fd: FormData) {
  const ok = await checkPassword(String(fd.get("password") ?? ""));
  if (!ok) {
    await new Promise((r) => setTimeout(r, 800)); // slow down guessing
    return { error: "That password isn't right." };
  }
  await startSession();
  redirect("/admin");
}

export async function logout() {
  await endSession();
  redirect("/admin/login");
}

/* ---------- enquiries ---------- */

const statuses = ["new", "contacted", "quoted", "won", "lost"] as const;

export async function updateEnquiry(_prev: FormState, fd: FormData): Promise<FormState> {
  return run(async () => {
    const status = z.enum(statuses).parse(fd.get("status"));
    await getDb()
      .update(schema.enquiries)
      .set({ status, notes: text(fd, "notes") })
      .where(eq(schema.enquiries.id, id(fd)));
    refresh("/admin", "/admin/enquiries");
  });
}

export async function deleteEnquiry(_prev: FormState, fd: FormData): Promise<FormState> {
  try {
    await requireAdmin();
    await getDb().delete(schema.enquiries).where(eq(schema.enquiries.id, id(fd)));
  } catch (err) {
    unstable_rethrow(err);
    console.error("[admin]", err);
    return { ok: false, message: "Couldn't delete — please try again", at: Date.now() };
  }
  refresh("/admin", "/admin/enquiries");
  redirect("/admin/enquiries");
}

/* ---------- packages ---------- */

export async function savePackage(_prev: FormState, fd: FormData): Promise<FormState> {
  return run(async () => {
    const pkgId = z.enum(["bronze", "silver", "gold"]).parse(fd.get("id"));
    const items = lines(fd, "items");
    if (items.length === 0) throw new Error("Add at least one thing that's included");
    await getDb()
      .update(schema.packages)
      .set({ name: req(fd, "name", "Name"), intro: req(fd, "intro", "Short description"), price: req(fd, "price", "Price"), badge: text(fd, "badge"), items, updatedAt: new Date() })
      .where(eq(schema.packages.id, pkgId));
    refresh("/admin/packages");
  });
}

/* ---------- settings (contact details, care plan) ---------- */

export async function saveSettings(_prev: FormState, fd: FormData): Promise<FormState> {
  return run(async () => {
    const db = getDb();
    const email = text(fd, "email");
    // Allow the "[yourdomain]" placeholder until the real address exists; otherwise it must be a real email.
    if (email && !email.includes("[")) z.email({ error: "That email address doesn't look right" }).parse(email);
    for (const key of settingKeys) {
      if (!fd.has(key)) continue;
      const value = text(fd, key) ?? "";
      await db
        .insert(schema.siteSettings)
        .values({ key, value })
        .onConflictDoUpdate({ target: schema.siteSettings.key, set: { value, updatedAt: sql`now()` } });
    }
    refresh("/admin/settings", "/admin/packages");
  });
}

/* ---------- portfolio ---------- */

function projectFields(fd: FormData) {
  return {
    name: req(fd, "name", "Name"),
    summary: req(fd, "summary", "Description"),
    tags: tags(fd, "tags"),
    url: link(fd, "url"),
    imageUrl: link(fd, "imageUrl"),
    sortOrder: int(fd, "sortOrder"),
    published: bool(fd, "published"),
  };
}

export async function saveProject(_prev: FormState, fd: FormData): Promise<FormState> {
  return run(async () => {
    const fields = projectFields(fd);
    const db = getDb();
    if (fd.get("id")) await db.update(schema.projects).set({ ...fields, updatedAt: new Date() }).where(eq(schema.projects.id, id(fd)));
    else await db.insert(schema.projects).values(fields);
    refresh("/admin/portfolio");
  });
}

export async function deleteProject(_prev: FormState, fd: FormData): Promise<FormState> {
  return run(async () => {
    await getDb().delete(schema.projects).where(eq(schema.projects.id, id(fd)));
    refresh("/admin/portfolio");
  }, "Deleted");
}

/* ---------- FAQs ---------- */

function faqFields(fd: FormData) {
  return {
    question: req(fd, "question", "Question"),
    answer: req(fd, "answer", "Answer"),
    sortOrder: int(fd, "sortOrder"),
    published: bool(fd, "published"),
  };
}

export async function saveFaq(_prev: FormState, fd: FormData): Promise<FormState> {
  return run(async () => {
    const fields = faqFields(fd);
    const db = getDb();
    if (fd.get("id")) await db.update(schema.faqs).set({ ...fields, updatedAt: new Date() }).where(eq(schema.faqs.id, id(fd)));
    else await db.insert(schema.faqs).values(fields);
    refresh("/admin/faqs");
  });
}

export async function deleteFaq(_prev: FormState, fd: FormData): Promise<FormState> {
  return run(async () => {
    await getDb().delete(schema.faqs).where(eq(schema.faqs.id, id(fd)));
    refresh("/admin/faqs");
  }, "Deleted");
}
