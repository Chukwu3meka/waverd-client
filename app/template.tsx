"use client";

import { useEffect } from "react";
import { useAppStore } from "@stores/app.store";

export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  const setDisplayHeader = useAppStore((state) => state.setDisplayHeader);

  useEffect(() => {
    // hide sticky header on evrey page navigation
    setDisplayHeader(false);
  }, []);

  return children;
}
