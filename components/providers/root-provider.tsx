"use client";

import { connect } from "react-redux";
import { setProfileAction } from "@store/actions/account";
import { useEffect, useState, useRef, useCallback } from "react";
import { INIT_PROFILE, HEADER_HEIGHT, BREAKPOINTS } from "@lib/constants";
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

    handleResize();
    setDisplayHeader(true);
    setProfileAction(profile);
    document.documentElement.style.setProperty("--headerHeight", `${HEADER_HEIGHT}px`);
    document.documentElement.style.setProperty("--visibleScreen", `${window.innerHeight}px`);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleResize = useCallback(() => {
    const { innerWidth: width, innerHeight: height } = window;
    setDeviceSizeAction({ width, height });

    const { xl, lg, md, sm } = BREAKPOINTS;
    const breakpoint = width > xl ? "xl" : width > lg ? "lg" : width > md ? "md" : width > sm ? "sm" : "xs";
    setBreakpointAction(breakpoint);

    document.documentElement.style.setProperty("--visibleScreen", `${height}px`);
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
