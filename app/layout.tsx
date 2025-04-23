import "./globals.css";
import fonts from "@lib/fonts";
import dynamic from "next/dynamic";
import type { Metadata } from "next";

const Provider = dynamic(() => import("../components/shared/providers/root")),
  ThemeProvider = dynamic(() => import("@components/shared/providers/theme")),
  Header = dynamic(() => import("@components/shared/header/header-container")),
  Footer = dynamic(() => import("@components/shared/footer/footer-container")),
  Analytics = dynamic(() => import("@vercel/analytics/next").then((m) => m.Analytics)),
  Toaster = dynamic(() => import("@/components/ui/sonner").then((mod) => mod.Toaster)),
  SpeedInsights = dynamic(() => import("@vercel/speed-insights/next").then((m) => m.SpeedInsights));

export const metadata: Metadata = {
  title: "WaveRD",
  keywords: ["soccer manager", "soccer", "waverd", "Soccer Manager", "football"],
  description: "Revamped Soccer Manager with advanced simulation and Football API Provider. Available 24/7",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <html lang="en" className={`${fonts} antialiased`} suppressHydrationWarning>
        <head>
          <link
            rel="icon"
            href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>✌</text></svg>"></link>
        </head>
        <Analytics />
        <SpeedInsights />

        <body>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Header position="sticky" />
            <main>
              <Header position="relative" />
              <Provider>{children}</Provider>
              <Footer />
            </main>
            <Toaster richColors />
          </ThemeProvider>
        </body>
      </html>
    </>
  );
}
