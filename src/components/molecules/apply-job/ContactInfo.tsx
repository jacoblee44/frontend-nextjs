import React, { useEffect, useState, ChangeEvent } from "react";
import { Box, Typography } from "@mui/material";
import { useContactInfoStyles } from "@/static/stylesheets/apply-job";
import { TextInput } from "@/components/atoms/textInput";
import { PhoneInputBox } from "@/components/atoms/phoneInput";
import InfoIcon from "@/static/images/icons/info.png";
import Image from "next/image";
import { Button } from "@/components/atoms/button";
import { useAuthInfo } from "@/hooks/custom";
import { apiClient, endpoints } from "@/api";
import { useFormMethods } from "@/hooks/form";
import { FormError } from "@/components/organisms/form-error";

interface ContactInfoProps {
  onClickNext?(): void;
}

const ContactInfo: React.FC<ContactInfoProps> = (props) => {
  const classes = useContactInfoStyles();
  const {
    bindInput,
    values,
    register,
    setValue,
    errors,
    hasError,
    clearErrors,
  } = useFormMethods();

  const { userData } = useAuthInfo();
  const userId = userData?._id;
  const email = userData?.email;
  let resumeId =
    typeof values["resumeId"] !== "undefined" ? values["resumeId"] : "";

  const phone =
      typeof values["applyInfo.phone"] !== "undefined"
        ? values["applyInfo.phone"]
        : "",
    phoneError =
      typeof errors["applyInfo.phone"] !== "undefined"
        ? errors["applyInfo.phone"]
        : "";
  const showphone =
    typeof values["applyInfo.showphone"] !== "undefined"
      ? values["applyInfo.showphone"]
      : false;
  const firstname =
      typeof values["applyInfo.firstname"] !== "undefined"
        ? values["applyInfo.firstname"]
        : "",
    firstnameError =
      typeof errors["applyInfo.firstname"] !== "undefined"
        ? errors["applyInfo.firstname"]
        : "";
  const lastname =
      typeof values["applyInfo.lastname"] !== "undefined"
        ? values["applyInfo.lastname"]
        : "",
    lastnameError =
      typeof errors["applyInfo.lastname"] !== "undefined"
        ? errors["applyInfo.lastname"]
        : "";

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
          //alert(JSON.stringify(jobData));
          if (
            typeof jobData.firstname !== "undefined" &&
            typeof jobData.lastname !== "undefined"
          ) {
            setValue("applyInfo.firstname", jobData.firstname);
            setValue("applyInfo.lastname", jobData.lastname);
            if (!resumeId) {
              setValue("resumeId", jobData._id);
            }
          } else if (
            typeof userData?.firstname !== "undefined" &&
            typeof userData?.lastname !== "undefined"
          ) {
            setValue("applyInfo.firstname", userData?.firstname);
            setValue("applyInfo.lastname", userData?.lastname);
          }
          if (typeof jobData.phonenumber !== "undefined") {
            setValue("applyInfo.phone", jobData.phonenumber);
            setValue("applyInfo.showphone", jobData.showphonenumber);
          } else if (typeof userData?.phone !== "undefined") {
            setValue("applyInfo.phone", userData?.phone);
            setValue("applyInfo.showphone", false);
          }

          window.localStorage.setItem("fname", jobData.firstname);
          window.localStorage.setItem("lname", jobData.lastname);
          window.localStorage.setItem("rphone", jobData.phonenumber);
        }
      })
      .catch(() => {});
  };

  const handleUpdateName = () => {
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

    apiClient
      .post({
        url: resumeId
          ? endpoints.private.updateResume
          : endpoints.private.createResume,
        data,
      })
      .then((res) => {
        if (res) {
          if (!resumeId) {
            setValue("resumeId", res?.data.resid);
          }
        }
        handleAccountName();
      })
      .catch(() => {});
  };

  const handleAccountName = () => {
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
        handleUpdatePhone();
      })
      .catch(() => {});
  };

  const handleUpdatePhone = () => {
    let data: { [key: string]: any } = {
      phonenumber: phone,
      showphonenumber: showphone,
    };
    data.resid = resumeId;
    apiClient
      .post({
        url: endpoints.private.updateResume,
        data,
      })
      .then((res) => {
        if (props?.onClickNext) {
          clearErrors();
          props?.onClickNext();
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    register("applyInfo.firstname", {
      required: "Please enter First name!",
    });
    register("applyInfo.lastname", {
      required: "Please enter Last name",
    });
  }, [lastname]);

  useEffect(() => {
    loadresumeData();
  }, [userData]);

  return (
    <Box className={classes.root}>
      <Box className={"info-box"}>
        <Typography component={"h2"} className="add-cont-info">
          Add your contract information
        </Typography>
        <TextInput
          type={"text"}
          required={true}
          value={firstname}
          onChange={(e) => {
            setValue("applyInfo.firstname", e.target.value);
          }}
          label={"First name"}
          height={"45px"}
        />
        <FormError show={firstnameError} title={firstnameError} />
        <TextInput
          type={"text"}
          required={true}
          value={lastname}
          onChange={(e) => {
            setValue("applyInfo.lastname", e.target.value);
          }}
          label={"Last name"}
          height={"45px"}
        />
        <FormError show={lastnameError} title={lastnameError} />
        <Typography sx={{ paddingTop: 4 }} component={"h4"}>
          Email
        </Typography>
        <Typography>{email}</Typography>
        <Box
          sx={{
            marginTop: 2,
            "& label": { color: "#000000", fontSize: 24, fontWeight: 600 },
            "& input": {
              color: "#000000 !important",
              width: "100% !important",
              borderRadius: "10px !important",
              height: "45px !important",
            },
          }}
        >
          <label className="ph-number">
            Phone number <span style={{ fontWeight: 300 }}>(optional)</span>
          </label>
          <PhoneInputBox
            value={phone}
            onChange={(phone) => {
              setValue("applyInfo.phone", phone);
            }}
          />
        </Box>
        <Box
          sx={{
            background: "#8F77A4",
            borderRadius: "10px",
            padding: "10px 25px",
            marginTop: 3,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Image width={28} height={28} src={InfoIcon} alt={"Info"} />
          <Typography sx={{ color: "#ffffff !important", fontSize: 16 }}>
            Your DayRateWork Resume will also be updated with this contact
            information.
          </Typography>
        </Box>
        <Button title={"Continue"} onClick={handleUpdateName} width={"170px"} />
      </Box>
    </Box>
  );
};

export { ContactInfo };
