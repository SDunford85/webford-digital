import { AdminShowcase, Comparison, CtaBand, PageHero, WhyFull } from "@/components/sections";
import { getSiteContent } from "@/lib/content";

export const metadata = {
  title: "Why Hexford",
  description: "Why a bespoke Hexford website beats renting a template: you own it, no platform fees, lower card fees and a real person to talk to.",
};

export default async function WhyPage() {
  const { hostingPlan } = await getSiteContent();
  return (
    <>
      <PageHero kicker="Why Hexford" title="Don’t rent a website. Own one." intro="A website built around your business by a senior software consultant, at a fair, fixed price, and yours to keep." />
      <WhyFull hostingPrice={hostingPlan.price} />
      <Comparison />
      <AdminShowcase />
      <CtaBand />
    </>
  );
}
