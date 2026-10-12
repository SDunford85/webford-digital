import { hasDb } from "@/db";
import { getSettings } from "@/lib/content";
import { AdminForm, Field } from "../../AdminForm";
import { saveSettings } from "../../actions";

export const metadata = { title: "Contact details · Admin" };

export default async function AdminSettings() {
  const s = hasDb() ? await getSettings() : {};
  return (
    <>
      <h1 className="m-0 font-display text-[36px] font-bold">Contact details</h1>
      <p className="mt-2 max-w-[48em] text-muted">Shown in the &ldquo;Get in touch&rdquo; section and the footer.</p>

      <section className="mt-8 max-w-2xl rounded-2xl border border-line bg-white p-6">
        <AdminForm action={saveSettings} submitLabel="Save contact details">
          <div className="mb-4 flex flex-col gap-4">
            <Field label="Email address" name="email" defaultValue={s.email} hint="Where people can email you. Enquiry alerts are set separately (see the README)." />
            <Field label="Phone number" name="phone" defaultValue={s.phone} />
            <Field label="Business address" name="address" defaultValue={s.address} hint="Shown in the footer. Websites must show a geographic address." />
            <Field label="Area you cover" name="area" defaultValue={s.area} hint="e.g. North Yorkshire, working UK-wide" />
            <Field label="How quickly you reply" name="reply_time" defaultValue={s.reply_time} hint="Finishes the sentence “I’ll get back to you personally within …”, e.g. 1 working day" />
          </div>
        </AdminForm>
      </section>
    </>
  );
}
