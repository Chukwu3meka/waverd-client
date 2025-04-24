"use client";

import Link from "next/link";
import { Button } from "@components/ui/button";
import { useSearchParams } from "next/navigation";
import Result from "@components/shared/result/result";

export default function EmailVerifiedPage() {
  const searchParams = useSearchParams(),
    status = searchParams.get("status") as "success" | "failed";

  switch (status) {
    case "success":
      return (
        <Result variant={200} title="Email Verified">
          <p className="text-center">
            We are delighted to inform you that your account has been verified. Kindly note that by browsing this site, you agree to our use of cookies. To learn more
            about cookies and how we use them, please see our Privacy Policy.
          </p>

          <Link href="/accounts/signin">
            <Button>Sign in</Button>
          </Link>
        </Result>
      );
    case "failed":
      return (
        <Result variant={500} title="Failed to verified email">
          <p className="text-center">
            Unfortunately, we were unable to verify your email. However, you can click the most recent link sent to you or paste link directly instead of typing. Our team
            is always available to address any inquiries or issues you may have. Thank you.
          </p>

          <Link href="/info/contact">
            <Button>Contact US</Button>
          </Link>
        </Result>
      );
    default:
      return (
        <Result variant={404}>
          <Link href="/">
            <Button>Back Home</Button>
          </Link>
        </Result>
      );
  }
}
