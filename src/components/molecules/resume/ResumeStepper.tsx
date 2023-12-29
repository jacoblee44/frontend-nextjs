import { SetApplicationPreferenceForm } from "@/components/molecules/employer-job";
import { useTheme } from "@mui/material/styles";
import MobileStepper from "@mui/material/MobileStepper";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import { useEffect, useState } from "react";
import { NameForm } from "./NameForm";
import { Box, Grid, IconButton, Typography } from "@mui/material";
import { useResumeStepperStyles } from "@/static/stylesheets/resume/resumeStepperStyles";
import { PhoneForm } from "./PhoneForm";
import { LocationForm } from "./LocationForm";
import { EducationForm } from "./EducationForm";
import { ReviewEducationForm } from "./ReviewEducationForm";
import { WorkExperienceForm } from "./WorkExperienceForm";
import { ReviewWorkExperienceForm } from "./ReviewWorkExperienceForm";
import { SkillForm } from "./SkillForm";
import { CertificationForm } from "./CertificationForm";
import { CheckResumeForm } from "./CheckResumeForm";
import { JobTypeForm } from "./JobTypeForm";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { PublicLayout } from "@/components/layouts";
import { ReviewVisibilityForm } from "@/components/molecules/resume/ReviewVisibilityForm";
import ResumeReady from "@/pages/resume-ready";
import { FormProvider, useForm } from "@/hooks/form";
import { useRouter } from "next/router";
import { routePaths } from "@/config";
import { COOKIE_NAME_PRERENDER_BYPASS } from "next/dist/server/api-utils";

export const ResumeStepper = () => {
  const classes = useResumeStepperStyles();
  const formMethods = useForm();
  const totalSteps = 12;
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState<number>(1);

  const router = useRouter();
  useEffect(() => {
    const qeury = router.query;
    if (qeury.edit) {
      setActiveStep(10);
    }
    console.log("///////////////////////////////////");
    console.log(qeury);
  }, [router]);

  const handleNext = () => {
    if (activeStep < 12) setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    if (activeStep > 1) setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleExit = () => {
    let jobid = window.localStorage.getItem("jobid");
    router.push("/apply-for-job/" + jobid + "/");
  };

  const handleGoto = (step: number) => {
    setActiveStep(step);
  };

  return (
    <PublicLayout
      pageProps={{
        title: "createresume",
      }}
      globalAccess={true}
    >
      <Box className={classes.root}>
        <FormProvider methods={formMethods}>
          <Grid container spacing={3}>
            <Grid item md={2} className="space-element"></Grid>
            <Grid
              item
              md={8}
              className="form-container"
              style={{ width: "100%" }}
            >
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
                  {activeStep > 1 ? <ArrowBackIosIcon /> : "  "}
                </IconButton>
                {/*<Typography
                sx={{ color: "#6D5086", fontSize: 24, cursor: "pointer" }}
                onClick={handleNext}
              >
                Save and exit
            </Typography> */}
              </Box>
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
                  }}
                  backButton={<></>}
                  nextButton={<></>}
                  color="danger"
                />
              </Box>

              <Box sx={{ padding: { md: "20px 40px" } }}>
                {activeStep === 1 && (
                  <NameForm onClickNext={handleNext} onClickExit={handleExit} />
                )}
                {activeStep === 2 && (
                  <PhoneForm
                    onClickNext={handleNext}
                    onClickExit={handleExit}
                  />
                )}
                {activeStep === 3 && (
                  <LocationForm
                    onClickNext={handleNext}
                    onClickExit={handleExit}
                  />
                )}
                {activeStep === 4 && (
                  <EducationForm
                    onClickNext={handleNext}
                    onClickExit={handleExit}
                  />
                )}
                {activeStep === 5 && (
                  <ReviewEducationForm
                    onClickPrev={handleBack}
                    onClickGoto={handleGoto}
                    onClickNext={handleNext}
                    onClickExit={handleExit}
                  />
                )}
                {activeStep === 6 && (
                  <WorkExperienceForm
                    onClickNext={handleNext}
                    onClickExit={handleExit}
                  />
                )}
                {activeStep === 7 && (
                  <ReviewWorkExperienceForm
                    onClickPrev={handleBack}
                    onClickGoto={handleGoto}
                    onClickNext={handleNext}
                    onClickExit={handleExit}
                  />
                )}
                {activeStep === 8 && (
                  <SkillForm
                    onClickNext={handleNext}
                    onClickExit={handleExit}
                  />
                )}
                {activeStep === 9 && (
                  <CertificationForm
                    onClickNext={handleNext}
                    onClickExit={handleExit}
                  />
                )}
                {activeStep === 10 && (
                  <CheckResumeForm
                    onClickGoto={handleGoto}
                    onClickNext={handleNext}
                    onClickExit={handleExit}
                  />
                )}
                {activeStep === 11 && (
                  <ReviewVisibilityForm
                    onClickNext={handleNext}
                    onClickExit={handleExit}
                  />
                )}
                {activeStep === 12 && <JobTypeForm />}
              </Box>
            </Grid>
            <Grid item md={2}></Grid>
          </Grid>
        </FormProvider>
      </Box>
    </PublicLayout>
  );
};
