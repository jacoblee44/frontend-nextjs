import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useAboutUsStyles } from "@/static/stylesheets/aboutUsStyles";
import Image from "next/image";
import { PublicLayout } from "@/components/layouts";
import aboutUs from "@/static/images/pictures/about_us_new.png";
import peoplePic from "@/static/images/pictures/our_people.png";
import offeringPic from "@/static/images/pictures/offerings.jpg";

const AboutUs = () => {
  const classes = useAboutUsStyles();
  return (
    <PublicLayout pageProps={{ title: "About us" }} globalAccess={true}>
      <Box className={classes.root}>
        <Box className={"about-box"}>
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Grid
              item
              md={7}
              sm={12}
              xs={12}
              sx={{ paddingRight: { md: 12, sm: 6, xs: 0 } }}
            >
              <Typography component={"h2"}>About us</Typography>
              <Typography>
                DayRateWork is the one of the world's leading job sites with
                over 250M unique visitors every month. We strive to put job
                seekers first, giving them free access to search for jobs, post
                resumes, and research companies. Every day, we connect millions
                of people to new opportunities. Our mission is to empower
                individuals and businesses by providing a seamless and efficient
                platform to connect talent with job opportunities.
              </Typography>
            </Grid>
            <Grid item md={5} sm={12} xs={12}>
              <Image src={aboutUs} alt={"About us"} />
            </Grid>
          </Grid>
        </Box>

        <Box className={"counter"} sx={{ marginTop: { md: 12, sm: 6, xs: 2 } }}>
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
        <Box
          className={"about-box"}
          sx={{ marginTop: { md: 12, sm: 6, xs: 2 } }}
        >
          <Grid
            container
            spacing={2}
            sx={{ display: "flex", alignItems: "center" }}
          >
            <Grid item md={5} sm={12} xs={12}>
              <Image src={peoplePic} alt={"People"} />
            </Grid>
            <Grid item md={7} sm={12} xs={12}>
              <Box sx={{ paddingLeft: { md: 12, sm: 0, xs: 0 } }}>
                <Typography component={"h2"}>Our people</Typography>
                <Typography>
                  At DayRateWork, our mission is to help people get jobs. We
                  have more than 13,300 global employees passionately pursuing
                  this purpose and improving the recruitment journey through
                  real stories and data. We foster a collaborative workplace
                  that strives to create the best experience for job seekers.{" "}
                </Typography>

                <Typography>
                  Our team consists of passionate professionals who bring
                  diverse expertise in technology, recruitment, and business
                  operations. We are united by our shared commitment to creating
                  a platform that revolutionizes the contract job market and
                  empowers individuals and businesses alike.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>

        <Box className={"about-box"}>
          <Grid
            container
            spacing={2}
            sx={{
              display: "flex",
              alignItems: "center",
              marginTop: { md: 12, sm: 6, xs: 2 },
            }}
          >
            <Grid
              item
              md={7}
              sm={12}
              xs={12}
              sx={{ paddingRight: { md: 12, sm: 6, xs: 0 } }}
            >
              <Typography component={"h2"}>What We Offer</Typography>
              <Typography>
                We envision a world where the contract job market is easily
                accessible and transparent, enabling job seekers to find their
                ideal contract roles and employers to efficiently connect with
                skilled professionals. We strive to be the go-to platform for
                contract job search, providing a trusted and user-friendly
                environment that fosters success for both job seekers and
                employers.
              </Typography>
              <Typography>
                Our platform offers job seekers a wide range of contract job
                listings across various industries and sectors. With our
                advanced search filters and algorithms, users can find the most
                relevant opportunities based on their skills, experience, and
                preferences. Through a combination of skill-based matching and
                user preferences, we aim to enhance the efficiency and
                effectiveness of the job search process.
              </Typography>
            </Grid>
            <Grid item md={5} sm={12} xs={12}>
              <Image src={offeringPic} alt={"What we offer"} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </PublicLayout>
  );
};

export default AboutUs;
