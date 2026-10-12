import { asc } from "drizzle-orm";
import { getDb, hasDb, schema } from "@/db";
import { getSettings } from "@/lib/content";
import { AdminForm, Area, Field } from "../../AdminForm";
import { savePackage, saveSettings } from "../../actions";

export const metadata = { title: "Packages & prices · Admin" };

const accent: Record<string, string> = { bronze: "bg-[#a86b3c]", silver: "bg-[#9ca3af]", gold: "bg-gold" };

export default async function AdminPackages() {
  const [rows, settings] = hasDb()
    ? await Promise.all([getDb().select().from(schema.packages).orderBy(asc(schema.packages.sortOrder)), getSettings()])
    : [[], {}];

  return (
    <>
      <h1 className="m-0 font-display text-[36px] font-bold">Packages &amp; prices</h1>
      <p className="mt-2 max-w-[48em] text-muted">
        Your three packages on the homepage. The price shows after the word &ldquo;From&rdquo;, so write it as you want it to appear, e.g. <strong>£995</strong>.
      </p>

      {rows.length === 0 && hasDb() && (
        <p className="mt-6 rounded-xl bg-[#fef3f2] p-4 font-semibold text-[#b42318]">
          The packages haven&apos;t been added to the database yet. Run the setup script in Neon (see the README), then refresh this page.
        </p>
      )}

      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        {rows.map((p) => (
          <section key={p.id} className="rounded-2xl border border-line bg-white p-6">
            <h2 className="m-0 flex items-center gap-2.5 font-display text-xl font-bold">
              <span className={`h-3.5 w-3.5 rounded-full ${accent[p.id] ?? "bg-line"}`} aria-hidden />
              {p.name}
            </h2>
            <AdminForm action={savePackage} submitLabel={`Save ${p.name}`} className="mt-4">
              <input type="hidden" name="id" value={p.id} />
              <div className="mb-4 flex flex-col gap-4">
                <Field label="Name" name="name" defaultValue={p.name} required />
                <Field label="Price" name="price" defaultValue={p.price} required hint="e.g. £995 (shown after “From”)" />
                <Area label="Short description" name="intro" defaultValue={p.intro} required rows={2} />
                <Area label="What's included" name="items" defaultValue={p.items.join("\n")} required rows={9} hint="One item per line." />
                <Field label="Badge (optional)" name="badge" defaultValue={p.badge} hint="e.g. Most popular. Leave empty for none." />
              </div>
            </AdminForm>
          </section>
        ))}
      </div>

      {hasDb() && (
        <section className="mt-8 max-w-2xl rounded-2xl border border-line bg-white p-6">
          <h2 className="m-0 font-display text-xl font-bold">Hosting and care plan</h2>
          <p className="mb-4 mt-1 text-sm text-muted">The strip under the packages.</p>
          <AdminForm action={saveSettings} submitLabel="Save care plan">
            <div className="mb-4 flex flex-col gap-4">
              <Field label="Price" name="care_plan_price" defaultValue={settings.care_plan_price} hint="e.g. £35/month" />
              <Area label="Description" name="care_plan_body" defaultValue={settings.care_plan_body} rows={2} />
            </div>
          </AdminForm>
        </section>
      )}
    </>
  );
}
