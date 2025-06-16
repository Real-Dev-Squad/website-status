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

export function debounce(cb: (...args: any[]) => any, delay: number) {
    let timerId: NodeJS.Timeout;
    return function (...args: any[]) {
        clearTimeout(timerId);
        timerId = setTimeout(() => cb(...args), delay);
    };
}
