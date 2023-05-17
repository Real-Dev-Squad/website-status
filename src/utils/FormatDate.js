export function FormatDate() {
    const months = {
        0: 'January',
        1: 'February',
        2: 'March',
        3: 'April',
        4: 'May',
        5: 'June',
        6: 'July',
        7: 'August',
        8: 'September',
        9: 'October',
        10: 'November',
        11: 'December',
    };
    const date = new Date();
    const currentMonth = months[Number(date.getMonth())];
    const yesterday = date.getDate() - 1;
    const currentYear = date.getFullYear();
    const yesterDayDate = `${currentMonth} ${yesterday}, ${currentYear}`;

    return yesterDayDate;
}
