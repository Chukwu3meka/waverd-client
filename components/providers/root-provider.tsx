"use client";

import { sleep } from "@lib/helpers";
import { connect } from "react-redux";
import { setProfileAction } from "@store/actions/account";
import { INIT_PROFILE, BREAKPOINTS } from "@lib/constants";
import { useEffect, useState, useRef, useCallback } from "react";
import { setBreakpointAction, setDeviceSizeAction, setDisplayHeaderAction } from "@store/actions/layout";

interface RootProviderProps {
  displayHeader: boolean;
  children: React.ReactNode;
  setProfileAction: (profile: any) => void;
  setDisplayHeaderAction: (display: boolean) => void;
  setBreakpointAction: (breakpoint: Breakpoint) => void;
  setDeviceSizeAction: (size: { width: number; height: number }) => void;
}

const RootProvider = ({
  children,
  setProfileAction,
  setDeviceSizeAction,
  setBreakpointAction,
  setDisplayHeaderAction,
  displayHeader: reduxDisplayHeader,
}: RootProviderProps) => {
  const profile = INIT_PROFILE,
    prevScrollPosRef = useRef(0),
    [displayHeader, setDisplayHeader] = useState(reduxDisplayHeader);

  useEffect(() => {
    console.log(`%cInitializing WaveRD...${new Date().toLocaleTimeString()}`, "color: green; font-family: serif; font-size: 12px");

    setDisplayHeader(true);
    setProfileAction(profile);
    sleep(3).finally(() => handleResize()); // delay execution of calc since footer/header is dynamically loaded

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = useCallback(async () => {
    let [headerHeight, footerHeight] = [0, 0];
    const { innerWidth, innerHeight } = window;
    setDeviceSizeAction({ width: innerWidth, height: innerHeight });

    const { xl, lg, md, sm } = BREAKPOINTS;
    setBreakpointAction(innerWidth > xl ? "xl" : innerWidth > lg ? "lg" : innerWidth > md ? "md" : innerWidth > sm ? "sm" : "xs");

    const footerElement = document.querySelector("footer");
    if (footerElement) footerHeight = footerElement.getBoundingClientRect().height;

    const headerElement = document.querySelector("header");
    if (headerElement) headerHeight = headerElement.getBoundingClientRect().height;

    document.documentElement.style.setProperty("--headerHeight", `${headerHeight}px`);
    document.documentElement.style.setProperty("--footerHeight", `${footerHeight}px`);
    document.documentElement.style.setProperty("--availHeight", `${innerHeight - (footerHeight + headerHeight)}px`);
  }, [setDeviceSizeAction, setBreakpointAction]);

  const handleScroll = useCallback(() => {
    const currentScrollPos = window.scrollY;
    const pageTopReached = currentScrollPos < 81;
    const scrollingUp = currentScrollPos < prevScrollPosRef.current;
    const areaHeight = Math.round(window.innerHeight + currentScrollPos) + 2;
    const pageBottomReached = areaHeight >= document.body.offsetHeight;

    const newDisplayHeader = !pageTopReached && (scrollingUp || pageBottomReached);

    prevScrollPosRef.current = currentScrollPos; // Update the previous scroll position.

    if (newDisplayHeader !== displayHeader) {
      setDisplayHeader(newDisplayHeader);
      setDisplayHeaderAction(newDisplayHeader);
    }
  }, [displayHeader, setDisplayHeaderAction]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    if (reduxDisplayHeader !== displayHeader) {
      setDisplayHeader(!!reduxDisplayHeader);
    }
  }, [reduxDisplayHeader, displayHeader]);

  return children;
};

const mapStateToProps = (state: RootState) => ({ displayHeader: state.layout.displayHeader }),
  mapDispatchToProps = { setProfileAction, setDeviceSizeAction, setDisplayHeaderAction, setBreakpointAction };

export default connect(mapStateToProps, mapDispatchToProps)(RootProvider);
