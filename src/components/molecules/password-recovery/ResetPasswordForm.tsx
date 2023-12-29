import React, { useEffect } from 'react';
import { useForgetPasswordStyles } from "@/static/stylesheets";
import { useAppSelector, useInput } from "@/hooks";
import { CORRELATION_IDS, selectHttpState } from "@/redux/reducers/http";
import { validateEmail } from "@/utils";
import {
  clearForgotPasswordResponse,
  clearResetPasswordResponse, resetPassword,
  sendForgotPasswordVerification
} from "@/redux/actions";
import { appConfig, routePaths } from "@/config";
import toast from "react-hot-toast";
import { Box, Grid, Link, Typography } from "@mui/material";
import Image from "next/image";
import signInImg from "@/static/images/pictures/sign_in_1.png";
import { TextInput } from "@/components/atoms/textInput";
import { Button } from "@/components/atoms/button";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import { useRouter } from "next/router";
import DayrateWorkLogo from "@/static/images/logo_dayratework.png";

interface ResetPasswordFormProps {
  onSuccess?(): void,
}

const ResetPasswordForm: React.FC<ResetPasswordFormProps> = (props) => {
  const router = useRouter();
  const classes = useForgetPasswordStyles();
  const encdata = router?.query?.id;
  const resetPasswordResponse = useAppSelector(selectHttpState)[CORRELATION_IDS.RESET_PASSWORD];

  const {
    value: newPassword,
    error: newPasswordError,
    bind: bindNewPassword,
    reset: resetNewPassword,
  } =
    useInput('', {
      validate(value) {
        if (value === "") {
          return "Please enter a password!";
        }

        var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!re.test(value)) {
          return "Your password must have minimum 8 characters includes at least one special character, a number, one capital letter!";
        }

        return true;
      },
      onChange(value: any) {
        if (value !== confirmPassword) {
          setConfirmPasswordError("Password do not match!");
        }
      }
    });

  const {
    value: confirmPassword,
    error: confirmPasswordError,
    bind: bindConfirmPassword,
    reset: resetConfirmPassword,
    setError: setConfirmPasswordError,
  } =
    useInput('', {
      validate(value) {
        if (newPassword !== value) {
          return "Password do not match!";
        }

        return true;
      }
    });

  const resetFields = () => {
    // resetEmail();
    resetNewPassword();
  };

  const handleClickBrandLogo = async () => {
    await router.push(routePaths.root);
  };

  const changePassword = () => {
    if (newPasswordError?.check()) {
      return;
    }

    if (confirmPasswordError?.check()) {
      return;
    }

    if (encdata && typeof encdata === "string") {
      resetPassword({
        encdata,
        fpass: newPassword,
      });
    }
  };

  useEffect(() => {
    if (resetPasswordResponse && resetPasswordResponse?.success) {
      if (props?.onSuccess) {
        props?.onSuccess();
      }
      clearResetPasswordResponse();
    }

    if (resetPasswordResponse && resetPasswordResponse?.error) {
      toast.error("Failed to change the password!");
      clearResetPasswordResponse();
    }
  }, [resetPasswordResponse]);
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
            <Typography component="h3">Change Password</Typography>
            <TextInput
              label="Password"
              required={true}
              type="password"
              {...bindNewPassword}
              error={newPasswordError.error}
              hint={newPasswordError.message}
              labelClass={"text-input-label"}
              inputClass={"text-input"}
            />

            <TextInput
              label="Confirm Password"
              required={true}
              type="password"
              {...bindConfirmPassword}
              error={confirmPasswordError.error}
              hint={confirmPasswordError.message}
              labelClass={"text-input-label"}
              inputClass={"text-input"}
            />

            <Button title={"Change Password"} onClick={changePassword} />
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

export { ResetPasswordForm };
