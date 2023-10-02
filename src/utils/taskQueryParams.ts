import { Tab } from '@/interfaces/task.type';
import { tabToUrlParams } from './getActiveTab';

export function extractQueryParams(queryParam: string) {
    const queryParamsArray = queryParam?.split(' ');
    let isValue = '';
    const assigneeValues: string[] = [];
    let titleValue = '';

    if (!queryParamsArray) {
        return {
            status: isValue,
            assignees: assigneeValues,
            title: titleValue,
        };
    }

    for (let i = 0; i < queryParamsArray.length; i++) {
        const param = queryParamsArray[i];
        if (param.startsWith('status:')) {
            isValue = param.replace('status:', '');
        } else if (param.startsWith('assignee:')) {
            assigneeValues.push(param.replace('assignee:', ''));
        } else {
            titleValue += param + ' ';
        }
    }

    titleValue = titleValue.trim();

    return {
        status: isValue,
        assignees: assigneeValues,
        title: titleValue,
    };
}

export const getQueryParamTab = (tab: Tab) => `status:${tabToUrlParams(tab)}`;
export const getQueryParamAssignee = (assignee: string) =>
    `assignee:${assignee}`;
export const getQueryParamTitle = (title: string) => title;
