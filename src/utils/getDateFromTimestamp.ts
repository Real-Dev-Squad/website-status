import { daysInWeek, month } from '@/constants/ProgressUpdates';

export const getDateFromTimestamp = (timeStamp: number) => {
    const date = new Date(timeStamp);
    return `${daysInWeek[date.getDay()]}, ${date.getDate()} ${
        month[date.getMonth()]
    } ${date.getFullYear()}`;
};
