import React from 'react';
import { PublicLayout } from "@/components/layouts";
import { Box, Typography } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { usePrivacyPolicyStyles } from "@/static/stylesheets/privacyPolicies";
import { useRouter } from "next/router";
import { routePaths } from "@/config";

const TermsAndService = () => {
  const classes = usePrivacyPolicyStyles();
  const router = useRouter();
  const goBack = () => {
    router.push(routePaths.legalTerms)
  }
  return (
    <PublicLayout pageProps={{title: "Terms & service"}} globalAccess={true}>
      <Box className={classes.root}>
        <Box className={"banner"}>
          <Box sx={{width: {md: '40%', sm: '60%', xs: '90%'}, margin: '0 auto'}}>
            <Typography component={"h2"}>Terms & Service</Typography>
            <Typography>Lorem ipsome doler site amit. Lorem ipsome doler site amit. Lorem ipsome doler site amit Lorem ipsome doler site amit</Typography>
            <Box className={"back-button"} onClick={goBack}> <ArrowBackIosNewOutlinedIcon/> Go Back  </Box>
          </Box>
        </Box>

        <Box className={"content"}>
          <Typography component={"h2"}>Dayratework</Typography>
          <Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
          <Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</Typography>
          <Typography>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, </Typography>
        </Box>
      </Box>
    </PublicLayout>
  );
};

export default TermsAndService;
