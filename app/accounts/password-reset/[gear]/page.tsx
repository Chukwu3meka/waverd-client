import Link from "next/link";
import dynamic from "next/dynamic";
import { Button } from "@components/ui/button";

const Result = dynamic(() => import("@components/shared/result/result")),
  ResetPasswordContainer = dynamic(() => import("@components/accounts/confirm-reset/reset-container"));

export default function ConfirmPasswordResetPage({ params: { gear } }: { params: { gear: string } }) {
  if (gear) return <ResetPasswordContainer gear={gear} />;

  return (
    <Result variant={404} title="Invalid Reset link">
      <p className="text-center">
        We're sorry, but this password reset link is invalid or has expired. Please make sure you're using the latest password reset email we sent you. If you continue to
        experience issues, please contact our <Link href="info/contact">support team</Link> for further assistance.
      </p>

      <Link href="/accounts/signin">
        <Button>Back to Sign In</Button>
      </Link>
    </Result>
  );
}
