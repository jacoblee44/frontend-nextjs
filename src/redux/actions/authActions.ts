import { store } from "@/redux/store";
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
  UpdateDealquestionsParams,
  
} from '@/types';
import { CORRELATION_IDS } from "@/redux/reducers/http";
import { authInitialState, AuthState, storeAuth } from '@/redux/reducers/authSlice';
import { clearHttpStateObject } from "@/redux/actions";
import {
  checkOTPHttpCall, forgotPasswordHttpCall,
  loginHttpCall,
  registerAccountHttpCall,
  registerAccountUsingSSOHttpCall, resetPasswordHttpCall, createEmployerHttpCall, updateAccounttypeHttpCall, updatePhonenumberHttpCall, updateEmailaddressHttpCall, updateChangepasswordHttpCall, updateAccountnameHttpCall, UpdateDealquestionsHttpCall
} from "@/redux/reducers/http/httpCallSets";
import { AuthService } from "@/services/auth";

export function login(params: LoginParams) {
  store.dispatch(loginHttpCall(params));
}

export function checkOTP(params: OtpCheckParams) {
  store.dispatch(checkOTPHttpCall(params));
}

export function sendForgotPasswordVerification(params: ForgotPasswordParams) {
  store.dispatch(forgotPasswordHttpCall(params));
}

export function resetPassword(params: ResetPasswordParams) {
  store.dispatch(resetPasswordHttpCall(params));
}

export function storeAuthInfo(options: AuthState) {
  if (options?.token) {
    if (options?.token) {
      new AuthService().setToken(options?.token);
      new AuthService().getAuthUser(options?.userData?._id, (userData) => {
        store.dispatch(storeAuth({
          ...options,
          userData,
        }));
      });
    }
  }
}

export function logout() {
  new AuthService().removeToken();
  store.dispatch(storeAuth({
    userData: null,
    token: null,
    loggedIn: false,
  }));
}

export function resetAuthInfo() {
  store.dispatch(storeAuth(authInitialState));
}

export function clearLoginResponse() {
  clearHttpStateObject(CORRELATION_IDS.LOGIN);
}

export function clearOtpCheckResponse() {
  clearHttpStateObject(CORRELATION_IDS.OTP_CHECK);
}

export function clearForgotPasswordResponse() {
  clearHttpStateObject(CORRELATION_IDS.FORGOT_PASSWORD);
}

export function clearResetPasswordResponse() {
  clearHttpStateObject(CORRELATION_IDS.RESET_PASSWORD);
}

export function registerAccount(params: SignUpParams) {
  store.dispatch(registerAccountHttpCall(params));
}

export function registerAccountUsingSSO(params: Partial<SocialSignupParams>) {
  store.dispatch(registerAccountUsingSSOHttpCall(params));
}

export function clearCreatedAccountResponse() {
  clearHttpStateObject(CORRELATION_IDS.SIGNUP);
}

export function clearSSOLoginResponse() {
  clearHttpStateObject(CORRELATION_IDS.LOGIN_SSO);
}

export function clearLoggedOut() {
  clearHttpStateObject(CORRELATION_IDS.LOGOUT);
}

export function storeLoginData(options: Partial<AuthState>) {
  store.dispatch(storeAuth(options));
}

export function createEmployer(params: CreateEmployerParams) {
  store.dispatch(createEmployerHttpCall(params));
}

export function clearCreateEmployerResponse() {
  clearHttpStateObject(CORRELATION_IDS.CREATE_EMPLOYER);
}

export function updateAccounttype(params:UpdateAccounttypeParams) {
  store.dispatch(updateAccounttypeHttpCall(params));
}

export function clearupdateAccounttypeResponse() {
  clearHttpStateObject(CORRELATION_IDS.UPDATE_ACCOUNTTYPE);
}

export function updatePhonenumber(params:UpdatePhonenumberParams) {
  store.dispatch(updatePhonenumberHttpCall(params));
}

export function clearupdatePhonenumberResponse() {
  clearHttpStateObject(CORRELATION_IDS.UPDATE_PHONENUMBER);
}

export function updateEmailaddress(params:UpdateEmailaddressParams) {
  store.dispatch(updateEmailaddressHttpCall(params));
}

export function clearupdateEmailaddressResponse() {
  clearHttpStateObject(CORRELATION_IDS.UPDATE_EMAILADDRESS);
}

export function updateChangepassword(params:UpdateChangepasswordParams) {
  store.dispatch(updateChangepasswordHttpCall(params));
}

export function clearupdateChangepasswordResponse() {
  clearHttpStateObject(CORRELATION_IDS.UPDATE_CHANGEPASSWORD);
}

export function updateAccountname(params:UpdateAccountnameParams) {
  store.dispatch(updateAccountnameHttpCall(params));
}

export function clearupdateAccountnameResponse() {
  clearHttpStateObject(CORRELATION_IDS.UPDATE_ACCOUNTNAME);
}

export function updateDealQuestions(params:UpdateDealquestionsParams) {
  store.dispatch(UpdateDealquestionsHttpCall(params));
}

export function clearupdateDealQuesResponse() {
  clearHttpStateObject(CORRELATION_IDS.UPDATE_DEALQUES);
}