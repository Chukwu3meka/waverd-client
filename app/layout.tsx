import "styles/globals.scss";

import { Metadata } from "next";
import { Merienda, Roboto_Slab } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import StoreProvider from "components/providers/StoreProvider";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";

import { ReactChildren } from "interfaces/components/shared.interface";
import { Suspense } from "react";

const merienda = Merienda({ subsets: ["latin"] });
const robotoSlab = Roboto_Slab({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "SoccerMASS",
  description: "SoccerMASS: Football Manager, API Provider and much more.",
  keywords: ["soccer manager", "soccer", "soccermass", "football manager", "football"],
};

export default function RootLayout({ children }: ReactChildren) {
  return (
    <html lang="en">
      <body className={`${merienda.className}  ${robotoSlab.className}`}>
        <AppRouterCacheProvider>
          <StoreProvider>
            <Suspense>{children}</Suspense>
          </StoreProvider>
        </AppRouterCacheProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
