import { TOTAL_MILLISECONDS_IN_A_HOUR } from '@/constants/date';

const getIdleSinceText = (idleSince: string) => {
    const presentDateInUtc = new Date().toUTCString();
    const idleSinceDateInUtc = new Date(idleSince).toUTCString();

    const presentDate = new Date(presentDateInUtc).valueOf();
    const idleSinceDate = new Date(idleSinceDateInUtc).valueOf();

    const differenceInHours = Math.round(
        (presentDate - idleSinceDate) / TOTAL_MILLISECONDS_IN_A_HOUR
    );
    const idealDays = Math.round(differenceInHours / 24);

    if (idealDays <= 0) {
        return `${differenceInHours} hours ago`;
    } else if (idealDays === 1) {
        return `${idealDays} day ago`;
    }

    return `${idealDays} days ago`;
};

export default getIdleSinceText;
