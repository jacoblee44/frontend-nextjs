import React from 'react';
import { Box, Typography } from '@mui/material'
import { useJobPostConfirmationStyles } from "@/static/stylesheets/employee-job";
import { Button } from "@/components/atoms/button";

const JobPostConfirmation = () => {
  const classes = useJobPostConfirmationStyles();
  return (
    <Box className={classes.root}>
        <Box className={"confirmation-box"}>
            <Typography component={"h2"}>Your contract job post is live</Typography>
            <Typography component={"h4"}>View your job post:</Typography>
            <Typography>http://exampleexample</Typography>
            <Button title={"Return to jobs"} onClick={() => alert()} width={"220px"} />
        </Box>
    </Box>
  );
};

export { JobPostConfirmation };
