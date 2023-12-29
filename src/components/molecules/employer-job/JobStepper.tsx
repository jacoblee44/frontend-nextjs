import { useJobStepperStyles } from "@/static/stylesheets/employee-job/jobStepperStyles";
import { Box } from "@mui/material";
import MobileStepper from "@mui/material/MobileStepper";
import { useState, useEffect } from "react";
import { BasicInformation } from "./BasicInformation";
import { CompensationForm } from "./CompensationForm";
import { DescribeJobForm } from "./DescribeJobForm";
import { EmployeeJobDetails } from "./EmployeeJobDetails";
import { JobPostType } from "./JobPostType";
import { QuestionForm } from "./QuestionForm";
import { SetApplicationPreferenceForm } from "./SetApplicationPreferenceForm";
import { FormProvider, useForm } from "@/hooks/form";

interface JobStepperProps {
  step: number,
  jobid: number,
}

//const SignUpForm: React.FC<SignUpFormProps> = (props) => {
export const JobStepper: React.FC<JobStepperProps> = (props) => {
  const classes = useJobStepperStyles();
  const formMethods = useForm();
  const totalSteps = 7;
  const [activeStep, setActiveStep] = useState<number>(props?.step);

  const handleNext = () => {
    if (activeStep < 7) setActiveStep((prevActiveStep) => prevActiveStep + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    if (activeStep > 1) setActiveStep((prevActiveStep) => prevActiveStep - 1);
    window.scrollTo(0, 0);
  };

  return (
    <Box className={classes.root}>
      <FormProvider methods={formMethods}>
        <Box
          sx={{
            display: "flex",
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
              display: "none",
            }}
            backButton={<></>}
            nextButton={<></>}
            color="danger"
          />
        </Box>

        <Box sx={{ padding: { md: "20px 40px" } }}>
          {activeStep === 1 && <JobPostType onClickNext={handleNext} />}
          {activeStep === 2 && <BasicInformation jobid={props?.jobid} onClickNext={handleNext} />}
          {activeStep === 3 &&
            <EmployeeJobDetails jobid={props?.jobid} onClickPrev={handleBack} onClickNext={handleNext} />}
          {activeStep === 4 && (
            <CompensationForm jobid={props?.jobid} onClickPrev={handleBack} onClickNext={handleNext} />
          )}
          {activeStep === 5 && (
            <DescribeJobForm jobid={props?.jobid} onClickPrev={handleBack} onClickNext={handleNext} />
          )}
          {activeStep === 6 && (
            <SetApplicationPreferenceForm jobid={props?.jobid} onClickPrev={handleBack} onClickNext={handleNext} />
          )}
          {activeStep === 7 && (
            <QuestionForm jobid={props?.jobid} onClickPrev={handleBack} onClickNext={handleNext} />)}
        </Box>
      </FormProvider>
    </Box>
  );
};
