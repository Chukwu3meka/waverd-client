"use client";

import { useTheme } from "next-themes";
import { NETWORK_ERROR } from "@lib/constants";

import dynamic from "next/dynamic";
import useAuthStore from "@stores/auth.store";
import useLayoutStore from "@stores/layout.store";
import AccountsService from "@services/axios/accounts.service";

const Footer = dynamic(() => import("@components/shared/footer/footer"), { ssr: false });

export default function FooterContainer() {
  const { setTheme, theme } = useTheme(),
    accountsService = new AccountsService(),
    deviceWidth = useLayoutStore((state) => state.data.width),
    authenticated = useAuthStore((state) => state.data.authenticated);

  const themeHandler = (theme: Theme) => async () => {
    setTheme(theme);

    if (authenticated) {
      await accountsService.setTheme({ theme }).catch(() => {
        import("sonner").then((mod) => {
          mod.toast.error(NETWORK_ERROR, { richColors: true });
        });
      });
    }
  };

  return <Footer theme={theme as Theme} themeHandler={themeHandler} deviceWidth={deviceWidth} />;
}
