import { isValidDate } from '@/utils/isValidDate';

describe('isValidDate', () => {
    it('should return true for valid dates in "YYYY-MM-DD" format', () => {
        expect(isValidDate('2023-10-05')).toBe(true);
        expect(isValidDate('1999-12-31')).toBe(true);
        expect(isValidDate('2000-02-29')).toBe(true);
    });

    it('should return false for dates with an invalid format', () => {
        expect(isValidDate('23-10-05')).toBe(false);
        expect(isValidDate('2023-1-5')).toBe(false);
        expect(isValidDate('2023/10/05')).toBe(false);
        expect(isValidDate('05-10-2023')).toBe(false);
        expect(isValidDate('')).toBe(false);
    });

    it('should return false for invalid date strings', () => {
        expect(isValidDate('not-a-date')).toBe(false);
        expect(isValidDate('2023-10-')).toBe(false);
        expect(isValidDate('2023-XX-05')).toBe(false);
    });
});
