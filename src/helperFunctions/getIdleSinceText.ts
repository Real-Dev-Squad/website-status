import {
    TOTAL_MILLISECONDS_IN_A_DAY,
    TOTAL_MILLISECONDS_IN_A_HOUR,
} from '@/constants/date';

const getIdleSinceText = (idleSince: string) => {
    const presentDate = new Date();
    const idleSinceDate = new Date(idleSince);
    const differenceInDay = Math.round(
        (presentDate.setUTCHours(0, 0, 0, 0) -
            idleSinceDate.setUTCHours(0, 0, 0, 0)) /
            TOTAL_MILLISECONDS_IN_A_DAY
    );
    const differenceInHours = Math.abs(
        Math.round(
            (presentDate.getTime() - parseInt(idleSince)) /
                TOTAL_MILLISECONDS_IN_A_HOUR
        )
    );

    if (differenceInDay > 1) {
        return `${differenceInDay} days ago`;
    } else {
        return `${differenceInHours} hours ago`;
    }
};

export default getIdleSinceText;
