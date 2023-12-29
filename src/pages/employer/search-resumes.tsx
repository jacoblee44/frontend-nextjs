import { AdminLayout } from "@/components/layouts";
import { useJobsStyles } from "@/static/stylesheets/jobsStyles";
import {
  alpha,
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  InputBase,
  styled,
  Typography,
  Collapse,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Switch, { SwitchProps } from "@mui/material/Switch";
import WorkIcon from "@mui/icons-material/Work";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/atoms/button";
import { CustomDivider } from "@/components/atoms/divider";
import UserIcon from "@/static/images/pictures/picture1.png";
import Image from "next/image";
import { TextInput } from "@/components/atoms/textInput";
import { SelectInput } from "@/components/atoms/select";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { useSearchResumeStyles } from "@/static/stylesheets/searchResumeStyles";
import { ResumeSearchModal } from "@/components/molecules/modal";
import { apiClient, endpoints } from "@/api";
import { count } from "console";

import { useAuthInfo } from "@/hooks/custom";

const SearchResumes = () => {
  const { userData } = useAuthInfo();

  if (userData?.accounttype == "contractor") {
    window.location.href = "/signup/employer";
  }
  const classes = useSearchResumeStyles();
  const [resopen, setResOpen] = useState(false);

  const [showopen, setshowOpen] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [location, setLocation] = useState("");
  const [checkedjtitle, setCheckedJtitle] = useState(false);
  const [checkedjskills, setCheckedJskills] = useState(false);
  const [checkedjcompany, setCheckedJcompany] = useState(false);
  const [checkedjfstudy, setCheckedJfstudy] = useState(false);
  const [allactiveresumes, setAllActiveResumes] = useState([]);
  const [loadResumes, setLoadResumes] = useState("");
  //const [allLastUpdatedResumes, setAllLastUpdatedResumes] = useState([]);
  const [updatedResumes, setUpdatedResumes] = useState([]);
  const [excontactedResumes, setexContactedResumes] = useState("");
  //const [jobTitles, setJobtitles] = useState([]);
  //const [company, setCompany] = useState([]);
  //const [experience, setExperience] = useState([]);
  //const [assessment, setAssessment] = useState([]);
  //const [military, setMilitary] = useState([]);
  //const [education, setEducation] = useState([]);
  const [alljobtitle, setAlljobtitle] = useState([]);
  const [allcompany, setAllcompany] = useState([]);
  const [allworkexperience, setAllworkexperience] = useState([]);
  const [almilitaryservice, setAllmilitaryservice] = useState([]);
  const [alleducation, setAlleducation] = useState([]);
  const [allassessment, setAllassessment] = useState([]);
  const [resumeid, setResumeid] = useState(0);
  const [Lopen, setLOpen] = useState(false);

  const handleClick = () => {
    setshowOpen(!showopen);
  };

  interface filttidata {
    filtertitle: string;
    filterdata: Array<any>;
  }

  let [allfiltertitledata, setAllfiltertitledata] = useState<filttidata[]>([]);

  interface UpdresList {
    id: string;
    value: string;
  }

  const updreslist: readonly UpdresList[] = [
    { value: "within last 6 months", id: "6" },
    { value: "within last 5 months", id: "5" },
    { value: "within last 4 months", id: "4" },
    { value: "within last 3 months", id: "3" },
    { value: "within last 2 months", id: "2" },
    { value: "within last 1 months", id: "1" },
  ];
  const [updResList, setUpdResList] = useState(updreslist);

  interface ExconList {
    id: string;
    value: string;
  }

  const exconlist: readonly ExconList[] = [
    { value: "within last 30 days", id: "30" },
    { value: "within last 15 days", id: "15" },
    { value: "within last 10 days", id: "10" },
  ];
  const [exconList, setExconList] = useState(exconlist);

  interface WexpList {
    id: string;
    value: string;
  }

  const wexplist: readonly WexpList[] = [
    { value: "6 - 10 years", id: "72,120" },
    { value: "More than 10 years", id: "121,1200" },
    { value: "3 - 5 years", id: "36,60" },
    { value: "1 - 2 years", id: "12,24" },
    { value: "Less than 1 year", id: "0,11" },
  ];
  const [wexpList, setWexpList] = useState(wexplist);

  const handlesearchallresumes1 = () => {
    //krecentsearch(keyword, location, "");
    window.location.href = "/employer/search-resumes";
  };

  const handlesearchallresumes = () => {
    krecentsearch(keyword, location, "");
  };

  const getallactiveresumes = () => {
    apiClient
      .post({
        url: endpoints.private.getallResumes,
      })
      .then((res) => {
        setAllActiveResumes(res?.data?.resume);
      })
      .catch(() => {
        setAllActiveResumes([]);
      });
  };

  const getalljobtitle = () => {
    apiClient
      .post({
        url: endpoints.private.getalldesiredJobtitle,
      })
      .then((res) => {
        console.log(JSON.stringify(res?.data?.jobtitle) + " job tiles");
        setAlljobtitle(res?.data?.jobtitle);
      })
      .catch(() => {
        setAlljobtitle([]);
      });
  };

  const getallcompany = () => {
    apiClient
      .post({
        url: endpoints.private.getallCompany,
      })
      .then((res) => {
        setAllcompany(res?.data?.company);
      })
      .catch(() => {
        setAllcompany([]);
      });
  };

  const getallworkexperience = () => {
    if (wexpList.length > 0) {
      let exparr: any = [];
      for (var ex = 0; ex < wexpList.length; ex++) {
        var wexplist1 = wexpList[ex].id;
        var wexplist2 = wexpList[ex].value;
        apiClient
          .post({
            url: endpoints.private.getallworkExperiencecount,
            data: {
              wexp: wexplist1,
              wexptitle: wexplist2,
            },
          })
          .then((res) => {
            var expcnt1 = res?.data?.workexperience;
            var expcnt2 = res?.data?.workexperiencetitle;
            if (parseInt(expcnt1[0].count) > 0) {
              var expcnt = expcnt1[0].count;
              let dura = "";
              if (expcnt2 == "More than 10 years") {
                dura = "121,1200";
              } else if (expcnt2 == "6 - 10 years") {
                dura = "72,120";
              } else if (expcnt2 == "3 - 5 years") {
                dura = "36,60";
              } else if (expcnt2 == "1 - 2 years") {
                dura = "12,24";
              } else if (expcnt2 == "Less than 1 year") {
                dura = "0,11";
              }

              exparr.push({
                value: expcnt2,
                duration: dura,
                id: expcnt1[0].count,
              });
              console.log(JSON.stringify(exparr) + " tester " + wexplist2);
            }
          })
          .catch(() => {
            //setAllworkexperience([]);
          });
        console.log(JSON.stringify(exparr) + " tester ");
        setAllworkexperience(exparr);
      }
      console.log(allworkexperience + " workexp");
    }
  };

  const getallmilitaryservice = () => {
    apiClient
      .post({
        url: endpoints.private.getallMilitary,
      })
      .then((res) => {
        console.log(JSON.stringify(res?.data?.military));
        setAllmilitaryservice(res?.data?.military);
      })
      .catch(() => {
        setAllmilitaryservice([]);
      });
  };

  const getalleducation = () => {
    apiClient
      .post({
        url: endpoints.private.getcountEducation,
      })
      .then((res) => {
        console.log(JSON.stringify(res?.data?.educount) + " all education");
        setAlleducation(res?.data?.educount);
      })
      .catch(() => {
        setAlleducation([]);
      });
  };

  const getallassessment = () => {
    apiClient
      .post({
        url: endpoints.private.getallAssessment,
      })
      .then((res) => {
        setAllassessment(res?.data?.assessment);
      })
      .catch(() => {
        setAllassessment([]);
      });
  };

  const krecentsearch = (kword: any, location: any, filtertitledata: any) => {
    //console.log('hello');
    //console.log(filtertitledata);
    if (kword != "" || location != "" || filtertitledata.length > 0) {
      apiClient
        .post({
          url: endpoints.private.searchResumes,
          data: {
            keyword: kword,
            location: location,
            data: [
              { searchtype: checkedjtitle },
              { searchtype: checkedjskills },
              { searchtype: checkedjcompany },
              { searchtype: checkedjfstudy },
            ],
            filtertitledata: filtertitledata,
          },
        })
        .then((res) => {
          //console.log(JSON.stringify(res?.data?.resumes));
          setAllActiveResumes(res?.data?.resumes);
        })
        .catch(() => {
          setAllActiveResumes([]);
        });
    } else if (kword == "" && location == "" && filtertitledata.length == 0) {
      getallactiveresumes();
    }
  };

  const checklastupdres = (updatedResumes: any) => {
    //allfiltertitledata.push({ "filtertitle": "Lastupdatedresume", "filterdata": updatedResumes });
    if (updatedResumes != "") {
      allfiltertitledata.push({
        filtertitle: "Lastupdatedresume",
        filterdata: updatedResumes,
      });
    } else {
      let tmpflter: any = [];
      for (var ti = 0; ti < allfiltertitledata.length; ti++) {
        if (
          allfiltertitledata[ti].filtertitle == "Lastupdatedresume" &&
          allfiltertitledata[ti].filterdata != updatedResumes
        ) {
          tmpflter.push(allfiltertitledata[ti]);
        }
      }
      allfiltertitledata = tmpflter;
    }
    setAllfiltertitledata(allfiltertitledata);
    krecentsearch(keyword, location, allfiltertitledata);
  };
  const checkexcontactedres = (excontactedResumes: any) => {
    //allfiltertitledata.push({ "filtertitle": "ExcludedCandidates", "filterdata": (excontactedResumes as any) });
    if (excontactedResumes != "") {
      allfiltertitledata.push({
        filtertitle: "ExcludedCandidates",
        filterdata: excontactedResumes,
      });
    } else {
      let tmpflter: any = [];
      for (var ti = 0; ti < allfiltertitledata.length; ti++) {
        if (
          allfiltertitledata[ti].filtertitle == "ExcludedCandidates" &&
          allfiltertitledata[ti].filterdata != excontactedResumes
        ) {
          tmpflter.push(allfiltertitledata[ti]);
        }
      }
      allfiltertitledata = tmpflter;
    }
    setAllfiltertitledata(allfiltertitledata);
    krecentsearch(keyword, location, allfiltertitledata);
  };

  const checkjobtitles = (jobTitles: any, checkVal: any) => {
    //allfiltertitledata.push({ "filtertitle": "Jobtitles", "filterdata": jobTitles });
    console.log(checkVal + " before");
    if (checkVal && checkVal != "") {
      allfiltertitledata.push({
        filtertitle: "Jobtitles",
        filterdata: jobTitles,
      });
    } else {
      let tmpflter: any = [];
      console.log(
        JSON.stringify(allfiltertitledata) +
          " inside before " +
          allfiltertitledata.length
      );
      for (var ti = 0; ti < allfiltertitledata.length; ti++) {
        console.log(allfiltertitledata[ti].filtertitle);
        if (allfiltertitledata[ti].filterdata != jobTitles) {
          //allfiltertitledata[ti].filtertitle == "Jobtitles" &&
          console.log(JSON.stringify(allfiltertitledata[ti]));
          tmpflter.push(allfiltertitledata[ti]);
        }
      }
      allfiltertitledata = tmpflter;
      console.log(JSON.stringify(allfiltertitledata) + " inside");
    }

    console.log(JSON.stringify(allfiltertitledata) + " after");
    setAllfiltertitledata(allfiltertitledata);
    krecentsearch(keyword, location, allfiltertitledata);
  };

  const checkcompany = (company: any, checkVal: any) => {
    //allfiltertitledata.push({ "filtertitle": "Company", "filterdata": company });
    if (checkVal && checkVal != "") {
      allfiltertitledata.push({ filtertitle: "Company", filterdata: company });
    } else {
      let tmpflter: any = [];
      for (var ti = 0; ti < allfiltertitledata.length; ti++) {
        if (allfiltertitledata[ti].filterdata != company) {
          //allfiltertitledata[ti].filtertitle=="Company" &&
          tmpflter.push(allfiltertitledata[ti]);
        }
      }
      allfiltertitledata = tmpflter;
    }
    //console.log(JSON.stringify(allfiltertitledata)+' after');
    setAllfiltertitledata(allfiltertitledata);
    krecentsearch(keyword, location, allfiltertitledata);
  };

  const checkexperience = (experience: any, checkVal: any) => {
    //allfiltertitledata.push({ "filtertitle": "Years of Experience", "filterdata": experience });
    if (checkVal && checkVal != "") {
      allfiltertitledata.push({
        filtertitle: "Years of Experience",
        filterdata: experience,
      });
    } else {
      let tmpflter: any = [];
      for (var ti = 0; ti < allfiltertitledata.length; ti++) {
        if (allfiltertitledata[ti].filterdata != experience) {
          //allfiltertitledata[ti].filtertitle == "Years of Experience" &&
          tmpflter.push(allfiltertitledata[ti]);
        }
      }
      allfiltertitledata = tmpflter;
    }
    setAllfiltertitledata(allfiltertitledata);
    krecentsearch(keyword, location, allfiltertitledata);
  };

  const checkassessment = (assessment: any, checkVal: any) => {
    //allfiltertitledata.push({ "filtertitle": "Assessment", "filterdata": assessment });
    if (checkVal && checkVal != "") {
      allfiltertitledata.push({
        filtertitle: "Assessment",
        filterdata: assessment,
      });
    } else {
      let tmpflter: any = [];
      for (var ti = 0; ti < allfiltertitledata.length; ti++) {
        if (allfiltertitledata[ti].filterdata != assessment) {
          //allfiltertitledata[ti].filtertitle == "Assessment" &&
          tmpflter.push(allfiltertitledata[ti]);
        }
      }
      allfiltertitledata = tmpflter;
    }
    setAllfiltertitledata(allfiltertitledata);
    krecentsearch(keyword, location, allfiltertitledata);
  };

  const checkmilitary = (military: any, checkVal: any) => {
    //allfiltertitledata.push({ "filtertitle": "Military", "filterdata": military });
    if (checkVal && checkVal != "") {
      allfiltertitledata.push({
        filtertitle: "Military",
        filterdata: military,
      });
    } else {
      let tmpflter: any = [];
      for (var ti = 0; ti < allfiltertitledata.length; ti++) {
        if (allfiltertitledata[ti].filterdata != military) {
          //allfiltertitledata[ti].filtertitle == "Military" &&
          tmpflter.push(allfiltertitledata[ti]);
        }
      }
      allfiltertitledata = tmpflter;
    }
    setAllfiltertitledata(allfiltertitledata);
    krecentsearch(keyword, location, allfiltertitledata);
  };

  const checkeducation = (education: any, checkVal: any) => {
    //allfiltertitledata.push({ "filtertitle": "Education", "filterdata": education });
    if (checkVal && checkVal != "") {
      allfiltertitledata.push({
        filtertitle: "Education",
        filterdata: education,
      });
    } else {
      let tmpflter: any = [];
      for (var ti = 0; ti < allfiltertitledata.length; ti++) {
        if (allfiltertitledata[ti].filterdata != education) {
          //allfiltertitledata[ti].filtertitle == "Education" &&
          tmpflter.push(allfiltertitledata[ti]);
        }
      }
      allfiltertitledata = tmpflter;
    }
    setAllfiltertitledata(allfiltertitledata);
    krecentsearch(keyword, location, allfiltertitledata);
  };

  const handleKeyPress = (e: any, keyword: any) => {
    //alert(e.keyCode);
    if (e.keyCode === 13) {
      handlesearchallresumes();
    }
  };

  /*function handleSearch(event) {
    if (event.target.value === '') {      
      if(keyword == "" && location == "") {
        handlesearchallresumes()
      } else {
        handlesearchallresumes()
      }
    }
  }*/

  function handleSearch(e: any, term: any) {
    let keyw = "";
    let loc = "";
    if (e.target.value === "") {
      if (term == "keyword") {
        //setKeyword(e.target.value)
        keyw = e.target.value;
      } else {
        keyw = keyword;
      }
      if (term == "location") {
        //setLocation(e.target.value)
        loc = e.target.value;
      } else {
        loc = location;
      }
      setKeyword(keyw);
      setLocation(loc);

      /*if(keyw == "" && loc == "") {
        window.location.href='/employer/search-resumes'
      } else {*/
      handlesearchallresumes();
      //}
    }
  }

  useEffect(() => {
    getallactiveresumes();
    getalljobtitle();
    getallcompany();
    getallworkexperience();
    getallmilitaryservice();
    getalleducation();
    getallassessment();
    //getallmilitaryservice();
    //getalllastupdatedresumes();
  }, [loadResumes]);

  return (
    <AdminLayout
      pageProps={{
        title: "Search resume",
      }}
    >
      <Box className={classes.root}>
        <Box className="search-box">
          <input
            type={"search"}
            value={keyword}
            placeholder="Search contractors"
            style={{ borderRight: "2px solid #6D5086" }}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyUp={(e) => {
              handleKeyPress(e, keyword);
            }}
            onInput={(e) => {
              handleSearch(e, "keyword");
            }}
          />
          <input
            type={"search"}
            value={location}
            placeholder="Enter location"
            onChange={(e) => setLocation(e.target.value)}
            onKeyUp={(e) => {
              handleKeyPress(e, keyword);
            }}
            onInput={(e) => {
              handleSearch(e, "location");
            }}
          />

          <IconButton
            aria-label="delete"
            onClick={(e) => {
              handlesearchallresumes1();
            }}
          >
            <SearchIcon />
            <span className={"label"}>Search Jobs</span>
          </IconButton>
        </Box>
        <Box className="limit-search">
          <Typography className={"limit-label"}>Limit search to:</Typography>
          <Box className={"search-limit-items"}>
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => {
                    setCheckedJtitle(true);
                    handlesearchallresumes;
                  }}
                  name="jtitle"
                />
              }
              label="Job Title"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => {
                    setCheckedJskills(true);
                    handlesearchallresumes();
                  }}
                  name="jskills"
                />
              }
              label="Skills"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => {
                    setCheckedJcompany(true);
                    handlesearchallresumes();
                  }}
                  name="jcompany"
                />
              }
              label="Companies"
            />
            <FormControlLabel
              control={
                <Checkbox
                  onChange={(e) => {
                    setCheckedJfstudy(true);
                    handlesearchallresumes();
                  }}
                  name="fstudy"
                />
              }
              label="Field of study"
            />
          </Box>
        </Box>
        <CustomDivider style={{ borderColor: "#dedede" }} />
        <Grid container spacing={3} mt={3}>
          <Grid item md={4} sm={4} xs={12}>
            <Box className="filter">
              <Typography component="h1">Filters</Typography>
              <CustomDivider style={{ borderColor: "#dedede" }} />
              <Box
                sx={{
                  marginTop: 2,
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
                    fontSize: { md: 20, sm: 18, xa: 16 },
                  }}
                >
                  Resume last updated <ReportGmailerrorredIcon />
                </Typography>
                <SelectInput
                  data={updResList}
                  value={updatedResumes}
                  onChange={(e) => {
                    setUpdatedResumes(e.target.value);
                    checklastupdres(e.target.value);
                  }}
                />
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
                    fontSize: { md: 20, sm: 18, xa: 16 },
                  }}
                >
                  Exclude contacted candidates <ReportGmailerrorredIcon />
                </Typography>
                <SelectInput
                  data={exconList}
                  value={excontactedResumes}
                  onChange={(e) => {
                    setexContactedResumes(e.target.value);
                    checkexcontactedres(e.target.value);
                  }}
                />
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
                    fontSize: { md: 20, sm: 18, xa: 16 },
                  }}
                >
                  Availability <ReportGmailerrorredIcon />
                </Typography>
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
                        //checked={false}
                        onChange={() => console.log("Hello")}
                        name="jason"
                      />
                    }
                    label="Ready to work now"
                  />
                  <Typography component="span">4161</Typography>
                </Box>
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
                    fontSize: { md: 20, sm: 18, xa: 16 },
                  }}
                >
                  Job Titles
                </Typography>
                <Collapse in={showopen}>
                  {alljobtitle &&
                    alljobtitle.length > 0 &&
                    alljobtitle.map((row: any) => (
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
                </Collapse>
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
                    fontSize: { md: 20, sm: 18, xa: 16 },
                  }}
                >
                  Company
                </Typography>
                <Collapse in={showopen}>
                  {allcompany &&
                    allcompany.length > 0 &&
                    allcompany.map((row: any) => (
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
                              value={row?.company}
                              onChange={(e) => {
                                //setCompany(row?.company);
                                checkcompany(row?.company, e.target.checked);
                              }}
                              name={row?.company}
                            />
                          }
                          label={row?.company}
                        />
                        <Typography component="span">{row?.count}</Typography>
                      </Box>
                    ))}
                </Collapse>
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
                    fontSize: { md: 20, sm: 18, xa: 16 },
                  }}
                >
                  Years of Work Experience
                </Typography>
                <Collapse in={showopen}>
                  {allworkexperience &&
                    allworkexperience.length > 0 &&
                    allworkexperience.map((row: any) => (
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
                              value={row?.duration}
                              onChange={(e) => {
                                //setExperience(row?.value);
                                checkexperience(
                                  row?.duration,
                                  e.target.checked
                                );
                              }}
                              name={row?.value}
                            />
                          }
                          label={row?.value}
                        />
                        <Typography component="span">{row?.id}</Typography>
                      </Box>
                    ))}
                </Collapse>
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
                    fontSize: { md: 20, sm: 18, xa: 16 },
                  }}
                >
                  Military Service
                </Typography>
                <Collapse in={showopen}>
                  {almilitaryservice &&
                    almilitaryservice.length > 0 &&
                    almilitaryservice.map((row: any) => (
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
                              value={row?.military}
                              onChange={(e) => {
                                //setMilitary(row?.military);
                                checkmilitary(row?.military, e.target.checked);
                              }}
                              name={row?.military}
                            />
                          }
                          label={row?.military}
                        />

                        <Typography component="span">{row?.count}</Typography>
                      </Box>
                    ))}
                </Collapse>
              </Box>
              <CustomDivider style={{ borderColor: "#00000040" }} />
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
                    fontSize: { md: 20, sm: 18, xa: 16 },
                  }}
                >
                  Education
                </Typography>
                <Collapse in={showopen}>
                  {alleducation &&
                    alleducation.length > 0 &&
                    alleducation.map((row: any) => (
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
                              value={row?.educount}
                              onChange={(e) => {
                                //setEducation(row?.educount);
                                checkeducation(row?.educount, e.target.checked);
                              }}
                              name={row?.educount}
                            />
                          }
                          label={row?.educount}
                        />
                        <Typography component="span">{row?.count}</Typography>
                      </Box>
                    ))}
                </Collapse>
              </Box>
              <CustomDivider style={{ borderColor: "#00000040" }} />
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
                    fontSize: { md: 20, sm: 18, xa: 16 },
                  }}
                >
                  Assessment
                </Typography>
                <Collapse in={showopen}>
                  {allassessment &&
                    allassessment.length > 0 &&
                    allassessment.map((row: any) => (
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
                              value={row?.assessment}
                              onChange={(e) => {
                                //setAssessment(row?.assessment);
                                checkassessment(
                                  row?.assessment,
                                  e.target.checked
                                );
                              }}
                              name={row?.assessment}
                            />
                          }
                          label={row?.assessment}
                        />
                        <Typography component="span">{row?.count}</Typography>
                      </Box>
                    ))}
                </Collapse>
              </Box>
              <CustomDivider style={{ borderColor: "#00000040" }} />
              <Typography
                component="h2"
                sx={{
                  color: "#5A5A5A",
                  fontSize: { ms: 24, sm: 18 },
                  marginTop: 2,
                  cursor: "pointer",
                }}
              >
                <a onClick={handleClick}>
                  {" "}
                  {showopen ? "Collapse" : "Show All"}{" "}
                </a>{" "}
                filters
              </Typography>
            </Box>
          </Grid>
          <Grid item md={8} sm={8} xs={12}>
            <Box className="result-box">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography sx={{ display: "flex", gap: 2, color: "#5A5A5A" }}>
                  <WorkIcon /> Get new resumes for this search by email
                </Typography>
                <Switch defaultChecked />
              </Box>
              <CustomDivider style={{ borderColor: "#00000040" }} />
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  color: "#5A5A5A",
                  margin: "30px 0",
                }}
              >
                <Typography>{allactiveresumes.length} resumes</Typography>
                <Typography>Sort by: relevance - most recent</Typography>
              </Box>

              <CustomDivider style={{ borderColor: "#00000040" }} />
              {allactiveresumes &&
                allactiveresumes.length > 0 &&
                allactiveresumes.map((row: any) => (
                  <>
                    <Box className="resume-box">
                      <Typography
                        component="h2"
                        onClick={(e) => {
                          setResumeid(row?._id);
                          setResOpen(!resopen);
                        }}
                      >
                        {" "}
                        {/* onClick={(e) => { setResumeid(row?._id); setResOpen(!resopen) }} */}
                        {row?.firstname + " " + row?.lastname}
                        <span>
                          {typeof row?.citystate !== "undefined" &&
                          row?.citystate !== ""
                            ? " - " + row?.citystate
                            : ``}
                        </span>
                      </Typography>
                      {row.workexperiences &&
                        row.workexperiences.length > 0 &&
                        row.workexperiences.map((row1: any) => (
                          <Typography component="h2">
                            {row1?.jobtitle} - <span>{row1?.company}</span>
                          </Typography>
                        ))}
                      {row.educations &&
                        row.educations.length > 0 &&
                        row.educations.map((row2: any) => (
                          <Typography component="h2">
                            {row2?.level} in {row2?.fieldofstudy} -{" "}
                            <span>{row2?.schoolnumber}</span>
                          </Typography>
                        ))}
                    </Box>
                    <CustomDivider style={{ borderColor: "#00000040" }} />
                  </>
                ))}
              {/*<Box className="resume-box">
                <Typography component="h2">
                  UX Designer- <span>Seattle WA</span>
                </Typography>
                <Typography component="h2">
                  UX Designer- <span>Forum One</span>
                </Typography>
                <Typography component="h2">
                  UX Designer-{" "}
                  <span>
                    Ruhlamat Automation Technologies (Suzhou) Co., Ltd
                  </span>
                </Typography>
                <Typography component="h2">
                  Master of Science - <span>University of Washington</span>
                </Typography>
              </Box>
              <CustomDivider style={{ borderColor: "#00000040" }} />
              <Box className="resume-box">
                <Typography component="h2">
                  UX Designer- <span>Seattle WA</span>
                </Typography>
                <Typography component="h2">
                  UX Designer- <span>Forum One</span>
                </Typography>
                <Typography component="h2">
                  UX Designer-{" "}
                  <span>
                    Ruhlamat Automation Technologies (Suzhou) Co., Ltd
                  </span>
                </Typography>
                <Typography component="h2">
                  Master of Science - <span>University of Washington</span>
                </Typography>
              </Box>
              <CustomDivider style={{ borderColor: "#00000040" }} />
              <Box className="resume-box">
                <Typography component="h2">
                  UX Designer- <span>Seattle WA</span>
                </Typography>
                <Typography component="h2">
                  UX Designer- <span>Forum One</span>
                </Typography>
                <Typography component="h2">
                  UX Designer-{" "}
                  <span>
                    Ruhlamat Automation Technologies (Suzhou) Co., Ltd
                  </span>
                </Typography>
                <Typography component="h2">
                  Master of Science - <span>University of Washington</span>
                </Typography>
              </Box>
              <CustomDivider style={{ borderColor: "#00000040" }} /> */}
            </Box>
          </Grid>
          {/*<Grid item md={4} sm={4} xs={12}>
            <Box className="trial-box">
              <Typography component="h2">
                Start your free Standard trial today
              </Typography>
              <Typography>
                View millions of global resumes for 14 days. Contact up to 20
                candidates.
              </Typography>
              <Button title="Get started" width="170px" />
              <Image src={UserIcon} alt="" />
            </Box>
          </Grid>*/}
        </Grid>
      </Box>
      <ResumeSearchModal
        resid={resumeid}
        open={resopen}
        handleClose={() => setResOpen(false)}
      />
    </AdminLayout>
  );
};

export default SearchResumes;
