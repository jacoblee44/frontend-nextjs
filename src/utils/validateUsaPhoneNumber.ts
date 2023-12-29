export function validateUsaPhoneNumber(phone: string): boolean {
  const regxp = /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/g;
  return regxp.test(phone);
}