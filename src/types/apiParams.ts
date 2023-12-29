export interface PaginationParams {
  limit?: number | "all",
  page?: number,
}

export interface LoginParams {
  email: string,
  pass: string,
}

export interface OtpCheckParams {
  email: string,
  otpcode: string,
}

export interface ForgotPasswordParams {
  email: string,
  url: string,
}

export interface ResetPasswordParams {
  encdata: string,
  fpass: string,
}

export interface SignUpParams {
  email?: string,
  pass?: string,
  accounttype: "contractor" | "employer",
  url?: string,
}

export type SocialSignupParams = Omit<SignUpParams, "pass" | "url"> & {
  logintype?: "Google" | "Facebook" | "Twitter",
  loginuniqid?: string | number,
}

export interface CreateEmployerParams {
  userid?: number,
  firstname?: string,
  lastname?: string,
  numofemployees?: string,
  companyname?: string,
  phone?: string,
  heardaboutus?: string,
}

export interface UpdateAccounttypeParams {
  userid?: number,
  accounttype?: string,
}

export interface UpdatePhonenumberParams {
  userid?: number,
  phone?: string,
}

export interface UpdateEmailaddressParams {
  userid?: number,
  email?: string,
  url: string,
}

export interface UpdateChangepasswordParams {
  userid?: number,
  opass?: string,
  npass?: string,
}

export interface UpdateAccountnameParams {
  userid?: number,
  firstname?: string,
  lastname?: string,
}

export interface UpdateDealquestionsParams {
  jobid?:Number
  predealquestioncategory?: number,
  predealquestiontitle?: string,
  predealinputfields?: string,
  isdefault?: boolean
}
