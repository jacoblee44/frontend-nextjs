import { Button } from "@/components/atoms/button";
import { JobPostBanner } from "@/components/layouts";
import { useJObPostTypeStyles } from "@/static/stylesheets/employee-job/jobPostTypeStyles";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  Typography,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import React, { useEffect, useState, ChangeEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import { TextInput } from "@/components/atoms/textInput";
import { useJobDetailsStyles } from "@/static/stylesheets/employee-job/employeeJobDetailsStyles";
import { ChipBox } from "@/components/atoms/chip";
import { SelectInput } from "@/components/atoms/select";
import { useJobPostForm } from "@/hooks/custom";
import { apiClient, endpoints } from "@/api";
import { useFormMethods } from "@/hooks/form";
import { FormError } from "@/components/organisms/form-error";
import RemoveIcon from '@mui/icons-material/Remove';

interface EmployeeJobDetailsProps {
  onClickPrev?(): void;

  onClickNext?(): void;

  jobid: number;
}

interface JobType {
  value: string;
  selected: boolean;
}

interface JobSchedule {
  value: string;
  selected: boolean;
}

interface PplHires {
  id: string;
  value: string;
}

interface QuickHires {
  id: string;
  value: string;
}

interface ConPeriod {
  id: string;
  value: string;
}

export const EmployeeJobDetails: React.FC<EmployeeJobDetailsProps> = (props) => {

  const classes = useJobDetailsStyles();
  const { bindInput, values, register, unregister, setValue, resetValue, errors, hasError, clearErrors } = useFormMethods();

  let jobtypeall: readonly JobType[] = [];
  const [jobType, setJobType] = useState(jobtypeall);

  let jobscheduleall: readonly JobSchedule[] = [];
  const [jobSchedule, setJobSchedule] = useState(jobscheduleall);


  const [dataloaded, setDataLoaded] = useState(false);
  const [typeloaded, setTypeLoaded] = useState(false);
  const [scheduleloaded, setScheduleLoaded] = useState(false);

  let jobpplhire:any = [];
  for(let i=1; i<=100; i++){
    jobpplhire.push({id:i,value:i});
  }

  /*const jobpplhire: readonly PplHires[] = [
    { id: '5 - 10', value: '5 - 10' },
    { id: '10 - 25', value: '10 - 25' },
    { id: '25 - 50', value: '25 - 50' },
    { id: '50 - 75', value: '50 - 75' },
    { id: '75 - 100', value: '75 - 100' },
  ]*/
  const [jbpplhire, setJbPplhire] = useState(jobpplhire);

  const jobquickhire: readonly QuickHires[] = [
    { id: '1 -2 days', value: '1 - 2 days' },
    { id: '2 - 5 days', value: '2 - 5 days' },
    { id: '5 - 10 days', value: '5 - 10 days' },
  ]
  const [jbquickhire, setJbQuickhire] = useState(jobquickhire);

  const jobconperiod: readonly ConPeriod[] = [
    { id: 'months', value: 'months' },
    { id: 'years', value: 'years' },
  ]
  const [jbconperiod, setJbConperiod] = useState(jobconperiod);
  /*const {
    formState: { root, employeeJobDetails },
    hasError,
    errors,
    setEmployeeJobDetailsForm,
    setError,
  } = useJobPostForm();*/

  //let jobId = values['jobId'];
  let jobId = props?.jobid ? props?.jobid : values['jobId'];
  const jobtypes = (typeof values['jobdetails.jobtypes'] != undefined) ? values['jobdetails.jobtypes'] : '',
    jobtypesError = (typeof errors['jobdetails.jobtypes'] != undefined) ? errors['jobdetails.jobtypes'] : '';
  const jobschedules = (typeof values['jobdetails.jobschedules'] != undefined) ? values['jobdetails.jobschedules'] : '',
    jobschedulesError = (typeof errors['jobdetails.jobschedules'] != undefined) ? errors['jobdetails.jobschedules'] : '';
  const contractlength = (typeof values['jobdetails.contractlength'] != undefined) ? values['jobdetails.contractlength'] : '',
    contractlengthError = (typeof errors['jobdetails.contractlength'] != undefined) ? errors['jobdetails.contractlength'] : '';
  const contractperiod = (typeof values['jobdetails.contractperiod'] != undefined) ? values['jobdetails.contractperiod'] : '',
    contractperiodError = (typeof errors['jobdetails.contractperiod'] != undefined) ? errors['jobdetails.contractperiod'] : '';
  const startdate = (typeof values['jobdetails.startdate'] != undefined) ? values['jobdetails.startdate'] : '',
    startdateError = (typeof errors['jobdetails.startdate'] != undefined) ? errors['jobdetails.startdate'] : '';
  const hirenumofpeople = (typeof values['jobdetails.hirenumofpeople'] != undefined) ? values['jobdetails.hirenumofpeople'] : '',
    hirenumofpeopleError = (typeof errors['jobdetails.hirenumofpeople'] != undefined) ? errors['jobdetails.hirenumofpeople'] : '';
  const hiringspeed = (typeof values['jobdetails.hiringspeed'] != undefined) ? values['jobdetails.hiringspeed'] : '',
    hiringspeedError = (typeof errors['jobdetails.hiringspeed'] != undefined) ? errors['jobdetails.hiringspeed'] : '';
  const plannedstartdate = (typeof values['jobdetails.plannedstartdate'] != undefined) ? values['jobdetails.plannedstartdate'] : '',
    plannedstartdateError = (typeof errors['jobdetails.plannedstartdate'] != undefined) ? errors['jobdetails.plannedstartdate'] : '';
  /* useEffect(() => {
     setEmployeeJobDetailsForm("job_type", jobType);
   }, [jobType]);

   useEffect(() => {
     setError(
       "employeeJobDetails.job_title",
       employeeJobDetails?.job_title == "" ? "Please type job title" : false
     );
   }, [employeeJobDetails?.job_title]);*/

  const handleSelectJobType = (selectedItem: any) => {
    let jobtypenew = [];
    let jobtypestr = "";

    for (let jd = 0; jd < jobType.length; jd++) {
      if (jobType[jd].value == selectedItem) {
        jobtypenew.push({ "value": jobType[jd].value, "selected": (!jobType[jd].selected) })
        if (!jobType[jd].selected) {
          if (jobtypestr != "") {
            jobtypestr += ",";
          }
          jobtypestr += jobType[jd].value;
        }
      } else {
        jobtypenew.push({ "value": jobType[jd].value, "selected": jobType[jd].selected })
        if (jobType[jd].selected) {
          if (jobtypestr != "") {
            jobtypestr += ",";
          }
          jobtypestr += jobType[jd].value;
        }
      }
    }
    setJobType(jobtypenew);
    setValue("jobdetails.jobtypes", jobtypestr);
  };

  const handleSelectJobSchedule = (selectedItem: any) => {
    let jobschedulenew = [];
    let jobschedulestr = "";
    for (var jd = 0; jd < jobSchedule.length; jd++) {
      if (jobSchedule[jd].value == selectedItem) {
        jobschedulenew.push({ "value": jobSchedule[jd].value, "selected": (!jobSchedule[jd].selected) ? true : false })
        if (!jobSchedule[jd].selected) {
          if (jobschedulestr != "") {
            jobschedulestr += ",";
          }
          jobschedulestr += jobschedulenew[jd].value;
        }
      } else {
        jobschedulenew.push({ "value": jobSchedule[jd].value, "selected": jobSchedule[jd].selected })
        if (jobSchedule[jd].selected) {
          if (jobschedulestr != "") {
            jobschedulestr += ",";
          }
          jobschedulestr += jobschedulenew[jd].value;
        }
      }
    }
    setJobSchedule(jobschedulenew);
    setValue("jobdetails.jobschedules", jobschedulestr);
  };

  const createOrUpdateJob = () => {
    let jobtypesel = [];
    for (var jd = 0; jd < jobType.length; jd++) {
      if (jobType[jd].selected) {
        jobtypesel.push(jobType[jd].value);
      }
    }

    let jobschedulesel = [];
    for (var jd = 0; jd < jobSchedule.length; jd++) {
      if (jobSchedule[jd].selected) {
        jobschedulesel.push(jobSchedule[jd].value);
      }
    }

    let data: { [key: string]: any } = {
      jobtype: jobtypesel,
      jobschedule: jobschedulesel,
      contractlength: contractlength,
      contractperiod: contractperiod,
      startdate: startdate,
      hirenumofpeople: hirenumofpeople,
      hiringspeed: hiringspeed,
    };
    if (jobId) {
      data.jobid = jobId;
    }
    //setState({ jobSaveLoading: true });
    apiClient.post({
      url: endpoints.private.updateJob,
      data,
    }).then((res) => {
      //setState({ jobSaveLoading: false });
      if (res) {
      }
      if (props?.onClickNext) {
        clearErrors();
        props?.onClickNext();
      }
    }).catch(() => {
      //setState({ jobSaveLoading: false });
    });
  };

  const handleClickNext = () => {
    if (hasError()) {
      return;
    }
    createOrUpdateJob();
  };

  const handleClickBack = () => { 
    unregister("jobdetails.jobtypes");
    unregister("jobdetails.jobschedules");
    unregister("jobdetails.contractlength");
    unregister("jobdetails.contractperiod");
    unregister("jobdetails.plannedstartdate");
    unregister("jobdetails.startdate");
    unregister("jobdetails.hirenumofpeople");
    unregister("jobdetails.hiringspeed");
    
    if (props?.onClickPrev) {
      clearErrors();
      props?.onClickPrev();
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      register("jobdetails.jobtypes", {
        required: "Please select job types!",
      });
      register("jobdetails.jobschedules", {
        required: "Please select job schedules!",
      });
      register("jobdetails.contractlength", {
        required: "Please select contract length!",
      });
      register("jobdetails.contractperiod", {
        required: "Please select contract period!",
      });
      register("jobdetails.plannedstartdate", {
        required: "Please select planned start date!",
      });

      register("jobdetails.startdate", {
        validate(value: any): string | true {
          if (plannedstartdate === "yes" && (!value || value?.trim() === "")) {
            return "Please enter the date to start!";
          }
          return true;
        }
      });

      register("jobdetails.hirenumofpeople", {
        required: "Please select number of people to hire!",
      });
      register("jobdetails.hiringspeed", {
        required: "Please select speed to hire the people!",
      });
    }, 3000)
    return () => clearTimeout(timeout)
  }, [hirenumofpeople,hiringspeed]);

  const listjobType = async () => {
    await apiClient.get({
      url: endpoints.private.getalljobtype
    }).then((res) => {
      if (res?.data) {
        const jobtypeData = res?.data?.jobtypes;
        let jobtypenew = [];
        for (var jd = 0; jd < jobtypeData.length; jd++) {
          jobtypenew.push({ "value": jobtypeData[jd].jobtype, "selected": false })
        }
        setJobType(jobtypenew);
        setTypeLoaded(true);
      }
    }).catch(() => {
    });
  };

  const listjobSchedule = async () => {
    await apiClient.get({
      url: endpoints.private.getalljobschedule
    }).then((res) => {
      if (res?.data) {
        const jobscheduleData = res?.data?.jobschedules;
        let jobschedulenew = [];
        for (var jd = 0; jd < jobscheduleData.length; jd++) {
          jobschedulenew.push({ "value": jobscheduleData[jd].jobsched, "selected": false })
        }
        setJobSchedule(jobschedulenew);
        setScheduleLoaded(true);
      }
    }).catch(() => {
    });
  };

  const loadjobData = async () => {
    jobId = props?.jobid ? props?.jobid : values['jobId'];
    if (jobId) {
      await apiClient.post({
        url: endpoints.private.getJob,
        data: {
          jobid: jobId,
        }
      }).then((res) => {
        if (res?.data) {
          const jobData = res?.data?.job;
          setValue("jobdetails.jobtypes", jobData.jobtype.join(','));
          setValue("jobdetails.jobschedules", jobData.jobschedule.join(','));
          let stdte = "";
          if (jobData.startdate) {
            stdte = jobData.startdate.split('T')[0];
          }
          setValue("jobdetails.contractlength", jobData.contractlength);
          setValue("jobdetails.contractperiod", jobData.contractperiod);
          if (stdte != "") {
            setValue("jobdetails.plannedstartdate", "yes");
            setValue("jobdetails.startdate", stdte);
          } else {
            setValue("jobdetails.plannedstartdate", "no");
            setValue("jobdetails.startdate", "");
          }
          setValue("jobdetails.hirenumofpeople", jobData.hirenumofpeople);
          setValue("jobdetails.hiringspeed", jobData.hiringspeed);
          setDataLoaded(true);
        }
      }).catch(() => {
      });
    }
  }

  const loadjobTypes = () => {
    if (typeof jobtypes !== "undefined" && dataloaded && typeloaded) {
      console.log('load job types');
      var jobArr = values["jobdetails.jobtypes"].split(',');
      if (jobArr.length > 0) {
        let jobtypenew1: JobType[] = [];
        var flasecnt = 0;
        //alert(JSON.stringify(jobType));
        for (var jd = 0; jd < jobType.length; jd++) {
          if (!jobType[jd].selected) flasecnt++;
          if (jobArr.includes(jobType[jd].value)) {
            jobtypenew1.push({ "value": jobType[jd].value, "selected": true });
          } else {
            jobtypenew1.push({ "value": jobType[jd].value, "selected": false });
          }
        }
        if (flasecnt == jobType.length) {
          setJobType(jobtypenew1);
          //alert(JSON.stringify(jobtypenew1));
          //clearInterval(typeinterval);
        }
      }
    }
  }
  /*var typeinterval = setInterval(loadjobTypes, 1000);*/

  const loadjobSchedules = () => {
    if (typeof jobschedules !== "undefined" && dataloaded && scheduleloaded) {
      var jobArr = values["jobdetails.jobschedules"].split(',');
      if (jobArr.length > 0) {
        let jobschednew1 = [];
        var flasecnt = 0;
        //alert(JSON.stringify(jobType));
        for (var jd = 0; jd < jobSchedule.length; jd++) {
          if (!jobSchedule[jd].selected) flasecnt++;
          if (jobArr.includes(jobSchedule[jd].value)) {
            jobschednew1.push({ "value": jobSchedule[jd].value, "selected": true });
          } else {
            jobschednew1.push({ "value": jobSchedule[jd].value, "selected": false });
          }
        }
        if (flasecnt == jobSchedule.length) {
          setJobSchedule(jobschednew1);
         // clearInterval(schedinterval);
        }
      }
    }
  }
  /*var schedinterval = setInterval(loadjobSchedules, 1000);*/

  useEffect(() => {
    listjobType();
    listjobSchedule();
  }, []);

  useEffect(() => {
    loadjobData();
  }, [jobId]);

  useEffect(() => {
    loadjobTypes();
    loadjobSchedules();
  }, [jobtypes, jobschedules, dataloaded, typeloaded,scheduleloaded]);


  return (
    <Box className={classes.root}>
      <JobPostBanner title="Include details" />
      <Box className="box">
        <Typography component="h2">
          What is the job type? <span style={{ color: "red" }}>*</span>
        </Typography>
         <Box className="chip">
          {jobType && jobType.length > 0 && jobType.map((row: any) => (
            <ChipBox
              key={row?.value}
              label={row?.value}
              selectType={(item) => handleSelectJobType(item)}
              icon={row?.selected ? <RemoveIcon /> : <AddIcon />}
              selected={row?.selected}
            />
          ))}
        </Box>
        {jobtypesError && (
          <Box sx={{ marginTop: "5px" }}>
            <FormError show={true} title={jobtypesError} />
          </Box>
        )}
      </Box>
      <Box className="box">
        <Typography component="h2">
          What is the schedule for this job?{" "}
          <span style={{ color: "red" }}>*</span>
        </Typography>
        <Box className="chip">
          {jobSchedule && jobSchedule.length > 0 && jobSchedule.map((row: any) => (
            <ChipBox label={row?.value} key={row?.value} selectType={(item) => handleSelectJobSchedule(item)}
                     icon={<AddIcon />} selected={row?.selected} />
          ))}
        </Box>
        {jobschedulesError && (
          <Box sx={{ marginTop: "5px" }}>
            <FormError show={jobschedulesError} title={jobschedulesError} />
          </Box>
        )}

        <Typography component="h2" style={{ paddingTop: "20px" }}>
          How long is the contract? <span style={{ color: "red" }}>*</span>
        </Typography>
        <Grid container spacing={0}>
          <Grid item xs={12} sm={12} md={6}>
            {/*<Grid container spacing={2}>
              <Grid item xs={12} sm={12} md={6}>
                <TextInput
                  label="Length"
                  value={values['jobdetails.contractlength']}
                  onChange={(e) => {
                    setValue("jobdetails.contractlength", e.target.value)
                  }}
                  type="text"
                  containerStyle={{ paddingBottom: 0 }}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <SelectInput
                  data={jbconperiod}
                  value={values['jobdetails.contractperiod']}
                  onChange={(e) => {
                    setValue("jobdetails.contractperiod", e.target.value)
                  }}
                  label="Period"
                  wrapperStyle={{ marginTop: "-5px", display: "block" }}
                  selectStyle={{ height: "43px" }}
                />
              </Grid>
                </Grid>*/}

            <Box sx={{
              display: "flex",
              alignItems: "center",
            }}>
              <TextInput
                label="Length"
                value={values['jobdetails.contractlength'] || ''}
                onChange={(e) => {
                  setValue("jobdetails.contractlength", e.target.value)
                }}
                type="text"
                containerStyle={{ paddingBottom: 0 }}
              />
              <SelectInput
                data={jbconperiod}
                value={values['jobdetails.contractperiod']}
                onChange={(e) => {
                  setValue("jobdetails.contractperiod", e.target.value)
                }}
                label="Period"
                wrapperStyle={{ marginTop: "-2px", display: "block" }}
                selectStyle={{height: "42px"}}
              />
            </Box>
          </Grid>
          <Grid item md={6}></Grid>
        </Grid>
        <FormError
          show={contractperiodError || contractlengthError}
          title={contractperiodError || contractlengthError}
        />

        <Typography component="h2" style={{ paddingTop: "20px" }}>
          Is there a planned start date for this job?{" "}
          <span style={{ color: "red" }}>*</span>
        </Typography>

        <Box className="radio-box">
          <FormControlLabel
            value="yes"
            control={<Radio />}
            label="Yes"
            onClick={() => setValue("jobdetails.plannedstartdate", "yes")}
            checked={values['jobdetails.plannedstartdate'] === "yes"}
          />
        </Box>
        <Box className="radio-box">
          <FormControlLabel
            value="no"
            control={<Radio />}
            label="No"
            onClick={() => setValue("jobdetails.plannedstartdate", "no")}
            checked={values['jobdetails.plannedstartdate'] === "no"}
          />
        </Box>
        <FormError show={plannedstartdateError} title={plannedstartdateError} />
        {values['jobdetails.plannedstartdate'] === "yes" && (
          <Grid container spacing={5}>
            <Grid item md={5}>
              <TextInput onChange={(e) => {
                setValue("jobdetails.startdate", e.target.value)
              }} value={values['jobdetails.startdate']} type="date" />
            </Grid>
          </Grid>
        )}
        {startdateError && (
          <Box sx={{ marginTop: "5px" }}>
            <FormError show={startdateError} title={startdateError} />
          </Box>
        )}
      </Box>
      <Box className="box">
        <Box className="text-box" style={{ marginTop: 0 }}>
          <Typography component="h2">
            How many people do you want to hire for this opening?
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <Typography>
            The more openings you have, the more applications you’ll need.
          </Typography>
          <SelectInput data={jbpplhire} value={values['jobdetails.hirenumofpeople']} onChange={(e) => {
            setValue("jobdetails.hirenumofpeople", e.target.value)
          }} />
          {hirenumofpeopleError && (
            <Box sx={{ marginTop: "5px" }}>
              <FormError show={hirenumofpeopleError} title={hirenumofpeopleError} />
            </Box>
          )}
        </Box>
        <Box className="text-box">
          <Typography component="h2">
            How quickly do you need to hire?
            <span style={{ color: "red" }}>*</span>
          </Typography>
          <Typography>
            If you need someone fast, you may need higher visibility.
          </Typography>
          <SelectInput data={jbquickhire} value={values['jobdetails.hiringspeed']} onChange={(e) => {
            setValue("jobdetails.hiringspeed", e.target.value)
          }} />
          {hiringspeedError && (
            <Box sx={{ marginTop: "5px" }}>
              <FormError show={hiringspeedError} title={hiringspeedError} />
            </Box>
          )}
        </Box>
      </Box>

      <Box className="bottom">
        <Button
          onClick={handleClickBack}
          title="< Back"
          width="170px"
          height="60px"
          btnType="border"
          sx={{
            marginTop: "0 !important",

            "& button": {
              height: "50px !important",
              width: "130px !important"
            }
          }}
        />

        <Button
          onClick={handleClickNext}
          title="Continue"
          width="170px"
          height="60px"
          sx={{
            marginTop: "0 !important",

            "& button": {
              height: "50px !important",
              width: "130px !important"
            }
          }}
        />
      </Box>
    </Box>
  );
};
