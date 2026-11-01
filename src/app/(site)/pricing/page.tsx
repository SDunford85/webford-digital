import { Contact, Faqs, OneStop, PackagesFull, PageHero, QuoteSection } from "@/components/sections";
import { getSiteContent } from "@/lib/content";

export const metadata = {
  title: "Pricing",
  description: "Bronze, Silver and Gold website packages at fair, fixed prices, hosting from £5 a month, and the option to spread the cost interest free.",
};

export default async function PricingPage() {
  const content = await getSiteContent();
  return (
    <>
      <PageHero kicker="Pricing" title="Fair, fixed prices. No surprises." intro="A one-off build at a fixed price, optional hosting from a few pounds a month, and the option to spread the cost." />
      <PackagesFull content={content} />
      <QuoteSection quote={content.quote} />
      <OneStop />
      <Faqs faqs={content.faqs} />
      <Contact business={content.business} />
    </>
  );
}
