import React from 'react';
import { Box, Grid, Typography } from '@mui/material'
import { useLegalTermsStyles } from "@/static/stylesheets/legalTermsStyles";
import { PublicLayout } from "@/components/layouts";
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import AccountBalanceOutlinedIcon from '@mui/icons-material/AccountBalanceOutlined';
import CopyrightOutlinedIcon from '@mui/icons-material/CopyrightOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { useRouter } from "next/router";
import { routePaths } from "@/config";

const LegalTerms = () => {
  const classes = useLegalTermsStyles();
  const router = useRouter();

  const gotoTermsServicePage = () => {
    router.push(routePaths.termsAndService)
  }

  const gotoPrivacyPolicyPage = () => {
    router.push(routePaths.privacyPolicy)
  }

  const gotoCommunityGuidelinePage = () => {
    router.push(routePaths.communityGuideline)
  }
  const gotoCookieStatementPage = () => {
    router.push(routePaths.cookieStatement)
  }
  return (
    <PublicLayout pageProps={{ title: "Legal terms" }} globalAccess={true}>
      <Box className={classes.root}>
        <Box className={"banner"}>
          <Box sx={{ padding: { md: '40px 200px', sm: '10px 50px', xs: '10px 20px' } }}>
            <Typography component={"h2"}>Legal Terms</Typography>
            <Typography style={{ color: "#ffffff", marginTop: "10px" }}>
              These legal terms collectively ensure transparency, protect user privacy, establish guidelines for user conduct, and govern the use of the DayRateWork Platform. Users are encouraged to review these documents carefully and contact DayRateWork with any questions or concerns.

            </Typography>
          </Box>
        </Box>
        <Box className={"content-box"}>
          <Grid container spacing={3}>

            <Grid item md={3} sm={6} xs={12} onClick={gotoTermsServicePage}>
              <Box className={"item"}>
                <InfoOutlinedIcon />
                <Typography>Terms & Service</Typography>
              </Box>
            </Grid>
            <Grid item md={3} sm={6} xs={12} onClick={gotoPrivacyPolicyPage}>
              <Box className={"item"}>
                <DescriptionOutlinedIcon />
                <Typography>Privacy Policy</Typography>
              </Box>
            </Grid>
            <Grid item md={3} sm={6} xs={12} >
              <Box className={"item"} onClick={gotoCommunityGuidelinePage}>
                <CopyrightOutlinedIcon />
                <Typography>Community Guideline</Typography>
              </Box>
            </Grid>
            <Grid item md={3} sm={6} xs={12} >
              <Box className={"item"} onClick={gotoCookieStatementPage}>
                <AccountBalanceOutlinedIcon />
                <Typography>Cookie Statement</Typography>
              </Box>
            </Grid>

          </Grid>
          <Box className={"details"}>
            <Typography>Terms of Service:
              The Terms of Service govern the use of the DayRateWork platform. It includes provisions regarding the description of services, pricing, payment terms, termination, limitation of liability, dispute resolution, and other key points for job seekers and employers using the Platform.  </Typography>
            <Typography>Privacy Policy:
              The Privacy Policy explains how DayRateWork collects, uses, discloses, and protects personal information when users access the Platform. It outlines the types of information collected, the purposes of collection, data security measures, user rights, and contact information for privacy-related inquiries.  </Typography>
            <Typography>Community Guidelines:
              The Community Guidelines provide users with guidelines for appropriate behavior and conduct while using the DayRateWork Platform. It covers topics such as respect, professionalism, prohibition of illegal activities, and adherence to the Platform's terms and policies. </Typography>
            <Typography>Cookie Statement:
              The Cookie Statement informs users about the use of cookies and similar technologies on the DayRateWork Platform. It explains the purpose of cookies, the types of cookies used, and the options available for managing cookie preferences. </Typography>
 





          </Box>
        </Box>
      </Box>
    </PublicLayout>
  );
};

export default LegalTerms;
