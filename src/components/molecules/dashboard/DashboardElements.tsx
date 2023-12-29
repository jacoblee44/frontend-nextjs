import { useJobsStyles } from "@/static/stylesheets/jobsStyles";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/atoms/button";
import { CustomDivider } from "@/components/atoms/divider";
import MessageIcon from "@/static/images/pictures/messages.png";
import Image from "next/image";
import { SelectInput } from "@/components/atoms/select";
import ReportGmailerrorredIcon from "@mui/icons-material/ReportGmailerrorred";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from "next/router";
import { routePaths } from "@/config";
import { useAuthInfo } from "@/hooks/custom";
import { AuthService } from "@/services/auth";
import { useComponentState, useInput, useThrottle } from "@/hooks";
import { apiClient, endpoints } from "@/api";
import { useFormMethods } from "@/hooks/form";
import { textAlign } from "@mui/system";
import { convertToNumber } from '@/utils';
const DashboardElements = () => {
  const classes = useJobsStyles();
  const router = useRouter();

  const { userData: authUser } = useAuthInfo();
  const userid = authUser?._id;
  const adminactive = authUser?.adminactive;

  const { values, register, errors, hasError, clearErrors, setValue } = useFormMethods();
  const gotoCreateJob = async () => {
    new AuthService().getAuthUser(userid, (userData) => {
      if (userData?.companyname === undefined) {
        router.push(routePaths?.employer?.employerAccount);
      } else {
        router.push(routePaths?.employer?.postJob);
      }
    });
  };

  const gotoSearchResumes = async () => {
    await router.push(routePaths?.employer?.searchResume);
  };

  //const type = values['postType.type'], typeError = errors['postType.type'];
  //const jobTemplateId = values['postType.jobTemplateId'], jobTemplateIdError = errors['postType.jobTemplateId'];

  const {
    value: searchTemplateQuery,
    bind: bindSearchTemplateQuery,
  } = useInput("");

  interface cjobStatus {
    id: string;
    value: string;
  }

  const jobstatus: readonly cjobStatus[] = [
    { id: 'active', value: 'Open' },
    { id: 'pending', value: 'Paused' },
    { id: 'closed', value: 'Closed' },
  ];

  interface sortingJobLlist {
    id: string;
    value: string;
  }

  const sortingjob: readonly sortingJobLlist[] = [
    { id: 'jobtitle', value: 'jobtitle' },
    { id: 'startdate', value: 'startdate' }
  ];

  interface orderingJobLlist {
    id: string;
    value: string;
  }

  const orderingjob: readonly orderingJobLlist[] = [
    { id: 'desc', value: 'latest' },
    { id: 'asc', value: 'oldest' }
  ];

  const [jobStatus, setJobStatus] = useState(jobstatus);
  const [fltrStatus, setFltrStatus] = useState('active,pending');

  const [filtropenbtntype, setFiltrOpenBtntype] = useState('default');
  const [filtrclosebtntype, setFiltrcloseBtntype] = useState('border');

  const [fltrsort, setFltrSort] = useState('');
  const [fltrorder, setFltrOrder] = useState('');

  const today = new Date();
  var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const firstdate = new Date(today.getFullYear(), today.getMonth(), 1);
  const lastdate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const monthText = months[firstdate.getMonth()] + " " + firstdate.getDate() + " - " + lastdate.getDate();

  const searchQuery = useThrottle(searchTemplateQuery, 1000);
  const DATE_OPTIONS: any = { year: 'numeric', month: 'long', day: 'numeric' };
  const {
    state: {
      jobTemplates,
      jobTemplatesLoading,
      copyJobLoading,
    },
    setState,
  } = useComponentState({
    jobTemplates: [],
    jobTemplatesLoading: false,
    copyJobLoading: false,
  });

  const handleEditJob = (el: any) => {
    //console.log("el", el.currentTarget.getAttribute("data")); el.currentTarget.getAttribute("id")
    router.push(routePaths?.employer?.editJob + '/' + el);
  };

  const handlePaymentMethod = () => {
    //router.push(routePaths?.employer?.payment);
    new AuthService().getAuthUser(userid, (userData) => {
      if (userData?.companyname === undefined) {
        router.push(routePaths?.employer?.employerAccount);
      } else {
        router.push(routePaths?.employer?.payment);
      }
    });
  };

  const handleBillingHistory = () => {
    //router.push(routePaths?.employer?.payment);
    new AuthService().getAuthUser(userid, (userData) => {
      if (userData?.companyname === undefined) {
        router.push(routePaths?.employer?.employerAccount);
      } else {
        router.push(routePaths?.employer?.billingHistory);
      }
    });
  };

  const handleJobCard = (id: number) => {
    if (id) {
      router?.push(`/post/${id}`);
    }
  }

  const handleDeleteJob = (el: any) => {
    //el.currentTarget.getAttribute("id")
    apiClient.post({
      url: endpoints.private.deleteJob,
      data: {
        jobid: el
      }
    }).then((res) => {
      //router.push(routePaths?.employer?.dashboard);
      window.location.reload();
    }).catch(() => {
    });
  };
  const handlejobstatus = (val: any, id: any) => {
    apiClient.post({
      url: endpoints.private.updateJobstatus,
      data: {
        jobid: id, jobstatus: val
      }
    }).then((res) => {
      searchJobs();
      //router.push(routePaths?.employer?.dashboard);
    }).catch(() => {
    });
  };

  const handlesort = (val: any) => {
    setFltrSort(val);
    setFltrOrder('desc');
  };

  const handleorder = (val: any) => {
    setFltrSort('jobtitle');
    setFltrOrder(val);
  };

  const searchopenedJobs = () => {
    setState({jobTemplates: []});
    setFltrStatus('active,pending');
    setFiltrOpenBtntype("default");
    setFiltrcloseBtntype("border");
  };

  const searchclosedJobs = () => {
    setState({jobTemplates: []});
    setFltrStatus('closed');
    setFiltrOpenBtntype("border");
    setFiltrcloseBtntype("default");
  };
  const searchJobs = () => {
    setState({ jobTemplatesLoading: true });
    apiClient.post({
      url: endpoints.private.searchJobs,
      data: {
        keyword: searchQuery ?? "",
        userid: userid,
        jobstatus: fltrStatus,
        sort: fltrsort,
        order: fltrorder
      }
    }).then((res) => {
      setState({ jobTemplatesLoading: false });

      setState({
        jobTemplates: res?.data?.search,
      });
      //alert(JSON.stringify(res?.data?.search));
    }).catch(() => {
      setState({ jobTemplatesLoading: false });
      setState({
        jobTemplates: [],
      });
    });
  };

  const [todayBilling, setTodayBilling] = useState([]);
  const LoadTodayBilling = () => {
    apiClient.post({
      url: endpoints.private.getTodayBilling,
      data: { userid: userid }
    }).then((res) => {
      var JobCredit = res?.data?.jobcredits;
      var obj: any = {};
      if (JobCredit.length > 0) {
        for (var ji = 0; ji < JobCredit.length; ji++) {
          var tmpobj: any = JobCredit[ji];
          obj[tmpobj['_id']] = tmpobj['count'];
        }
        //alert(JSON.stringify(obj));
        setTodayBilling(obj);
      }
    }).catch(() => {
    });
  };

  const [monthBilling, setMonthBilling] = useState([]);
  const [monthTotal, setMonthTotal] = useState(0);
  const LoadMonthBilling = () => {
    apiClient.post({
      url: endpoints.private.getCurMonBilling,
      data: { userid: userid }
    }).then((res) => {
      var JobCredit = res?.data?.jobcredits;
      var obj: any = {};
      var tot: any = 0;
      if (JobCredit.length > 0) {
        for (var ji = 0; ji < JobCredit.length; ji++) {
          var tmpobj: any = JobCredit[ji];
          obj[tmpobj['_id']] = tmpobj['count'];
          tot += tmpobj['count'];
        }
        //alert(JSON.stringify(obj));
        setMonthBilling(obj);
        setMonthTotal(tot);
      }
    }).catch(() => {
    });
  };

  const [allJobsApply, setAllJobsApply] = useState([]);
  const [allJobsInterview, setAllJobsInterview] = useState([]);
  const [allJobsArchive, setAllJobsArchive] = useState([]);
  const [allJobsActive, setAllJobsActive] = useState([]);
  const LoadAllJobsApply = () => {
    apiClient.post({
      url: endpoints.private.getallJobsCountbyUser,
      data: { userid: userid }
    }).then((res) => {
      var JobCredit = res?.data?.jobcount;
      var objApply: any = {};
      var objInterview: any = {};
      var objArchive: any = {};
      var objActive: any = {};
      if (JobCredit.length > 0) {
        for (var ji = 0; ji < JobCredit.length; ji++) {
          var tmpobj: any = JobCredit[ji];
          if (tmpobj['status'] == "") {
            objApply[tmpobj['jobid']] = tmpobj['count'];
            objActive[tmpobj['jobid']] = tmpobj['count'];
          }
          if (tmpobj['status'] == "interview") {
            objInterview[tmpobj['jobid']] = tmpobj['count'];
            if (typeof objActive[tmpobj['jobid']] !== "undefined") {
              objActive[tmpobj['jobid']] += tmpobj['count'];
            } else {
              objActive[tmpobj['jobid']] = tmpobj['count'];
            }
          }
          if (tmpobj['status'] == "archived") {
            objArchive[tmpobj['jobid']] = tmpobj['count'];
          }
        }
        //alert(JSON.stringify(obj));
        setAllJobsApply(objApply);
        setAllJobsInterview(objInterview);
        setAllJobsArchive(objArchive);
        setAllJobsActive(objActive);
      }
    }).catch(() => {
    });
  };

  const [allJobsInvited, setAllJobsInvited] = useState([]);
  const LoadAllJobsInvited = () => {
    apiClient.post({
      url: endpoints.private.getallInvitedJobsCount,
      data: { userid: userid }
    }).then((res) => {
      var JobCredit = res?.data?.jobcount;
      var objApply: any = {};
      if (JobCredit.length > 0) {
        for (var ji = 0; ji < JobCredit.length; ji++) {
          var tmpobj: any = JobCredit[ji];
          objApply[tmpobj['_id']] = tmpobj['count'];
        }
        //alert(JSON.stringify(objApply));
        setAllJobsInvited(objApply);
      }
    }).catch(() => {
    });
  };

  useEffect(() => {
    searchJobs();
  }, [searchQuery, fltrStatus, fltrsort, fltrorder]); //onChange={() => console.log("Hello")}

  useEffect(() => {
    LoadTodayBilling();
    LoadMonthBilling();
    LoadAllJobsApply();
    LoadAllJobsInvited();
  }, [authUser]);

  return (
    <Box className={classes.root}>
      <Box className="box">
        <Box className="top-bar">
          <Typography component="h3">Jobs</Typography>
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            {/*<IconButton onClick={gotoSearchResumes}>
              <SearchIcon />
            </IconButton>*/}
            {adminactive === true && (
              <Button
                title="Post a job"
                onClick={gotoCreateJob}
                style={{ marginTop: 0 }}
                className={"post-a-job-button"}
              />
            )}
          </Box>
        </Box>
        <Box sx={{ display: "flex" }}>
          <Button
            title={`Open and paused jobs${fltrStatus === "active,pending" && !jobTemplatesLoading ? " (" + convertToNumber(jobTemplates?.length) + ")" : ""}`}
            btnType={filtropenbtntype}
            onClick={searchopenedJobs}
            style={{ borderRadius: "10px 0 0 10px" }}
            className={"tab-button"}
          />
          <Button
            title={`Closed jobs${fltrStatus === "closed" && !jobTemplatesLoading ? " (" + convertToNumber(jobTemplates?.length) + ")" : ""}`}
            btnType={filtrclosebtntype}
            onClick={searchclosedJobs}
            style={{ borderRadius: "0 10px 10px 0", marginLeft: "1px" }}
            className={"tab-button"}
          />
        </Box>

        <Box className="filter-box">
          {/*<Box
            className={"search-input"}
            sx={{
              width: 353,
              border: "1px solid #a6a6a6",
              borderRadius: "10px",
              height: 45,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "10px",

              "& input": {
                height: "100%",
                width: "100%",
                background: "transparent",
                border: "none",
                outline: 0,
                color: "#000000",
                fontSize: 15,
              },
            }}
          >
            <input
              type="search"
              {...bindSearchTemplateQuery}
              placeholder="Search job titles or locations..."
            />

            <IconButton>
              <SearchIcon />
            </IconButton>
          </Box>*/}
          <Box className="filter">
            <SelectInput
              className={"filter-dropdown"}
              data={sortingjob}
              label="Sort by:"
              value={fltrsort}
              onChange={(e) => {
                e.target.value;
                handlesort(e.target.value);
              }}
            />
            <SelectInput
              className={"filter-dropdown"}
              data={orderingjob}
              label="Order:"
              value={fltrorder}
              onChange={(e) => {
                e.target.value;
                handleorder(e.target.value);
              }}
            />
          </Box>
        </Box>
        {jobTemplates && jobTemplates.length <= 0 &&
          <Box sx={{ textAlign: "center", color: "#2d2d2d", fontWeight: "bold", margin: "40px 0" }}> No jobs
            Available </Box>
        }
        {jobTemplates && jobTemplates.length > 0 && jobTemplates.map((row: any) => (
          <Box className="item-box" key={row?._id}>
            <Box className="single-item" >
              <Box
                sx={{ width: { md: 270, sm: 190, xs: 300 } }}
                className="title"
              >
                <Typography component="h2" onClick={()=>{handleJobCard(row?._id);}}>{row?.jobtitle}</Typography>
                <Typography component="h4">{row?.companyname}</Typography>
                <Typography>
                  {row?.startdate && (
                    <span>
                      Created: <span>{new Date(row?.createddate.split('T')[0]).toLocaleDateString('en-US', DATE_OPTIONS)}</span>
                      <br /> *Ends: <span>{(row?.deadlinedate) ? new Date(row?.deadlinedate.split('T')[0]).toLocaleDateString('en-US', DATE_OPTIONS) : ""}</span>
                    </span>
                  )}
                </Typography>
              </Box>
              {/* <Box>
                <Typography
                  sx={{ color: "#000000", textAlign: "center" }}>{(typeof allJobsActive[row?._id] !== "undefined") ? (allJobsActive[row?._id]) : '0'} Active</Typography>
              </Box> */}
              <Box className={"summary-cards-container"}>
                <Box
                  className="summary-box"
                  sx={{
                    height: 60,
                    padding: "5px 12px",
                    color: "#ffffff",
                  }}
                >
                  <Typography sx={{textAlign: "center", fontWeight: 500, fontSize: 13}}>
                    {(typeof allJobsApply[row?._id] !== "undefined") ? (allJobsApply[row?._id]) : '0'} <br /> New
                  </Typography>
                </Box>
                <Box
                  className="summary-box"
                  sx={{
                    height: 60,
                    padding: "5px 12px",
                    color: "#ffffff",
                  }}
                >
                  <Typography sx={{textAlign: "center", fontWeight: 500, fontSize: 13}}>
                    {(typeof allJobsApply[row?._id] !== "undefined") ? (allJobsApply[row?._id]) : '0'} <br /> Accept
                  </Typography>
                </Box>
                <Box
                  className="summary-box"
                  sx={{
                    height: 60,
                    padding: "5px 12px",
                    color: "#ffffff",
                  }}
                >
                  <Typography sx={{textAlign: "center", fontWeight: 500, fontSize: 13}}>
                    {(typeof allJobsApply[row?._id] !== "undefined") ? (allJobsApply[row?._id]) : '0'} <br /> Decline
                  </Typography>
                </Box>
              </Box>
              <Box className={"summary-cards-container"}>
                {/* <Box
                  className="summary-box"
                  sx={{
                    height: 60,
                    padding: "5px 12px",
                    color: "#ffffff",
                  }}
                >
                  <Typography sx={{textAlign: "center", fontWeight: 500, fontSize: 13}}>
                    {(typeof allJobsApply[row?._id] !== "undefined") ? (allJobsApply[row?._id]) : '0'} <br /> New
                  </Typography>
                  <Typography sx={{textAlign: "center", fontWeight: 500, fontSize: 13}}>
                    {(typeof allJobsInterview[row?._id] !== "undefined") ? (allJobsInterview[row?._id]) : '0'}
                    <br /> Contracting
                  </Typography>
                </Box> */}
                <Box className="invite-box" sx={{ height: 60, padding: "5px 12px", color: "#ffffff" }}>
                  <Typography sx={{textAlign: "center", fontWeight: 500, fontSize: 13}}>
                    {(typeof allJobsInvited[row?._id] !== "undefined") ? (allJobsInvited[row?._id]) : '0'} <br />{" "}
                    <span style={{ display: "flex", alignItems: "center", gap: 2 }}>
                      Invited <ReportGmailerrorredIcon />
                    </span>
                  </Typography>
                </Box>
              </Box>
              <Box className="founded">
                <Typography component="h4">Funded</Typography>
                <span className={"fund-item"}>{(typeof monthBilling[row?._id] !== "undefined") ? (monthBilling[row?._id] * 0.99) : '0.00'} (GBP)
                  Total cost</span><br />
                <span className={"fund-item"}>{(typeof todayBilling[row?._id] !== "undefined") ? (todayBilling[row?._id] * 0.99) : '0.00'} (GBP)
                  Daily</span>
              </Box>
              <Box className="status" sx={{ "& .css-1gmvpva": { marginTop: 0 } }}>
                <SelectInput
                  data={jobStatus}
                  value={row?.jobstatus}
                  label="Job Status"
                  onChange={(e) => {
                    handlejobstatus(e.target.value, row?._id);
                  }}
                />
              </Box>
              <Box className="action" sx={{ display: "flex" }}>
                <IconButton size={"small"} onClick={() => {
                  handleEditJob?.(row?._id);
                }}><EditIcon /></IconButton>
                <IconButton size={"small"} onClick={() => {
                  handleDeleteJob?.(row?._id);
                }}><DeleteIcon /></IconButton>
                {/*<MoreHorizIcon />*/}
              </Box>
            </Box>
          </Box>
        ))}

        <Grid container spacing={3} mt={2}>
          <Grid item md={6} sm={6} xs={12}>
            <Box className="message-box">
              <Typography component="h2">Messages (0)</Typography>
              <CustomDivider style={{ border: "1px solid #6D5086" }} />
              <Box className="message">
                <Box className="no-message">
                  <Image src={MessageIcon} alt="Message" />
                  <Typography component="h3">
                    No messages to review!
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          <Grid item md={6} sm={6} xs={12}>
            <Box className="billing-box">
              <Typography component="h2">
                Job post billing{" "}
                <span style={{ fontSize: "14px", cursor: "pointer" }}>
                  View FAQs
                </span>
              </Typography>
              <CustomDivider style={{ border: "1px solid #6D5086" }} />
              <Grid container spacing={2}>
                <Grid item md={6} sm={6} xs={12}>
                  <Box className="text-bar">
                    <Typography component="span">Total</Typography>
                    <Typography component="h2">{monthTotal * 0.99} (GBP)</Typography>
                    <Typography>For {monthText}</Typography>
                  </Box>
                </Grid>
                <Grid item md={6} sm={6} xs={12}>
                  <Box className="button-group">
                    <Button className={"card-button"} title="Billing history" onClick={handleBillingHistory} />
                    <Button className={"card-button"} title="Payment method" onClick={handlePaymentMethod} />
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export { DashboardElements };
