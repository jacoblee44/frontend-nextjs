import React from 'react';
import { Box, Typography } from '@mui/material'
import { useResumeReadyStyles } from "@/static/stylesheets/resume";
import Image from 'next/image';
import pic1 from '@/static/images/pictures/picture1.png'
import { Button } from "@/components/atoms/button";
import { PublicLayout } from "@/components/layouts";

const ResumeReady = () => {
  const classes = useResumeReadyStyles();

  return (
    <PublicLayout pageProps={{
      title: "Resume ready"
    }} globalAccess={true}>
      <Box className={classes.root}>
        <Box className={"box"}>
          <Image src={pic1} alt={"img"}  />
          <Typography component={"h2"} mt={3}>Your DayRateWork Resume is ready to share</Typography>
          <Typography >Now let's find your next job</Typography>
          <Box sx={{display: {md: 'flex', xs: 'inline-block'}, justifyContent: 'space-between', alignItems: 'center'}}>
            <Button title={"View your profile >"} width={"350px"} onClick={() => alert()} height={"60px"} />
            <Button title={"Create a new resume >"} width={"350px"} onClick={() => alert()} btnType={"border"} height={"60px"} />
          </Box>
        </Box>
      </Box>
    </PublicLayout>
  );
};

export default ResumeReady;
