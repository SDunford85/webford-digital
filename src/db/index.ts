import { neon } from "@neondatabase/serverless";
import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import * as schema from "./schema";

let _db: NeonHttpDatabase<typeof schema> | null = null;

/**
 * Neon over HTTP — works on Cloudflare Workers (no TCP sockets needed).
 * Created lazily so the site still builds and runs without DATABASE_URL set.
 */
export function getDb() {
  if (_db) return _db;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL is not set");
  _db = drizzle(neon(url), { schema });
  return _db;
}

export function hasDb() {
  return Boolean(process.env.DATABASE_URL);
}

export { schema };
