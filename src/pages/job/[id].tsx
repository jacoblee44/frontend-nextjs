import React, { useEffect, useState } from 'react';
import { useJobSinglePageStyles } from "@/static/stylesheets";
import { PublicLayout } from "@/components/layouts";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CachedIcon from "@mui/icons-material/Cached";
import Image from "next/image";
import deleteIcon from "@/static/images/icons/delete.png";
import { ChipBox } from "@/components/atoms/chip";
import { apiConfig, routePaths } from "@/config";
import { useAppSelector } from "@/hooks";
import { selectAuthState } from "@/redux/reducers/authSlice";
import { useRouter } from "next/router";
import { apiClient, endpoints } from "@/api";
import { useAuthInfo } from "@/hooks/custom";
import { JobDetails } from "@/components/molecules/job-details";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { JobFeed } from "@/components/molecules/job-feed";
import { getNumberOfArrayItems, remove_ending_slash } from "@/utils";
import { GetServerSideProps } from "next";
import { format } from 'date-fns';


const JobSingle = (props: any) => {
  const { userData } = useAuthInfo();
  /*if (userData?.accounttype == 'contractor') {  
    window.location.href = '/';
  }*/
  const classes = useJobSinglePageStyles();
  const router = useRouter();
  const jobData = props?.jobDetails ? JSON.parse(props?.jobDetails) : null;
  const jobDetails = jobData?.job ?? null;
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [allrecentSearch, setAllRecentSearch] = useState([]);
  const [allglobalSearch, setAllGlobalSearch] = useState([]);
  const [allactiveJobs, setAllActiveJobs] = useState([]);

  const jobId = router?.query?.id as any;
  const searchReferer = router?.query?.ref === "search";

  const { userData: authUser, loggedIn } = useAuthInfo();
  const userid = authUser?._id;  

  const handlesearchalljobs = (keyword: any) => {
    //krecentsearch(keyword,location);
    //kfeedsearch(keyword,location);
    var searchterm = "/" + keyword + "-" + location;
    router.push(routePaths?.Search + searchterm);
  }

  const getAllJobs = () => {
    //if(keyword != "") {
    apiClient.get({
      url: endpoints.public.getallJobs,
    }).then((res) => {
      setAllActiveJobs(res?.data?.job);
    }).catch(() => {
      //setAllActiveJobs([]);
    });
    //}
  }

  const getallrecentsearch = () => {
    apiClient.post({
      url: endpoints.private.recentsearchJobs,
      data: {
        userid: userid,
        rlimit: 1,
      }
    }).then((res) => {
      setAllRecentSearch(res?.data?.job);
    }).catch(() => {
      setAllRecentSearch([]);
    });
  }

  const getallglobalsearch = () => {
    apiClient.post({
      url: endpoints.public.gblsearchJobs,
      data: {
        glimit: 5,
      }
    }).then((res) => {
      setAllGlobalSearch(res?.data?.job);
    }).catch(() => {
      setAllGlobalSearch([]);
    });
  }

  const deleterecentsearch = (recid: any) => {
    apiClient.post({
      url: endpoints.private.deleterecentsearchJobs,
      data: {
        recid: recid,
      }
    }).then((res) => {
      getallrecentsearch();
    }).catch(() => {
    });
  }

  const handleClickBack = () => {
    router?.back();
  };

  const handleClickJobCard = (id: number) => {
    if (id) {
      router?.push(`/job/${id}${searchReferer ? 'ref=search' : ''}`);
    }
  };


  useEffect(() => {
    if (loggedIn) {
      getallrecentsearch();
    }
    getallglobalsearch();
    getAllJobs();
  }, []);

  return (
    <>
      <PublicLayout
        pageProps={{
          title: jobDetails?.jobtitle ?? "Job detail",
        }}
        globalAccess={true}
      >
        <Box className={classes.root}>
          {/*<div className="job-find">
            <div className={"job-find-box"}>
              <Typography component="h2">Find your next contract job</Typography>
              <Box className="search-box">
                <input
                  type={"search"}
                  value={keyword}
                  placeholder="Search jobs, keywords, companies"
                  onChange={(e) => setKeyword(e.target.value)}
                />

                <input
                  type={"search"}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)} placeholder="Enter location" />

                <IconButton aria-label="delete" onClick={() => {
                  handlesearchalljobs(keyword)
                }}>
                  <SearchIcon />
                  <span className={"label"}>Search Jobs</span>
                </IconButton>
              </Box>

              {loggedIn && allrecentSearch && allrecentSearch.length > 0 && (
                <Typography>Your recent searches</Typography>
              )}

              {loggedIn && allrecentSearch && allrecentSearch.length > 0 && allrecentSearch.map((row: any, index) => (
                <Box
                  key={'rs' + index}
                  className="recent-search"
                  onClick={() => {
                    setKeyword(row?.jobsearchkeyword);
                    handlesearchalljobs(row?.jobsearchkeyword);
                  }}>
                  <Box className="recent">
                    <CachedIcon />
                    <Typography>{row?.jobsearchkeyword}</Typography>
                    <Image src={deleteIcon} alt="" onClick={() => {
                      deleterecentsearch?.(row?._id)
                    }} />
                  </Box>
                </Box>
              ))}

              <Box className={"popular-search-container"}>
                {!loggedIn && allglobalSearch && allglobalSearch.length > 0 && (
                  <>
                    <Box className={"title"}>
                      Popular searches
                    </Box>
                    <Box className="popular-search">
                      {allglobalSearch && allglobalSearch.length > 0 && allglobalSearch.map((row: any, index) => (
                        <ChipBox
                          key={'ps' + index}
                          label={row?.jobsearchkeyword}
                          icon={<SearchIcon />}
                          height="45px"
                          selectType={(item) => {
                            setKeyword(row?.jobsearchkeyword);
                            handlesearchalljobs(row?.jobsearchkeyword);
                          }}
                        />
                      ))}
                    </Box>
                  </>
                )}
              </Box>
            </div>
          </div>*/}

          <div className={"content-container"}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12} md={7} lg={8} xl={8}>
                {searchReferer && (
                  <Box className={"job-detail-header"}>
                    <Box
                      className={"back-button"}
                      onClick={handleClickBack}
                    >
                      <KeyboardArrowLeftIcon />
                      Search Results
                    </Box>
                  </Box>
                )}

                {jobId && (
                  <JobDetails jobid={jobId} />
                )}
              </Grid>
              <Grid item xs={12} sm={12} md={5} lg={4} xl={4}>
                <Box className={"job-detail-header"}>
                  <Box className={"section-title"}>
                    Latest Jobs
                  </Box>
                </Box>

                <Box>
                  {allactiveJobs && allactiveJobs.length > 0 && getNumberOfArrayItems(allactiveJobs ?? [], 0, 5).map((row: any) => (
                    <JobFeed
                      key={row?._id}
                      title={row.jobtitle}
                      sub_title={row?.jobtitle + ' in ' + (row?.address && row?.address.length > 0) ? row?.address.city : row?.adlocation}
                      description={row.jobdescription}
                      companyName={row.companyname}
                      jobStatus={row.jobstatus}
                      jobType={row.jobtype.join(',')}                      
                      time={format(new Date(row.createddate), 'dd/M/yyyy  h:m:s')}
                      review={3.5}
                      onClick={() => {
                        // setJobId(row._id);
                        handleClickJobCard(row._id);
                      }}
                    />
                  ))}
                </Box>
              </Grid>
            </Grid>
          </div>
        </Box>
      </PublicLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const jobResponse = await fetch(
    `${remove_ending_slash(apiConfig?.root)}${endpoints.public.getpublicJobs}`,
    {
      method: "post",
      body: JSON.stringify({
        jobid: context?.query?.id,
      }),
    }
  );

  let jobDetails: any = null;

  try {
    jobDetails = await jobResponse?.json();
  } catch (e) {
    jobDetails = null;
  }

  return {
    props: {
      jobDetails: JSON.stringify(jobDetails)
    },
  }
}

export default JobSingle;
