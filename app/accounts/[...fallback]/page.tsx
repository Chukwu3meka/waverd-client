"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@components/ui/button";

const Result = dynamic(() => import("@components/shared/result/result"));

export default function NotFoundPage() {
  return (
    <Result variant={404}>
      <Link href="/accounts/signin">
        <Button>Back to Sign In</Button>
      </Link>
    </Result>
  );
}
