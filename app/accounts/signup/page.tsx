import { Metadata } from "next";

import dynamic from "next/dynamic";

const ComingSoon = dynamic(() => import("@components/shared/coming-soon/ComingSoonContainer"));

export const metadata: Metadata = {
  title: "Wave Research: Sign Up",
  keywords: ["signup", "register", "soccer manager", "soccer", "waverd", "football manager", "football"],
  description:
    "Embark on an exciting Soccer journey without limit! Register for Wave Research to enjoy premium features, and experience the best competitions in soccer and football data provider.",
};

const page = () => <ComingSoon finishDate={new Date("2025-04-01")} />;

export default page;
