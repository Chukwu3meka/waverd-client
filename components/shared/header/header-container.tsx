"use client";

import Header from "./header";
import { useEffect, useState } from "react";
import useLayoutStore from "@stores/layout.store";
import useAuthStore from "../../../stores/auth.store";

type ClassName = "relativeHeader" | "stickyHeader" | "hiddenHeader";

export default function HeaderContainer({ position }: { position: "relative" | "sticky" }) {
  const [showNav, setShowNav] = useState(false),
    deviceWidth = useLayoutStore((state) => state.data.width),
    displayHeader = useLayoutStore((state) => state.data.displayHeader),
    setDisplayHeader = useLayoutStore((state) => state.setDisplayHeader),
    { authenticated, ...profile } = useAuthStore((state) => state.data),
    [className, setClassName] = useState<ClassName>(position === "relative" ? "relativeHeader" : "hiddenHeader");

  useEffect(() => {
    if (position === "sticky") setClassName(displayHeader ? "stickyHeader" : "hiddenHeader");
  }, [displayHeader]);

  useEffect(() => {
    // Regex to match relativeHeader ignoring ID react will attach to module.scss
    const headerElement = document.querySelector(`[class*="${className}"`);

    if (headerElement instanceof HTMLElement) {
      const offsetWidth = headerElement.offsetWidth;
      setShowNav(offsetWidth > 850);
    }
  }, [deviceWidth]);

  return <Header {...{ className, authenticated, profile, showNav, setDisplayHeader: setDisplayHeader }} />;
}
