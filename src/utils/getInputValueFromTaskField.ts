import { Tab } from '@/interfaces/task.type';
import {
    getQueryParamTab,
    getQueryParamTitle,
    getRouterQueryParamAssignee,
} from './taskQueryParams';

export default function getInputValueFromTaskField(
    tab: Tab,
    assignees: string[],
    title: string
) {
    let inputValue = '';

    if (tab) inputValue += `${getQueryParamTab(tab)} `;

    if (assignees) inputValue += `${getRouterQueryParamAssignee(assignees)} `;

    if (title) inputValue += `${getQueryParamTitle(title)} `;

    return inputValue.trim();
}
