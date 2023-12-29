import { Button } from "@/components/atoms/button";
import { SelectInput } from "@/components/atoms/select";
import { TextInput } from "@/components/atoms/textInput";
import { useEducationFormStyles } from "@/static/stylesheets/resume";
import {
  Box,
  Typography,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";
import React, { useEffect, useState, ChangeEvent } from "react";
import {
  CountrySelectModal,
  getCountryByCode,
} from "@/components/molecules/modal/CountrySelectModal";
import { apiClient, endpoints } from "@/api";
import { useFormMethods } from "@/hooks/form";
import { FormError } from "@/components/organisms/form-error";
import { useAuthInfo } from "@/hooks/custom";
import Tooltip from "@mui/material/Tooltip";
import Buttons from "@mui/material/Button";

const study_list = [
  { id: "Primary", value: "Primary" },
  { id: "Lower Secondary", value: "Lower Secondary" },
  { id: "Upper Secondary", value: "Upper Secondary" },
  { id: "Post secondary", value: "Post secondary" },
  { id: "Short cycle", value: "Short cycle" },
  { id: "Diploma", value: "Diploma" },
  { id: "Bachelors", value: "Bachelors" },
  { id: "Masters", value: "Masters" },
  { id: "Doctoral", value: "Doctoral" },
];

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
const currentYear = new Date().getFullYear();
let year_list: any = [];
for (let i = 2000; i <= currentYear; i++) {
  year_list.push({ id: i, value: i });
  /*if(i==2000){ year_list += '[';}
  year_list += '{ id: '+i+', value: '+i+' },'
  if(i==currentYear){ year_list += '];';}*/
}
console.log(year_list);
/*if(curyearlst != ""){
  const year_list = [
    { id: 0, value: "Year" },
    curyearlst
    { id: 2000, value: "2000" },
    { id: 2001, value: "2001" },
    { id: 2002, value: "2002" },
    { id: 2003, value: "2003" },
    { id: 2004, value: "2004" },
    { id: 2005, value: "2005" },
    { id: 2006, value: "2006" },
    { id: 2007, value: "2007" },
    { id: 2008, value: "2008" },
    { id: 2009, value: "2009" },
    { id: 2010, value: "2010" },
    { id: 2011, value: "2011" },
    { id: 2012, value: "2012" },
    { id: 2013, value: "2013" },
    { id: 2014, value: "2014" },
    { id: 2015, value: "2015" },
    { id: 2016, value: "2016" },
    { id: 2017, value: "2017" },
    { id: 2018, value: "2018" },
    { id: 2019, value: "2019" },
    { id: 2020, value: "2020" },
    { id: 2021, value: "2021" },
  ];
}*/

interface EducationFormProps {
  onClickPrev?(): void;
  onClickNext?(): void;
  onClickExit?(): void;
}

const EducationForm: React.FC<EducationFormProps> = (props) => {
  const classes = useEducationFormStyles();
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
    typeof values["resumeId"] !== "undefined" ? values["resumeId"] : 0;
  let eduId = typeof values["eduId"] !== "undefined" ? values["eduId"] : 0;

  const levelError =
    typeof errors["education.level"] != undefined
      ? errors["education.level"]
      : "";
  const schoolnumberError =
    typeof errors["education.schoolnumber"] != undefined
      ? errors["education.schoolnumber"]
      : "";

  const level =
    typeof values["education.level"] !== "undefined"
      ? values["education.level"]
      : "";
  const fieldofstudy =
    typeof values["education.fieldofstudy"] !== "undefined"
      ? values["education.fieldofstudy"]
      : "";
  const schoolnumber =
    typeof values["education.schoolnumber"] !== "undefined"
      ? values["education.schoolnumber"]
      : "";
  const citystate =
    typeof values["education.citystate"] !== "undefined"
      ? values["education.citystate"]
      : "";
  const currentlyenrolled =
    typeof values["education.currentlyenrolled"] !== "undefined"
      ? values["education.currentlyenrolled"]
      : false;
  const frommonth =
    typeof values["education.frommonth"] !== "undefined"
      ? values["education.frommonth"]
      : "";
  const fromyear =
    typeof values["education.fromyear"] !== "undefined"
      ? values["education.fromyear"]
      : "";
  const tomonth =
    typeof values["education.tomonth"] !== "undefined"
      ? values["education.tomonth"]
      : "";
  const toyear =
    typeof values["education.toyear"] !== "undefined"
      ? values["education.toyear"]
      : "";

  const country =
    typeof values["education.country"] != undefined
      ? values["education.country"]
      : "GB";
  const [countryName, setCountryName] = useState(
    country ? getCountryByCode(country)?.label : country
  );

  const [saveLoading, setSaveLoading] = useState(false);
  const [countryDialogOpen, setCountryDialogOpen] = useState(false);

  const handleClickNext = (saveExit: boolean) => {
    if (hasError()) {
      return;
    }
    let data: { [key: string]: any } = {
      level,
      fieldofstudy,
      schoolnumber,
      country,
      citystate,
      currentlyenrolled,
      frommonth,
      fromyear,
      tomonth,
      toyear,
    };
    data.resid = resumeId;
    if (eduId > 0) {
      data.eduid = eduId;
    } else {
      data.userid = userId;
    }

    //console.log(data);

    setSaveLoading(true);
    apiClient
      .post({
        url:
          eduId > 0
            ? endpoints.private.updateEducation
            : endpoints.private.createEducation,
        data,
      })
      .then((res) => {
        setSaveLoading(false);
        setValue("eduId", 0);
        setValue("education.level", "");
        setValue("education.fieldofstudy", "");
        setValue("education.schoolnumber", "");
        setValue("education.citystate", "");
        setValue("education.currentlyenrolled", false);
        setValue("education.frommonth", "");
        setValue("education.fromyear", "");
        setValue("education.tomonth", "");
        setValue("education.toyear", "");
        if (saveExit) {
          if (props?.onClickExit) {
            clearErrors();
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

  const handleClickSkip = () => {
    setValue("eduId", 0);
    setValue("education.level", "");
    setValue("education.fieldofstudy", "");
    setValue("education.schoolnumber", "");
    setValue("education.citystate", "");
    setValue("education.currentlyenrolled", false);
    setValue("education.frommonth", "");
    setValue("education.fromyear", "");
    setValue("education.tomonth", "");
    setValue("education.toyear", "");
    if (props?.onClickNext) {
      clearErrors();
      props?.onClickNext();
    }
  };

  const loadeducationData = async () => {
    //alert('under construction...');
    if (eduId > 0) {
      await apiClient
        .post({
          url: endpoints.private.getEducation,
          data: {
            eduid: eduId,
          },
        })
        .then((res) => {
          if (res?.data) {
            const eduData = res?.data?.edudata;
            if (typeof eduData.country === "undefined") {
              setValue("education.country", "GB");
              setCountryName("United Kingdom");
            } else {
              setValue("education.country", eduData.country);
              setCountryName(getCountryByCode(eduData.country)?.label);
            }

            setValue("education.level", eduData.level);
            setValue("education.fieldofstudy", eduData.fieldofstudy);
            setValue("education.schoolnumber", eduData.schoolnumber);
            setValue("education.citystate", eduData.citystate);
            setValue("education.currentlyenrolled", eduData.currentlyenrolled);
            setValue("education.frommonth", eduData.frommonth);
            setValue("education.fromyear", eduData.fromyear);
            setValue("education.tomonth", eduData.tomonth);
            setValue("education.toyear", eduData.toyear);
            if (!resumeId) {
              setValue("resumeId", eduData.resumeid);
            }
          }
        })
        .catch(() => {});
    }
  };

  const handledatevalidation = (toyr: any) => {
    if (toyr < fromyear) {
      alert("please select year greater than From Year");
    } else {
      setValue("education.toyear", toyr);
    }
  };

  useEffect(() => {
    register("education.level", {
      required: "Please enter Education Level!",
    });
    register("education.schoolnumber", {
      required: "Please enter School Name",
    });
  }, [schoolnumber]);

  useEffect(() => {
    if (eduId > 0) {
      loadeducationData();
    } else {
      setValue("education.country", "GB");
      setCountryName("United Kingdom");
      setValue("education.level", "");
      setValue("education.schoolnumber", "");
    }
    setValue("workexperience.jobtitle", "nil");
    clearErrors();
  }, [eduId]);

  const ibuttonStyle = {
    position: "absolute",
    top: "-30%",
    left: "15%",
  };

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
        <Typography component="h2">Education</Typography>
        <SelectInput
          data={study_list}
          label="Level of education"
          required={true}
          onChange={(e) => setValue("education.level", e.target.value)}
          value={level}
        />
        <FormError show={levelError} title={levelError} />

        <TextInput
          height="45px"
          type="text"
          label="Field of study"
          required={false}
          value={fieldofstudy}
          onChange={(e) => setValue("education.fieldofstudy", e.target.value)}
        />
        <div className="relative">
          <TextInput
            height="45px"
            type="text"
            label="Name of school"
            required={true}
            value={schoolnumber}
            onChange={(e) => setValue("education.schoolnumber", e.target.value)}
          />
          <Tooltip title="Place school Affiliate Name" arrow>
            <Buttons style={ibuttonStyle}>
              <InfoIcon />
            </Buttons>
          </Tooltip>
        </div>
        <FormError show={schoolnumberError} title={schoolnumberError} />
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
          onClose={() => setCountryDialogOpen(false)}
          code={values["education.country"]}
          onChange={(value: any) => {
            setValue("education.country", value?.code);
            setCountryName(value?.label);
            setCountryDialogOpen(false);
          }}
        />
        <TextInput
          height="45px"
          type="text"
          label="City, State"
          required={false}
          value={citystate}
          onChange={(e) => setValue("education.citystate", e.target.value)}
        />
        <Typography component="h3">Time Period</Typography>

        <FormControlLabel
          control={
            <Checkbox
              checked={currentlyenrolled}
              onChange={() =>
                setValue("education.currentlyenrolled", !currentlyenrolled)
              }
              name="enrolled"
            />
          }
          label="Currently enrolled"
        />
        <Box className="time-period">
          <Typography component="h4">From</Typography>
          <Grid container spacing={3}>
            <Grid item md={6}>
              <SelectInput
                data={month_list}
                label=""
                value={frommonth}
                onChange={(e) =>
                  setValue("education.frommonth", e.target.value)
                }
                required={false}
              />
            </Grid>
            <Grid item md={6}>
              <SelectInput
                data={year_list}
                label=""
                value={fromyear}
                onChange={(e) => setValue("education.fromyear", e.target.value)}
                required={false}
              />
            </Grid>
          </Grid>
        </Box>
        {!currentlyenrolled && (
          <Box className="time-period">
            <Typography component="h4">To</Typography>
            <Grid container spacing={3} className="inputs-container">
              <Grid item md={6}>
                <SelectInput
                  data={month_list}
                  label=""
                  value={tomonth}
                  onChange={(e) =>
                    setValue("education.tomonth", e.target.value)
                  }
                  required={false}
                />
              </Grid>
              <Grid item md={6}>
                <SelectInput
                  data={year_list}
                  label=""
                  value={toyear}
                  //onChange={(e) => setValue("education.toyear", e.target.value)}
                  onChange={(e) => handledatevalidation(e.target.value)}
                  required={false}
                />
              </Grid>
            </Grid>
          </Box>
        )}
        <Button
          onClick={() => {
            handleClickNext(false);
          }}
          title={"Save"}
          width="180px"
          height="60px"
          btnType="default"
          loading={saveLoading}
        />
        <Button
          onClick={handleClickSkip}
          title={"Skip"}
          width="180px"
          height="60px"
          btnType="border"
        />
      </Box>
    </Box>
  );
};

export { EducationForm };
