"use client";

import { useEffect } from "react";
import { useAppStore } from "@stores/app.store";

export default function Template({ children }: Readonly<{ children: React.ReactNode }>) {
  const setDisplayHeader = useAppStore((state) => state.setDisplayHeader);

  useEffect(() => {
    setDisplayHeader(false); // ? hide sticky header on every page navigation
  }, []);

  return children;
}
