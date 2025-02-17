import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import { LOGO } from "@lib/constants";

const Social = dynamic(() => import("@components/shared/social/social-icons")),
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
  DrawerContent = dynamic(() => import("@/components/ui/drawer").then((x) => x.DrawerContent)),
  DrawerDescription = dynamic(() => import("@/components/ui/drawer").then((x) => x.DrawerDescription));

const navLinks = [
  { id: "home", title: "Home", Icon: VscHome, path: "/" },
  { id: "apihub", title: "Football API Hub", Icon: VscHubot, path: "/apihub" },
  { id: "manager", title: "Soccer Manager", Icon: VscGame, path: "/games" },
  { id: "signup", title: "Create an Account", Icon: VscPersonAdd, path: "/accounts/signup" },
  { id: "signin", title: "Login to your Account", Icon: VscSignIn, path: "/accounts/signin" },
  { id: "signout", title: "Sign Out from WaveRD", Icon: VscSignOut, path: `${process.env.BASE_URL}/accounts/signout` },
];

import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { VscLoading } from "react-icons/vsc";
import { ChangeEvent, useRef, useState } from "react";

const response = [
  { url: "/#1", title: "mss1wrewrhjdshj", desc: "Next.js 1" },
  { url: "/#2", title: "mss2wrewrhjdshj", desc: "Next.js 2" },
  { url: "/#3", title: "mss3wrewrhjdshj", desc: "Next.js 3" },
  { url: "/#4", title: "mss4wrewrhjdshj", desc: "Next.js 4" },
  { url: "/#5", title: "mss5wrewrhjdshj", desc: "Next.js 5" },
  { url: "/#6", title: "mss6wrewrhjdshj", desc: "Next.js 6" },
  { url: "/#7", title: "mss7wrewrhjdshj", desc: "Next.js 7" },
  { url: "/#8", title: "mss8wrewrhjdshj", desc: "Next.js 8" },
  { url: "/#9", title: "mss9wrewrhjdshj", desc: "Next.js 9" },
];
interface MobileHeaderProps {
  theme: Theme;
  profile: Profile;
  authenticated: boolean;
  themeHandler: (theme: Theme) => () => void;
}

const MobileHeader = ({ profile, authenticated, themeHandler, theme }: MobileHeaderProps) => {
  // const searchRef = useRef(undefined);
  const [searching, setSearching] = useState(false);
  const [matches, setMatches] = useState<Array<{ url: string; title: string; desc: string }>>([]);

  const searchHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const phrase = e.currentTarget.value;
    // if (searchRef.current) clearTimeout(searchRef.current);

    if (phrase) {
      setSearching(true);

      console.log({ phrase });

      // await setTimeout(() => {
      setSearching(false);
      setMatches(response.filter((x) => x.title.includes(phrase)));
      // }, 500);
      // searchRef.current = a;
    } else {
      setMatches([]);
      if (searching) setSearching(false);
    }
  };

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <Button variant="outline" size="icon" aria-label="mobile-menu" className="cursor-pointer">
          <MenuIcon />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="w-full max-w-lg fixed left-auto">
        <div className="w-full h-screen  pt-4 px-5 flex flex-col justify-between text-center border-2">
          <DrawerHeader>
            <DrawerTitle>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <Image width={40} height={40} alt="WaveRD" src="/images/layout/d.svg" />
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
            </DrawerTitle>
            <DrawerDescription>
              <Command>
                <div className="flex gap-1 items-center w-full">
                  <div className="w-full">
                    <CommandInput placeholder="Start typing to search..." onChangeCapture={searchHandler} />
                  </div>
                  {searching && (
                    <Button variant="ghost" size="icon">
                      <VscLoading className="animate-spin" />
                    </Button>
                  )}
                </div>
                <CommandList>
                  {/* <CommandEmpty>No framework found.</CommandEmpty> */}
                  <CommandGroup>
                    {matches.map(({ desc, title, url }) => (
                      <CommandItem
                        key={url}
                        className="cursor-pointer hover:bg-accent-foreground" // value={framework.value}
                        // onSelect={(currentValue) => {
                        // setValue(currentValue === value ? "" : currentValue);
                        // setOpen(false);
                        // }}
                      >
                        <Link href={url}>
                          <span>{title}</span>
                          <p>{desc}</p>
                        </Link>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </DrawerDescription>
          </DrawerHeader>

          <div className="flex flex-col justify-between h-full px-3 py-8">
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

            <div className="flex flex-col flex-wrap items-center">
              <Separator className="-mb-11" />
              {/* <span className="text-7xl p-3">{LOGO}</span> */}

              <Image width={60} height={60} alt="WaveRD" src="/images/layout/waverd.svg" className="z-10 rounded-full relative border-2 border-[secondaryColor] h-16" />
              <Social filterParams={["twitter", "instagram", "whatsapp", "linkedin", "facebook"]} fontSize="20px" />

              {/* {authenticated ? (
                <a href={`${process.env.BASE_URL}/accounts/signout`} rel="noopener noreferrer" className="w-full">
                  <Button className="w-full">
                    Logout <BiLogOut />
                  </Button>
                </a>
              ) : (
                <Link href="/accounts/signin" className="w-full">
                  <Button className="w-full">
                    Login <BiLogIn />
                  </Button>
                </Link>
              )} */}

              <div>
                <div className="flex items-center gap-3">
                  <Image width={40} height={40} alt="WaveRD" src="/images/layout/d.svg" />
                  <div className="flex flex-col items-start">
                    <span className="font-bold text-ellipsis">{profile.name}</span>
                    <span className="text-ellipsis text-inverseColor">{profile.handle}</span>
                  </div>
                </div>

                <Tabs defaultValue={theme} className="w-full mb-11">
                  <TabsList className="w-full">
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
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default MobileHeader;
