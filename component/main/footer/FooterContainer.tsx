import { connect } from "react-redux";
import { useSnackbar } from "notistack";

import { Footer } from ".";
import { useEffect, useState } from "react";
import { IFooterContainer } from "@interface/main/footer-interface";
// import { logoutAction } from "@store/actions";
const logoutAction = () => {};

const FooterContainer = (props: IFooterContainer) => {
  const { logoutAction } = props,
    { enqueueSnackbar } = useSnackbar(),
    [authenticated, setauthenticated] = useState(false);

  useEffect(() => {
    setauthenticated(props.authenticated || false);
  }, [props.authenticated]);

  const logoutHandler = () => () => {
    if (authenticated) {
      logoutAction();
    } else {
      enqueueSnackbar("You're not logged in yet", { variant: "info" });
    }
  };

  return <Footer {...{ logoutHandler, authenticated }} />;
};

const mapStateToProps = (state: any) => ({ authenticated: state.auth.status }),
  mapDispatchToProps = { logoutAction };

export default connect(mapStateToProps, mapDispatchToProps)(FooterContainer);
