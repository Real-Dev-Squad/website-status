interface LOG_TYPE {
    userId: string;
    data: [];
}

interface LOG_DATA {
    status: string;
    startTime: number;
    endTime: number;
    taskTitle: string;
}

export const getStartOfDay = (date: Date): Date => {
    if (date)
        return new Date(date.getFullYear(), date.getMonth(), date.getDate());
    return new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
    );
};

export const getDatesInRange = (startDate: Date, endDate: Date) => {
    const date = getStartOfDay(startDate);
    const dates = [];

    if (!startDate || !endDate) return [];

    while (date <= getStartOfDay(endDate)) {
        dates.push(getStartOfDay(date).getTime());
        date.setDate(date.getDate() + 1);
    }

    return dates;
};

export const processData = (
    itemId: string | null,
    data: []
): [object, object] => {
    if (!itemId) {
        return [{}, {}];
    } else {
        const log: any = data.find((log: LOG_TYPE) => {
            return log.userId === itemId;
        });
        if (!log || log.data?.length == 0) return [{}, {}];
        const dictWithStatus: Record<number, string> = {};
        const dictWithTask: Record<number, string> = {};
        log.data.forEach((logData: LOG_DATA) => {
            const dates = getDatesInRange(
                new Date(logData.startTime),
                new Date(logData.endTime)
            );
            if (logData.status === 'ACTIVE') {
                dates.forEach((dateTimestamp) => {
                    dictWithTask[dateTimestamp] = logData.taskTitle;
                });
            } else {
                dates.forEach((dateTimestamp) => {
                    dictWithStatus[dateTimestamp] = logData.status;
                });
            }
        });
        return [dictWithStatus, dictWithTask];
    }
};
