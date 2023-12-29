/**
 * Convert a number
 * @param number {number}
 */
export function convertToNumber(number: number): number {
    if(typeof number === "undefined" || number === null || isNaN(number) || isNaN(Number(number))) {
        return 0;
    }

    return Number(number);
}
