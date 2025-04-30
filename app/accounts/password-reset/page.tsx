import { Metadata } from "next";
import dynamic from "next/dynamic";

const ResetPasswordContainer = dynamic(() => import("@components/accounts/init-reset/reset-container"));

export const metadata: Metadata = {
  title: "Forgot Password",
  description: "We've made it so easy to reset your password and securely regain access to your WaveRD account. Follow these steps to reset your WaveRD password today!",
  keywords: ["password reset", "forgot password", "soccer manager", "soccer", "waverd", "football manager", "football"],
};

export default function ResetPasswordPage() {
  return <ResetPasswordContainer />;
}
