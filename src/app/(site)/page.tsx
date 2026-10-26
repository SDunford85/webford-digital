import { AdminPreview } from "@/components/AdminPreview";
import { EnquiryForm } from "@/components/EnquiryForm";
import { HeroShowcase } from "@/components/HeroShowcase";
import { LogoMark } from "@/components/Logo";
import { Check, Icon } from "@/components/Icon";
import { benefits, comparison, features, oneStop, sellingPoints, steps } from "@/content/site";
import { getSiteContent } from "@/lib/content";

const dot: Record<string, string> = { bronze: "bg-[#a86b3c]", silver: "bg-[#9ca3af]", gold: "bg-gold" };

export default async function HomePage() {
  const { business, carePlan, hostingPlan, spreadCost, faqs, packages, portfolio } = await getSiteContent();
  const showcase = portfolio.filter((p): p is typeof p & { image: string } => Boolean(p.image));
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section id="top" className="bg-ink text-white">
        <div className="container-wf grid items-center gap-14 px-4 pb-24 pt-16 sm:px-6 lg:grid-cols-2 lg:pt-20">
          <div className="flex flex-col gap-6">
            <p className="kicker m-0 text-gold">Bespoke web design · UK-wide</p>
            <h1 className="m-0 font-display text-[clamp(38px,5vw,60px)] font-bold leading-[1.08] tracking-[-0.02em]">
              Websites built around your business, not a template.
            </h1>
            <p className="m-0 max-w-[540px] text-[19px] leading-relaxed text-muted-dark">
              A personal, one-to-one service from someone with 10+ years helping businesses implement and run software. You get a site designed for you, an admin
              area to update it yourself, and a real person to call.
            </p>
            <div className="flex flex-wrap gap-3.5">
              <a href="#contact" className="btn btn-gold">
                Book a free consultation
              </a>
              <a href="#work" className="btn btn-outline-light">
                See my work
              </a>
            </div>
          </div>

          {showcase.length > 0 ? (
            <HeroShowcase projects={showcase} />
          ) : (
            <div className="flex aspect-[16/10] items-center justify-center rounded-2xl border border-ink-line bg-ink-2" aria-hidden>
              <LogoMark tone="light" className="h-24 w-auto opacity-80" />
            </div>
          )}
        </div>
      </section>

      {/* ---------- Selling points ---------- */}
      <section aria-label="Why choose Hexford" className="bg-blue text-white">
        <div className="container-wf px-4 py-7 sm:px-6">
          <ul className="m-0 grid list-none gap-4 p-0 font-medium sm:grid-cols-2 lg:grid-cols-4">
            {sellingPoints.map((s) => (
              <li key={s} className="flex items-center gap-2.5">
                <Check className="h-5 w-5 shrink-0 text-gold" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------- Why Hexford: rent vs own ---------- */}
      <section id="why" aria-labelledby="why-h" className="relative overflow-hidden bg-navy text-white">
        {/* Large faint woven W, purely decorative */}
        <LogoMark tone="light" className="pointer-events-none absolute -right-24 -top-10 h-[520px] w-auto opacity-[0.05]" />
        <div className="container-wf relative px-4 py-24 sm:px-6">
          <div className="grid items-end gap-6 lg:grid-cols-[7fr_5fr]">
            <div className="flex flex-col gap-3.5">
              <p className="kicker m-0 text-gold">Why Hexford</p>
              <h2 id="why-h" className="m-0 font-display text-[clamp(34px,4.6vw,56px)] font-bold leading-[1.05] tracking-[-0.02em]">
                Don&apos;t rent a website.
                <br />
                <span className="text-gold">Own one.</span>
              </h2>
            </div>
            <p className="m-0 text-[17px] text-[#cbd5e1] lg:pb-2">
              Template builders charge you every month, for as long as you want to stay online, and the bill grows with every feature you add. A Hexford site is
              built for you, then it&apos;s yours.
            </p>
          </div>

          <ul className="m-0 mt-12 grid list-none grid-flow-dense grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b, i) => (
              <li
                key={b.title}
                className={`group flex flex-col gap-3 rounded-2xl border p-7 transition-colors ${b.wide ? "sm:col-span-2" : ""} ${
                  i === 0 || i === 4 ? "border-gold bg-ink" : "border-navy-line bg-[#11234a] hover:border-[#41558a]"
                }`}
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
            <p className="m-0 font-display text-[19px] font-semibold">One-off build. Optional hosting from {hostingPlan.price}.</p>
            <div className="flex flex-wrap gap-3">
              <a href="#packages" className="btn btn-gold">
                See packages
              </a>
              <a href="#contact" className="btn btn-outline-light">
                Talk to Steve
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- Bespoke vs template ---------- */}
      <section aria-labelledby="compare-h" className="bg-stone">
        <div className="container-wf flex flex-col gap-10 px-4 py-24 sm:px-6">
          <div className="flex max-w-[720px] flex-col gap-3.5">
            <p className="kicker m-0 text-gold-text">Why bespoke</p>
            <h2 id="compare-h" className="h2 m-0">
              Template builders are quick. They’re also a box you can’t get out of.
            </h2>
            <p className="m-0 text-muted">
              Off-the-shelf website builders are great for a quick start, but the cheaper plans limit what you can build, and the cost creeps up with every add-on.
              Here’s the difference.
            </p>
          </div>
          {/* Phones: one card per row so the Hexford answer is always visible */}
          <ul className="m-0 flex list-none flex-col gap-3 p-0 md:hidden">
            {comparison.map((row) => (
              <li key={row.label} className="overflow-hidden rounded-2xl border border-line bg-white">
                <p className="m-0 border-b border-line-soft px-5 py-3 font-display font-bold">{row.label}</p>
                <div className="flex flex-col gap-1 px-5 py-3 text-[15.5px]">
                  <span className="text-muted">
                    <span className="font-medium">Template builders:</span> {row.template}
                  </span>
                </div>
                <div className="flex items-start gap-2.5 bg-blue-tint px-5 py-3 text-[15.5px]">
                  <Check className="mt-0.5 h-5 w-5 shrink-0 text-blue" />
                  <span>
                    <span className="font-bold">Hexford:</span> {row.ours}
                  </span>
                </div>
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
                  const last = i === comparison.length - 1;
                  const b = last ? "" : "border-b border-line-soft";
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

      {/* ---------- Services ---------- */}
      <section id="services" aria-labelledby="services-h">
        <div className="container-wf flex flex-col gap-11 px-4 py-24 sm:px-6">
          <div className="flex max-w-[720px] flex-col gap-3.5">
            <p className="kicker m-0 text-gold-text">What I build</p>
            <h2 id="services-h" className="h2 m-0">
              Everything your website needs, nothing it doesn’t.
            </h2>
          </div>
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

      {/* ---------- Portfolio ---------- */}
      <section id="work" aria-labelledby="work-h" className="bg-ink text-white">
        <div className="container-wf flex flex-col gap-11 px-4 py-24 sm:px-6">
          <div className="flex flex-wrap items-end justify-between gap-5">
            <div className="flex max-w-[680px] flex-col gap-3.5">
              <p className="kicker m-0 text-gold">Recent work</p>
              <h2 id="work-h" className="h2 m-0">
                Four businesses, four very different websites.
              </h2>
            </div>
            <p className="m-0 max-w-[380px] text-muted-dark">From a playful bakery shop to a national sporting body, each one is styled and built for the people who use it.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            {portfolio.map((p) => (
              <article key={p.name} className="flex flex-col overflow-hidden rounded-2xl border border-ink-line bg-ink-2">
                <div className="mx-4 mt-4 flex aspect-[16/9] items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-[#3a4150] text-center text-sm text-[#9ca3af]">
                  {p.image ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={p.image} alt={`${p.name} website`} className="h-full w-full object-cover" />
                  ) : (
                    <span className="px-4">[Screenshot: {p.name}]</span>
                  )}
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="m-0 font-display text-[22px] font-bold">{p.name}</h3>
                  <p className="m-0 text-[15.5px] text-muted-dark">{p.summary}</p>
                  <ul className="m-0 flex list-none flex-wrap gap-2 p-0 text-[13px]">
                    {p.tags.map((t, i) => (
                      <li key={t} className={`rounded-full border px-2.5 py-1 ${i === 0 ? "border-gold text-gold" : "border-[#3a4150] text-[#e5e7eb]"}`}>
                        {t}
                      </li>
                    ))}
                  </ul>
                  <a
                    href={p.url}
                    className="mt-auto pt-2 font-bold text-gold no-underline hover:text-white"
                    {...(p.url.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
                  >
                    View the site <span aria-hidden>→</span>
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Admin showcase ---------- */}
      <section aria-labelledby="admin-h" className="bg-stone">
        <div className="container-wf grid items-center gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[5fr_7fr]">
          <div className="flex flex-col gap-4">
            <p className="kicker m-0 text-gold-text">You’re in control</p>
            <h2 id="admin-h" className="h2 m-0">
              An admin area made for your business.
            </h2>
            <p className="m-0 text-muted">
              Every build can include a private admin site linked to your website. Add products, change prices, upload photos and check your reports, with changes live
              the moment you save.
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

      {/* ---------- How it works ---------- */}
      <section aria-labelledby="process-h">
        <div className="container-wf flex flex-col gap-11 px-4 py-24 sm:px-6">
          <div className="flex max-w-[720px] flex-col gap-3.5">
            <p className="kicker m-0 text-gold-text">How it works</p>
            <h2 id="process-h" className="h2 m-0">
              A personal service from first chat to launch day.
            </h2>
          </div>
          <ol className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((s, i) => (
              <li key={s.title} className="flex flex-col gap-2.5 border-t-[3px] border-gold pt-4">
                <span className="font-display font-bold text-blue">{String(i + 1).padStart(2, "0")}</span>
                <strong className="font-display text-lg">{s.title}</strong>
                <span className="text-[15.5px] text-muted">{s.body}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------- Packages ---------- */}
      <section id="packages" aria-labelledby="packages-h" className="bg-stone">
        <div className="container-wf flex flex-col gap-11 px-4 py-24 sm:px-6">
          <div className="flex max-w-[720px] flex-col gap-3.5">
            <p className="kicker m-0 text-gold-text">Packages</p>
            <h2 id="packages-h" className="h2 m-0">
              Fair, fixed prices. Tailored to fit.
            </h2>
            <p className="m-0 text-muted">Every package is bespoke. These are starting points, and I’ll give you a fixed quote once we’ve talked.</p>
          </div>
          <div className="grid gap-6 lg:grid-cols-3">
            {packages.map((p) => {
              const gold = p.id === "gold";
              const silver = p.id === "silver";
              return (
                <div
                  key={p.id}
                  className={`flex flex-col gap-5 rounded-[18px] p-8 ${
                    gold ? "border-2 border-gold bg-ink text-white" : silver ? "border-2 border-blue bg-white" : "border border-line bg-white"
                  }`}
                >
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
                    {p.items.map((i) => (
                      <li key={i} className="flex gap-2.5">
                        <Check className={`mt-0.5 h-5 w-5 shrink-0 ${gold ? "text-gold" : "text-blue"}`} />
                        {i}
                      </li>
                    ))}
                  </ul>
                  <a href="#contact" className={`btn ${gold ? "btn-gold" : silver ? "btn-blue" : "btn-outline-dark"}`}>
                    Enquire about {p.name}
                  </a>
                </div>
              );
            })}
          </div>
          {/* Everything in one place: domain, hosting, email, moving */}
          <div className="flex flex-col gap-6 rounded-[18px] bg-ink p-7 text-white sm:p-9">
            <div className="flex flex-col gap-2">
              <p className="kicker m-0 text-gold">One supplier, no loose ends</p>
              <h3 className="m-0 font-display text-[26px] font-bold leading-tight">Domain, hosting and email, all sorted.</h3>
              <p className="m-0 max-w-[62ch] text-muted-dark">No juggling three companies and three bills. I set it all up, keep it running, and it’s always registered to you.</p>
            </div>
            <ul className="m-0 grid list-none gap-5 p-0 sm:grid-cols-2 lg:grid-cols-4">
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

          {/* Payment options */}
          <div className="flex flex-col gap-4 rounded-2xl border-2 border-gold bg-white p-6 sm:flex-row sm:items-center sm:justify-between sm:p-7">
            <div className="flex items-start gap-4">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-ink text-gold" aria-hidden>
                <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="5" width="18" height="15" rx="2" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                  <line x1="8" y1="3" x2="8" y2="7" />
                  <line x1="16" y1="3" x2="16" y2="7" />
                </svg>
              </span>
              <div className="flex flex-col gap-1">
                <strong className="font-display text-[19px]">{spreadCost.title}</strong>
                <span className="max-w-[60ch] text-[15.5px] text-muted">{spreadCost.body}</span>
              </div>
            </div>
            <a href="#contact" className="btn btn-gold shrink-0">
              Ask about payment options
            </a>
          </div>

          {/* Monthly plans */}
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
          <p className="m-0 text-sm text-muted">
            Monthly plans are optional and cancel any time with a month&apos;s notice. Prefer to host it yourself? Your site and its code are handed over to you.
          </p>
        </div>
      </section>

      {/* ---------- About ---------- */}
      <section id="about" aria-labelledby="about-h">
        <div className="container-wf grid items-center gap-14 px-4 py-24 sm:px-6 md:grid-cols-2">
          {/* [Replace with a photo of Steve: /public/images/steve.webp] */}
          <div className="flex aspect-[4/5] max-h-[520px] items-center justify-center rounded-[18px] border-2 border-dashed border-line bg-stone p-5 text-center text-muted">
            [Photo of Steve]
          </div>
          <div className="flex flex-col gap-4">
            <p className="kicker m-0 text-gold-text">About me</p>
            <h2 id="about-h" className="h2 m-0">
              Hi, I’m Steve.
            </h2>
            <p className="m-0 text-muted">
              For more than 10 years I’ve worked in the IT software industry, helping organisations implement and manage the systems they rely on every day. That means
              listening first, understanding how a business really works, and building something that fits.
            </p>
            <p className="m-0 text-muted">
              Hexford Digital brings that same approach to small businesses and sole traders. When you work with me, you deal with me from the first chat to
              launch day and beyond.
            </p>
            <p className="m-0 font-display font-semibold text-blue">Steve Dunford, founder</p>
          </div>
        </div>
      </section>

      {/* ---------- FAQs ---------- */}
      <section id="faqs" aria-labelledby="faq-h" className="bg-navy text-white">
        <div className="container-wf grid items-start gap-12 px-4 py-24 sm:px-6 lg:grid-cols-[5fr_7fr]">
          <div className="flex flex-col gap-4">
            <p className="kicker m-0 text-gold">FAQs</p>
            <h2 id="faq-h" className="h2 m-0">
              Questions, answered.
            </h2>
            <p className="m-0 text-[#cbd5e1]">Can’t see what you’re looking for? Send me a message and I’ll get back to you personally.</p>
            <a href="#contact" className="btn btn-gold self-start">
              Ask me a question
            </a>
          </div>
          <div className="border-t border-navy-line">
            {faqs.map((f) => (
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
          </div>
        </div>
      </section>

      {/* ---------- Contact ---------- */}
      <section id="contact" aria-labelledby="contact-h">
        <div className="container-wf grid items-start gap-14 px-4 py-24 sm:px-6 lg:grid-cols-[5fr_7fr]">
          <div className="flex flex-col gap-4">
            <p className="kicker m-0 text-gold-text">Get in touch</p>
            <h2 id="contact-h" className="h2 m-0">
              Let’s talk about your website.
            </h2>
            <p className="m-0 text-muted">
              Tell me a little about your business and what you need. I’ll get back to you personally within {business.replyTime}.
            </p>
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
    </>
  );
}
