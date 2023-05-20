import { month } from '@/constants/ProgressUpdates';

export function getYesterdayDate(): string {
    const date = new Date();
    const currentDay = date.getDate();
    const currentMonth = month[Number(date.getMonth())];
    const currentYear = date.getFullYear();

    let yesterdayDay = currentDay - 1;
    let yesterdayMonth = currentMonth;
    let yesterdayYear = currentYear;

    if (yesterdayDay === 0) {
        const lastDayOfPreviousMonth = new Date(
            currentYear,
            date.getMonth(),
            0
        ).getDate();
        yesterdayMonth = month[Number(date.getMonth()) - 1];
        yesterdayDay = lastDayOfPreviousMonth;
    }

    if (yesterdayDay === 31 && yesterdayMonth === 'December') {
        yesterdayYear = currentYear - 1;
    }
    const yesterdayDate = `${yesterdayMonth} ${yesterdayDay}, ${yesterdayYear}`;

    return yesterdayDate;
}
