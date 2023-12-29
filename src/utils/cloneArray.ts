/**
 * Prepare a clone of any array
 * @param array
 */
export function cloneArray<T>(array: T[]) {
    return array.map((item) => ({...item}));
}
