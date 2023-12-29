/**
 * Convert to string
 * @param string {string}
 */
export function convertToString(string: string): string {
    if(typeof string === "undefined" || string === null) {
        return "";
    }

    return string.toString();
}
