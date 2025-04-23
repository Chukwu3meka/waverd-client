"use client";

import Footer from "./footer";
import AccountsService from "@services/axios/accounts.service";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { resizeHandler } from "@lib/helpers";
import { useAppStore } from "@stores/app.store";

export default function FooterContainer() {
  const accountsService = new AccountsService(),
    { setTheme, theme } = useTheme(),
    profile = useAppStore((state) => state.profile),
    setProfileTheme = useAppStore((state) => state.setTheme);

  useEffect(() => {
    resizeHandler();
  }, []);

  useEffect(() => {
    if (profile.theme !== theme) setTheme(profile.theme);
  }, [profile.theme]);

  const themeHandler = (theme: Theme) => async () => {
    if (theme !== profile.theme) {
      setTheme(theme);
      setProfileTheme(theme);

      if (profile.authenticated) {
        await accountsService.setTheme({ theme }).then(({ success, message }) => {
          if (!success) import("sonner").then((mod) => mod.toast.error(message, { richColors: true }));
        });
      }
    }
  };

  return <Footer theme={profile.theme} themeHandler={themeHandler} />;
}
