import React, { useState } from 'react';
import { Box, IconButton, Typography } from '@mui/material'
import { useApplyJobStepperStyles } from "@/static/stylesheets/apply-job";
import MobileStepper from "@mui/material/MobileStepper";
import { useTheme } from "@mui/material/styles";
import { JobPostType } from "@/components/molecules/employer-job";
import { ContactInfo } from "@/components/molecules/apply-job/ContactInfo";
import { ResumeAdd } from "@/components/molecules/apply-job/ResumeAdd";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { ReviewApplication } from "@/components/molecules/apply-job/ReviewApplication";
import { FormProvider, useForm } from "@/hooks/form";

interface ApplyJobStepperProps {
  jobid: number,
  jobcompany: string,
}

//const ApplyJobStepper = () => {
const ApplyJobStepper: React.FC<ApplyJobStepperProps> = (props) => {
  const classes = useApplyJobStepperStyles();
  const formMethods = useForm();

  const totalSteps = 4;
  const theme = useTheme();
  let redirstep = window.localStorage.getItem('gotostep');
  let redirstep1 = 1;
  if(Number(redirstep) == 3){
    redirstep1 = 3;  
  }
  const [activeStep, setActiveStep] = useState<number>(redirstep1);

  const handleNext = () => { 
    window.localStorage.removeItem('gotostep');  
    window.localStorage.removeItem('jobid');
    if (activeStep < 4) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    window.localStorage.removeItem('gotostep');  
    window.localStorage.removeItem('jobid');
    if (activeStep > 1) setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box>
      <FormProvider methods={formMethods}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          "& svg": {
            color: "#6D5086",
            fontSize: "24px",
          },
        }}
      >
        <IconButton onClick={handleBack}>
          {activeStep != 1 && <ArrowBackIosIcon />}
        </IconButton>
        <Typography
          sx={{ color: "#6D5086", fontSize: 24, cursor: "pointer" }}
          onClick={handleNext}
        >
         Exit
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: 'column',
          "& .MuiMobileStepper-progress": {
            width: "100%",
          },
        }}
      >
        <MobileStepper
          variant="progress"
          steps={totalSteps}
          position="static"
          activeStep={activeStep}
          sx={{
            width: "100%",
            flexGrow: 1,
            background: 'transparent'
          }}
          backButton={<></>}
          nextButton={<></>}
          color="danger"
        />
        <Typography sx={{color: '#000000'}}>Application step {activeStep} of {totalSteps}</Typography>
      </Box>

      <Box>
        {activeStep === 1 && <ContactInfo onClickNext={handleNext} />}
        {activeStep === 2 && <ResumeAdd jobid={props?.jobid} jobcompany={props?.jobcompany} onClickNext={handleNext} />}
        {activeStep === 3 && <ReviewApplication jobid={props?.jobid} jobcompany={props?.jobcompany} />}{/* onClickNext={handleNext} */}
      </Box>
      </FormProvider>
    </Box>
  );
};

export { ApplyJobStepper };