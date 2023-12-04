import {
    extractQueryParams,
    getQueryParamTab,
    getAPIQueryParamAssignee,
    getRouterQueryParamAssignee,
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
    it('should extract assignee-role and title assignee role from query param', () => {
        const queryParam =
            'assignee-role:archived assignee:sunny-s Develop feature';
        const result = extractQueryParams(queryParam);
        expect(result.assignees).toEqual(['sunny-s']);
        expect(result.title).toBe('Develop feature');
        expect(result.assigneeRole).toBe('archived');
    });
    it('should extract status, multiple assignees, and title from query param', () => {
        const queryParam =
            'status:in-progress assignee:sunny-s assignee:ajoy-kumar Develop feature';
        const result = extractQueryParams(queryParam);
        expect(result.status).toBe('in-progress');
        expect(result.assignees).toEqual(['sunny-s', 'ajoy-kumar']);
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
    it('should generate a query param for assignee archived tab', () => {
        const tab = Tab.ASSIGNEE_ARCHIVED;
        const result = getQueryParamTab(tab);
        expect(result).toBe('assignee-role:archived');
    });
});

describe('getAPIQueryParamAssignee', () => {
    it('should generate a api query param for an assignee', () => {
        const assignee = ['sunny-s'];
        const result = getAPIQueryParamAssignee(assignee);
        expect(result).toBe('sunny-s');
    });
    it('should generate a api query param for multiple assignees', () => {
        const assignee = ['sunny-s', 'ajoy-kumar'];
        const result = getAPIQueryParamAssignee(assignee);
        expect(result).toBe('sunny-s,ajoy-kumar');
    });
});

describe('getRouterQueryParamAssignee', () => {
    it('should generate a router query param for an assignee', () => {
        const assignee = ['sunny-s'];
        const result = getRouterQueryParamAssignee(assignee);
        expect(result).toBe('assignee:sunny-s');
    });
    it('should generate a router query param for multiple assignees', () => {
        const assignee = ['sunny-s', 'ajoy-kumar'];
        const result = getRouterQueryParamAssignee(assignee);
        expect(result).toBe('assignee:sunny-s assignee:ajoy-kumar');
    });
});

describe('getQueryParamTitle', () => {
    it('should generate a query param for a title', () => {
        const title = 'Develop feature';
        const result = getQueryParamTitle(title);
        expect(result).toBe('Develop feature');
    });
});
