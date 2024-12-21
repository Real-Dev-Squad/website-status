import { TOTAL_MILLISECONDS_IN_A_HOUR } from '@/constants/date';

export function getTotalMissedTaskProgressUpdate(lastUpdated: number) {
    const presentDateInUtc = new Date().toUTCString();
    const taskLastUpdatedOn = new Date(lastUpdated).toUTCString();

    const presentDateMillisecond = new Date(presentDateInUtc).valueOf();
    const taskStartedOnMillisecond = new Date(taskLastUpdatedOn).valueOf();

    let count = 0;
    const sundays = getSundays(lastUpdated);

    const differenceInHours = Math.round(
        (presentDateMillisecond - taskStartedOnMillisecond) /
            TOTAL_MILLISECONDS_IN_A_HOUR
    );

    let missedProgressUpdate = Math.round(differenceInHours / 24);
    if (sundays !== 0) {
        missedProgressUpdate = missedProgressUpdate - sundays;
    }

    if (missedProgressUpdate >= 3) {
        for (let i = 1; i <= missedProgressUpdate; i++) {
            if (i % 3 === 0) {
                count++;
            }
        }
        return count;
    } else {
        return count;
    }
}

function getSundays(taskStartedOn: number) {
    const taskStartedOnDate = new Date(taskStartedOn);
    const currentDate = new Date();
    let sundays = 0;

    while (taskStartedOnDate <= currentDate) {
        if (taskStartedOnDate.getDay() === 0) {
            sundays++;
        }
        taskStartedOnDate.setDate(taskStartedOnDate.getDate() + 1);
    }
    return sundays;
}
