import { pgTable, pgEnum, text, timestamp, uuid, index, boolean } from "drizzle-orm/pg-core";

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
