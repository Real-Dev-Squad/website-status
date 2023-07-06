import getPercentageOfDaysLeft from '@/utils/getPercentageOfDaysLeft';

describe('getPercentageOfDaysLeft', () => {
    test('should render percentage', () => {
        const percentageOfDaysLeft = getPercentageOfDaysLeft(
            '1688515200',
            '1689120000'
        );
        expect(Number(percentageOfDaysLeft.toFixed(2))).toBe(71.43);
    });
});
