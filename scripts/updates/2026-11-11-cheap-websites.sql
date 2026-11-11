-- "Why not just buy a cheap website?" FAQ (11 Nov 2026). Paste into the Neon SQL Editor and click Run. Safe to run more than once.
BEGIN;
INSERT INTO faqs (question, answer, sort_order)
  SELECT 'Why not just buy a cheap website from a social media ad?',
         'Some are fine, but check the monthly fee, the minimum term and who owns the website. A £199 website at £25 a month costs £1,099 over three years. A Hexford Bronze website costs £519 over the same time, with no VAT, and it’s yours.',
         9
  WHERE NOT EXISTS (SELECT 1 FROM faqs WHERE question = 'Why not just buy a cheap website from a social media ad?');
COMMIT;
