import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Terms and conditions" };

export default function Page() {
  return (
    <LegalPage title="Terms and conditions">
      <p>[Your terms and conditions will go here once the wording has been agreed and checked.]</p>
    </LegalPage>
  );
}
