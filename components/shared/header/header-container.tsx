"use client";

import Header from "./header";

import { connect } from "react-redux";
import { useEffect, useState } from "react";
import { INIT_PROFILE } from "@lib/constants";
import { setThemeAction } from "@/redux-store/actions/account";
import { useUser } from "@services/swr/profile";
import useAuthStore from "../../../stores/auth.store";

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

  const { authenticated, ...profile } = useAuthStore((state) => state.data);

  // if (userData.) {
  //   signin(res?.data);
  // }

  // const auth = "@";
  // const auth = useBoundStore((state) => state.auth);

  const { position } = props,
    [showNav, setShowNav] = useState(false),
    // [profile, setProfile] = useState<Profile>(INIT_PROFILE),
    // [authenticated, setAuthenticated] = useState<boolean>(false),
    [className, setClassName] = useState<ClassName>(position === "relative" ? "relativeHeader" : "hiddenHeader");

  useEffect(() => {
    if (position === "sticky") setClassName(props.displayHeader ? "stickyHeader" : "hiddenHeader");
  }, [props.displayHeader]);

  // useEffect(() => {
  //   setProfile(props.profile);
  //   setAuthenticated(props.authenticated);
  // }, [props.profile, props.authenticated]);

  useEffect(() => {
    // Regex to match relativeHeader ignoring ID react will attach to module.scss
    const headerElement = document.querySelector(`[class*="${className}"`);

    if (headerElement instanceof HTMLElement) {
      const offsetWidth = headerElement.offsetWidth;
      setShowNav(offsetWidth > 850);
    }
  }, [props.deviceWidth]);

  // return auth ? <p>{JSON.stringify(auth)}</p> : <Header {...{ className, authenticated, profile, showNav }} />;
  return <Header {...{ className, authenticated, profile, showNav }} />;
};

const mapStateToProps = (state: RootState) => ({
    // profile: state.account?.profile,
    profile: state.account,
    deviceWidth: state.layout.width,
    displayHeader: state.layout.displayHeader,
    authenticated: state.account.authenticated,
  }),
  mapDispatchToProps = { setThemeAction };

export default connect(mapStateToProps, mapDispatchToProps)(HeaderContainer);
