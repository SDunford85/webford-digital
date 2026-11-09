import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3004";
  return ["", "/launch", "/why", "/services", "/work", "/pricing", "/terms", "/privacy", "/cookies"].map((p) => ({
    url: `${base}${p}`,
    changeFrequency: "monthly",
    priority: p === "" ? 1 : ["/terms", "/privacy", "/cookies"].includes(p) ? 0.3 : 0.8,
  }));
}
