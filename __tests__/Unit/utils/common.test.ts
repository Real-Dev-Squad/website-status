import { readMoreFormatter } from '@/utils/common';

describe('Unit | Util | readMoreFormatter', () => {
    it('should return empty string if empty string is passed', () => {
        const result = readMoreFormatter('', 10);

        expect(result).toBe('');
    });

    it('should return the string if length of string is less than the length passed to format the string', () => {
        const demoString = 'Lorem Ipsum is simply dummy text';

        const result = readMoreFormatter(demoString, 32);

        expect(result).toBe(demoString);
    });

    it('should format the string upto the given length in read more format', () => {
        const demoString =
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry.';

        const result = readMoreFormatter(demoString, 32);

        expect(result).toBe('Lorem Ipsum is simply dummy text...');
    });
});
