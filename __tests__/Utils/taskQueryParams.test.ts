import {
    extractQueryParams,
    getQueryParamTab,
    getQueryParamAssignee,
    getQueryParamTitle,
} from '@/utils/taskQueryParams';

import { Tab } from '@/interfaces/task.type';

describe('extractQueryParams', () => {
    it('should extract status, assignee, and title from query param', () => {
        const queryParam =
            'status:in-progress assignee:sunny-s Develop feature';
        const result = extractQueryParams(queryParam);
        expect(result.status).toBe('in-progress');
        expect(result.assignees).toEqual(['sunny-s']);
        expect(result.title).toBe('Develop feature');
    });

    it('should handle missing query param gracefully', () => {
        const queryParam = '';
        const result = extractQueryParams(queryParam);
        expect(result.status).toBe('');
        expect(result.assignees).toEqual([]);
        expect(result.title).toBe('');
    });
});

describe('getQueryParamTab', () => {
    it('should generate a query param for a Tab', () => {
        const tab = Tab.IN_PROGRESS;
        const result = getQueryParamTab(tab);
        expect(result).toBe('status:in-progress');
    });
});

describe('getQueryParamAssignee', () => {
    it('should generate a query param for an assignee', () => {
        const assignee = 'sunny-s';
        const result = getQueryParamAssignee(assignee);
        expect(result).toBe('assignee:sunny-s');
    });
});

describe('getQueryParamTitle', () => {
    it('should generate a query param for a title', () => {
        const title = 'Develop feature';
        const result = getQueryParamTitle(title);
        expect(result).toBe('Develop feature');
    });
});
