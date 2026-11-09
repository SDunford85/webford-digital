import Link from "next/link";
import { Assistant } from "@/components/Assistant";
import { Logo } from "@/components/Logo";

export const dynamic = "force-dynamic";

/** The launch splash page: no menu, just the logo, one way back to the main site, and the assistant. */
export default function LaunchLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <header className="absolute inset-x-0 top-0 z-30">
        <div className="container-wf flex items-center justify-between px-4 py-5 sm:px-6">
          <Link href="/" aria-label="Hexford Digital home" className="no-underline">
            <Logo onDark />
          </Link>
          <Link href="/" className="hidden font-bold text-white no-underline hover:text-gold sm:inline">
            Visit the full website <span aria-hidden>→</span>
          </Link>
        </div>
      </header>
      <main id="main" className="flex-1">
        {children}
      </main>
      <Assistant />
    </>
  );
}
