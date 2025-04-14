"use client";

import { useTheme } from "next-themes";
import useAuthStore from "@stores/auth.store";
import useLayoutStore from "@stores/layout.store";
import Spinner from "@components/shared/spinner/spinner";
import AccountsService from "@services/axios/accounts.service";
import { useEffect, useRef, useCallback, useState } from "react";

export default function RootProvider({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme(),
    prevScrollPosRef = useRef(0),
    accountsService = new AccountsService(),
    [pageReady, setPageReady] = useState(false),
    setDeviceSize = useLayoutStore((state) => state.setDeviceSize),
    setDisplayHeader = useLayoutStore((state) => state.setDisplayHeader);

  useEffect(() => {
    console.log(`%cInitializing WaveRD...${new Date().toLocaleTimeString()}`, "color: yellow; font-family: serif; font-size: 12px");

    accountsService.getProfile().then(({ data, success }) => {
      if (success) {
        setTheme(data.theme);
        useAuthStore.setState({ data: { ...data, authenticated: true } });
      }
    });

    handleResize();
    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll, { passive: true });

    // const observer = new MutationObserver(handleResize);
    // observer.observe(document.body, { childList: true, subtree: false });

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.addedNodes.length) {
          const hasHeaderOrFooter = Array.from(mutation.addedNodes).some((node) => node.nodeName === "HEADER" || node.nodeName === "FOOTER");
          if (hasHeaderOrFooter) handleResize();
        }
      });
    });

    // Observe changes in the body, including subtree if needed
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleResize = useCallback(async () => {
    setPageReady(false);

    setDeviceSize({ width: window.innerWidth, height: window.innerHeight });
    document.documentElement.style.setProperty("--browserHeight", `${window.innerHeight}px`);

    const footerHeight = document.querySelector("footer")?.getBoundingClientRect().height || 0,
      headerHeight = document.querySelector('header[class$="relativeHeader"]')?.getBoundingClientRect().height || 0;

    if (headerHeight && footerHeight) {
      // ? Sizes would not be calculated if header/footer is not available
      document.documentElement.style.setProperty("--footerHeight", `${footerHeight}px`);
      document.documentElement.style.setProperty("--headerHeight", `${headerHeight}px`);
      document.documentElement.style.setProperty("--contentHeight", `${window.innerHeight - (footerHeight + headerHeight + 20)}px`);
    }

    setPageReady(true);
  }, [setDeviceSize]);

  const handleScroll = useCallback(() => {
    const currScrollPos = window.scrollY,
      pageTopReached = currScrollPos < 100,
      scrollingUp = currScrollPos < prevScrollPosRef.current,
      areaHeight = Math.ceil(window.innerHeight + currScrollPos),
      pageBottomReached = areaHeight >= document.body.offsetHeight;

    setDisplayHeader((scrollingUp && !pageTopReached) || pageBottomReached);
    prevScrollPosRef.current = currScrollPos; // Update the previous scroll position.
  }, [setDisplayHeader]);

  return pageReady ? children : <Spinner />;
}
