import getPercentageOfDaysLeft from '@/utils/getPercentageOfDaysLeft';

describe('getPercentageOfDaysLeft', () => {
    test('should render percentage', () => {
        jest.useFakeTimers().setSystemTime(new Date('10 july 2023'));
        const percentageOfDaysLeft = getPercentageOfDaysLeft(
            '1688515200',
            '1689120000'
        );
        expect(Number(percentageOfDaysLeft.toFixed(2))).toBe(28.57);
    });
});
