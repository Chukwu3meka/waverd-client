"use client";

import dynamic from "next/dynamic";
import { connect } from "react-redux";

const FooterContainer = dynamic(() => import("@components/shared/footer/footer-container")),
  Accounts = dynamic(() => import("@components/layouts/accounts/accounts"), { ssr: false });

const AccountsLayout = ({ children, ...props }: { children: React.ReactNode; deviceWidth: number }) => (
  <main className="grid-rows-[auto_max-content]">
    <Accounts deviceWidth={props.deviceWidth}>{children}</Accounts>
    <FooterContainer />
  </main>
);

const mapDispatchToProps = {},
  mapStateToProps = (state: RootState) => ({ deviceWidth: state.layout.width });

export default connect(mapStateToProps, mapDispatchToProps)(AccountsLayout);
