import { HeroShowcase } from "@/components/HeroShowcase";
import { CtaBand, PageHero, WorkFull } from "@/components/sections";
import { getSiteContent } from "@/lib/content";

export const metadata = {
  title: "Our work",
  description: "Recent Hexford Digital websites: online shops, hire and booking sites, a national sporting body and a community gym.",
};

export default async function WorkPage() {
  const { portfolio } = await getSiteContent();
  const showcase = portfolio.filter((p): p is typeof p & { image: string } => Boolean(p.image));
  return (
    <>
      <PageHero kicker="Our work" title="Four businesses, four very different websites." intro="From a playful bakery shop to a national sporting body, each one is styled and built for the people who use it." />
      {showcase.length > 1 ? (
        <section aria-label="Slideshow of recent websites" className="bg-ink pb-4">
          <div className="container-wf px-4 sm:px-6">
            <div className="mx-auto max-w-[900px]">
              <HeroShowcase projects={showcase} />
            </div>
          </div>
        </section>
      ) : null}
      <WorkFull portfolio={portfolio} />
      <CtaBand />
    </>
  );
}
