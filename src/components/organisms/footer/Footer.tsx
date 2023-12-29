import { CustomDivider } from "@/components/atoms/divider/Divider";
import { useFooterStyles } from "@/static/stylesheets";
import {
  Box,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
  Dialog
} from "@mui/material";
import React, { useEffect, useState, ChangeEvent } from "react";
import { useHomeStyles } from "@/static/stylesheets";
//import React from "react";
import facebook from "@/static/images/icons/facebook.png";
import twitter from "@/static/images/icons/twitter.png";
import linkedin from "@/static/images/icons/linkedin.png";
import instagram from "@/static/images/icons/instagram.png";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import { routePaths } from "@/config";
import { useRouter } from "next/router";
import { useAuthInfo } from "@/hooks/custom";
import DayrateWorkLogo from "@/static/images/logo_dayratework_dark_mode.png";
import CloseIcon from '@mui/icons-material/Close';

const Footer = () => {
  const classes1 = useHomeStyles();
  const classes = useFooterStyles();
  const router = useRouter();
  const { userData: authUser } = useAuthInfo();
  const userid = authUser?._id;
  const adminactive = authUser?.adminactive;  
  const [privilegelinkopen, setPrivilegeLinkOpen] = useState(false);

  const gotoPostJob = async () => {
    await router.push(routePaths.employer.postJob);
  };

  const gotoSearchResume = async () => {
    await router.push(routePaths.employer.searchResume);
  };
  const gotoPricing = async () => {
    await router.push(routePaths.employer.pricing);
  };
  const gotoFindJob = async () => {
    //await router.push(routePaths.employer.dashboard);
    await router.push(routePaths.root);
  };

  const gotoCompanyReview = async () => {
    await router.push(routePaths.employees.companyReview);
  };

  const gotoFindSalary = async () => {
    await router.push(routePaths.employees.findSalary);
  };

  const gotoAboutUs = async () => {
    await router.push(routePaths.aboutUs);
  };

  const gotoContactUs = async () => {
    await router.push(routePaths.contactUs);
  };

  const gotoHelps = async () => {
    await router.push(routePaths.helps);
  };
  const gotoTermsAndConditions = async () => {
    await router.push(routePaths.termsAndService);
  };
  const gotoPrivacyPolicy = async () => {
    await router.push(routePaths.privacyPolicy);
  };

  const gotoContractorSignUp = async () => {
    await router.push(routePaths.contractor.signup);
  };

  const handleClickBrandLogo = async () => {
    await router.push(routePaths.root);
  };

  return (
    <Box className={classes.root}>
      <Grid container spacing={2}>
        <Grid item md={4}>
          <Box className={"logo-container"} onClick={handleClickBrandLogo}>
            <img src={DayrateWorkLogo.src} alt={"Dayratework"} />
          </Box>
        </Grid>
        <Grid item md={8}>
          <Grid container spacing={3}>
            <Grid item md={4}>
              <Typography component="h3">For Employers</Typography>
              <Box>
                <List>
                {adminactive === true && (
                <ListItem disablePadding>
                <ListItemButton component="a" onClick={() => {
                if (authUser?.accounttype === 'contractor' || !authUser) {
                  setPrivilegeLinkOpen(true);
                } else if (authUser?.accounttype === 'employer') {
                  gotoPostJob();
                }
                }}>
                <ListItemText primary="Post a job" />
                </ListItemButton>
                </ListItem>
                )}
                  <ListItem disablePadding>
                    <ListItemButton component="a" onClick={() => {
                    if (authUser?.accounttype === 'contractor' || !authUser) {
                      setPrivilegeLinkOpen(true);
                    } else if (authUser?.accounttype === 'employer') {
                      gotoSearchResume();
                    }
                    }}>
                      <ListItemText primary="Search resumes" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton component="a" onClick={gotoPricing}>
                      <ListItemText primary="Pricing" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton component="a" onClick={gotoHelps}>
                      <ListItemText primary="Help" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Grid>
            <Grid item md={4}>
              <Typography component="h3">For Contractors</Typography>
              <Box>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton component="a" onClick={gotoFindJob}>
                      <ListItemText primary="Find a job" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton component="a" onClick={gotoCompanyReview}>
                      <ListItemText primary="Resources" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton component="a" onClick={gotoHelps}>
                      <ListItemText primary="Help" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton component="a" onClick={gotoContractorSignUp}>
                      <ListItemText primary="Create an account" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Grid>
            <Grid item md={4}>
              <Typography component="h3">Company</Typography>
              <Box>
                <List>
                  <ListItem disablePadding>
                    <ListItemButton component="a" onClick={gotoAboutUs}>
                      <ListItemText primary="About us" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton component="a" onClick={gotoTermsAndConditions}>
                      <ListItemText primary="Terms & Conditions" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton component="a" onClick={gotoPrivacyPolicy}>
                      <ListItemText primary="Privacy Policy" />
                    </ListItemButton>
                  </ListItem>
                  <ListItem disablePadding>
                    <ListItemButton component="a" onClick={gotoContactUs}>
                      <ListItemText primary="Contact Us" />
                    </ListItemButton>
                  </ListItem>
                </List>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <Grid container spacing={3} sx={{ marginTop: 4 }}>
        <CustomDivider
          style={{
            color: "#ffffff",
            borderColor: "#ffffff",
          }}
          dividerText=""
        />
        <Grid item md={4} sm={4} xs={2}></Grid>
        <Grid item md={4} sm={4} xs={8}>
          <Box className="social-icon">
            <IconButton aria-label="google" size="small">
              <Image src={facebook} alt={"facebook"} />
            </IconButton>
            <IconButton aria-label="google" size="small">
              <Image src={twitter} alt={"twitter"} />
            </IconButton>
            <IconButton aria-label="google" size="small">
              <Image src={linkedin} alt={"linkedin"} />
            </IconButton>
            <IconButton aria-label="google" size="small">
              <Image src={instagram} alt={"instagram"} />
            </IconButton>
          </Box>
          <Box
            className={"copyright-text"}
            sx={{ textAlign: "center", color: "#ffffff", mt: "10px" }}
          >
            <Typography>© 2023 Dayratework</Typography>
          </Box>
        </Grid>
      </Grid>

      <Dialog
            open={privilegelinkopen}
            onClose={() => setPrivilegeLinkOpen(false)}
          >
            <Box className={classes1.privilegelinkPopupBody}>
              <Box className={"dialog-header"}>
                <IconButton onClick={() => setPrivilegeLinkOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box className={"dialog-body"}>
                As a Contractor, you are not previllege to access this page. Please create account as an <a href="/signup/employer" style={{ fontWeight: "bold", textDecoration: "underline" }}>Employer</a> 
              </Box>
            </Box>
            
          </Dialog>
    </Box>
  );
};

export { Footer };
