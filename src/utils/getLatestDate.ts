const getCurrentDate = (): string => {
    const date = new Date();
    const month = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];

    const daysInWeek = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
    ];

    return `${daysInWeek[date.getDay()]}, ${date.getDate()} ${
        month[date.getMonth()]
    } ${date.getFullYear()}`;
};

export default getCurrentDate;