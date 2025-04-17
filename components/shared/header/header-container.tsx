"use client";

import Header from "./header";
import { useEffect, useState } from "react";
import { resizeHandler } from "@lib/helpers";
import { useAppStore } from "@stores/app.store";

export type Positions = "relative" | "sticky" | "hidden";

export default function HeaderContainer({ position }: { position: Positions }) {
  const [showNav, setShowNav] = useState(false),
    deviceWidth = useAppStore((state) => state.layout.width),
    setDisplayHeader = useAppStore((state) => state.setDisplayHeader),
    displayHeader = useAppStore((state) => state.layout.displayHeader),
    { authenticated, ...profile } = useAppStore((state) => state.profile);

  useEffect(() => {
    resizeHandler();
  }, []);

  useEffect(() => {
    const className = position === "relative" ? position : displayHeader ? position : "hidden",
      headerElement = document.querySelector(`[class*="${className}"`);

    // Regex to match relative ignoring ID react will attach to module.scss
    if (headerElement instanceof HTMLElement) setShowNav(headerElement.offsetWidth > 850);
  }, [deviceWidth, displayHeader, position]);

  return <Header {...{ profile, showNav, authenticated, setDisplayHeader, className: position === "relative" ? position : displayHeader ? position : "hidden" }} />;
}
