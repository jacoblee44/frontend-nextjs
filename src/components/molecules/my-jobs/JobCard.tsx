import React from 'react';
import { useJobCardStyles } from "@/static/stylesheets/employee/jobCardStyles";
import { Box, IconButton, Typography } from '@mui/material';
import defaultPic from '@/static/images/pictures/picture3.png';
import Image from 'next/image'
import CloseIcon from '@mui/icons-material/Close';
import { Button } from "@/components/atoms/button";
import { CustomDivider } from "@/components/atoms/divider";
import { useRouter } from "next/router";


interface JobCardProps {
  type?: string;
  job_title?: string;
  jobid?: any;
  company_name?: string;
  time_period?: string;
  profession?: string;
  feeddomain?: string;
  feedjoburl?: string;
  feedurl?: string;
  onClick?(): void;
  onDelete?(): void;
  image?: string;
}
const JobCard: React.FC<JobCardProps> = (props) => {
  const classes = useJobCardStyles();
  const router = useRouter();
  var createdStr = props?.type;   
  var tmpstr:any = props?.time_period;
  var created = tmpstr.split('T')[0];

  var today:any = new Date().toISOString().slice(0, 10);        
  var dtStart:any = new Date(today);

  if(today == created){
    createdStr += " Today";
  } else {
    var dtEnd:any = new Date(created);
    var diffInMs:any  = dtStart - dtEnd;
    var diffInDays = diffInMs / (1000 * 60 * 60 * 24);
    createdStr += " "+diffInDays+" days ago";
  }

  const handleExternalApplyClick = (jurl:any, url:any) => {
    if(jurl != ""){
      window.open(jurl);
    } else {      
      window.open(url);
    }
  }

  const handleJobs = (jobid: any) => {
    if(!jobid) {
      router?.push(`/job/${jobid}`);
    }
  }

  return (
    <Box className={classes.root} >
      <Box className={"card"}>
        <Box sx={{width: 120}}>
          <Image height={90} width={90} src={defaultPic} alt={"demo"} />
        </Box>
        <Box className={"content"} onClick={() => {

        }}>
          <Typography component={"h2"}>{props?.company_name}</Typography>
          <Typography component={"h3"}>{props?.job_title}</Typography>
          <Typography component={"h3"}>{props?.profession}</Typography>
          <Typography>{createdStr}</Typography>
        </Box>
        <Box className={"button-box"}>
          {(props?.type === "Saved" || props?.type === "Rejected") && (
            <>
             {(typeof props?.feeddomain !== "undefined" && props?.feeddomain != "") ? ( 
              <Button title="Apply on company site" height="60px" width="250px"  onClick={() => { handleExternalApplyClick?.(props?.feedjoburl,props?.feedurl) }} /> 
              ) :
            <Button title={"Apply now"} onClick={props?.onClick} height={"60px"} /> }
            <IconButton onClick={props?.onDelete}><CloseIcon/></IconButton>
            </>
          )}
        </Box>
      </Box>
      <CustomDivider/>
    </Box>
  );
};

export { JobCard };
