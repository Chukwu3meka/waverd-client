"use client";

import Link from "next/link";
import Result from "@components/shared/result/result";

import { Button } from "@components/ui/button";
import { useSearchParams } from "next/navigation";

type Status = "success" | "failed";

export default function () {
  const searchParams = useSearchParams(),
    status = searchParams.get("status") as Status;

  switch (status) {
    case "success":
      return (
        <Result variant={200} title="Email Verified">
          <p>
            We are delighted to inform you that your account has been successfully verified. You can now log in to our platform and start using our services. Thank you
            for choosing our platform. We are confident that you will find our services beneficial and we look forward to serving you. We use cookies to ensure that we
            give you the best experience on our website. By continuing to browse this site, you agree to our use of cookies. To learn more about cookies and how we use
            them, please see our Privacy Policy.
          </p>

          <Link href="/accounts/signin">
            <Button>Sign in</Button>
          </Link>
        </Result>
      );
    case "failed":
      return (
        <Result variant={500} title="Failed to verified email">
          <p>
            Unfortunately, we were unable to verify your email. However, you should click the most recent link sent to you or paste link directly instead of typing. We
            appreciate your choice of our platform and are certain that you will find our services useful. Our team is always available to address any inquiries or issues
            you may have, so please feel free to contact us at any time. Thank you.
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
