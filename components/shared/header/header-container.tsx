"use client";

import Header from "./header";
import { useEffect } from "react";
import { resizeHandler } from "@lib/helpers";
import { useAppStore } from "@stores/app.store";

export type Positions = "relative" | "sticky" | "hidden";

export default function HeaderContainer({ position }: { position: Positions }) {
  const setDisplayHeader = useAppStore((state) => state.setDisplayHeader);
  const displayHeader = useAppStore((state) => state.layout.displayHeader);
  const { authenticated, ...profile } = useAppStore((state) => state.profile);

  useEffect(() => {
    resizeHandler();
  }, []);

  return <Header {...{ profile, authenticated, setDisplayHeader, className: position === "relative" ? position : displayHeader ? position : "hidden" }} />;
}
