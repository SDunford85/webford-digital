import { defineCloudflareConfig } from "@opennextjs/cloudflare";

// No incremental cache configured yet: pages are rendered per request.
// To add caching later, create an R2 bucket and use the r2IncrementalCache override
// (see https://opennext.js.org/cloudflare/caching).
export default defineCloudflareConfig({});
