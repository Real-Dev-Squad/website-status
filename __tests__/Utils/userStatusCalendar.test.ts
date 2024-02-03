import {
    getStartOfDay,
    getDatesInRange,
    processData,
} from '@/utils/userStatusCalendar';

// test for getStartOfDay
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

// tests for getDatesInRange 
test('getDatesInRange returns an array of unix time of the start of each day between the date range.', () => {
    const startDate = new Date(2022, 11, 25);
    const endDate = new Date(2022, 11, 28);
    const result = getDatesInRange(startDate, endDate);
    expect(result).toEqual([
        new Date(2022, 11, 25, 0, 0, 0).getTime(),
        new Date(2022, 11, 26, 0, 0, 0).getTime(),
        new Date(2022, 11, 27, 0, 0, 0).getTime(),
        new Date(2022, 11, 28, 0, 0, 0).getTime(),
    ]);
});

test('getDatesInRange handles a single day range and has one element in the array.', () => {
    const startDate = new Date(2022, 11, 25);
    const endDate = new Date(2022, 11, 25);
    const result = getDatesInRange(startDate, endDate);
    expect(result).toEqual([new Date(2022, 11, 25, 0, 0, 0).getTime()]);
});

test('getDatesInRange handles a day with one day range and has two unix timestamps in the array.', () => {
    const startDate = new Date(2022, 11, 25, 12, 0, 0);
    const endDate = new Date(2022, 11, 26, 12, 0, 0);
    const result = getDatesInRange(startDate, endDate);
    expect(result).toEqual([
        new Date(2022, 11, 25, 0, 0, 0).getTime(),
        new Date(2022, 11, 26, 0, 0, 0).getTime(),
    ]);
});

test('getDatesInRange handles dates with middle of the time, it returns an array with unix timestamps of dates between range including edge dates.', () => {
    const startDate = new Date(2022, 11, 25, 12, 0, 0);
    const endDate = new Date(2022, 11, 27, 12, 0, 0);
    const result = getDatesInRange(startDate, endDate);
    expect(result).toEqual([
        new Date(2022, 11, 25, 0, 0, 0).getTime(),
        new Date(2022, 11, 26, 0, 0, 0).getTime(),
        new Date(2022, 11, 27, 0, 0, 0).getTime(),
    ]);
});

test('getDatesInRange handles invalid range and should return an empty array.', () => {
    const startDate = new Date(2022, 11, 25);
    const endDate = new Date(2022, 11, 23);
    const result = getDatesInRange(startDate, endDate);
    expect(result).toEqual([]);
});

// tests for processData Utils
test('processData returns empty objects for null itemId', () => {
  const result = processData(null, []);
  expect(result).toEqual([{}, {}]);
});

test('processData returns empty objects for itemId with no matching log', () => {
  const result = processData('nonexistentUserId', []);
  expect(result).toEqual([{}, {}]);
});

test('processData returns empty objects for log with no data', () => {
  const logWithNoData = [
    {
      userId: 'user1',
      data: [],
    },
  ];
  const result = processData('user1', logWithNoData);
  expect(result).toEqual([{}, {}]);
});

