export const getNumberOfArrayItems = (array: any[], startIndex = 0, count = 10) => {
  return array.slice(startIndex, count);
}