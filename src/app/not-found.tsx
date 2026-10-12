import Link from "next/link";
import { LogoMark } from "@/components/Logo";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center bg-ink px-4 py-28 text-white sm:px-6">
      <div className="container-wf text-center">
        <LogoMark tone="light" className="mx-auto h-12 w-auto" />
        <p className="kicker mt-6 text-gold">404</p>
        <h1 className="mt-3 font-display text-[44px] font-bold sm:text-[60px]">Page not found.</h1>
        <p className="mx-auto mt-4 max-w-md text-lg text-muted-dark">That page doesn&apos;t exist, or it may have moved.</p>
        <Link href="/" className="btn btn-gold mt-8">
          Back to the home page
        </Link>
      </div>
    </section>
  );
}
