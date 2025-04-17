"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@components/ui/button";

const Result = dynamic(() => import("@components/shared/result/result")),
  Footer = dynamic(() => import("@components/shared/footer/footer-container")),
  Header = dynamic(() => import("@components/shared/header/header-container"));

export default function NotFoundPage() {
  return (
    <main>
      <Header position="relative" />

      <div className="h-[var(--contentHeight)] flex justify-center items-center">
        <Result variant={404}>
          <Link href="/">
            <Button>Back Home</Button>
          </Link>
        </Result>
      </div>

      <Footer />
    </main>
  );
}
