import { asc } from "drizzle-orm";
import { getDb, hasDb, schema, type ProjectRow } from "@/db";
import { AdminForm, Area, Check, Field } from "../../AdminForm";
import { deleteProject, saveProject } from "../../actions";

export const metadata = { title: "Portfolio · Admin" };

function ProjectFields({ p, nextOrder }: { p?: ProjectRow; nextOrder?: number }) {
  return (
    <div className="mb-4 grid gap-4 md:grid-cols-2">
      {p && <input type="hidden" name="id" value={p.id} />}
      <Field label="Name" name="name" defaultValue={p?.name} required />
      <Field label="Live website address" name="url" defaultValue={p?.url} hint="https://… (leave empty if it isn't live yet)" />
      <Area label="Description" name="summary" defaultValue={p?.summary} required rows={3} className="md:col-span-2" />
      <Field label="Feature tags" name="tags" defaultValue={p?.tags.join(", ")} hint="Separate with commas. The first one is highlighted in gold." className="md:col-span-2" />
      <Field
        label="Screenshot"
        name="imageUrl"
        defaultValue={p?.imageUrl}
        hint="Address of the image, e.g. /images/work/bake-chic.webp (see the README). Leave empty for a placeholder."
        className="md:col-span-2"
      />
      <Field label="Order" name="sortOrder" type="number" defaultValue={p?.sortOrder ?? nextOrder ?? 0} hint="Lower numbers show first" />
      <Check label="Show on the website" name="published" defaultChecked={p?.published ?? true} />
    </div>
  );
}

export default async function AdminPortfolio() {
  const rows = hasDb() ? await getDb().select().from(schema.projects).orderBy(asc(schema.projects.sortOrder)) : [];

  return (
    <>
      <h1 className="m-0 font-display text-[36px] font-bold">Portfolio</h1>
      <p className="mt-2 max-w-[48em] text-muted">The websites shown under &ldquo;Recent work&rdquo; on your homepage. Untick &ldquo;Show on the website&rdquo; to hide one without deleting it.</p>

      <details className="mt-8 rounded-2xl border-2 border-dashed border-blue bg-white p-5">
        <summary className="cursor-pointer text-lg font-bold text-blue">+ Add a website</summary>
        <div className="mt-4">
          <AdminForm action={saveProject} submitLabel="Add website" resetOnSuccess>
            <ProjectFields nextOrder={rows.length} />
          </AdminForm>
        </div>
      </details>

      <ul className="m-0 mt-6 flex list-none flex-col gap-3 p-0">
        {rows.map((p) => (
          <li key={p.id}>
            <details className="rounded-2xl border border-line bg-white p-5">
              <summary className="flex cursor-pointer flex-wrap items-center gap-x-3 gap-y-1">
                <span className="font-bold">{p.name}</span>
                <span className="text-sm text-muted">{p.tags.slice(0, 3).join(" · ")}</span>
                {!p.published && <span className="rounded-full bg-stone px-2.5 py-0.5 text-xs font-bold text-muted">Hidden</span>}
                {!p.imageUrl && <span className="rounded-full bg-[#fef3c7] px-2.5 py-0.5 text-xs font-bold text-[#92400e]">No screenshot</span>}
              </summary>
              <div className="mt-4 flex flex-col gap-4">
                <AdminForm action={saveProject}>
                  <ProjectFields p={p} />
                </AdminForm>
                <AdminForm action={deleteProject} submitLabel="Delete website" variant="danger" confirm={`Delete ${p.name} from your portfolio?`}>
                  <input type="hidden" name="id" value={p.id} />
                </AdminForm>
              </div>
            </details>
          </li>
        ))}
      </ul>
    </>
  );
}
