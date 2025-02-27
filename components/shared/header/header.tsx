import Link from "next/link";
import dynamic from "next/dynamic";
import styles from "./styles.module.scss";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { LOGO } from "@lib/constants";
import { GrGamepad as GameIcon } from "react-icons/gr";
import { navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";

const MobileHeader = dynamic(() => import("./mobile-header")),
  NavigationMenu = dynamic(() => import("@/components/ui/navigation-menu").then((x) => x.NavigationMenu)),
  NavigationMenuItem = dynamic(() => import("@/components/ui/navigation-menu").then((x) => x.NavigationMenuItem)),
  NavigationMenuLink = dynamic(() => import("@/components/ui/navigation-menu").then((x) => x.NavigationMenuLink)),
  NavigationMenuList = dynamic(() => import("@/components/ui/navigation-menu").then((x) => x.NavigationMenuList)),
  NavigationMenuContent = dynamic(() => import("@/components/ui/navigation-menu").then((x) => x.NavigationMenuContent)),
  NavigationMenuTrigger = dynamic(() => import("@/components/ui/navigation-menu").then((x) => x.NavigationMenuTrigger));

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Clubs",
    href: "/",
    description: "Retrieve club details, including history, squad, and performance.",
  },
  {
    title: "Players",
    href: "/",
    description: "Access player profiles, stats, and performance data.",
  },
  {
    title: "Managers",
    href: "/",
    description: "Access details on team managers, their history, and strategic insights.",
  },
  {
    title: "Referees",
    href: "/",
    description: "Get information on referees, their officiating history, and match assignments.",
  },
  {
    title: "Competitions",
    href: "/",
    description: "Explore details on tournaments, leagues, fixtures, and standings.",
  },
];

interface HeaderProps {
  showNav: boolean;
  profile: Profile;
  authenticated: boolean;
  className: "relativeHeader" | "stickyHeader" | "hiddenHeader";
}

const Header = ({ className, authenticated, profile, showNav }: HeaderProps) => (
  <header data-testid={className} className={styles[className]}>
    <main className="flex justify-between items-center w-full pb-2.5 bg-transparent border-b-2">
      {!showNav && <span />}

      <div className="flex gap-1 items-center">
        <span className="text-xl">{LOGO}</span>
        <h1 className="font-bold text-3xl -mt-0.5">
          <Link href="/">WaveRD</Link>
        </h1>
      </div>

      {showNav && (
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <Link href="/" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>Home</NavigationMenuLink>
              </Link>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Manager</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-2 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/">
                        <GameIcon className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">Game</div>
                        <p className="text-sm leading-tight text-muted-foreground">Revamped Soccer Manager for everyone with advanced real world simulation.</p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <ListItem href="/" title="Register">
                    Get started! Create an account today and compete against opponents.
                  </ListItem>
                  <ListItem href="/" title="My Team">
                    Get support from AI assistant to build the most formidable team in your game world.
                  </ListItem>
                  <ListItem href="/" title="Trophy Cabinet">
                    Get a glance into game objectives, achievements, and upcoming challenges!
                  </ListItem>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>API Hub</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                  {components.map((component) => (
                    <ListItem key={component.title} title={component.title} href={component.href}>
                      {component.description}
                    </ListItem>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      )}

      <MobileHeader profile={profile} authenticated={authenticated} />
    </main>
  </header>
);

export default Header;

const ListItem = forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}>
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
