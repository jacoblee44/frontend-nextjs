import { useEmployeeAccountStyles } from "@/static/stylesheets";
import { Box, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import infoIcon from "@/static/images/icons/info.png";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Image from "next/image";
import { TextInput } from "@/components/atoms/textInput";
import { SelectInput } from "@/components/atoms/select";
import { Button } from "@/components/atoms/button";
import { AdminLayout } from "@/components/layouts";
import { useAppSelector, useInput } from "@/hooks";
import { createEmployer, clearCreateEmployerResponse, storeAuthInfo } from "@/redux/actions";
import { CORRELATION_IDS, selectHttpState } from "@/redux/reducers/http";
import { useAuthInfo } from "@/hooks/custom";
import { AuthService } from "@/services/auth";
import toast from "react-hot-toast";
import { json } from "stream/consumers";
import { useRouter } from "next/router";
import { routePaths } from "@/config";
import { convertToNumber } from "@/utils";

const selectData = [
  { id: "0-5", value: "0-5" },
  { id: "5-10", value: "5-10" },
  { id: "10-15", value: "10-15" },
];

const selecthearData = [
  { id: "Search Engine", value: "Search Engine" },
  { id: "Social Media Ads", value: "Social Media Ads" },
  { id: "Social Media Posts", value: "Social Media Posts" },
  { id: "Email by Friend", value: "Email by Friend" },
  { id: "Newspaper", value: "Newspaper" },
];

const EmployeeAccount = () => {
  const classes = useEmployeeAccountStyles();
  const { userData: authUser } = useAuthInfo();
  const userid = authUser?._id;
  const [icompanyName, setiCompanyName] = useState((authUser?.companyname) ? (authUser?.companyname) : "");
  const [employeeNumber, setEmployeeNumber] = useState(((authUser as any)?.numofemployees) ? ((authUser as any)?.numofemployees) : "");
  const [ifirstName, setiFirstName] = useState((authUser?.firstname) ? (authUser?.firstname) : "");
  const [ilastName, setiLastName] = useState((authUser?.lastname) ? (authUser?.lastname) : "");
  const [about, setAbout] = useState(((authUser as any)?.heardaboutus) ? ((authUser as any)?.heardaboutus) : "");
  const createEmployerResponse = useAppSelector(selectHttpState)[CORRELATION_IDS.CREATE_EMPLOYER];
  const router = useRouter();

  useEffect(() => {
    if (createEmployerResponse && createEmployerResponse.success) {
      toast.success("Employer Account created successfully!");
      clearCreateEmployerResponse();
      new AuthService().getAuthUser(userid, (userData) => {
        storeAuthInfo({ userData: userData });
        //router.push(routePaths.employer.dashboard);
        window.location.href='/employer/dashboard'
      });
    }

    console.log(createEmployerResponse);

    if (createEmployerResponse && createEmployerResponse.error) {
      const error = createEmployerResponse.error;
      if (error?.status) {
        toast.error(error?.data?.message);
      } else {
        toast.error("Failed to register!");
      }
      clearCreateEmployerResponse();
    }
  }, [createEmployerResponse]);

  const {
    value: companyName,
    error: companyError,
    bind: bindCompany,
    reset: resetCompany,
  } =
    useInput(icompanyName, {
      validate(value) {
        if (value === "") {
          return "Please enter a company name!";
        }
        return true;
      }
    });

  const {
    value: firstName,
    error: firstnameError,
    bind: bindFirstname,
    reset: resetFirstname,
  } =
    useInput(ifirstName, {
      validate(value) {
        if (value === "") {
          return "Please enter a first name!";
        }
        return true;
      }
    });

  const {
    value: lastName,
    error: lastnameError,
    bind: bindLastname,
    reset: resetLastname,
  } =
    useInput(ilastName, {
      validate(value) {
        if (value === "") {
          return "Please enter a last name!";
        }
        return true;
      }
    });

  const {
    value: phone,
    error: phoneError,
    bind: bindPhone,
    reset: resetPhone,
  } =
    useInput((authUser?.phone) ? (authUser?.phone) : "", {
      validate(value) {
        if (value !== "") {
          if(value?.length > 11 || isNaN(Number(value))) {
            return "Please enter a valid phone number!";
          }
        }
        return true;
      }
    });

  const register = () => {
    companyError.check();
    firstnameError.check();
    lastnameError.check();
    phoneError.check();

    if (companyError.check() || firstnameError.check() || lastnameError.check() || phoneError.check()) {
      toast.error("Please Input all required fields!");
      return false;
    }

    /*alert(JSON.stringify({
      "userid":userid,
      "firstname":firstName,
      "lastname":lastName,
      "numofemployees":2,
      "companyname":companyName,
      "phone":phone,
      "heardaboutus":about
    }));*/
    createEmployer({
      "userid": userid,
      "firstname": firstName,
      "lastname": lastName,
      "numofemployees": employeeNumber,
      "companyname": companyName,
      "phone": phone,
      "heardaboutus": about
    });

  };

  return (
    <>
      <AdminLayout
        pageProps={{
          title: "Create Employer Account",
        }}
      >
        <Box className={classes.root}>
          <Grid container spacing={3}>
            <Grid item md={2} sm={12} xs={12} />
            <Grid item md={8} sm={12} xs={12}>
              <Box className="box">
                <Box className="top-content">
                  <Typography component="h2">
                    Update your employer account
                  </Typography>
                  <Typography>
                    You haven’t posted a job before, so you’ll need to update your
                    employer account.
                  </Typography>
                </Box>
                {/*<Box className="info-box">
                  <Image src={infoIcon} alt="Info" />
                  <Typography>Not here to post a job?</Typography>
                  <KeyboardArrowDownIcon />
                </Box>*/}
                <Box className="form">
                  <TextInput
                    label="Your company’s name"
                    required={true}
                    type="text"
                    {...bindCompany}
                    error={companyError.error}
                    hint={companyError.message}
                    //onChange={(e: any) => setCompanyName(e.target.value)}
                    //value={companyName}
                  />
                  <SelectInput
                    label="Your company’s number of employees"
                    data={selectData}
                    onChange={(e: any) => setEmployeeNumber(e.target.value)}
                    required={false}
                    value={employeeNumber}
                  />
                  <TextInput
                    label="Your first name"
                    required={true}
                    type="text"
                    {...bindFirstname}
                    error={firstnameError.error}
                    hint={firstnameError.message}
                    // onChange={(e: any) => setFirstName(e.target.value)}
                    // value={firstName}
                  />

                  <TextInput
                    label="Your last name"
                    required={true}
                    type="text"
                    {...bindLastname}
                    error={lastnameError.error}
                    hint={lastnameError.message}
                    //onChange={(e: any) => setLastName(e.target.value)}
                    //value={lastName}
                  />
                  <TextInput
                    label="Your phone number"
                    {...bindPhone}
                    error={phoneError.error}
                    hint={phoneError.message}
                    required={false}
                    type="text"
                  />
                  <SelectInput
                    label="How you heard about us"
                    data={selecthearData}
                    onChange={(e: any) => setAbout(e.target.value)}
                    required={false}
                    value={about}
                  />
                  <Box sx={{ textAlign: "end" }}>
                    <Button
                      title={"Update account"}
                      height={"50px"}
                      onClick={register}
                    />
                  </Box>
                </Box>
              </Box>
            </Grid>
            <Grid item md={2} sm={12} xs={12} />
          </Grid>
        </Box>
      </AdminLayout>
    </>
  );
};

export default EmployeeAccount;
