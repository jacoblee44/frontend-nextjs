export interface UserProfile  {
  _id?: number,
  email?: string,
  companyname?: string,
  accounttype?: "contractor" | "employer",
  phone?: string,
  firstname?: string,
  lastname?: string,
  displayname?: string,
  adminactive?: boolean,
}