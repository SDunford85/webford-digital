import Link from "next/link";
import { Logo } from "./Logo";
import { nav } from "@/content/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-line bg-ink/95 text-white backdrop-blur">
      <div className="container-wf flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link href="/" aria-label="Webford Digital Services home" className="no-underline">
          <Logo onDark />
        </Link>

        {/* Desktop */}
        <nav aria-label="Main" className="hidden items-center gap-7 text-[15px] lg:flex">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="text-[#e5e7eb] no-underline hover:text-white">
              {n.label}
            </Link>
          ))}
          <Link href="/#contact" className="btn btn-gold">
            Start your project
          </Link>
        </nav>

        {/* Phone and tablet: no JavaScript needed */}
        <details className="relative lg:hidden">
          <summary className="btn btn-outline-light cursor-pointer px-4" aria-label="Open menu">
            Menu
          </summary>
          <nav aria-label="Main" className="absolute right-0 mt-2 flex w-64 flex-col gap-1 rounded-xl border border-ink-line bg-ink-2 p-3 shadow-xl">
            {nav.map((n) => (
              <Link key={n.href} href={n.href} className="rounded-lg px-3 py-3 text-white no-underline hover:bg-ink">
                {n.label}
              </Link>
            ))}
            <Link href="/#contact" className="btn btn-gold mt-2">
              Start your project
            </Link>
          </nav>
        </details>
      </div>
    </header>
  );
}
