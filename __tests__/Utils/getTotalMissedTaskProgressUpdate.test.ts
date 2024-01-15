import { getTotalMissedTaskProgressUpdate } from '@/utils/getTotalMissedTaskProgressUpdate';

describe('Get total missed task progress update', () => {
    test('should return 1 if progress is not updated in last 3 days', () => {
        jest.useFakeTimers().setSystemTime(new Date('13 january 2024'));
        const result = getTotalMissedTaskProgressUpdate(1704795225 * 1000);
        expect(result).toBe(1);
    });

    test('should return 0 if last progress is updated in 3 days', () => {
        jest.useFakeTimers().setSystemTime(new Date('11 january 2024'));
        const result = getTotalMissedTaskProgressUpdate(1704795225 * 1000);
        expect(result).toBe(0);
    });

    test('should return 0 if the last progress is not updated in 3 days but the date includes sunday', () => {
        jest.useFakeTimers().setSystemTime(new Date('8 january 2024'));
        const result = getTotalMissedTaskProgressUpdate(1704445747000);
        expect(result).toBe(0);
    });
});
