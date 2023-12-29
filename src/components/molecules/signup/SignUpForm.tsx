import React, { useEffect } from 'react';
import { Box, Grid, Typography } from "@mui/material";
import Image from "next/image";
import signUpImg from "@/static/images/pictures/sign_up.png";
import TrendingFlatIcon from "@mui/icons-material/TrendingFlat";
import { TextInput } from "@/components/atoms/textInput";
import { CustomDivider } from "@/components/atoms/divider/Divider";
import { FacebookAuthButton, SocialButton, TwitterAuthButton } from "@/components/atoms/socialButton";
import { Button } from "@/components/atoms/button";
import { useSignUpStyles } from "@/static/stylesheets";
import { appConfig, routePaths } from "@/config";
import Link from "next/link";
import { useRouter } from "next/router";
import { useAppSelector, useInput } from "@/hooks";
import { validateEmail } from "@/utils";
import { registerAccount, registerAccountUsingSSO } from "@/redux/actions";
import { CORRELATION_IDS, selectHttpState } from "@/redux/reducers/http";
import { SignUpParams, SocialSignupParams } from "@/types";
import { GoogleAuthButton } from "@/components/atoms/socialButton/GoogleAuthButton";
import toast from "react-hot-toast";
import DayrateWorkLogo from "@/static/images/logo_dayratework.png";
import DayrateWorkLogoOrange from "@/static/images/logo_dayratework_white.png";

interface SignUpFormProps {
  userType: "contractor" | "employer",
}

const SignUpForm: React.FC<SignUpFormProps> = (props) => {
  const userType = props?.userType;
  const classes = useSignUpStyles();
  const router = useRouter();
  const createAccountResponse = useAppSelector(selectHttpState)[CORRELATION_IDS.SIGNUP];

  const goToSignUpPage = async () => {
    await router.push(
      userType === "contractor" ?
        routePaths.employer.signup :
        routePaths.contractor.signup
    );
  };

  const handleClickBrandLogo = async () => {
    await router.push(routePaths.root);
  };

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
        var re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!re.test(value)) {
          return 'Your password must have minimum 8 characters includes at least one special character, a number, one capital letter! Don`t use these special characters #£^\'\()+,-./:;<=>[\]_`{|}~"';
        }

        return true;
      }
    });

  const resetFields = () => {
    resetEmail();
    resetPassword();
  };

  const register = () => {
    if (emailError.check() || passwordError.check()) {
      return false;
    }

    registerAccount({
      email,
      pass: password,
      accounttype: userType,
      url: `${appConfig.appBaseUrl}/${routePaths.activateUser}/`,
    });
  };

  const registerUsingSSO = (props: Partial<SocialSignupParams>, type: "Google" | "Facebook" | "Twitter") => {
    registerAccountUsingSSO({
      email: props?.email,
      accounttype: userType,
      logintype: type,
      loginuniqid: props?.loginuniqid,
    });
  };

  useEffect(() => {
    resetFields();
  }, [userType]);

  return (
    <>
      <Grid container className={classes.root}>
        <Grid item md={6} className={classes.leftSide(userType)}>
          <Box className="logo">
            <Typography component="h1"><a onClick={handleClickBrandLogo}>{userType === "contractor" ?
              <Image src={DayrateWorkLogoOrange} alt="Dayratework" /> :
              <Image src={DayrateWorkLogo} alt="Dayratework" />}</a></Typography>
          </Box>
          <Box className="hero-image">
            <Image src={signUpImg} alt="" />
          </Box>
        </Grid>
        <Grid item md={6} className={classes.rightSide(userType)}>
          <Box className="login-form">
            <Typography component="h3">Sign Up</Typography>
            <Box className={"user-type-text"}>
              <a onClick={goToSignUpPage}>
                I am {userType === "contractor" ? "employer" : "contractor"} <TrendingFlatIcon />
              </a>
            </Box>
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
            <CustomDivider
              dividerText="Or"
              style={{ fontSize: "18px", color: "#5d5d5d" }}
            />

            <Box className="social-signup">
              <GoogleAuthButton
                onSuccess={(response) => {
                  registerUsingSSO({
                    email: response?.email,
                    loginuniqid: response?.sub,
                  }, "Google");
                }}
                onFailure={(error) => {
                  console.log("ERROR", error)
                }}
                variant={"round"}
              />
              {/*<TwitterAuthButton
                variant={"round"}
              />*/}
              <FacebookAuthButton
                onSuccess={(response) => {
                  registerUsingSSO({
                    email: response?.email,
                    loginuniqid: response?.userID,
                  }, "Facebook");
                }}
                onFailure={() => {
                  toast.error("Failed to sign up!");
                }}
                variant={"round"}
              />
            </Box>
            <Typography className="privacy-policy">
              By creating an account, you agree to our <Link href={routePaths.termsAndService} style={{marginTop: 0}}>Terms & Conditions</Link> and have read and acknowledge our <Link href={routePaths.privacyPolicy} style={{marginTop: 0}}>Privacy Policy</Link>.
            </Typography>
            <Button
              title={"Sign Up"}
              onClick={register}
              loading={createAccountResponse?.loading}
              className={"submit-button"}
            />
            <Box className={"login-link"}>
              <Link href={routePaths.login}>
                <a>
                  I have an account <TrendingFlatIcon />
                </a>
              </Link>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export { SignUpForm };
