import React, { useEffect, useState, ChangeEvent } from "react";
//import { useHomeStyles } from "@/static/stylesheets";
import { useSearchJobStyles } from "@/static/stylesheets/searchjobStyles";
import {
  alpha,
  Box,
  Checkbox, Dialog,
  FormControlLabel,
  Grid,
  IconButton,
  InputBase,
  styled,
  Typography,
} from "@mui/material";
import CachedIcon from "@mui/icons-material/Cached";
import SearchIcon from "@mui/icons-material/Search";
import deleteIcon from "@/static/images/icons/delete.png";
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
import { useRouter } from "next/router";
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@/components/atoms/button";
import { getNumberOfArrayItems } from "@/utils";
import { format } from 'date-fns';

const Proplist = () => {
  //const classes = useHomeStyles();
  const classes = useSearchJobStyles();
  const router = useRouter();

  interface SalaryList {
    id: string;
    value: string;
  }

  const jobsalarylist: readonly SalaryList[] = [
    { id: '1000 - 5000', value: '1000 - 5000' },
    { id: '5001 - 10000', value: '5001 - 10000' },
    { id: '10001 - 15000', value: '10001 - 15000' },
    { id: '15001 - 20000', value: '15001 - 20000' },
    { id: '20001 - 25000', value: '20001 - 25000' },
  ]
  const [jobsalarylists, setJobSalaryList] = useState(jobsalarylist);

  const Keyword1: any = (typeof router?.query?.term !== "undefined") ? router?.query?.term : '';
  var keywordloc = Keyword1.split('-');
  const [keyword, setKeyword] = useState(keywordloc[0]);
  const [location, setLocation] = useState(keywordloc[1]);
  const [allactiveJobs, setAllActiveJobs] = useState([]);
  const [alljobtitle, setAlljobtitle] = useState([]);
  const [allcompany, setAllcompany] = useState([]);
  const [jobTitles, setJobtitles] = useState([]);
  const [Salary, setSalary] = useState([]);
  const [loadJobs, setLoadJobs] = useState('');

  const [company, setCompany] = useState([]);
  const [experience, setExperience] = useState([]);
  const [jobId, setJobId] = useState(0);
  const [mobileFilterDialogOpen, setMobileFilterDialogOpen] = useState(false);
  const { userData: authUser } = useAuthInfo();
  var userid = authUser?._id;
  const { loggedIn } = useAppSelector(selectAuthState);

  interface filttidata {
    filtertitle: string;
    filterdata: Array<any>;
  }

  let [allfiltertitledata, setAllfiltertitledata] = useState<filttidata[]>([]);

  const getalljobtitle = () => {
    apiClient.post({
      url: endpoints.private.getallJobtitle,
    }).then((res) => {
      console.log(JSON.stringify(res?.data?.jobtitle));
      setAlljobtitle(res?.data?.jobtitle);
    }).catch(() => {
      setAlljobtitle([]);
    });
  }

  const getallcompany = () => {
    apiClient.post({
      url: endpoints.private.getallJobcompany,
    }).then((res) => {
      console.log(JSON.stringify(res?.data?.company));
      setAllcompany(res?.data?.company);
      console.log(allcompany)
    }).catch(() => {
      setAllcompany([]);
    });
  }

  /*const krecentsearch = () => {
    //if(keyword == "" && location == "") {
      //window.location.href="/";
   // } else {
      console.log(allfiltertitledata);
      apiClient.post({
        url: endpoints.public.searchallJobs,
        data: {
          keyword: keyword,
          location: location,
          userid: userid,
          filtertitledata: allfiltertitledata,
        }
      }).then((res) => {
        console.log(JSON.stringify(res)+' res print');
        console.log(JSON.stringify(res?.data?.search)+' no jobs available print');
        if(JSON.stringify(res?.data?.search) == 'No jobs Available') {
          setAllActiveJobs([]);
        } else {          
          //console.log(JSON.stringify(res?.data?.search)+' jobs available');
          setAllActiveJobs(res?.data?.search);
          setJobId(res?.data?.search[0]._id);
        }
        console.log(JSON.stringify(allactiveJobs)+' outside')
      }).catch((res) => {
        console.log(res);
        setAllActiveJobs(res?.data?.search);
      });
      //}
    //}
  }*/

  /*const checkjobtitles = (jobTitles: any) => {
    const index = allfiltertitledata?.findIndex(i => i?.filterdata === jobTitles);
    if(index > -1) {
      allfiltertitledata?.splice(index, 1);
    } else {
      allfiltertitledata.push({ "filtertitle": "Jobtitles", "filterdata": jobTitles });
    }
    setAllfiltertitledata(allfiltertitledata);
    krecentsearch();
  }

  const checkcompany = (company: any) => {
    const index = allfiltertitledata?.findIndex(i => i?.filterdata === company);
    if(index > -1) {
      allfiltertitledata?.splice(index, 1);
    } else {
      allfiltertitledata.push({ "filtertitle": "Company", "filterdata": company });
    }

    setAllfiltertitledata(allfiltertitledata);
    krecentsearch();
  }*/

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

  const krecentsearch = (kword: any, location: any, filtertitledata: any) => {
    console.log(kword+'/'+location+'/'+filtertitledata);
    console.log(JSON.stringify(filtertitledata)+' with filter data');
    ///if (kword != "" || location != "" || filtertitledata.length > 0) {
      apiClient.post({
        url: endpoints.public.searchallJobs,
        data: {
          keyword: kword,
          location: location,
          filtertitledata: filtertitledata,
        }
      }).then((res) => {
        //console.log(JSON.stringify(res)+' res print');
        console.log(JSON.stringify(res?.data?.search)+' no jobs available print');
        if(JSON.stringify(res?.data?.search) == 'No jobs Available') {
          setAllActiveJobs([]);
        } else {          
          //console.log(JSON.stringify(res?.data?.search)+' jobs available');
          setAllActiveJobs(res?.data?.search);
          setJobId(res?.data?.search[0]._id);
        }
        //console.log(JSON.stringify(allactiveJobs)+' outside')
      }).catch((res) => {
        console.log(res);
        setAllActiveJobs(res?.data?.search);
      });
    //} else if(kword == "" && location == "" && filtertitledata.length == 0){
     // getallactivejobs();      
    //}
  }

  const checkjobtitles = (jobTitles:any,checkVal:any) => {
    //allfiltertitledata.push({ "filtertitle": "Jobtitles", "filterdata": jobTitles });
    if(checkVal && checkVal != ""){
      allfiltertitledata.push({ "filtertitle": "Jobtitles", "filterdata": jobTitles });
    } else {
      let tmpflter:any = [];
      for(var ti=0; ti<allfiltertitledata.length; ti++){
        if(allfiltertitledata[ti].filtertitle == "Jobtitles" && allfiltertitledata[ti].filterdata != jobTitles){
          tmpflter.push(allfiltertitledata[ti]);
        }
      }
      allfiltertitledata = tmpflter;      
    }
    
    console.log(JSON.stringify(allfiltertitledata)+' after');
    setAllfiltertitledata(allfiltertitledata);
    krecentsearch(keyword, location, allfiltertitledata);
  }

  const checkcompany = (company:any,checkVal:any) => {
    //allfiltertitledata.push({ "filtertitle": "Company", "filterdata": company });
    if(checkVal && checkVal != ""){
      allfiltertitledata.push({ "filtertitle": "Company", "filterdata": company });
    } else {
      let tmpflter:any = [];
      for(var ti=0; ti<allfiltertitledata.length; ti++){
        if(allfiltertitledata[ti].filtertitle=="Company" && allfiltertitledata[ti].filterdata != company){
          tmpflter.push(allfiltertitledata[ti]);
        }
      }
      allfiltertitledata = tmpflter;
    }
    //console.log(JSON.stringify(allfiltertitledata)+' after');
    setAllfiltertitledata(allfiltertitledata);
    krecentsearch(keyword, location, allfiltertitledata);
  }

  const checksalary = (Salary: any,checkVal:any) => {
    if(checkVal && checkVal != ""){
      allfiltertitledata.push({ "filtertitle": "Salary", "filterdata": Salary });
    } else {
      let tmpflter:any = [];
      for(var ti=0; ti<allfiltertitledata.length; ti++){
        if(allfiltertitledata[ti].filtertitle=="Salary" && allfiltertitledata[ti].filterdata != Salary){
          tmpflter.push(allfiltertitledata[ti]);
        }
      }
      allfiltertitledata = tmpflter;
    }
    /*const index = allfiltertitledata?.findIndex(i => i?.filterdata === Salary);
    if(index > -1) {
      allfiltertitledata?.splice(index, 1);
    } else {
      allfiltertitledata.push({ "filtertitle": "Salary", "filterdata": Salary });
    }*/
    setAllfiltertitledata(allfiltertitledata);
    krecentsearch(keyword, location, allfiltertitledata);
  }

  const handleClickJobCard = (id: number) => {
    if (id) {
      router?.push(`/job/${id}?ref=search`);
    }
  };

  const handleKeyPress = (e:any,keyword:any) => {
    //alert(e.keyCode);
    if (e.keyCode === 13) {
      krecentsearch(keyword, location, allfiltertitledata);
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
    getalljobtitle();
    getallcompany();
    krecentsearch(keyword, location, allfiltertitledata);    
  }, [Keyword1]);

  const FilterElements = () => (
    <>
      <Box
        sx={{
          marginTop: 3,
          "& .css-1gmvpva": { marginTop: 0 },
          "& select": {
            borderColor: "#5A5A5A !important",
            color: "#5A5A5A !important",
          },
        }}
      >
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { md: 2, sm: 1 },
            color: "#5A5A5A",
            fontSize: { md: 14, sm: 18, xa: 16 },
            fontWeight: 500,
            marginBottom: "5px",
          }}
        >
          Job Titles
        </Typography>
        {alljobtitle && alljobtitle.length > 0 && (getNumberOfArrayItems(alljobtitle, 0, 4)).map((row: any) => (
          /*<Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "#5A5A5A",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  value={row?.jobtitle}
                  size={"small"}
                  checked={allfiltertitledata?.findIndex(i => i?.filterdata === row?.id) > -1}
                  onClick={(e) => {
                    setJobtitles(row?.id);
                    checkjobtitles(row?.id);
                  }}
                  name={row?.jobtitle}
                />
              }
              label={<div className={"filter-item-label"}>{row?.jobtitle?.toString()?.toLowerCase()}</div>}
            />
            <div className={"filter-item-count"}>{row?.count}</div>
            </Box> */
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "#5A5A5A",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value={row?.jobtitle}
                    onChange={(e) => {
                      //setJobtitles(row?.jobtitle);
                      checkjobtitles(row?.jobtitle, e.target.checked);
                    }}
                    name={row?.jobtitle}
                  />
                }
                label={row?.jobtitle}
              />
              <Typography component="span">{row?.count}</Typography>
            </Box>
        ))}
      </Box>

      <Box
        sx={{
          marginTop: 3,
          "& .css-1gmvpva": { marginTop: 0 },
          "& select": {
            borderColor: "#5A5A5A !important",
            color: "#5A5A5A !important",
          },
        }}
      >
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { md: 2, sm: 1 },
            color: "#5A5A5A",
            fontSize: { md: 14, sm: 18, xa: 16 },
            fontWeight: 500,
            marginBottom: "5px",
          }}
        >
          Company
        </Typography>
        {allcompany && allcompany.length > 0 && getNumberOfArrayItems(allcompany, 0, 4).map((rows: any) => (
          /*<Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "#5A5A5A",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  value={rows?.company}
                  checked={allfiltertitledata?.findIndex(i => i?.filterdata === rows?.id) > -1}
                  onClick={(e) => {
                    setCompany(rows?.id);
                    checkcompany(rows?.id)
                  }}
                  name={rows?.company}
                />
              }
              label={<div className={"filter-item-label"}>{rows?.companyname?.toString()?.toLowerCase()}</div>}
            />
            <div className={"filter-item-count"}>{rows?.count}</div>
          </Box>*/
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "#5A5A5A",
              }}
            >
              
              <FormControlLabel
                control={
                  <Checkbox
                    value={rows?.companyname}
                    onChange={(e) => {
                      //setCompany(rows?.company);
                      checkcompany(rows?.companyname, e.target.checked);
                    }}
                    name={rows?.companyname}
                  />
                }
                label={rows?.companyname}
              />
              <Typography component="span">{rows?.count}</Typography>
            </Box>
        ))}
      </Box>
      <Box
        sx={{
          marginTop: 3,
          "& .css-1gmvpva": { marginTop: 0 },
          "& select": {
            borderColor: "#5A5A5A !important",
            color: "#5A5A5A !important",
          },
        }}
      >
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            gap: { md: 2, sm: 1 },
            color: "#5A5A5A",
            fontSize: { md: 14, sm: 18, xa: 16 },
            fontWeight: 500,
            marginBottom: "5px",
          }}
        >
          Salary
        </Typography>

        {jobsalarylists && jobsalarylists.length > 0 && getNumberOfArrayItems(jobsalarylists as any[], 0, 4).map((srow: any) => (
          /*<Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              color: "#5A5A5A",
            }}
          >
            <FormControlLabel
              control={
                <Checkbox
                  value={srow?.value}
                  checked={allfiltertitledata?.findIndex(i => i?.filterdata === srow?.id) > -1}
                  onClick={(e) => {
                    setSalary(srow?.value);
                    checksalary(srow?.value)
                  }}
                  name={srow?.value}
                />
              }
              label={<div className={"filter-item-label"}>{srow?.value?.toString()?.toLowerCase()}</div>}
            />
          </Box>*/
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                color: "#5A5A5A",
              }}
            >
              <FormControlLabel
                control={
                  <Checkbox
                    value={srow?.value}
                    onChange={(e) => {
                      //setCompany(row?.company);
                      checksalary(srow?.value, e.target.checked);
                    }}
                    name={srow?.value}
                  />
                }
                label={srow?.value}
              />
              {/* <Typography component="span">{row?.count}</Typography> */}
            </Box>
        ))}
      </Box>
    </>
  );

  return (
    <>
      <PublicLayout
        pageProps={{
          title: "Home",
        }}
        globalAccess={true}
      >
        <Box className={classes.root}>
          
          <div className={"content-container-wrapper"}>
            <div className={"content-container"}>
              <Grid container spacing={3} mt={3}>
                
                <Grid
                  item
                  lg={8}
                  md={8}
                  sm={8}
                  xs={12}
                >
                  <Box className="job-list">
                    <Grid container spacing={5}>
                      <Grid item md={12} sm={12} xs={12}>

                      {Array.isArray(allactiveJobs) && allactiveJobs.length > 0 ? (
                        allactiveJobs.map((row: any) => (
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
                        ))
                      ) : (
                        <div style={{ textAlign: 'center' }}>No Jobs Available</div>
                      )}
                      </Grid>
                    </Grid>
                  </Box>
                </Grid>
              </Grid>
            </div>
          </div>
        </Box>

        {/* <Dialog
          open={mobileFilterDialogOpen}
          onClose={() => setMobileFilterDialogOpen(false)}
          fullScreen={true}
        >
          <Box className={classes.mobileFilterPopupBody}>
            <Box className={"dialog-header"}>
              <span className={"title"}>
                <FilterAltIcon />
                Filter
              </span>
              <IconButton onClick={() => setMobileFilterDialogOpen(false)}>
                <CloseIcon />
              </IconButton>
            </Box>
            <Box className={"dialog-body"}>
              <FilterElements />
            </Box>
            <Box className={"dialog-footer"}>
              <Button
                title={"OK"}
                onClick={() => setMobileFilterDialogOpen(false)}
              />
            </Box>
          </Box>
        </Dialog> */}
      </PublicLayout>
    </>
  );
};

export default Proplist;
