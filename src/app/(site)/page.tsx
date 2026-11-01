import Link from "next/link";
import { Check } from "@/components/Icon";
import { SpinningGlobe } from "@/components/SpinningGlobe";
import { About, Contact, Faqs, PackagesCompact, Process, QuoteSection, ServicesCompact, TopBenefits, WorkCarousel } from "@/components/sections";
import { sellingPoints } from "@/content/site";
import { getSiteContent } from "@/lib/content";

/** The homepage: the highlights. The detail lives on /why, /services, /work and /pricing. */
export default async function HomePage() {
  const content = await getSiteContent();
  const { business, faqs, packages, portfolio, hostingPlan, quote } = content;
  return (
    <>
      {/* ---------- Hero ---------- */}
      <section id="top" className="overflow-hidden bg-ink text-white">
        <div className="container-wf grid items-center gap-8 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[7fr_5fr] lg:gap-14 lg:pb-24 lg:pt-20">
          <div className="flex flex-col gap-5 lg:gap-6">
            <p className="kicker m-0 text-gold">Bespoke web design · UK-wide</p>
            <h1 className="m-0 font-display text-[clamp(36px,5vw,62px)] font-bold leading-[1.06] tracking-[-0.02em]">
              Websites built around your business, <span className="text-gold">not a template.</span>
            </h1>
            <p className="m-0 max-w-[520px] text-[18px] leading-relaxed text-muted-dark lg:text-[19px]">
              Designed for you, with an admin area to run it yourself and a senior consultant at the end of the phone.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="#quote" className="btn btn-gold">
                Get an instant quote
              </Link>
              <Link href="/work" className="btn btn-outline-light">
                See my work
              </Link>
            </div>
          </div>
          <div className="relative mx-auto aspect-square w-[min(72vw,300px)] lg:w-full lg:max-w-[480px]">
            <div className="absolute inset-[12%] rounded-full bg-blue/20 blur-3xl" aria-hidden />
            <SpinningGlobe className="relative h-full w-full" />
          </div>
        </div>
      </section>

      {/* ---------- Selling points ---------- */}
      <section aria-label="Why choose Hexford" className="bg-blue text-white">
        <div className="container-wf px-4 py-5 sm:px-6 lg:py-7">
          <ul className="m-0 grid list-none grid-cols-2 gap-x-4 gap-y-3 p-0 text-[14.5px] font-medium sm:text-base lg:grid-cols-4">
            {sellingPoints.map((s) => (
              <li key={s} className="flex items-center gap-2">
                <Check className="h-5 w-5 shrink-0 text-gold" />
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <TopBenefits />
      <WorkCarousel portfolio={portfolio} />
      <ServicesCompact />
      <QuoteSection quote={quote} />
      <PackagesCompact packages={packages} hostingPrice={hostingPlan.price} />
      <Process />
      <About />
      <Faqs faqs={faqs} limit={5} />
      <Contact business={business} />
    </>
  );
}
