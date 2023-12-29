import { CORRELATION_IDS, performHttpCall } from "@/redux/reducers/http";
import { endpoints } from "@/api";
import {
  ForgotPasswordParams,
  LoginParams,
  OtpCheckParams,
  ResetPasswordParams,
  SignUpParams,
  SocialSignupParams,
  CreateEmployerParams,
  UpdateAccounttypeParams,
  UpdatePhonenumberParams,
  UpdateEmailaddressParams,
  UpdateChangepasswordParams,
  UpdateAccountnameParams,
  UpdateDealquestionsParams
} from "@/types";

export const loginHttpCall = (data: LoginParams) => performHttpCall({
  correlationKey: CORRELATION_IDS.LOGIN,
  payload: {
    url: endpoints.public.login,
    method: "post",
    body: data,
  },
});

export const checkOTPHttpCall = (data: OtpCheckParams) => performHttpCall({
  correlationKey: CORRELATION_IDS.OTP_CHECK,
  payload: {
    url: endpoints.public.checkSignInOTP,
    method: "post",
    body: data,
  },
});

export const forgotPasswordHttpCall = (data: ForgotPasswordParams) => performHttpCall({
  correlationKey: CORRELATION_IDS.FORGOT_PASSWORD,
  payload: {
    url: endpoints.public.forgotPassword,
    method: "post",
    body: data,
  },
});

export const resetPasswordHttpCall = (data: ResetPasswordParams) => performHttpCall({
  correlationKey: CORRELATION_IDS.RESET_PASSWORD,
  payload: {
    url: endpoints.public.resetPassword,
    method: "post",
    body: data,
  },
});

export const registerAccountHttpCall = (data: SignUpParams) => performHttpCall({
  correlationKey: CORRELATION_IDS.SIGNUP,
  payload: {
    url: endpoints.public.signup,
    method: "post",
    body: data,
  },
});

export const registerAccountUsingSSOHttpCall = (data: Partial<SocialSignupParams>) => performHttpCall({
  correlationKey: CORRELATION_IDS.LOGIN_SSO,
  payload: {
    url: endpoints.public.signupSSO,
    method: "post",
    body: data,
  },
});

export const createEmployerHttpCall = (data: CreateEmployerParams) => performHttpCall({
  correlationKey: CORRELATION_IDS.CREATE_EMPLOYER,
  payload: {
    url: endpoints.private.createemployer,
    method: "post",
    body: data,
    useBearerToken: true,
  },
});

export const updateAccounttypeHttpCall = (data:UpdateAccounttypeParams) => performHttpCall({
  correlationKey: CORRELATION_IDS.UPDATE_ACCOUNTTYPE,
  payload: {
    url: endpoints.private.updateAccounttype,
    method: "post",
    body: data,
    useBearerToken: true,
  },
});

export const updatePhonenumberHttpCall = (data:UpdatePhonenumberParams) => performHttpCall({
  correlationKey: CORRELATION_IDS.UPDATE_PHONENUMBER,
  payload: {
    url: endpoints.private.updatePhone,
    method: "post",
    body: data,
    useBearerToken: true,
  },
});

export const updateEmailaddressHttpCall = (data:UpdateEmailaddressParams) => performHttpCall({
  correlationKey: CORRELATION_IDS.UPDATE_EMAILADDRESS,
  payload: {
    url: endpoints.private.updateEmail,
    method: "post",
    body: data,
    useBearerToken: true,
  },
});

export const updateChangepasswordHttpCall = (data:UpdateChangepasswordParams) => performHttpCall({
  correlationKey: CORRELATION_IDS.UPDATE_CHANGEPASSWORD,
  payload: {
    url: endpoints.private.updatePassword,
    method: "post",
    body: data,
    useBearerToken: true,
  },
});

export const updateAccountnameHttpCall = (data:UpdateAccountnameParams) => performHttpCall({
  correlationKey: CORRELATION_IDS.UPDATE_ACCOUNTNAME,
  payload: {
    url: endpoints.private.updateAccountname,
    method: "post",
    body: data,
    useBearerToken: true,
  },
});

export const UpdateDealquestionsHttpCall = (data:UpdateDealquestionsParams) => performHttpCall({
  correlationKey: CORRELATION_IDS.UPDATE_DEALQUES,
  payload: {
    url: endpoints.private.savepredealQuestions,
    method: "post",
    body: data,
    useBearerToken: true,
  },
});