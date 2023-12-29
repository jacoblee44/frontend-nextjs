import { Button } from "@/components/atoms/button";
import { ReviewCard } from "@/components/layouts";
import deleteIcon from "@/static/images/icons/ic_delete.png";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState, ChangeEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import { TextInput } from "@/components/atoms/textInput";
import { CustomDivider } from "@/components/atoms/divider";
import { LeftIconBox, RightIconBox } from "@/components/atoms/textWithIcon";
import { useJobTypeFormStyles } from "@/static/stylesheets/resume/jobTypeFormStyles";
import { SelectInput } from "@/components/atoms/select";
import HomeIcon from "@/static/images/pictures/relocate.png";
import { useRouter } from "next/router";
import { routePaths } from "@/config";
import { apiClient, endpoints } from "@/api";
import { useFormMethods } from "@/hooks/form";
import { useAuthInfo } from "@/hooks/custom";

interface JobTypeFormProps {
  onClickPrev?(): void;
  onClickNext?(): void;
}

const period_list = [
  { id: "Weekly", value: "Weekly" },
  { id: "Monthly", value: "Monthly" },
  { id: "Yearly", value: "Yearly" },
];

const JobTypeForm: React.FC<JobTypeFormProps> = (props) => {
  const classes = useJobTypeFormStyles();
  const { userData } = useAuthInfo();
  const router = useRouter();
  const { bindInput, values, register, setValue, errors, hasError, clearErrors } = useFormMethods();
  const userId = userData?._id;
  let resumeId = (typeof values['resumeId'] !== "undefined") ? values['resumeId'] : 0;  
  let desId = (typeof values['desId'] !== "undefined") ? values['desId'] : 0;

  interface JobType {
    value: string;
    selected: boolean;
  }
  interface JobSchedule {
    value: string;
    selected: boolean;
  }

  let jobtypeall: readonly JobType[] = [];
  const [jobType, setJobType] = useState(jobtypeall);

  let jobscheduleall: readonly JobSchedule[] = [];
  const [jobSchedule, setJobSchedule] = useState(jobscheduleall);

  const [dataloaded, setDataLoaded] = useState(false);
  const [typeloaded, setTypeLoaded] = useState(false);
  const [scheduleloaded, setScheduleLoaded] = useState(false);
  
  const jobtitle = (typeof values['desiredjob.jobtitle'] != undefined) ? values['desiredjob.jobtitle']:'';
  const relocation = (typeof values['desiredjob.relocation'] != undefined) ? values['desiredjob.relocation']:false;
  const pay = (typeof values['desiredjob.pay'] != undefined) ? values['desiredjob.pay']:'';
  const paydura = (typeof values['desiredjob.paydura'] != undefined) ? values['desiredjob.paydura']:'';
  const jobtypes = (typeof values['desiredjob.jobtypes'] != undefined) ? values['desiredjob.jobtypes']:[]; 
  const jobschedules = (typeof values['desiredjob.jobschedules'] != undefined) ? values['desiredjob.jobschedules']:[];
  
  const [saveLoading, setSaveLoading] = useState(false);

  const handleClickNext = () => {
    if (hasError()) {      
      alert(JSON.stringify(errors))
      return;
    }

    let jobtypesel = [];
    for(var jd = 0; jd < jobType.length; jd++){
      if(jobType[jd].selected){ jobtypesel.push(jobType[jd].value); }   
    }

    let jobschedulesel = [];
    for(var jd = 0; jd < jobSchedule.length; jd++){
      if(jobSchedule[jd].selected){ jobschedulesel.push(jobSchedule[jd].value); }   
    }

    let data: { [key: string]: any } = {
      jobtitle,
      relocation,
    };
    data.desiredpayfrom = pay;
    data.desiredpayperiod = paydura;
    data.jobtype = jobtypesel;
    data.jobschedule = jobschedulesel;
    data.resid = resumeId;

    if (desId > 0) {
      data.djobid = desId;
    } else {
      data.userid = userId;
    }    
    setSaveLoading(true);
    apiClient.post({
      url: (desId > 0) ? endpoints.private.updateDesiredJob : endpoints.private.createDesiredJob,
      data,
    }).then((res) => {
      setSaveLoading(false);
      /*if (props?.onClickNext) {
        clearErrors();
        props?.onClickNext();
      }*/
      gotoResumeReadyPage();
    }).catch(() => {
      setSaveLoading(false);
    });
  };

  const listjobType = async () => {
    await apiClient.get({
      url: endpoints.private.getalljobtype
    }).then((res) => {
      if (res?.data) {
        const jobtypeData = res?.data?.jobtypes;
        let jobtypenew = [];
        for(var jd = 0; jd < jobtypeData.length; jd++){
          jobtypenew.push({"value":jobtypeData[jd].jobtype, "selected":false})
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
        for(var jd = 0; jd < jobscheduleData.length; jd++){
          jobschedulenew.push({"value":jobscheduleData[jd].jobsched, "selected":false})
        }
        setJobSchedule(jobschedulenew); 
        setScheduleLoaded(true);
      }
    }).catch(() => {
    });
  }; 

  const loaddesiredData = async () => { 
    if(resumeId > 0){ 
      await apiClient.post({
        url: endpoints.private.getDesiredJob,
        data: {
          resid:resumeId,
        }
      }).then((res) => {
        if (res?.data) {
          const djobData = res?.data?.djobdata;
          setValue("desiredjob.jobtitle", djobData.jobtitle);
          setValue("desiredjob.relocation", djobData.relocation);
          setValue("desiredjob.pay", djobData.desiredpayfrom);
          setValue("desiredjob.paydura", djobData.desiredpayperiod);

          setValue("desiredjob.jobtypes", djobData.jobtype);
          setValue("desiredjob.jobschedules", djobData.jobschedule);

          if (!desId) {
            setValue("desId", djobData._id);
          }
          setDataLoaded(true);
        }
      }).catch((error) => {
      });
    }
  }

  const loadjobTypes = () => {
    if(typeof jobtypes !== "undefined" && dataloaded && typeloaded){
      var jobArr = jobtypes;
      if(jobArr.length > 0) {
      let jobtypenew1: JobType[] = [];
      var flasecnt=0;
      //alert(JSON.stringify(jobType));
      for(var jd = 0; jd < jobType.length; jd++){
        if(!jobType[jd].selected) flasecnt++;
        if(jobArr.includes(jobType[jd].value)){
          jobtypenew1.push({"value":jobType[jd].value, "selected": true});
        } else {
          jobtypenew1.push({"value":jobType[jd].value, "selected": false});
        } 
      }      
      if(flasecnt == jobType.length) {
        setJobType(jobtypenew1); 
        //alert(JSON.stringify(jobtypenew1)); 
        clearInterval(typeinterval);
      }
      }
    }
  }
  var typeinterval = setInterval(loadjobTypes, 1000);

  const loadjobSchedules = () => {
    if(typeof jobschedules !== "undefined" && dataloaded && scheduleloaded){
      var jobArr = jobschedules;
      if(jobArr.length > 0) {
      let jobschednew1 = [];
      var flasecnt=0;
      //alert(JSON.stringify(jobType));
      for(var jd = 0; jd < jobSchedule.length; jd++){
        if(!jobSchedule[jd].selected) flasecnt++;
        if(jobArr.includes(jobSchedule[jd].value)){
          jobschednew1.push({"value":jobSchedule[jd].value, "selected": true});
        } else {
          jobschednew1.push({"value":jobSchedule[jd].value, "selected": false});
        } 
      }      
      if(flasecnt == jobSchedule.length) {
        setJobSchedule(jobschednew1); 
        clearInterval(schedinterval);
      }
      }
    }
  }
  var schedinterval = setInterval(loadjobSchedules, 1000);

  useEffect(() => {
    if(resumeId > 0){
      loaddesiredData();
    }  
    setValue("workexperience.jobtitle", "nil");
    clearErrors();
  }, [resumeId]);

  useEffect(() => {
    listjobType();
    listjobSchedule();    
  }, []);

  const gotoResumeReadyPage = async () => {
    await router.push(routePaths.resumeReady);
  }
  return (
    <Box className={classes.root}>
      <Box className="box">
        <Typography component="h2">
          What kind of job are you looking for?
        </Typography>
        <Typography component="span">
          Employers searching for candidates may see your job preferences when
          your resume is set to public.
        </Typography>

        <TextInput label="Desired job title"
          type={'text'}
          value={jobtitle}
          onChange={(e) => {setValue("desiredjob.jobtitle", e.target.value)}}
        />

        <Typography component="h3">Relocation</Typography>
        <Box className="desired">          
          <Box className="relocate">
            <FormControlLabel
              control={
                <Checkbox
                  checked={!!relocation}
                  onClick={() => setValue("desiredjob.relocation", !relocation)}
                />
              }
              label="I am willing to relocate"
            />
            <Image alt="" src={HomeIcon} />
          </Box>
        </Box>

        <Typography component="h3">Desired pay</Typography>
        <Box className="desired">          
          <Grid container spacing={5}>
            <Grid item md={6} sm={12} xs={12} style={{paddingTop:10}}>
              <TextInput
                type="number"
                label="From($)"
                onChange={(e) => setValue("desiredjob.pay", e.target.value)}
                value={pay}
              />
            </Grid>
            <Grid item md={6} sm={12} xs={12} style={{paddingTop:5}}>
              <SelectInput
                data={period_list}
                label="Pay Period"
                onChange={(e) => setValue("desiredjob.paydura", e.target.value)}
                value={paydura}
              />
            </Grid>
          </Grid>
        </Box>

        <Typography component="h3">Desired job type</Typography>
        <Box className="desire-type">
          {jobType && jobType.length > 0 && jobType.map((row: any, index) => (
            <FormControlLabel key={row?.value}
              control={
                <Checkbox checked={row?.selected} onChange={() => {
                  let newArr = [...jobType];
                  newArr[index] = {"value":row?.value, "selected":(row?.selected) ? false : true};
                  setJobType(newArr);
                }} />
              }
              label={row?.value}
            />
          ))}
        </Box>

        <Typography component="h3">Desired job schedule</Typography>
        <Box className="desired-pay">
          {jobSchedule && jobSchedule.length > 0 && jobSchedule.map((row: any, index) => (
            <FormControlLabel key={row?.value}
              control={
                <Checkbox checked={row?.selected} onChange={() => {
                  let newArr = [...jobSchedule];
                  newArr[index] = {"value":row?.value, "selected":(row?.selected) ? false : true};
                  setJobSchedule(newArr);
                }} />
              }
              label={row?.value}
            />
          ))}
        </Box>

        {/*<SelectInput data={period_list} onChange={() => console.log("Hello")} />
        <SelectInput data={period_list} onChange={() => console.log("Hello")} /> gotoResumeReadyPage */}
        <Box className="bottom">
          <Button onClick={handleClickNext} title="Save" height="60px" loading={saveLoading} />
        </Box>
      </Box>
    </Box>
  );
};

export { JobTypeForm };
