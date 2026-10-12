"use server";

import { z } from "zod";
import { getDb, hasDb, schema } from "@/db";
import { notifyNewEnquiry } from "@/lib/notify";

export type EnquiryState = { ok: boolean; message: string; errors?: Record<string, string>; at?: number };

const optional = z
  .string()
  .trim()
  .max(200)
  .transform((v) => (v === "" ? null : v))
  .nullable();

const Enquiry = z.object({
  name: z.string().trim().min(1, "Please tell me your name").max(120),
  business: optional,
  email: z.email("Please enter a valid email address").max(200),
  phone: optional,
  need: optional,
  packageInterest: optional,
  message: z.string().trim().min(10, "Please add a few words about your project").max(5000),
  consent: z.literal("on", { error: "Please tick the box so I can reply to you" }),
});

/** Saves an enquiry from the contact form and emails Steve (if email is set up). */
export async function sendEnquiry(_prev: EnquiryState, fd: FormData): Promise<EnquiryState> {
  // Honeypot: real people never fill this hidden field in.
  if (String(fd.get("website") ?? "") !== "") return { ok: true, message: "Thanks, your enquiry has been sent.", at: Date.now() };

  const parsed = Enquiry.safeParse({
    name: fd.get("name") ?? "",
    business: fd.get("business") ?? "",
    email: String(fd.get("email") ?? "").trim(),
    phone: fd.get("phone") ?? "",
    need: fd.get("need") ?? "",
    packageInterest: fd.get("packageInterest") ?? "",
    message: fd.get("message") ?? "",
    consent: fd.get("consent") ?? "",
  });

  if (!parsed.success) {
    const errors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? "form");
      if (!errors[key]) errors[key] = issue.message;
    }
    return { ok: false, message: "Please check the highlighted fields.", errors, at: Date.now() };
  }

  if (!hasDb()) {
    console.warn("[enquiry] DATABASE_URL is not set — enquiry not saved", parsed.data.email);
    return { ok: false, message: "Sorry, the form isn't connected yet. Please email me instead.", at: Date.now() };
  }

  try {
    const { consent, ...rest } = parsed.data;
    const [saved] = await getDb()
      .insert(schema.enquiries)
      .values({ ...rest, consent: consent === "on" })
      .returning({ id: schema.enquiries.id });
    await notifyNewEnquiry({ id: saved.id, ...rest });
    return { ok: true, message: "Thanks, your enquiry has been sent. I’ll be in touch soon.", at: Date.now() };
  } catch (err) {
    console.error("[enquiry]", err);
    return { ok: false, message: "Sorry, something went wrong. Please try again or email me.", at: Date.now() };
  }
}
