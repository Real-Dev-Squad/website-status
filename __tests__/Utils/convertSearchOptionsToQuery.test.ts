import { TaskSearchOption } from '@/interfaces/searchOptions.type';
import convertSearchOptionsToQuery from '@/utils/convertSearchOptionsToQuery';

describe('convertSearchOptionsToQuery', () => {
    it('should correctly convert an array of search options to a query string when options are provided', () => {
        const options: TaskSearchOption[] = [
            { title: 'Task 1' },
            { status: 'completed' },
            { assignee: 'joy-gupta' },
            { assignee: 'ankush-dharkar' },
        ];
        const expectedQuery =
            'Task 1 status:completed assignee:joy-gupta assignee:ankush-dharkar';

        const result = convertSearchOptionsToQuery(options);

        expect(result).toEqual(expectedQuery);
    });
    it('should add status:all if options are empty', () => {
        const options: TaskSearchOption[] = [];
        const expectedQuery = 'status:all';

        const result = convertSearchOptionsToQuery(options);

        expect(result).toEqual(expectedQuery);
    });
});
