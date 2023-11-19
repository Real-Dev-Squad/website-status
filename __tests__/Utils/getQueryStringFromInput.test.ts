import { getQueryStringFromInput } from '@/utils/getQueryStringFromInput';

describe('getQueryString', () => {
    it('should extract search query from input field', () => {
        const queryParam = 'dark mode';
        const result = getQueryStringFromInput(queryParam);
        expect(typeof result).toBe('object');
        expect(result.text).toBe('dark mode');
    });

    it('should handle missing search query', () => {
        const queryParam = '';
        const result = getQueryStringFromInput(queryParam);
        expect(typeof result).toBe('object');
        expect(result.text).toBe('');
    });
});
