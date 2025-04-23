import { Metadata } from "next";
import dynamic from "next/dynamic";

const SignUpContainer = dynamic(() => import("@components/accounts/signup/signup-container"), { loading: () => <p>dasdasd</p> });

export const metadata: Metadata = {
  title: "Sign Up",
  keywords: ["signup", "register", "soccer manager", "soccer", "waverd", "football manager", "football"],
  description:
    "Embark on an exciting Soccer journey without limit! Register today to enjoy premium features, and experience the best competitions in soccer and football data provider.",
};

export default function RegisterPage() {
  return <SignUpContainer />;
}
