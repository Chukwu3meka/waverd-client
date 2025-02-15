"use client";

import MobileHeader from "@components/shared/header/mobile-header";
import { INIT_PROFILE } from "@lib/constants";
import { useTheme } from "next-themes";
import React from "react";

const page = () => {
  const { setTheme, theme } = useTheme();

  const themeHandler = (theme: Theme) => () => {
    setTheme(theme);
    // setThemeAction(theme);

    // if (authenticated)
    //   await accountsService
    //     .setTheme({ theme: newTheme })
    //     .catch(() => enqueueSnackbar("Failed to save new theme across profile", { variant: "error" }));
  };

  return <MobileHeader profile={INIT_PROFILE} authenticated={false} themeHandler={themeHandler} theme={"dark"} />;
};

export default page;
