import { Button } from "@/components/atoms/button";
import { JobPostBanner } from "@/components/layouts";
import {
  Box,
  Checkbox,
  FormControlLabel, Grid,
  Radio,
  Typography,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import React, { useEffect, useState, ChangeEvent } from "react";
import { useBasicInformationStyles } from "@/static/stylesheets/employee-job/basicInformationStyles";
import { TextInput } from "@/components/atoms/textInput";
import { SelectInput } from "@/components/atoms/select";
import Autocomplete from '@mui/material/Autocomplete';
import AddressCard from "@/components/molecules/address-card/AddressCard";
import { CountrySelectModal, getCountryByCode } from "@/components/molecules/modal/CountrySelectModal";
import { apiClient, endpoints } from "@/api";
import { useFormMethods } from "@/hooks/form";
import { FormError } from "@/components/organisms/form-error";
import { CompanyInputDialog, LanguageInputDialog } from "@/components/molecules/modal";
import { useComponentState, useInput, useThrottle } from "@/hooks";
import { useAuthInfo } from "@/hooks/custom";


interface BasicInformationProps {
  onClickPrev?(): void;

  onClickNext?(): void;

  jobid: number;
}

export const BasicInformation: React.FC<BasicInformationProps> = (props) => {
  const classes = useBasicInformationStyles();
  const { userData } = useAuthInfo();
  const { bindInput, values, register, setValue, errors, hasError, clearErrors } = useFormMethods();

  interface JobCategory {
    id: number;
    value: string;
  }

  let jobcatall: readonly JobCategory[] = [];
  const [jobcat, setJobCat] = useState(jobcatall);
  const [jobcateg, setJobCateg] = useState("");
  //const [countryName, setCountryName] = useState("");
  //setValue('basicInfo.jobCatall', jobcat);

  const userId = userData?._id;
  //const copyJobData = values['postType.copyJobData'];
  //let jobId = copyJobData && copyJobData?._id ? copyJobData?._id : values['jobId'];
  //alert(props?.jobid+' :s '+values['jobId'])
  let jobId = props?.jobid ? props?.jobid : values['jobId'];
  //console.log(jobId)
  let country = (typeof values['basicInfo.country'] !== "undefined") ? values['basicInfo.country'] : '',
  countryError = (typeof errors['basicInfo.country'] !== "undefined") ? errors['basicInfo.country'] : '';
  let language = (typeof values['basicInfo.language'] !== "undefined") ? values['basicInfo.language'] : '',
  languageError = (typeof errors['basicInfo.language'] !== "undefined") ? errors['basicInfo.language'] : '';
  let companyName = (typeof values['basicInfo.companyName'] !== "undefined") ? values['basicInfo.companyName'] : '',
  companyNameError = (typeof errors['basicInfo.companyName'] !== "undefined") ? errors['basicInfo.companyName'] : '';
  let jobTitle = (typeof values['basicInfo.jobTitle'] !== "undefined") ? values['basicInfo.jobTitle'] : '',
  jobTitleError = (typeof errors['basicInfo.jobTitle'] !== "undefined") ? errors['basicInfo.jobTitle'] : '';
  let jobcategory = (typeof values['basicInfo.jobcategory'] !== "undefined") ? values['basicInfo.jobcategory'] : '',
  jobcategoryError = (typeof errors['basicInfo.jobcategory'] !== "undefined") ? errors['basicInfo.jobcategory'] : '';
  let alterjobcategory = (typeof values['basicInfo.alterjobcategory'] !== "undefined") ? values['basicInfo.alterjobcategory'] : '';
  let specificAddress = (typeof values['basicInfo.specificAddress'] !== "undefined") ? values['basicInfo.specificAddress'] : '',
  specificAddressError = (typeof errors['basicInfo.specificAddress'] !== "undefined") ? errors['basicInfo.specificAddress'] : '';
  let hideStreet = (typeof values['basicInfo.hideStreet'] !== "undefined") ? values['basicInfo.hideStreet'] : '',
  hideStreetError = (typeof errors['basicInfo.hideStreet'] !== "undefined") ? errors['basicInfo.hideStreet'] : '';
  let streetAddress = (typeof values['basicInfo.streetAddress'] !== "undefined") ? values['basicInfo.streetAddress'] : '',
  streetAddressError = (typeof errors['basicInfo.streetAddress'] !== "undefined") ? errors['basicInfo.streetAddress'] : '';
  let city = (typeof values['basicInfo.city'] !== "undefined") ? values['basicInfo.city'] : '',
  cityError = (typeof errors['basicInfo.city'] !== "undefined") ? errors['basicInfo.city'] : '';
  let postCode = (typeof values['basicInfo.postCode'] !== "undefined") ? values['basicInfo.postCode'] : '',
  postCodeError = (typeof errors['basicInfo.postCode'] !== "undefined") ? errors['basicInfo.postCode'] : '';
  let location = (typeof values['basicInfo.location'] !== "undefined") ? values['basicInfo.location'] : '',
  locationError = (typeof errors['basicInfo.location'] !== "undefined") ? errors['basicInfo.location'] : '';
  let localLangReq = (typeof values['basicInfo.localLangReq'] !== "undefined") ? values['basicInfo.localLangReq'] : '';
  let langTraining = (typeof values['basicInfo.langTraining'] !== "undefined") ? values['basicInfo.langTraining'] : '';
  let getcountryname = country ? getCountryByCode(country)?.label : country;
  const [countryName, setCountryName] = useState(getcountryname);

  
  const {
    state: {
      countryDialogOpen,
      languageDialogOpen,
      companyNameDialogOpen,
      jobSaveLoading,
      categoryDialogOpen,
    },
    setState,
  } = useComponentState({
    countryDialogOpen: false,
    languageDialogOpen: false,
    companyNameDialogOpen: false,
    jobSaveLoading: false,
    categoryDialogOpen: true,
  });

  const prepareAddress = () => {
    let address_array: any = [];
    if (specificAddress === "yes") {
      address_array = [{ "streetaddress": (hideStreet) ? "" : streetAddress }, { "city": city ?? "" }, { "postcode": postCode ?? "" }];
    }
    return address_array;
  };

  const address = prepareAddress();

  const createOrUpdateJob = () => {
    let data: { [key: string]: any } = {
      country,
      language,
      companyname: companyName,
      employerid: userId,
      jobtitle: jobTitle,
      locallangreq: false,
      langtraining: false,
      jobcategory: jobcateg,
      alterjobcategory: alterjobcategory,
      address: address,
      adlocation: (address.length > 0) ? city : location,
    };
    if (jobId) {
      data.jobid = jobId;
    }
    console.log(data);
    setState({ jobSaveLoading: true });
    apiClient.post({
      url: jobId ? endpoints.private.updateJob : endpoints.private.createJob,
      data,
    }).then((res) => {
      setState({ jobSaveLoading: false });

      if (res) {
        if (!jobId) {
          setValue("jobId", res?.data?.jobid);
        }
      }
      if (props?.onClickNext) {
        clearErrors();
        props?.onClickNext();
      }
    }).catch(() => {
      setState({ jobSaveLoading: false });
    });
  };

  const handleClickNext = () => {

    //setValue("basicInfo.jobTitle", jobTitle+'1');

    //console.log('after error clear');
    //console.log(JSON.stringify(values));
    if (hasError()) {
      //alert('inside test'+hasError)
      alert(JSON.stringify(errors));
      return;
    }
    createOrUpdateJob();

    /*if (props?.onClickNext) {
      clearErrors();
      props?.onClickNext();
    }*/
  };

  /*useEffect(() => {
    setValue("basicInfo.address", address);
  }, [address]);

  useEffect(() => {
    if (copyJobData) {
      setValue("basicInfo.jobTitle", copyJobData?.jobtitle);
      setValue("basicInfo.country", copyJobData?.country);
      setValue("basicInfo.language", copyJobData?.language);
      setValue("basicInfo.companyName", copyJobData?.companyname);
      if (copyJobData?.address) {
        setValue("basicInfo.specificAddress", "no");
        setValue("basicInfo.location", copyJobData?.address);
      }
      setValue("basicInfo.langTraining", copyJobData?.langtraining);
      setValue("basicInfo.localLangReq", copyJobData?.locallangreq);
    }
  }, [copyJobData]);*/

  useEffect(() => {    
    const timeout = setTimeout(() => {
      //console.log('loaded validation');
      //console.log(JSON.stringify(values));
      //console.log(jobTitle+'/'+country+'/'+language+'/'+jobcategory+'/'+alterjobcategory+'/'+location+'/'+langTraining+'/'+localLangReq+'/'+jobId);
      register("basicInfo.country", {
        //required: "Please select country!",
        validate(value: any): string | true {
        if (!value || value?.trim() === "") {
          return "Please select country!";
        }
        return true;
      }
      });
      register("basicInfo.language", {
        required: "Please enter language!",
      });
      register("basicInfo.companyName", {
        required: "Please enter company name!",
      });
      register("basicInfo.jobTitle", {
        required: "Please enter job title!",
      });
      register("basicInfo.jobcategory", {
        required: "Please enter job category!",
      });
      register("basicInfo.specificAddress", {
        required: "Please select address type!",
      });
      register("basicInfo.hideStreet", {
        validate(value: any): string | true {
          if ((specificAddress === "yes") && (!value || value?.trim() === "")) {
            return "Please select street option!";
          }
          return true;
        }
      });
      register("basicInfo.streetAddress", {
        validate(value: any): string | true {
          //alert(specificAddress+": :"+hideStreet+": :"+(!value || value?.trim())+":");
          if ((specificAddress === "yes") && (hideStreet === "no") && (!value || value?.trim() === "")) {
            return "Please enter street address!";
          }
          return true;
        }
      });
      register("basicInfo.city", {
        validate(value: any): string | true {
          if ((specificAddress === "yes") && (hideStreet !== "") && (!value || value?.trim() === "")) {
            return "Please enter city!";
          }
          return true;
        }
      });
      register("basicInfo.postCode");
      register("basicInfo.location", {
        validate(value: any): string | true {
          if (specificAddress === "no" && (!value || value?.trim() === "")) {
            return "Please enter location!";
          }
          return true;
        }
      });
      register("basicInfo.localLangReq");
      register("basicInfo.langTraining");
    }, 1000)
    return () => clearTimeout(timeout)
  }, [specificAddress, hideStreet]);

  const loadjobData = async () => {
    
    console.log(JSON.stringify(values));
    jobId = props?.jobid ? props?.jobid : values['jobId'];
    //console.log("return job id");    
    if (jobId) {
      console.log('If job id: '+jobId);
      //console.log("inside job id"); 
      await apiClient.post({
        url: endpoints.private.getJob,
        data: {
          jobid: jobId,
        }
      }).then((res) => {
        //console.log("return result of basic data");
        if (res?.data) {
          const jobData = res?.data?.job;
          //console.log(JSON.stringify(jobData));
          /*let jobcatnew = [];
          for(var jd = 0; jd < jobData.length; jd++){
            jobcatnew.push({ id: jobData[jd].jobcategoryname, value: jobData[jd].jobcategoryname} )
          }
          jobcatnew.push({ id: "Others", value: "Others"} )
          setJobCat(jobcatnew);*/
          setValue("basicInfo.jobTitle", jobData.jobtitle);
          setValue("basicInfo.country", jobData.country);
          setValue("basicInfo.language", jobData.language);
          setValue("basicInfo.jobcategory", jobData.jobcategory);
          setJobCateg(jobData.jobcategory);
          if (typeof jobData.alterjobcategory !== "undefined") {
            setValue("basicInfo.alterjobcategory", jobData.alterjobcategory);
          } else {
            setValue("basicInfo.alterjobcategory", "");
          }
          setValue("basicInfo.companyName", jobData.companyname);
          if (jobData.address.length > 0) {
            setValue("basicInfo.specificAddress", "yes");
            setValue("basicInfo.hideStreet", (jobData.address[0].streetaddress != "") ? "no" : "yes");
            setValue("basicInfo.streetAddress", jobData.address[0].streetaddress);
            setValue("basicInfo.city", jobData.address[1].city);
            setValue("basicInfo.postCode", jobData.address[2].postcode);
            setValue("basicInfo.location", '');
          } else {
            setValue("basicInfo.specificAddress", "no");
            setValue("basicInfo.location", jobData.adlocation);
          }
          setValue("basicInfo.langTraining", jobData.langtraining);
          setValue("basicInfo.localLangReq", jobData.locallangreq);
          if (typeof values['jobId'] == undefined) {
            setValue("jobId", jobId);
          }
          //console.log('job id based data');
          //console.log(JSON.stringify(values));
          //console.log(jobTitle+'/'+country+'/'+language+'/'+jobcategory+'/'+alterjobcategory+'/'+location+'/'+langTraining+'/'+localLangReq+'/'+jobId);

        }
      }).catch(() => {
      });
    }
    if (typeof values['basicInfo.companyName'] === "undefined") setValue("basicInfo.companyName", userData?.companyname);
    if (typeof values['basicInfo.language'] === "undefined") setValue("basicInfo.language", 'English');
    if (typeof values['basicInfo.country'] === "undefined") {
      setValue("basicInfo.country", 'UK');
      setCountryName("United Kingdom");
    }
  };
  const listjobCategory = async () => {
    await apiClient.get({
      url: endpoints.private.getalljobCategory
    }).then((res) => {
      if (res?.data) {
        const jobData = res?.data?.job;
        let jobcatnew = [];
        for (var jd = 0; jd < jobData.length; jd++) {
          jobcatnew.push({ id: jobData[jd].jobcategoryname, value: jobData[jd].jobcategoryname });
        }
        jobcatnew.push({ id: "Others", value: "Others" });
        setJobCat(jobcatnew);
      }
    }).catch(() => {
    });


  };

  const handleHideStreet = (option: any) => {
    setValue("basicInfo.hideStreet", option);
  };

  useEffect(() => {
    listjobCategory();
  }, []);

  useEffect(() => {
    loadjobData();
  }, [jobId]);

  return (

    <Box className={classes.root}>
      <JobPostBanner title="Provide basic information" />
      <Box className="box">
        <Typography component="h5">
          Country: <span>{countryName}</span>
          <CreateIcon
            style={{ fontSize: 16 }}
            onClick={() => setState({ countryDialogOpen: true })}
          />
        </Typography>
        <Typography component="h5">
          Language: <span>{language}</span>
          <CreateIcon
            style={{ fontSize: 16 }}
            onClick={() => setState({ languageDialogOpen: true })}
          />
        </Typography>
        <Typography component="h5">
          Company name: <span>{companyName}</span>
          <CreateIcon
            style={{ fontSize: 16 }}
            onClick={() => setState({ companyNameDialogOpen: true })}
          />
        </Typography>

        <FormError
          show={countryError || languageError || companyNameError}
          title={countryError || languageError || companyNameError}
          style={{ marginTop: 10 }}
        />
      </Box>

      <Box className="box">
        <TextInput
          label="Job Title"
          required={true}
          value={jobTitle}
          type="text"
          containerStyle={{ marginTop: 0 }}
          onChange={(e) => {
            setValue("basicInfo.jobTitle", e.target.value);
          }}
          error={jobTitleError}
          hint={jobTitleError}
          labelStyle={{ paddingTop: 0 }}
        />
        <SelectInput
          label="Job Category"
          required={true}
          value={jobcateg}
          data={jobcat}
          onChange={(e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            const inputValue = e.target.value;
            setValue("basicInfo.jobcategory", inputValue);
            setJobCateg(inputValue);
            setState({ categoryDialogOpen: false });
          }}
          wrapperStyle={{ display: "block" }}
          selectStyle={{ fontSize: "15px" }}
        />
        {jobcateg === 'Others' && (
          <TextInput
            label="Alternate Job Category"
            required={true}
            type="text"
            value={alterjobcategory}
            onChange={(e) => {
              setValue("basicInfo.alterjobcategory", e.target.value);
            }}
          />
        )}
        <FormError show={jobcategoryError} title={jobcategoryError} />
      </Box>
      <Box className="box">
        <Typography component="h2">
          Where will an employee report to work?
          <span style={{ color: "red", marginLeft: "5px" }}>*</span>
        </Typography>
        <Box className="radio-box">
          <FormControlLabel
            value="yes"
            control={<Radio />}
            label="Employee will report to a specific address"
            onClick={() => setValue("basicInfo.specificAddress", "yes")}
            checked={(specificAddress === "yes")}
          />
        </Box>
        <Box className="radio-box">
          <FormControlLabel
            value="no"
            control={<Radio />}
            label="Employee will not report to a specific address"
            onClick={() => setValue("basicInfo.specificAddress", "no")}
            checked={(specificAddress === "no")}
          />
        </Box>

        <FormError show={specificAddressError} title={specificAddressError} />

        {specificAddress === "yes" && (
          <Box className={"address-card-container"}>
            <Grid container spacing={3}>
              <Grid item md={6}>
                <AddressCard
                  value="no"
                  checked={(hideStreet === "no")}
                  onClick={handleHideStreet}
                  title={"Yes, include street address"}
                />
              </Grid>
              <Grid item md={6}>
                <AddressCard
                  value="yes"
                  checked={(hideStreet === "yes")}
                  onClick={handleHideStreet}
                  title={"No, don’t include street address"}
                />
              </Grid>
            </Grid>
            <FormError show={hideStreetError} title={hideStreetError} />
            {(hideStreet === "yes" || hideStreet === "no") && (
              <Box className={"address-input"}>
                {hideStreet === "no" && (
                  <>
                    <Typography component={"h2"}>
                      Street address
                      <span style={{ color: "red", marginLeft: "5px" }}>*</span>
                    </Typography>
                    <Typography component={"span"}>We’ll include this information in your job post.</Typography>
                    <TextInput
                      type={'text'}
                      label={"Street Address"}
                      required={true}
                      value={streetAddress}
                      onChange={(e) => {
                        setValue("basicInfo.streetAddress", e.target.value);
                      }}
                      error={streetAddressError}
                      hint={streetAddressError}
                    />
                  </>
                )}
                <Grid container spacing={3}>
                  <Grid item md={7}>
                    <TextInput
                      type={'text'}
                      required={true}
                      label={"City"}
                      value={city}
                      onChange={(e) => {
                        setValue("basicInfo.city", e.target.value);
                      }}
                      error={cityError}
                      hint={cityError}
                    />
                  </Grid>
                  <Grid item md={5}>
                    <TextInput
                      type={'text'}
                      label={"Postcode"}
                      value={postCode}
                      onChange={(e) => {
                        setValue("basicInfo.postCode", e.target.value);
                      }}
                      error={postCodeError}
                      hint={postCodeError}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}
          </Box>
        )}

        {specificAddress === "no" && (
          <Box className={"not-report"}>
            <Typography component={"h2"}>Where would you like to advertise this job?<span
              style={{ color: "red" }}>*</span></Typography>
            <Typography>Enter your location</Typography>
            <TextInput
              type={'text'}
              value={location}
              onChange={(e) => {
                setValue("basicInfo.location", e.target.value);
              }}
              error={locationError}
              hint={locationError}
            />
          </Box>
        )}

      </Box>
      {/*<Box className="box">
        <Typography component="h2">
          Is the local language required to perform this job?
        </Typography>
        <Typography style={{ paddingBottom: "20px" }}>
          Indeed is committed to helping refugees from Ukraine and other
          countries get jobs. If the local language is not required for this
          role, please consider including that in your job post.
        </Typography>

        <FormControlLabel
          control={
            <Checkbox
              checked={!!localLangReq}
              onClick={() => setValue("basicInfo.localLangReq", !localLangReq)}
            />
          }
          label="English not required"
        />

        <Typography component="h2" style={{ padding: "20px 0" }}>
          Is language training provided for employees?
        </Typography>
        <FormControlLabel
          control={
            <Checkbox
              checked={!!langTraining}
              onClick={() => setValue("basicInfo.langTraining", !langTraining)}
            />
          }
          label="Language training provided"
        />
      </Box>*/}
      <Box className="bottom">
        <Button
          onClick={handleClickNext}
          title="Continue"
          width="170px"
          height="60px"
          loading={jobSaveLoading}
          sx={{
            marginTop: "0 !important",

            "& button": {
              height: "50px !important",
              width: "130px !important"
            }
          }}
        />
      </Box>
      <CountrySelectModal
        open={countryDialogOpen}
        onClose={() => setState({ countryDialogOpen: false })}
        code={values['basicInfo.country']}
        onChange={(value: any) => {
          setValue("basicInfo.country", value?.code);
          setCountryName(value?.label);
        }}
      />

      <LanguageInputDialog
        open={languageDialogOpen}
        value={language}
        onChange={(value) => setValue("basicInfo.language", value)}
        onClose={() => setState({ languageDialogOpen: false })}
      />

      <CompanyInputDialog
        open={companyNameDialogOpen}
        value={companyName}
        onChange={(value) => setValue("basicInfo.companyName", value)}
        onClose={() => setState({ companyNameDialogOpen: false })}
      />
    </Box>
  );
};
