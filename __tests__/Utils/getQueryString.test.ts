import { getQueryString } from '@/utils/getQueryString';

describe('getQueryString', () => {
    it('should extract search query from input field', () => {
        const queryParam = 'dark mode';
        const result = getQueryString(queryParam);
        expect(typeof result).toBe('object');
        expect(result.text).toBe('dark mode');
    });

    it('should handle missing search query', () => {
        const queryParam = '';
        const result = getQueryString(queryParam);
        expect(typeof result).toBe('object');
        expect(result.text).toBe('');
    });
});
