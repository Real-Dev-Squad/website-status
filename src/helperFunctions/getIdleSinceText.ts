import { TOTAL_MILLISECONDS_IN_A_HOUR } from '@/constants/date';

const getIdleSinceText = (idleSince: string) => {
    const presentDate = new Date();
    const idleSinceDate = new Date(idleSince);

    const presentDateInUtc = presentDate.toUTCString();
    const idleSinceDateInUtc = idleSinceDate.toUTCString();

    const differenceInHours = Math.round(
        (new Date(presentDateInUtc).valueOf() -
            new Date(idleSinceDateInUtc).valueOf()) /
            TOTAL_MILLISECONDS_IN_A_HOUR
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
