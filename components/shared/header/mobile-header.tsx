import Link from "next/link";
import Image from "next/image";

import { connect } from "react-redux";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import { GiHamburgerMenu as MenuIcon } from "react-icons/gi";
import { setDisplayHeaderAction } from "@store/actions/layout";
import { VscGame, VscHome, VscHubot, VscPersonAdd, VscSignIn, VscSignOut } from "react-icons/vsc";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@components/ui/sheet";

const navLinks = [
  { id: "home", title: "Home", Icon: VscHome, path: "/" },
  { id: "manager", title: "Soccer Manager", Icon: VscGame, path: "/games" },
  { id: "apihub", title: "Football API Hub", Icon: VscHubot, path: "/apihub" },
  { id: "signin", title: "Login to WaveRD", Icon: VscSignIn, path: "/accounts/signin" },
  { id: "signup", title: "Create an Account", Icon: VscPersonAdd, path: "/accounts/signup" },
  { id: "signout", title: "Logout from WaveRD", Icon: VscSignOut, path: `${process.env.BASE_URL}/accounts/signout` },
];

const MobileHeader = ({ profile, authenticated, setDisplayHeaderAction }: { profile: Profile; authenticated: boolean; setDisplayHeaderAction: any }) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button
        size="icon"
        variant="outline"
        aria-label="mobile-menu"
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
              <Image width={40} height={40} alt="WaveRD" src="/images/layouts/profile.webp" className="rounded-[50%]" />
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

      {profile.handle && (
        <SheetFooter>
          <div className="w-full flex items-center gap-3">
            <Image width={40} height={40} alt="WaveRD" src="/images/layouts/profile.webp" className="rounded-[50%]" />
            <div className="flex flex-col items-start">
              <span className="font-bold text-ellipsis">{profile.name}</span>
              <span className="text-ellipsis text-inverseColor">{profile.handle}</span>
            </div>
          </div>
        </SheetFooter>
      )}
    </SheetContent>
  </Sheet>
);

const mapDispatchToProps = { setDisplayHeaderAction },
  mapStateToProps = (state: RootState) => ({ displayHeader: state.layout.displayHeader });

export default connect(mapStateToProps, mapDispatchToProps)(MobileHeader);
