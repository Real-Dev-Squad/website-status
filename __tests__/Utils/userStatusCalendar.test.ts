import {
    getStartOfDay,
    getDatesInRange,
    processData,
} from '@/utils/userStatusCalendar';

test('getStartOfDay returns the start of the day for a valid date input', () => {
    const validDate = new Date(2022, 11, 25, 14, 30, 0);
    const result = getStartOfDay(validDate);
    expect(result).toEqual(new Date(2022, 11, 25, 0, 0, 0));
});

test('getStartOfDay returns the start of the day for a date with middle time', () => {
    const middleTimeDate = new Date(2022, 11, 25, 12, 30, 0);
    const result = getStartOfDay(middleTimeDate);
    expect(result).toEqual(new Date(2022, 11, 25, 0, 0, 0));
});

test('getStartOfDay returns the start of the day for a date with end of the day time', () => {
    const endOfDayDate = new Date(2022, 11, 25, 23, 59, 59);
    const result = getStartOfDay(endOfDayDate);
    expect(result).toEqual(new Date(2022, 11, 25, 0, 0, 0));
});

test.skip('getStartOfDay returns today’s date with start of the day for an invalid date input', () => {
    const invalidDate = new Date('invalid');
    const result = getStartOfDay(invalidDate);
    const d = new Date();
    const todayStart = new Date(d.getFullYear(), d.getMonth(), d.getDate());
    expect(result.getTime()).toEqual(todayStart.getTime());
});


