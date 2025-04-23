"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@components/ui/button";

const Result = dynamic(() => import("@components/shared/result/result"));

export default function NotFoundPage() {
  return (
    <main className="h-[var(--contentHeight)] flex justify-center items-center">
      <Result variant={404}>
        <Link href="/">
          <Button>Back Home</Button>
        </Link>
      </Result>
    </main>
  );
}
