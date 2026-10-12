import type { MetadataRoute } from "next";
import { allowIndexing } from "@/content/site";

// Preview: block all crawlers. Launch: allow them (flip allowIndexing in src/content/site.ts).
export default function robots(): MetadataRoute.Robots {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3004";
  return allowIndexing
    ? { rules: { userAgent: "*", allow: "/" }, sitemap: `${base}/sitemap.xml` }
    : { rules: { userAgent: "*", disallow: "/" } };
}
