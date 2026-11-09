-- New prices (9 Nov 2026): Bronze £399, Silver £795, Gold £1,495, care plan £25/month.
-- Paste into the Neon SQL Editor and click Run. Safe to run more than once.
BEGIN;
UPDATE packages SET price = '£399', updated_at = now() WHERE id = 'bronze';
UPDATE packages SET price = '£795', updated_at = now() WHERE id = 'silver';
UPDATE packages SET price = '£1,495', updated_at = now() WHERE id = 'gold';
UPDATE site_settings SET value = '£25/month' WHERE key = 'care_plan_price';
-- The quote calculator follows the package prices; clear any older calculator starting prices so they don't override them
DELETE FROM site_settings WHERE key IN ('quote_bronze', 'quote_silver', 'quote_gold');
COMMIT;
