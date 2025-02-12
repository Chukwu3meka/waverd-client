import HeaderContainer from "@components/shared/header/header-container";
import Image from "next/image";

export default function Home() {
  return (
    <div
      className="h-[3000px]"
      // style={{
      //   border: "3px solid red",
      // }}
    >
      <HeaderContainer position="relative" />
    </div>
  );
}
