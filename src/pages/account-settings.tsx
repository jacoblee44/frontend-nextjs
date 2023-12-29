import React, { useEffect, useState } from 'react';
import { Box, Typography, DialogActions } from '@mui/material'
import { useAccountSettingsStyles } from "@/static/stylesheets/employee";
import { AdminLayout, PrivateLayout, PublicLayout } from "@/components/layouts";
import { CustomDivider } from "@/components/atoms/divider";
import { Button } from "@/components/atoms/button";
import { useComponentState, useInput, useAppSelector } from "@/hooks";
import { AccountTypeSelectModal } from "@/components/molecules/modal/AccountTypeModal";
import { PhoneNumberInputDialog } from "@/components/molecules/modal/PhoneNumberModal";
import { EmailAddressInputDialog } from "@/components/molecules/modal/EmailAddressModal";
import { ChangePasswordInputDialog } from "@/components/molecules/modal/ChangePasswordModal";
import { AccountNameDialog } from "@/components/molecules/modal/AccountNameModal";
import { useFormMethods } from "@/hooks/form";
import { AuthService } from "@/services/auth";
import { useAuthInfo } from "@/hooks/custom";
import toast from "react-hot-toast";
import {
  updateAccounttype,
  clearupdateAccounttypeResponse,
  updatePhonenumber,
  clearupdatePhonenumberResponse,
  clearupdateEmailaddressResponse,
  updateChangepassword,
  clearupdateChangepasswordResponse,
  updateAccountname,
  clearupdateAccountnameResponse,
  storeAuthInfo,
  logout
} from "@/redux/actions";
import { CORRELATION_IDS, selectHttpState } from "@/redux/reducers/http";
import { appConfig, routePaths } from "@/config";
import { useRouter } from "next/router";
import classNames from 'classnames';


const AccountSettings = () => {
  const classes = useAccountSettingsStyles();
  const { userData: authUser } = useAuthInfo();
  const router = useRouter();
  if (typeof authUser?._id !== "undefined") {
    var userid = authUser?._id;
  } else {
    var userid = 0;
    window.location.href = '/login';
  }

  const [acctype, setAcctype] = useState(authUser?.accounttype);
  const [emailAddress, setEmailaddress] = useState(authUser?.email);
  const [tempemailAddress, settempEmailaddress] = useState(authUser?.email);

  const [firstName, setFirstname] = useState((typeof authUser?.firstname !== "undefined") ? authUser?.firstname : "");
  const [lastName, setLastname] = useState((typeof authUser?.lastname !== "undefined") ? authUser?.lastname : "");
  const [phoneNumber, setPhonenumber] = useState((typeof authUser?.phone !== "undefined") ? authUser?.phone : "");
  const [tempaccountName, settempAccountname] = useState((typeof authUser?.firstname !== "undefined") ? authUser?.firstname + '-' + authUser?.lastname : "");
  const [tempphoneNumber, settempPhonenumber] = useState((typeof authUser?.phone !== "undefined") ? authUser?.phone : "");


  //const [emailAddress, setEmailaddress] = useState(authUser?.email);
  const updateAccounttypeResponse = useAppSelector(selectHttpState)[CORRELATION_IDS.UPDATE_ACCOUNTTYPE];
  const updatePhonenumberResponse = useAppSelector(selectHttpState)[CORRELATION_IDS.UPDATE_PHONENUMBER];
  const updateEmailaddressResponse = useAppSelector(selectHttpState)[CORRELATION_IDS.UPDATE_EMAILADDRESS];
  const updateChangepasswordResponse = useAppSelector(selectHttpState)[CORRELATION_IDS.UPDATE_CHANGEPASSWORD];
  const updateAccountNameResponse = useAppSelector(selectHttpState)[CORRELATION_IDS.UPDATE_ACCOUNTNAME];
  const handleClickSignOut1 = () => {
    logout();
    router.push(routePaths.login);
  };

  const {
    state: {
      AccountTypeDialogOpen,
      PhoneNumberInputDialogOpen,
      EmailAddressInputDialogOpen,
      ChangePasswordInputDialogOpen,
      AccountNameDialogOpen,
    },
    setState,
  } = useComponentState({
    AccountTypeDialogOpen: false,
    PhoneNumberInputDialogOpen: false,
    EmailAddressInputDialogOpen: false,
    ChangePasswordInputDialogOpen: false,
    AccountNameDialogOpen: false,
  });

  useEffect(() => {
    if (updateAccounttypeResponse && updateAccounttypeResponse.success) {
      toast.success("Account Type Updated Successfully!");
      setState({ AccountTypeDialogOpen: false });
      clearupdateAccounttypeResponse();
      if (userid > 0) {
        new AuthService().getAuthUser(userid, (userData) => {
          storeAuthInfo({ userData: userData });
        });
      }
    }

    if (updateAccounttypeResponse && updateAccounttypeResponse.error) {
      const error = updateAccounttypeResponse.error;
      if (error?.status) {
        toast.error(error?.data?.message);
      } else {
        toast.error("Failed to update Account type!");
      }
      clearupdateAccounttypeResponse();
    }
  }, [updateAccounttypeResponse]);

  useEffect(() => {
    if (updateAccountNameResponse && updateAccountNameResponse.success) {
      toast.success("User Name Updated Successfully!");
      setState({ AccountNameDialogOpen: false });
      clearupdateAccountnameResponse();
      if (userid > 0) {
        new AuthService().getAuthUser(userid, (userData) => {
          storeAuthInfo({ userData: userData });
        });
      }
    }

    if (updateAccountNameResponse && updateAccountNameResponse.error) {
      const error = updateAccountNameResponse.error;
      if (error?.status) {
        toast.error(error?.data?.message);
      } else {
        toast.error("Failed to update Password!");
      }
      clearupdateAccountnameResponse();
    }
  }, [updateAccountNameResponse]);

  useEffect(() => {
    if (updatePhonenumberResponse && updatePhonenumberResponse.success) {
      toast.success("Phone Number Updated Successfully!");
      setState({ PhoneNumberInputDialogOpen: false });
      clearupdatePhonenumberResponse();
      if (userid > 0) {
        new AuthService().getAuthUser(userid, (userData) => {
          storeAuthInfo({ userData: userData });
        });
      }
    }

    if (updatePhonenumberResponse && updatePhonenumberResponse.error) {
      const error = updatePhonenumberResponse.error;
      if (error?.status) {
        toast.error(error?.data?.message);
      } else {
        toast.error("Failed to update Phone Number!");
      }
      clearupdatePhonenumberResponse();
    }
  }, [updatePhonenumberResponse]);

  useEffect(() => {
    if (updateEmailaddressResponse && updateEmailaddressResponse.success) {
      toast.success("Verification Email sent successfully!");
      setState({ EmailAddressInputDialogOpen: false });
      clearupdateEmailaddressResponse();
      if (userid > 0) {
        new AuthService().getAuthUser(userid, (userData) => {
          storeAuthInfo({ userData: userData });
        });
      }
    }

    if (updateEmailaddressResponse && updateEmailaddressResponse.error) {
      const error = updateEmailaddressResponse.error;
      if (error?.status) {
        toast.error(error?.data?.message);
      } else {
        toast.error("Failed to update Email Address!");
      }
      clearupdateEmailaddressResponse();
    }
  }, [updateEmailaddressResponse]);

  useEffect(() => {
    if (updateChangepasswordResponse && updateChangepasswordResponse.success) {
      toast.success("Password Changed Successfully!");
      setState({ ChangePasswordInputDialogOpen: false });
      clearupdateChangepasswordResponse();
    }

    if (updateChangepasswordResponse && updateChangepasswordResponse.error) {
      const error = updateChangepasswordResponse.error;
      if (error?.status) {
        toast.error(error?.data?.message);
      } else {
        toast.error("Failed to update Password!");
      }
      clearupdateChangepasswordResponse();
    }
  }, [updateChangepasswordResponse]);

  useEffect(() => {

    if (userid > 0) {
      new AuthService().getAuthUser(userid, (userData) => {
        if (typeof userData?.firstname !== "undefined") {
          setFirstname(userData?.firstname);
        }
        if (typeof userData?.lastname !== "undefined") {
          setLastname(userData?.lastname);
        }
        if (typeof userData?.phone !== "undefined") {
          setPhonenumber(userData?.phone);
        }
        if (typeof userData?.firstname !== "undefined") {
          settempAccountname(userData?.firstname + '-' + userData?.lastname);
        }
        if (typeof userData?.phone !== "undefined") {
          settempPhonenumber(userData?.phone);
        }
      });
    }

  }, [authUser]);

  const ContainerLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const title = "Account settings";
    if (authUser?.accounttype === "employer") {
      return (
        <AdminLayout pageProps={{ title }}>
          {children}
        </AdminLayout>
      );
    }

    return (
      <PublicLayout pageProps={{ title }} globalAccess={true}>
        {children}
      </PublicLayout>
    );
  }

  return (
    <PrivateLayout>
      <ContainerLayout>
        <Box className={classes.root}>
          <Box className={classNames({
            "container-root-employer": authUser?.accounttype === "employer",
            "container-root-contractor": authUser?.accounttype === "contractor",
          })}>
            <Typography component={"h2"}>Account settings</Typography>
            { /*<CustomDivider/>
        <Box className={"card"}>
          <Box>
            <Typography component={"h3"}>Name:</Typography>
            <Typography component={"h4"}>{firstName} {lastName}</Typography>
          </Box>
          <Button title={"Change Name"} onClick={() => setState({ AccountNameDialogOpen: true })} btnType={"border"} width={"320px"} />
        </Box> */}
            <CustomDivider />
            <Box className={"card"}>
              <Box>
                <Typography component={"h3"}>Account type:</Typography>
                <Typography component={"h4"} style={{ textTransform: "capitalize" }}>{acctype}</Typography>
              </Box>
              {/*<Button title={"Change account type"} onClick={() => setState({ AccountTypeDialogOpen: true })}
                    btnType={"border"} width={"230px"} />*/}
            </Box>
            <CustomDivider />
            <Box className={"card"}>
              <Box>
                <Typography component={"h3"}>Email:</Typography>
                <Typography component={"h4"}>{emailAddress}</Typography>
              </Box>
              <Button title={"Change email"} onClick={() => setState({ EmailAddressInputDialogOpen: true })}
                btnType={"border"} width={"230px"} />
            </Box>
            <CustomDivider />
            <Box className={"card"}>
              <Box>
                <Typography component={"h3"}>Password:</Typography>
                <Typography component={"h4"}>**********</Typography>
              </Box>
              <Button title={"Change password"} onClick={() => setState({ ChangePasswordInputDialogOpen: true })}
                btnType={"border"} width={"230px"} />
            </Box>
            <CustomDivider />
            <Box className={"card"}>
              <Box>
                <Typography component={"h3"}>Phone number:</Typography>
                <Typography component={"h4"}>{phoneNumber}</Typography>
              </Box>
              <Button title={"Change mobile number"} onClick={() => setState({ PhoneNumberInputDialogOpen: true })}
                btnType={"border"} width={"230px"} />
            </Box>
            <CustomDivider />
            <Box className={"card"}>
              <Box>
                <Typography component={"h3"}>Two-factor authentication (2FA)</Typography>
                <Typography component={"h4"}>Active</Typography>
              </Box>
              <Box />
            </Box>
            <CustomDivider />
            <Box className={"card"}>
              <Box>
                <Typography component={"h3"}>Third-partly applications</Typography>
                <Typography component={"h4"}>No third-party applications have access to your account</Typography>
              </Box>
              <Box />
            </Box>
            <CustomDivider />
            <Box className={"card"}>
              <Box>
                <Typography component={"h3"}>{emailAddress}</Typography>
              </Box>
              <Button title={"Sign out"} onClick={handleClickSignOut1} btnType={"border"} width={"230px"} />
            </Box>
          </Box>
        </Box>

        <AccountTypeSelectModal
          open={AccountTypeDialogOpen}
          onClose={() => setState({ AccountTypeDialogOpen: false })}
          code={acctype}
          onChange={(value: any) => {
            if (value?.code === "") {
              toast.error("Please Input all required fields!");
              return false;
            }
            updateAccounttype({
              "userid": userid,
              "accounttype": value?.code
            });
            setAcctype(value?.code);
          }}
          loading={updateAccounttypeResponse?.loading}
        />

        <AccountNameDialog
          open={AccountNameDialogOpen}
          onClose={() => setState({ AccountNameDialogOpen: false })}
          value={tempaccountName}

          onChange={(value, field) => {
            /*if(field=='firstname') {
              setFirstname(value);
            } else if(field=='lastname') {
              setLastname(value);
            }
            settempAccountname(firstName+'-'+lastName)*/
            var fname = '';
            var lname = '';
            if (tempaccountName != "") {
              fname = tempaccountName.split('-')[0];
              lname = tempaccountName.split('-')[1];
            }
            if (field == 'firstname') {
              setFirstname(value);
              settempAccountname(value + '-' + lname);
            } else if (field == 'lastname') {
              setLastname(value);
              settempAccountname(fname + '-' + value);
            }
          }}

          onClick={() => {
            if (firstName == "" || lastName == "") {
              toast.error("Please Input all required fields!");
              return false;
            }
            updateAccountname({
              "userid": userid,
              "firstname": firstName,
              "lastname": lastName
            });
          }}
        />

        <PhoneNumberInputDialog
          open={PhoneNumberInputDialogOpen}
          onClose={() => setState({ PhoneNumberInputDialogOpen: false })}
          value={tempphoneNumber}

          onClick={(phone) => {
            if (phone == "") {
              toast.error("Please Input all required fields!");
              return false;
            }
            updatePhonenumber({
              "userid": userid,
              "phone": phone
            });
            setPhonenumber(phone);
          }}
          loading={updatePhonenumberResponse?.loading}
        />
        <EmailAddressInputDialog
          open={EmailAddressInputDialogOpen}
          onClose={() => setState({ EmailAddressInputDialogOpen: false })}
          value={tempemailAddress}
          loading={updateEmailaddressResponse?.loading}
        />
        <ChangePasswordInputDialog
          open={ChangePasswordInputDialogOpen}
          onClose={() => setState({ ChangePasswordInputDialogOpen: false })}
          value=""
          loading={updateChangepasswordResponse?.loading}
        />
      </ContainerLayout>
    </PrivateLayout>
  );
};

export default AccountSettings;
