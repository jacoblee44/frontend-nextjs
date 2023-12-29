import { Button } from "@/components/atoms/button";
import { TextInput } from "@/components/atoms/textInput";
import { useNameFormStyles } from "@/static/stylesheets/resume";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState, ChangeEvent } from "react";
import { apiClient, endpoints } from "@/api";
import { useFormMethods } from "@/hooks/form";
import { FormError } from "@/components/organisms/form-error";
import { useAuthInfo } from "@/hooks/custom";
interface NameFormProps {
  onClickPrev?(): void;
  onClickNext?(): void;
  onClickExit?(): void;
}

const NameForm: React.FC<NameFormProps> = (props) => {
  const classes = useNameFormStyles();
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

  const firstname =
    typeof values["resume.firstname"] !== "undefined"
      ? values["resume.firstname"]
      : "";
  const lastname =
    typeof values["resume.lastname"] !== "undefined"
      ? values["resume.lastname"]
      : "";
  const firstnameError =
    typeof errors["resume.firstname"] != undefined
      ? errors["resume.firstname"]
      : "";
  const lastnameError =
    typeof errors["resume.lastname"] != undefined
      ? errors["resume.lastname"]
      : "";

  const [saveLoading, setSaveLoading] = useState(false);
  //const [saveExit, setSaveExit] = useState(false);

  const handleClickNext = (saveExit: boolean) => {
    if (hasError()) {
      return;
    }

    let data: { [key: string]: any } = {
      firstname,
      lastname,
    };

    if (resumeId) {
      data.resid = resumeId;
    } else {
      data.userid = userId;
    }
    setSaveLoading(true);
    apiClient
      .post({
        url: resumeId
          ? endpoints.private.updateResume
          : endpoints.private.createResume,
        data,
      })
      .then((res) => {
        setSaveLoading(false);
        if (res) {
          if (!resumeId) {
            setValue("resumeId", res?.data.resid);
          }
        }
        handleAccountName(saveExit);
      })
      .catch(() => {
        setSaveLoading(false);
      });
  };

  const handleAccountName = (saveExit: boolean) => {
    let data: { [key: string]: any } = {
      firstname,
      lastname,
    };
    data.userid = userId;
    apiClient
      .post({
        url: endpoints.private.updateAccountname,
        data,
      })
      .then((res) => {
        if (res) {
        }

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
      .catch(() => {});
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
          setValue("resume.firstname", jobData.firstname);
          setValue("resume.lastname", jobData.lastname);
          if (!resumeId) {
            setValue("resumeId", jobData._id);
          }
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    register("resume.firstname", {
      required: "Please enter First name!",
    });
    register("resume.lastname", {
      required: "Please enter Last name",
    });
  }, [lastname]);

  useEffect(() => {
    //if (!resumeId) {
    loadresumeData();
    setValue("education.level", "nil");
    setValue("education.schoolnumber", "nil");
    setValue("workexperience.jobtitle", "nil");
    //}
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
        <Typography component="h2">What is your name?</Typography>
        <TextInput
          label="First name"
          required={true}
          type="text"
          value={firstname}
          onChange={(e) => {
            setValue("resume.firstname", e.target.value);
          }}
          height="45px"
        />
        <FormError show={firstnameError} title={firstnameError} />
        <TextInput
          label="Last name"
          required={true}
          type="text"
          value={lastname}
          onChange={(e) => {
            setValue("resume.lastname", e.target.value);
          }}
          height="45px"
        />
        <FormError show={lastnameError} title={lastnameError} />
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

export { NameForm };
