"use client";

import Link from "next/link";
import styles from "./styles.module.scss";
import SocialIcons from "../social/social-icons";

import { LOGO } from "@lib/constants";
import { FaCloudSun, FaMoon, FaSun } from "react-icons/fa";
import { Tabs, TabsList, TabsTrigger } from "@components/ui/tabs";

const Footer = ({ theme, themeHandler }: { theme: Theme; themeHandler: (theme: Theme) => () => void }) => (
  <div data-testid="footer" className={styles.footer}>
    <footer>
      <main>
        <aside>
          <span className="font-bold text-3xl">WaveRD</span>
          <span className="text-7xl p-3">{LOGO}</span>
          <span className="bg-muted px-2">Follow US</span>
          <SocialIcons filterParams={["twitter", "instagram", "github", "whatsapp", "linkedin", "phone", "facebook"]} fontSize="20px" />
        </aside>

        <nav>
          <div>
            <label>WaveRD</label>

            <a href="https://blog.waverd.com/">Blog</a>
            <Link href="/info/organization">Organization</Link>
            <Link href="/accounts/password-reset">Forgot Password</Link>
            <Link href="/info/advertisement">Advertisement</Link>
            <Link href="/info/contact-us">Bug Report</Link>
            {/* <a href="https://github.com/WaveRD-Inc/WaveRD-Web/issues" rel="noopener noreferrer" target="_blank"></a> */}
          </div>

          <div>
            <label>Learn More</label>

            <Link href="/info/contact-us">Contact Us</Link>
            <Link href="/info/terms-and-condition">Terms &amp; Conditions</Link>
            <Link href="/info/privacy-policy">Privacy Policy</Link>
            <Link href="/info/faq">Freq. Asked Questions</Link>
            <Link href="/info/data-deletion">Data Deletion</Link>
          </div>

          <div>
            <label>Partners</label>

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
      </main>

      <section>
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
              <TabsTrigger value="light" className="cursor-pointer h-7" onClick={themeHandler("light")}>
                <FaSun size=".8em" />
              </TabsTrigger>
              <TabsTrigger value="dark" className="cursor-pointer h-7" onClick={themeHandler("dark")}>
                <FaMoon size=".7em" />
              </TabsTrigger>
              <TabsTrigger value="system" className="cursor-pointer h-7" onClick={themeHandler("system")}>
                <FaCloudSun size=".9em" />
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </section>
    </footer>
  </div>
);

export default Footer;
