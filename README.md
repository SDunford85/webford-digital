# Hexford Digital website

The website for **Hexford Digital**: bespoke websites with a personal service.

**Stack:** Next.js 16 on **Cloudflare Workers** (via OpenNext) · **Neon** Postgres with Drizzle ORM. Same setup as Strength Circus, WHEA GB and Bake Chic.

Text in `[SQUARE BRACKETS]` still needs filling in before launch. Once the database is set up, you change it all from the **admin site** at `/admin`: prices, packages, contact details, portfolio and FAQs. (`src/content/site.ts` holds the starting text and is only used as a fallback.)

---

## What's built

**Phase 1:** homepage from the approved wireframe, enquiry form (validates, blocks spam bots, saves to the database), placeholder legal pages, logo files in `public/brand/`, browser/phone icons, hidden from search engines until launch, `/api/status` setup check.

**Phase 2: admin site at `/admin`** (password protected)
- **Overview:** latest enquiries and counts
- **Enquiries:** everyone who filled in the form; filter by status (New, Contacted, Quoted, Won, Lost), add private notes, reply by email, delete
- **Packages & prices:** Bronze, Silver and Gold (name, price, description, what's included, badge) plus the care plan
- **Portfolio:** add, edit, reorder, hide or delete websites (description, tags, live link, screenshot)
- **FAQs:** add, edit, reorder, hide or delete
- **Contact details:** email, phone, address, area, reply time
- **Email alert** to you for every new enquiry (optional, via Resend)

Changes show on the website straight away.

**Next:** virtual agent (using your FAQs), real terms and privacy wording, portfolio case-study pages, image uploads in the admin.

## 1. Set up the database (Neon), no PC needed

Open your Neon project (`webford-digital`, London region) → **SQL Editor**, paste in the whole of **`scripts/neon-setup.sql`** and click **Run**.

It's safe to run more than once: it only creates what's missing, only fills empty tables with the starting content, and never touches your enquiries. Run it again whenever a new phase adds tables.

<details><summary>Or from your PC</summary>

```bash
npm ci
copy .env.example .env          # then paste your Neon pooled connection string into DATABASE_URL
npm run db:migrate              # creates/updates the tables
npm run db:seed                 # adds the starting content to empty tables
```

Both routes record the same migrations, so you can switch between them.
</details>

## 2. Add the secrets in Cloudflare

**Workers & Pages → webford-digital → Settings → Variables and secrets → Add**, type **Secret** (not the Build section):

| Name | Value |
|---|---|
| `DATABASE_URL` | Neon pooled connection string (already done) |
| `ADMIN_PASSWORD` | the password you'll log in with: long and unique |
| `ADMIN_SESSION_SECRET` | 32+ random characters. Generate one at a password generator, or run `node -e "console.log(crypto.randomUUID()+crypto.randomUUID())"` |
| `RESEND_API_KEY` | *(optional, for email alerts)* from resend.com → API Keys |
| `ENQUIRY_EMAIL_TO` | *(optional)* where alerts go. Until you verify your own domain in Resend, this must be the email address you signed up to Resend with |
| `ENQUIRY_EMAIL_FROM` | *(optional)* leave unset to use `Hexford Digital website <onboarding@resend.dev>`; once your domain is verified in Resend, e.g. `Hexford Digital website <hello@yourdomain.co.uk>` |

**Check:** open `/api/status` on the site. Everything should say `"set"` / `true` (it shows yes/no only, never the values). Then go to `/admin` and log in.

## 3. Deploy to Cloudflare

Already connected: every push to `main` deploys automatically. (Original settings: build command `npx opennextjs-cloudflare build`, deploy command `npx opennextjs-cloudflare deploy`, project name `webford-digital`.)

## Run it locally (optional)

```bash
npm ci               # install exactly what's in package-lock.json (use this after every git pull)
npm run dev          # http://localhost:3004
```

Copy `.env.example` to `.env` **and** `.dev.vars` and fill them in. The homepage works without a database; the admin needs one.

## 4. Adding your screenshots and photo

- Portfolio: save each screenshot as WebP in `public/images/work/` (e.g. `bake-chic.webp`, about 1600×900, under 300 KB) and push it to GitHub (on github.com: open the folder → **Add file → Upload files**). Then in **Admin → Portfolio**, put `/images/work/bake-chic.webp` in that website's **Screenshot** box and add its live address.
- About: save your photo as `public/images/steve.webp` and swap it in at the "[Photo of Steve]" box in `src/app/(site)/page.tsx`.

## 5. Launch checklist

- [ ] All `[brackets]` replaced: check every admin page, then the homepage
- [ ] Terms, privacy and cookie pages written and checked
- [ ] Domain connected in Cloudflare and `NEXT_PUBLIC_SITE_URL` updated
- [ ] Test enquiry received, and the email alert arrives
- [ ] `allowIndexing = true` in `src/content/site.ts`

## Brand

| | |
|---|---|
| Black | `#0B0D12` |
| Navy | `#0C1A3A` |
| Hexford blue | `#1846C8` (lighter `#4C7BF4` on black) |
| Gold | `#D4A72C`: logo, fills, borders and text on dark backgrounds. For gold-toned text on white use `#8A6510` |
| Fonts | Saira (logo wordmark, outlined in the logo files) · Sora Bold (headings) · DM Sans (body) |

Colours are defined once in `src/app/globals.css`.

**Logo:** the gold circuit hexagon. Files are in `public/brand/` (SVG) and `public/brand/png/` (PNG):

| File | Use it for |
|---|---|
| `hexford-logo.svg` / `…-2000w.png` | White backgrounds: documents, invoices, proposals |
| `hexford-logo-reversed` | Navy or black backgrounds: the website, social banners |
| `hexford-logo-white` | One-colour white, for photos or coloured backgrounds |
| `hexford-logo-stacked…` | Square spaces: social profiles, signage (same three colourways) |
| `hexford-icon…` | The hexagon on its own (gold for dark, navy for white, white) |
| `hexford-icon-tile`, `hexford-favicon` | App icon and browser tab (the favicon is simplified for tiny sizes) |
