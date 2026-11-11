/**
 * The building blocks of the public pages. The homepage uses the short versions; the detail pages
 * (/why, /services, /work, /pricing) use the full ones. Content comes from getSiteContent() or src/content/site.ts.
 */
import Link from "next/link";
import { AdminPreview } from "./AdminPreview";
import { BeforeAfter } from "./BeforeAfter";
import { EnquiryForm } from "./EnquiryForm";
import { Check, Icon } from "./Icon";
import { LogoMark } from "./Logo";
import { QuoteCalculator } from "./QuoteCalculator";
import { AskAssistantButton } from "./AskAssistantButton";
import { benefits, buyerQuestions, comparison, costComparison, costYears, features, hostingFreeMonths, oneStop, steps, topBenefits } from "@/content/site";
import type { SiteContent } from "@/lib/content";

const pad = "px-4 py-12 sm:px-6 sm:py-16 lg:py-24";
const dot: Record<string, string> = { bronze: "bg-[#a86b3c]", silver: "bg-[#9ca3af]", gold: "bg-gold" };

function Heading({ kicker, title, intro, id, dark = false, as: H = "h2" }: { kicker: string; title: React.ReactNode; intro?: React.ReactNode; id: string; dark?: boolean; as?: "h1" | "h2" }) {
  return (
    <div className="flex max-w-[720px] flex-col gap-3.5">
      <p className={`kicker m-0 ${dark ? "text-gold" : "text-gold-text"}`}>{kicker}</p>
      <H id={id} className={H === "h1" ? "m-0 font-display text-[clamp(34px,5vw,54px)] font-bold leading-[1.06] tracking-[-0.02em]" : "h2 m-0"}>
        {title}
      </H>
      {intro ? <p className={`m-0 ${dark ? "text-muted-dark" : "text-muted"}`}>{intro}</p> : null}
    </div>
  );
}

function More({ href, children, dark = false }: { href: string; children: React.ReactNode; dark?: boolean }) {
  return (
    <Link href={href} className={`self-start font-bold no-underline ${dark ? "text-gold hover:text-white" : "text-blue hover:text-blue-dark"}`}>
      {children} <span aria-hidden>→</span>
    </Link>
  );
}

/* ---------- page header for the detail pages ---------- */

export function PageHero({ kicker, title, intro }: { kicker: string; title: React.ReactNode; intro: React.ReactNode }) {
  return (
    <section aria-labelledby="page-h" className="relative overflow-hidden bg-ink text-white">
      <LogoMark tone="light" className="pointer-events-none absolute -right-20 -top-16 h-[360px] w-auto opacity-[0.07]" />
      <div className="container-wf relative px-4 pb-14 pt-14 sm:px-6 lg:pb-20 lg:pt-20">
        <Heading kicker={kicker} title={title} intro={intro} id="page-h" dark as="h1" />
      </div>
    </section>
  );
}

/* ---------- why ---------- */

export function TopBenefits() {
  return (
    <section aria-labelledby="why-h" className="bg-navy text-white">
      <div className={`container-wf flex flex-col gap-10 ${pad}`}>
        <Heading
          kicker="Why Hexford"
          id="why-h"
          dark
          title={
            <>
              Don&apos;t rent a website. <span className="text-gold">Own one.</span>
            </>
          }
        />
        <ul className="m-0 grid list-none gap-4 p-0 md:grid-cols-3">
          {topBenefits.map((b, i) => (
            <li key={b.title} className={`flex gap-5 rounded-2xl border p-6 md:flex-col md:gap-3 md:p-7 ${i === 0 ? "border-gold bg-ink" : "border-navy-line bg-[#11234a]"}`}>
              <span className="w-[84px] shrink-0 font-display text-[34px] font-bold leading-none tracking-[-0.02em] text-gold md:w-auto md:text-[46px]">{b.stat}</span>
              <span className="flex flex-col gap-1.5">
                <strong className="font-display text-[19px]">{b.title}</strong>
                <span className="text-[15.5px] text-[#cbd5e1]">{b.body}</span>
              </span>
            </li>
          ))}
        </ul>
        <More href="/why" dark>
          All the reasons to choose Hexford
        </More>
      </div>
    </section>
  );
}

export function WhyFull({ hostingPrice }: { hostingPrice: string }) {
  return (
    <section aria-labelledby="whyfull-h" className="relative overflow-hidden bg-navy text-white">
      <div className={`container-wf relative ${pad}`}>
        <Heading
          kicker="The difference"
          id="whyfull-h"
          dark
          title={
            <>
              Built for you, <span className="text-gold">then it&apos;s yours.</span>
            </>
          }
          intro="Template builders charge you every month, for as long as you want to stay online, and the bill grows with every feature you add."
        />
        <ul className="m-0 mt-12 grid list-none grid-flow-dense grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b, i) => (
            <li
              key={b.title}
              className={`flex flex-col gap-3 rounded-2xl border p-7 ${b.wide ? "sm:col-span-2" : ""} ${i === 0 || i === 4 ? "border-gold bg-ink" : "border-navy-line bg-[#11234a]"}`}
            >
              {b.stat ? (
                <p className="m-0 flex flex-col">
                  <span className="font-display text-[clamp(38px,4vw,52px)] font-bold leading-none tracking-[-0.02em] text-gold">{b.stat}</span>
                  <span className="mt-1.5 text-[13px] font-medium uppercase tracking-[0.12em] text-[#94a3b8]">{b.statLabel}</span>
                </p>
              ) : (
                <span className="font-display text-[15px] font-bold text-gold" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
              )}
              <h3 className={`m-0 font-display font-bold ${b.wide ? "text-[24px]" : "text-[20px]"}`}>{b.title}</h3>
              <p className={`m-0 text-[#cbd5e1] ${b.wide ? "max-w-[46ch] text-[16.5px]" : "text-[15.5px]"}`}>{b.body}</p>
            </li>
          ))}
        </ul>
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-navy-line pt-8">
          <p className="m-0 font-display text-[19px] font-semibold">One-off build. First year&apos;s hosting free, then {hostingPrice}.</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/#quote" className="btn btn-gold">
              Get an instant quote
            </Link>
            <Link href="/pricing" className="btn btn-outline-light">
              See pricing
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Comparison() {
  return (
    <section aria-labelledby="compare-h" className="bg-stone">
      <div className={`container-wf flex flex-col gap-10 ${pad}`}>
        <Heading
          kicker="Why bespoke"
          id="compare-h"
          title="Template builders are quick. They’re also a box you can’t get out of."
          intro="Off-the-shelf website builders are great for a quick start, but the cheaper plans limit what you can build, and the cost creeps up with every add-on."
        />
        <ul className="m-0 flex list-none flex-col gap-3 p-0 md:hidden">
          {comparison.map((row) => (
            <li key={row.label} className="overflow-hidden rounded-2xl border border-line bg-white">
              <p className="m-0 border-b border-line-soft px-5 py-3 font-display font-bold">{row.label}</p>
              <p className="m-0 px-5 py-3 text-[15.5px] text-muted">
                <span className="font-medium">Template builders:</span> {row.template}
              </p>
              <p className="m-0 flex items-start gap-2.5 bg-blue-tint px-5 py-3 text-[15.5px]">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                <span>
                  <span className="font-bold">Hexford:</span> {row.ours}
                </span>
              </p>
            </li>
          ))}
        </ul>
        <div className="hidden overflow-x-auto rounded-2xl border border-line bg-white md:block">
          <table className="w-full min-w-[640px] border-collapse text-base">
            <thead>
              <tr className="text-left">
                <th scope="col" className="w-[24%] border-b border-line px-5 py-4">
                  <span className="sr-only">Feature</span>
                </th>
                <th scope="col" className="border-b border-line px-5 py-4 font-medium text-muted">
                  Template website builders
                </th>
                <th scope="col" className="border-b border-line bg-ink px-5 py-4 font-display text-white">
                  Hexford Digital
                </th>
              </tr>
            </thead>
            <tbody>
              {comparison.map((row, i) => {
                const b = i === comparison.length - 1 ? "" : "border-b border-line-soft";
                return (
                  <tr key={row.label}>
                    <th scope="row" className={`px-5 py-4 text-left ${b}`}>
                      {row.label}
                    </th>
                    <td className={`px-5 py-4 text-muted ${b}`}>{row.template}</td>
                    <td className={`bg-blue-tint px-5 py-4 ${b}`}>{row.ours}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

/* ---------- services ---------- */

export function ServicesCompact() {
  return (
    <section aria-labelledby="services-h">
      <div className={`container-wf flex flex-col gap-9 ${pad}`}>
        <Heading kicker="What I build" id="services-h" title="Everything your website needs, nothing it doesn’t." />
        <ul className="m-0 grid list-none grid-cols-2 gap-3 p-0 lg:grid-cols-4 lg:gap-4">
          {features.map((f) => (
            <li key={f.title} className="flex flex-col gap-2.5 rounded-2xl border border-line p-4 lg:flex-row lg:items-center lg:gap-3.5 lg:p-5">
              <span className="text-blue">
                <Icon name={f.icon} className="h-7 w-7" />
              </span>
              <strong className="font-display text-[16px] leading-snug lg:text-[17px]">{f.title}</strong>
            </li>
          ))}
        </ul>
        <More href="/services">What each one includes</More>
      </div>
    </section>
  );
}

export function ServicesFull() {
  return (
    <section aria-labelledby="servicesfull-h">
      <div className={`container-wf flex flex-col gap-11 ${pad}`}>
        <Heading kicker="What I build" id="servicesfull-h" title="Everything your website needs, nothing it doesn’t." />
        <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f) => (
            <li key={f.title} className="flex flex-col gap-3 rounded-2xl border border-line p-6">
              <span className="text-blue">
                <Icon name={f.icon} />
              </span>
              <h3 className="m-0 font-display text-[19px] font-bold">{f.title}</h3>
              <p className="m-0 text-[15.5px] text-muted">{f.body}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function AdminShowcase() {
  return (
    <section aria-labelledby="admin-h" className="bg-stone">
      <div className={`container-wf grid items-center gap-12 lg:grid-cols-[5fr_7fr] ${pad}`}>
        <div className="flex flex-col gap-4">
          <p className="kicker m-0 text-gold-text">You’re in control</p>
          <h2 id="admin-h" className="h2 m-0">
            An admin area made for your business.
          </h2>
          <p className="m-0 text-muted">
            Every build can include a private admin site linked to your website. Add products, change prices, upload photos and check your reports, with changes live the
            moment you save.
          </p>
          <ul className="m-0 flex list-none flex-col gap-2.5 p-0">
            {["Product and stock management", "Orders, bookings and enquiries in one place", "Sales and booking reports", "Edit page text, images and galleries"].map((i) => (
              <li key={i} className="flex items-center gap-2.5">
                <Check className="h-5 w-5 shrink-0 text-blue" />
                {i}
              </li>
            ))}
          </ul>
        </div>
        <AdminPreview />
      </div>
    </section>
  );
}

export function OneStop() {
  return (
    <section aria-labelledby="onestop-h" className="bg-ink text-white">
      <div className={`container-wf flex flex-col gap-9 ${pad}`}>
        <Heading kicker="One supplier, no loose ends" id="onestop-h" dark title="Domain, hosting and email, all sorted." intro="No juggling three companies and three bills. I set it all up, keep it running, and it’s always registered to you." />
        <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
          {oneStop.map((o) => (
            <li key={o.title} className="flex flex-col gap-2.5 rounded-2xl border border-ink-line bg-ink-2 p-5">
              <span className="text-gold">
                <Icon name={o.icon} className="h-7 w-7" />
              </span>
              <strong className="font-display text-[17px]">{o.title}</strong>
              <span className="text-[15px] text-muted-dark">{o.body}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------- work ---------- */

type Projects = SiteContent["portfolio"];

export function WorkCarousel({ portfolio }: { portfolio: Projects }) {
  return (
    <section id="work" aria-labelledby="work-h" className="bg-ink text-white">
      <div className={`container-wf flex flex-col gap-8 ${pad}`}>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Heading kicker="Recent work" id="work-h" dark title="Four businesses, four very different websites." />
          <span className="text-[14px] text-[#9ca3af] md:hidden" aria-hidden>
            Swipe to see more →
          </span>
        </div>
        <ul className="-mx-4 m-0 flex snap-x snap-mandatory list-none gap-4 overflow-x-auto p-0 px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
          {portfolio.map((p) => (
            <li key={p.name} className="w-[82%] shrink-0 snap-start sm:w-[46%] lg:w-auto">
              <Link href="/work" className="group flex h-full flex-col overflow-hidden rounded-2xl border border-ink-line bg-ink-2 text-white no-underline hover:border-gold">
                <span className="block aspect-[16/10] overflow-hidden bg-ink">
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt={`${p.name} website`} loading="lazy" className="h-full w-full object-cover object-left-top transition-transform duration-500 group-hover:scale-[1.03]" />
                  ) : (
                    <span className="flex h-full items-center justify-center text-sm text-[#9ca3af]">[Screenshot: {p.name}]</span>
                  )}
                </span>
                <span className="flex flex-col gap-1 p-4">
                  <strong className="font-display text-[18px]">{p.name}</strong>
                  <span className="text-[14px] text-gold">{p.tags[0]}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        <More href="/work" dark>
          See the projects in detail
        </More>
      </div>
    </section>
  );
}

export function WorkFull({ portfolio }: { portfolio: Projects }) {
  return (
    <section aria-labelledby="workfull-h" className="bg-ink text-white">
      <div className={`container-wf flex flex-col gap-10 ${pad}`}>
        <h2 id="workfull-h" className="sr-only">
          Projects
        </h2>
        {portfolio.map((p, i) => (
          <article key={p.name} className={`grid items-center gap-8 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}>
            <div className="overflow-hidden rounded-2xl border border-ink-line bg-ink-2 p-3">
              {p.image && p.beforeImage ? (
                <BeforeAfter before={p.beforeImage} after={p.image} name={p.name} />
              ) : p.image ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={p.image} alt={`${p.name} website`} loading="lazy" className="aspect-[16/9] w-full rounded-xl object-cover object-left-top" />
              ) : (
                <span className="flex aspect-[16/9] items-center justify-center rounded-xl border-2 border-dashed border-[#3a4150] text-sm text-[#9ca3af]">[Screenshot: {p.name}]</span>
              )}
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="m-0 font-display text-[28px] font-bold">{p.name}</h3>
              <p className="m-0 text-[17px] text-muted-dark">{p.summary}</p>
              <ul className="m-0 flex list-none flex-wrap gap-2 p-0 text-[13.5px]">
                {p.tags.map((t, j) => (
                  <li key={t} className={`rounded-full border px-3 py-1 ${j === 0 ? "border-gold text-gold" : "border-[#3a4150] text-[#e5e7eb]"}`}>
                    {t}
                  </li>
                ))}
              </ul>
              {p.url.startsWith("http") ? (
                <a href={p.url} target="_blank" rel="noopener" className="self-start font-bold text-gold no-underline hover:text-white">
                  Visit the website <span aria-hidden>→</span>
                </a>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

/* ---------- quote ---------- */

export function QuoteSection({ quote }: { quote: SiteContent["quote"] }) {
  return (
    <section id="quote" aria-labelledby="quote-h" className="scroll-mt-20 bg-stone">
      <div className={`container-wf flex flex-col gap-9 ${pad}`}>
        <Heading
          kicker="Instant quote"
          id="quote-h"
          title="What would your website cost?"
          intro="Pick what you need and see an estimate straight away, including the monthly cost and the option to spread the payments."
        />
        <QuoteCalculator quote={quote} />
      </div>
    </section>
  );
}

/* ---------- packages ---------- */

function PackageCard({ p, compact }: { p: SiteContent["packages"][number]; compact: boolean }) {
  const gold = p.id === "gold";
  const silver = p.id === "silver";
  const items = compact ? p.items.slice(0, 4) : p.items;
  return (
    <div className={`flex h-full flex-col gap-5 rounded-[18px] p-7 ${gold ? "border-2 border-gold bg-ink text-white" : silver ? "border-2 border-blue bg-white" : "border border-line bg-white"}`}>
      <div className="flex flex-wrap items-center justify-between gap-2.5">
        <h3 className="m-0 flex items-center gap-2.5 font-display text-xl font-bold">
          <span className={`h-3.5 w-3.5 rounded-full ${dot[p.id]}`} aria-hidden />
          {p.name}
        </h3>
        {p.badge ? <span className="rounded-full bg-gold px-2.5 py-1 text-xs font-bold uppercase tracking-[0.14em] text-ink">{p.badge}</span> : null}
      </div>
      <p className={`m-0 ${gold ? "text-muted-dark" : "text-muted"}`}>{p.intro}</p>
      <p className="m-0">
        <span className={`text-sm ${gold ? "text-muted-dark" : "text-muted"}`}>From </span>
        <span className="font-display text-[38px] font-bold">{p.price}</span>
      </p>
      <ul className="m-0 flex flex-1 list-none flex-col gap-2.5 p-0 text-[15.5px]">
        {items.map((i) => (
          <li key={i} className="flex gap-2.5">
            <Check className={`mt-0.5 h-5 w-5 shrink-0 ${gold ? "text-gold" : "text-blue"}`} />
            {i}
          </li>
        ))}
        {compact && p.items.length > items.length ? <li className={`pl-[30px] text-[14.5px] ${gold ? "text-muted-dark" : "text-muted"}`}>+ {p.items.length - items.length} more</li> : null}
      </ul>
      <Link href={compact ? "/pricing" : "/#contact"} className={`btn ${gold ? "btn-gold" : silver ? "btn-blue" : "btn-outline-dark"}`}>
        {compact ? `${p.name} in full` : `Enquire about ${p.name}`}
      </Link>
    </div>
  );
}

export function PackagesCompact({ packages, hostingPrice }: { packages: SiteContent["packages"]; hostingPrice: string }) {
  return (
    <section id="packages" aria-labelledby="packages-h">
      <div className={`container-wf flex flex-col gap-9 ${pad}`}>
        <Heading kicker="Packages" id="packages-h" title="Fair, fixed prices. Tailored to fit." />
        <ul className="-mx-4 m-0 flex snap-x snap-mandatory list-none gap-4 overflow-x-auto p-0 px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
          {packages.map((p) => (
            <li key={p.id} className="w-[85%] shrink-0 snap-start sm:w-[60%] lg:w-auto">
              <PackageCard p={p} compact />
            </li>
          ))}
        </ul>
        <p className="m-0 flex flex-wrap gap-x-5 gap-y-2 text-[15px] font-medium">
          {[`First year's hosting free, then ${hostingPrice}`, "Spread the cost, interest free", "Domain and email sorted", "No VAT to add"].map((t) => (
            <span key={t} className="flex items-center gap-2">
              <Check className="h-5 w-5 text-blue" />
              {t}
            </span>
          ))}
        </p>
        <More href="/pricing#three-year-cost">See what it costs over 3 years compared with others</More>
      </div>
    </section>
  );
}

export function PackagesFull({ content }: { content: SiteContent }) {
  const { packages, spreadCost, hostingPlan, carePlan } = content;
  return (
    <section id="packages" aria-labelledby="packagesfull-h" className="bg-stone">
      <div className={`container-wf flex flex-col gap-10 ${pad}`}>
        <Heading kicker="Packages" id="packagesfull-h" title="Fair, fixed prices. Tailored to fit." intro="Every package is bespoke. These are starting points, and I’ll give you a fixed quote once we’ve talked." />
        <div className="grid gap-6 lg:grid-cols-3">
          {packages.map((p) => (
            <PackageCard key={p.id} p={p} compact={false} />
          ))}
        </div>
        <div className="flex flex-col gap-4 rounded-2xl border-2 border-gold bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
          <div className="flex flex-col gap-1">
            <strong className="font-display text-[19px]">{spreadCost.title}</strong>
            <span className="max-w-[60ch] text-[15.5px] text-muted">{spreadCost.body}</span>
          </div>
          <Link href="/#quote" className="btn btn-gold shrink-0">
            Work out my payments
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {[
            { name: "Hosting only", price: hostingPlan.price, body: hostingPlan.body, featured: false },
            { name: "Hosting and care", price: carePlan.price, body: carePlan.body, featured: true },
          ].map((plan) => (
            <div key={plan.name} className={`flex flex-col gap-2 rounded-2xl border bg-white px-6 py-5 ${plan.featured ? "border-blue" : "border-line"}`}>
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <strong className="font-display text-[18px]">{plan.name}</strong>
                <span className="font-display text-[22px] font-bold text-blue">{plan.price}</span>
              </div>
              <span className="text-[15.5px] text-muted">{plan.body}</span>
            </div>
          ))}
        </div>
        <p className="m-0 text-sm text-muted">Monthly plans are optional and cancel any time with a month&apos;s notice. Prefer to host it yourself? Your site and its code are handed over to you.</p>
      </div>
    </section>
  );
}

/* ---------- 3-year cost comparison ---------- */

const gbp = (n: number) => `£${Math.round(n).toLocaleString("en-GB")}`;

export function CostComparison({ quote, dark = false }: { quote: SiteContent["quote"]; dark?: boolean }) {
  const months = costYears * 12;
  const muted = dark ? "text-muted-dark" : "text-muted";
  return (
    <section id="three-year-cost" aria-labelledby="cost-h" className={`scroll-mt-20 ${dark ? "bg-ink text-white" : ""}`}>
      <div className={`container-wf flex flex-col gap-10 ${pad}`}>
        <Heading
          kicker={`The real cost over ${costYears} years`}
          id="cost-h"
          dark={dark}
          title={
            <>
              Cheaper to start. <span className={dark ? "text-gold" : "text-blue"}>Much cheaper to keep.</span>
            </>
          }
          intro="A low build price can hide a monthly fee that never stops. Here’s what each option costs once you add the monthly charges."
        />
        <div className="grid gap-6 lg:grid-cols-2">
          {costComparison.map((c) => {
            const oursUpfront = quote[c.ours];
            const ours = oursUpfront + quote.hosting * Math.max(0, months - hostingFreeMonths);
            const rows = [
              { label: `Hexford ${c.ours === "gold" ? "Gold" : "Bronze"}`, detail: `${gbp(oursUpfront)} build, first year's hosting free, then ${gbp(quote.hosting)} a month. No VAT`, total: ours, us: true },
              ...c.rivals.map((r) => ({ label: r.label, detail: r.detail, total: r.upfront + r.monthly * months, us: false })),
            ];
            const max = Math.max(...rows.map((r) => r.total));
            const saving = Math.min(...rows.filter((r) => !r.us).map((r) => r.total)) - ours;
            return (
              <article key={c.title} className={`flex flex-col gap-5 rounded-2xl border p-6 sm:p-7 ${dark ? "border-ink-line bg-ink-2" : "border-line bg-white"}`}>
                <div className="flex flex-wrap items-baseline justify-between gap-3">
                  <h3 className="m-0 font-display text-[20px] font-bold">{c.title}</h3>
                  {saving > 0 ? (
                    <span className="rounded-full bg-gold px-3 py-1 text-[13px] font-bold text-ink">Save at least {gbp(saving)}</span>
                  ) : null}
                </div>
                <ul className="m-0 flex list-none flex-col gap-4 p-0">
                  {rows.map((r) => (
                    <li key={r.label} className="flex flex-col gap-1.5">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className={`font-bold ${r.us ? "" : muted}`}>{r.label}</span>
                        <span className={`shrink-0 font-display text-[20px] font-bold ${r.us ? (dark ? "text-gold" : "text-blue") : ""}`}>{gbp(r.total)}</span>
                      </div>
                      <div className={`h-3 overflow-hidden rounded-full ${dark ? "bg-ink" : "bg-stone"}`} aria-hidden>
                        <div className={`h-full rounded-full ${r.us ? "bg-gold" : dark ? "bg-[#3a4150]" : "bg-[#c7cfdc]"}`} style={{ width: `${Math.max(4, (r.total / max) * 100)}%` }} />
                      </div>
                      <span className={`text-[14px] ${muted}`}>{r.detail}</span>
                    </li>
                  ))}
                </ul>
              </article>
            );
          })}
        </div>
        <p className={`m-0 max-w-[80ch] text-[13.5px] ${muted}`}>
          Totals over {costYears} years ({months} months), rounded to the nearest pound. Other options use published prices from UK web design companies and market price guides,
          checked November 2026, with 20% VAT added where prices exclude it. The social media offer is an example of a typical low-cost deal, not a specific company. Hexford doesn&apos;t charge VAT. Hexford hosting is free for the first year and optional after that; if you host
          it yourself, the build price is all you pay.
        </p>
      </div>
    </section>
  );
}

/* ---------- before you buy a cheap website ---------- */

export function BuyerQuestions({ quote, dark = false }: { quote: SiteContent["quote"]; dark?: boolean }) {
  const muted = dark ? "text-muted-dark" : "text-muted";
  return (
    <section id="before-you-buy" aria-labelledby="buy-h" className={`scroll-mt-20 ${dark ? "bg-ink text-white" : "bg-stone"}`}>
      <div className={`container-wf flex flex-col gap-10 ${pad}`}>
        <Heading
          kicker="Thinking of a cheaper website?"
          id="buy-h"
          dark={dark}
          title={
            <>
              Five questions to ask <span className={dark ? "text-gold" : "text-blue"}>before you buy.</span>
            </>
          }
          intro="A low price is great if it’s the whole price. Ask any web designer these questions, including me. Here are my answers."
        />
        <ol className="m-0 grid list-none gap-4 p-0 md:grid-cols-2 lg:grid-cols-3">
          {buyerQuestions.map((b, i) => (
            <li key={b.q} className={`flex flex-col gap-3 rounded-2xl border p-6 ${dark ? "border-ink-line bg-ink-2" : "border-line bg-white"}`}>
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold font-display text-[17px] font-bold text-ink">{i + 1}</span>
              <h3 className="m-0 font-display text-[19px] font-bold leading-snug">{b.q}</h3>
              <p className={`m-0 text-[15.5px] ${muted}`}>
                <strong className={dark ? "text-gold" : "text-blue"}>Hexford: </strong>
                {b.a.replace("{hosting}", gbp(quote.hosting))}
              </p>
            </li>
          ))}
          <li className={`flex flex-col justify-center gap-4 rounded-2xl p-6 ${dark ? "bg-gold text-ink" : "bg-ink text-white"}`}>
            <p className="m-0 font-display text-[22px] font-bold leading-snug">Got a quote from someone else? Send it over and I’ll tell you honestly how it compares.</p>
            <Link href="/#contact" className={`btn self-start ${dark ? "btn-blue" : "btn-gold"}`}>
              Ask me
            </Link>
          </li>
        </ol>
      </div>
    </section>
  );
}

/* ---------- process, about, FAQs, contact ---------- */

export function Process() {
  return (
    <section aria-labelledby="process-h">
      <div className={`container-wf flex flex-col gap-9 ${pad}`}>
        <Heading kicker="How it works" id="process-h" title="A personal service from first chat to launch day." />
        <ol className="m-0 grid list-none gap-x-6 gap-y-5 p-0 sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((s, i) => (
            <li key={s.title} className="flex gap-4 border-l-[3px] border-gold pl-4 lg:flex-col lg:gap-2 lg:border-l-0 lg:border-t-[3px] lg:pl-0 lg:pt-4">
              <span className="font-display font-bold text-blue">{String(i + 1).padStart(2, "0")}</span>
              <span className="flex flex-col gap-1">
                <strong className="font-display text-lg">{s.title}</strong>
                <span className="text-[15px] text-muted">{s.body}</span>
              </span>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" aria-labelledby="about-h" className="bg-stone">
      <div className={`container-wf flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-10 ${pad}`}>
        {/* [Replace with a photo of Steve: /public/images/steve.webp] */}
        <div className="flex h-28 w-28 shrink-0 items-center justify-center rounded-full border-2 border-dashed border-line bg-white text-center text-[13px] text-muted sm:h-40 sm:w-40">
          [Photo of Steve]
        </div>
        <div className="flex max-w-[680px] flex-col gap-3">
          <p className="kicker m-0 text-gold-text">About me</p>
          <h2 id="about-h" className="h2 m-0">
            Hi, I’m Steve.
          </h2>
          <p className="m-0 text-muted">
            I’ve spent 10+ years as a senior consultant in business software, helping organisations get the right systems in place. Hexford brings that experience to
            businesses like yours: you deal with me from the first chat to launch day and beyond.
          </p>
        </div>
      </div>
    </section>
  );
}

export function Faqs({ faqs, limit }: { faqs: SiteContent["faqs"]; limit?: number }) {
  const shown = limit ? faqs.slice(0, limit) : faqs;
  return (
    <section id="faqs" aria-labelledby="faq-h" className="scroll-mt-20 bg-navy text-white">
      <div className={`container-wf grid items-start gap-10 lg:grid-cols-[5fr_7fr] lg:gap-12 ${pad}`}>
        <div className="flex flex-col gap-4">
          <p className="kicker m-0 text-gold">FAQs</p>
          <h2 id="faq-h" className="h2 m-0">
            Questions, answered.
          </h2>
          <p className="m-0 text-[#cbd5e1]">Can’t see yours? Ask the assistant for an instant answer, or send me a message.</p>
          <AskAssistantButton />
        </div>
        <div className="border-t border-navy-line">
          {shown.map((f) => (
            <details key={f.q} className="group border-b border-navy-line">
              <summary className="flex min-h-[44px] cursor-pointer items-center justify-between gap-4 py-5 text-[17px] font-bold">
                {f.q}
                <span className="faq-plus text-2xl leading-none text-gold transition-transform" aria-hidden>
                  +
                </span>
              </summary>
              <p className="m-0 pb-5 text-[#cbd5e1]">{f.a}</p>
            </details>
          ))}
          {limit && faqs.length > limit ? (
            <p className="m-0 pt-5">
              <More href="/pricing#faqs" dark>
                More questions about pricing and hosting
              </More>
            </p>
          ) : null}
        </div>
      </div>
    </section>
  );
}

export function Contact({ business }: { business: SiteContent["business"] }) {
  return (
    <section id="contact" aria-labelledby="contact-h" className="scroll-mt-20">
      <div className={`container-wf grid items-start gap-10 lg:grid-cols-[5fr_7fr] lg:gap-14 ${pad}`}>
        <div className="flex flex-col gap-4">
          <p className="kicker m-0 text-gold-text">Get in touch</p>
          <h2 id="contact-h" className="h2 m-0">
            Let’s talk about your website.
          </h2>
          <p className="m-0 text-muted">Tell me a little about your business and what you need. I’ll get back to you personally within {business.replyTime}.</p>
          <dl className="mt-2 grid grid-cols-[auto_1fr] gap-x-4 gap-y-2.5">
            <dt className="font-bold">Email</dt>
            <dd className="m-0">
              <a href={business.emailHref} className="text-blue">
                {business.email}
              </a>
            </dd>
            <dt className="font-bold">Phone</dt>
            <dd className="m-0">{business.phone}</dd>
            <dt className="font-bold">Where I work</dt>
            <dd className="m-0">{business.area}</dd>
          </dl>
        </div>
        <EnquiryForm />
      </div>
    </section>
  );
}

export function CtaBand() {
  return (
    <section aria-label="Next step" className="bg-blue text-white">
      <div className="container-wf flex flex-col items-start justify-between gap-5 px-4 py-12 sm:flex-row sm:items-center sm:px-6">
        <p className="m-0 max-w-[30ch] font-display text-[clamp(24px,3vw,32px)] font-bold leading-tight">Ready to see what your website would cost?</p>
        <div className="flex flex-wrap gap-3">
          <Link href="/#quote" className="btn btn-gold">
            Get an instant quote
          </Link>
          <Link href="/#contact" className="btn btn-outline-light">
            Talk to Steve
          </Link>
        </div>
      </div>
    </section>
  );
}
