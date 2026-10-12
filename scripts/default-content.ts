/**
 * The starting content for the admin-managed tables, taken from src/content/site.ts.
 * Used by `npm run db:seed` and by `npm run db:neon-sql` (which writes a script to paste into Neon's SQL Editor).
 */
import { business, carePlan, faqs, packages, portfolio } from "../src/content/site";

export const defaultSettings: Record<string, string> = {
  email: business.email,
  phone: business.phone,
  address: business.address,
  area: business.area,
  reply_time: business.replyTime,
  care_plan_price: carePlan.price,
  care_plan_body: carePlan.body,
};

export const defaultPackages = packages.map((p, i) => ({
  id: p.id,
  name: p.name,
  intro: p.intro,
  price: p.price,
  badge: p.badge ?? null,
  items: p.items,
  sortOrder: i,
}));

export const defaultProjects = portfolio.map((p, i) => ({
  name: p.name,
  summary: p.summary,
  tags: p.tags,
  url: p.url === "#" ? null : p.url,
  imageUrl: p.image,
  sortOrder: i,
}));

export const defaultFaqs = faqs.map((f, i) => ({ question: f.q, answer: f.a, sortOrder: i }));
