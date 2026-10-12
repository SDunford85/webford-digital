/**
 * Adds the starting packages, portfolio, FAQs and settings — only into tables that are still empty,
 * so it never overwrites anything you've changed in the admin site.
 *   npm run db:seed
 */
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../src/db/schema";
import { defaultFaqs, defaultPackages, defaultProjects, defaultSettings } from "./default-content";

async function main() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set (put it in .env)");
  const db = drizzle(neon(url), { schema });

  if ((await db.$count(schema.siteSettings)) === 0) {
    await db.insert(schema.siteSettings).values(Object.entries(defaultSettings).map(([key, value]) => ({ key, value })));
    console.log("✓ settings");
  }
  if ((await db.$count(schema.packages)) === 0) {
    await db.insert(schema.packages).values(defaultPackages);
    console.log("✓ packages");
  }
  if ((await db.$count(schema.projects)) === 0) {
    await db.insert(schema.projects).values(defaultProjects);
    console.log("✓ portfolio");
  }
  if ((await db.$count(schema.faqs)) === 0) {
    await db.insert(schema.faqs).values(defaultFaqs);
    console.log("✓ FAQs");
  }
  console.log("Done.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
