import convertStringToOptions from '@/utils/convertStringToOptions';

describe('extractQueryParams', () => {
    it('should return an empty array when given an empty string', () => {
        const result = convertStringToOptions('');
        expect(result).toEqual([]);
    });
    it('should return an array with a single object containing the title property when given a string with only a title', () => {
        const result = convertStringToOptions('Sample Title');
        expect(result).toEqual([{ title: 'Sample Title' }]);
    });
    it('should return an array with a single object containing the status property when given a string with only a status', () => {
        const result = convertStringToOptions('status:open');
        expect(result).toEqual([{ status: 'open' }]);
    });
    it('should return an empty array when given a string with only whitespace', () => {
        const result = convertStringToOptions('   ');
        expect(result).toEqual([]);
    });
    it('should return an empty array  when given a string with only status:all', () => {
        const result = convertStringToOptions('status:all');
        expect(result).toEqual([]);
    });
    it('should return an  array with multple indexes containing assignee when given multiple assignees', () => {
        const result = convertStringToOptions('assignee:joy assignee:gupta');
        expect(result).toEqual([{ assignee: 'joy' }, { assignee: 'gupta' }]);
    });
});
