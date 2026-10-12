import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Cookie policy" };

export default function Page() {
  return (
    <LegalPage title="Cookie policy">
      <p>[Your cookie policy will go here once the wording has been agreed and checked.]</p>
    </LegalPage>
  );
}
