import { Button } from "@/components/atoms/button";
import { SelectInput } from "@/components/atoms/select";
import { TextInput } from "@/components/atoms/textInput";
import { useWorkExperienceFormStyles } from "@/static/stylesheets/resume";
import {
  Typography,
  Box,
  FormControlLabel,
  Checkbox,
  Grid,
} from "@mui/material";
import React, { useEffect, useState, ChangeEvent } from "react";
import {
  CountrySelectModal,
  getCountryByCode,
} from "@/components/molecules/modal/CountrySelectModal";
import { apiClient, endpoints } from "@/api";
import { useFormMethods } from "@/hooks/form";
import { FormError } from "@/components/organisms/form-error";
import { useAuthInfo } from "@/hooks/custom";
import dynamic from "next/dynamic";
const QuillNoSSRWrapper = dynamic(import("react-quill"), {
  ssr: false,
  loading: () => <p>Loading ...</p>,
});
const modules = {
  toolbar: [
    ["underline", "italic", "bold"],
    [{ list: "ordered" }, { list: "bullet" }],
  ],
  clipboard: {
    matchVisual: false,
  },
};
const formats = ["bold", "italic", "underline", "list", "bullet"];

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
}

/*const year_list = [
  { id: 0, value: "Year" },
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
*/
interface WorkExperienceFormProps {
  onClickPrev?(): void;
  onClickNext?(): void;
  onClickExit?(): void;
}

const WorkExperienceForm: React.FC<WorkExperienceFormProps> = (props) => {
  const classes = useWorkExperienceFormStyles();
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
  let workexpId =
    typeof values["workexpId"] !== "undefined" ? values["workexpId"] : 0;

  const jobtitleError =
    typeof errors["workexperience.jobtitle"] != undefined
      ? errors["workexperience.jobtitle"]
      : "";

  const jobtitle =
    typeof values["workexperience.jobtitle"] !== "undefined"
      ? values["workexperience.jobtitle"]
      : "";
  const company =
    typeof values["workexperience.company"] !== "undefined"
      ? values["workexperience.company"]
      : "";
  const citystate =
    typeof values["workexperience.citystate"] !== "undefined"
      ? values["workexperience.citystate"]
      : "";
  const currentlywork =
    typeof values["workexperience.currentlywork"] !== "undefined"
      ? values["workexperience.currentlywork"]
      : false;
  const frommonth =
    typeof values["workexperience.frommonth"] !== "undefined"
      ? values["workexperience.frommonth"]
      : "";
  const fromyear =
    typeof values["workexperience.fromyear"] !== "undefined"
      ? values["workexperience.fromyear"]
      : "";
  const tomonth =
    typeof values["workexperience.tomonth"] !== "undefined"
      ? values["workexperience.tomonth"]
      : "";
  const toyear =
    typeof values["workexperience.toyear"] !== "undefined"
      ? values["workexperience.toyear"]
      : "";
  const notes =
    typeof values["workexperience.notes"] !== "undefined"
      ? values["workexperience.notes"]
      : "";

  const country =
    typeof values["workexperience.country"] != undefined
      ? values["workexperience.country"]
      : "GB";
  const [countryName, setCountryName] = useState(
    country ? getCountryByCode(country)?.label : country
  );

  const [saveLoading, setSaveLoading] = useState(false);
  const [countryDialogOpen, setCountryDialogOpen] = useState(false);
  const [editor, setEditor] = useState("");

  const handleClickNext = (saveExit: boolean) => {
    if (hasError()) {
      return;
    }
    let data: { [key: string]: any } = {
      jobtitle,
      company,
      country,
      citystate,
      currentlywork,
      frommonth,
      fromyear,
      tomonth,
      toyear,
      notes,
    };
    data.resid = resumeId;
    if (workexpId > 0) {
      data.workexpid = workexpId;
    } else {
      data.userid = userId;
    }

    //console.log(data);

    setSaveLoading(true);
    apiClient
      .post({
        url:
          workexpId > 0
            ? endpoints.private.updateWorkExperience
            : endpoints.private.createWorkExperience,
        data,
      })
      .then((res) => {
        setSaveLoading(false);
        setValue("workexpId", 0);
        setValue("workexperience.jobtitle", "");
        setValue("workexperience.company", "");
        setValue("workexperience.citystate", "");
        setValue("workexperience.currentlywork", false);
        setValue("workexperience.frommonth", "");
        setValue("workexperience.fromyear", "");
        setValue("workexperience.tomonth", "");
        setValue("workexperience.toyear", "");
        setValue("workexperience.notes", "");
        if (saveExit) {
          if (props?.onClickExit) {
            window.localStorage.setItem("gotostep", "3");
            window.localStorage.setItem("resid", resumeId);
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
    setValue("workexpId", 0);
    setValue("workexperience.jobtitle", "");
    setValue("workexperience.company", "");
    setValue("workexperience.citystate", "");
    setValue("workexperience.currentlywork", false);
    setValue("workexperience.frommonth", "");
    setValue("workexperience.fromyear", "");
    setValue("workexperience.tomonth", "");
    setValue("workexperience.toyear", "");
    setValue("workexperience.notes", "");
    if (props?.onClickNext) {
      clearErrors();
      props?.onClickNext();
    }
  };

  const loadworkexperienceData = async () => {
    //alert('under construction...');
    if (workexpId > 0) {
      await apiClient
        .post({
          url: endpoints.private.getWorkExperience,
          data: {
            workexpid: workexpId,
          },
        })
        .then((res) => {
          if (res?.data) {
            const workexpData = res?.data?.workexpdata;
            if (typeof workexpData.country === "undefined") {
              setValue("workexperience.country", "GB");
              setCountryName("United Kingdom");
            } else {
              setValue("workexperience.country", workexpData.country);
              setCountryName(getCountryByCode(workexpData.country)?.label);
            }

            setValue("workexperience.jobtitle", workexpData.jobtitle);
            setValue("workexperience.company", workexpData.company);
            setValue("workexperience.citystate", workexpData.citystate);
            setValue("workexperience.currentlywork", workexpData.currentlywork);
            setValue("workexperience.frommonth", workexpData.frommonth);
            setValue("workexperience.fromyear", workexpData.fromyear);
            setValue("workexperience.tomonth", workexpData.tomonth);
            setValue("workexperience.toyear", workexpData.toyear);
            setValue("workexperience.notes", workexpData.notes);
            setEditor(workexpData.notes);
            if (!resumeId) {
              setValue("resumeId", workexpData.resumeid);
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
      setValue("workexperience.toyear", toyr);
    }
  };

  useEffect(() => {
    register("workexperience.jobtitle", {
      required: "Please enter Job Title!",
    });
  }, [jobtitle]);

  useEffect(() => {
    if (workexpId > 0) {
      loadworkexperienceData();
    } else {
      if (typeof values["workexperience.country"] != undefined) {
        setValue("workexperience.country", "GB");
        setCountryName("United Kingdom");
      }
      setValue("workexperience.jobtitle", "");
    }
    setValue("education.level", "nil");
    setValue("education.schoolnumber", "nil");
    clearErrors();
  }, [workexpId]);

  useEffect(() => {
    setValue("workexperience.notes", editor);
  }, [editor]);

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
        <Typography component="h2">Work experience</Typography>
        <TextInput
          label="Job title"
          required={true}
          value={jobtitle}
          onChange={(e) => setValue("workexperience.jobtitle", e.target.value)}
          type="text"
        />
        <FormError show={jobtitleError} title={jobtitleError} />
        <TextInput
          label="Company"
          required={false}
          value={company}
          onChange={(e) => setValue("workexperience.company", e.target.value)}
          type="text"
        />
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
          code={values["workexperience.country"]}
          onChange={(value: any) => {
            setValue("workexperience.country", value?.code);
            setCountryName(value?.label);
            setCountryDialogOpen(false);
          }}
        />
        <TextInput
          label="City"
          required={false}
          value={citystate}
          onChange={(e) => setValue("workexperience.citystate", e.target.value)}
          type="text"
        />
        <Typography component="h3">Time Period</Typography>

        <FormControlLabel
          control={
            <Checkbox
              checked={currentlywork}
              onChange={() =>
                setValue("workexperience.currentlywork", !currentlywork)
              }
              name="enrolled"
            />
          }
          label="I am currently work here"
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
                  setValue("workexperience.frommonth", e.target.value)
                }
                required={false}
              />
            </Grid>
            <Grid item md={6}>
              <SelectInput
                data={year_list}
                label=""
                value={fromyear}
                onChange={(e) =>
                  setValue("workexperience.fromyear", e.target.value)
                }
                required={false}
              />
            </Grid>
          </Grid>
        </Box>
        {!currentlywork && (
          <Box className="time-period">
            <Typography component="h4">To</Typography>
            <Grid container spacing={3}>
              <Grid item md={6}>
                <SelectInput
                  data={month_list}
                  label=""
                  value={tomonth}
                  onChange={(e) =>
                    setValue("workexperience.tomonth", e.target.value)
                  }
                  required={false}
                />
              </Grid>
              <Grid item md={6}>
                <SelectInput
                  data={year_list}
                  label=""
                  value={toyear}
                  //onChange={(e) => setValue("workexperience.toyear", e.target.value)}
                  onChange={(e) => handledatevalidation(e.target.value)}
                  required={false}
                />
              </Grid>
            </Grid>
          </Box>
        )}
        {/* <textarea
          style={{
            width: "100%",
            background: "#FAFAFA",
            color: "#000000",
            borderRadius: "10px",
            padding: "10px",
            resize: "none",
            marginTop:"15px",
          }}
          rows={10}
          onChange={(e) => {setValue("workexperience.notes", e.target.value)}}
          value = {notes}
        >        
        </textarea> */}
        <label htmlFor="description" className="font-[500] mt-2 pt-2 block">
          Description
        </label>
        <QuillNoSSRWrapper
          style={{ marginTop: "10px" }}
          modules={modules}
          value={editor}
          onChange={setEditor}
          formats={formats}
          theme="snow"
          id="description"
        />
        <div className="btns">
          <Button
            onClick={() => {
              handleClickNext(false);
            }}
            title={"Continue"}
            // width="180px"
            // height="60px"
            width="150px"
            height="50px"
            btnType="default"
            loading={saveLoading}
          />
          <Button
            onClick={handleClickSkip}
            title={"Skip"}
            // width="180px"
            // height="60px"
            width="150px"
            height="50px"
            btnType="border"
          />
        </div>
      </Box>
    </Box>
  );
};

export { WorkExperienceForm };
