import "server-only";
import { cache } from "react";
import { asc, eq } from "drizzle-orm";
import { getDb, hasDb, schema } from "@/db";
import * as fallback from "@/content/site";

/*
 * The homepage content: from the database (edited in /admin), falling back to
 * src/content/site.ts for anything that hasn't been set up yet or if the database is unreachable.
 */

export type Business = typeof fallback.business;
export type PackageView = fallback.Package;
export type ProjectView = fallback.Project;
export type FaqView = { q: string; a: string };

export type SiteContent = {
  business: Business;
  carePlan: { price: string; body: string };
  hostingPlan: { price: string; body: string };
  spreadCost: { title: string; body: string };
  packages: PackageView[];
  portfolio: ProjectView[];
  faqs: FaqView[];
};

export const settingKeys = [
  "email",
  "phone",
  "address",
  "area",
  "reply_time",
  "care_plan_price",
  "care_plan_body",
  "hosting_price",
  "hosting_body",
  "spread_title",
  "spread_body",
] as const;
export type SettingKey = (typeof settingKeys)[number];

function contactHrefs(email: string, phone: string) {
  return { emailHref: `mailto:${email}`, phoneHref: `tel:${phone.replace(/[^\d+]/g, "")}` };
}

export async function getSettings(): Promise<Partial<Record<SettingKey, string>>> {
  if (!hasDb()) return {};
  const rows = await getDb().select().from(schema.siteSettings);
  return Object.fromEntries(rows.map((r) => [r.key, r.value]));
}

/** Cached per request, so the layout and the page share one set of database reads. */
export const getSiteContent = cache(async function getSiteContent(): Promise<SiteContent> {
  const base: SiteContent = {
    business: fallback.business,
    carePlan: fallback.carePlan,
    hostingPlan: fallback.hostingPlan,
    spreadCost: fallback.spreadCost,
    packages: fallback.packages,
    portfolio: fallback.portfolio,
    faqs: fallback.faqs,
  };
  if (!hasDb()) return base;

  try {
    const db = getDb();
    const [settings, pkgs, projects, faqs] = await Promise.all([
      getSettings(),
      db.select().from(schema.packages).orderBy(asc(schema.packages.sortOrder)),
      db.select().from(schema.projects).where(eq(schema.projects.published, true)).orderBy(asc(schema.projects.sortOrder)),
      db.select().from(schema.faqs).where(eq(schema.faqs.published, true)).orderBy(asc(schema.faqs.sortOrder)),
    ]);

    const email = settings.email ?? base.business.email;
    const phone = settings.phone ?? base.business.phone;
    return {
      business: {
        ...base.business,
        email,
        phone,
        ...contactHrefs(email, phone),
        address: settings.address ?? base.business.address,
        area: settings.area ?? base.business.area,
        replyTime: settings.reply_time ?? base.business.replyTime,
      },
      carePlan: { price: settings.care_plan_price ?? base.carePlan.price, body: settings.care_plan_body ?? base.carePlan.body },
      hostingPlan: { price: settings.hosting_price || base.hostingPlan.price, body: settings.hosting_body || base.hostingPlan.body },
      spreadCost: { title: settings.spread_title || base.spreadCost.title, body: settings.spread_body || base.spreadCost.body },
      packages: pkgs.length
        ? pkgs
            .filter((p): p is typeof p & { id: PackageView["id"] } => ["bronze", "silver", "gold"].includes(p.id))
            .map((p) => ({ id: p.id, name: p.name, intro: p.intro, price: p.price, items: p.items, badge: p.badge ?? undefined }))
        : base.packages,
      portfolio: projects.length
        ? projects.map((p) => ({
            name: p.name,
            summary: p.summary,
            tags: p.tags,
            url: p.url || "#",
            // No screenshot set in the admin yet? Use the built-in one for the same site, if there is one.
            image: p.imageUrl || base.portfolio.find((d) => d.name.toLowerCase() === p.name.toLowerCase())?.image || null,
          }))
        : (await db.$count(schema.projects)) > 0
          ? [] // everything hidden on purpose
          : base.portfolio,
      faqs: faqs.length ? faqs.map((f) => ({ q: f.question, a: f.answer })) : base.faqs,
    };
  } catch (err) {
    console.error("[content] falling back to built-in content", err);
    return base;
  }
});
