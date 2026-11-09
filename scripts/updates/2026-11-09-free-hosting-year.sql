-- First year's hosting free (9 Nov 2026). Paste into the Neon SQL Editor and click Run. Safe to run more than once.
BEGIN;
-- Packages: add the line as the second item of each package
UPDATE packages SET items = items[1:1] || ARRAY['First year’s hosting free'] || items[2:], updated_at = now() WHERE NOT ('First year’s hosting free' = ANY(items));
-- Hosting only description (only if you'd saved your own in the admin)
UPDATE site_settings SET value = 'First year free with every website, then £5 a month. Fast, secure hosting with a security certificate, your domain renewal and email forwarding included. Changes are charged only when you need them.' WHERE key = 'hosting_body';
-- FAQs that mention hosting
UPDATE faqs SET answer = 'No, I handle it all. I’ll help you choose a domain, register it in your name (the first year is included), and host your site with the first year free, then £5 a month with renewals included.', updated_at = now() WHERE question = 'Do I need to sort out my own domain and hosting?';
UPDATE faqs SET answer = 'Yes. Every website comes with its first year of hosting free, then Hosting only is £5 a month. Or choose the care plan for updates, backups and small changes each month. Both are optional and cancel with a month’s notice.', updated_at = now() WHERE question = 'Do you offer hosting and support?';
-- Page allowances now match the quote calculator (5 and 10 pages)
UPDATE packages SET items = array_replace(items, 'Bespoke design, up to [5] pages', 'Bespoke design, up to 5 pages') WHERE id = 'bronze';
UPDATE packages SET items = array_replace(items, 'Everything in Bronze, up to [10] pages', 'Everything in Bronze, up to 10 pages') WHERE id = 'silver';
COMMIT;
