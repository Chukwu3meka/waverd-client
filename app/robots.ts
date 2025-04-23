import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      allow: "/",
      userAgent: "*",
      disallow: ["/accounts/email-verified", "/accounts/password-reset/"],
    },
    sitemap: "https://waverd.com/sitemap.xml",
  };
}
