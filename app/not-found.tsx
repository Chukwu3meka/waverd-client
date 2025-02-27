import Link from "next/link";
import dynamic from "next/dynamic";

import { Button } from "@components/ui/button";

const Result = dynamic(() => import("@components/shared/result/result")),
  Footer = dynamic(() => import("@components/shared/footer/footer-container")),
  RelativeHeader = dynamic(() => import("@components/shared/header/header-container"));

const NotFoundPage = () => {
  return (
    <>
      <RelativeHeader position="relative" />

      <Result variant={404}>
        <Link href="/">
          <Button>Back Home</Button>
        </Link>
      </Result>
      <Footer />
    </>
  );
};

export default NotFoundPage;
