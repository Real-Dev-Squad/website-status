import { getTotalMissedUpdates } from '@/utils/getTotalMissedUpdate';

function getMockedDates(date: string): number {
    return new Date(date).getTime();
}

describe('Get Total Missed Updates', () => {
    test('should return 0 if date array is empty', () => {
        const result = getTotalMissedUpdates([]);
        expect(result).toBe(0);
    });

    test('should return 0 if date array has last standup date', () => {
        const dateArrayValue = getMockedDates('24 june 2023');
        const result = getTotalMissedUpdates([dateArrayValue]);
        expect(result).toBe(0);
    });

    test('should return number of days between last standup date and current standup date', () => {
        const firstDate = getMockedDates('20 june 2023');
        const SecondDate = getMockedDates('21 june 2023');
        const ThirdDate = getMockedDates('22 june 2023');
        const result = getTotalMissedUpdates([
            firstDate,
            SecondDate,
            ThirdDate,
        ]);
        expect(result).toBe(2);
    });
});
