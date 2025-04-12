"use client";

import dynamic from "next/dynamic";
import appStore from "@/redux-store/appStore";

const ReactRedux = dynamic(() => import("react-redux").then((module) => module.Provider));

const ReduxProvider = ({ children }: Readonly<{ children: React.ReactNode }>) => <ReactRedux store={appStore}>{children}</ReactRedux>;

export default ReduxProvider;
