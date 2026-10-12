import Link from "next/link";
import { desc, eq } from "drizzle-orm";
import { getDb, hasDb, schema } from "@/db";
import { formatDate, StatusBadge, statusLabel } from "../StatusBadge";

export const metadata = { title: "Enquiries · Admin" };

const filters = ["all", "new", "contacted", "quoted", "won", "lost"] as const;
type Filter = (typeof filters)[number];

export default async function AdminEnquiries({ searchParams }: PageProps<"/admin/enquiries">) {
  const sp = await searchParams;
  const raw = typeof sp.status === "string" ? sp.status : "all";
  const status: Filter = (filters as readonly string[]).includes(raw) ? (raw as Filter) : "all";

  const rows = !hasDb()
    ? []
    : status === "all"
      ? await getDb().select().from(schema.enquiries).orderBy(desc(schema.enquiries.createdAt))
      : await getDb().select().from(schema.enquiries).where(eq(schema.enquiries.status, status)).orderBy(desc(schema.enquiries.createdAt));

  return (
    <>
      <h1 className="m-0 font-display text-[36px] font-bold">Enquiries</h1>
      <p className="mt-2 text-muted">Everyone who has filled in your contact form, newest first. Open one to reply, add notes or update its status.</p>

      <nav aria-label="Filter by status" className="mt-6 flex flex-wrap gap-2">
        {filters.map((f) => (
          <Link
            key={f}
            href={f === "all" ? "/admin/enquiries" : `/admin/enquiries?status=${f}`}
            aria-current={status === f ? "page" : undefined}
            className={`rounded-full border px-3.5 py-2 text-sm font-bold no-underline ${status === f ? "border-ink bg-ink text-white" : "border-line bg-white text-ink hover:border-ink"}`}
          >
            {f === "all" ? "All" : statusLabel[f]}
          </Link>
        ))}
      </nav>

      {rows.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-line bg-white p-6 text-muted">No enquiries {status === "all" ? "yet" : `marked “${statusLabel[status]}”`}.</p>
      ) : (
        <div className="mt-6 overflow-x-auto rounded-2xl border border-line bg-white">
          <table className="w-full min-w-[720px] border-collapse text-[15px]">
            <thead>
              <tr className="bg-stone text-left text-muted">
                <th scope="col" className="px-4 py-3 font-medium">
                  Name
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Needs
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Package
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Received
                </th>
                <th scope="col" className="px-4 py-3 font-medium">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((e) => (
                <tr key={e.id} className="border-t border-line-soft">
                  <td className="px-4 py-3">
                    <Link href={`/admin/enquiries/${e.id}`} className="font-bold text-blue">
                      {e.name}
                    </Link>
                    {e.business && <span className="block text-sm text-muted">{e.business}</span>}
                  </td>
                  <td className="px-4 py-3">{e.need ?? "—"}</td>
                  <td className="px-4 py-3">{e.packageInterest ?? "—"}</td>
                  <td className="px-4 py-3 text-muted">{formatDate(e.createdAt)}</td>
                  <td className="px-4 py-3">
                    <StatusBadge status={e.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
