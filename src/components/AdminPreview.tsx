/**
 * An illustration of an admin site (based on the Bake Chic product manager).
 * Replace with real screenshots once you have them — see /public/images/work.
 */
export function AdminPreview() {
  const rows = [
    { name: "Brownie box", status: "Live" },
    { name: "Blondie selection", status: "Live" },
    { name: "Cookie box", status: "Live" },
    { name: "Celebration cake", status: "Hidden" },
  ];
  const menu = ["Dashboard", "Products", "Orders", "Gallery", "Page content", "Reports"];
  return (
    <figure className="m-0 flex min-h-[440px] flex-wrap overflow-hidden rounded-2xl border border-line bg-white" aria-label="Example of an admin site: a product manager">
      <div className="flex max-w-[200px] flex-[1_1_160px] flex-col gap-1.5 bg-ink px-4 py-5 text-sm text-[#e5e7eb]">
        <span className="mb-2 font-display font-bold text-white">Admin</span>
        {menu.map((m) => (
          <span key={m} className={`rounded-md px-2.5 py-2 ${m === "Products" ? "bg-blue text-white" : ""}`}>
            {m}
          </span>
        ))}
      </div>
      <div className="flex min-w-0 flex-[999_1_340px] flex-col gap-4 p-5">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <span className="font-display text-lg font-bold">Products</span>
          <span className="rounded-lg bg-gold px-3.5 py-2 text-sm font-bold text-ink">+ Add product</span>
        </div>
        <div className="overflow-hidden rounded-xl border border-line-soft text-[14.5px]">
          <div className="grid grid-cols-[2fr_1fr_1fr] gap-2.5 bg-stone px-3.5 py-3 font-medium text-muted">
            <span>Product</span>
            <span>Price</span>
            <span>Status</span>
          </div>
          {rows.map((r) => (
            <div key={r.name} className="grid grid-cols-[2fr_1fr_1fr] gap-2.5 border-t border-line-soft px-3.5 py-3">
              <span>{r.name}</span>
              <span>£—</span>
              <span className={r.status === "Live" ? "text-[#166534]" : "text-muted"}>{r.status}</span>
            </div>
          ))}
        </div>
        <div className="flex min-h-[110px] flex-1 items-center justify-center rounded-xl border-2 border-dashed border-line p-3 text-center text-sm text-muted">
          [Screenshot: sales report from a real admin site you’ve built]
        </div>
      </div>
      <figcaption className="sr-only">Illustration of a Hexford admin site, showing a product list with prices and status.</figcaption>
    </figure>
  );
}
