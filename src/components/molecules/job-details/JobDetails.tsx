import React, { useEffect, useState, ChangeEvent } from "react";
import { Box, IconButton, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { useJobDetailStyles } from "@/static/stylesheets";
import { Button } from "@/components/atoms/button";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { CustomDivider } from "@/components/atoms/divider/Divider";
import { ChipBox } from "@/components/atoms/chip/ChipBox";
import EmojiFlagsIcon from "@mui/icons-material/EmojiFlags";
import { apiClient, endpoints } from "@/api";
import { useAppSelector } from "@/hooks";
import { selectAuthState } from "@/redux/reducers/authSlice";
import { useRouter } from "next/router";
import { routePaths } from "@/config";
import { useAuthInfo } from "@/hooks/custom";
import { RenderHtml } from "@/components/atoms/render-html";

interface JobDetailsProps {
  jobid: number;
  privateJob?: boolean,
}


const JobDetails: React.FC<JobDetailsProps> = (props) => {
  const classes = useJobDetailStyles();
  const [jobfullDetails, setjobFullDetails] = useState([]);
  const [Posteddays, setPosteddays] = useState(0);
  const { loggedIn } = useAppSelector(selectAuthState);
  const router = useRouter();
  const { userData } = useAuthInfo();
  const userId = userData?._id;
  const jobId = props?.jobid;

  const [jobsaved, setJobSaved] = useState(0);
  const [jobapplied, setJobApplied] = useState(0);

  const renderHTML = (rawHTML: string) => React.createElement("div", { dangerouslySetInnerHTML: { __html: rawHTML } });
//const JobDetails = () => {

  const getjobdetails = (jobId: any) => {
    apiClient.post({
      url: props?.privateJob ? endpoints.private.getJob: endpoints.public.getpublicJobs,
      data: {
        jobid: jobId
      }
    }).then((res) => {
      var tmparr: any = [];
      tmparr.push(res?.data?.job);
      setjobFullDetails(tmparr);
      if (typeof res?.data?.job.feeddomain !== "undefined") {
      } else {
        var endDate: any = new Date().toISOString().slice(0, 10);
        var startDate: any = res?.data?.job.createddate.split('T')[0];
        //var endDate:any   = todaydte;
        var dtStart: any = new Date(startDate);
        var dtEnd: any = new Date(endDate);
        var diffInMs: any = dtEnd - dtStart;
        var diffInDays = diffInMs / (1000 * 60 * 60 * 24);
        setPosteddays(diffInDays);
      }
    }).catch(() => {
      setjobFullDetails([]);
    });
  }

  const getjobsaved = (jobId: any) => {
    apiClient.post({
      url: endpoints.private.getJobSaved,
      data: {
        userid: userId,
        jobid: jobId
      }
    }).then((res) => {
      if (res?.data) {
        setJobSaved(res?.data?.savedid);
      }
    }).catch(() => {
    });
  }

  const getjobapplied = (jobId: any) => {
    apiClient.post({
      url: endpoints.private.getJobAppliedbyUser,
      data: {
        userid: userId,
        jobid: jobId
      }
    }).then((res) => {
      if (res?.data) {
        var jobData = res?.data?.djob;
        if (typeof jobData._id !== "undefined") {
          setJobApplied(jobData._id);
        }
      }
    }).catch(() => {
    });
  }

  const handleFavouriteClick = () => {
    if (!loggedIn) {
      router.replace(routePaths.login);
      return;
    }

    let data: { [key: string]: any } = {};
    data.userid = userId;
    data.jobid = props?.jobid;
    /*if (saved > 0) {
      data.djsavedid = saved;
    }*/

    apiClient.post({
      url: (jobsaved > 0) ? endpoints.private.deleteJobSaved : endpoints.private.jobSavebyUser,
      data,
    }).then((res) => {
      if (res?.data) {
        var savedData = res?.data?.jobsave;
        setJobSaved(savedData?._id);
      }
    }).catch(() => {
    });

  }

  const handleApplyClick = (jid: any) => {
    if (!loggedIn) {
      router.replace(routePaths.login);
      return;
    }
    router.replace(routePaths.Resume + '/' + jid);
  }

  const handleExternalApplyClick = (jurl: any, url: any) => {
    if (jurl != "") {
      window.open(jurl);
    } else {
      window.open(url);
    }
  }

  useEffect(() => {
    setJobSaved(0);
    setJobApplied(0);
    getjobdetails(jobId);
    if (loggedIn && jobId > 0) {
      getjobsaved(jobId);
      getjobapplied(jobId);
    }
    //alert(props?.jobid);
  }, [jobId]);

  return (

    <Box className={classes.root}>
      {jobfullDetails && jobfullDetails.length > 0 && jobfullDetails.map((row: any, index) => (
        <Box key={"jfd" + index}>
          <Box className="find-job"></Box>
          <Typography component="h1" className="job-title">
            {row.jobtitle}
          </Typography>
          <Box className="company">
            <Typography component="h4">
              {row.companyname.toString()?.toLowerCase()} <StarIcon style={{ marginLeft: 8, fontSize: 17 }} />
              <StarIcon style={{ fontSize: 17 }} />
              <StarIcon style={{ fontSize: 17 }} />
              <StarIcon style={{ fontSize: 17 }} />
              <StarIcon style={{ marginRight: 8, fontSize: 17 }} />
              421 reviews
            </Typography>
            <Typography>{(row?.address && row?.address.length > 0) ? row?.address.city : row?.adlocation + ' ' + (row?.address && row?.address.length > 0) ? row?.postalcode : ''}</Typography>
            {row.jobtype?.length > 0 && (
              <Typography className={"job-type"}>{row.jobtype.join(',')}</Typography>
            )}
            {((!loggedIn) || (loggedIn && userData?.accounttype == 'contractor')) && (
              <Box className="apply-section">
                {(typeof row.feeddomain !== "undefined" && row.feeddomain != "") ? (
                    <Button title="Apply on company site" height="60px" width="250px" onClick={() => {
                      handleExternalApplyClick?.(row.feedjoburl, row.feedurl)
                    }} />
                  ) :

                  (jobapplied > 0) ? (
                    <Button title="Applied" style={{ backgroundColor: "transparent", color: "#6D5086", cursor: "none" }}
                            height="60px" width="175px" onClick={() => {
                    }} />
                  ) : (
                    <Button title="Apply now" height="60px" width="175px" onClick={() => {
                      handleApplyClick?.(row?._id)
                    }} />
                  )
                }
                {(jobapplied == 0 && jobsaved > 0) && (
                  <FavoriteIcon onClick={handleFavouriteClick} />
                )}
                {(jobapplied == 0 && jobsaved == 0) && (
                  <FavoriteBorderIcon onClick={handleFavouriteClick} />
                )}
              </Box>
            )}
          </Box>
          <Box className="divider">
            <CustomDivider
              dividerText=""
              style={{ borderColor: "#6D5086", height: "2px" }}
            />
          </Box>
          {(typeof row.jobtype !== "undefined" && row.jobtype != "") &&
            <>
              <Box className="job-type">
                <Typography component="h2">Job details</Typography>
                {row?.jobtype && row?.jobtype.length > 0 && row?.jobtype.map((row: any, index: any) => (
                  <Typography key={'jd' + index}>{row}</Typography>
                ))}
              </Box>
              <Box className="divider">
                <CustomDivider
                  dividerText=""
                  style={{ borderColor: "#6D5086", height: "2px" }}
                />
              </Box>
            </>
          }
          {(typeof row.benefitsoffered !== "undefined" && row.benefitsoffered != "") &&
            <>
              <Box className="benefits">
                <Typography component="h2">Benefits</Typography>
                <Typography>Pulled from the full job description</Typography>
                <Box className="chip">
                  {row?.benefitsoffered && row?.benefitsoffered.length > 0 && row?.benefitsoffered.map((rows: any, index: any) => (
                    <Box key={'bo' + index} className={"benefit-item"}>
                      {rows}
                    </Box>
                  ))}
                </Box>
              </Box>
            </>
          }
          <Box className="details">
            <Typography component="h2">Full Job Description</Typography>
            <CustomDivider
              dividerText=""
              style={{ borderColor: "#6D5086", height: "2px" }}
            />
            <Box>
              <RenderHtml html={row?.jobdescription} />
            </Box>
            <Box className="divider">
              <CustomDivider
                dividerText=""
                style={{ borderColor: "#6D5086", height: "2px" }}
              />
            </Box>
            <Box className="hiring-insight">
              <Typography component={"h2"}>Hiring Insights</Typography>
              <Typography className={"job-activity"}>Job activity</Typography>
              {(typeof row.feeddomain !== "undefined" && row.feeddomain != "") ? (
                  <Typography className={"posted-date"}>Posted {row.feedposteddate}</Typography>) :
                (<Typography>Posted {Posteddays} day ago</Typography>)
              }
            </Box>
            <Box className="divider">
              <CustomDivider
                dividerText=""
                style={{ borderColor: "#6D5086", height: "2px" }}
              />
            </Box>
            <Box className="job-report">
              <EmojiFlagsIcon />
              <Typography>Report job</Typography>
            </Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
};

export { JobDetails };
