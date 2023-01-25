import LoadingButton from "@mui/lab/LoadingButton";
import { AttentionSeeker } from "react-awesome-reveal";
import { Visibility as VisibilityIcon, VisibilityOff as VisibilityOffIcon, Login as LoginIcon } from "@mui/icons-material";
import { Box, Stack, Tooltip, TextField, Typography, IconButton, InputLabel, FormControl, OutlinedInput, InputAdornment, Button } from "@mui/material";

import { SocialAuth, styles } from ".";
import InputStatus from "@component/builder/InputStatus";

const Signin = ({ signinFormMouseMoveCapture, handleChange, handleClickShowPassword, values, formError, loginHandler, handleFocus }: any) => (
  <div className={styles.formContainer} id="formContainer">
    <div id="signin" className={styles.signin} onMouseMoveCapture={signinFormMouseMoveCapture}>
      <SocialAuth />

      <div className={styles.divider}>
        <span />
        <span>or</span>
      </div>

      <Stack spacing={3} alignItems="center" p={2} component="form" noValidate autoComplete="off" sx={{ width: "100%", maxWidth: 670 }}>
        <Stack direction="row" width="100%" alignItems="center">
          <TextField
            fullWidth
            onBlur={handleFocus("email")}
            id="email"
            disabled={values.buttonLoading}
            value={values.email}
            aria-describedby="email"
            label="Office Email"
            variant="outlined"
            placeholder="firstname.lastname@zenithbank.com"
            onChange={handleChange("email")}
          />
          <InputStatus status={formError.email} />
        </Stack>

        <Stack direction="row" width="100%" alignItems="center">
          <FormControl fullWidth variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">Admin Password</InputLabel>
            <OutlinedInput
              onBlur={handleFocus("password")}
              id="password"
              type={values.showPassword ? "text" : "password"}
              value={values.password}
              disabled={values.buttonLoading}
              onChange={handleChange("password")}
              placeholder="Four (4) digit pin + Token"
              endAdornment={
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={handleClickShowPassword} edge="end">
                    {values.showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                  </IconButton>
                </InputAdornment>
              }
              label="Admin Password"
            />
          </FormControl>

          <InputStatus status={formError.password} />
        </Stack>

        <Box sx={{ textAlign: "right", width: "100%" }}>
          <AttentionSeeker effect="bounce">
            <Tooltip title={formError.status && formError.errorMessages}>
              <LoadingButton onClick={loginHandler} size="large" disabled={!!formError.status} variant="outlined" endIcon={<LoginIcon />} loading={!!values.buttonLoading}>
                <Typography sx={{ fontWeight: 900 }}>Login</Typography>
              </LoadingButton>
            </Tooltip>
          </AttentionSeeker>
        </Box>
      </Stack>
    </div>
  </div>
);

export default Signin;