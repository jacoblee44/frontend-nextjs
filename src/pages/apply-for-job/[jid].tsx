import React, { useEffect, useState, ChangeEvent } from "react";
import { Box, Typography } from "@mui/material";
import { useApplyForJobStyles } from "@/static/stylesheets";
import { AdminLayout } from "@/components/layouts";
import { ApplyJobStepper } from "@/components/molecules/apply-job";
import { useRouter } from "next/router";
import { apiClient, endpoints } from "@/api";

const ApplyForJob = () => {
  const classes = useApplyForJobStyles();
  const router = useRouter();
  const jobID: any =
    typeof router?.query?.jid !== "undefined" ? router?.query?.jid : 0;

  const [jobTitle, setJobTitle] = useState("");
  const [jobCompany, setJobCompany] = useState("");
  const [jobCity, setJobCity] = useState("");

  const getjobdetails = (jobId: any) => {
    apiClient
      .post({
        url: endpoints.public.getpublicJobs,
        data: {
          jobid: jobId,
        },
      })
      .then((res) => {
        if (res?.data) {
          var jobData = res?.data?.job;
          setJobTitle(jobData.jobtitle);
          setJobCompany(jobData.companyname);
          setJobCity(jobData.adlocation);
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    if (jobID > 0) {
      getjobdetails(jobID);
    }
  }, [jobID]);

  return (
    <AdminLayout
      pageProps={{
        title: "Apply for job",
      }}
    >
      <Box className={classes.root}>
        <Box className={"box"}>
          <Typography component={"h1"}>{jobTitle}</Typography>
          <Typography component={"h3"}>
            {jobCompany} - {jobCity}
          </Typography>
        </Box>
        <Box className={"box"}>
          <ApplyJobStepper jobid={jobID} jobcompany={jobCompany} />
          <Typography
            sx={{
              textAlign: "center",
              color: "#000000",
              fontSize: { md: 16, sm: 15, xs: 14 },
              marginTop: { md: 4, sm: 2, xs: 2 },
            }}
          >
            Have an issue with this application?{" "}
            <span style={{ color: "#6D5086", textDecoration: "underline" }}>
              Tell us more
            </span>
          </Typography>
        </Box>
      </Box>
    </AdminLayout>
  );
};

export default ApplyForJob;
