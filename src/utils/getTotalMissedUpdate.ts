export function getTotalMissedUpdate(date: Array<number>): number {
    const currentStandupDate = new Date().setUTCHours(0, 0, 0, 0);
    let lastStanupDate = 0;
    for (let i = 0; i < date.length; i++) {
        if (date[i] > lastStanupDate) {
            lastStanupDate = date[i];
        }
    }
    const totalMissedUpdate =
        (currentStandupDate - lastStanupDate) / (24 * 60 * 60 * 1000);
    return totalMissedUpdate;
}
