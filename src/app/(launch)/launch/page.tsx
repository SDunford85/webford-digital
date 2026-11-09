import Link from "next/link";
import { AskAssistantButton } from "@/components/AskAssistantButton";
import { Check, Icon } from "@/components/Icon";
import { LogoMark } from "@/components/Logo";
import { SpinningGlobe } from "@/components/SpinningGlobe";
import { costYears, hostingFreeMonths } from "@/content/site";
import { getSiteContent } from "@/lib/content";

export const metadata = {
  title: "Now open: bespoke websites from £399",
  description:
    "Hexford Digital is open. Bespoke websites built by a senior consultant, from £399, with the first year’s hosting free, no VAT to add and interest-free payments.",
  openGraph: {
    title: "Hexford Digital is open: bespoke websites from £399",
    description: "Big-agency quality, small-business prices. First year’s hosting free, no VAT, and you own your website.",
  },
};

const gbp = (n: number) => `£${Math.round(n).toLocaleString("en-GB")}`;

const ticker = ["Hand-built, never a template", "You own your website", "First year’s hosting free", "No VAT to add", "Spread the cost, interest free", "A real person, not a call centre", "Admin area included from Silver"];

const benefits = [
  { icon: "code" as const, title: "Built for you, not from a template", body: "Designed from scratch around your brand and the way your customers buy, book or get in touch." },
  { icon: "sliders" as const, title: "Run it yourself", body: "Your own admin area to change prices, photos, products and pages, with changes live the moment you save." },
  { icon: "cart" as const, title: "Sell and take bookings", body: "Online shops, card payments and bookings, with lower card fees than most website builders." },
  { icon: "chat" as const, title: "A virtual assistant", body: "Answers your customers’ questions day and night, and hands them to you when they’re ready to buy." },
  { icon: "globe" as const, title: "Domain, hosting and email sorted", body: "One supplier, no loose ends, and your domain is always registered in your name." },
  { icon: "book" as const, title: "Your own user guide", body: "A step-by-step guide written for your website, so you’re never stuck." },
];

export default async function LaunchPage() {
  const { packages, quote, portfolio, business, carePlan } = await getSiteContent();
  const months = costYears * 12;
  const gold3yr = quote.gold + quote.hosting * (months - hostingFreeMonths);
  const shots = portfolio.filter((p) => p.image).slice(0, 4);

  return (
    <>
      {/* ---------- Hero ---------- */}
      <section className="relative overflow-hidden bg-ink text-white">
        <div className="pointer-events-none absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-blue/30 blur-[120px]" aria-hidden />
        <div className="pointer-events-none absolute -right-20 bottom-0 h-[420px] w-[420px] rounded-full bg-gold/15 blur-[120px]" aria-hidden />
        <div className="container-wf relative grid items-center gap-10 px-4 pb-16 pt-28 sm:px-6 lg:grid-cols-[7fr_5fr] lg:pb-24 lg:pt-36">
          <div className="flex flex-col gap-6">
            <p className="m-0 inline-flex items-center gap-2 self-start rounded-full border border-gold/60 bg-gold/10 px-4 py-1.5 text-[13px] font-bold uppercase tracking-[0.18em] text-gold">
              <span className="h-2 w-2 rounded-full bg-gold" aria-hidden />
              Now open for new projects
            </p>
            <h1 className="m-0 font-display text-[clamp(42px,7vw,84px)] font-extrabold leading-[0.98] tracking-[-0.03em]">
              Big-agency websites.
              <br />
              <span className="bg-gradient-to-r from-gold via-[#f2d27a] to-gold bg-clip-text text-transparent">Small-business prices.</span>
            </h1>
            <p className="m-0 max-w-[560px] text-[19px] leading-relaxed text-muted-dark lg:text-[21px]">
              Bespoke websites, online shops and booking systems, designed and built by a senior consultant with 10+ years in business software. And they&apos;re yours to keep.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/#quote" className="btn btn-gold min-h-[56px] px-7 text-[18px]">
                Get my instant quote
              </Link>
              <Link href="/work" className="btn btn-outline-light min-h-[56px] px-7 text-[18px]">
                See the work
              </Link>
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-[min(78vw,340px)] lg:w-full lg:max-w-[500px]">
            <SpinningGlobe className="h-full w-full" />
            <div className="absolute -bottom-2 left-0 rotate-[-4deg] rounded-2xl bg-gold px-5 py-3 text-ink shadow-2xl sm:-left-6">
              <span className="block text-[13px] font-bold uppercase tracking-[0.14em]">Websites from</span>
              <span className="block font-display text-[40px] font-extrabold leading-none">{gbp(quote.bronze)}</span>
            </div>
          </div>
        </div>

        {/* Big numbers */}
        <div className="relative border-t border-ink-line bg-ink-2/80">
          <dl className="container-wf my-0 grid grid-cols-2 gap-x-6 px-4 sm:px-6 lg:grid-cols-4">
            {[
              [gbp(quote.bronze), "starting price, fixed quote"],
              [`${hostingFreeMonths} months`, "of hosting free"],
              ["£0", "VAT to add"],
              ["6", "interest-free payments"],
            ].map(([n, l]) => (
              <div key={l} className="flex flex-col gap-1 py-6 lg:py-8">
                <dt className="order-2 text-[14px] text-muted-dark lg:text-[15px]">{l}</dt>
                <dd className="order-1 m-0 font-display text-[clamp(30px,4vw,46px)] font-extrabold leading-none text-gold">{n}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ---------- Ticker ---------- */}
      <section aria-label="What you get" className="overflow-hidden bg-gold py-4 text-ink">
        <ul className="hx-ticker m-0 flex w-max list-none gap-10 p-0 font-display text-[18px] font-bold whitespace-nowrap">
          {[...ticker, ...ticker].map((t, i) => (
            <li key={i} className="flex items-center gap-10" aria-hidden={i >= ticker.length}>
              {t}
              <span aria-hidden>✦</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ---------- Packages ---------- */}
      <section aria-labelledby="pk-h" className="bg-white">
        <div className="container-wf flex flex-col gap-10 px-4 py-16 sm:px-6 lg:py-24">
          <div className="flex max-w-[760px] flex-col gap-3">
            <p className="kicker m-0 text-gold-text">Launch prices</p>
            <h2 id="pk-h" className="m-0 font-display text-[clamp(32px,4.4vw,52px)] font-extrabold leading-[1.05] tracking-[-0.02em]">
              Quality you can see. <span className="text-blue">Prices you can afford.</span>
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {packages.map((p) => {
              const gold = p.id === "gold";
              const silver = p.id === "silver";
              return (
                <div
                  key={p.id}
                  className={`relative flex flex-col gap-4 overflow-hidden rounded-3xl p-7 ${gold ? "bg-ink text-white" : silver ? "bg-blue text-white" : "bg-stone"}`}
                >
                  {gold ? <LogoMark className="pointer-events-none absolute -right-12 -top-12 h-48 w-48 opacity-20" /> : null}
                  <p className={`kicker m-0 ${gold ? "text-gold" : silver ? "text-[#c9d6ff]" : "text-gold-text"}`}>{p.name}</p>
                  <p className="m-0 font-display text-[54px] font-extrabold leading-none tracking-[-0.02em]">{p.price}</p>
                  <p className={`m-0 ${gold || silver ? "text-[#e5e7eb]" : "text-muted"}`}>{p.intro}</p>
                  <ul className="m-0 flex list-none flex-col gap-2 p-0 text-[15.5px]">
                    {p.items.slice(0, 4).map((i) => (
                      <li key={i} className="flex gap-2.5">
                        <Check className={`mt-0.5 h-5 w-5 shrink-0 ${gold ? "text-gold" : silver ? "text-white" : "text-blue"}`} />
                        {i}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
          <p className="m-0 flex flex-wrap items-center gap-x-6 gap-y-2 text-[16px] font-medium">
            <span>
              A full online shop for <strong>{gbp(gold3yr)}</strong> over {costYears} years, hosting included.
            </span>
            <Link href="/pricing#three-year-cost" className="font-bold text-blue no-underline hover:text-blue-dark">
              Compare that with others <span aria-hidden>→</span>
            </Link>
          </p>
        </div>
      </section>

      {/* ---------- Benefits ---------- */}
      <section aria-labelledby="ben-h" className="bg-navy text-white">
        <div className="container-wf flex flex-col gap-10 px-4 py-16 sm:px-6 lg:py-24">
          <h2 id="ben-h" className="m-0 max-w-[820px] font-display text-[clamp(32px,4.4vw,52px)] font-extrabold leading-[1.05] tracking-[-0.02em]">
            Everything a modern business needs, <span className="text-gold">without the monthly rent.</span>
          </h2>
          <ul className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b) => (
              <li key={b.title} className="flex flex-col gap-3 rounded-2xl border border-navy-line bg-[#11234a] p-6 transition-colors hover:border-gold">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold text-ink">
                  <Icon name={b.icon} className="h-6 w-6" />
                </span>
                <h3 className="m-0 font-display text-[20px] font-bold">{b.title}</h3>
                <p className="m-0 text-[15.5px] text-[#cbd5e1]">{b.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Hexford Care ---------- */}
      <section aria-labelledby="care-h" className="relative overflow-hidden bg-white">
        <LogoMark className="pointer-events-none absolute -right-32 top-1/2 h-[520px] w-[520px] -translate-y-1/2 opacity-[0.06]" />
        <div className="container-wf relative grid items-start gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[5fr_7fr] lg:py-24">
          <div className="flex flex-col gap-5 lg:sticky lg:top-10">
            <p className="kicker m-0 text-gold-text">Hexford Care</p>
            <h2 id="care-h" className="m-0 font-display text-[clamp(34px,4.6vw,56px)] font-extrabold leading-[1.02] tracking-[-0.025em]">
              Looked after,
              <br />
              <span className="text-blue">not left behind.</span>
            </h2>
            <p className="m-0 text-[18px] text-muted">
              Most website builders hand you a login and a help-centre link. With Hexford, the person who built your website is the person who looks after it.
            </p>
            <div className="flex flex-col gap-1 rounded-2xl border-2 border-gold bg-[#fffaf0] p-5">
              <strong className="font-display text-[18px]">Hexford Care plan, {carePlan.price}</strong>
              <span className="text-[15.5px] text-muted">{carePlan.body} Optional, and you can cancel with a month&apos;s notice.</span>
            </div>
          </div>
          <ol className="m-0 grid list-none gap-4 p-0 sm:grid-cols-2">
            {[
              ["A direct line to Steve", `Talk to the senior consultant who built your site. I reply personally within ${business.replyTime}.`],
              ["Support after launch", "Questions and small fixes after launch are included, so you’re never on your own in the first weeks."],
              ["Training and a user guide", "A handover session and a step-by-step guide written for your website."],
              [`${hostingFreeMonths} months’ hosting free`, "Fast, secure hosting with a security certificate and email forwarding, free for your first year."],
              ["Your domain, always yours", "Registered in your name, and never held back, even if you move on."],
              ["Updates, backups and checks", "With the care plan I keep everything up to date, backed up and monitored, with small changes each month."],
            ].map(([t, b], i) => (
              <li key={t} className="flex flex-col gap-2 rounded-2xl bg-stone p-6">
                <span className="font-display text-[15px] font-extrabold text-gold-text" aria-hidden>
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="m-0 font-display text-[19px] font-bold">{t}</h3>
                <p className="m-0 text-[15.5px] text-muted">{b}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Work ---------- */}
      {shots.length ? (
        <section aria-labelledby="work-h" className="bg-ink text-white">
          <div className="container-wf flex flex-col gap-8 px-4 py-16 sm:px-6 lg:py-20">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="work-h" className="m-0 font-display text-[clamp(30px,4vw,46px)] font-extrabold tracking-[-0.02em]">
                Built by Hexford.
              </h2>
              <Link href="/work" className="font-bold text-gold no-underline hover:text-white">
                See every project <span aria-hidden>→</span>
              </Link>
            </div>
            <ul className="-mx-4 m-0 flex snap-x snap-mandatory list-none gap-4 overflow-x-auto p-0 px-4 pb-2 sm:-mx-6 sm:px-6 lg:mx-0 lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-0">
              {shots.map((p) => (
                <li key={p.name} className="w-[80%] shrink-0 snap-start sm:w-[46%] lg:w-auto">
                  <figure className="m-0 overflow-hidden rounded-2xl border border-ink-line bg-ink-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.image!} alt={`${p.name} website`} loading="lazy" className="aspect-[16/10] w-full object-cover object-left-top" />
                    <figcaption className="flex flex-col gap-0.5 p-4">
                      <strong className="font-display">{p.name}</strong>
                      <span className="text-[14px] text-gold">{p.tags[0]}</span>
                    </figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      {/* ---------- Final call ---------- */}
      <section aria-labelledby="cta-h" className="relative overflow-hidden bg-blue text-white">
        <LogoMark tone="mono-white" className="pointer-events-none absolute -left-24 -top-24 h-[420px] w-[420px] opacity-10" />
        <div className="container-wf relative flex flex-col items-start gap-6 px-4 py-16 sm:px-6 lg:items-center lg:py-24 lg:text-center">
          <h2 id="cta-h" className="m-0 font-display text-[clamp(38px,6vw,72px)] font-extrabold leading-[1] tracking-[-0.03em]">
            Let&apos;s build yours.
          </h2>
          <p className="m-0 max-w-[620px] text-[19px] text-[#dbe4ff]">
            See your price in under a minute, or ask a question and get an instant answer. No obligation, and nothing to pay until you&apos;re happy with your quote.
          </p>
          <div className="flex flex-wrap gap-3">
            <Link href="/#quote" className="btn btn-gold min-h-[56px] px-7 text-[18px]">
              Get my instant quote
            </Link>
            <AskAssistantButton className="btn btn-outline-light min-h-[56px] px-7 text-[18px]" />
          </div>
          <p className="m-0 text-[15px] text-[#dbe4ff]">
            Or email <a href={business.emailHref} className="font-bold text-white">{business.email}</a>
          </p>
        </div>
      </section>

      <footer className="bg-ink px-4 py-6 text-center text-[13px] text-[#9ca3af]">
        Hexford Digital is a trading name of Steve Dunford ·{" "}
        <Link href="/privacy" className="text-[#cbd5e1]">
          Privacy
        </Link>{" "}
        ·{" "}
        <Link href="/terms" className="text-[#cbd5e1]">
          Terms
        </Link>
      </footer>
    </>
  );
}
