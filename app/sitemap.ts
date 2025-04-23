import type { MetadataRoute } from "next";

const baseURL = "https://www.waverd.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    // ? Solemnity of Mary, the Mother of God
    { url: baseURL, lastModified: new Date("1 Jan 2024"), changeFrequency: "never", priority: 1, images: [baseURL + "/layouts/waverd.png"] },
    { url: baseURL + "/accounts/signin", lastModified: new Date("1 Jan 2024"), changeFrequency: "never", priority: 1 },
    { url: baseURL + "/accounts/signup", lastModified: new Date("1 Jan 2024"), changeFrequency: "never", priority: 1 },
    { url: baseURL + "/accounts/password-reset", lastModified: new Date("1 Jan 2024"), changeFrequency: "never", priority: 1 },

    // // ? Feast of The Chair of St Peter, Apostle
    // { url: baseURL + pageInfo.faq, lastModified: new Date("22 Feb 2024"), priority: 0.7 },
    // { url: baseURL + pageInfo.pricing, lastModified: new Date("22 Feb 2024"), priority: 0.7 },
    // { url: baseURL + pageInfo.contactUs, lastModified: new Date("22 Feb 2024"), priority: 0.7 },
    // { url: baseURL + pageInfo.dataDeletion, lastModified: new Date("22 Feb 2024"), priority: 0.7 },
    // { url: baseURL + pageInfo.cookiePolicy, lastModified: new Date("22 Feb 2024"), priority: 0.7 },
    // { url: baseURL + pageInfo.advertisement, lastModified: new Date("22 Feb 2024"), priority: 0.7 },
    // { url: baseURL + pageInfo.privacyPolicy, lastModified: new Date("22 Feb 2024"), priority: 0.7 },
    // { url: baseURL + pageInfo.termsAndCondition, lastModified: new Date("22 Feb 2024"), priority: 0.7 },
    // // ? Easter Sunday
    // { url: baseURL + pageInfo.apihub, lastModified: new Date("31 Mar 2024"), priority: 1.0 },
    // { url: baseURL + pageInfo.apihubEndpoints, lastModified: new Date("31 Mar 2024"), priority: 1.0 },
  ];
}
