import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { getDb, hasDb, schema } from "@/db";
import { formatDate, StatusBadge } from "./StatusBadge";

export const metadata = { title: "Admin" };

async function load() {
  if (!hasDb()) return { latest: [], newCount: 0, total: 0, projects: 0, faqs: 0 };
  const db = getDb();
  const [latest, newCount, total, projects, faqs] = await Promise.all([
    db.select().from(schema.enquiries).orderBy(desc(schema.enquiries.createdAt)).limit(5),
    db.$count(schema.enquiries, eq(schema.enquiries.status, "new")),
    db.$count(schema.enquiries),
    db.$count(schema.projects),
    db.$count(schema.faqs),
  ]);
  return { latest, newCount, total, projects, faqs };
}

export default async function AdminHome() {
  const { latest, newCount, total, projects, faqs } = await load();
  const cards = [
    { href: "/admin/enquiries", title: "Enquiries", n: total, body: "Everyone who has filled in the contact form. Track who you've replied to and quoted." },
    { href: "/admin/packages", title: "Packages & prices", n: 3, body: "Bronze, Silver and Gold: prices, descriptions and what's included. Plus your care plan." },
    { href: "/admin/portfolio", title: "Portfolio", n: projects, body: "The websites shown under Recent work: descriptions, tags, links and screenshots." },
    { href: "/admin/faqs", title: "FAQs", n: faqs, body: "The questions and answers on your homepage." },
  ];

  return (
    <>
      <h1 className="m-0 font-display text-[36px] font-bold">Hello, Steve</h1>
      <p className="mt-2 text-muted">Changes you make here show on your website straight away.</p>

      <section className="mt-8 rounded-2xl border-2 border-ink bg-white p-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="m-0 font-display text-xl font-bold">
            Latest enquiries{" "}
            {newCount > 0 && <span className="ml-1 rounded-full bg-gold px-2.5 py-0.5 align-middle text-sm text-ink">{newCount} new</span>}
          </h2>
          <Link href="/admin/enquiries" className="text-sm font-bold text-blue">
            See all enquiries →
          </Link>
        </div>
        {latest.length === 0 ? (
          <p className="mb-0 mt-3 text-muted">No enquiries yet. They&apos;ll appear here as soon as someone fills in your contact form.</p>
        ) : (
          <ul className="m-0 mt-4 list-none divide-y divide-line-soft p-0">
            {latest.map((e) => (
              <li key={e.id}>
                <Link href={`/admin/enquiries/${e.id}`} className="flex flex-wrap items-center gap-x-4 gap-y-1 py-3 text-ink no-underline hover:bg-stone">
                  <span className="min-w-[200px] flex-1">
                    <span className="font-bold">{e.name}</span>
                    {e.business && <span className="text-muted"> · {e.business}</span>}
                    <span className="block text-sm text-muted">
                      {e.need ?? "Enquiry"}
                      {e.packageInterest && e.packageInterest !== "Not sure yet" ? ` · ${e.packageInterest}` : ""}
                    </span>
                  </span>
                  <span className="text-sm text-muted">{formatDate(e.createdAt)}</span>
                  <StatusBadge status={e.status} />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>

      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c) => (
          <Link key={c.href} href={c.href} className="rounded-2xl border border-line bg-white p-6 text-ink no-underline hover:border-blue">
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="m-0 font-display text-lg font-bold">{c.title}</h2>
              <span className="font-display text-3xl font-bold text-blue">{c.n}</span>
            </div>
            <p className="mb-0 mt-2 text-sm text-muted">{c.body}</p>
          </Link>
        ))}
      </div>
    </>
  );
}
