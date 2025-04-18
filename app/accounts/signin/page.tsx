import { Metadata } from "next";
import dynamic from "next/dynamic";

const SignInContainer = dynamic(() => import("@components/accounts/signin/signin-container"));

export const metadata: Metadata = {
  title: "Sign In",
  keywords: ["signin", "login", "soccer manager", "soccer", "waverd", "football manager", "football"],
  description:
    "Seamlessly sign in to your account to enjoy premium contents created specially for you. Access real time updates, optimization, and many more - sign in to Wave Research now!",
};

export default function SignInPage() {
  return <SignInContainer />;
}
