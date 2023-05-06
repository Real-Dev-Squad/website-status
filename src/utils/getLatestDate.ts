import { daysInWeek, month } from '@/components/constants/ProgressUpdates';

const getCurrentDate = (): string => {
    const date = new Date();

    return `${daysInWeek[date.getDay()]}, ${date.getDate()} ${
        month[date.getMonth()]
    } ${date.getFullYear()}`;
};

export default getCurrentDate;
