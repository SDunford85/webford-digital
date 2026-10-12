import { pgTable, pgEnum, text, timestamp, uuid, index, boolean, integer } from "drizzle-orm/pg-core";

/*
 * Webford Digital Services database (Neon Postgres).
 * Phase 1: enquiries from the contact form.
 * Phase 2 adds the content Steve edits from the admin site (packages, portfolio, FAQs).
 */

export const enquiryStatus = pgEnum("enquiry_status", ["new", "contacted", "quoted", "won", "lost"]);

export const enquiries = pgTable(
  "enquiries",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    business: text("business"),
    email: text("email").notNull(),
    phone: text("phone"),
    need: text("need"), // e.g. "Online shop"
    packageInterest: text("package_interest"), // Bronze / Silver / Gold / Not sure yet
    message: text("message").notNull(),
    consent: boolean("consent").notNull().default(false),
    status: enquiryStatus("status").notNull().default("new"),
    notes: text("notes"), // Steve's private notes (admin site, phase 2)
    createdAt: timestamp("created_at").notNull().defaultNow(),
  },
  (t) => [index("enquiries_created_idx").on(t.createdAt)],
);

export type Enquiry = typeof enquiries.$inferSelect;

/* ------------------------------------------------------------------ */
/* Content Steve edits from the admin site (phase 2)                    */
/* ------------------------------------------------------------------ */

/** Small key/value facts: contact details, reply time, care plan price. */
export const siteSettings = pgTable("site_settings", {
  key: text("key").primaryKey(),
  value: text("value").notNull(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

/** Bronze, Silver and Gold. `id` is fixed ("bronze" | "silver" | "gold") so the styling stays matched. */
export const packages = pgTable("packages", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  intro: text("intro").notNull(),
  price: text("price").notNull(), // shown after "From", e.g. "£995"
  badge: text("badge"), // e.g. "Most complete"
  items: text("items").array().notNull().default([]), // one line per bullet point
  sortOrder: integer("sort_order").notNull().default(0),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

/** Portfolio projects shown in "Recent work". */
export const projects = pgTable(
  "projects",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    summary: text("summary").notNull(),
    tags: text("tags").array().notNull().default([]),
    url: text("url"), // live site address
    imageUrl: text("image_url"), // e.g. /images/work/bake-chic.webp
    sortOrder: integer("sort_order").notNull().default(0),
    published: boolean("published").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [index("projects_sort_idx").on(t.sortOrder)],
);

export const faqs = pgTable(
  "faqs",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    question: text("question").notNull(),
    answer: text("answer").notNull(),
    sortOrder: integer("sort_order").notNull().default(0),
    published: boolean("published").notNull().default(true),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").notNull().defaultNow(),
  },
  (t) => [index("faqs_sort_idx").on(t.sortOrder)],
);

export type Package = typeof packages.$inferSelect;
export type ProjectRow = typeof projects.$inferSelect;
export type Faq = typeof faqs.$inferSelect;
