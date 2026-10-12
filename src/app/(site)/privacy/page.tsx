import type { Metadata } from "next";
import { LegalPage } from "@/components/LegalPage";

export const metadata: Metadata = { title: "Privacy policy" };

export default function Page() {
  return (
    <LegalPage title="Privacy policy">
      <p>[Your privacy policy will go here once the wording has been agreed and checked.]</p>
    </LegalPage>
  );
}
