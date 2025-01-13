import Link from "next/link";
import dynamic from "next/dynamic";
import styles from "./styles.module.scss";
import { VisibleState } from "./HeaderContainer";

const navLinks = [
    { title: "Home", path: "/" },
    { title: "API Hub", path: "/apihub" },
    { title: "Manager", path: "/games" },
  ],
  Flex = dynamic(() => import("antd").then((x) => x.Flex)),
  MenuContainer = dynamic(() => import("./MenuContainer")),
  Button = dynamic(() => import("antd").then((x) => x.Button)),
  SocialContainer = dynamic(() => import("components/shared/social")),
  BiLogIn = dynamic(() => import("react-icons/bi").then((x) => x.BiLogIn)),
  Typography = dynamic(() => import("antd").then((x) => x.Typography.Text)),
  BiLogOut = dynamic(() => import("react-icons/bi").then((x) => x.BiLogOut)),
  MdDarkMode = dynamic(() => import("react-icons/md").then((x) => x.MdDarkMode)),
  MdLightMode = dynamic(() => import("react-icons/md").then((x) => x.MdLightMode));

interface HeaderProps {
  theme: Theme;
  profile: Profile;
  visible: VisibleState;
  authenticated: boolean;
  themeHandler: React.MouseEventHandler<HTMLButtonElement>;
  className: "relativeHeader" | "stickyHeader" | "hiddenHeader";
}

const Header = ({ className, authenticated, theme, themeHandler, visible, profile }: HeaderProps) => (
  <header id="header" data-testid={className} className={styles[className]}>
    <main>
      <Button
        type="text"
        onClick={themeHandler}
        aria-label="change-theme"
        icon={theme === "light" ? <MdDarkMode size={25} /> : <MdLightMode size={25} />}
      />

      <Link href="/">
        <Typography ellipsis={true} style={{ fontWeight: 700, fontSize: "1.7em" }}>
          Wave Research
        </Typography>
      </Link>

      {visible.nav ? (
        <Flex align="flex-end">
          {navLinks.map(({ title, path }) => (
            <Typography key={title} style={{ fontWeight: 700 }}>
              <Link href={path} key={title}>
                {title}
              </Link>
            </Typography>
          ))}
        </Flex>
      ) : (
        <></>
      )}

      {visible.mobile ? (
        <MenuContainer profile={profile} authenticated={authenticated} />
      ) : (
        <Flex align="center">
          <SocialContainer fontSize="22px" filterParams={["twitter", "instagram", "whatsapp"]} />

          <div>
            {!authenticated && (
              <Link href="/accounts/signin">
                <Button type="primary" iconPosition="end" icon={<BiLogIn />} size="large" variant="outlined">
                  Sign In
                </Button>
              </Link>
            )}

            {authenticated && (
              <a href={`${process.env.BASE_URL}/accounts/signout`} rel="noopener noreferrer">
                <Button type="primary" iconPosition="end" icon={<BiLogOut />} size="large" variant="outlined">
                  Sign out
                </Button>
              </a>
            )}
          </div>
        </Flex>
      )}
    </main>
  </header>
);

export default Header;