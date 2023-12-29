import React from 'react';
import { Box, Grid, Typography } from '@mui/material'
import { useAboutUsStyles } from "@/static/stylesheets/aboutUsStyles";
import Image from 'next/image'
import { PublicLayout } from "@/components/layouts";
import aboutUs from '@/static/images/pictures/about_us.png';
import peoplePic from '@/static/images/pictures/our_people.png';

const AboutUs = () => {
  const classes = useAboutUsStyles();
  return (
    <PublicLayout pageProps={{title: "Public Resume Information"}} globalAccess={true}>
      <Box className={classes.root}>
        <Box className={"about-box"}>
          <Grid container spacing={2} sx={{display: 'flex', alignItems: 'center'}}>
            <Grid item md={7} sm={6} xs={12} sx={{paddingRight: {md: 12, sm: 6, xs: 0} }}>
              <Typography component={"h2"}>About us</Typography>
              <Typography>DayRateWork is the #1 job site in the world1 with over 250M unique visitors every month. Indeed strives to put job seekers first, giving them free access to search for jobs, post resumes, and research companies. Every day, we connect millions of people to new opportunities.</Typography>
            </Grid>
            <Grid item md={5} sm={6} xs={12}>
              <Image src={aboutUs} alt={"About us"} />
            </Grid>
          </Grid>
        </Box>

        <Box className={"counter"} sx={{marginTop: {md: 12, sm: 6, xs: 2}}}>
            <Box>
              <Typography component={"h2"}>250M</Typography>
              <Typography>Unique monthly visitors</Typography>
            </Box>
            <Box>
              <Typography component={"h2"}>225M</Typography>
              <Typography>Resumes on DayRateWork</Typography>
            </Box>
            <Box>
              <Typography component={"h2"}>700M+</Typography>
              <Typography>Total ratings and reviews</Typography>
            </Box>

        </Box>
        <Box className={"about-box"} sx={{marginTop: {md: 12, sm: 6, xs: 2}}}>
          <Grid container spacing={2} sx={{display: 'flex', alignItems: 'center'}}>
            <Grid item md={5} sm={6} xs={12}>
              <Image src={peoplePic} alt={"People"} />
            </Grid>
            <Grid item md={7} sm={6} xs={12}>
              <Box sx={{paddingLeft: {md: 12, sm: 6, xs: 0}}}>
                <Typography component={"h2"}>Our people</Typography>
                <Typography>At DayRateWork, our mission is to help people get jobs. We have more than 13,300 global employees passionately pursuing this purpose and improving the recruitment journey through real stories and data. We foster a collaborative workplace that strives to create the best experience for job seekers.</Typography>
              </Box>
            </Grid>

          </Grid>
        </Box>
      </Box>
    </PublicLayout>
  );
};

export default AboutUs;
