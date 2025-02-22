"use client";

import Footer from "./footer";
import { connect } from "react-redux";
import { useTheme } from "next-themes";
import { setThemeAction } from "@store/actions/account";

const FooterContainer = ({ setThemeAction }: { setThemeAction: (data: Theme) => unknown }) => {
  const { setTheme, theme } = useTheme();

  const themeHandler = (theme: Theme) => () => {
    setTheme(theme);
    setThemeAction(theme);

    // if (authenticated)
    //   await accountsService
    //     .setTheme({ theme: newTheme })
    //     .catch(() => enqueueSnackbar("Failed to save new theme across profile", { variant: "error" }));
  };

  return <Footer theme={(theme as Theme) || "light"} themeHandler={themeHandler} />;
};

const mapStateToProps = (state: RootState) => ({
    profile: state.account.profile,
    deviceWidth: state.layout.width,
    displayHeader: state.layout.displayHeader,
    authenticated: state.account.authenticated,
  }),
  mapDispatchToProps = { setThemeAction };

export default connect(mapStateToProps, mapDispatchToProps)(FooterContainer);
