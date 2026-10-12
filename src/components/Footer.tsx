import Link from "next/link";
import { Logo } from "./Logo";
import { business, nav } from "@/content/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-ink text-[15px] text-muted-dark">
      <div className="container-wf flex flex-col gap-10 px-4 pb-8 pt-16 sm:px-6">
        <div className="flex flex-wrap justify-between gap-10">
          <div className="flex max-w-xs flex-col gap-4">
            <Logo onDark />
            <p className="m-0">Bespoke websites with a personal service.</p>
          </div>
          <nav aria-label="Footer" className="flex flex-wrap gap-12">
            <div className="flex flex-col gap-2.5">
              <strong className="text-white">Explore</strong>
              {nav.map((n) => (
                <Link key={n.href} href={n.href} className="text-muted-dark no-underline hover:text-white">
                  {n.label}
                </Link>
              ))}
            </div>
            <div className="flex flex-col gap-2.5">
              <strong className="text-white">Legal</strong>
              {/* [Phase 2: add these pages once the wording is agreed] */}
              <Link href="/terms" className="text-muted-dark no-underline hover:text-white">
                Terms and conditions
              </Link>
              <Link href="/privacy" className="text-muted-dark no-underline hover:text-white">
                Privacy policy
              </Link>
              <Link href="/cookies" className="text-muted-dark no-underline hover:text-white">
                Cookie policy
              </Link>
            </div>
          </nav>
        </div>
        <div className="flex flex-wrap justify-between gap-3 border-t border-ink-line pt-6 text-[13.5px] text-[#9ca3af]">
          <span>
            {business.name} is a trading name of {business.owner} · {business.address} · {business.email}
          </span>
          <span>
            © {year} {business.name}
          </span>
        </div>
      </div>
    </footer>
  );
}
