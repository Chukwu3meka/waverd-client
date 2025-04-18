"use client";

import dynamic from "next/dynamic";
import styles from "./layouts.module.scss";
import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from "@/components/ui/skeleton";

import { ReactNode } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@components/ui/carousel";

const Header = dynamic(() => import("@components/shared/header/header-container"), { loading: () => <Skeleton className="h-[var(--headerHeight)] w-full" /> }),
  Footer = dynamic(() => import("@components/shared/footer/footer-container"), { loading: () => <Skeleton className="h-[var(--footerHeight)] w-full" /> });

export default function Accounts({ children }: { children: ReactNode }) {
  return (
    <main className="grid-rows-[auto_max-content]">
      <div className="lg:grid lg:grid-cols-[minmax(300,550px)_minmax(500px,auto)]">
        <aside className={`${styles.slides} hidden lg:block`}>
          <Carousel plugins={[Autoplay({ delay: 3000 })]} opts={{ align: "center", loop: true }}>
            <CarouselContent>
              {slides.map((features, id) => (
                <CarouselItem key={id} className="basis-1/1">
                  {features}
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </aside>
        <div>
          <Header position="relative" />
          <div className="max-w-7xl m-auto grid p-5 min-h-[var(--contentHeight)]">{children}</div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
const slides = [
  <>
    <h5>It's great to see you again</h5>
    <h2>We're glad you're here</h2>
    <h3>It's time to roll your sleeves</h3>
    <h4>Signin and let's begin</h4>
  </>,

  <>
    <h2>We are happy to have you!!!</h2>
    <h3>WaveRD was built to meet your need of real soccer experience</h3>
    <ul>
      <li>Interactive Play</li>
      <li>Realistic Transfer &amp; Player's Condition</li>
      <li>Major League &amp; Competitions</li>
    </ul>
  </>,

  <>
    <h1>World of Managers</h1>
    <h2>Take your team to the peak</h2>
    <h3>Tactics &amp; Performance</h3>
  </>,

  <>
    <h2>Why WaveRD?</h2>
    <ul>
      <li>Free forever</li>
      <li>No. 1 Soccer manager</li>
      <li>Highly Interactive</li>
      <li>Competitive transfer market</li>
      <li>No player hoarding</li>
    </ul>
  </>,

  <>
    <h2>We are happy to have you onboard</h2>
    <h4>We promise the best, and to keep you up to date, with the best tips on how to rule the game and win trophies</h4>
    <h3>Complete registration to explore and the universal home to soccer managers</h3>
  </>,

  <>
    <h2>Your'e in</h2>
    <h3>We'll be in touch shortly!</h3>
    <h4>***FOR THE BOLD AND AWESOME***</h4>
    <h3>Your players are hungry to see you take charge, click "CONTINUE" to feed their flames</h3>
  </>,

  <>
    <h2>Password Reset</h2>
    <h3>A verification mail wait an OTP will be sent to your mail.</h3>
    <h4>Copy and paste the OTP to verify ownership.</h4>
  </>,
];
