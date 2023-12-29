import React, { useEffect, useState, ChangeEvent } from "react";
import { Button } from "@/components/atoms/button";
import { SelectInput } from "@/components/atoms/select";
import { TextInput } from "@/components/atoms/textInput";
import { JobPostBanner } from "@/components/layouts";
import { useDescribeJobFormStyles } from "@/static/stylesheets/employee-job/describeJobFormStyles";
import { useSetApplicationPreferenceFormStyles } from "@/static/stylesheets/employee-job/setAplicationPreferenceStyles";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  Typography,
} from "@mui/material";
import { ApplicationPreferencePreviewModal } from "@/components/molecules/modal";
import { apiClient, endpoints } from "@/api";
import { useFormMethods } from "@/hooks/form";
import { FormError } from "@/components/organisms/form-error";

interface SetApplicationPreferenceFormProps {
  onClickPrev?(): void;

  onClickNext?(): void;

  jobid?: number;
}

export const SetApplicationPreferenceForm: React.FC<SetApplicationPreferenceFormProps> = (props) => {

  const classes = useSetApplicationPreferenceFormStyles();
  const [open, setOpen] = useState(false);
  const { bindInput, values, register, unregister, setValue, errors, hasError, clearErrors } = useFormMethods();

  let jobId = props?.jobid ? props?.jobid : values['jobId'];
  const issubmitcv = (typeof values['applnpref.issubmitcv'] != undefined) ? values['applnpref.issubmitcv'] : '',
    issubmitcvError = (typeof errors['applnpref.issubmitcv'] != undefined) ? errors['applnpref.issubmitcv'] : '';
  const isapplndeadline = (typeof values['applnpref.isapplndeadline'] != undefined) ? values['applnpref.isapplndeadline'] : '',
    isapplndeadlineError = (typeof errors['applnpref.isapplndeadline'] != undefined) ? errors['applnpref.isapplndeadline'] : '';
  const deadlinedate = (typeof values['applnpref.deadlinedate'] != undefined) ? values['applnpref.deadlinedate'] : '',
    deadlinedateError = (typeof errors['applnpref.deadlinedate'] != undefined) ? errors['applnpref.deadlinedate'] : '';
  const jobconversation = (typeof values['applnpref.jobconversation'] != undefined) ? values['applnpref.jobconversation'] : '',
    jobconversationError = (typeof errors['applnpref.jobconversation'] != undefined) ? errors['applnpref.jobconversation'] : '';
  const accptaggrement = (typeof values['applnpref.accptaggrement'] != undefined) ? values['applnpref.accptaggrement'] : '',
    accptaggrementError = (typeof errors['applnpref.accptaggrement'] != undefined) ? errors['applnpref.accptaggrement'] : '';

  const createOrUpdateJob = () => {
    //alert(issubmitcv+'/'+isapplndeadline+'/'+jobconversation);
    var cvsub = 0;
    if (issubmitcv == "yes") cvsub = 0;
    else if (issubmitcv == "no") cvsub = 1;
    else if (issubmitcv == "optional") cvsub = 2;

    let data: { [key: string]: any } = {
      issubmitcv: cvsub,
      isapplndeadline: (isapplndeadline == "yes"),
      deadlinedate: deadlinedate,
      jobconversation: (jobconversation == "yes"),
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
        (window as any).location = "/employer/dashboard";
      }
      /*if (props?.onClickNext) {
        clearErrors();
        props?.onClickNext();
      }*/

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
    unregister("applnpref.issubmitcv");
    unregister("applnpref.isapplndeadline");
    unregister("applnpref.deadlinedate");
    unregister("applnpref.jobconversation");
    unregister("applnpref.accptaggrement");
    
    if (props?.onClickPrev) {
      clearErrors();
      props?.onClickPrev();
    }
  };

  useEffect(() => {

    register("applnpref.issubmitcv", {
      required: "Please check the option to submit the CV",
    });

    register("applnpref.isapplndeadline", {
      required: "Please check the option for application deadline!",
    });
    register("applnpref.deadlinedate", {
      validate(value: any): string | true {
        if (deadlinedate === "yes" && (!value || value?.trim() === "")) {
          return "Please enter the deadline date!";
        }
        return true;
      }
    });
    register("applnpref.jobconversation", {
      required: "Please check the option for communication settings",
    });
    register("applnpref.accptaggrement", {
      required: "Please check by accept the agreement",
    });
  }, [jobconversation, deadlinedate]);

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
          var cvsub = "";
          if (jobData.issubmitcv == 0) cvsub = "yes";
          else if (jobData.issubmitcv == 1) cvsub = "no";
          else if (jobData.issubmitcv == 2) cvsub = "optional";
          setValue("applnpref.issubmitcv", cvsub);
          //setValue("applnpref.isapplndeadline", (jobData.isapplndeadline) ? "yes" : "no");
          let dlinedte = "";
          if (jobData.deadlinedate) {
            dlinedte = jobData.deadlinedate.split('T')[0];
          }
          if (dlinedte != "") {
            setValue("applnpref.isapplndeadline", "yes");
            setValue("applnpref.deadlinedate", dlinedte);
          } else {
            setValue("applnpref.isapplndeadline", "no");
            setValue("applnpref.deadlinedate", "");
          }
          setValue("applnpref.jobconversation", (jobData.jobconversation) ? "yes" : "no");
          setValue("applnpref.accptaggrement", "yes");
        }
      }).catch(() => {
      });
    }
  }

  useEffect(() => {
    loadjobData();
  }, [jobId]);

  return (
    <Box className={classes.root}>
      <JobPostBanner title="Set application preferences" />
      <Box className="box">
        <Typography component="h2">
          Would you like people to submit a CV?{" "}
          <span style={{ color: "red" }}>*</span>
        </Typography>

        <Box>
          <Box className="radio-box">
            <FormControlLabel
              value="0"
              control={<Radio />}
              label="Yes"
              onClick={() => setValue("applnpref.issubmitcv", "yes")}
              checked={(issubmitcv === "yes")}
            />
            <Typography>People will be required to include a CV.</Typography>
          </Box>
          <Box className="radio-box">
            <FormControlLabel value="1" control={<Radio />} label="No"
                              onClick={() => setValue("applnpref.issubmitcv", "no")} checked={(issubmitcv === "no")} />
            <Typography>
              People will not be required to include a CV.
            </Typography>
          </Box>
          <Box className="radio-box">
            <FormControlLabel
              value="2"
              control={<Radio />}
              label="Optional"
              onClick={() => setValue("applnpref.issubmitcv", "optional")} checked={(issubmitcv === "optional")}
            />
            <Typography>People can choose whether to include a CV.</Typography>
          </Box>
          {issubmitcvError && (
            <Box sx={{ marginBottom: "20px" }}>
              <FormError show={issubmitcvError} title={issubmitcvError} />
            </Box>
          )}
        </Box>

        <Typography component="h2">
          Is there an application deadline?
        </Typography>
        <Box>
          <Box className="radio-box" sx={{ height: 45, display: "flex" }}>
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="Yes"
              // onClick={() => setValue("applnpref.isapplndeadline", "yes")} checked={(isapplndeadline === "yes") ? true : false}
              onClick={() => setValue("applnpref.isapplndeadline", "yes")}
              checked={values['applnpref.isapplndeadline'] === "yes"}
            />
          </Box>
          <Box className="radio-box" sx={{ height: 45, display: "flex" }}>
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="No"
              onClick={() => setValue("applnpref.isapplndeadline", "no")}
              checked={values['applnpref.isapplndeadline'] === "no"}
              //onClick={() => setValue("applnpref.isapplndeadline", "no")} checked={(isapplndeadline === "no") ? true : false}
            />
          </Box>

          <FormError show={isapplndeadlineError} title={isapplndeadlineError} />

          {values['applnpref.isapplndeadline'] === "yes" && (
            <Grid className="ddate" container spacing={5}>
              <Grid item md={5}>
                <TextInput onChange={(e) => {
                  setValue("applnpref.deadlinedate", e.target.value)
                }} value={values['applnpref.deadlinedate']} type="date" />
              </Grid>
            </Grid>
          )}
          <FormError show={deadlinedateError} title={deadlinedateError} />
        </Box>

        <Box sx={{ marginTop: "20px" }}>
          <Typography component="h2">Communication settings</Typography>
          <Typography component="h3">
            Do you want to let people who apply to your job start the
            conversation? <span style={{ color: "red" }}>*</span>
          </Typography>
          <Box sx={{ marginTop: "10px" }}>
            <Typography component="body">
              Allow people to contact you about their applications. Messages will
              be sent to the same email address you provided for daily updates.
            </Typography>
          </Box>
          <Box className="radio-box" sx={{ height: 45, display: "flex" }}>
            <FormControlLabel
              value="true"
              control={<Radio />}
              label="Yes"
              onClick={() => {
                setValue("applnpref.jobconversation", "yes");
              }} checked={(jobconversation === "yes")}
            />
          </Box>
          <Box className="radio-box" sx={{ height: 45, display: "flex" }}>
            <FormControlLabel
              value="false"
              control={<Radio />}
              label="No"
              onClick={() => {
                setValue("applnpref.jobconversation", "no");
              }} checked={(jobconversation === "no")}
            />
          </Box>
          <FormError show={jobconversationError} title={jobconversationError} />
          <FormControlLabel
            control={
              <Checkbox
                checked={!!accptaggrement}
                onClick={() => setValue("applnpref.accptaggrement", !accptaggrement)}
                name="jason"
              />
            }
            label={
              <>
                By ticking this box, you instruct Dayratework to notify candidates
                that you have declined their application if you have not
                interacted with them within your chosen time frame, per the
                <a
                  href="#"
                  style={{
                    color: "#6D5086",
                    textDecoration: "underline",
                    paddingLeft: "10px",
                  }}
                >
                  Terms of Service.
                </a> Please check by accept the agreement.
              </>
            }
          />
        </Box>
        <FormError show={accptaggrementError} title={accptaggrementError} />
      </Box>

      <Box className="bottom">
        <Button
          onClick={handleClickBack}
          title="< Back"
          width="170px"
          height="60px"
          btnType="border"
        />
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { md: "row", sm: "column", xs: "column" },
          }}
        >
          <Button
            title="Show Preview"
            width="190px"
            height="60px"
            btnType="border"
            onClick={() => setOpen(!open)}
          />
          <Button
            onClick={handleClickNext}
            title="Save & Continue"
            width="220px"
            height="60px"
          />
        </Box>
      </Box>
      <ApplicationPreferencePreviewModal jobid={jobId} open={open} handleClose={() => setOpen(false)} />
    </Box>
  );
};
