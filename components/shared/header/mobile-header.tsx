"use client";

import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { connect } from "react-redux";
import { setDisplayHeaderAction } from "@store/actions/layout";

// import { VscGame, VscHome, VscHubot, VscPersonAdd, VscSignIn, VscSignOut } from "react-icons/vsc";
// import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@components/ui/sheet";
// import { Button } from "@components/ui/button";
// import { Separator } from "@components/ui/separator";
// import { Tabs, TabsList, TabsTrigger } from "@components/ui/tabs";
// import { FaCloudSun, FaMoon, FaSun } from "react-icons/fa";
// import { GiHamburgerMenu as MenuIcon } from "react-icons/gi";

const FaSun = dynamic(() => import("react-icons/fa").then((x) => x.FaSun)),
  FaMoon = dynamic(() => import("react-icons/fa").then((x) => x.FaMoon)),
  Tabs = dynamic(() => import("@components/ui/tabs").then((x) => x.Tabs)),
  VscGame = dynamic(() => import("react-icons/vsc").then((x) => x.VscGame)),
  VscHome = dynamic(() => import("react-icons/vsc").then((x) => x.VscHome)),
  Sheet = dynamic(() => import("@/components/ui/sheet").then((x) => x.Sheet)),
  VscHubot = dynamic(() => import("react-icons/vsc").then((x) => x.VscHubot)),
  VscSignIn = dynamic(() => import("react-icons/vsc").then((x) => x.VscSignIn)),
  Button = dynamic(() => import("@/components/ui/button").then((x) => x.Button)),
  FaCloudSun = dynamic(() => import("react-icons/fa").then((x) => x.FaCloudSun)),
  VscSignOut = dynamic(() => import("react-icons/vsc").then((x) => x.VscSignOut)),
  TabsList = dynamic(() => import("@components/ui/tabs").then((x) => x.TabsList)),
  MenuIcon = dynamic(() => import("react-icons/gi").then((x) => x.GiHamburgerMenu)),
  VscPersonAdd = dynamic(() => import("react-icons/vsc").then((x) => x.VscPersonAdd)),
  TabsTrigger = dynamic(() => import("@components/ui/tabs").then((x) => x.TabsTrigger)),
  SheetTitle = dynamic(() => import("@/components/ui/sheet").then((x) => x.SheetTitle)),
  Separator = dynamic(() => import("@components/ui/separator").then((x) => x.Separator)),
  SheetFooter = dynamic(() => import("@/components/ui/sheet").then((x) => x.SheetFooter)),
  SheetHeader = dynamic(() => import("@/components/ui/sheet").then((x) => x.SheetHeader)),
  SheetContent = dynamic(() => import("@/components/ui/sheet").then((x) => x.SheetContent)),
  SheetTrigger = dynamic(() => import("@/components/ui/sheet").then((x) => x.SheetTrigger)),
  SheetDescription = dynamic(() => import("@/components/ui/sheet").then((x) => x.SheetDescription));

const navLinks = [
  { id: "home", title: "Home", Icon: VscHome, path: "/" },
  { id: "apihub", title: "Football API Hub", Icon: VscHubot, path: "/apihub" },
  { id: "manager", title: "Soccer Manager", Icon: VscGame, path: "/games" },
  { id: "signup", title: "Create an Account", Icon: VscPersonAdd, path: "/accounts/signup" },
  { id: "signin", title: "Login to WaveRD", Icon: VscSignIn, path: "/accounts/signin" },
  { id: "signout", title: "Logout from WaveRD", Icon: VscSignOut, path: `${process.env.BASE_URL}/accounts/signout` },
];

interface MobileHeaderProps {
  theme: Theme;
  profile: Profile;
  authenticated: boolean;
  displayHeader: boolean;
  setDisplayHeaderAction: any;
  themeHandler: (theme: Theme) => () => void;
}

const MobileHeader = ({ profile, authenticated, themeHandler, theme, setDisplayHeaderAction, ...props }: MobileHeaderProps) => (
  <div className="grid grid-cols-2 gap-2">
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          aria-label="mobile-menu"
          className="cursor-pointer"
          onClick={
            () => setDisplayHeaderAction(false)
            // When sticky header is open it overlaps shadcn sidebar
          }>
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-3">
                <Image width={40} height={40} alt="WaveRD" src="/images/layout/profile.webp" className="rounded-[50%]" />
                <div className="flex flex-col items-start">
                  <span className="font-bold text-ellipsis">WaveRD</span>
                  <span className="text-ellipsis text-sm">API Hub and Soccer Manager</span>
                </div>
              </div>
            </div>
          </SheetTitle>
          <SheetDescription></SheetDescription>
        </SheetHeader>

        <div>
          <Separator className="mb-9" />

          <div className="flex flex-col gap-5 justify-between">
            {navLinks
              .filter((nav) => (authenticated ? !["signup", "signin"].includes(nav.id) : !["signout"].includes(nav.id)))
              .map(({ Icon, path, title }) => (
                <div className="flex items-center gap-3" key={title}>
                  <Icon />
                  <Link href={path} className="font-bold">
                    {title}
                  </Link>
                </div>
              ))}
          </div>
        </div>

        <SheetFooter>
          <div className="w-full space-y-3">
            {profile.handle && (
              <div className="flex items-center gap-3">
                <Image width={40} height={40} alt="WaveRD" src="/images/layout/profile.webp" className="rounded-[50%]" />
                <div className="flex flex-col items-start">
                  <span className="font-bold text-ellipsis">{profile.name}</span>
                  <span className="text-ellipsis text-inverseColor">{profile.handle}</span>
                </div>
              </div>
            )}

            <Tabs defaultValue={theme}>
              <TabsList className="w-full">
                <TabsTrigger value="light" className="cursor-pointer" onClick={themeHandler("light")}>
                  <div className="flex items-center px-2.5 gap-1.5">
                    <span>Light</span> <FaSun size=".8em" />
                  </div>
                </TabsTrigger>
                <TabsTrigger value="dark" className="cursor-pointer" onClick={themeHandler("dark")}>
                  <div className="flex items-center px-2.5 gap-1.5">
                    <span>Dark</span> <FaMoon size=".7em" />
                  </div>
                </TabsTrigger>

                <TabsTrigger value="system" className="cursor-pointer" onClick={themeHandler("system")}>
                  <div className="flex items-center px-2.5 gap-1.5">
                    <span>System</span> <FaCloudSun size=".9em" />
                  </div>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  </div>
);

const mapStateToProps = (state: RootState) => ({ displayHeader: state.layout.displayHeader }),
  mapDispatchToProps = { setDisplayHeaderAction };
export default connect(mapStateToProps, mapDispatchToProps)(MobileHeader);
