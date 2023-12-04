import { Tab } from '@/interfaces/task.type';
import { tabToUrlParams } from './getActiveTab';

export function extractQueryParams(queryParam: string) {
    const queryParamsArray = queryParam?.split(' ');
    let isValue = '';
    const assigneeValues: string[] = [];
    let titleValue = '';
    let assigneeRole = '';

    if (!queryParamsArray) {
        return {
            status: isValue,
            assignees: assigneeValues,
            title: titleValue,
            assigneeRole: assigneeRole,
        };
    }

    for (let i = 0; i < queryParamsArray.length; i++) {
        const param = queryParamsArray[i];
        if (param.startsWith('status:')) {
            isValue = param.replace('status:', '');
        } else if (param.startsWith('assignee:')) {
            assigneeValues.push(param.replace('assignee:', ''));
        } else if (param.startsWith('assignee-role:')) {
            assigneeRole = param.replace('assignee-role:', '');
            isValue = param.replace('assignee-role:', '');
        } else {
            titleValue += param + ' ';
        }
    }

    titleValue = titleValue.trim();

    return {
        status: isValue,
        assignees: assigneeValues,
        title: titleValue,
        assigneeRole: assigneeRole,
    };
}

export const getQueryParamTab = (tab: Tab) => {
    if (tab === Tab.ASSIGNEE_ARCHIVED) {
        return 'assignee-role:archived';
    }
    return `status:${tabToUrlParams(tab)}`;
};
export const getAPIQueryParamAssignee = (assignees: string[]) => {
    if (assignees.length === 0) return '';
    const apiqueryParamAssignee = assignees.join(',');
    return apiqueryParamAssignee;
};
export const getRouterQueryParamAssignee = (assignees: string[]) => {
    if (assignees.length === 0) return '';
    let routerqueryParamAssignee = '';
    assignees.forEach((assignee, index) => {
        if (index > 0) routerqueryParamAssignee += ` assignee:${assignee}`;
        else routerqueryParamAssignee += `assignee:${assignee}`;
    });
    return routerqueryParamAssignee;
};
export const getQueryParamTitle = (title: string) => title;
