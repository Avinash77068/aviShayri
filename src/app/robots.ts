import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Private / account / non-content routes: crawlable links but no index value.
        disallow: [
          "/admin",
          "/admin/",
          "/write",
          "/profile",
          "/bookmarks",
          "/login",
          "/register",
          "/forgot-password",
          "/reset-password",
          "/search",
        ],
      },
    ],
    sitemap: new URL("/sitemap.xml", SITE_URL).toString(),
    host: SITE_URL,
  };
}
