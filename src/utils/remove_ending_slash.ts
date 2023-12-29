/**
 * Remove the ending slash character from a string
 * @param string {string}
 * @returns {string}
 * @function
 */
export function remove_ending_slash(string: string): string {
    return string.replace(/\/$/, "");
}