import { Metadata } from "next";

import EmailVerified from "@components/accounts/email-verified/email-verified";

export const metadata: Metadata = {
  title: "WaveRD: Email Verification",
};

export default function Page() {
  return <EmailVerified />;
}
