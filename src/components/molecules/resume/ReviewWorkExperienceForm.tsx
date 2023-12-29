import { Button } from "@/components/atoms/button";
import { ReviewCard } from "@/components/layouts";
import { useReviewWorkExperienceFormStyles } from "@/static/stylesheets/resume";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState, ChangeEvent } from "react";
import { apiClient, endpoints } from "@/api";
import { useFormMethods } from "@/hooks/form";

interface ReviewWorkExperienceProps {
  onClickPrev?(): void;
  onClickNext?(): void;
  onClickGoto?(step:number): void;
  onClickExit?(): void;
}

const month_list = [
  { id: 0, value: "Month" },
  { id: 1, value: "January" },
  { id: 2, value: "February" },
  { id: 3, value: "March" },
  { id: 4, value: "April" },
  { id: 5, value: "May" },
  { id: 6, value: "June" },
  { id: 7, value: "July" },
  { id: 8, value: "August" },
  { id: 9, value: "September" },
  { id: 10, value: "October" },
  { id: 11, value: "November" },
  { id: 12, value: "December" },
];

const ReviewWorkExperienceForm: React.FC<ReviewWorkExperienceProps> = (
  props
) => {
  const classes = useReviewWorkExperienceFormStyles();
  const { values, setValue } = useFormMethods();

  let workexpId = (typeof values['workexpId'] !== "undefined") ? values['workexpId'] : 0; 
  let resumeId = (typeof values['resumeId'] !== "undefined") ? values['resumeId'] : 0;
  const [allWorkExperience, setAllWorkExperience] = useState([]);

  const getallWorkExperience = () => {
    apiClient.post({
      url: endpoints.private.getallWorkExperience,
      data: {
        resid: resumeId
      }
    }).then((res) => {
      setAllWorkExperience(res?.data?.workexpdata);
    }).catch(() => {
      setAllWorkExperience([]);
    });
  }

  const handleDeleteWorkExp = (workexpId:any) => {
    apiClient.post({
      url: endpoints.private.deleteWorkExperience,
      data: {
        workexpid: workexpId
      }
    }).then((res) => {
      getallWorkExperience();
    }).catch(() => {
    });
  };

  const handleEditWorkExp = (workexpId:any) => {
    setValue("workexpId", workexpId);
    if (props?.onClickGoto) {
      props?.onClickGoto?.(6);
    }
  };

  const handleClickNext = (saveExit:boolean) => {
    if(saveExit) {
      if (props?.onClickExit) {
        window.localStorage.setItem('gotostep','3' );
        window.localStorage.setItem('resid',resumeId );
        props?.onClickExit();
      }
    } else {
      if (props?.onClickNext) {
        props?.onClickNext();
      }
    }
  }

  useEffect(() => {
    if(resumeId > 0){
      getallWorkExperience();
    }
  }, [resumeId]);

  return (
    <Box className={classes.root} sx={{position:"relative"}}>
    <Typography sx={{ color: "#6D5086", fontSize: 24, cursor: "pointer", position:"absolute", right:"0px", top: "-75px" }} onClick={()=>{handleClickNext(true)}} > Save and exit </Typography>
      <Box className="box">
        <Typography component="h2">Review work experience</Typography>
        {allWorkExperience && allWorkExperience.length > 0 && allWorkExperience.map((row: any) => (
        <ReviewCard key={row?._id}
          id={row?._id}
          title={row?.jobtitle}
          sub_title={row?.company+' - '+row?.citystate}
          timePeriod={month_list[row?.frommonth].value+' '+row?.fromyear+' to '+((!row?.currentlywork) ? month_list[row?.tomonth].value+' '+row?.toyear : 'Present')}
          onClickEdit={handleEditWorkExp}
          onClickDelete={handleDeleteWorkExp}
        />
        ))}
        <Box className="bottom">
          <Button onClick={props?.onClickPrev} title="Add another" height="60px" btnType="border" />
          <Button  onClick={()=>{handleClickNext(false)}} title="Continue" height="60px" />
        </Box>
      </Box>
    </Box>
  );
};

export { ReviewWorkExperienceForm };
