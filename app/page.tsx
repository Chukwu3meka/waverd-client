import { Metadata } from "next";
import dynamic from "next/dynamic";
import { Separator } from "@components/ui/separator";

const Footer = dynamic(() => import("@components/shared/footer/footer")),
  ApiHubScreen = dynamic(() => import("@components/home/apihub-screen")),
  WelcomeScreen = dynamic(() => import("@components/home/welcome-screen")),
  ManagerScreen = dynamic(() => import("@components/home/manager-screen")),
  Header = dynamic(() => import("@components/shared/header/header-container"));

export const metadata: Metadata = {
  title: "WaveRD",
  description:
    "Revamped Soccer Manager for everyone with advanced real world simulation and Football API Provider for all your soccer data needs. Available Everywhere at every time",
  keywords: ["soccer manager", "soccer", "waverd", "Soccer Manager", "football"],
};

const HomePage = () => (
  <main>
    <Header position="relative" />
    <div>
      <WelcomeScreen />
      <ManagerScreen />
      <Separator />
      <ApiHubScreen />
    </div>
    <Footer />
  </main>
);

export default HomePage;
