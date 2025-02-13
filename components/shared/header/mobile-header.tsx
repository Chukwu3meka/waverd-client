import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";

const Social = dynamic(() => import("@components/shared/social")),
  FaSun = dynamic(() => import("react-icons/fa").then((x) => x.FaSun)),
  FaMoon = dynamic(() => import("react-icons/fa").then((x) => x.FaMoon)),
  Tabs = dynamic(() => import("@components/ui/tabs").then((x) => x.Tabs)),
  BiLogIn = dynamic(() => import("react-icons/bi").then((x) => x.BiLogIn)),
  VscGame = dynamic(() => import("react-icons/vsc").then((x) => x.VscGame)),
  VscHome = dynamic(() => import("react-icons/vsc").then((x) => x.VscHome)),
  BiLogOut = dynamic(() => import("react-icons/bi").then((x) => x.BiLogOut)),
  VscHubot = dynamic(() => import("react-icons/vsc").then((x) => x.VscHubot)),
  VscSignIn = dynamic(() => import("react-icons/vsc").then((x) => x.VscSignIn)),
  Button = dynamic(() => import("@/components/ui/button").then((x) => x.Button)),
  Drawer = dynamic(() => import("@/components/ui/drawer").then((x) => x.Drawer)),
  FaCloudSun = dynamic(() => import("react-icons/fa").then((x) => x.FaCloudSun)),
  VscSignOut = dynamic(() => import("react-icons/vsc").then((x) => x.VscSignOut)),
  TabsList = dynamic(() => import("@components/ui/tabs").then((x) => x.TabsList)),
  MenuIcon = dynamic(() => import("react-icons/gi").then((x) => x.GiHamburgerMenu)),
  VscPersonAdd = dynamic(() => import("react-icons/vsc").then((x) => x.VscPersonAdd)),
  TabsTrigger = dynamic(() => import("@components/ui/tabs").then((x) => x.TabsTrigger)),
  AiOutlineClose = dynamic(() => import("react-icons/ai").then((x) => x.AiOutlineClose)),
  Separator = dynamic(() => import("@components/ui/separator").then((x) => x.Separator)),
  DrawerTitle = dynamic(() => import("@/components/ui/drawer").then((x) => x.DrawerTitle)),
  DrawerClose = dynamic(() => import("@/components/ui/drawer").then((x) => x.DrawerClose)),
  DrawerHeader = dynamic(() => import("@/components/ui/drawer").then((x) => x.DrawerHeader)),
  DrawerTrigger = dynamic(() => import("@/components/ui/drawer").then((x) => x.DrawerTrigger)),
  DrawerContent = dynamic(() => import("@/components/ui/drawer").then((x) => x.DrawerContent));

const navLinks = [
  { id: "home", title: "Home", Icon: VscHome, path: "/" },
  { id: "apihub", title: "Football API Hub", Icon: VscHubot, path: "/apihub" },
  { id: "manager", title: "Football Manager", Icon: VscGame, path: "/games" },
  { id: "signup", title: "Create an Account", Icon: VscPersonAdd, path: "/accounts/signup" },
  { id: "signin", title: "Login to your Account", Icon: VscSignIn, path: "/accounts/signin" },
  { id: "signout", title: "Sign Out from Wave Research", Icon: VscSignOut, path: `${process.env.BASE_URL}/accounts/signout` },
];

interface MobileHeaderProps {
  theme: Theme;
  profile: Profile;
  authenticated: boolean;
  themeHandler: (theme: Theme) => () => void;
}

const MobileHeader = ({ profile, authenticated, themeHandler, theme }: MobileHeaderProps) => (
  <Drawer direction="right">
    <DrawerTrigger asChild>
      <Button variant="outline" size="icon" aria-label="mobile-menu" className="cursor-pointer">
        <MenuIcon />
      </Button>
    </DrawerTrigger>
    <DrawerContent className="max-w-lg ml-auto">
      <div className="h-screen w-full ml-auto pt-4 px-5 flex flex-col justify-between text-center">
        <div className="absolute -top-96 -right-96">
          <DrawerHeader>
            <DrawerTitle>Mobile menu</DrawerTitle>
          </DrawerHeader>
        </div>

        <div className="flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src={profile.avatar} style={{ borderRadius: "50%" }} alt="Profile Image" width={40} height={40} />
            <div className="flex flex-col items-start">
              <span className="font-bold text-ellipsis">{profile.name}</span>
              <span className="text-ellipsis text-inverseColor">{profile.handle}</span>
            </div>
          </div>

          <DrawerClose asChild>
            <Button variant="outline" size="icon">
              <AiOutlineClose />
            </Button>
          </DrawerClose>
        </div>

        <div className="flex flex-col justify-between h-full px-3 py-8">
          <div className="flex flex-col gap-5 justify-between">
            {navLinks
              .filter((nav) => (authenticated ? !["signup", "signin"].includes(nav.id) : !["signout"].includes(nav.id)))
              .map(({ Icon, path, title }) => (
                <div className="flex items-center gap-3" key={title}>
                  <Icon color="var(--primary-color)" />

                  <Link href={path}>
                    <span className="font-bold">{title}</span>
                  </Link>
                </div>
              ))}

            <div className="flex items-center gap-2.5">
              {!authenticated && (
                <Link href="/accounts/signin">
                  <Button variant="default">
                    Login <BiLogIn />
                  </Button>
                </Link>
              )}

              {authenticated && (
                <a href={`${process.env.BASE_URL}/accounts/signout`} rel="noopener noreferrer">
                  <Button>
                    Logout <BiLogOut />
                  </Button>
                </a>
              )}
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <Separator className="-mb-11" />
            <Image width={60} height={60} alt="Wave Research" src="/images/layout/waverd.webp" className="z-10 rounded-full relative border-2 border-[secondaryColor] h-16" />
            <Social filterParams={["twitter", "instagram", "whatsapp", "linkedin", "facebook"]} fontSize="20px" />
            <span className="text-inverseColor text-xs text-center">● All rights reserved. All trademarks are the property of their respective owners ●</span>
            <span className="font-bold text-ellipsis">©Wave Research 2018 ~ {new Date().getFullYear()}</span>

            <Tabs defaultValue={theme} className="w-[400px]">
              <TabsList>
                <TabsTrigger value="light" onClick={themeHandler("light")}>
                  <div className="flex items-center px-2.5 gap-1.5">
                    <span>Light</span> <FaSun />
                  </div>
                </TabsTrigger>
                <TabsTrigger value="dark" onClick={themeHandler("dark")}>
                  <div className="flex items-center px-2.5 gap-1.5">
                    <span>Dark</span> <FaMoon />
                  </div>
                </TabsTrigger>

                <TabsTrigger value="system" onClick={themeHandler("system")}>
                  <div className="flex items-center px-2.5 gap-1.5">
                    <span>System</span> <FaCloudSun />
                  </div>
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>
    </DrawerContent>
  </Drawer>
);

export default MobileHeader;
