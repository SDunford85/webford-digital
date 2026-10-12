import { sql } from "drizzle-orm";
import { getDb, hasDb } from "@/db";

export const dynamic = "force-dynamic";

/**
 * Setup check: shows whether each required setting is present (yes/no only — never the values)
 * and whether the database answers. Open /api/status in a browser.
 */
export async function GET() {
  let databaseConnects = false;
  if (hasDb()) {
    try {
      await getDb().execute(sql`select 1`);
      databaseConnects = true;
    } catch {
      databaseConnects = false;
    }
  }
  const secret = process.env.ADMIN_SESSION_SECRET ?? "";
  return Response.json(
    {
      DATABASE_URL: hasDb() ? "set" : "MISSING",
      database_connects: databaseConnects,
      ADMIN_PASSWORD: process.env.ADMIN_PASSWORD ? "set" : "MISSING",
      ADMIN_SESSION_SECRET: secret ? (secret.length >= 32 ? "set" : "TOO SHORT (needs 32+ characters)") : "MISSING",
      RESEND_API_KEY: process.env.RESEND_API_KEY ? "set" : "not set (enquiry emails off)",
      ENQUIRY_EMAIL_TO: process.env.ENQUIRY_EMAIL_TO ? "set" : "not set (enquiry emails off)",
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
