import "./globals.css";
import fonts from "@lib/fonts";
import dynamic from "next/dynamic";

const Root = dynamic(() => import("@/components/providers/root-provider")),
  Header = dynamic(() => import("@components/shared/header/header-container")),
  ThemeProvider = dynamic(() => import("@/components/providers/theme-provider")),
  ReduxProvider = dynamic(() => import("@/components/providers/redux-provider")),
  Analytics = dynamic(() => import("@vercel/analytics/next").then((m) => m.Analytics)),
  Toaster = dynamic(() => import("@/components/ui/sonner").then((mod) => mod.Toaster)),
  SpeedInsights = dynamic(() => import("@vercel/speed-insights/next").then((m) => m.SpeedInsights));

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" className={`${fonts} antialiased`} suppressHydrationWarning>
    <head>
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%2210 0 100 100%22><text y=%22.90em%22 font-size=%2290%22>✌</text></svg>"></link>
    </head>
    <body>
      <ReduxProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Root>
            <Header position="sticky" />
            {children}
          </Root>
        </ThemeProvider>
      </ReduxProvider>

      <Toaster />
      <Analytics />
      <SpeedInsights />
    </body>
  </html>
);

export default RootLayout;
