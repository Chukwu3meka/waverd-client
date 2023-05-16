import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";

import { Header } from ".";
import { connector, ConnectorProps } from "@store";

import { HeaderContainer } from "@interface/main/header-interface";
import { SetThemeAction } from "@interface/store/layout";
import { setCssThemeVar } from "@utils/handlers";

export default connector((props: HeaderContainer & ConnectorProps) => {
  const { position, setThemeAction } = props,
    [color, setColor] = useState({ first: "textSecondary", last: "primary" }),
    [visible, setVisible] = useState({ nav: false, mobile: false }),
    [displayHeader, setDisplayHeader] = useState(null),
    [authenticated, setauthenticated] = useState(false);

  const [theme, setTheme] = useState<SetThemeAction>("light");

  useEffect(() => {
    setauthenticated(!!props.auth || false);
  }, [props.auth]);

  useEffect(() => {
    setDisplayHeader(props.layout.header);
  }, [props.layout.header]);

  useEffect(() => {
    setTheme(props.layout.theme as SetThemeAction);
  }, [props.layout.theme]);

  useEffect(() => {
    const headerWidth = document.getElementById("header")?.offsetWidth;
    setVisible({ nav: headerWidth > 920, mobile: headerWidth < 600 });
  }, [props.layout.width]);

  const swapColorFn = () => setColor((color) => ({ ...color, first: color.last, last: color.first }));

  const themeHandler = (theme: SetThemeAction) => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    setCssThemeVar(newTheme);

    setThemeAction(newTheme);

    // persist in database
  };

  return <Header {...{ position, authenticated, displayHeader, swapColorFn, color, theme, themeHandler, visible }} />;
});