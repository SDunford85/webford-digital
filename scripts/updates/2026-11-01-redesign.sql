-- Redesign update (1 Nov 2026): adds the optional "before" screenshot for portfolio projects
-- (shows a before-and-after slider on the Our work page).
-- Paste into the Neon SQL Editor and click Run. Safe to run more than once.
BEGIN;
ALTER TABLE "projects" ADD COLUMN IF NOT EXISTS "before_image_url" text;
CREATE SCHEMA IF NOT EXISTS "drizzle";
CREATE TABLE IF NOT EXISTS "drizzle"."__drizzle_migrations" (id SERIAL PRIMARY KEY, hash text NOT NULL, created_at bigint);
INSERT INTO "drizzle"."__drizzle_migrations" ("hash", "created_at") SELECT '4e2e939386575238bef5f4c920f6ddbc98aedbe7103635f70f02ebefdf0a7694', 1793563421240 WHERE NOT EXISTS (SELECT 1 FROM "drizzle"."__drizzle_migrations" WHERE "created_at" = 1793563421240);
COMMIT;
