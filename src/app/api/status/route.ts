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
  return Response.json(
    {
      DATABASE_URL: hasDb() ? "set" : "MISSING",
      database_connects: databaseConnects,
    },
    { headers: { "Cache-Control": "no-store" } },
  );
}
