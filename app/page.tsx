import dynamic from "next/dynamic";

import { Separator } from "@components/ui/separator";

const ApiHub = dynamic(() => import("@components/home/apihub-intro")),
  WelcomeInto = dynamic(() => import("@components/home/welcome-intro")),
  ManagerIntro = dynamic(() => import("@components/home/manager-intro")),
  Footer = dynamic(() => import("@components/shared/footer/footer-container")),
  Header = dynamic(() => import("@components/shared/header/header-container"));

export default function HomePage() {
  return (
    <main className="grid-rows[max-content auto max-content]">
      <Header position="relative" />
      <div className="mb-10">
        <WelcomeInto />
        <ManagerIntro />
        <Separator />
        <ApiHub />
      </div>
      <Footer />
    </main>
  );
}
