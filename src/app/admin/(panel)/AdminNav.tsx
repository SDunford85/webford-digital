"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/enquiries", label: "Enquiries" },
  { href: "/admin/packages", label: "Packages & prices" },
  { href: "/admin/portfolio", label: "Portfolio" },
  { href: "/admin/faqs", label: "FAQs" },
  { href: "/admin/settings", label: "Contact details" },
];

export function AdminNav() {
  const path = usePathname();
  return (
    <nav aria-label="Admin" className="-mx-1 flex gap-1 overflow-x-auto py-2">
      {links.map((l) => {
        const active = l.href === "/admin" ? path === "/admin" : path.startsWith(l.href);
        return (
          <Link
            key={l.href}
            href={l.href}
            aria-current={active ? "page" : undefined}
            className={`shrink-0 rounded-full px-3.5 py-2.5 text-sm font-bold no-underline ${active ? "bg-blue text-white" : "text-ink hover:bg-stone"}`}
          >
            {l.label}
          </Link>
        );
      })}
    </nav>
  );
}
