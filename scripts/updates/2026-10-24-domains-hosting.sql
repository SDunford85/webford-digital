-- Domains, hosting and email update (24 Oct 2026).
-- Paste into the Neon SQL Editor and click Run. Safe to run more than once:
-- it only adds items and FAQs that aren't there yet, and only rewrites the two FAQ answers below.
BEGIN;

-- Packages: new bullet points (added just above the post-launch support line)
UPDATE packages SET items = items[1:array_length(items,1)-1] || ARRAY['Your domain name, registered to you (first year included)'] || items[array_length(items,1):], updated_at = now()
  WHERE id = 'bronze' AND NOT ('Your domain name, registered to you (first year included)' = ANY(items));
UPDATE packages SET items = items[1:array_length(items,1)-1] || ARRAY['Email forwarding, e.g. hello@yourbusiness.co.uk'] || items[array_length(items,1):], updated_at = now()
  WHERE id = 'bronze' AND NOT ('Email forwarding, e.g. hello@yourbusiness.co.uk' = ANY(items));
UPDATE packages SET items = items[1:array_length(items,1)-1] || ARRAY['Move your existing site and domain to us'] || items[array_length(items,1):], updated_at = now()
  WHERE id = 'silver' AND NOT ('Move your existing site and domain to us' = ANY(items));
UPDATE packages SET items = items[1:array_length(items,1)-1] || ARRAY['Business email set-up'] || items[array_length(items,1):], updated_at = now()
  WHERE id = 'gold' AND NOT ('Business email set-up' = ANY(items));

-- FAQs: updated answers
UPDATE faqs SET answer = 'Yes. Your domain is always registered in your business’s name, and once the build is paid for, the website is yours too. If you ever leave, I’ll transfer the domain and hand over your site’s code and content.', updated_at = now() WHERE question = 'Will I own my website and domain?';
UPDATE faqs SET answer = 'Yes. Hosting only is £5 a month, or choose the care plan for updates, backups and small changes each month. Both are optional and cancel with a month’s notice.', updated_at = now() WHERE question = 'Do you offer hosting and support?';

-- FAQs: new questions
INSERT INTO faqs (question, answer, sort_order) SELECT 'Do I need to sort out my own domain and hosting?', 'No, I handle it all. I’ll help you choose a domain, register it in your name (the first year is included), and host your site from £5 a month, with renewals included.', 4
  WHERE NOT EXISTS (SELECT 1 FROM faqs WHERE question = 'Do I need to sort out my own domain and hosting?');
INSERT INTO faqs (question, answer, sort_order) SELECT 'I already have a website and domain. Can you take it over?', 'Yes. You can keep your domain where it is and I’ll point it to your new site, or move it across so everything is in one place and one bill. I check your email settings first, so nothing stops working during the switch.', 5
  WHERE NOT EXISTS (SELECT 1 FROM faqs WHERE question = 'I already have a website and domain. Can you take it over?');
INSERT INTO faqs (question, answer, sort_order) SELECT 'Can I have a business email address?', 'Yes. Every site includes email forwarding, so messages to hello@yourbusiness.co.uk arrive in the inbox you already use. If you need full mailboxes, I can set up Google Workspace or a lower-cost alternative for you.', 6
  WHERE NOT EXISTS (SELECT 1 FROM faqs WHERE question = 'Can I have a business email address?');
UPDATE faqs SET sort_order = 7 WHERE question = 'Do you offer hosting and support?' AND sort_order < 7;

COMMIT;
