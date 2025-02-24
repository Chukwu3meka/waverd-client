"use client";

import Link from "next/link";
import styles from "./styles.module.scss";

import { VscHubot } from "react-icons/vsc";
import { Button } from "@components/ui/button";
import { IoGameControllerOutline } from "react-icons/io5";

const Welcome = () => (
  <div className="flex justify-center p-4 md:py-16 md:px-12 min-h-[600px]" data-testid="welcome">
    <main className="flex flex-col items-start justify-center p-4 md:p-10  md:max-w-[calc(100vw/1.5)] rounded-bl-[70px] rounded-tr-[70px] shadow-xl overflow-hidden relative">
      <p className="text-4xl md:text-4xl font-extrabold">Football Revolution</p>

      <p className="text-lg md:text-xl">
        The ultimate destination for football enthusiasts and managers, designed to provide you with everything you need to stay ahead of the game. With our cutting-edge
        tools and in-depth insights, you can access real-time data. So join us today and experience the power of data-driven football API like never before!
      </p>

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
      <figure className={styles["welcome-image"]} />
    </main>
  </div>
);

export default Welcome;
