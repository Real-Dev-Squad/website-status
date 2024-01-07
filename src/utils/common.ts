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
