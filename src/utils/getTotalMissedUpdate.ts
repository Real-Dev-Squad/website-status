import moment from 'moment';

export function getTotalMissedUpdates(date: Array<number>): number {
    const currentStandupDate = moment().format('MM DD YYYY');
    let lastStanup = 0;
    let totalMissedUpdates = 0;
    if (date.length === 0) {
        return totalMissedUpdates;
    }
    for (let i = 0; i < date.length; i++) {
        if (date[i] > lastStanup) {
            lastStanup = date[i];
        }
    }
    const lastStanupDate = moment(lastStanup).format('MM DD YYYY');
    const startDate = moment(currentStandupDate, 'MM DD YYYY');
    const endDate = moment(lastStanupDate, 'MM DD YYYY');
    totalMissedUpdates = startDate.diff(endDate, 'days');
    return Number(moment(totalMissedUpdates));
}
