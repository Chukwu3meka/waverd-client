import { MetadataRoute } from "next";

const manifest = (): MetadataRoute.Manifest => ({
  name: "WaveRD",
  short_name: "WaveRD",
  description:
    "WaveRD: Online Football Management Game and provider of Football data APIs, offering cutting-edge formations, tactics, a lifelike transfer market and so much more.",
  start_url: "/",
  display: "standalone",
  // background_color: "#fff",
  theme_color: "#fff",
  icons: [
    {
      src: "/favicon.ico",
      // sizes: "any",
      sizes: "32x32",
      type: "image/x-icon",
    },
  ],
});

export default manifest;
