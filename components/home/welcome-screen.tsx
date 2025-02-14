// "use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import styles from "./styles.module.scss";
import { Button } from "@components/ui/button";

const VscHubot = dynamic(() => import("react-icons/vsc").then((module) => module.VscHubot)),
  IoGameControllerOutline = dynamic(() => import("react-icons/io5").then((module) => module.IoGameControllerOutline));

const Welcome = () => (
  <div className="flex justify-center items-stretch min-h-[calc(var(--visibleScreen)-var(--headerHeight))] overflow-hidden py-16 px-12" data-testid="welcome">
    <main className="max-w-[1200px] overflow-hidden relative p-2.5 rounded-br-[70px] rounded-tl-[70px] border-2">
      <aside className="flex flex-col items-start justify-center h-full relative z-10">
        <span className="text-[calc(0.9em+1vw)]">Welcome to</span>

        <span className="text-[calc(2.7em+1vw)] font-extrabold">
          <Link href="/">Wave Research</Link>
        </span>

        <span className="text-[calc(0.6em+1vw)]">
          The ultimate destination for football enthusiasts and managers, designed to provide you with everything you need to stay ahead of the game. With our
          cutting-edge tools and in-depth insights, you can access real-time data. So join us today and experience the power of data-driven football API like never
          before!
        </span>

        <nav className="mt-5 flex gap-x-2.5 gap-y-5 justify-end w-full flex-wrap">
          <Link href="/games">
            <Button size="lg">
              <span>Soccer Manager</span>
              <IoGameControllerOutline />
            </Button>
          </Link>

          <Link href="/apihub">
            <Button size="lg">
              <span>API Hub</span>
              <VscHubot />
            </Button>
          </Link>
        </nav>
      </aside>
      <figure className={styles["welcome-image"]} />
    </main>
  </div>
);

export default Welcome;
