import Link from "next/link";
import Image from "next/image";

import { connect } from "react-redux";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { GiHamburgerMenu as MenuIcon } from "react-icons/gi";
import { setDisplayHeaderAction } from "@/redux-store/actions/layout";
import { VscGame, VscHome, VscHubot, VscPersonAdd, VscSignIn, VscSignOut } from "react-icons/vsc";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger, SheetClose } from "@components/ui/sheet";
import { LOGO } from "@lib/constants";

const navLinks = [
  { local: true, id: "home", title: "Home", Icon: VscHome, path: "/" },
  { local: true, id: "manager", title: "Soccer Manager", Icon: VscGame, path: "/games" },
  { local: true, id: "apihub", title: "Football API Hub", Icon: VscHubot, path: "/apihub" },
  { local: true, id: "signin", title: "Sign in to WaveRD", Icon: VscSignIn, path: "/accounts/signin" },
  { local: true, id: "signup", title: "Create an Account", Icon: VscPersonAdd, path: "/accounts/signup" },
  { local: false, id: "signout", title: "Logout from WaveRD", Icon: VscSignOut, path: `${process.env.BASE_URL}/accounts/signout` },
];

const MobileHeader = ({ profile, authenticated, setDisplayHeaderAction }: { profile: Profile; authenticated: boolean; setDisplayHeaderAction: any }) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button
        size="icon"
        variant="outline"
        aria-label="Mobile menu"
        onClick={
          // When sticky header is open it overlaps shadcn sidebar
          () => setDisplayHeaderAction(false)
        }>
        <MenuIcon />
      </Button>
    </SheetTrigger>
    <SheetContent>
      <SheetHeader>
        <SheetTitle className="text-4xl text-center">
          <span className="text-2xl">{LOGO}</span>
          WaveRD
        </SheetTitle>
        <SheetDescription></SheetDescription>
      </SheetHeader>

      <div className="flex flex-col justify-between h-[calc(100vh-135px)]">
        <div className="flex flex-col gap-5 justify-between">
          <Separator className="mb-2" />

          {navLinks
            .filter((nav) => (authenticated ? !["signup", "signin"].includes(nav.id) : !["signout"].includes(nav.id)))
            .map(({ local, Icon, path, title }) => (
              <div className="flex items-center gap-3" key={title}>
                <Icon />
                <SheetClose asChild>
                  {local ? (
                    <Link href={path} className="font-bold">
                      {title}
                    </Link>
                  ) : (
                    <a href={path} rel="noopener noreferrer">
                      {title}
                    </a>
                  )}
                </SheetClose>
              </div>
            ))}
        </div>
      </div>

      <SheetFooter className="border-2 -ml-6 mr-6 w-[calc(100%+48px)] bg-accent">
        <SheetClose asChild>
          {profile?.handle && (
            <div className="w-full flex items-center gap-3 p-2">
              <Image width={40} height={40} alt="WaveRD" src="/images/layouts/profile.webp" className="rounded-[50%]" />
              <div className="flex flex-col items-start">
                <span className="font-bold text-ellipsis">{profile.handle}</span>
                <span className="text-ellipsis text-sm">{profile.name}</span>
              </div>
            </div>
          )}
        </SheetClose>
      </SheetFooter>
    </SheetContent>
  </Sheet>
);

const mapDispatchToProps = { setDisplayHeaderAction },
  mapStateToProps = (state: RootState) => ({ displayHeader: state.layout.displayHeader });

export default connect(mapStateToProps, mapDispatchToProps)(MobileHeader);
