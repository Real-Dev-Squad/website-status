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
    const idleDays = Math.round(differenceInHours / 24);

    if (idleDays <= 0) {
        return `${differenceInHours} hours ago`;
    } else if (idleDays === 1) {
        return `${idleDays} day ago`;
    }

    return `${idleDays} days ago`;
};

export default getIdleSinceText;
