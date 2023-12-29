export function isInt(value: number | string) {
  const er = /^-?[0-9]+$/;
  return er.test(value?.toString());
}