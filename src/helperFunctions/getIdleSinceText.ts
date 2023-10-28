import { TOTAL_MILLISECONDS_IN_A_HOUR } from '@/constants/date';

const getIdleSinceText = (idleSince: string) => {
    const presentDateInUtc = new Date().toUTCString();
    const idleSinceDateInUtc = new Date(idleSince).toUTCString();

    const presentDate = new Date(presentDateInUtc).valueOf();
    const idleSinceDate = new Date(idleSinceDateInUtc).valueOf();

    const differenceInHours = Math.round(
        (presentDate - idleSinceDate) / TOTAL_MILLISECONDS_IN_A_HOUR
    );
    const idleDays = Math.round(differenceInHours / 24);

    if (idleDays <= 0) {
        return `${differenceInHours} hours ago`;
    } else if (idleDays === 1) {
        return `${idleDays} day ago`;
    }

    return `${idleDays} days ago`;
};

export default getIdleSinceText;
