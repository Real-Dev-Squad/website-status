import { getTotalMissedUpdates } from '@/utils/getTotalMissedUpdate';

function getMockedDates(date: string[]): number[] {
    const dates = [];
    for (let i = 0; i < date.length; i++) {
        dates.push(new Date(date[i]).getTime());
    }
    return dates;
}

describe('Get Total Missed Updates', () => {
    test('should return 0 if date array is empty', () => {
        const result = getTotalMissedUpdates([]);
        expect(result).toBe(0);
    });

    test('should return 1 if date array has last standup date', () => {
        jest.useFakeTimers().setSystemTime(new Date('26 june 2023'));
        const pastStandupDates = getMockedDates(['25 june 2023']);
        const result = getTotalMissedUpdates(pastStandupDates);
        expect(result).toBe(1);
    });

    test('should return number of days between last standup date and current standup date', () => {
        jest.useFakeTimers().setSystemTime(new Date('26 june 2023'));
        const pastStandupDates = getMockedDates([
            '21 june 2023',
            '20 june 2023',
            '22 june 2023',
            '23 june 2023',
            '24 june 2023',
        ]);
        const result = getTotalMissedUpdates(pastStandupDates);
        expect(result).toBe(2);
    });
});
