import dynamic from "next/dynamic";

const ApiHub = dynamic(() => import("@components/home/apihub-intro")),
  WelcomeInto = dynamic(() => import("@components/home/welcome-intro")),
  ManagerIntro = dynamic(() => import("@components/home/manager-intro"));

export default function HomePage() {
  return (
    <main className="grid-rows[max-content auto max-content] mb-10">
      <WelcomeInto />
      <ManagerIntro />
      <ApiHub />
    </main>
  );
}
