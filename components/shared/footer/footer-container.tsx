"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { LOGO } from "@lib/constants";
import styles from "./styles.module.scss";
import Footer from "./footer";
import { useTheme } from "next-themes";
import { setThemeAction } from "@store/actions/account";

const SocialIcons = dynamic(() => import("@components/shared/social/social-icons"));

const FooterContainer = () => {
  const { setTheme, theme } = useTheme();

  const themeHandler = (theme: Theme) => () => {
    setTheme(theme);
    setThemeAction(theme);

    // if (authenticated)
    //   await accountsService
    //     .setTheme({ theme: newTheme })
    //     .catch(() => enqueueSnackbar("Failed to save new theme across profile", { variant: "error" }));
  };

  return <Footer theme themeHandler />;
};
export default FooterContainer;

const mapStateToProps = (state: RootState) => ({
    profile: state.account.profile,
    deviceWidth: state.layout.width,
    displayHeader: state.layout.displayHeader,
    authenticated: state.account.authenticated,
  }),
  mapDispatchToProps = { setThemeAction };
