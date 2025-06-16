export const readMoreFormatter = (
    stringToFormat: string,
    length: number
): string => {
    if (!stringToFormat) return stringToFormat;

    if (stringToFormat.length > length) {
        const formattedString = stringToFormat.slice(0, length) + '...';

        return formattedString;
    }

    return stringToFormat;
};

/**
 * Returns a debounced version of the provided callback, delaying its execution until after the specified delay has elapsed since the last invocation.
 *
 * @param cb - The callback function to debounce.
 * @param delay - The delay in milliseconds to wait after the last call before invoking {@link cb}.
 * @returns A function that postpones calling {@link cb} until after {@link delay} milliseconds have passed without further calls.
 */
export function debounce(cb: (...args: any[]) => any, delay: number) {
    let timerId: NodeJS.Timeout;
    return function (...args: any[]) {
        clearTimeout(timerId);
        timerId = setTimeout(() => cb(...args), delay);
    };
}
