import "./globals.css";
import fonts from "@lib/fonts";
import dynamic from "next/dynamic";
import type { Metadata } from "next";

const App = dynamic(() => import("@/components/providers/root-provider")),
  Header = dynamic(() => import("@components/shared/header/header-container")),
  ReduxProvider = dynamic(() => import("@/components/providers/redux-provider")),
  ThemeProvider = dynamic(() => import("@/components/providers/theme-provider")),
  Analytics = dynamic(() => import("@vercel/analytics/next").then((m) => m.Analytics)),
  SpeedInsights = dynamic(() => import("@vercel/speed-insights/next").then((m) => m.SpeedInsights));

export const metadata: Metadata = {
  title: "Wave Research",
  keywords: ["soccer manager", "soccer", "wave", "football manager", "football", "api"],
  description: "Football Manager for everyone with advanced real world simulation and Football API Provider for all your soccer data needs. Available Everywhere at every time!",
};

const RootLayout = ({ children }: Readonly<{ children: React.ReactNode }>) => (
  <html lang="en" suppressHydrationWarning>
    <body className={`${fonts} antialiased`}>
      <ReduxProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <App>
            <Header position="sticky" />
            {children}
          </App>
        </ThemeProvider>
      </ReduxProvider>

      <Analytics />
      <SpeedInsights />
    </body>
  </html>
);

export default RootLayout;
