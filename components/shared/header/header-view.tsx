import Link from "next/link";
import dynamic from "next/dynamic";
import styles from "./styles.module.scss";

const MobileHeader = dynamic(() => import("./mobile-header")),
  FaSun = dynamic(() => import("react-icons/fa").then((x) => x.FaSun)),
  FaMoon = dynamic(() => import("react-icons/fa").then((x) => x.FaMoon)),
  FaCloudSun = dynamic(() => import("react-icons/fa").then((x) => x.FaCloudSun)),
  Button = dynamic(() => import("@/components/ui/button").then((x) => x.Button)),
  MdLightMode = dynamic(() => import("react-icons/md").then((x) => x.MdLightMode)),
  DropdownMenu = dynamic(() => import("@/components/ui/dropdown-menu").then((x) => x.DropdownMenu)),
  DropdownMenuItem = dynamic(() => import("@/components/ui/dropdown-menu").then((x) => x.DropdownMenuItem)),
  DropdownMenuContent = dynamic(() => import("@/components/ui/dropdown-menu").then((x) => x.DropdownMenuContent)),
  DropdownMenuTrigger = dynamic(() => import("@/components/ui/dropdown-menu").then((x) => x.DropdownMenuTrigger));

interface HeaderProps {
  profile: Profile;
  theme: Theme;
  authenticated: boolean;
  themeHandler: (theme: Theme) => () => void;
  className: "relativeHeader" | "stickyHeader" | "hiddenHeader";
}

const Header = ({ className, authenticated, themeHandler, theme, profile }: HeaderProps) => (
  <header id="header" data-testid={className} className={styles[className]}>
    <main className="flex justify-between items-center w-full m-auto overflow-hidden max-w-[1500px] py-2.5 px-5 rounded-[65px / 100%] bg-transparent">
      <span />

      <h1 className="font-bold text-3xl">
        <Link href="/">Wave Research</Link>
      </h1>

      <MobileHeader profile={profile} authenticated={authenticated} themeHandler={themeHandler} theme={theme} />
    </main>
  </header>
);

export default Header;
