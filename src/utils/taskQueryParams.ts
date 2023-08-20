import { Tab } from '@/interfaces/task.type';
import { tabToUrlParams } from './getActiveTab';

export function extractQueryParams(queryParam: string) {
    const queryParamsArray = queryParam?.split(' ');

    let isValue = '';
    let assigneeValue = '';
    let termValue = '';

    if (!queryParamsArray) {
        return {
            status: isValue,
            assignee: assigneeValue,
            title: termValue,
        };
    }
    for (let i = 0; i < queryParamsArray.length; i++) {
        const param = queryParamsArray[i];
        if (param.startsWith('status:')) {
            isValue = param.replace('status:', '');
        } else if (param.startsWith('assignee:')) {
            assigneeValue = param.replace('assignee:', '');
        } else if (param.startsWith('title:')) {
            termValue = queryParamsArray
                .slice(i)
                .join(' ')
                .replace('title:', '');
        }
    }

    return {
        status: isValue,
        assignee: assigneeValue,
        title: termValue,
    };
}

export const getQueryParamTab = (tab: Tab) => `status:${tabToUrlParams(tab)}`;
export const getQueryParamAssignee = (assignee: string) =>
    `assignee:${assignee}`;
export const getQueryParamTitle = (title: string) => `title:${title}`;
