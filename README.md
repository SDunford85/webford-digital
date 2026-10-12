# Webford Digital Services website

The website for **Webford Digital Services**: bespoke websites with a personal service.

**Stack:** Next.js 16 on **Cloudflare Workers** (via OpenNext) · **Neon** Postgres with Drizzle ORM. Same setup as Strength Circus, WHEA GB and Bake Chic.

Text in `[SQUARE BRACKETS]` still needs filling in before launch. Almost all of it lives in **`src/content/site.ts`**: prices, package limits, contact details, portfolio links and FAQs.

---

## What's built (phase 1)

- Home page from the approved wireframe: hero, selling points, bespoke vs template comparison, services, portfolio, admin showcase, how it works, Bronze/Silver/Gold packages, care plan, about, FAQs, enquiry form, footer
- Enquiry form: validates, blocks spam bots (honeypot) and **saves to the `enquiries` table** once `DATABASE_URL` is set
- Placeholder pages for terms, privacy and cookies (linked from the footer)
- Logo files in `public/brand/` (SVG with text as outlines, plus PNGs) and the browser/phone icons (`src/app/icon.png`, `apple-icon.png`)
- Hidden from search engines until launch (`allowIndexing` in `src/content/site.ts`)
- `/api/status` setup check

**Next phases:** admin site (packages, portfolio, FAQs, enquiries), email notification for new enquiries, virtual agent, real terms and privacy wording, portfolio case-study pages.

## 1. Run it locally

```bash
npm ci               # install exactly what's in package-lock.json (use this after every git pull)
npm run dev          # http://localhost:3004
```

The home page works without the database. The enquiry form shows a friendly "not connected yet" message until it has one.

## 2. Create the database table (Neon)

1. Neon project: `webford-digital`, region **AWS Europe West 2 (London)**.
2. Copy `.env.example` to **both** `.env` and `.dev.vars` (Windows: `copy .env.example .env` and `copy .env.example .dev.vars`).
3. Paste your Neon **pooled** connection string into `DATABASE_URL` in both files. These files are git-ignored, so never commit them.
4. Run:

```bash
npm run db:migrate   # creates the enquiries table from drizzle/0000_init.sql
```

See enquiries with `npm run db:studio` (until the admin site is built).

## 3. Deploy to Cloudflare

**Cloudflare → Workers & Pages → Create → Import a repository → `SDunford85/webford-digital`**

| Setting | Value |
|---|---|
| Project name | `webford-digital` (must match `name` in `wrangler.jsonc`) |
| Build command | `npx opennextjs-cloudflare build` |
| Deploy command | `npx opennextjs-cloudflare deploy` |
| Root directory | `/` |

Then add the database secret from your own PC, in the project folder:

```
npx wrangler login                     # one-off
npx wrangler secret put DATABASE_URL   # Neon pooled connection string (no quotes)
```

⚠️ If you use the dashboard instead: add it under **Workers → webford-digital → Settings → Variables and secrets** (type **Secret**), **not** the "Variables and secrets" inside the **Build** section, which the running site never sees.

**Check:** open `/api/status` on the site. It should show `"DATABASE_URL": "set"` and `"database_connects": true`.

Every push to `main` now deploys automatically. Update `NEXT_PUBLIC_SITE_URL` in `wrangler.jsonc` if your workers.dev address differs.

## 4. Adding your screenshots and photo

- Portfolio: save each screenshot as WebP in `public/images/work/` (e.g. `bake-chic.webp`, about 1600×900) and set `image: "/images/work/bake-chic.webp"` for that project in `src/content/site.ts`. Add each live address to `url`.
- About: save your photo as `public/images/steve.webp` and swap it in at the "[Photo of Steve]" box in `src/app/(site)/page.tsx`.

## 5. Launch checklist

- [ ] All `[brackets]` replaced (search the project for `[`)
- [ ] Terms, privacy and cookie pages written and checked
- [ ] Domain connected in Cloudflare and `NEXT_PUBLIC_SITE_URL` updated
- [ ] Test enquiry received
- [ ] `allowIndexing = true` in `src/content/site.ts`

## Brand

| | |
|---|---|
| Black | `#0B0D12` |
| Navy | `#0C1A3A` |
| Webford blue | `#1846C8` (lighter `#4C7BF4` for the logo on black) |
| Gold | `#D4A72C`: fills, borders and text on dark backgrounds only. For gold-toned text on white use `#8A6510` |
| Fonts | Sora Bold (headings, logo) · DM Sans (body) |

Colours are defined once in `src/app/globals.css`.
