const styles: Record<string, string> = {
  new: "bg-gold text-ink",
  contacted: "bg-blue-tint text-blue",
  quoted: "bg-[#ede9fe] text-[#5b21b6]",
  won: "bg-[#dcfce7] text-[#166534]",
  lost: "bg-stone text-muted",
};

export const statusLabel: Record<string, string> = { new: "New", contacted: "Contacted", quoted: "Quoted", won: "Won", lost: "Lost" };

export function StatusBadge({ status }: { status: string }) {
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-bold ${styles[status] ?? styles.lost}`}>{statusLabel[status] ?? status}</span>;
}

export function formatDate(d: Date) {
  return d.toLocaleString("en-GB", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit", timeZone: "Europe/London" });
}
