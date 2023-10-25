export const getDateRelativeToToday = (
    daysFromToday: number,
    format: 'timestamp' | 'formattedDate'
): number | string => {
    const today = new Date();
    const calculatedDate = new Date(today);
    calculatedDate.setDate(today.getDate() + daysFromToday);
    calculatedDate.setHours(5, 30, 0, 0);
    if (format === 'timestamp') {
        return calculatedDate.getTime() / 1000;
    } else if (format === 'formattedDate') {
        // Converting the date to a string in the "yyyy-mm-dd" format
        return `${calculatedDate.getFullYear()}-${(
            calculatedDate.getMonth() + 1
        )
            .toString()
            .padStart(2, '0')}-${calculatedDate
            .getDate()
            .toString()
            .padStart(2, '0')}`;
    } else {
        throw new Error(
            'Invalid format parameter. Use "timestamp" or "formattedDate".'
        );
    }
};
