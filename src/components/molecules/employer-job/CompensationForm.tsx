import { Button } from "@/components/atoms/button";
import { JobPostBanner } from "@/components/layouts";
import { useJObPostTypeStyles } from "@/static/stylesheets/employee-job/jobPostTypeStyles";
import {
  Box,
  Checkbox,
  FormControlLabel,
  Grid,
  Radio,
  Typography,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import React, { useEffect, useState, ChangeEvent } from "react";
import AddIcon from "@mui/icons-material/Add";
import { TextInput } from "@/components/atoms/textInput";
import RemoveIcon from '@mui/icons-material/Remove';
//import { useJobDetailsStyles } from "@/static/stylesheets/employee-job/employeeJobDetailsStyles";
import { ChipBox } from "@/components/atoms/chip";
import { SelectInput } from "@/components/atoms/select";
import { useCompensationFormStyles } from "@/static/stylesheets/employee-job/compensationFormStyles";
import ErrorOutlineRoundedIcon from "@mui/icons-material/ErrorOutlineRounded";
import KeyboardArrowDownRoundedIcon from "@mui/icons-material/KeyboardArrowDownRounded";
import CheckRoundedIcon from "@mui/icons-material/CheckRounded";
import { apiClient, endpoints } from "@/api";
import { useFormMethods } from "@/hooks/form";
import { FormError } from "@/components/organisms/form-error";

interface CompensationFormProps {
  onClickPrev?(): void;

  onClickNext?(): void;

  jobid: number;
}

export const CompensationForm: React.FC<CompensationFormProps> = (props) => {
  const classes = useCompensationFormStyles();

  const { bindInput, values, register, unregister, setValue, errors, hasError, clearErrors } = useFormMethods();

  interface SupplementalPay {
    value: string;
    selected: boolean;
  }

  interface BenefitsOffered {
    value: string;
    selected: boolean;
  }

  interface paybyComp {
    id: string;
    value: string;
  }

  interface paybyPeriod {
    id: string;
    value: string;
  }

  let supplementalpayall: readonly SupplementalPay[] = [];
  const [supplementalPay, setSupplementalPay] = useState(supplementalpayall);

  let benefitsofferedall: readonly BenefitsOffered[] = [];
  const [benefitsOffered, setBenefitsOffered] = useState(benefitsofferedall);


  const [dataloaded, setDataLoaded] = useState(false);
  const [supplementloaded, setSupplementLoaded] = useState(false);
  const [benefitsloaded, setBenefitsLoaded] = useState(false);

  const showpaybycomp: readonly paybyComp[] = [
    { id: 'range', value: 'range' },
    { id: 'maximum amount', value: 'maximum amount' },
    { id: 'exact amount', value: 'exact amount' },
  ]
  const [shwpaybycomp, setShowpaybyComp] = useState(showpaybycomp);

  const spaybyperiod: readonly paybyPeriod[] = [
    { id: 'per year', value: 'per year' },
    { id: 'per month', value: 'per month' },
  ]
  const [shpaybyperiod, setShpaybyPeriod] = useState(spaybyperiod);


  let jobId = props?.jobid ? props?.jobid : values['jobId'];
  const supplementalpays = (typeof values['addcompensation.supplementalpays'] != undefined) ? values['addcompensation.supplementalpays'] : '',
    supplementalpaysError = (typeof errors['addcompensation.supplementalpays'] != undefined) ? errors['addcompensation.supplementalpays'] : '';
  const benefitsoffereds = (typeof values['addcompensation.benefitsoffereds'] != undefined) ? values['addcompensation.benefitsoffereds'] : '',
    benefitsofferedsError = (typeof errors['addcompensation.benefitsoffereds'] != undefined) ? errors['addcompensation.benefitsoffereds'] : '';
  const showpayby = (typeof values['addcompensation.showpayby'] != undefined) ? values['addcompensation.showpayby'] : '',
    showpaybyError = (typeof errors['addcompensation.showpayby'] != undefined) ? errors['addcompensation.showpayby'] : '';
  const minimum = (typeof values['addcompensation.minimum'] != undefined) ? values['addcompensation.minimum'] : '',
    minimumError = (typeof errors['addcompensation.minimum'] != undefined) ? errors['addcompensation.minimum'] : '';
  const maximum = (typeof values['addcompensation.maximum'] != undefined) ? values['addcompensation.maximum'] : '',
    maximumError = (typeof errors['addcompensation.maximum'] != undefined) ? errors['addcompensation.maximum'] : '';
  const period = (typeof values['addcompensation.period'] != undefined) ? values['addcompensation.period'] : '',
    periodError = (typeof errors['addcompensation.period'] != undefined) ? errors['addcompensation.period'] : '';
  const amount = (typeof values['addcompensation.amount'] != undefined) ? values['addcompensation.amount'] : '',
    amountError = (typeof errors['addcompensation.amount'] != undefined) ? errors['addcompensation.amount'] : '';

  const preparePayrate = () => {
    let payrate_array: any = [];
    if (typeof minimum != "undefined") {
      payrate_array = [{ "showpayby": showpayby ?? "" }, { "minimum": minimum ?? "" }, { "maximum": maximum ?? "" }, { "period": period ?? "" }];
    } else {
      payrate_array = [{ "showpayby": showpayby ?? "" }, { "amount": amount ?? "" }, { "period": period ?? "" }];
    }
    return payrate_array;
  };

  const payrate = preparePayrate();

  const handleSelectSupplementalPay = (selectedItem: any) => {
    let supplementalnew = [];
    let supplementalstr = "";
    for (var jd = 0; jd < supplementalPay.length; jd++) {
      if (supplementalPay[jd].value == selectedItem) {
        supplementalnew.push({
          "value": supplementalPay[jd].value,
          "selected": (!supplementalPay[jd].selected) ? true : false
        })
        if (!supplementalPay[jd].selected) {
          if (supplementalstr != "") {
            supplementalstr += ",";
          }
          supplementalstr += supplementalPay[jd].value;
        }
      } else {
        supplementalnew.push({ "value": supplementalPay[jd].value, "selected": supplementalPay[jd].selected })
        if (supplementalPay[jd].selected) {
          if (supplementalstr != "") {
            supplementalstr += ",";
          }
          supplementalstr += supplementalPay[jd].value;
        }
      }
    }
    setSupplementalPay(supplementalnew);
    setValue("addcompensation.supplementalpays", supplementalstr);
  };

  const handleSelectBenefitsOffered = (selectedItem: any) => {
    let benefitsofferednew = [];
    let benefitsofferedstr = "";
    for (var jd = 0; jd < benefitsOffered.length; jd++) {
      if (benefitsOffered[jd].value == selectedItem) {
        benefitsofferednew.push({
          "value": benefitsOffered[jd].value,
          "selected": (!benefitsOffered[jd].selected) ? true : false
        })
        if (!benefitsOffered[jd].selected) {
          if (benefitsofferedstr != "") {
            benefitsofferedstr += ",";
          }
          benefitsofferedstr += benefitsofferednew[jd].value;
        }
      } else {
        benefitsofferednew.push({ "value": benefitsOffered[jd].value, "selected": benefitsOffered[jd].selected })
        if (benefitsOffered[jd].selected) {
          if (benefitsofferedstr != "") {
            benefitsofferedstr += ",";
          }
          benefitsofferedstr += benefitsofferednew[jd].value;
        }
      }
    }
    setBenefitsOffered(benefitsofferednew);
    setValue("addcompensation.benefitsoffereds", benefitsofferedstr);
  };

  const createOrUpdateJob = () => {
    let supplementalpaysel = [];
    for (var jd = 0; jd < supplementalPay.length; jd++) {
      if (supplementalPay[jd].selected) {
        supplementalpaysel.push(supplementalPay[jd].value);
      }
    }

    let benefitofferedsel = [];
    for (var jd = 0; jd < benefitsOffered.length; jd++) {
      if (benefitsOffered[jd].selected) {
        benefitofferedsel.push(benefitsOffered[jd].value);
      }
    }

    let data: { [key: string]: any } = {
      payrate: payrate,
      supplementalpay: supplementalpaysel,
      benefitsoffered: benefitofferedsel,
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
      }
      if (props?.onClickNext) {
        clearErrors();
        props?.onClickNext();
      }
    }).catch(() => {
      //setState({ jobSaveLoading: false });
    });
  };

  const handleClickNext = () => {
    if (hasError()) {
      return;
    }
    let min = Number(minimum);
    let max = Number(maximum);
    if(min > max){
      alert("The Maximum Amount must be Greater than Minimum Amount");
      return false;
    } else {
      createOrUpdateJob();
    }
  };

  const handleClickBack = () => { 
    unregister("addcompensation.showpayby");
    unregister("addcompensation.minimum");
    unregister("addcompensation.maximum");
    unregister("addcompensation.amount");
    unregister("addcompensation.period");
    unregister("addcompensation.supplementalpays");
    unregister("addcompensation.benefitsoffereds");
    
    if (props?.onClickPrev) {
      clearErrors();
      props?.onClickPrev();
    }
  };

  useEffect(() => {
    register("addcompensation.showpayby", {
      required: "Please select show by range or maximum or exact amount!",
    });

    register("addcompensation.minimum", {
      validate(value: any): string | true {
        if (showpayby === "range" && (!value || value?.trim() === "")) {
          return "Please enter the minimum amount!";
        }
        return true;
      }
    });

    register("addcompensation.maximum", {
      validate(value: any): string | true {
        if ((showpayby === "range") && (!value || value?.trim() === "")) {
          return "Please enter the maximum amount!";
        }
        return true;
      }
    });

    register("addcompensation.amount", {
      validate(value: any): string | true {
        if ((showpayby === "maximum amount" || showpayby === "exact amount") && (!value || value?.trim() === "")) {
          return "Please enter the amount!";
        }
        return true;
      }
    });

    register("addcompensation.period", {
      required: "Please select period!",
    });
    register("addcompensation.supplementalpays", {
      required: "Please select suppplemental pay!",
    });
    register("addcompensation.benefitsoffereds", {
      required: "Please select benefit offered!",
    });
  }, [supplementalpays, benefitsoffereds]);

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
          setValue("addcompensation.supplementalpays", jobData.supplementalpay.join(','));
          setValue("addcompensation.benefitsoffereds", jobData.benefitsoffered.join(','));
          setValue("addcompensation.showpayby", jobData.payrate[0].showpayby);
          if (jobData.payrate[0].showpayby == "range") {
            setValue("addcompensation.minimum", jobData.payrate[1].minimum);
            setValue("addcompensation.maximum", jobData.payrate[2].maximum);
            setValue("addcompensation.period", jobData.payrate[3].period);
          } else if (jobData.payrate[0].showpayby == "maximum amount" || jobData.payrate[0].showpayby == "exact amount") {
            setValue("addcompensation.amount", jobData.payrate[1].amount);
            setValue("addcompensation.period", jobData.payrate[2].period);
          }

          setDataLoaded(true);
        }
      }).catch(() => {
      });
    }
  }

  const listsupplementalPay = async () => {
    await apiClient.get({
      url: endpoints.private.getallsupplementalpay
    }).then((res) => {
      if (res?.data) {
        const supplementalpayData = res?.data?.supplementalpay;
        let supplementalpaynew = [];
        for (var jd = 0; jd < supplementalpayData.length; jd++) {
          supplementalpaynew.push({ "value": supplementalpayData[jd].supplementalpay, "selected": false })
        }
        setSupplementalPay(supplementalpaynew);
        setSupplementLoaded(true);
      }
    }).catch(() => {
    });
  };

  const listbenefitsOffered = async () => {
    await apiClient.get({
      url: endpoints.private.getallbenefitsoffered
    }).then((res) => {
      if (res?.data) {
        const benefitsofferedData = res?.data?.benefitsoffered;
        let benefitsofferednew = [];
        for (var jd = 0; jd < benefitsofferedData.length; jd++) {
          benefitsofferednew.push({ "value": benefitsofferedData[jd].benefitsoffers, "selected": false })
        }
        setBenefitsOffered(benefitsofferednew);
        setBenefitsLoaded(true);
      }
    }).catch(() => {
    });
  };

  const loadsupplementalPays = () => {
    //alert(supplementalpays+'/'+dataloaded+'/'+supplementloaded)
    if (typeof supplementalpays !== "undefined" && dataloaded && supplementloaded) {
      var jobArr = values["addcompensation.supplementalpays"].split(',');
      if (jobArr.length > 0) {
        let jobtypenew1: SupplementalPay[] = [];
        var flasecnt = 0;
        //alert(JSON.stringify(jobType));
        for (var jd = 0; jd < supplementalPay.length; jd++) {
          if (!supplementalPay[jd].selected) flasecnt++;
          if (jobArr.includes(supplementalPay[jd].value)) {
            jobtypenew1.push({ "value": supplementalPay[jd].value, "selected": true });
          } else {
            jobtypenew1.push({ "value": supplementalPay[jd].value, "selected": false });
          }
        }
        if (flasecnt == supplementalPay.length) {
          setSupplementalPay(jobtypenew1);
          ///alert(JSON.stringify(jobtypenew1));
          clearInterval(supplementalinterval);
        }
      }
    }
  }
  var supplementalinterval = setInterval(loadsupplementalPays, 1000);

  const loadbenefitsoffereds = () => {
    if (typeof benefitsoffereds !== "undefined" && dataloaded && benefitsloaded) {
      var jobArr = values["addcompensation.benefitsoffereds"].split(',');
      if (jobArr.length > 0) {
        let jobtypenew1: BenefitsOffered[] = [];
        var flasecnt = 0;
        //alert(JSON.stringify(jobType));
        for (var jd = 0; jd < benefitsOffered.length; jd++) {
          if (!benefitsOffered[jd].selected) flasecnt++;
          if (jobArr.includes(benefitsOffered[jd].value)) {
            jobtypenew1.push({ "value": benefitsOffered[jd].value, "selected": true });
          } else {
            jobtypenew1.push({ "value": benefitsOffered[jd].value, "selected": false });
          }
        }
        if (flasecnt == benefitsOffered.length) {
          setBenefitsOffered(jobtypenew1);
          //alert(JSON.stringify(jobtypenew1));
          clearInterval(benefitsinterval);
        }
      }
    }
  }
  var benefitsinterval = setInterval(loadbenefitsoffereds, 1000);
  
  const handlemaxminrange = () => {
    let min = Number(minimum);
    let max = Number(maximum);
    if(min > max){
      alert("The Maximum Amount must be Greater than Minimum Amount");
      return false;
    }   
  }

  useEffect(() => {
    listsupplementalPay();
    listbenefitsOffered();
  }, []);

  useEffect(() => {
    loadjobData();
  }, [jobId]);

  return (
    <Box className={classes.root}>
      <JobPostBanner title="Add compensation" />
      <Box className="box">
        <Typography component="h2">What is the pay rate or range? <span style={{ color: "red" }}>*</span></Typography>
        <Typography
          sx={{
            display: "flex",
            gap: "20px",
            "& svg": { color: "#6D5086" },
          }}
        >
          Review the pay we estimated for your job and make adjustments <br />
          if needed. <ErrorOutlineRoundedIcon />
        </Typography>
        <Grid container spacing={4}>
          <Grid item md={4} sm={4} xs={12}>
            <SelectInput
              label="Show pay by"
              data={shwpaybycomp}
              value={values['addcompensation.showpayby']}
              onChange={(e) => {
                setValue("addcompensation.showpayby", e.target.value)
              }}
            />
          </Grid>
        </Grid>
        <Grid container spacing={2}>
          <Grid item md={5} sm={5} xs={12} style={{ display: "flex", alignItems: "center", gap: "20px" }}>
            {values['addcompensation.showpayby'] === "range" && (
              <>
                <TextInput
                  label="Minimum"
                  type="text"
                  onChange={(e) => {
                    setValue("addcompensation.minimum", e.target.value)
                  }} value={minimum}
                />
                <span style={{ paddingTop: "60px" }}>To</span>
                <TextInput
                  label="Maximum"
                  type="text"
                  value={maximum}
                  onChange={(e) => { setValue("addcompensation.maximum", e.target.value);  }} //handlemaxminrange();
                  onBlur={handlemaxminrange}
                />
              </>
            )}
            {(values['addcompensation.showpayby'] === "maximum amount" || values['addcompensation.showpayby'] === "exact amount") && (
              <TextInput
                label="Amount"
                type="text"
                onChange={(e) => {
                  setValue("addcompensation.amount", e.target.value)
                }} value={amount}
              />
            )}
          </Grid>
          { /*<Grid item md={4} sm={4} xs={12}>

          </Grid>
          <Grid item md={4} sm={4} xs={12}>

        </Grid> */}
          <Grid item md={4} sm={4} xs={12}>
            {(typeof values['addcompensation.showpayby'] !== "undefined") && (values['addcompensation.showpayby'] !== "") && (
              <SelectInput
                label="Period"
                data={shpaybyperiod}
                value={values['addcompensation.period']}
                onChange={(e) => {
                  setValue("addcompensation.period", e.target.value)
                }}
              />
            )}
          </Grid>
        </Grid>
        <FormError show={showpaybyError} title={showpaybyError} />
        <FormError show={minimumError} title={minimumError} />
        <FormError show={maximumError} title={maximumError} />
        <FormError show={amountError} title={amountError} />
        <FormError show={periodError} title={periodError} />
      </Box>
      <Box className="box">
        <Typography component="h2">
          Do you offer any of the following supplemental pay?<span style={{ color: "red" }}>*</span>
        </Typography>
        <Box className="chip">
          {supplementalPay && supplementalPay.length > 0 && supplementalPay.map((row: any) => (
            <ChipBox
              key={row?.value}
              label={row?.value}
              selectType={(item) => handleSelectSupplementalPay(item)}
              icon={row?.selected ? <RemoveIcon /> : <AddIcon />}
              selected={row?.selected}
            />
          ))}
          { /*<ChipBox label="Tips" icon={<AddIcon />} bg={false} />
          <ChipBox label="Commission pay" icon={<AddIcon />} bg={false} />
          <ChipBox label="Signing bonus" icon={<AddIcon />} bg={false} />
          <ChipBox label="Loyalty bonus" icon={<AddIcon />} bg={false} />
        <ChipBox label="Performance bonus" icon={<AddIcon />} bg={false} /> */}
        </Box>
        <Typography
          component="p"
          style={{
            paddingTop: "20px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          { /*4 more <KeyboardArrowDownRoundedIcon /> */}
        </Typography>
        <FormError show={supplementalpaysError} title={supplementalpaysError} />
      </Box>
      <Box className="box">
        <Typography component="h2">
          Are any of the following benefits offered?<span style={{ color: "red" }}>*</span>
        </Typography>
        <Box className="chip">
          {benefitsOffered && benefitsOffered.length > 0 && benefitsOffered.map((row: any) => (
            <ChipBox
              key={row?.value}
              label={row?.value}
              selectType={(item) => handleSelectBenefitsOffered(item)}
              icon={<AddIcon />}
              selected={row?.selected}
            />
          ))}
          { /*<ChipBox
            label="Work from home"
            icon={<CheckRoundedIcon />}
            bg={true}
          />
          <ChipBox
            label="Discounted or free food"
            icon={<AddIcon />}
            bg={false}
          />
          <ChipBox
            label="On-site parking"
            icon={<CheckRoundedIcon />}
            bg={true}
          />
          <ChipBox label="Profit sharing" icon={<AddIcon />} bg={false} />
        <ChipBox label="Company car" icon={<AddIcon />} bg={false} /> */}
        </Box>
        <Typography
          component="p"
          style={{
            paddingTop: "20px",
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
          }}
        >
          { /*22 more <KeyboardArrowDownRoundedIcon /> */}
        </Typography>
        <FormError show={benefitsofferedsError} title={benefitsofferedsError} />
      </Box>

      <Box className="bottom">
        <Button
          onClick={handleClickBack}
          title="< Back"
          width="170px"
          height="60px"
          btnType="border"
          sx={{
            marginTop: "0 !important",

            "& button": {
              height: "50px !important",
              width: "130px !important"
            }
          }}
        />
        <Button
          onClick={handleClickNext}
          title="Save & Continue"
          width="220px"
          height="60px"
          sx={{
            marginTop: "0 !important",

            "& button": {
              height: "50px !important",
              width: "170px !important"
            }
          }}
        />
      </Box>
    </Box>
  );
};
