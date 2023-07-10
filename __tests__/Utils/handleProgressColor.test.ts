import handleProgressColor from '@/utils/handleProgressColor';

describe('handleProgressColor', () => {
    beforeEach(() => {
        jest.useFakeTimers().setSystemTime(new Date('10 july 2023'));
    });
    test('should render green color', () => {
        jest.useFakeTimers().setSystemTime(new Date('11 july 2023'));
        //start date -july 7 2023 , end date - 17 July 2023
        const colorName = handleProgressColor(100, '1688732501', '1689552000');
        expect(colorName).toBe('progressGreen');
    });
    test('should render red color ', () => {
        jest.useFakeTimers().setSystemTime(new Date('11 july 2023'));
        //start date -july 8 2023 , end date - 11 July 2023
        const colorName = handleProgressColor(45, '1688817600', '1689033600');
        expect(colorName).toBe('progressRed');
    });

    test('should render red color', () => {
        jest.useFakeTimers().setSystemTime(new Date('11 july 2023'));
        //start date -july 5 2023 , end date - 12 July 2023
        const colorName = handleProgressColor(0, '1688515200', '1689163200');
        expect(colorName).toBe('progressRed');
    });

    test('should render Orange color', () => {
        jest.useFakeTimers().setSystemTime(new Date('11 july 2023'));
        //start date -july 9 2023 , end date - 12 July 2023
        const colorName = handleProgressColor(10, '1688884200', '1689143400');
        expect(colorName).toBe('progressOrange');
    });

    test('should render Yellow color', () => {
        jest.useFakeTimers().setSystemTime(new Date('11 july 2023'));
        //start date -july 9 2023 , end date - 12 July 2023
        const colorName = handleProgressColor(30, '1688884200', '1689143400');
        expect(colorName).toBe('progressYellow');
    });
});
