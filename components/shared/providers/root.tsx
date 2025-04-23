"use client";

import { useEffect, useRef } from "react";
import { resizeHandler } from "@lib/helpers";
import { useAppStore } from "@stores/app.store";
import { useReportWebVitals } from "next/web-vitals";

export default function Provider({ children }: { children: React.ReactNode }) {
  verifySession();

  const prevScrollPosRef = useRef(0),
    setDisplayHeader = useAppStore((state) => state.setDisplayHeader);

  useReportWebVitals((metric) => {
    if (process.env.NODE_ENV === "development") console.log({ ...metric });
  });

  useEffect(() => {
    console.log(`%cInitializing WaveRD...${new Date().toLocaleTimeString()}`, "color: yellow; font-family: serif; font-size: 12px");

    window.addEventListener("resize", resizeHandler);
    window.addEventListener("scroll", handleScroll, { passive: true });

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

  return children;
}

const verifySession = async () => {
  import("@services/axios/accounts.service").then((mod) => {
    const accountsService = new mod.default();

    accountsService.getProfile().then(({ data, success }) => {
      if (success) {
        import("@stores/app.store").then((mod) => {
          mod.useAppStore.setState((state) => ({ ...state, profile: { ...data, authenticated: true } }));
        });
      }
    });
  });
};
