import { SignUpForm } from "@/components/molecules/signup/SignUpForm";
import { PublicLayout } from "@/components/layouts";
import { useRouter } from "next/router";
import Error from "next/error";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import {
  clearCreatedAccountResponse,
  clearSSOLoginResponse,
  storeAuthInfo,
} from "@/redux/actions";
import { useAppSelector } from "@/hooks";
import { CORRELATION_IDS, selectHttpState } from "@/redux/reducers/http";
import { SignupSuccessMessage } from "@/components/molecules/signup";
import { routePaths } from "@/config";

const SignUp = () => {
  const router = useRouter();
  const userType = router?.query?.userType;
  const createAccountResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.SIGNUP];
  const ssoLoginResponse =
    useAppSelector(selectHttpState)[CORRELATION_IDS.LOGIN_SSO];

  const [verificationEmail, setVerificationEmail] = useState<string>("");
  const [signupSuccess, setSignupSuccess] = useState<boolean>(false);

  useEffect(() => {
    if (createAccountResponse && createAccountResponse.success) {
      setSignupSuccess(true);
      setVerificationEmail(createAccountResponse?.data?.user?.email);
      clearCreatedAccountResponse();
    }

    console.log(createAccountResponse);

    if (createAccountResponse && createAccountResponse.error) {
      const error = createAccountResponse.error;
      if (error?.status) {
        toast.error(error?.data?.message);
      } else {
        toast.error("Failed to register!");
      }

      clearCreatedAccountResponse();
    }
  }, [createAccountResponse]);

  useEffect(() => {
    if (ssoLoginResponse && ssoLoginResponse.success) {
      const data = ssoLoginResponse?.data;

      if (data && data?.status) {
        const token = data?.token;
        const userId = data?.userid ?? data?.user;

        storeAuthInfo({
          token,
          userData: {
            _id: userId,
          },
          loggedIn: true,
          loginRedirectRef: routePaths.root,
        });

        toast.success("Registered successfully!");
      }
      clearSSOLoginResponse();
    }

    if (ssoLoginResponse && ssoLoginResponse.error) {
      toast.error("Failed to create account!");
      clearSSOLoginResponse();
    }
  }, [ssoLoginResponse]);

  return (
    <>
      {userType === "contractor" || userType === "employer" ? (
        <>
          <PublicLayout
            pageProps={{
              title: "Signup",
            }}
            hideHeader={true}
          >
            {signupSuccess ? (
              <SignupSuccessMessage verificationEmail={verificationEmail} />
            ) : (
              <SignUpForm userType={userType} />
            )}
          </PublicLayout>
        </>
      ) : (
        <Error statusCode={404} />
      )}
    </>
  );
};

export default SignUp;
