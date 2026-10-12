/** Shared layout for the terms, privacy and cookie pages. */
export function LegalPage({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-3xl">
        <p className="kicker text-gold-text">Legal</p>
        <h1 className="mt-3 font-display text-[36px] font-bold leading-tight sm:text-[44px]">{title}</h1>
        <div className="mt-8 space-y-5 text-[17px] leading-relaxed text-muted">{children}</div>
      </div>
    </section>
  );
}
