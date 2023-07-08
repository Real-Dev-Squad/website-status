import getCurrentDate from '@/utils/getLatestDate';

describe('test getLatest Date', function () {
    it('returns the latest date in string format', function () {
        jest.useFakeTimers();
        jest.setSystemTime(1683863962266);
        const currentDate = getCurrentDate();

        expect(currentDate).toBe('Thursday, 11 May 2023');
    });
});
