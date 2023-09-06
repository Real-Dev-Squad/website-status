import { getCurrentDate } from '@/utils/getCurrentDate';

describe('getCurrentDate', () => {
    test('should render the current date if time is 6am for current date', () => {
        jest.useFakeTimers().setSystemTime(new Date('2023-08-09T06:00:00'));
        const currentDate = getCurrentDate(6);
        expect(currentDate).toBe('August 09, 2023 ');
    });

    test('should render the previous date if time is less than 6am for current date', () => {
        jest.useFakeTimers().setSystemTime(new Date('2023-08-09T06:00:00'));
        console.log(Date.now());
        const currentDate = getCurrentDate(7);
        console.log(currentDate);
        expect(currentDate).toBe('August 08, 2023 ');
    });
});
