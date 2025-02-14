import { Metadata } from "next";
import dynamic from "next/dynamic";

const Footer = dynamic(() => import("@components/shared/footer/footer")),
  WelcomeScreen = dynamic(() => import("@components/home/welcome-screen")),
  Header = dynamic(() => import("@components/shared/header/header-container"));

export const metadata: Metadata = {
  title: "Wave Research",
  description:
    "Revamped Football Manager for everyone with advanced real world simulation and Football API Provider for all your soccer data needs. Available Everywhere at every time",
  keywords: ["soccer manager", "soccer", "waverd", "football manager", "football"],
};

const HomePage = () => (
  <main>
    <Header position="relative" />
    <WelcomeScreen />
    <Footer />
  </main>
);

export default HomePage;
