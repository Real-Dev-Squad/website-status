export function getTotalMissedUpdate(date: Array<number>): number {
    const currentStandupDate = new Date().setUTCHours(0, 0, 0, 0);
    let lastStanupDate = 0;
    let totalMissedUpdate = 0;
    if (date.length === 0) {
        return totalMissedUpdate;
    }
    for (let i = 0; i < date.length; i++) {
        if (date[i] > lastStanupDate) {
            lastStanupDate = date[i];
        }
    }
    totalMissedUpdate =
        (currentStandupDate - lastStanupDate) / (24 * 60 * 60 * 1000);
    return totalMissedUpdate;
}
//86,400,000
