"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";
import { resizeHandler } from "@lib/helpers";
import { useAppStore } from "@stores/app.store";
import AccountsService from "@services/axios/accounts.service";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const ThemeProvider = ({ children, ...props }: React.ComponentProps<typeof NextThemesProvider>) => {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
};

export default function RootTemplate({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme(),
    prevScrollPosRef = useRef(0),
    accountsService = new AccountsService(),
    setDisplayHeader = useAppStore((state) => state.setDisplayHeader);

  useEffect(() => {
    console.log(`%cInitializing WaveRD...${new Date().toLocaleTimeString()}`, "color: yellow; font-family: serif; font-size: 12px");

    try {
      accountsService.getProfile().then(({ data, success }) => {
        if (success) {
          setTheme(data.theme);
          useAppStore.setState({ profile: { ...data, authenticated: true } });
        }
      });
    } catch (error) {}

    setTimeout(() => {
      window.addEventListener("resize", resizeHandler);
      window.addEventListener("scroll", handleScroll, { passive: true });
    }, 5000);

    return () => {
      window.removeEventListener("resize", resizeHandler);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    const currScrollPos = window.scrollY,
      pageTopReached = currScrollPos < 100,
      scrollingUp = currScrollPos < prevScrollPosRef.current,
      areaHeight = Math.ceil(window.innerHeight + currScrollPos),
      pageBottomReached = areaHeight >= document.body.offsetHeight;

    setDisplayHeader((scrollingUp && !pageTopReached) || pageBottomReached);
    prevScrollPosRef.current = currScrollPos; // Update the previous scroll position.
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </ThemeProvider>
  );
}
