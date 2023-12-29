import { Button } from "@/components/atoms/button";
import { ReviewCard } from "@/components/layouts";
import deleteIcon from "@/static/images/icons/ic_delete.png";
import { Box, IconButton, Typography } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState, ChangeEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import { TextInput } from "@/components/atoms/textInput";
import { CustomDivider } from "@/components/atoms/divider";
import { LeftIconBox, RightIconBox } from "@/components/atoms/textWithIcon";
import { useReviewVisibilityFormStyles } from "@/static/stylesheets/resume";
import { VisibilityCard } from "@/components/layouts/VisibilityCard";
import { apiClient, endpoints } from "@/api";
import { useFormMethods } from "@/hooks/form";
import { useAuthInfo } from "@/hooks/custom";
import toast from "react-hot-toast";

interface ReviewVisibilityFormProps {
  onClickPrev?(): void;
  onClickNext?(): void;
  onClickExit?(): void;
}

const ReviewVisibilityForm: React.FC<ReviewVisibilityFormProps> = (props) => {
  const classes = useReviewVisibilityFormStyles();
  const { values, setValue } = useFormMethods();
  const { userData } = useAuthInfo();
  const userId = userData?._id;
  let resumeId = (typeof values['resumeId'] !== "undefined") ? values['resumeId'] : 0;
  let ispublic = (typeof values['resume.ispublic'] !== "undefined") ? values['resume.ispublic'] : '';

  const handlePublic = (isPublic:boolean) => {
    if(isPublic) {
      setValue("resume.ispublic", "Yes");
    } else {
      setValue("resume.ispublic", "No");
    } 
    apiClient.post({
      url: endpoints.private.isResumePrivate,
      data: {
        ispublic:isPublic,
        resid: resumeId
      }
    }).then((res) => {
    }).catch(() => {
    });
  };

  const loadresumeData = async () => {    
    await apiClient.post({
      url: endpoints.private.getResumebyUser,
      data: {
        userid:userId,
      }
    }).then((res) => {
      if (res?.data) {
        const jobData = res?.data?.resume;
        if(typeof jobData.ispublic !== "undefined") {
          if(jobData.ispublic) { 
            setValue("resume.ispublic", "Yes");
          } else {
            setValue("resume.ispublic", "No");
          } 
        }    
      }
    }).catch(() => {
    });
}

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
      loadresumeData();
  }, [resumeId]);

  return (
    <Box className={classes.root} sx={{position:"relative"}}>
    <Typography sx={{ color: "#6D5086", fontSize: 24, cursor: "pointer", position:"absolute", right:"0px", top: "-75px" }} onClick={()=>{handleClickNext(true)}} > Save and exit </Typography>
      <Box className="box">
        <Typography component="h2">Review work experience</Typography>

        <VisibilityCard key={1}
          title="Public"
          visibility={true}
          value={ispublic}
          onClick={handlePublic}
          description="Your resume and profile information can be found through DayRateWork by employers looking for candidates, according to our terms"
        />

        <VisibilityCard key={0}
          title="Private"
          visibility={false}
          value={ispublic}
          onClick={handlePublic}
          description="Employers cannot find our resume in a search on DayRateWork. This does nor affect previous applications or prevent employers you responded to from contacting you."
        />

        <Typography component="a" href="#">
          Privacy Policy
        </Typography>

        <Box className="bottom">
          <Button onClick={()=>{ toast.success("Your resume saved/updated successfully!"); setTimeout(() => { handleClickNext(true)},3000);}}  title="Continue" height="60px" />
        </Box>
      </Box>
    </Box>
  );
};

export { ReviewVisibilityForm };
