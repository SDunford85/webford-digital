import { asc } from "drizzle-orm";
import { getDb, hasDb, schema, type Faq } from "@/db";
import { AdminForm, Area, Check, Field } from "../../AdminForm";
import { deleteFaq, saveFaq } from "../../actions";

export const metadata = { title: "FAQs · Admin" };

function FaqFields({ f, nextOrder }: { f?: Faq; nextOrder?: number }) {
  return (
    <div className="mb-4 grid gap-4 md:grid-cols-2">
      {f && <input type="hidden" name="id" value={f.id} />}
      <Field label="Question" name="question" defaultValue={f?.question} required className="md:col-span-2" />
      <Area label="Answer" name="answer" defaultValue={f?.answer} required rows={4} className="md:col-span-2" />
      <Field label="Order" name="sortOrder" type="number" defaultValue={f?.sortOrder ?? nextOrder ?? 0} hint="Lower numbers show first" />
      <Check label="Show on the website" name="published" defaultChecked={f?.published ?? true} />
    </div>
  );
}

export default async function AdminFaqs() {
  const rows = hasDb() ? await getDb().select().from(schema.faqs).orderBy(asc(schema.faqs.sortOrder)) : [];

  return (
    <>
      <h1 className="m-0 font-display text-[36px] font-bold">FAQs</h1>
      <p className="mt-2 max-w-[48em] text-muted">The questions and answers on your homepage. Keep answers short. These will also power the virtual assistant when it&apos;s added.</p>

      <details className="mt-8 rounded-2xl border-2 border-dashed border-blue bg-white p-5">
        <summary className="cursor-pointer text-lg font-bold text-blue">+ Add a question</summary>
        <div className="mt-4">
          <AdminForm action={saveFaq} submitLabel="Add question" resetOnSuccess>
            <FaqFields nextOrder={rows.length} />
          </AdminForm>
        </div>
      </details>

      <ul className="m-0 mt-6 flex list-none flex-col gap-3 p-0">
        {rows.map((f) => (
          <li key={f.id}>
            <details className="rounded-2xl border border-line bg-white p-5">
              <summary className="flex cursor-pointer flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-bold">{f.question}</span>
                {!f.published && <span className="rounded-full bg-stone px-2.5 py-0.5 text-xs font-bold text-muted">Hidden</span>}
              </summary>
              <div className="mt-4 flex flex-col gap-4">
                <AdminForm action={saveFaq}>
                  <FaqFields f={f} />
                </AdminForm>
                <AdminForm action={deleteFaq} submitLabel="Delete question" variant="danger" confirm="Delete this question?">
                  <input type="hidden" name="id" value={f.id} />
                </AdminForm>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </>
  );
}
