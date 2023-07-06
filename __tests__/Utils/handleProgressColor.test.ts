import handleProgressColor from '@/utils/handleProgressColor';

describe('handleProgressColor', () => {
    test('should render green color', () => {
        const colorName = handleProgressColor(100, '1688515200', '1689120000');
        expect(colorName).toBe('progressGreen');
    });
    test('should render red color if 45 percent of task is complete', () => {
        const colorName = handleProgressColor(45, '1688342400', '1688774400');
        expect(colorName).toBe('progressRed');
    });

    test('should render red color', () => {
        const colorName = handleProgressColor(0, '1688515200', '1688601600');
        expect(colorName).toBe('progressRed');
    });

    test('should render Orange color', () => {
        const colorName = handleProgressColor(0, '1688428800', '1688860800');
        expect(colorName).toBe('progressOrange');
    });

    test('should render Yellow color', () => {
        const colorName = handleProgressColor(30, '1688428800', '1688860800');
        expect(colorName).toBe('progressYellow');
    });
});
