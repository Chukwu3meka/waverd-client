"use client";

import Footer from "./footer";
import AccountsService from "@services/axios/accounts.service";

import { useEffect } from "react";
import { useTheme } from "next-themes";
import { resizeHandler } from "@lib/helpers";
import { useAppStore } from "@stores/app.store";


export default function FooterContainer() {
  const { setTheme, theme } = useTheme(),
    accountsService = new AccountsService(),
    authenticated = useAppStore((state) => state.profile.authenticated);

  useEffect(() => {
    resizeHandler();
  }, []);

  const themeHandler = (theme: Theme) => async () => {
    setTheme(theme);

    if (authenticated) {
      await accountsService
        .setTheme({ theme })

        .then(({ success, message }) => {
          if (!success) {
            import("sonner").then((mod) => {
              mod.toast.error(message, { richColors: true });
            });
          }
        });
    }
  };

  return <Footer theme={theme as Theme} themeHandler={themeHandler} />;
}
