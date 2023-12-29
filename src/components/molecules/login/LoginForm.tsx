import React, { useEffect } from 'react';
import { Box, Typography } from "@mui/material";
import { FacebookAuthButton, TwitterAuthButton } from "@/components/atoms/socialButton";
import google from "@/static/images/icons/sign in_google.png";
import { CustomDivider } from "@/components/atoms/divider";
import { TextInput } from "@/components/atoms/textInput";
import { Button } from "@/components/atoms/button";
import Link from "next/link";
import { routePaths } from "@/config";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import { useAppSelector, useInput } from "@/hooks";
import { validateEmail } from "@/utils";
import { CORRELATION_IDS, selectHttpState } from "@/redux/reducers/http";
import {
  clearLoginResponse,
  clearSSOLoginResponse,
  login,
  registerAccountUsingSSO,
  storeAuthInfo
} from "@/redux/actions";
import toast from "react-hot-toast";
import { SocialSignupParams } from "@/types";
import { GoogleAuthButton } from "@/components/atoms/socialButton/GoogleAuthButton";

interface LoginFormProps {
  onChangeEmail?(email: string): void,

  onSuccess?(): void,
}

const LoginForm: React.FC<LoginFormProps> = (props) => {
  const loginResponse = useAppSelector(selectHttpState)[CORRELATION_IDS.LOGIN];
  const ssoLoginResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.LOGIN_SSO];

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
      onChange(value: any) {
        if(props?.onChangeEmail) {
          props?.onChangeEmail(value);
        }
      }
    });

  const {
    value: password,
    error: passwordError,
    bind: bindPassword,
    reset: resetPassword,
  } =
    useInput('', {
      validate(value) {
        if (value === "") {
          return "Please enter a password!";
        }

        return true;
      }
    });

  const resetLoginFields = () => {
    resetEmail();
    resetPassword();
  };

  const handleLoginSubmit = () => {
    login({
      email,
      pass: password,
    });
  };

  const registerUsingSSO = (props: Partial<SocialSignupParams>, type: "Google" | "Facebook" | "Twitter") => {
    registerAccountUsingSSO({
      email: props?.email,
      // accounttype: userType,
      logintype: type,
      loginuniqid: props?.loginuniqid,
    });
  };

  useEffect(() => {
    if (loginResponse && loginResponse.success) {
      resetLoginFields();
      if (props?.onSuccess) {
        props?.onSuccess();
      }
      clearLoginResponse();
    }

    if (loginResponse && loginResponse.error) {
      const error = loginResponse.error;
      if (error?.status) {
        toast.error(error?.data?.message);
      } else {
        toast.error("Failed to login!");
      }

      clearLoginResponse();
    }
  }, [loginResponse]);

  useEffect(() => {
    if (ssoLoginResponse && ssoLoginResponse.success) {
      const data = ssoLoginResponse?.data;

      if (data && data?.status) {
        const token = data?.token;
        const userId = data?.userid ?? data?.user;

        storeAuthInfo({
          token,
          userData: {
            _id: userId,
          },
          loggedIn: true,
          loginRedirectRef: routePaths.root,
        });

        toast.success("Logged In successfully!");
      }
      clearSSOLoginResponse();
    }

    if (ssoLoginResponse && ssoLoginResponse.error) {
      toast.error("Failed to sign in!");
      clearSSOLoginResponse();
    }
  }, [ssoLoginResponse]);

  return (
    <>
      <Box className="login-form">
        <Typography component="h3">Sign In</Typography>
        <GoogleAuthButton
          onSuccess={(response) => {
            registerUsingSSO({
              email: response?.email,
              loginuniqid: response?.sub,
            }, "Google");
          }}
          onFailure={(error) => {
            toast.error("Failed to login!");
            console.log("ERROR", error);
          }}
          title={"Continue with Google"}
          variant={"default"}
        />
        
        {/*<TwitterAuthButton
          title={"Continue with Twitter"}
          variant={"default"}
        />*/}
        <FacebookAuthButton
          onSuccess={(response) => {
            registerUsingSSO({
              email:response?.email,
              loginuniqid: response?.userID,
            }, "Facebook")
          }}
          onFailure={(response: any) => {
            toast.error("Failed to login!");
            console.log(response);
          }}
          variant={"default"}
        />
        <CustomDivider
          dividerText="Or"
          style={{fontSize: "18px", color: "#5d5d5d"}}
        />
        <TextInput
          label="Email"
          required={true}
          type="email"
          {...bindEmail}
          error={emailError.error}
          hint={emailError.message}
          labelClass={"text-input-label"}
          inputClass={"text-input"}
        />
        <TextInput
          label="Password"
          required={true}
          type="password"
          {...bindPassword}
          error={passwordError.error}
          hint={passwordError.message}
          labelClass={"text-input-label"}
          inputClass={"text-input"}
        />
        <div className={"forgot-password-link"}>
          <Link href={routePaths?.forgotPassword}>
            <a style={{fontSize: 15}}>Forgot password?</a>
          </Link>
        </div>
        <Button
          title={"Sign In"}
          loading={loginResponse?.loading}
          onClick={handleLoginSubmit}
        />
        <div className={"register-link"}>
          <Link href={routePaths.contractor.signup}>
            <a>
              {`I don't have an account`} <TrendingFlatIcon />
            </a>
          </Link>
        </div>
      </Box>
    </>
  );
};

export { LoginForm };
