import React from 'react';
import { Box, Typography } from '@mui/material'
import { useResumeStyles } from "@/static/stylesheets";
import { Button } from "@/components/atoms/button";
import { PublicLayout } from "@/components/layouts";
import { routePaths } from "@/config";
import { useRouter } from "next/router";
const Resume = () => {
  const classes = useResumeStyles();
  const router = useRouter();
  const jobID:any = (typeof router?.query?.jid !== "undefined" ) ? router?.query?.jid : 0;
  const gotoDashboard = async () => {
    //await router.push(routePaths?.employees?.createResume);
    await router.push('/');    
  };
  const gotoApply = async () => {    
    window.localStorage.removeItem('gotostep');  
    window.localStorage.removeItem('jobid');
    await router.push(routePaths?.applyForJob+"/"+jobID);
  };

  return (
    <PublicLayout pageProps={{
      title: "Resume",

    }} globalAccess={true}>
      <Box className={classes.root}>
        <Box className="box">
          <Typography component={"h2"}>Add a resume to DayRateWork</Typography>
          <Box sx={{display: {md: 'flex', sm: 'inline-block', xs: 'inline-block'}, justifyContent: 'space-between', gap: 2}}>
            <Box sx={{width: { md: 360, sm: 280, xs: 230 }}}>
              <Button title={"Upload your resume"} onClick={gotoApply}  />
            </Box>
            <Box sx={{width: { md: 360, sm: 280, xs: 230 }}}>
              <Button title={"Back to Dashboard"} onClick={gotoDashboard}  />
            </Box>
          </Box>
          <Typography>By continuing, you agree to create a <a href="/public-resume-info" target='_blank'>public resume</a> and agree to receiving job opportunities from employers.</Typography>
        </Box>
        <Typography component={"h3"} onClick={gotoApply} >Skip for now</Typography>
      </Box>
    </PublicLayout>
  );
};

export default Resume;
