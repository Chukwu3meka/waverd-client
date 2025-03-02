import Link from "next/link";
import dynamic from "next/dynamic";

import { Button } from "@components/ui/button";

const Result = dynamic(() => import("@components/shared/result/result")),
  Footer = dynamic(() => import("@components/shared/footer/footer-container")),
  RelativeHeader = dynamic(() => import("@components/shared/header/header-container"));

const NotFoundPage = () => {
  return (
    <main>
      <RelativeHeader position="relative" />

      <div className="h-[var(--contentHeight)] flex justify-center items-center">
        <Result variant={404}>
          <Link href="/">
            <Button>Back Home</Button>
          </Link>
        </Result>
      </div>

      <Footer />
    </main>
  );
};

export default NotFoundPage;
