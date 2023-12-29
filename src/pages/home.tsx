import React, { useEffect, useState, ChangeEvent } from "react";
import { useHomeStyles } from "@/static/stylesheets";
import { Box, Dialog, Grid, IconButton } from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import SearchIcon from "@mui/icons-material/Search";
import deleteIcon from "@/static/images/icons/delete.png";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { JobFeed } from "@/components/molecules/job-feed";
import { JobDetails } from "@/components/molecules/job-details/JobDetails";
import { CustomDivider } from "@/components/atoms/divider/Divider";
import { ChipBox } from "@/components/atoms/chip/ChipBox";
import { Footer } from "@/components/organisms/footer";
import { PublicLayout } from "@/components/layouts";
import { apiClient, endpoints } from "@/api";
import { useAuthInfo } from "@/hooks/custom";
import { useAppSelector } from "@/hooks";
import { selectAuthState } from "@/redux/reducers/authSlice";
import { routePaths } from "@/config";
import { useRouter } from "next/router";
import CloseIcon from '@mui/icons-material/Close';
import { format } from 'date-fns';

const Home = () => {
  const classes = useHomeStyles();
  const router = useRouter();
  const [allactiveJobs, setAllActiveJobs] = useState([]);
  const [allactivefeedJobs, setAllActivefeedJobs] = useState([]);
  const [loadJobs, setLoadJobs] = useState('');
  const [keyword, setKeyword] = useState('');
  const [location, setLocation] = useState('');
  const [jobId, setJobId] = useState(0);
  const [FeedJobId, setFeedJobId] = useState(0);
  const [allrecentSearch, setAllRecentSearch] = useState([]);
  const [allglobalSearch, setAllGlobalSearch] = useState([]);
  const [tabListing, settabListing] = useState('feed');
  const [jobtabActive, setjobtabActive] = useState('active');
  const [rsearchtabActive, setrsearchtabActive] = useState('');
  const [jobFeedDetailPopupOpen, setJobFeedDetailPopupOpen] = useState(false);
  const { userData: authUser } = useAuthInfo();
  var userid = authUser?._id;
  const { loggedIn } = useAppSelector(selectAuthState);

  /*
  const { values, setValue } = useFormMethods();
  const keyword = (typeof values['search.keyword'] !== "undefined") ? values['search.keyword'] : '';
  const location = (typeof values['search.location'] !== "undefined") ? values['search.location'] : '';*/

  const handlesearchalljobs = (keyword: any) => {
    //krecentsearch(keyword,location);
    //kfeedsearch(keyword,location);
    var searchterm = "/" + keyword + "-" + location;
    router.push(routePaths?.Search + searchterm);
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>,keyword:any) => {
    //alert(e.keyCode);
    if (e.keyCode === 13) {
      handlesearchalljobs(keyword)
    }
  }

  const handleloginconjobs = () => {
    apiClient.post({
      url: endpoints.private.getdesiredJobbyuid,
      data: {
        userid: userid,
      }
    }).then((res) => {
      var loggedjtitle = res?.data?.djobdata;
      krecentsearch(loggedjtitle.jobtitle, '');
      //kfeedsearch(keyword,location);
    }).catch(() => {
    });
  }

  const handleloginconfeedjobs = () => {
    apiClient.post({
      url: endpoints.private.getdesiredJobbyuid,
      data: {
        userid: userid,
      }
    }).then((res) => {
      var loggedjtitle = res?.data?.djobdata;
      //krecentsearch(loggedjtitle.jobtitle,'');
      kfeedsearch(keyword, location);
    }).catch(() => {
    });
  }

  const getallactivejobs = () => {
    apiClient.get({
      url: endpoints.public.getallJobs,
    }).then((res) => {
      console.log(res?.data?.job.length);
      console.log(JSON.stringify(res?.data?.job)+" test all jobs test");
      setAllActiveJobs(res?.data?.job);
      setJobId(res?.data?.job[0]._id);
    }).catch(() => {
      setAllActiveJobs([]);
    });
  }

  const getallactivefeedjobs = () => {
    apiClient.get({
      url: endpoints.public.getallfeedJobs,
    }).then((res) => {
      setAllActivefeedJobs(res?.data?.job);
      setFeedJobId(res?.data?.job[0]._id);
    }).catch(() => {
      setAllActivefeedJobs([]);
    });
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

  const getrecentsearches = () => {
    apiClient.post({
      url: endpoints.private.recentsearches,
      data: {
        userid: userid,
        rlimit: 1,
      }
    }).then((res) => {
      //setAllRecentSearch(res?.data?.job);
      var resumedata = res?.data?.resudata;
      console.log(resumedata[0].jobsearchkeyword);
      krecentsearch(resumedata[0].jobsearchkeyword, '');
    }).catch(() => {
      setAllRecentSearch([]);
    });
  }

  const getrecentsearchespub = () => {
    apiClient.post({
      url: endpoints.public.recentsearchespublic,
      data: {
        rlimit: 1,
      }
    }).then((res) => {
      //setAllRecentSearch(res?.data?.job);
      var resumedata = res?.data?.resupubdata;
      console.log(resumedata);
      krecentsearch(resumedata[0].jobsearchkeyword, '');
    }).catch(() => {
      setAllRecentSearch([]);
    });
  }

  

  const krecentsearch = (kword: any, location: any) => {
    if (kword != "") {
      apiClient.post({
        url: endpoints.public.searchallJobs,
        data: {
          keyword: kword,
          location: location,
          userid: userid,
        }
      }).then((res) => {
        console.log(res?.data?.search);
        if(res?.data?.search != 'No jobs Available'){          
          setJobId(res?.data?.search[0]._id);
        }
        setAllActiveJobs(res?.data?.search);
      }).catch(() => {
        //setAllActiveJobs([]);
      });
    } else if(kword == "" && location == ""){
      window.location.href="/";
    }
  }

  const kfeedsearch = (kword: any, location: any) => {
    if (kword != "") {
      apiClient.post({
        url: endpoints.public.searchallfeedJobs,
        data: {
          keyword: kword,
          location: location,
          userid: userid,
        }
      }).then((res) => {
        setAllActivefeedJobs(res?.data?.search);
        setFeedJobId(res?.data?.search[0]._id);
      }).catch(() => {
        setAllActivefeedJobs([]);
      });
    }
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

  const handlejobload = (jobid: any) => {
    if (tabListing == 'feed') {
      setFeedJobId(jobid);
    } else {
      setJobId(jobid);
    }
  }

  function handleSearch(e:any,term:any) {
    let keyw = "";
    let loc = "";
    if (e.target.value === '') { 
      if(term == 'keyword') {
        //setKeyword(e.target.value)
        keyw = e.target.value;
      } else {
        keyw = keyword;
      }
      if(term == 'location') {
        //setLocation(e.target.value)
        loc = e.target.value;
      } else {
        loc = location;
      } 
      setKeyword(keyw)
      setLocation(loc)
      if(keyw == "" && loc == "") {
        //window.location.href="/";
        setTimeout('window.location.href="/searchterm/'+keyw+'-'+loc+'"',1000);
      } else {
        setTimeout('window.location.href="/searchterm/'+keyw+'-'+loc+'"',1000);
      }
    }
  }

  useEffect(() => {
    if (loggedIn && authUser?.accounttype == 'contractor') {
      handleloginconjobs();
      handleloginconfeedjobs();
    } else {
      getallactivefeedjobs();
      //getallactivejobs();
      if (loggedIn) {
        getrecentsearches();
      } else {
        getrecentsearchespub();
      }
    }
    if (loggedIn) {
      getallrecentsearch();
    }
    getallglobalsearch();
  }, [loadJobs]);

  useEffect(() => {
    //alert(jobId);
  }, [jobId]);

  useEffect(() => {
    settabListing('rsearch');
    setjobtabActive('');
    setrsearchtabActive('active');
    //getallactivejobs();
    if (loggedIn) {
      getrecentsearches();
    } else {
      getrecentsearchespub();
    }
  }, []);

 


  return (
    <>
      <PublicLayout
        pageProps={{
          title: "Find contract jobs and recruit contractors on Dayratework",
        }}
        globalAccess={true}
      >
        <Box className={classes.root}>
          <div className="job-find">
            <div className={"job-find-box"}>
              <Typography component="h2">Find your next contract job</Typography>
              <Box className="search-box">
                <input
                  type={"search"}
                  value={keyword}
                  placeholder="Search jobs, keywords, companies"
                  onChange={(e) => setKeyword(e.target.value)}
                  onKeyUp={(e) => { handleKeyPress(e,keyword) }}                 
                  onInput={(e) => { handleSearch(e,'keyword') }}
                />

                <input
                  type={"search"}
                  value={location}
                  placeholder="Enter location"
                  onChange={(e) => setLocation(e.target.value)} 
                  onKeyUp={(e) => { handleKeyPress(e,keyword) }} 
                  onInput={(e) => { handleSearch(e,'location') }} 
                   />

                <IconButton aria-label="delete" onClick={() => {handlesearchalljobs(keyword)}}>
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
          </div>

          <Box className="job-list">
            <Box className={"list-tab"}>
              <Box className={"tab-item " + jobtabActive} onClick={(e) => {
                settabListing('feed');
                setjobtabActive('active');
                setrsearchtabActive('');
                getallactivefeedjobs();
              }}>Job Feed</Box>
              <Box className={"tab-item " + rsearchtabActive} onClick={(e) => {
                settabListing('rsearch');
                setrsearchtabActive('active');
                setjobtabActive('');
                if (loggedIn && authUser?.accounttype == 'contractor') {
                  handleloginconjobs();
                } else {
                  getallactivejobs();
                }
              }}>Recent Search</Box>
            </Box>
            <Grid container spacing={2.5}>
              <Grid item md={5} sm={12} xs={12}>
                {allactivefeedJobs && allactivefeedJobs.length > 0 && tabListing != "" && tabListing == 'feed' && (allactivefeedJobs ?? [])?.slice(0, 6)?.map((row: any) => (
                  <JobFeed
                    key={row?._id}
                    title={row.jobtitle}
                    sub_title={row?.jobtitle + ' in ' + row?.adlocation}
                    description={row.jobdescription}
                    companyName={row.companyname}
                    jobStatus={row.jobstatus}
                    jobType={row.jobtype.join(',')}
                    time={row.feedposteddate}
                    review={row.feedrating}
                    onClick={() => {
                      handlejobload?.(row._id);
                      if((document.body.clientWidth + 15) <= 899) {
                        setJobFeedDetailPopupOpen(true);
                      }
                    }}
                  />
                ))}
                {Array.isArray(allactiveJobs) && allactiveJobs.length > 0 && tabListing !== "" && tabListing === 'rsearch' && allactiveJobs.map((row: any) => (
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
                      handlejobload?.(row._id);

                      if((document.body.clientWidth + 15) <= 899) {
                        setJobFeedDetailPopupOpen(true);
                      }
                    }}
                  />
                ))}
                
              </Grid>
              <Grid item md={7} sm={12} xs={12}>
                <Box className={"job-feed-detail-container"}>
                  {allactivefeedJobs && allactivefeedJobs.length > 0 && tabListing != "" && tabListing == 'feed' && (
                    <JobDetails jobid={FeedJobId} />
                  )}
                  {Array.isArray(allactiveJobs) && allactiveJobs.length > 0 && tabListing == 'rsearch' && (
                    <JobDetails jobid={jobId} />
                  )}
                </Box>
              </Grid>
              { !Array.isArray(allactiveJobs) && (
                  <div style={{ textAlign: "center", width: "100%" }}>No Recent search available</div>
                )}
            </Grid>
          </Box>

          <Dialog
            open={jobFeedDetailPopupOpen}
            fullScreen={true}
            onClose={() => setJobFeedDetailPopupOpen(false)}
          >
            <Box className={classes.jobFeedDetailPopupBody}>
              <Box className={"dialog-header"}>
                <span className={"title"}>Job Details</span>
                <IconButton onClick={() => setJobFeedDetailPopupOpen(false)}>
                  <CloseIcon />
                </IconButton>
              </Box>
              <Box className={"dialog-body"}>
                {allactivefeedJobs && allactivefeedJobs.length > 0 && tabListing != "" && tabListing == 'feed' && (
                  <JobDetails jobid={FeedJobId} />
                )}
                {allactiveJobs && allactiveJobs.length > 0 && tabListing == 'rsearch' && (
                  <JobDetails jobid={jobId} />
                )}
              </Box>
            </Box>
          </Dialog>
        </Box>
      </PublicLayout>
    </>
  );
};

export default Home;
