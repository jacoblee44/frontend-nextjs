import React, { useEffect } from 'react';
import { useForgetPasswordStyles } from "@/static/stylesheets";
import { useAppSelector, useInput } from "@/hooks";
import { CORRELATION_IDS, selectHttpState } from "@/redux/reducers/http";
import { validateEmail } from "@/utils";
import { clearForgotPasswordResponse, sendForgotPasswordVerification } from "@/redux/actions";
import { appConfig, routePaths } from "@/config";
import toast from "react-hot-toast";
import { Box, Grid, Link, Typography } from "@mui/material";
import Image from "next/image";
import signInImg from "@/static/images/pictures/sign_in_1.png";
import { TextInput } from "@/components/atoms/textInput";
import { Button } from "@/components/atoms/button";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import DayrateWorkLogo from "@/static/images/logo_dayratework.png";
import { useRouter } from "next/router";

interface ForgotPasswordFormProps {
  onSuccess?(email: string): void,
}

const ForgotPasswordForm: React.FC<ForgotPasswordFormProps> = (props) => {
  const router = useRouter();
  const classes = useForgetPasswordStyles();
  const forgotPasswordResponse = useAppSelector(selectHttpState)[CORRELATION_IDS.FORGOT_PASSWORD];

  const {
    value: email,
    error: emailError,
    bind: bindEmail,
    reset: resetEmail,
  } =
    useInput('', {
      validate(value) {
        if (!validateEmail(value)) {
          return "Please enter a valid email address!";
        }

        return true;
      },
    });

  const sendVerificationLink = () => {
    emailError?.check();
    if (emailError?.check()) {
      return;
    }

    sendForgotPasswordVerification({
      email,
      url: `${appConfig.appBaseUrl}/reset-password/`,
    });
  };

  const handleClickBrandLogo = async () => {
    await router.push(routePaths.root);
  };

  useEffect(() => {
    if (forgotPasswordResponse && forgotPasswordResponse?.success) {
      if (props?.onSuccess) {
        props?.onSuccess(email);
      }
      clearForgotPasswordResponse();
    }

    if (forgotPasswordResponse && forgotPasswordResponse?.error) {
      toast.error("Failed to send verification link!");
      clearForgotPasswordResponse();
    }
  }, [forgotPasswordResponse]);
  return (
    <>
      <Grid container className={classes.root}>
        <Grid item md={6} xs={12} className={classes.leftSide}>
          <Box className="logo" onClick={handleClickBrandLogo}>
            <Image src={DayrateWorkLogo} />
          </Box>
          <Box className="hero-image">
            <Image src={signInImg} alt="" />
          </Box>
        </Grid>
        <Grid item md={6} xs={12} className={classes.rightSide}>
          <Box className="login-form">
            <Typography component="h3">Reset Password</Typography>
            <TextInput
              label="Email address"
              required={true}
              type="email"
              {...bindEmail}
              error={emailError?.error}
              hint={emailError?.message}
              labelClass={"text-input-label"}
              inputClass={"text-input"}
            />

            <Button title={"Send Verification Link"} onClick={sendVerificationLink} />
            <div className={"register-link"}>
              <Link href={routePaths?.login}>
                {`Login`} <TrendingFlatIcon />
              </Link>
            </div>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export { ForgotPasswordForm };
