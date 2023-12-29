import React from 'react';
import { usePrivacyPolicyStyles } from "@/static/stylesheets/privacyPolicies";
import { useRouter } from "next/router";
import { routePaths } from "@/config";
import { PublicLayout } from "@/components/layouts";
import { Box, Typography } from "@mui/material";
import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";

const CookieStatement = () => {
  const classes = usePrivacyPolicyStyles();
  const router = useRouter();
  const goBack = () => {
    router.push(routePaths.legalTerms)
  }
  return (
    <PublicLayout pageProps={{title: "Cookie Statement"}} globalAccess={true}>
      <Box className={classes.root}>
        <Box className={"banner"}>
          <Box sx={{width: {md: '60%', sm: '60%', xs: '90%'}, margin: {md: '0 auto', sm: '2em auto', xs: '0 auto'},  marginTop: {md: 0, sm: 8, xs: 2},  marginBottom: {md: 0, sm: 8, xs: 2}  }}>
            <Typography component={"h2"}>Cookie Statement</Typography>
            <Typography>
            Last updated: 19/06/2023
            </Typography>
            <Typography>This Cookie Statement explains how DayRateWork uses cookies, web beacons, and similar technologies on the DayRateWork platform. By using the Platform, you consent to the use of cookies and other tracking technologies as described in this Cookie Statement.</Typography>
            <Box className={"back-button"} onClick={goBack}> <ArrowBackIosNewOutlinedIcon/> Go Back  </Box>
          </Box>
        </Box>

        <Box className={"content"}>
          <Typography component={"h3"}>1. What Are Cookies and Similar Technologies?</Typography>
          <Typography>Cookies are small text files that are placed on your device when you visit a website or use an online service. They are widely used to make websites function efficiently and provide a personalized browsing experience. In addition to cookies, we may also use other tracking technologies such as web beacons (also known as pixel tags, clear gifs, or tracking pixels) to collect information about your interactions with the Platform.</Typography>

          <Typography component={"h3"}>2. Types of Cookies We Use:</Typography>
          <Typography>a. Essential Cookies: These cookies are necessary for the operation of the Platform and enable you to navigate and use its features. They are essential for the proper functioning of the Platform and cannot be disabled.</Typography>
          <Typography>b. Analytical and Performance Cookies: These cookies collect information about how you use the Platform, such as the pages you visit, the links you click, and the duration of your visit. This information helps us analyze and improve the performance of the Platform.</Typography>
          <Typography>c. Functionality Cookies: These cookies allow the Platform to remember your preferences and provide enhanced features and personalized content. For example, they may remember your language preferences or user settings..</Typography>
          <Typography>d. Advertising and Targeting Cookies: These cookies are used to deliver relevant advertisements and content to you based on your interests and browsing behavior. They may also be used to measure the effectiveness of advertising campaigns.</Typography>


          <Typography component={"h3"}>3. Third-Party Cookies: </Typography>
          <Typography>We may allow third-party service providers, such as analytics providers and advertisers, to place cookies and similar technologies on the Platform. These third parties may collect information about your online activities over time and across different websites and services.</Typography>

          <Typography component={"h3"}>4. Cookie Management and Opt-Out: </Typography>
          <Typography>a. Cookie Consent: By continuing to use the Platform, you consent to the placement of cookies and similar technologies on your device as described in this Cookie Statement.</Typography>
          <Typography>b. Cookie Settings: You can manage your cookie preferences and settings through the browser or device you use to access the Platform. Most browsers allow you to control cookies through their settings. Please note that disabling certain cookies may impact the functionality and performance of the Platform.</Typography>
          <Typography>c. Third-Party Opt-Out: Some third-party advertisers and analytics providers offer opt-out mechanisms to control the collection and use of your information for targeted advertising or analytics purposes. Please refer to the privacy policies of these third parties for more information.</Typography>


          <Typography component={"h3"}>5. Duration of Cookies: </Typography>
          <Typography>Cookies may be stored on your device for different durations. "Session cookies" are temporary and are deleted when you close your browser. "Persistent cookies" remain on your device for a longer period or until you manually delete them.</Typography>

          <Typography component={"h3"}>6. Changes to the Cookie Statement: </Typography>
          <Typography>We may update this Cookie Statement from time to time to reflect changes in our practices or legal requirements. We will notify you of any material changes by posting the updated Cookie Statement on the Platform or by other means of communication.</Typography>


          <Typography component={"h3"}>Contact Us: </Typography>
          <Typography>If you have any questions, concerns, or requests regarding this Cookie Statement or our use of cookies and similar technologies, please contact us using the contact information provided at the end of this Cookie Statement.</Typography>

          <Typography>
          By using the DayRateWork Platform, you acknowledge that you have read, understood, and agreed to the practices described in this Cookie Statement. If you do not agree to this Cookie Statement, please refrain from using the Platform.
          </Typography>
        </Box>
      </Box>
    </PublicLayout>
  );
};

export default CookieStatement;
