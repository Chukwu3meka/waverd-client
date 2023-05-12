import Link from "next/link";
import Image from "next/image";
import LoadingButton from "@mui/lab/LoadingButton";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Stack, Typography, IconButton, InputLabel, FormControl, OutlinedInput, Box } from "@mui/material";

import { ForgotPassword } from "@interface/accounts/forgotPassword-interface";

const Signin = ({ resetPasswordHandler, form, onInputChange }: ForgotPassword) => (
  <Stack spacing={3} textAlign="center" component="form" noValidate margin="auto" maxWidth={600}>
    {/* <Stack spacing={3} alignItems="center" textAlign="center" component="form" noValidate sx={{ "& > *": { width: "100%", maxWidth: "460px" } }}> */}

    <Box>
      <Image src="/images/layout/password.png" alt="SoccerMASS" width={150} height={120} style={{ margin: "auto" }} />
    </Box>

    <Typography fontSize="1.3em" fontWeight={600}>
      Forgot Password
    </Typography>

    <Typography fontSize=".8em" textAlign="center" sx={{ marginTop: "5px !important" }}>
      Kindly enter the email address associated with your account, and we'll send a link to reset your password
    </Typography>

    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor="outlined-adornment-password">Email Address</InputLabel>
      <OutlinedInput
        id="email"
        value={form.email.value}
        disabled={form.options.loading}
        onChange={(e) => onInputChange(e)}
        placeholder="firstname.lastname@soccermass.com"
        error={!form.email.valid}
        label="Email Address"
        autoComplete="off"
      />
    </FormControl>

    <LoadingButton
      fullWidth
      size="large"
      variant="contained"
      color="primary"
      onClick={() => resetPasswordHandler()}
      disabled={form.options.loading}
      loading={form.options.loading}>
      <Typography sx={{ fontWeight: 900 }}>Send Link</Typography>
    </LoadingButton>

    <Typography fontSize=".8em" textAlign="center">
      <Link href="/accounts/signin">
        <IconButton color="primary" sx={{ fontSize: "1.3em", mr: "-0px" }}>
          <ArrowBackIcon fontSize="inherit" />
        </IconButton>
        Back to Sign in
      </Link>
    </Typography>
  </Stack>
);

export default Signin;
