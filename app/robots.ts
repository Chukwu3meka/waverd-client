import { MetadataRoute } from "next";

const robots = (): MetadataRoute.Robots => ({
  rules: {
    userAgent: "*",
    allow: "/",
    disallow: ["/accounts/email-verified", "/accounts/password-reset/"],
  },
  sitemap: "https://waverd.com/sitemap.xml",
});

export default robots;
