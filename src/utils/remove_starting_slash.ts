/**
 * Remove the starting slash character from a string
 * @param string {string}
 * @function
 */
export function remove_starting_slash(string: string): string {
    if (string.indexOf('/') === 0) {
        return string.replace('/', '');
    }

    return string;
}