import { Button } from "@/components/atoms/button";
import { SelectInput } from "@/components/atoms/select";
import { TextInput } from "@/components/atoms/textInput";
import { useLocationFormStyles } from "@/static/stylesheets/resume";
import { Box, Typography } from "@mui/material";
import React, { useEffect, useState, ChangeEvent } from "react";
import {
  CountrySelectModal,
  getCountryByCode,
} from "@/components/molecules/modal/CountrySelectModal";
import { apiClient, endpoints } from "@/api";
import { useFormMethods } from "@/hooks/form";
import { FormError } from "@/components/organisms/form-error";
import { useAuthInfo } from "@/hooks/custom";

/*const city_list = [
  { id: 1, value: "Dalas" },
  { id: 2, value: "New York" },
  { id: 3, value: "White House" },
  { id: 4, value: "Florida" },
];*/

interface LocationFormProps {
  onClickPrev?(): void;
  onClickNext?(): void;
  onClickExit?(): void;
}

const LocationForm: React.FC<LocationFormProps> = (props) => {
  const classes = useLocationFormStyles();
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

  const streetaddress =
    typeof values["resume.address"] !== "undefined"
      ? values["resume.address"]
      : "";
  const citystate =
    typeof values["resume.city"] !== "undefined" ? values["resume.city"] : "";
  const postalcode =
    typeof values["resume.postalcode"] !== "undefined"
      ? values["resume.postalcode"]
      : "";
  const country =
    typeof values["resume.country"] != undefined
      ? values["resume.country"]
      : "GB";
  const [countryName, setCountryName] = useState(
    country ? getCountryByCode(country)?.label : country
  );

  const [saveLoading, setSaveLoading] = useState(false);
  const [countryDialogOpen, setCountryDialogOpen] = useState(false);
  const handleClickNext = (saveExit: boolean) => {
    if (hasError()) {
      alert(JSON.stringify(errors));
      return;
    }
    let data: { [key: string]: any } = {
      country,
      streetaddress,
      citystate,
      postalcode,
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
          //alert(res);
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
          if (typeof jobData.country == "undefined") {
            setValue("resume.country", "GB");
            setCountryName("United Kingdom");
          } else {
            setValue("resume.country", jobData.country);
            setCountryName(getCountryByCode(jobData.country)?.label);
          }
          setValue("resume.address", jobData.streetaddress);
          setValue("resume.city", jobData.citystate);
          setValue("resume.postalcode", jobData.postalcode);
          /*if (!resumeId) {
          setValue("resumeId", jobData._id);
        }*/
        }
      })
      .catch(() => {});
  };

  useEffect(() => {
    //clearErrors();
    loadresumeData();
    setValue("education.level", "nil");
    setValue("education.schoolnumber", "nil");
    setValue("workexperience.jobtitle", "nil");
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
        <Typography component="h2">Where are you located?</Typography>
        <Typography component="h5">
          This helps match you with nearby jobs
        </Typography>
        <Typography component="h3">Country</Typography>
        <Box className="country">
          <Typography>{countryName}</Typography>
          <Typography
            className="btn"
            onClick={() => setCountryDialogOpen(true)}
          >
            Change
          </Typography>
        </Box>
        <CountrySelectModal
          open={countryDialogOpen}
          onClose={(value: any) => {
            setCountryDialogOpen(false);
          }}
          code={values["resume.country"]}
          onChange={(value: any) => {
            if (typeof value?.code !== "undefined") {
              setValue("resume.country", value?.code);
              setCountryName(value?.label);
            } else {
              setValue("resume.country", "GB");
              setCountryName("United Kingdom");
            }
            setCountryDialogOpen(false);
          }}
        />
        <TextInput
          height="45px"
          label="Street address"
          type="text"
          value={streetaddress}
          onChange={(e) => setValue("resume.address", e.target.value)}
        />
        <TextInput
          height="45px"
          label="City, State"
          type="text"
          value={citystate}
          onChange={(e) => setValue("resume.city", e.target.value)}
        />
        {/*<SelectInput
          data={city_list}
          value="1"
          required={true}
          label="City, State"
          onChange={() => console.log("Hello")}
        />*/}
        <TextInput
          height="45px"
          label="Postal code"
          type="text"
          value={postalcode}
          onChange={(e) => setValue("resume.postalcode", e.target.value)}
        />
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

export { LocationForm };
