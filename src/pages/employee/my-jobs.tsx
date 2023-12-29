import React, { useState, useEffect } from 'react';
import { Box, Tab, Tabs, Typography } from '@mui/material';
import TabPanel, { a11yProps } from "@/components/molecules/employee/TabPanel";
import { PublicLayout } from "@/components/layouts";
import { useMyJobsStyles } from "@/static/stylesheets/employee/myJobsStyles";
import { JobCard } from "@/components/molecules/my-jobs";
import { AppliedStatusSelectModal } from "@/components/molecules/modal/AppliedJobStatusModal";
import { apiClient, endpoints } from "@/api";
import { useAuthInfo } from "@/hooks/custom";
import { useRouter } from "next/router";
import { routePaths } from "@/config";

const MyJobs = () => {
  const classes = useMyJobsStyles();
  const router = useRouter();
  const { userData: authUser } = useAuthInfo();
  var userId = authUser?._id;

  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event: any, newValue: any) => {
    setTabValue(newValue);
  };

  const [allSavedJobs, setAllSavedJobs] = useState([]);
  const [allInvitedJobs, setAllRejectedJobs] = useState([]);
  const [allAppliedJobs, setAllAppliedJobs] = useState([]);
  const [allInterviews, setAllUnderreview] = useState([]);
  const [allArchives, setAllArchives] = useState([]);

  const [AppliedJobStatusDialogOpen, setAppliedJobStatusDialogOpen] = useState(false);
  const [sJobId, setsJobId] = useState(0);
  const [sJobStatus, setsJobStatus] = useState('');

  const getAllSavedJobs = () => {
    apiClient.post({
      url: endpoints.private.getAllJobSaved,
      data: { userid: userId, }
    }).then((res) => {
      setAllSavedJobs(res?.data?.djob);
    }).catch(() => {
      setAllSavedJobs([]);
    });
  };

  const getAllRejectedJobs = () => {
    apiClient.post({
      url: endpoints.private.getalljobRejected,
      data: { userid: userId, }
    }).then((res) => {
      setAllRejectedJobs(res?.data?.djob);
    }).catch(() => {
      setAllUnderreview([]);
    });
  };

  const getAllAppliedJobs = () => {
    apiClient.post({
      url: endpoints.private.getAllJobApplied,
      data: { userid: userId, }
    }).then((res) => {
      setAllAppliedJobs(res?.data?.djob);
    }).catch(() => {
      setAllAppliedJobs([]);
    });
  };

  const getAllUnderrivew = () => {
    apiClient.post({
      url: endpoints.private.getallunderReview,
      data: { userid: userId, }
    }).then((res) => {
      setAllRejectedJobs(res?.data?.djob);
    }).catch(() => {
      setAllUnderreview([]);
    });
  };

  const getAllArchives = () => {
    apiClient.post({
      url: endpoints.private.getAllJobArchived,
      data: { userid: userId, }
    }).then((res) => {
      setAllArchives(res?.data?.djob);
    }).catch(() => {
      setAllArchives([]);
    });
  };

  const deleteFavouriteClick = (jobId: any) => {
    let data: { [key: string]: any } = {};
    data.userid = userId;
    data.jobid = jobId;
    apiClient.post({
      url: endpoints.private.deleteJobSaved,
      data,
    }).then((res) => {
      if (res?.data) {
        getAllSavedJobs();
      }
    }).catch(() => {
    });
  };

  const deleteInvitedClick = (jobId: any) => {
    let data: { [key: string]: any } = {};
    data.userid = userId;
    data.jobid = jobId;
    apiClient.post({
      url: endpoints.private.deletejobInvited,
      data,
    }).then((res) => {
      if (res?.data) {
        // getAllInvitedJobs();
      }
    }).catch(() => {
    });
  };

  const updateJobStatusClick = (status: any) => {
    let data: { [key: string]: any } = {};
    data.userid = userId;
    data.jobid = sJobId;
    data.status = status;
    apiClient.post({
      url: endpoints.private.updateJobAppliedStatus,
      data,
    }).then((res) => {
      if (res?.data) {
        updateAllTabs();
      }
    }).catch(() => {
    });
  };

  const updateAllTabs = () => {
    //if(tabValue == 0){
    getAllSavedJobs();
    //} else if(tabValue == 1){
    getAllRejectedJobs();
    //} else if(tabValue == 2){
    getAllAppliedJobs();
    //} else if(tabValue == 3){
    getAllUnderrivew();
    //} else if(tabValue == 4){
    getAllArchives();
    //}
  };

  useEffect(() => {
    updateAllTabs();
  }, [tabValue]);

  return (
    <PublicLayout pageProps={{
      title: "My Jobs"
    }} globalAccess={true}>
      <Box className={classes.root}>
        <Box className={"container-root"}>
          <Box className={"my-job"}>
            <Box sx={{ borderBottom: '2px solid #cecece' }} className={"tab-container"}>
              <Tabs value={tabValue} onChange={handleChange} variant="scrollable" scrollButtons="auto">
                <Tab label={<span>Saved({allSavedJobs.length})</span>} {...a11yProps(0)} />
                {/* <Tab label={<span>Invited({allInvitedJobs.length})</span>} {...a11yProps(1)} /> */}
                <Tab label={<span>Applied({allAppliedJobs.length})</span>} {...a11yProps(1)} />
                {/* <Tab label={<span>Interviews({allInterviews.length})</span>} {...a11yProps(3)} /> */}
                {/* <Tab label={<span>Archived</span>} {...a11yProps(4)} /> */}
                <Tab label={<span>Rejected</span>} {...a11yProps(2)} />
                <Tab label={<span>Under Review</span>} {...a11yProps(3)} />

              </Tabs>
            </Box>
            <TabPanel value={tabValue} index={0}>
              { /*allSavedJobs && allSavedJobs.length > 0 && allSavedJobs.map((row: any,index) => (
              <JobCard key={'sav'+index} type={'Saved'} job_title={row?.jobdetails[0].jobtitle} company_name={row?.jobdetails[0].companyname} profession={row?.jobdetails[0].adlocation} time_period={row?.saveddate} onClick={() => {router.push(routePaths.applyForJob+"/"+row?.jobid);}} onDelete={() =>{deleteFavouriteClick?.(row?.jobid)}} />
            ))}
            {allSavedJobs && allSavedJobs.length < 1 && (
              <Typography sx={{color: '#000000', fontSize: 28, textAlign: 'center', marginTop: 12}}>No data found!</Typography>
            ) */}
              {allSavedJobs && allSavedJobs.length > 0 && allSavedJobs.map((row: any, index) => (
                <JobCard key={'sav' + index} type={'Saved'} job_title={row?.jobdetails[0].jobtitle}
                         company_name={row?.jobdetails[0].companyname} profession={row?.jobdetails[0].adlocation}
                         time_period={row?.saveddate} feeddomain={row?.jobdetails[0].feeddomain}
                         feedjoburl={row?.jobdetails[0].feedjoburl} feedurl={row?.jobdetails[0].feedurl}
                         jobid={row?.jobdetails[0]}
                         onClick={() => {
                           if (typeof row?.jobdetails[0].feeddomain !== "undefined" && row?.jobdetails[0].feeddomain != "") {
                             if (row?.jobdetails[0].feedjoburl != "") {
                               window.open(row?.jobdetails[0].feedjoburl);
                             } else {
                               window.open(row?.jobdetails[0].feedurl);
                             }
                           } else {
                             router.push(routePaths.applyForJob + "/" + row?.jobid);
                           }
                         }} onDelete={() => {
                  deleteFavouriteClick?.(row?.jobid);
                }} />
              ))}
              {allSavedJobs && allSavedJobs.length < 1 && (
                <Typography sx={{ color: '#000000', fontSize: 20, textAlign: 'center', marginTop: 12 }}>No data found!</Typography>
              )}
            </TabPanel>
            <TabPanel value={tabValue} index={1}>
              {allInvitedJobs && allInvitedJobs.length > 0 && allInvitedJobs.map((row: any, index) => (
                <JobCard key={'app' + index} type={'Rejected'} job_title={row?.jobdetails[0].jobtitle}
                         company_name={row?.jobdetails[0].companyname} profession={row?.jobdetails[0].adlocation}
                         time_period={row?.inviteddate} onClick={() => {
                  router.push(routePaths.applyForJob + "/" + row?.jobid);
                }} onDelete={() => {
                  deleteInvitedClick?.(row?.jobid);
                }} />
              ))}
              {allInvitedJobs && allInvitedJobs.length < 1 && (
                <Typography sx={{ color: '#000000', fontSize: 20, textAlign: 'center', marginTop: 12 }}>No data found!</Typography>
              )}
            </TabPanel>
            <TabPanel value={tabValue} index={2}>
              {allAppliedJobs && allAppliedJobs.length > 0 && allAppliedJobs.map((row: any, index) => (
                <JobCard key={'app' + index} type={'Applied'} job_title={row?.jobdetails[0].jobtitle}
                         company_name={row?.jobdetails[0].companyname} profession={row?.jobdetails[0].adlocation}
                         time_period={row?.applieddate} onClick={() => {
                  setsJobId(row?.jobid);
                  setsJobStatus('');
                  setAppliedJobStatusDialogOpen(true);
                }} />
              ))}
              {allAppliedJobs && allAppliedJobs.length < 1 && (
                <Typography sx={{ color: '#000000', fontSize: 20, textAlign: 'center', marginTop: 12 }}>No data found!</Typography>
              )}
            </TabPanel>
            <TabPanel value={tabValue} index={3}>
              {allInterviews && allInterviews.length > 0 && allInterviews.map((row: any, index) => (
                <JobCard key={'int' + index} type={'Applied'} job_title={row?.jobdetails[0].jobtitle}
                         company_name={row?.jobdetails[0].companyname} profession={row?.jobdetails[0].adlocation}
                         time_period={row?.applieddate} onClick={() => {
                  setsJobId(row?.jobid);
                  setsJobStatus('interview');
                  setAppliedJobStatusDialogOpen(true);
                }} />
              ))}
              {allInterviews && allInterviews.length < 1 && (
                <Typography sx={{ color: '#000000', fontSize: 20, textAlign: 'center', marginTop: 12 }}>No data found!</Typography>
              )}
            </TabPanel>
            <TabPanel value={tabValue} index={4}>
              {allArchives && allArchives.length > 0 && allArchives.map((row: any, index) => (
                <JobCard key={'arc' + index} type={'Applied'} job_title={row?.jobdetails[0].jobtitle}
                         company_name={row?.jobdetails[0].companyname} profession={row?.jobdetails[0].adlocation}
                         time_period={row?.applieddate} onClick={() => {
                  setsJobId(row?.jobid);
                  setsJobStatus('archived');
                  setAppliedJobStatusDialogOpen(true);
                }} />
              ))}
              {allArchives && allArchives.length < 1 && (
                <Typography sx={{ color: '#000000', fontSize: 20, textAlign: 'center', marginTop: 12 }}>No data found!</Typography>
              )}
            </TabPanel>
          </Box>
        </Box>

        <AppliedStatusSelectModal
          open={AppliedJobStatusDialogOpen}
          onClose={() => setAppliedJobStatusDialogOpen(false)}
          code={sJobStatus}
          onChange={(value: any) => {
            setsJobStatus(value?.code);
            updateJobStatusClick(value?.code);
            setAppliedJobStatusDialogOpen(false);
          }}
        />
      </Box>
    </PublicLayout>
  );
};

export default MyJobs;
