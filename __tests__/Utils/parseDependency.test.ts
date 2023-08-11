import { parseDependencyValue } from '@/utils/parseDependency';

describe('parseDependencyValue', () => {
    it('should split and trim a comma-separated string into an array of trimmed values', () => {
        const value = '  task1 , task2 ,  task3  ';
        const expected = ['task1', 'task2', 'task3'];

        const result = parseDependencyValue(value);

        expect(result).toEqual(expected);
    });

    it('should handle an empty string and return an empty array', () => {
        const value = '';
        const expected = [''];

        const result = parseDependencyValue(value);

        expect(result).toEqual(expected);
    });

    it('should handle a string with no commas and return an array with a single trimmed value', () => {
        const value = 'task1';
        const expected = ['task1'];

        const result = parseDependencyValue(value);

        expect(result).toEqual(expected);
    });
});
