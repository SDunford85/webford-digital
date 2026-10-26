import "server-only";

/**
 * Emails Steve when a new enquiry arrives, via Resend (resend.com — free for small volumes).
 * Optional: if RESEND_API_KEY or ENQUIRY_EMAIL_TO isn't set, it quietly does nothing.
 * Never throws — a failed email must not lose the enquiry, which is already saved.
 */

type EnquiryEmail = {
  id: string;
  name: string;
  business: string | null;
  email: string;
  phone: string | null;
  need: string | null;
  packageInterest: string | null;
  message: string;
};

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export function emailConfigured() {
  return Boolean(process.env.RESEND_API_KEY && process.env.ENQUIRY_EMAIL_TO);
}

export async function notifyNewEnquiry(e: EnquiryEmail) {
  const key = process.env.RESEND_API_KEY;
  const to = process.env.ENQUIRY_EMAIL_TO;
  if (!key || !to) return;
  const from = process.env.ENQUIRY_EMAIL_FROM || "Hexford Digital website <onboarding@resend.dev>";
  const site = process.env.NEXT_PUBLIC_SITE_URL ?? "";

  const rows: [string, string | null][] = [
    ["Name", e.name],
    ["Business", e.business],
    ["Email", e.email],
    ["Phone", e.phone],
    ["Needs", e.need],
    ["Package", e.packageInterest],
  ];
  const text = [
    "New enquiry from your website",
    "",
    ...rows.filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`),
    "",
    e.message,
    "",
    site ? `Open in admin: ${site}/admin/enquiries/${e.id}` : "",
  ].join("\n");
  const html = `<div style="font-family:system-ui,sans-serif;font-size:15px;line-height:1.5;color:#0b0d12">
<h2 style="margin:0 0 12px">New enquiry from your website</h2>
<table style="border-collapse:collapse">${rows
    .filter(([, v]) => v)
    .map(([k, v]) => `<tr><td style="padding:4px 16px 4px 0;font-weight:700">${k}</td><td style="padding:4px 0">${esc(v!)}</td></tr>`)
    .join("")}</table>
<p style="white-space:pre-wrap;background:#f6f6f3;padding:12px;border-radius:8px">${esc(e.message)}</p>
${site ? `<p><a href="${esc(site)}/admin/enquiries/${e.id}" style="color:#1846c8;font-weight:700">Open in admin</a></p>` : ""}
</div>`;

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: to.split(",").map((s) => s.trim()),
        reply_to: e.email,
        subject: `New enquiry: ${e.name}${e.business ? ` (${e.business})` : ""}`,
        text,
        html,
      }),
    });
    if (!res.ok) console.error("[notify] Resend error", res.status, await res.text());
  } catch (err) {
    console.error("[notify] couldn't send email", err);
  }
}
