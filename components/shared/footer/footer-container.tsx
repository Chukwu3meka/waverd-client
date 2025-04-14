"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
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

  return <Footer theme={theme as Theme} themeHandler={themeHandler} deviceWidth={deviceWidth} />;
}
