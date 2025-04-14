"use client";

import Header from "./header";
import { useEffect, useState } from "react";
import useLayoutStore from "@stores/layout.store";
import useAuthStore from "../../../stores/auth.store";

export default function HeaderContainer({ position }: { position: "relative" | "sticky" }) {
  const [showNav, setShowNav] = useState(false),
    deviceWidth = useLayoutStore((state) => state.data.width),
    { authenticated, ...profile } = useAuthStore((state) => state.data),
    displayHeader = useLayoutStore((state) => state.data.displayHeader),
    setDisplayHeader = useLayoutStore((state) => state.setDisplayHeader);

  useEffect(() => {
    const className = position === "sticky" && displayHeader ? "stickyHeader" : position === "relative" ? "relativeHeader" : "hiddenHeader",
      headerElement = document.querySelector(`[class*="${className}"`); // Regex to match relativeHeader ignoring ID react will attach to module.scss

    if (headerElement instanceof HTMLElement) {
      setShowNav(headerElement.offsetWidth > 850);
    }
  }, [deviceWidth]);

  return (
    <Header
      {...{
        profile,
        showNav,
        authenticated,
        setDisplayHeader: setDisplayHeader,
        className: position === "sticky" && displayHeader ? "stickyHeader" : position === "relative" ? "relativeHeader" : "hiddenHeader",
      }}
    />
  );
}
