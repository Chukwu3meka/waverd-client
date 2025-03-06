"use client";

import dynamic from "next/dynamic";

import { ReactNode } from "react";
import { connect } from "react-redux";

const Accounts = dynamic(() => import("@components/layouts/accounts/accounts"), { ssr: false });

const AccountsContainer = ({ children, deviceWidth }: { children: ReactNode; deviceWidth: number }) => <Accounts deviceWidth={deviceWidth}>{children}</Accounts>;

const mapDispatchToProps = {},
  mapStateToProps = (state: RootState) => ({ deviceWidth: state.layout.width });

export default connect(mapStateToProps, mapDispatchToProps)(AccountsContainer);
