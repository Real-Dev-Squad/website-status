// Import the function to be tested

import { getDateRelativeToToday } from '@/utils/time';

describe('getDateRelativeToToday', () => {
    it('should return a timestamp for "timestamp" format', () => {
        const daysFromToday = 2;
        const format = 'timestamp';
        const result = getDateRelativeToToday(daysFromToday, format);

        expect(typeof result).toBe('number');
    });

    it('should return a formatted date for "formattedDate" format', () => {
        const daysFromToday = 2;
        const format = 'formattedDate';
        const result = getDateRelativeToToday(daysFromToday, format) as string;

        expect(typeof result).toBe('string');

        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        expect(dateRegex.test(result)).toBe(true);
    });

    it('should throw an error for an invalid format', () => {
        const daysFromToday = 2;
        const format = 'invalidFormat';

        expect(() => {
            getDateRelativeToToday(daysFromToday, format);
        }).toThrow(
            'Invalid format parameter. Use "timestamp" or "formattedDate".'
        );
    });
});
