"use client";

import { useTheme } from "next-themes";
import { connect } from "react-redux";
import { useEffect, useState } from "react";

export interface VisibleState {
  nav: boolean;
  mobile: boolean;
}

interface HeaderContainerProps {
  profile: Profile;
  deviceWidth: number;
  displayHeader: boolean;
  authenticated: boolean;
  setThemeAction: Function;
  position: "relative" | "sticky";
}

import dynamic from "next/dynamic";
import { INIT_PROFILE } from "@lib/constants";
import { setThemeAction } from "@store/actions/account";
const Header = dynamic(() => import("./header-view"));

const HeaderContainer = (props: HeaderContainerProps) => {
  const { setTheme, theme } = useTheme();

  //  accountsService = new AccountsService(),
  //   { enqueueSnackbar } = useSnackbar(),
  // [color, setColor] = useState<ColorState>({ first: "", last: COLORS.primaryColor }),

  const { position, setThemeAction } = props,
    [profile, setProfile] = useState<Profile>(INIT_PROFILE),
    // [theme, setTheme] = useState<Theme>(INIT_PROFILE.theme),
    [displayHeader, setDisplayHeader] = useState<boolean>(false),
    [authenticated, setAuthenticated] = useState<boolean>(false),
    [visible, setVisible] = useState<VisibleState>({ nav: false, mobile: false }),
    className = position === "relative" ? "relativeHeader" : displayHeader ? "stickyHeader" : "hiddenHeader";

  useEffect(() => {
    setDisplayHeader(props.displayHeader!);
  }, [props.displayHeader]);

  useEffect(() => {
    setProfile(props.profile);
    setTheme(props.profile.theme);
    setAuthenticated(props.authenticated);
  }, [props.profile, props.authenticated]);

  useEffect(() => {
    // Regex to match relativeHeader ignoring ID react will attach to module.scss
    const headerElement = document.querySelectorAll(`[class*="${className}"`);

    if (headerElement.length && headerElement[0] instanceof HTMLElement) {
      const offsetWidth = headerElement[0].offsetWidth;
      setVisible({ nav: offsetWidth > 850, mobile: offsetWidth < 600 });
    }
  }, [props.deviceWidth]);

  const themeHandler = (theme: Theme) => () => {
    setTheme(theme);
    setThemeAction(theme);

    // if (authenticated)
    //   await accountsService
    //     .setTheme({ theme: newTheme })
    //     .catch(() => enqueueSnackbar("Failed to save new theme across profile", { variant: "error" }));
  };

  // return <p>ss</p>;
  return <Header {...{ className, authenticated, theme: theme as Theme, profile, themeHandler, visible }} />;
};

const mapStateToProps = (state: RootState) => ({
    profile: state.account.profile,
    deviceWidth: state.layout.width,
    displayHeader: state.layout.displayHeader,
    authenticated: state.account.authenticated,
  }),
  mapDispatchToProps = { setThemeAction };

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
