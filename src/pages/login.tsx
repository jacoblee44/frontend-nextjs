import { PublicLayout } from "@/components/layouts";
import { LoginForm } from "@/components/molecules/login";
import React, { useState } from "react";
import { useLoginStyles } from "@/static/stylesheets";
import { Box, Grid } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import signInImg from "@/static/images/pictures/sign_in_1.png";
import { OtpForm } from "@/components/molecules/login/OtpForm";
import { routePaths } from "@/config";
import DayrateWorkLogo from "@/static/images/logo_dayratework.png";

const Login = () => {  
  const router = useRouter();
  const classes = useLoginStyles();
  const [otpSent, setOtpSent] = useState<boolean>(false);
  const [otpEmail, setOtpEmail] = useState('');
  const handleClickBrandLogo = async () => {
    await router.push(routePaths.root);
  };
  return (
    <PublicLayout
      pageProps={{
        title: "Login",
      }}
      hideHeader={true}
    >
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
          {!otpSent ? (
            <LoginForm
              onChangeEmail={(email) => setOtpEmail(email)}
              onSuccess={() => setOtpSent(true)}
            />
          ) : (
            <OtpForm
              email={otpEmail}
              onClickLogin={() => setOtpSent(false)}
            />
          )}
        </Grid>
      </Grid>
    </PublicLayout>
  );
};

export default Login;
