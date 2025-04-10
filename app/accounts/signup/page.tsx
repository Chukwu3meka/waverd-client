import { Metadata } from "next";
import dynamic from "next/dynamic";

const SignUpContainer = dynamic(() => import("@components/accounts/signup/signup-container"));

export const metadata: Metadata = {
  title: "Sign Up",
  keywords: ["signup", "register", "soccer manager", "soccer", "waverd", "football manager", "football"],
  description:
    "Embark on an exciting Soccer journey without limit! Register today to enjoy premium features, and experience the best competitions in soccer and football data provider.",
};

const RegisterPage = () => <SignUpContainer />;
export default RegisterPage;

// import ComingSoon from "@components/shared/coming-soon/ComingSoonContainer";

// const page = () => <ComingSoon finishDate={new Date("2025-04-10")} />;

// export default page;
