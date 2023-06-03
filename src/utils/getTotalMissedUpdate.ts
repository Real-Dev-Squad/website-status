export function getTotalMissedUpdates(date: Array<number>): number {
    const currentStandupDate = new Date().setUTCHours(0, 0, 0, 0);
    let lastStanupDate = 0;
    let totalMissedUpdates = 0;
    if (date.length === 0) {
        return totalMissedUpdates;
    }
    for (let i = 0; i < date.length; i++) {
        if (date[i] > lastStanupDate) {
            lastStanupDate = date[i];
        }
    }
    totalMissedUpdates =
        Math.floor(currentStandupDate - lastStanupDate) / (24 * 60 * 60 * 1000);
    return totalMissedUpdates;
}
