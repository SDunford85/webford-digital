import { AdminShowcase, CtaBand, OneStop, PageHero, Process, ServicesFull } from "@/components/sections";

export const metadata = {
  title: "Services",
  description: "Custom websites, admin areas, online shops, bookings, virtual assistants, integrations, hosting, domains and email: everything your business website needs.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero kicker="Services" title="Everything your website needs, in one place." intro="From the first design to hosting, domains and email, built properly and looked after by the person who made it." />
      <ServicesFull />
      <AdminShowcase />
      <OneStop />
      <Process />
      <CtaBand />
    </>
  );
}
