import React from "react";
import { Box, Typography } from "@mui/material";
import { useJobPostBannerStyles } from "@/static/stylesheets/jobPostBannerStyles";
import Image from "next/image";
import bannerImg from "@/static/images/pictures/picture1.png";

interface JobPostBannerProps {
  title?: string;
  description?: string;
}

export const JobPostBanner: React.FC<JobPostBannerProps> = (props) => {
  const classes = useJobPostBannerStyles(!!props?.description);
  return (
    <Box className={classes.root}>
      <Box className="banner">
        <Box className="content">
          <Typography component="h1">{props?.title}</Typography>
          <Typography>{props?.description}</Typography>
        </Box>
        <Image src={bannerImg} alt="" />
      </Box>
    </Box>
  );
};
