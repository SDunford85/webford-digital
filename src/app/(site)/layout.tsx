import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSiteContent } from "@/lib/content";

// Every public page reads the contact details from the database, so render on each visit.
export const dynamic = "force-dynamic";

/** Public site chrome: header and footer on every public page. */
export default async function SiteLayout({ children }: LayoutProps<"/">) {
  const { business } = await getSiteContent();
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded focus:bg-white focus:p-3">
        Skip to content
      </a>
      <Header />
      <main id="main" className="flex-1">
        {children}
      </main>
      <Footer business={business} />
    </>
  );
}
