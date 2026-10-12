import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    // Cloudflare Images costs extra; images are pre-compressed WebP and served as-is.
    unoptimized: true,
  },
};

export default nextConfig;

// Lets `next dev` read Cloudflare bindings/vars from wrangler.jsonc + .dev.vars
initOpenNextCloudflareForDev();
