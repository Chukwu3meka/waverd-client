"use client";

import Link from "next/link";
import SocialIcons from "../social/social-icons";

import { BREAKPOINTS, LOGO } from "@lib/constants";
import { GrSystem as SysModeIcon } from "react-icons/gr";
import { Tabs, TabsList, TabsTrigger } from "@components/ui/tabs";
import { FaMoon as DarkModeIcon, FaSun as LightModeIcon } from "react-icons/fa";
import { useEffect } from "react";

type FooterProps = { theme: Theme; deviceWidth: number; themeHandler: (theme: Theme) => () => void };

export default function Footer({ theme, themeHandler, deviceWidth }: FooterProps) {
  return (
    <footer data-testid="footer" className="flex flex-col text-center px-2.5 bg-accent">
      <main className="py-3.5 flex gap-5 justify-center md:justify-between">
        <aside className="flex flex-col">
          <span className="font-bold text-3xl">WaveRD</span>
          <span className="text-6xl p-3">{LOGO}</span>
          <span className="bg-muted px-2 mb-2">Follow US</span>
          <SocialIcons filterParams={["twitter", "instagram", "github", "whatsapp", "linkedin", "phone", "facebook"]} fontSize="20px" />
        </aside>

        {deviceWidth >= BREAKPOINTS.md && (
          <nav className="flex flex-wrap gap-x-10">
            <div className="flex flex-col items-start gap-y-1.5">
              <label className="text-xl font-extrabold mb-2">WaveRD</label>

              <a href="https://blog.waverd.com/">Blog</a>
              <Link href="/info/organization">Organization</Link>
              <Link href="/accounts/password-reset">Forgot Password</Link>
              <Link href="/info/advertisement">Advertisement</Link>
              <Link href="/info/contact-us">Bug Report</Link>
              {/* <a href="https://github.com/WaveRD-Inc/WaveRD-Web/issues" rel="noopener noreferrer" target="_blank"></a> */}
            </div>

            <div className="flex flex-col items-start gap-y-1.5">
              <label className="text-xl font-extrabold mb-2">Learn More</label>

              <Link href="/info/contact-us">Contact Us</Link>
              <Link href="/info/terms-and-conditions">Terms &amp; Conditions</Link>
              <Link href="/info/privacy-policy">Privacy Policy</Link>
              <Link href="/info/faq">Freq. Asked Questions</Link>
              <Link href="/info/data-deletion">Data Deletion</Link>
            </div>

            <div className="flex flex-col items-start gap-y-1.5">
              <label className="text-xl font-extrabold mb-2">Partners</label>

              <a href="https://apihub.waverd.com/">API Hub</a>
              <Link href="/info/sponsors">Our Sponsors</Link>
              <a href="https://games.waverd.com/">Soccer Manager</a>
              <a href="https://translate.waverd.com/">Translation</a>
              <a href="https://waverd.com/">Jobs & Career</a>
              {/* <a href="https://waverd.com/">Agriculture</a> */}
              {/* <a href="https://waverd.com/">Homes & Space</a> */}
              {/* <a href="https://waverd.com/">Hourly Jobs</a> */}
            </div>
          </nav>
        )}
      </main>

      <section className="p-2.5 flex flex-col w-full gap-2.5">
        <span className="text-sm">
          ● All rights reserved. All trademarks are the property of their respective owners ●<span></span>
        </span>

        <span className="text-xs">
          <span>
            Powered with 💗 by&nbsp;
            <a href="https://vercel.com/" rel="noopener noreferrer" target="_blank">
              Vercel
            </a>
            ,&nbsp;
            <a href="https://mongodb.com/" rel="noopener noreferrer" target="_blank">
              MongoDB
            </a>
            &nbsp;&&nbsp;
            <a href="https://render.com/" rel="noopener noreferrer" target="_blank">
              Render
            </a>
          </span>
        </span>

        <div className="flex flex-wrap w-full items-center justify-between">
          <span>© {new Date().getFullYear()}, WaveRD.</span>

          <Tabs value={theme}>
            <TabsList>
              <TabsTrigger value="system" className="cursor-pointer h-7" onClick={themeHandler("system")}>
                <SysModeIcon size=".9em" aria-label="System mode" />
              </TabsTrigger>
              <TabsTrigger value="light" className="cursor-pointer h-7" onClick={themeHandler("light")}>
                <LightModeIcon size=".8em" aria-label="Light mode" />
              </TabsTrigger>
              <TabsTrigger value="dark" className="cursor-pointer h-7" onClick={themeHandler("dark")}>
                <DarkModeIcon size=".7em" aria-label="Dark mode" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>
    </footer>
  );
}
