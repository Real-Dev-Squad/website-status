import { daysInWeek, month } from '@/constants/ProgressUpdates';

export const getTimeFromTimestamp = (timeStamp: number) => {
    const date = new Date(timeStamp);
    return `${daysInWeek[date.getDay()]}, ${date.getDate()} ${
        month[date.getMonth()]
    } ${date.getFullYear()}`;
};
