import React, { useEffect, useState, ChangeEvent } from "react";
import { Box, Checkbox, FormControlLabel, Typography } from "@mui/material";
import { usePhoneFormStyles } from "@/static/stylesheets/resume";
import { TextInput } from "@/components/atoms/textInput";
import { Button } from "@/components/atoms/button";
import { apiClient, endpoints } from "@/api";
import { useFormMethods } from "@/hooks/form";
import { FormError } from "@/components/organisms/form-error";
import { useAuthInfo } from "@/hooks/custom";

interface PhoneFormProps {
  onClickPrev?(): void;
  onClickNext?(): void;
  onClickExit?(): void;
}

export const PhoneForm: React.FC<PhoneFormProps> = (props) => {
  const classes = usePhoneFormStyles();
  const { userData } = useAuthInfo();
  const {
    bindInput,
    values,
    register,
    setValue,
    errors,
    hasError,
    clearErrors,
  } = useFormMethods();
  const userId = userData?._id;
  let resumeId =
    typeof values["resumeId"] !== "undefined" ? values["resumeId"] : "";

  const phonenumber =
    typeof values["resume.phone"] !== "undefined" ? values["resume.phone"] : "";
  // const showphonenumber =
  //   typeof values["resume.showphone"] !== "undefined"
  //     ? values["resume.showphone"]
  //     : false;
  const showphonenumber = false;

  const [saveLoading, setSaveLoading] = useState(false);

  const handleClickNext = (saveExit: boolean) => {
    if (hasError()) {
      //alert(JSON.stringify(errors))
      return;
    }

    let data: { [key: string]: any } = {
      phonenumber,
      showphonenumber,
    };
    data.resid = resumeId;
    setSaveLoading(true);
    apiClient
      .post({
        url: endpoints.private.updateResume,
        data,
      })
      .then((res) => {
        setSaveLoading(false);
        if (saveExit) {
          if (props?.onClickExit) {
            clearErrors();
            window.localStorage.setItem("gotostep", "3");
            window.localStorage.setItem("resid", resumeId);
            props?.onClickExit();
          }
        } else {
          if (props?.onClickNext) {
            clearErrors();
            props?.onClickNext();
          }
        }
      })
      .catch(() => {
        setSaveLoading(false);
      });
  };

  const loadresumeData = async () => {
    await apiClient
      .post({
        url: endpoints.private.getResumebyUser,
        data: {
          userid: userId,
        },
      })
      .then((res) => {
        if (res?.data) {
          const jobData = res?.data?.resume;
          setValue("resume.phone", jobData.phonenumber);
          setValue("resume.showphone", jobData.showphonenumber);
          /*if (!resumeId) {
          setValue("resumeId", jobData._id);
        }*/
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    loadresumeData();
  }, [resumeId]);

  return (
    <Box className={classes.root} sx={{ position: "relative" }}>
      <Typography
        sx={{
          color: "#6D5086",
          fontSize: 24,
          cursor: "pointer",
          position: "absolute",
          right: "0px",
          top: "-75px",
        }}
        onClick={() => {
          handleClickNext(true);
        }}
      >
        {" "}
        Save and exit{" "}
      </Typography>
      <Box className="box">
        <Typography component="h2">
          Add a phone number to your resume?
        </Typography>
        <TextInput
          label="Phone number"
          type="text"
          value={phonenumber}
          height="45px"
          onChange={(e) => setValue("resume.phone", e.target.value)}
          required={false}
          infoText="Only provided to employers you apply or respond to"
          inputClass="mt-2"
        />
        {/* <FormControlLabel
          control={
            <Checkbox
              checked={showphonenumber}
              onChange={() => setValue("resume.showphone", !showphonenumber)}
              name="jason"
            />
          }
          label="Show my number on DayRateWork"
        /> */}
        {/* <Typography className="info">
          By submitting the form with this box checked, you confirm that you are
          the primary user and subscriber to the telephone number provided, and
          you agree to receive calls (including using artificial or pre-recorded
          voice), texts, and WhatsApp messages from DayRateWork and employers
          who use DayRateWork at the telephone number provided above.
        </Typography> */}
        <Button
          onClick={() => {
            handleClickNext(false);
          }}
          // height="60px"
          // width="180px"
          height="50px"
          width="150px"
          title="Save"
          loading={saveLoading}
        />
      </Box>
    </Box>
  );
};
