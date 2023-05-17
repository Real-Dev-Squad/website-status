import { month } from '@/constants/ProgressUpdates';

export function FormatDate(): string {
    const date = new Date();
    const currentMonth = month[Number(date.getMonth())];
    const yesterday = date.getDate() - 1;
    const currentYear = date.getFullYear();
    const yesterdayDate = `${currentMonth} ${yesterday}, ${currentYear}`;

    return yesterdayDate;
}
