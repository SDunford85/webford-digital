-- UK-wide wording (26 Oct 2026). Paste into the Neon SQL Editor and click Run. Safe to run more than once.
BEGIN;
-- "Where I work" line in the contact section (only if it still has the old wording)
UPDATE site_settings SET value = 'Anywhere in the UK, by video call, phone and email'
  WHERE key = 'area' AND value = 'North Yorkshire, working UK-wide';
-- New FAQ, shown just before "Do you offer hosting and support?"
INSERT INTO faqs (question, answer, sort_order)
  SELECT 'Do you only work with local businesses?', 'No. I work with businesses anywhere in the UK. Everything runs smoothly by video call, phone and email, and you get the same one-to-one service wherever you are.', 7
  WHERE NOT EXISTS (SELECT 1 FROM faqs WHERE question = 'Do you only work with local businesses?');
UPDATE faqs SET sort_order = 8 WHERE question = 'Do you offer hosting and support?' AND sort_order < 8;
COMMIT;
