"use client";

import Spinner from "@components/shared/spinner/spinner";

import { connect } from "react-redux";
import { INIT_PROFILE } from "@lib/constants";
import { setProfileAction } from "@store/actions/account";
import { useEffect, useRef, useCallback, useState } from "react";
import { setDeviceSizeAction, setDisplayHeaderAction } from "@store/actions/layout";

interface RootProviderProps {
  children: React.ReactNode;
  setProfileAction: (profile: any) => void;
  setDisplayHeaderAction: (display: boolean) => void;
  setDeviceSizeAction: (size: { width: number; height: number }) => void;
}

const RootProvider = ({ children, setProfileAction, setDeviceSizeAction, setDisplayHeaderAction }: RootProviderProps) => {
  const prevScrollPosRef = useRef(0),
    [pageReady, setPageReady] = useState(false);

  useEffect(() => {
    console.log(`%cInitializing WaveRD...${new Date().toLocaleTimeString()}`, "color: yellow; font-family: serif; font-size: 12px");

    handleResize();
    setProfileAction(INIT_PROFILE);
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

    setDeviceSizeAction({ width: window.innerWidth, height: window.innerHeight });
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
  }, [setDeviceSizeAction]);

  const handleScroll = useCallback(() => {
    const currScrollPos = window.scrollY,
      pageTopReached = currScrollPos < 100,
      scrollingUp = currScrollPos < prevScrollPosRef.current,
      areaHeight = Math.round(window.innerHeight + currScrollPos),
      pageBottomReached = areaHeight >= document.body.offsetHeight;

    setDisplayHeaderAction((scrollingUp && !pageTopReached) || pageBottomReached);
    prevScrollPosRef.current = currScrollPos; // Update the previous scroll position.
  }, [setDisplayHeaderAction]);

  return pageReady ? children : <Spinner />;
};

const mapDispatchToProps = { setProfileAction, setDeviceSizeAction, setDisplayHeaderAction },
  mapStateToProps = (state: RootState) => ({ displayHeader: state.layout.displayHeader });

export default connect(mapStateToProps, mapDispatchToProps)(RootProvider);
