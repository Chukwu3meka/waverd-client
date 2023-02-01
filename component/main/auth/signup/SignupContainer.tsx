import { connect } from "react-redux";

import { logoutAction } from "@store/actions";

import { useEffect, useState } from "react";
import { useSnackbar } from "notistack";

import { Signup, handlers } from ".";
// import validateInput from "@utils/validator";
import { sleep } from "@utils/handlers";
import { setAuthAction } from "@store/actions";
import Router from "next/router";
import validateInput from "@utils/validator";

const SignupContainer = (props: any) => {
  const { setAuthAction } = props,
    { enqueueSnackbar } = useSnackbar();

  const [values, setValues] = useState<any>({
    showPassword: false,
    buttonLoading: false,
    email: process.env.NODE_ENV === "development" ? (process.env.NEXT_PUBLIC_TEST_EMAIL as string) : "",
    handle: process.env.NODE_ENV === "development" ? (process.env.NEXT_PUBLIC_TEST_HANDLE as string) : "",
    password: process.env.NODE_ENV === "development" ? (process.env.NEXT_PUBLIC_TEST_PASSWORD as string) : "",
    fullName: process.env.NODE_ENV === "development" ? (process.env.NEXT_PUBLIC_TEST_FULL_NAME as string) : "",
  });

  const [formError, setFormError] = useState<any>({
    email: { status: "invalid", pristine: true, message: "Email cannot be empty" },
    password: { status: "invalid", pristine: true, message: "Password cannot be empty" },
    handle: { status: "invalid", pristine: true, message: "Handle cannot be empty" },
    fullName: { status: "invalid", pristine: true, message: "Full Name cannot be empty" },
  }); // <= STATUS: valid, invalid, loading

  // const signinFormMouseMoveCapture = handlers.signinFormMouseMoveCapture;
  const registerHandler = () => "handlers.registerHandler({ setValues, values })";
  const handleClickShowPassword = () => setValues({ ...values, showPassword: !values.showPassword });
  const onInputChange = (e: React.FocusEvent<HTMLInputElement>) => handlers.onInputChange(e, setValues, setFormError);

  return <Signup {...{ onInputChange, handleClickShowPassword, values, formError, registerHandler }} />;
  // return <Signup />;
};

const mapStateToProps = (state: any) => ({ authenticated: state.auth.status }),
  mapDispatchToProps = { logoutAction };

export default connect(mapStateToProps, mapDispatchToProps)(SignupContainer);
