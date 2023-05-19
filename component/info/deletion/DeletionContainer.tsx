import { useSnackbar } from "notistack";
import { useState, useEffect } from "react";

import { Deletion, handlers } from ".";
import { connector, ConnectorProps } from "@store";

import { UserForm } from "@interface/components/info/dataDeletion";

export default connector((props: ConnectorProps) => {
  const [authenticated, setAuthenticated] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    setAuthenticated(!!props.auth);
  }, [props.auth]);

  const [userForm, setUserForm] = useState<UserForm>({
    options: { showPassword: false, loading: false, validate: false },
    email: { value: "", valid: true, info: "Email cannot be empty", validate: true },
    handle: { value: "", valid: true, info: "Handle cannot be empty", validate: true },
    comment: { value: "", valid: true, info: "Comment cannot be empty", validate: true },
    password: { value: "", valid: true, info: "Password cannot be empty", validate: true },
  });

  const deleteDataHandler = () => handlers.deleteDataHandler({ enqueueSnackbar, setUserForm, userForm });
  const handleClickShowPassword = () => setUserForm((values) => ({ ...values, options: { ...values.options, showPassword: !values.options.showPassword } }));
  const onInputChange = (e: React.FocusEvent<HTMLInputElement>, onBlur: boolean) =>
    handlers.onInputChange({ e, setUserForm, enqueueSnackbar, closeSnackbar, onBlur });

  return <Deletion {...{ onInputChange, userForm, handleClickShowPassword, deleteDataHandler, authenticated }} />;
});