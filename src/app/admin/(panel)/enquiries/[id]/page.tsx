import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { getDb, hasDb, schema } from "@/db";
import { AdminForm, Area, Select } from "../../../AdminForm";
import { deleteEnquiry, updateEnquiry } from "../../../actions";
import { formatDate, StatusBadge, statusLabel } from "../../StatusBadge";

export const metadata = { title: "Enquiry · Admin" };

export default async function AdminEnquiry({ params }: PageProps<"/admin/enquiries/[id]">) {
  const { id } = await params;
  if (!hasDb() || !z.uuid().safeParse(id).success) notFound();
  const [e] = await getDb().select().from(schema.enquiries).where(eq(schema.enquiries.id, id)).limit(1);
  if (!e) notFound();

  const subject = encodeURIComponent(`Your website enquiry${e.business ? ` for ${e.business}` : ""}`);
  const rows: [string, React.ReactNode][] = [
    ["Email", <a key="e" href={`mailto:${e.email}?subject=${subject}`} className="text-blue">{e.email}</a>],
    ["Phone", e.phone ? <a key="p" href={`tel:${e.phone.replace(/[^\d+]/g, "")}`} className="text-blue">{e.phone}</a> : "—"],
    ["Business", e.business ?? "—"],
    ["Needs", e.need ?? "—"],
    ["Package", e.packageInterest ?? "—"],
    ["Received", formatDate(e.createdAt)],
    ["Agreed to be contacted", e.consent ? "Yes" : "No"],
  ];

  return (
    <>
      <Link href="/admin/enquiries" className="text-sm font-bold text-blue">
        ← All enquiries
      </Link>
      <div className="mt-3 flex flex-wrap items-center gap-3">
        <h1 className="m-0 font-display text-[36px] font-bold">{e.name}</h1>
        <StatusBadge status={e.status} />
      </div>

      <div className="mt-6 grid items-start gap-6 lg:grid-cols-[3fr_2fr]">
        <section className="rounded-2xl border border-line bg-white p-6">
          <dl className="m-0 grid grid-cols-[auto_1fr] gap-x-6 gap-y-2.5">
            {rows.map(([k, v]) => (
              <div key={k} className="contents">
                <dt className="font-bold">{k}</dt>
                <dd className="m-0 break-words">{v}</dd>
              </div>
            ))}
          </dl>
          <h2 className="mb-2 mt-6 font-display text-lg font-bold">Their message</h2>
          <p className="m-0 whitespace-pre-wrap rounded-xl bg-stone p-4">{e.message}</p>
          <a href={`mailto:${e.email}?subject=${subject}`} className="btn btn-blue mt-6">
            Reply by email
          </a>
        </section>

        <section className="flex flex-col gap-6 rounded-2xl border border-line bg-white p-6">
          <AdminForm action={updateEnquiry} submitLabel="Save">
            <input type="hidden" name="id" value={e.id} />
            <div className="mb-4 flex flex-col gap-4">
              <Select label="Status" name="status" defaultValue={e.status} options={Object.entries(statusLabel).map(([value, label]) => ({ value, label }))} />
              <Area label="Your notes (only you can see these)" name="notes" defaultValue={e.notes} rows={6} />
            </div>
          </AdminForm>
          <AdminForm action={deleteEnquiry} submitLabel="Delete enquiry" variant="danger" confirm={`Delete ${e.name}'s enquiry? This can't be undone.`}>
            <input type="hidden" name="id" value={e.id} />
          </AdminForm>
        </section>
      </div>
    </>
  );
}
