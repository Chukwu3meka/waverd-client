"use client";

import Header from "./header";

import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { INIT_PROFILE } from "@lib/constants";
import { setThemeAction } from "@store/actions/account";

interface HeaderContainerProps {
  profile: Profile;
  deviceWidth: number;
  displayHeader: boolean;
  authenticated: boolean;
  setThemeAction: Function;
  position: "relative" | "sticky";
}

type ClassName = "relativeHeader" | "stickyHeader" | "hiddenHeader";

const HeaderContainer = (props: HeaderContainerProps) => {
  //  accountsService = new AccountsService(),
  //   { enqueueSnackbar } = useSnackbar(),

  const { position } = props,
    [showNav, setShowNav] = useState(false),
    [profile, setProfile] = useState<Profile>(INIT_PROFILE),
    [authenticated, setAuthenticated] = useState<boolean>(false),
    [className, setClassName] = useState<ClassName>(position === "relative" ? "relativeHeader" : "hiddenHeader");

  useEffect(() => {
    if (position === "sticky") setClassName(props.displayHeader ? "stickyHeader" : "hiddenHeader");
  }, [props.displayHeader]);

  useEffect(() => {
    setProfile(props.profile);
    setAuthenticated(props.authenticated);
  }, [props.profile, props.authenticated]);

  useEffect(() => {
    // Regex to match relativeHeader ignoring ID react will attach to module.scss
    const headerElement = document.querySelector(`[class*="${className}"`);

    if (headerElement instanceof HTMLElement) {
      const offsetWidth = headerElement.offsetWidth;
      setShowNav(offsetWidth > 850);
    }
  }, [props.deviceWidth]);

  return <Header {...{ className, authenticated, profile, showNav }} />;
};

const mapStateToProps = (state: RootState) => ({
    profile: state.account.profile,
    deviceWidth: state.layout.width,
    displayHeader: state.layout.displayHeader,
    authenticated: state.account.authenticated,
  }),
  mapDispatchToProps = { setThemeAction };

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
